import type { FileContent, GitHubFile, Repository } from "./types";

const GITHUB_API_BASE = "https://api.github.com";
const githubToken = process.env.GITHUB_TOKEN;
if (!githubToken) {
  throw new Error("GITHUB_ACCESS_TOKEN is required");
}

async function fetchGithubRepo(url: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHub-Chat-App",
  };

  headers["Authorization"] = `token ${githubToken}`;

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

export async function getRepository(
  owner: string,
  name: string
): Promise<Repository> {
  const data = await fetchGithubRepo(
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

export async function getFileTree(
  owner: string,
  name: string,
  path = ""
): Promise<GitHubFile[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${name}/contents/${path}`;
  const data = await fetchGithubRepo(url);

  if (!Array.isArray(data)) {
    return [data];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((item: any) => ({
    name: item.name,
    path: item.path,
    type: item.type,
    size: item.size,
    download_url: item.download_url,
  }));
}

export async function getFileContent(
  owner: string,
  name: string,
  path: string
): Promise<FileContent> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${name}/contents/${path}`;
  const data = await fetchGithubRepo(url);

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
      continue;
    }
  }

  return null;
}

export async function getPackageJson(owner: string, name: string) {
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
