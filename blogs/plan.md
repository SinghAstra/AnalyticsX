### MVP Plan: GitHub Repository Chat System

## Core Architecture: 2 API Routes

### Route 1: `/api/analyze` - Repository Processing

**Purpose:** Fetch, process, and cache repository data

### Route 2: `/api/chat` - Question Answering

**Purpose:** Handle user questions with intelligent retrieval

## Phase 1: Question Classification System

### Question Types & Strategies:

1. **OVERVIEW** ("What does this repo do?")

1. Data needed: README, package.json, repo metadata
1. Strategy: High-level summary

1. **FUNCTIONALITY** ("What functionality is implemented?")

1. Data needed: File structure + key files (routes, components, main modules)
1. Strategy: Feature extraction from structure + code

1. **IMPLEMENTATION** ("How is X functionality implemented?")

1. Data needed: Specific files related to X + their dependencies
1. Strategy: Code search + detailed analysis

1. **FILE_ANALYSIS** ("What does X file do?")

1. Data needed: Specific file content + its imports/exports
1. Strategy: Single file deep dive

1. **CODE_LOCATION** ("Where is code for handling X?")

1. Data needed: File structure + file names + function names
1. Strategy: Pattern matching + semantic search

## Phase 2: Data Collection Strategy

### Tier 1: Repository Overview (Always Fetch)

- Repository metadata (name, description, language)
- README.md content
- package.json/requirements.txt/etc.
- Top-level directory structure
- Main branch file tree (file paths only, no content)

### Tier 2: Key Files (Fetch for FUNCTIONALITY questions)

- API routes/endpoints (`/api`, `/routes`, `/controllers`)
- Main components (`/components`, `/src`, `/lib`)
- Configuration files (`.env.example`, `config.*`)
- Entry points (`index.js`, `main.py`, `app.js`)
- Database schemas/models

### Tier 3: Specific Content (Fetch on-demand)

- Individual file contents
- Related files based on imports/dependencies
- Test files for understanding usage

---

## Phase 3: Smart File Identification

### File Priority Matrix:

**High Priority:**

- Files with "main", "index", "app" in name
- API route files
- Component files in main directories
- Configuration files

**Medium Priority:**

- Utility files
- Helper functions
- Type definitions
- Documentation files

**Low Priority:**

- Test files (unless specifically asked)
- Build/dist files
- Node_modules equivalent

### File Selection Logic:

- **For OVERVIEW:** Top 5-10 most important files
- **For FUNCTIONALITY:** All high + medium priority files (max 50)
- **For IMPLEMENTATION:** Search-based file selection
- **For FILE_ANALYSIS:** Requested file + its direct dependencies
- **For CODE_LOCATION:** File tree + function/class names extraction

---

## Phase 4: Caching Strategy

### Cache Levels:

1. **Repository Metadata Cache** (24 hours)

1. Basic repo info, file structure, README

1. **File Content Cache** (6 hours)

1. Individual file contents
1. Key files bundle

1. **Analysis Cache** (1 hour)

1. Previous question-answer pairs
1. Processed summaries

### Cache Keys:

- `repo:{owner}/{name}:metadata`
- `repo:{owner}/{name}:files:{tier}`
- `repo:{owner}/{name}:analysis:{question_hash}`

---

## Phase 5: API Route Implementation Plan

### Route 1: `/api/analyze`

**Input:** `{ repoUrl: string }`
**Process:**

1. Extract owner/repo from URL
2. Check cache for existing data
3. Fetch Tier 1 data (always)
4. Store in cache
5. Return success status

**Output:** `{ status: 'success', cached: boolean }`

### Route 2: `/api/chat`

**Input:** `{ repoUrl: string, question: string }`
**Process:**

1. Classify question type using Gemini
2. Determine required data tier
3. Fetch additional data if needed
4. Construct context based on question type
5. Generate answer using Gemini
6. Cache result

**Output:** `{ answer: string, sources: string[] }`

---

## Phase 6: Context Construction Strategy

### For Each Question Type:

**OVERVIEW:**

```plaintext
Context = README + package.json + repo metadata + top-level structure
```

**FUNCTIONALITY:**

```plaintext
Context = file structure + key files content + configuration files
```

**IMPLEMENTATION:**

```plaintext
Context = search results for "X" + related files + function definitions
```

**FILE_ANALYSIS:**

```plaintext
Context = specific file content + imports + exports + file metadata
```

**CODE_LOCATION:**

```plaintext
Context = file tree + file names + function/class names + search results
```

---

## Phase 7: Error Handling & Fallbacks

### Graceful Degradation:

1. **GitHub API Rate Limits:** Use cached data + inform user
2. **Large Repositories:** Limit file fetching + prioritize key files
3. **Private Repositories:** Clear error message
4. **Gemini API Failures:** Retry logic + fallback responses
5. **Unknown Question Types:** Default to FUNCTIONALITY strategy

---

## Phase 8: MVP Success Metrics

### Must Work:

- ✅ Analyze any public GitHub repository
- ✅ Answer all 5 question types with reasonable accuracy
- ✅ Handle repositories up to 1000 files
- ✅ Response time under 10 seconds
- ✅ Basic caching to avoid redundant API calls

### Nice to Have:

- Smart file prioritization
- Context-aware follow-up questions
- Source file references in answers

---

## Implementation Timeline (5 Days)

**Day 1:** Question classification + basic GitHub API integration
**Day 2:** Tiered data fetching + file prioritization logic
**Day 3:** Context construction for each question type
**Day 4:** Gemini integration + answer generation
**Day 5:** Caching + error handling + testing

**Total Estimated Code:** ~500 lines across 2 API routes + utilities
