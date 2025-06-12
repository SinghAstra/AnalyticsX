import type { FilePriority, GitHubFile } from "./types";

// File patterns for different categories and priorities
const PATTERNS = {
  // High priority patterns
  HIGH_PRIORITY: {
    API: [
      /\/(api|routes|controllers|endpoints)\//i,
      /\/(pages\/api|app\/api)\//i,
      /route\.(js|ts|jsx|tsx)$/i,
      /server\.(js|ts)$/i,
    ],
    ENTRY: [
      /^(index|main|app|server)\.(js|ts|jsx|tsx|py)$/i,
      /^package\.json$/i,
      /^requirements\.txt$/i,
      /^Dockerfile$/i,
      /^docker-compose\.(yml|yaml)$/i,
    ],
    CONFIG: [
      /^(next|nuxt|vite|webpack|rollup|babel)\.config\.(js|ts|mjs)$/i,
      /^tailwind\.config\.(js|ts)$/i,
      /^tsconfig\.json$/i,
      /^\.env(\.example|\.local)?$/i,
    ],
  },

  // Medium priority patterns
  MEDIUM_PRIORITY: {
    COMPONENT: [
      /\/(components|src|lib)\//i,
      /\.(component|service|util|helper)\.(js|ts|jsx|tsx)$/i,
      /\/pages\//i,
      /\/layouts?\//i,
    ],
    CONFIG: [
      /^(eslint|prettier)\.config\.(js|json)$/i,
      /^\.(eslintrc|prettierrc)/i,
      /^jest\.config\.(js|ts)$/i,
    ],
    DOC: [
      /^README\.(md|txt|rst)$/i,
      /^CHANGELOG\.(md|txt)$/i,
      /^CONTRIBUTING\.(md|txt)$/i,
    ],
  },

  // Low priority patterns
  LOW_PRIORITY: {
    TEST: [
      /\/(test|tests|__tests__|spec)\//i,
      /\.(test|spec)\.(js|ts|jsx|tsx)$/i,
      /\.stories\.(js|ts|jsx|tsx)$/i,
    ],
    UTIL: [/\/(utils|helpers|constants|types)\//i, /\.(d\.ts|types\.ts)$/i],
    DOC: [/\.(md|txt|rst)$/i, /^LICENSE/i, /^\.gitignore$/i],
  },
};

/**
 * Prioritize files based on patterns and heuristics
 */
export function prioritizeFiles(files: GitHubFile[]): FilePriority[] {
  return files.map((file) => scoreFile(file)).sort((a, b) => b.score - a.score);
}

/**
 * Score a file based on patterns and heuristics
 */
function scoreFile(file: GitHubFile): FilePriority {
  let score = 0;
  let priority: "HIGH" | "MEDIUM" | "LOW" = "LOW";
  let category: FilePriority["category"] = "UTIL";

  // Skip directories for content analysis
  if (file.type === "dir") {
    return { file, priority: "LOW", category: "UTIL", score: 0 };
  }

  // Check high priority patterns
  for (const [cat, patterns] of Object.entries(PATTERNS.HIGH_PRIORITY)) {
    if (
      patterns.some(
        (pattern) => pattern.test(file.path) || pattern.test(file.name)
      )
    ) {
      score += 100;
      priority = "HIGH";
      category = cat as FilePriority["category"];
      break;
    }
  }

  // Check medium priority patterns if not already high
  if (priority !== "HIGH") {
    for (const [cat, patterns] of Object.entries(PATTERNS.MEDIUM_PRIORITY)) {
      if (
        patterns.some(
          (pattern) => pattern.test(file.path) || pattern.test(file.name)
        )
      ) {
        score += 50;
        priority = "MEDIUM";
        category = cat as FilePriority["category"];
        break;
      }
    }
  }

  // Check low priority patterns if not already categorized
  if (priority === "LOW") {
    for (const [cat, patterns] of Object.entries(PATTERNS.LOW_PRIORITY)) {
      if (
        patterns.some(
          (pattern) => pattern.test(file.path) || pattern.test(file.name)
        )
      ) {
        score += 10;
        category = cat as FilePriority["category"];
        break;
      }
    }
  }

  // Additional scoring based on file characteristics
  score += getAdditionalScore(file);

  return { file, priority, category, score };
}

/**
 * Get additional score based on file characteristics
 */
function getAdditionalScore(file: GitHubFile): number {
  let additionalScore = 0;

  // Prefer files in root or important directories
  const depth = file.path.split("/").length - 1;
  if (depth === 0) additionalScore += 20; // Root files
  else if (depth === 1) additionalScore += 10; // One level deep
  else if (depth > 4) additionalScore -= 10; // Too deep

  // Prefer smaller files (likely more important/focused)
  if (file.size && file.size < 10000) additionalScore += 5;
  else if (file.size && file.size > 100000) additionalScore -= 5;

  // Boost common important file names
  const importantNames = ["index", "main", "app", "server", "config", "router"];
  if (importantNames.some((name) => file.name.toLowerCase().includes(name))) {
    additionalScore += 15;
  }

  return additionalScore;
}

/**
 * Get key files by category
 */
export function getKeyFilesByCategory(
  prioritizedFiles: FilePriority[],
  maxFiles = 50
): {
  api: FilePriority[];
  components: FilePriority[];
  config: FilePriority[];
  entry: FilePriority[];
  utils: FilePriority[];
} {
  const categories = {
    api: prioritizedFiles.filter((f) => f.category === "API").slice(0, 10),
    components: prioritizedFiles
      .filter((f) => f.category === "COMPONENT")
      .slice(0, 15),
    config: prioritizedFiles
      .filter((f) => f.category === "CONFIG")
      .slice(0, 10),
    entry: prioritizedFiles.filter((f) => f.category === "ENTRY").slice(0, 5),
    utils: prioritizedFiles.filter((f) => f.category === "UTIL").slice(0, 10),
  };

  // Ensure we don't exceed maxFiles total
  const totalFiles = Object.values(categories).reduce(
    (sum, cat) => sum + cat.length,
    0
  );
  if (totalFiles > maxFiles) {
    // Proportionally reduce each category
    const ratio = maxFiles / totalFiles;
    Object.keys(categories).forEach((key) => {
      const category = categories[key as keyof typeof categories];
      categories[key as keyof typeof categories] = category.slice(
        0,
        Math.floor(category.length * ratio)
      );
    });
  }

  return categories;
}
