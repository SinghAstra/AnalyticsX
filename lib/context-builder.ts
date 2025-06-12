import {
  ContextData,
  FileContent,
  QuestionType,
  RepositoryTier1Data,
  RepositoryTier2Data,
  RepositoryTier3Data,
} from "./types";

/**
 * Build context for a question based on repository data
 */
export function buildContext(
  questionType: QuestionType,
  data: RepositoryTier1Data | RepositoryTier2Data | RepositoryTier3Data,
  extractedEntity?: string
): ContextData {
  const sources: string[] = [];
  let overview = "";
  let fileStructure = "";
  let keyFiles = "";
  let specificContent = "";

  // Build overview context
  overview = buildOverviewContext(data, sources);

  // Build file structure context
  fileStructure = buildFileStructureContext(data, sources);

  // Build key files context based on question type
  if ("keyFiles" in data) {
    keyFiles = buildKeyFilesContext(
      data,
      questionType,
      extractedEntity,
      sources
    );
  }

  // Build specific content context based on question type
  if ("specificFiles" in data && data.specificFiles.length > 0) {
    specificContent = buildSpecificContentContext(
      data,
      questionType,
      extractedEntity,
      sources
    );
  }

  return {
    overview,
    fileStructure,
    keyFiles,
    specificContent,
    sources,
  };
}

/**
 * Build overview context
 */
function buildOverviewContext(
  data: RepositoryTier1Data,
  sources: string[]
): string {
  let context = `Repository: ${data.repository.owner}/${data.repository.name}\n`;
  context += `Description: ${
    data.repository.description || "No description provided"
  }\n`;
  context += `Language: ${data.repository.language || "Not specified"}\n`;
  context += `Stars: ${data.repository.stars}\n`;

  if (data.readme) {
    context += `\nREADME Content:\n${truncateText(data.readme, 2000)}\n`;
    sources.push("README.md");
  }

  if (data.packageJson) {
    context += `\nPackage.json info:\n`;
    context += `Name: ${data.packageJson.name || "N/A"}\n`;
    context += `Description: ${data.packageJson.description || "N/A"}\n`;

    if (data.packageJson.dependencies) {
      context += `Main dependencies: ${Object.keys(
        data.packageJson.dependencies
      )
        .slice(0, 10)
        .join(", ")}\n`;
    }

    sources.push("package.json");
  }

  return context;
}

/**
 * Build file structure context
 */
function buildFileStructureContext(
  data: RepositoryTier1Data,
  sources: string[]
): string {
  let context = `\nFile Structure:\n`;

  // Group files by directory
  const filesByDir = new Map<string, string[]>();

  data.fileTree.forEach((file) => {
    const dirPath = file.path.includes("/")
      ? file.path.substring(0, file.path.lastIndexOf("/"))
      : "/";

    if (!filesByDir.has(dirPath)) {
      filesByDir.set(dirPath, []);
    }

    filesByDir.get(dirPath)!.push(file.name);
  });

  // Add root files first
  if (filesByDir.has("/")) {
    context += `Root:\n  ${filesByDir.get("/")!.join("\n  ")}\n`;
  }

  // Add other directories (limit to keep context manageable)
  const importantDirs = [
    "src",
    "app",
    "pages",
    "components",
    "api",
    "lib",
    "utils",
  ];

  importantDirs.forEach((dir) => {
    // Convert entries to array to avoid iterator issues
    const entries = Array.from(filesByDir.entries());

    for (const [path, files] of entries) {
      if (path.includes(dir)) {
        context += `\n${path}:\n  ${files.join("\n  ")}\n`;
        break;
      }
    }
  });

  sources.push("File structure");
  return context;
}

/**
 * Build key files context
 */
function buildKeyFilesContext(
  data: RepositoryTier2Data,
  questionType: QuestionType,
  extractedEntity?: string,
  sources: string[] = []
): string {
  let context = `\nKey Files Content:\n`;

  // Filter key files based on question type and entity
  let filesToInclude = data.keyFiles;

  if (extractedEntity) {
    const entityLower = extractedEntity.toLowerCase();
    filesToInclude = data.keyFiles.filter(
      (file) =>
        file.path.toLowerCase().includes(entityLower) ||
        file.content.toLowerCase().includes(entityLower)
    );

    // If no matches, fall back to all back to all key files
    if (filesToInclude.length === 0) {
      filesToInclude = data.keyFiles;
    }
  }

  // Limit number of files based on question type
  const fileLimit =
    questionType === QuestionType.OVERVIEW
      ? 3
      : questionType === QuestionType.FUNCTIONALITY
      ? 5
      : 10;

  filesToInclude = filesToInclude.slice(0, fileLimit);

  // Add file content to context
  filesToInclude.forEach((file) => {
    context += `\nFile: ${file.path}\n`;
    context += `${truncateText(file.content, 1000)}\n`;
    sources.push(file.path);
  });

  return context;
}

/**
 * Build specific content context
 */
function buildSpecificContentContext(
  data: RepositoryTier3Data,
  questionType: QuestionType,
  extractedEntity?: string,
  sources: string[] = []
): string {
  let context = `\nSpecific Content:\n`;

  // For implementation questions, include specific files and related files
  if (questionType === QuestionType.IMPLEMENTATION) {
    data.specificFiles.forEach((file) => {
      context += `\nFile: ${file.path}\n`;
      context += `${file.content}\n`;
      sources.push(file.path);
    });

    if (data.relatedFiles.length > 0) {
      context += `\nRelated Files:\n`;
      data.relatedFiles.forEach((file) => {
        context += `\nFile: ${file.path}\n`;
        context += `${truncateText(file.content, 500)}\n`;
        sources.push(file.path);
      });
    }
  }

  // For file analysis questions, focus on the specific file
  else if (questionType === QuestionType.FILE_ANALYSIS) {
    const fileToAnalyze = data.specificFiles[0];
    if (fileToAnalyze) {
      context += `\nFile: ${fileToAnalyze.path}\n`;
      context += `${fileToAnalyze.content}\n`;
      sources.push(fileToAnalyze.path);
    }
  }

  // For code location questions, just list the files
  else if (questionType === QuestionType.CODE_LOCATION) {
    context += `\nFiles related to "${extractedEntity}":\n`;
    data.specificFiles.forEach((file) => {
      context += `- ${file.path}\n`;
      sources.push(file.path);
    });
  }

  return context;
}

/**
 * Truncate text to a maximum length
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Format file content for display
 */
export function formatFileContent(file: FileContent): string {
  return `File: ${file.path}\n\n${file.content}`;
}
