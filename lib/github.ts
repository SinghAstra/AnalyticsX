/* eslint-disable @typescript-eslint/no-explicit-any */
import { getKeyFilesByCategory, prioritizeFiles } from "./file-prioritizer";
import type {
  FileContent,
  GitHubFile,
  Repository,
  RepositoryTier1Data,
  RepositoryTier2Data,
  RepositoryTier3Data,
} from "./types";

const GITHUB_API_BASE = "https://api.github.com";

/**
 * Make a request to the GitHub API
 */
export async function makeGitHubRequest(url: string): Promise<any> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHub-Chat-App",
  };

  const githubToken = process.env.GITHUB_TOKEN;
  if (githubToken) {
    headers["Authorization"] = `token ${githubToken}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Repository not found or is private");
    }
    if (response.status === 403) {
      throw new Error("GitHub API rate limit exceeded");
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Parse a GitHub repository URL into owner and name
 */
export function parseRepoUrl(repoUrl: string): { owner: string; name: string } {
  // Handle various GitHub URL formats
  const patterns = [
    /github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/.*)?$/,
    /^([^/]+)\/([^/]+)$/,
  ];

  for (const pattern of patterns) {
    const match = repoUrl.match(pattern);
    if (match) {
      return { owner: match[1], name: match[2] };
    }
  }

  throw new Error("Invalid GitHub repository URL");
}

/**
 * Get repository metadata
 */
export async function getRepository(
  owner: string,
  name: string
): Promise<Repository> {
  const data = await makeGitHubRequest(
    `${GITHUB_API_BASE}/repos/${owner}/${name}`
  );

  return {
    owner: data.owner.login,
    name: data.name,
    description: data.description,
    language: data.language,
    stars: data.stargazers_count,
    forks: data.forks_count,
    url: data.html_url,
  };
}

/**
 * Get file tree for a repository
 */
export async function getFileTree(
  owner: string,
  name: string,
  path = ""
): Promise<GitHubFile[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${name}/contents/${path}`;
  const data = await makeGitHubRequest(url);

  if (!Array.isArray(data)) {
    return [data];
  }

  return data.map((item: any) => ({
    name: item.name,
    path: item.path,
    type: item.type,
    size: item.size,
    download_url: item.download_url,
  }));
}

/**
 * Get recursive file tree for a repository
 */
export async function getRecursiveFileTree(
  owner: string,
  name: string
): Promise<GitHubFile[]> {
  try {
    // Try to use the Git Trees API for more efficient recursive listing
    const mainBranch = await getDefaultBranch();
    const url = `${GITHUB_API_BASE}/repos/${owner}/${name}/git/trees/${mainBranch}?recursive=1`;
    const data = await makeGitHubRequest(url);

    if (data.truncated) {
      console.warn("File tree was truncated due to size");
    }

    return data.tree.map((item: any) => ({
      name: item.path.split("/").pop(),
      path: item.path,
      type: item.type === "blob" ? "file" : "dir",
      size: item.size,
    }));
  } catch (error) {
    console.warn(
      "Failed to get recursive tree, falling back to non-recursive",
      error
    );
    return getFileTree(owner, name);
  }
}

/**
 * Get the default branch for a repository
 */
async function getDefaultBranch(): Promise<string> {
  // const repo = await getRepository(owner, name);
  return "main"; // Simplified for MVP - would normally get from repo API
}

/**
 * Get content of a specific file
 */
export async function getFileContent(
  owner: string,
  name: string,
  path: string
): Promise<FileContent> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${name}/contents/${path}`;
  const data = await makeGitHubRequest(url);

  if (data.type !== "file") {
    throw new Error("Path is not a file");
  }

  let content = "";
  if (data.encoding === "base64") {
    content = Buffer.from(data.content, "base64").toString("utf-8");
  } else {
    content = data.content;
  }

  return {
    path: data.path,
    content,
    encoding: data.encoding,
  };
}

/**
 * Get README content
 */
export async function getReadme(
  owner: string,
  name: string
): Promise<string | null> {
  const readmeFiles = ["README.md", "README.txt", "README.rst", "README"];

  for (const filename of readmeFiles) {
    try {
      const fileContent = await getFileContent(owner, name, filename);
      return fileContent.content;
    } catch (error) {
      if (error instanceof Error) {
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
      }
      // Continue to next README file
      continue;
    }
  }

  return null;
}

/**
 * Get package.json content
 */
export async function getPackageJson(
  owner: string,
  name: string
): Promise<any | null> {
  try {
    const fileContent = await getFileContent(owner, name, "package.json");
    return JSON.parse(fileContent.content);
  } catch (error) {
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    return null;
  }
}

/**
 * Get Tier 1 data (repository overview)
 */
export async function getTier1Data(
  owner: string,
  name: string
): Promise<RepositoryTier1Data> {
  console.log(`Fetching Tier 1 data for ${owner}/${name}`);

  // Fetch all Tier 1 data in parallel
  const [repository, readme, packageJson, fileTree] = await Promise.all([
    getRepository(owner, name),
    getReadme(owner, name),
    getPackageJson(owner, name),
    getFileTree(owner, name),
  ]);

  // Extract top-level structure
  const topLevelStructure = fileTree
    .filter((file) => !file.path.includes("/"))
    .map((file) => file.name);

  const tier1Data: RepositoryTier1Data = {
    repository,
    readme,
    packageJson,
    fileTree,
    topLevelStructure,
  };

  return tier1Data;
}

/**
 * Get Tier 2 data (key files)
 */
export async function getTier2Data(
  owner: string,
  name: string
): Promise<RepositoryTier2Data> {
  console.log(`Fetching Tier 2 data for ${owner}/${name}`);

  // Get Tier 1 data first
  const tier1Data = await getTier1Data(owner, name);

  // Get recursive file tree for better analysis
  let allFiles = tier1Data.fileTree;
  try {
    allFiles = await getRecursiveFileTree(owner, name);
  } catch (error) {
    console.warn(
      "Failed to get recursive file tree, using non-recursive",
      error
    );
  }

  // Prioritize files
  const prioritizedFiles = prioritizeFiles(allFiles);
  const keyFilesByCategory = getKeyFilesByCategory(prioritizedFiles);

  // Get key files content (limit to prevent API overload)
  const keyFilesToFetch = [
    ...keyFilesByCategory.entry,
    ...keyFilesByCategory.api.slice(0, 5),
    ...keyFilesByCategory.components.slice(0, 8),
    ...keyFilesByCategory.config.slice(0, 5),
  ].slice(0, 25); // Max 25 files for Tier 2

  const keyFiles = await fetchMultipleFiles(
    owner,
    name,
    keyFilesToFetch.map((f) => f.file.path)
  );

  const tier2Data: RepositoryTier2Data = {
    ...tier1Data,
    keyFiles,
    apiRoutes: keyFilesByCategory.api.map((f) => f.file),
    components: keyFilesByCategory.components.map((f) => f.file),
    configFiles: keyFilesByCategory.config.map((f) => f.file),
  };

  return tier2Data;
}

/**
 * Get Tier 3 data (specific files)
 */
export async function getTier3Data(
  owner: string,
  name: string,
  specificPaths: string[] = []
): Promise<RepositoryTier3Data> {
  console.log(
    `Fetching Tier 3 data for ${owner}/${name} with specific paths:`,
    specificPaths
  );

  // Get Tier 2 data first
  const tier2Data = await getTier2Data(owner, name);

  // Fetch specific files if requested
  const specificFiles =
    specificPaths.length > 0
      ? await fetchMultipleFiles(owner, name, specificPaths)
      : [];

  // Find related files based on imports/dependencies
  const relatedFiles = await findRelatedFiles(owner, name, specificFiles);

  const tier3Data: RepositoryTier3Data = {
    ...tier2Data,
    specificFiles,
    relatedFiles,
  };

  return tier3Data;
}

/**
 * Fetch multiple files in batches
 */
export async function fetchMultipleFiles(
  owner: string,
  name: string,
  paths: string[]
): Promise<FileContent[]> {
  const results: FileContent[] = [];

  // Fetch files in batches to avoid rate limiting
  const batchSize = 5;
  for (let i = 0; i < paths.length; i += batchSize) {
    const batch = paths.slice(i, i + batchSize);

    const batchPromises = batch.map(async (path) => {
      try {
        return await getFileContent(owner, name, path);
      } catch (error) {
        console.warn(`Failed to fetch file ${path}:`, error);
        return null;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...(batchResults.filter(Boolean) as FileContent[]));

    // Small delay between batches to be nice to GitHub API
    if (i + batchSize < paths.length) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  return results;
}

/**
 * Find related files based on imports/dependencies
 */
export async function findRelatedFiles(
  owner: string,
  name: string,
  files: FileContent[]
): Promise<FileContent[]> {
  // Extract import paths from files
  const relatedPaths: Set<string> = new Set();

  for (const file of files) {
    // Simple regex to find import statements (works for JS/TS)
    const importRegex = /(?:import|require)\s*$$['"`]([^'"`]+)['"`]$$/g;
    let match;

    while ((match = importRegex.exec(file.content)) !== null) {
      const importPath = match[1];

      // Convert relative imports to actual file paths
      if (importPath.startsWith("./") || importPath.startsWith("../")) {
        const basePath = file.path.split("/").slice(0, -1).join("/");
        const resolvedPath = resolveRelativePath(basePath, importPath);

        // Add common extensions if not present
        const extensions = [".js", ".ts", ".jsx", ".tsx", ".json"];
        for (const ext of extensions) {
          relatedPaths.add(resolvedPath + ext);
        }
      }
    }
  }

  // Limit related files to prevent explosion
  const limitedPaths = Array.from(relatedPaths).slice(0, 10);
  return fetchMultipleFiles(owner, name, limitedPaths);
}

/**
 * Resolve a relative path
 */
export function resolveRelativePath(
  basePath: string,
  relativePath: string
): string {
  const baseSegments = basePath.split("/").filter(Boolean);
  const relativeSegments = relativePath.split("/").filter(Boolean);

  for (const segment of relativeSegments) {
    if (segment === "..") {
      baseSegments.pop();
    } else if (segment !== ".") {
      baseSegments.push(segment);
    }
  }

  return baseSegments.join("/");
}

/**
 * Search for files in a repository
 */
export async function searchFiles(
  owner: string,
  name: string,
  query: string
): Promise<GitHubFile[]> {
  // Use GitHub search API for code search
  const searchUrl = `${GITHUB_API_BASE}/search/code?q=${encodeURIComponent(
    query
  )}+repo:${owner}/${name}`;

  try {
    const data = await makeGitHubRequest(searchUrl);
    return (
      data.items?.map((item: any) => ({
        name: item.name,
        path: item.path,
        type: "file" as const,
        size: item.size,
        download_url: item.html_url,
      })) || []
    );
  } catch (error) {
    console.warn("Search failed, falling back to file tree search:", error);

    // Fallback: search in file tree
    const fileTree = await getRecursiveFileTree(owner, name);
    return fileTree.filter(
      (file) =>
        file.name.toLowerCase().includes(query.toLowerCase()) ||
        file.path.toLowerCase().includes(query.toLowerCase())
    );
  }
}
