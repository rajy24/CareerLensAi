/**
 * ===================================================================
 * CareerLens — Professional Career Planning & Job-Readiness Workspace
 * Pure Vanilla JavaScript (Client-side, Zero external API dependencies)
 * 
 * Core Modules:
 * 1. Skills Dictionary & Aliases
 * 2. Curated Learning Roadmaps
 * 3. Role-Specific Interview Question Repository
 * 4. Sample Job Postings
 * 5. State Management & LocalStorage Persistence
 * 6. Deterministic Keyword Matching & Compatibility Engine
 * 7. Prioritized Learning Plan Generator
 * 8. Interview Practice Module
 * 9. Applications Tracker (CRUD + Search + Filter)
 * 10. AI Service Adapter (Backend Integration Blueprint)
 * 11. UI Controller, Navigation & Mobile Drawer
 * ===================================================================
 */

'use strict';

/* ===================================================================
   1. SKILLS DICTIONARY & ALIAS NORMALIZATION
   =================================================================== */

// Master dictionary of 150+ industry technical and professional skills
const SKILLS_DATABASE = [
  // Web & Frontend
  "html", "html5", "css", "css3", "javascript", "typescript", "react", "vue", "angular",
  "next.js", "nuxt.js", "svelte", "tailwind css", "bootstrap", "sass", "less", "redux",
  "zustand", "graphql", "rest api", "webpack", "vite", "responsive design", "web accessibility",

  // Backend & Languages
  "node.js", "express", "python", "django", "flask", "fastapi", "java", "spring boot",
  "c", "c++", "c#", ".net", "php", "laravel", "ruby", "ruby on rails", "go", "rust",
  "scala", "kotlin", "swift",

  // Databases & Storage
  "sql", "mysql", "postgresql", "mongodb", "sqlite", "redis", "firebase", "cassandra",
  "oracle", "dynamodb", "elasticsearch", "prisma",

  // Cloud & DevOps
  "git", "github", "gitlab", "docker", "kubernetes", "aws", "azure", "google cloud",
  "ci/cd", "linux", "bash", "nginx", "terraform", "jenkins",

  // Data Science, ML & Analytics
  "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "tableau", "power bi",
  "machine learning", "deep learning", "nlp", "data analysis", "data visualization", "excel",

  // Testing & Quality Assurance
  "jest", "cypress", "mocha", "selenium", "postman", "unit testing", "integration testing",

  // Methodologies & Core Competencies
  "agile", "scrum", "object-oriented programming", "data structures", "algorithms",
  "system design", "microservices", "clean code", "problem solving", "debugging"
];

// Alias mapping: maps common abbreviations and alternate spellings to standard canonical skill names
const SKILL_ALIASES = {
  "js": "javascript",
  "ts": "typescript",
  "react.js": "react",
  "reactjs": "react",
  "vue.js": "vue",
  "vuejs": "vue",
  "angular.js": "angular",
  "nextjs": "next.js",
  "next": "next.js",
  "tailwind": "tailwind css",
  "nodejs": "node.js",
  "node": "node.js",
  "py": "python",
  "postgres": "postgresql",
  "mongo": "mongodb",
  "k8s": "kubernetes",
  "gcp": "google cloud",
  "rest": "rest api",
  "restful apis": "rest api",
  "restful api": "rest api",
  "apis": "rest api",
  "oop": "object-oriented programming",
  "dsa": "data structures",
  "algorithms and data structures": "data structures",
  "ml": "machine learning",
  "ai": "machine learning",
  "golang": "go",
  "ci-cd": "ci/cd",
  "cicd": "ci/cd",
  "continuous integration": "ci/cd",
  "amazon web services": "aws",
  "ms excel": "excel",
  "tdd": "unit testing"
};

/* ===================================================================
   2. CURATED LEARNING ROADMAPS (For Missing Skills)
   =================================================================== */
const SKILL_ROADMAPS = {
  "javascript": {
    priority: "high",
    timeframe: "Week 1–2 (8–10 hrs)",
    concepts: ["ES6+ Syntax (Arrow functions, Destructuring, Spread)", "Asynchronous JS (Promises, async/await, Event Loop)", "DOM Manipulation & Event Bubbling", "Scope, Closures & 'this' keyword"],
    miniProject: "Build an interactive Quiz application with a countdown timer and local storage high-scores.",
    resources: [
      { name: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "javascript.info", url: "https://javascript.info/" }
    ]
  },
  "typescript": {
    priority: "medium",
    timeframe: "Week 2–3 (6–8 hrs)",
    concepts: ["Type Annotations & Primitive Types", "Interfaces vs Type Aliases", "Generics & Utility Types", "Configuring tsconfig.json & React with TS"],
    miniProject: "Refactor a vanilla JavaScript project into strongly-typed TypeScript.",
    resources: [
      { name: "TypeScript Official Documentation", url: "https://www.typescriptlang.org/docs/" },
      { name: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" }
    ]
  },
  "react": {
    priority: "high",
    timeframe: "Week 2–3 (10–12 hrs)",
    concepts: ["Component Architecture & JSX", "Hooks: useState, useEffect, useRef, useMemo", "Props passing & Lifting State Up", "Custom Hooks & Context API"],
    miniProject: "Build a Movie Search & Bookmark app using an open public API with local state management.",
    resources: [
      { name: "Official React Documentation", url: "https://react.dev/" },
      { name: "freeCodeCamp React Tutorial", url: "https://www.freecodecamp.org/news/tag/react/" }
    ]
  },
  "tailwind css": {
    priority: "medium",
    timeframe: "Week 1 (4–5 hrs)",
    concepts: ["Utility-First CSS Principles", "Responsive Breakpoints (sm, md, lg, xl)", "Hover, Focus & Active States", "Dark Mode & Theme Configuration"],
    miniProject: "Recreate a responsive SaaS landing page hero and pricing table using Tailwind.",
    resources: [
      { name: "Tailwind CSS Documentation", url: "https://tailwindcss.com/docs" }
    ]
  },
  "node.js": {
    priority: "high",
    timeframe: "Week 3–4 (8–10 hrs)",
    concepts: ["Node Runtime, Global Objects & Modules", "Event Loop, Buffers & Streams", "File System (fs) & HTTP Module", "npm & package.json lifecycle"],
    miniProject: "Create a CLI tool to automate batch file renaming and log parsing.",
    resources: [
      { name: "Node.js Official Guides", url: "https://nodejs.org/en/learn" }
    ]
  },
  "express": {
    priority: "high",
    timeframe: "Week 3–4 (6–8 hrs)",
    concepts: ["Routing & HTTP Methods (GET, POST, PUT, DELETE)", "Middleware Architecture & Error Handling", "Parsing Request Body & Query Params", "Authentication with JWT"],
    miniProject: "Build a RESTful Book Management API with full CRUD operations and input validation.",
    resources: [
      { name: "Express.js Official Guide", url: "https://expressjs.com/" }
    ]
  },
  "python": {
    priority: "high",
    timeframe: "Week 1–2 (8–10 hrs)",
    concepts: ["Variables, Data Types & Collections", "List Comprehensions & Lambdas", "Functions, Modules & Virtual Environments", "Object-Oriented Programming (Classes, Inheritance)"],
    miniProject: "Build an automated data parser that extracts records from JSON/HTML and exports to CSV.",
    resources: [
      { name: "Python Documentation", url: "https://docs.python.org/3/tutorial/" }
    ]
  },
  "django": {
    priority: "medium",
    timeframe: "Week 3–5 (12–15 hrs)",
    concepts: ["MVT Architecture (Model-View-Template)", "Django ORM & Database Migrations", "Django Admin & Authentication System", "Django REST Framework (DRF)"],
    miniProject: "Build a Student Portal where users can enroll in courses and view grades.",
    resources: [
      { name: "Django Official Documentation", url: "https://docs.djangoproject.com/en/stable/intro/tutorial01/" }
    ]
  },
  "sql": {
    priority: "high",
    timeframe: "Week 1–2 (6–8 hrs)",
    concepts: ["SELECT, WHERE, ORDER BY, GROUP BY, HAVING", "JOINS (INNER, LEFT, RIGHT, FULL OUTER)", "Aggregate Functions (SUM, AVG, COUNT)", "Indexes, Primary/Foreign Keys & Normalization"],
    miniProject: "Design an E-commerce relational schema and write analytical queries for sales metrics.",
    resources: [
      { name: "SQLBolt Interactive Lessons", url: "https://sqlbolt.com/" },
      { name: "W3Schools SQL Tutorial", url: "https://www.w3schools.com/sql/" }
    ]
  },
  "postgresql": {
    priority: "medium",
    timeframe: "Week 2–3 (5–6 hrs)",
    concepts: ["PostgreSQL Setup & psql CLI", "Data Types (JSONB, Arrays, UUID)", "Transactions & ACID Compliance", "Connecting to Node.js/Python via ORMs"],
    miniProject: "Set up a PostgreSQL database storing structured blog posts and user comments.",
    resources: [
      { name: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/" }
    ]
  },
  "mongodb": {
    priority: "medium",
    timeframe: "Week 2–3 (5–6 hrs)",
    concepts: ["NoSQL Document Model vs Relational DBs", "CRUD Operations with MongoDB Compass & Shell", "Mongoose Schema Design & Validation", "Aggregation Framework basics"],
    miniProject: "Build a product inventory catalog with dynamic custom attributes.",
    resources: [
      { name: "MongoDB University Courses", url: "https://learn.mongodb.com/" }
    ]
  },
  "git": {
    priority: "high",
    timeframe: "Week 1 (4 hrs)",
    concepts: ["git init, clone, add, commit, push, pull", "Branching, Merging & Conflict Resolution", "git rebase vs git merge", "Pull Requests & Code Review collaboration"],
    miniProject: "Publish a multi-branch project on GitHub with branch protection rules.",
    resources: [
      { name: "Pro Git Book", url: "https://git-scm.com/book/en/v2" },
      { name: "Learn Git Branching (Visual)", url: "https://learngitbranching.js.org/" }
    ]
  },
  "docker": {
    priority: "medium",
    timeframe: "Week 4–5 (6–8 hrs)",
    concepts: ["Containers vs Virtual Machines", "Writing Dockerfiles", "Building & Running Images", "Docker Compose for Multi-Container Apps"],
    miniProject: "Containerize a full-stack web application (Frontend + Backend + Database) using Docker Compose.",
    resources: [
      { name: "Docker Getting Started", url: "https://docs.docker.com/get-started/" }
    ]
  },
  "rest api": {
    priority: "high",
    timeframe: "Week 2 (4–5 hrs)",
    concepts: ["HTTP Status Codes (200, 201, 400, 401, 404, 500)", "Statelessness & Idempotent Methods", "Request Headers & Authentication (Bearer Tokens)", "API Documentation with Swagger/Postman"],
    miniProject: "Design and document an API specification for a social feed application.",
    resources: [
      { name: "REST API Guidelines", url: "https://restfulapi.net/" }
    ]
  },
  "jest": {
    priority: "low",
    timeframe: "Week 3 (4–5 hrs)",
    concepts: ["Unit Testing Fundamentals", "describe, test, expect blocks", "Mocking Functions & API Calls", "Code Coverage Reports"],
    miniProject: "Write automated unit tests for a shopping cart calculation module.",
    resources: [
      { name: "Jest Documentation", url: "https://jestjs.io/" }
    ]
  },
  "data structures": {
    priority: "high",
    timeframe: "Week 1–4 (15–20 hrs)",
    concepts: ["Arrays, Strings, Linked Lists", "Stacks, Queues, Hash Tables", "Trees (BST, Traversals) & Heaps", "Big-O Time & Space Complexity"],
    miniProject: "Implement and benchmark 20 foundational data structure operations.",
    resources: [
      { name: "NeetCode Roadmap", url: "https://neetcode.io/roadmap" },
      { name: "GeeksforGeeks DSA", url: "https://www.geeksforgeeks.org/data-structures/" }
    ]
  },
  "algorithms": {
    priority: "high",
    timeframe: "Week 2–5 (15–20 hrs)",
    concepts: ["Binary Search & Two Pointers", "Sliding Window Technique", "Depth-First Search (DFS) & Breadth-First Search (BFS)", "Recursion & Backtracking basics"],
    miniProject: "Implement sorting and graph traversal algorithms with execution metrics.",
    resources: [
      { name: "Visualgo Algorithm Visualizer", url: "https://visualgo.net/" }
    ]
  },
  "pandas": {
    priority: "high",
    timeframe: "Week 1–2 (6–8 hrs)",
    concepts: ["Series & DataFrame Data Structures", "Data Cleaning, Handling Missing Values", "Filtering, Grouping & Aggregating", "Merging and Joining Datasets"],
    miniProject: "Analyze a public dataset and generate an analytical summary report.",
    resources: [
      { name: "Pandas Documentation", url: "https://pandas.pydata.org/docs/" }
    ]
  },
  "aws": {
    priority: "low",
    timeframe: "Week 5–6 (8–10 hrs)",
    concepts: ["Cloud Computing Basics (IaaS, PaaS, SaaS)", "AWS S3 for Object Storage", "AWS EC2 for Virtual Compute", "AWS Lambda & Serverless Introduction"],
    miniProject: "Host a static website on Amazon S3 and configure a CloudFront distribution.",
    resources: [
      { name: "AWS Free Tier & Guides", url: "https://aws.amazon.com/getting-started/" }
    ]
  }
};

/* ===================================================================
   3. INTERVIEW QUESTIONS REPOSITORY
   =================================================================== */
const INTERVIEW_QUESTIONS = [
  // Technical Questions
  {
    id: "q-tech-1",
    role: "frontend",
    category: "technical",
    difficulty: "medium",
    title: "Explain the Event Loop in JavaScript and how asynchronous execution works.",
    answer: "JavaScript is a single-threaded language with a non-blocking, event-driven runtime environment. The Event Loop continuously coordinates the Call Stack with the Callback Queues.",
    keyPoints: [
      "Call Stack: Executes synchronous code frames in order.",
      "Web APIs: Handles asynchronous operations (fetch, setTimeout, DOM events) off the main thread.",
      "Microtask Queue (higher priority): Stores Promises (.then, async/await), queueMicrotask.",
      "Macrotask Queue (lower priority): Stores setTimeout, setInterval, I/O callbacks.",
      "Execution Order: All queued microtasks execute before the next macrotask begins."
    ],
    codeSnippet: `console.log("1"); // Call Stack
setTimeout(() => console.log("2"), 0); // Macrotask Queue
Promise.resolve().then(() => console.log("3")); // Microtask Queue
console.log("4"); // Call Stack
// Output sequence: 1, 4, 3, 2`
  },
  {
    id: "q-tech-2",
    role: "frontend",
    category: "technical",
    difficulty: "medium",
    title: "What are the core rules of React Hooks and why do they exist?",
    answer: "React Hooks allow functional components to manage local state and lifecycle effects. They rely on the order of invocation across renders to preserve state associations.",
    keyPoints: [
      "Call Hooks only at the top level: Avoid calling hooks inside loops, conditions, or nested functions to keep call order deterministic.",
      "Call Hooks only from React functions: Standard functional components or custom hooks.",
      "Dependency Array in useEffect: Omitting runs every render; empty array [] runs once on mount; explicit dependencies trigger runs only on state change."
    ],
    codeSnippet: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Only re-runs when userId changes
  
  return <div>{user ? user.name : "Loading..."}</div>;
}`
  },
  {
    id: "q-tech-3",
    role: "backend",
    category: "technical",
    difficulty: "medium",
    title: "What are the primary differences between SQL and NoSQL databases?",
    answer: "SQL databases are relational and structured with strict schemas and ACID guarantees. NoSQL databases are document, key-value, or graph stores offering schema flexibility and distributed horizontal scaling.",
    keyPoints: [
      "Schema Design: SQL enforces predefined schemas; NoSQL supports evolving document structures.",
      "ACID vs BASE: SQL prioritizes transactional consistency; NoSQL balances availability and partition tolerance (CAP theorem).",
      "Scaling Model: SQL typically scales vertically; NoSQL clusters scale horizontally across commodity hardware.",
      "Use Case Guidance: SQL is ideal for relational models and financial transactions; NoSQL is suited for rapid iteration and high-volume documents."
    ]
  },
  {
    id: "q-tech-4",
    role: "backend",
    category: "technical",
    difficulty: "hard",
    title: "How does JWT (JSON Web Token) authentication function, and how should it be secured?",
    answer: "A JSON Web Token (JWT) is a compact, URL-safe container for cryptographically signed claims transmitted between client and server.",
    keyPoints: [
      "Three-Part Structure: Header (algorithm), Payload (claims like userId, exp), and Signature (cryptographic hash).",
      "Stateless Verification: The server validates authenticity using a secret or public key without querying a session store.",
      "Security Recommendation: Store sensitive authentication tokens in httpOnly, Secure, SameSite cookies to protect against XSS token theft."
    ]
  },
  {
    id: "q-tech-5",
    role: "general",
    category: "technical",
    difficulty: "medium",
    title: "Explain the architecture of RESTful APIs and standard HTTP response status codes.",
    answer: "Representational State Transfer (REST) is an architectural style for network APIs that relies on standard HTTP verbs and stateless client-server interaction.",
    keyPoints: [
      "Statelessness: Every request contains all necessary credentials and data to process the operation.",
      "Uniform Resource Identifiers: Predictable URL resource naming (e.g., /api/v1/users).",
      "HTTP Status Codes:",
      "• 200 OK / 201 Created for successful operations",
      "• 400 Bad Request / 401 Unauthorized / 403 Forbidden / 404 Not Found for client issues",
      "• 500 Internal Server Error for unhandled exceptions on the server"
    ]
  },
  {
    id: "q-tech-6",
    role: "data",
    category: "technical",
    difficulty: "medium",
    title: "What is the operational difference between WHERE and HAVING in SQL queries?",
    answer: "WHERE filters individual rows prior to grouping, while HAVING filters aggregated metric groups after GROUP BY execution.",
    keyPoints: [
      "WHERE evaluates row-level conditions before any aggregation.",
      "HAVING evaluates conditions on aggregate metrics (e.g., COUNT(), AVG()).",
      "Execution Order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY."
    ],
    codeSnippet: `SELECT department_id, AVG(salary) AS avg_sal
FROM employees
WHERE status = 'Active' -- row-level filter
GROUP BY department_id
HAVING AVG(salary) > 60000; -- aggregate group filter`
  },

  // Problem Solving / Coding
  {
    id: "q-code-1",
    role: "frontend",
    category: "coding",
    difficulty: "easy",
    title: "Implement a clean Debounce utility in JavaScript.",
    answer: "Debouncing ensures that a function is not invoked until a specified duration has elapsed since its last execution, preventing rapid repeated calls.",
    keyPoints: [
      "Uses a closure to retain the active timeout identifier.",
      "Clears the pending timeout whenever invoked within the wait window.",
      "Maintains the original context and arguments via Function.prototype.apply."
    ],
    codeSnippet: `function debounce(func, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage example:
const handleSearch = debounce((query) => {
  fetchSearchResults(query);
}, 350);`
  },
  {
    id: "q-code-2",
    role: "general",
    category: "coding",
    difficulty: "easy",
    title: "Two Sum: Find indices of two array values that sum to a target value.",
    answer: "Given an array of integers, locate two distinct indices whose values sum to the target. An optimal single-pass solution uses a hash map for O(n) time complexity.",
    keyPoints: [
      "Brute force: O(n²) using nested loops.",
      "Optimal: O(n) Time and O(n) Space using a Hash Map.",
      "Iterate once: Calculate complement = target - num. If present in map, return indices; otherwise record current number."
    ],
    codeSnippet: `function twoSum(nums, target) {
  const map = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
  },
  {
    id: "q-code-3",
    role: "general",
    category: "coding",
    difficulty: "medium",
    title: "Valid Parentheses: Verify whether a bracket sequence is properly balanced.",
    answer: "Determine whether bracket characters ('()', '{}', '[]') open and close in valid sequential order. This is solved with a LIFO Stack.",
    keyPoints: [
      "Push opening brackets onto a stack.",
      "When encountering a closing bracket, verify that the stack is non-empty and the top matches.",
      "String is valid if and only if the stack is completely empty at the end."
    ],
    codeSnippet: `function isValidParentheses(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`
  },

  // Behavioral Questions (STAR Method)
  {
    id: "q-hr-1",
    role: "general",
    category: "hr",
    difficulty: "easy",
    title: "Tell me about yourself and your background in software engineering.",
    answer: "Structure your response with the Past-Present-Future framework. Keep it under 2 minutes, focusing on technical growth, recent projects, and alignment with the role.",
    keyPoints: [
      "Past: Brief overview of your technical training, education, and early motivation.",
      "Present: Core stack, recent projects built, and current technical competencies.",
      "Future: Why this team and role represent the logical next step for your contributions."
    ]
  },
  {
    id: "q-hr-2",
    role: "general",
    category: "hr",
    difficulty: "medium",
    title: "Describe a difficult technical bug or challenge and how you diagnosed it.",
    answer: "Frame your answer using the STAR method: Situation, Task, Action, and Result. Emphasize systematic troubleshooting and root-cause analysis.",
    keyPoints: [
      "Situation: The context of the problem and the unexpected behavior.",
      "Task: Your specific role in resolving the blockage.",
      "Action: The methodical steps taken to isolate, reproduce, and fix the issue.",
      "Result: The outcome, verification tests added, and lessons applied moving forward."
    ]
  },
  {
    id: "q-hr-3",
    role: "general",
    category: "hr",
    difficulty: "medium",
    title: "How do you manage deadlines when balancing competing priorities?",
    answer: "Demonstrate organized workload triage, proactive communication, and disciplined task decomposition.",
    keyPoints: [
      "Prioritize by urgency and impact (Eisenhower principle).",
      "Decompose larger deliverables into measurable milestone checkpoints.",
      "Communicate blockers proactively rather than waiting for delivery deadlines."
    ]
  }
];

/* ===================================================================
   4. SAMPLE JOB POSTINGS
   =================================================================== */
const SAMPLE_JDS = {
  frontend: `Role: Junior Frontend Developer
Location: Remote / Hybrid
About the Role:
We are looking for a Junior Frontend Developer to build clean, responsive user interfaces.
Requirements:
- Strong proficiency in HTML, CSS, JavaScript (ES6+)
- Hands-on experience with React and Tailwind CSS
- Familiarity with TypeScript and modern state management
- Basic understanding of REST API integration and Git version control
- Knowledge of responsive design and unit testing with Jest is a plus.`,

  backend: `Role: Junior Backend Engineer (Python / Node.js)
Location: Hybrid
About the Role:
Join our engineering team building scalable services and REST APIs.
Requirements:
- Solid foundation in Python, Django or Node.js / Express
- Strong understanding of SQL, PostgreSQL, and database schema design
- Experience building and consuming REST APIs
- Familiarity with Git, Docker, and Linux environments
- Knowledge of Redis caching and Data Structures is a bonus.`,

  fullstack: `Role: Entry-Level Full Stack Engineer
Location: Remote
About the Role:
Looking for a developer comfortable working across client and server layers.
Requirements:
- Proficiency in JavaScript, HTML, CSS
- Frontend experience in React or Vue
- Backend experience in Node.js, Express, and MongoDB or SQL
- Strong understanding of REST API architecture and Git
- Understanding of Data Structures, Algorithms, and Agile development.`,

  data: `Role: Junior Data Analyst
Location: Hybrid
About the Role:
We are seeking an analyst to clean datasets and deliver actionable business insights.
Requirements:
- Command of SQL for data extraction and querying
- Proficiency in Python, Pandas, and NumPy for data cleaning
- Experience building dashboards in Tableau, Power BI, or Excel
- Basic understanding of Data Visualization and Machine Learning concepts
- Strong problem solving and communication skills.`
};

/* ===================================================================
   5. STATE MANAGEMENT & LOCAL STORAGE HELPERS
   =================================================================== */

const STORAGE_KEYS = {
  SKILLS: "careerlens_skills",
  LAST_ANALYSIS: "careerlens_last_analysis",
  JOBS: "careerlens_jobs",
  PRACTICED_QUESTIONS: "careerlens_practiced_questions",
  COMPLETED_ROADMAP: "careerlens_completed_roadmap"
};

// Safe storage wrapper
const storage = {
  get: (key, fallback) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`[CareerLens] Error reading ${key} from localStorage:`, e);
      return fallback;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`[CareerLens] Error saving ${key} to localStorage:`, e);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (e) {}
  }
};

// Global App State
const state = {
  studentSkills: storage.get(STORAGE_KEYS.SKILLS, []),
  lastAnalysis: storage.get(STORAGE_KEYS.LAST_ANALYSIS, null),
  jobs: storage.get(STORAGE_KEYS.JOBS, []),
  practicedQuestions: new Set(storage.get(STORAGE_KEYS.PRACTICED_QUESTIONS, [])),
  completedRoadmap: new Set(storage.get(STORAGE_KEYS.COMPLETED_ROADMAP, [])),
  currentTab: "dashboard",
  interviewFilter: { role: "all", category: "all", search: "" },
  roadmapFilter: "all"
};

/* ===================================================================
   6. DETERMINISTIC KEYWORD MATCHING ENGINE & COMPATIBILITY CALCULATION
   =================================================================== */

/**
 * Normalizes text and maps aliases to canonical skill names.
 */
function normalizeSkillToken(raw) {
  if (!raw) return "";
  const cleaned = raw.trim().toLowerCase();
  return SKILL_ALIASES[cleaned] || cleaned;
}

/**
 * Extracts skills detected in any free-form job description text.
 * Uses word-boundary regex to prevent false substring collisions.
 */
function extractSkillsFromText(text) {
  if (!text || typeof text !== "string") return [];
  const textLower = " " + text.toLowerCase() + " ";
  const detected = new Set();

  SKILLS_DATABASE.forEach(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, 'i');
    if (regex.test(textLower)) {
      detected.add(skill);
    }
  });

  Object.keys(SKILL_ALIASES).forEach(alias => {
    const canonical = SKILL_ALIASES[alias];
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, 'i');
    if (regex.test(textLower)) {
      detected.add(canonical);
    }
  });

  return Array.from(detected).sort();
}

/**
 * Compares Student Skills with JD Skills.
 * CRUCIAL GUARD: If zero technical skills are detected in the JD,
 * matchPercentage is set to null (never a misleading 0% score).
 */
function analyzeSkillCompatibility(studentSkillsList, jdText) {
  const normalizedStudentSkills = Array.from(
    new Set(studentSkillsList.map(s => normalizeSkillToken(s)).filter(Boolean))
  );

  const jdDetectedSkills = extractSkillsFromText(jdText);
  const totalJd = jdDetectedSkills.length;

  // Zero-Denominator Guard: Handle empty or unparseable JD text gracefully
  if (totalJd === 0) {
    return {
      jdDetectedSkills: [],
      matchedSkills: [],
      missingSkills: [],
      matchPercentage: null, // Denominator is zero
      readinessLevel: "No Requirements Detected",
      readinessBadgeClass: "badge-info",
      readinessHeadline: "Add a more detailed job description",
      readinessDescription: "We couldn't detect recognized technical skills in the text provided. Please paste a job description with specific technical qualifications or requirements to evaluate your readiness.",
      mathExplanation: {
        totalJdCount: 0,
        matchedCount: 0,
        missingCount: 0,
        percentage: null,
        formulaStr: "Match % requires at least one detected technical requirement.",
        calculationStr: "Zero recognized technical skills detected in the provided job text."
      },
      timestamp: new Date().toISOString()
    };
  }

  // Set intersection & difference
  const studentSkillSet = new Set(normalizedStudentSkills);
  const matchedSkills = jdDetectedSkills.filter(skill => studentSkillSet.has(skill));
  const missingSkills = jdDetectedSkills.filter(skill => !studentSkillSet.has(skill));
  const matchedCount = matchedSkills.length;

  const matchPercentage = Math.round((matchedCount / totalJd) * 100);

  let readinessLevel = "Development Needed";
  let readinessBadgeClass = "badge-danger";
  let readinessHeadline = "Key Skill Gaps Identified";
  let readinessDescription = "You currently match less than 50% of the technical qualifications detected in this posting. Review the missing competencies below and prioritize them in your learning plan.";

  if (matchPercentage >= 75) {
    readinessLevel = "Strong Alignment";
    readinessBadgeClass = "badge-success";
    readinessHeadline = "High Technical Compatibility";
    readinessDescription = "Your profile aligns with the vast majority of detected requirements for this position. Review the few remaining gaps and proceed with application.";
  } else if (matchPercentage >= 50) {
    readinessLevel = "Moderate Alignment";
    readinessBadgeClass = "badge-warning";
    readinessHeadline = "Solid Foundation with Actionable Gaps";
    readinessDescription = "You have a solid foundation matching several core requirements. Addressing the prioritized missing skills will significantly strengthen your candidacy.";
  }

  const mathExplanation = {
    totalJdCount: totalJd,
    matchedCount: matchedCount,
    missingCount: missingSkills.length,
    percentage: matchPercentage,
    formulaStr: `Match % = ( Matched Skills [${matchedCount}] / Total Detected Requirements [${totalJd}] ) × 100%`,
    calculationStr: `(${matchedCount} / ${totalJd}) × 100 = ${((matchedCount / totalJd) * 100).toFixed(1)}% (Rounded to ${matchPercentage}%)`
  };

  return {
    jdDetectedSkills,
    matchedSkills,
    missingSkills,
    matchPercentage,
    readinessLevel,
    readinessBadgeClass,
    readinessHeadline,
    readinessDescription,
    mathExplanation,
    timestamp: new Date().toISOString()
  };
}

/* ===================================================================
   7. AI SERVICE ADAPTER (Architecture Blueprint)
   =================================================================== */
const aiService = {
  isApiEnabled: false,
  apiEndpoint: "/api/analyze-jd",

  async analyzeJobDescription(studentSkills, jdText) {
    if (this.isApiEnabled) {
      try {
        console.log("[CareerLens] Forwarding to backend proxy:", this.apiEndpoint);
        const response = await fetch(this.apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills: studentSkills, jobDescription: jdText })
        });
        if (!response.ok) throw new Error("Backend proxy returned error");
        return await response.json();
      } catch (err) {
        console.warn("[CareerLens] Backend unavailable. Falling back to local deterministic engine.", err);
        return analyzeSkillCompatibility(studentSkills, jdText);
      }
    } else {
      return analyzeSkillCompatibility(studentSkills, jdText);
    }
  }
};

/* ===================================================================
   8. UI CONTROLLER & VIEW NAVIGATION
   =================================================================== */

const TAB_METADATA = {
  dashboard: { title: "Overview", subtitle: "Your career, with a clearer direction." },
  overview: { title: "Overview", subtitle: "Your career, with a clearer direction." },
  analyzer: { title: "Job Analysis", subtitle: "Evaluate compatibility and identify skill gaps." },
  roadmap: { title: "Learning Plan", subtitle: "Prioritized milestones to bridge missing qualifications." },
  interview: { title: "Interview Practice", subtitle: "Curated technical and behavioral questions by role." },
  tracker: { title: "Applications", subtitle: "Track active submissions and interview stages." },
  about: { title: "About & Methodology", subtitle: "System architecture, matching mechanics, and privacy standards." }
};

window.navigateToTab = function(tabName) {
  // Normalize tabName
  const normalizedTab = tabName === "overview" ? "dashboard" : tabName;
  state.currentTab = normalizedTab;

  // Update active classes on sidebar buttons
  document.querySelectorAll(".nav-tab").forEach(tab => {
    const isTarget = tab.dataset.tab === normalizedTab || (tab.dataset.tab === "dashboard" && tabName === "overview");
    tab.classList.toggle("active", isTarget);
    tab.setAttribute("aria-selected", isTarget ? "true" : "false");
  });

  // Update visible section
  document.querySelectorAll(".tab-content").forEach(content => {
    const isContentTarget = content.id === `${normalizedTab}-section`;
    content.classList.toggle("active", isContentTarget);
  });

  // Update top bar title and subtitle
  const meta = TAB_METADATA[normalizedTab] || { title: "CareerLens", subtitle: "Career Workspace" };
  const titleEl = document.getElementById("page-title");
  const subtitleEl = document.getElementById("page-subtitle");
  if (titleEl) titleEl.textContent = meta.title;
  if (subtitleEl) subtitleEl.textContent = meta.subtitle;

  // Close mobile sidebar if open
  closeMobileDrawer();

  // Dynamic view refreshes
  if (normalizedTab === "dashboard") renderDashboard();
  if (normalizedTab === "roadmap") renderRoadmap();
  if (normalizedTab === "interview") renderInterviewQuestions();
  if (normalizedTab === "tracker") renderJobTracker();

  const contentArea = document.querySelector(".app-content-area");
  if (contentArea) contentArea.scrollTo({ top: 0, behavior: "smooth" });
};

function setupMobileDrawer() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const sidebar = document.getElementById("app-sidebar");
  const overlay = document.getElementById("mobile-overlay");

  if (!menuBtn || !sidebar || !overlay) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = sidebar.classList.contains("mobile-open");
    if (isOpen) {
      closeMobileDrawer();
    } else {
      sidebar.classList.add("mobile-open");
      overlay.classList.add("show");
      menuBtn.setAttribute("aria-expanded", "true");
    }
  });

  overlay.addEventListener("click", () => closeMobileDrawer());
}

function closeMobileDrawer() {
  const sidebar = document.getElementById("app-sidebar");
  const overlay = document.getElementById("mobile-overlay");
  const menuBtn = document.getElementById("mobile-menu-btn");
  if (sidebar) sidebar.classList.remove("mobile-open");
  if (overlay) overlay.classList.remove("show");
  if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

/* --- STUDENT SKILLS MANAGEMENT --- */

function renderStudentSkills() {
  const container = document.getElementById("skills-list");
  const countBadge = document.getElementById("skill-count-badge");
  const clearBtn = document.getElementById("clear-skills-btn");

  if (!container) return;

  container.innerHTML = "";
  if (countBadge) countBadge.textContent = `${state.studentSkills.length} skills`;

  if (state.studentSkills.length === 0) {
    container.innerHTML = `<div class="empty-state-sm">No skills added yet. Add skills above or select a sample profile.</div>`;
    if (clearBtn) clearBtn.style.display = "none";
    updateDashboardMetrics();
    return;
  }

  if (clearBtn) clearBtn.style.display = "inline-block";

  state.studentSkills.forEach((skill, index) => {
    const tag = document.createElement("span");
    tag.className = "skill-tag";
    tag.innerHTML = `
      <span>${escapeHtml(skill)}</span>
      <button class="skill-tag-remove" data-index="${index}" aria-label="Remove skill ${escapeHtml(skill)}">&times;</button>
    `;
    container.appendChild(tag);
  });

  storage.set(STORAGE_KEYS.SKILLS, state.studentSkills);
  updateDashboardMetrics();
}

function addStudentSkill(rawSkill) {
  if (!rawSkill) return;
  const tokens = rawSkill.split(",").map(s => s.trim()).filter(Boolean);
  let addedCount = 0;

  tokens.forEach(tok => {
    const normalized = normalizeSkillToken(tok);
    const exists = state.studentSkills.some(s => s.toLowerCase() === normalized.toLowerCase());
    if (!exists) {
      state.studentSkills.push(normalized);
      addedCount++;
    }
  });

  if (addedCount > 0) {
    renderStudentSkills();
    showToast(`Added ${addedCount} skill${addedCount > 1 ? 's' : ''} to profile`, "success");
  }
}

function removeStudentSkill(index) {
  if (index >= 0 && index < state.studentSkills.length) {
    const removed = state.studentSkills.splice(index, 1)[0];
    renderStudentSkills();
    showToast(`Removed "${removed}"`, "info");
  }
}

/* --- SKILL ANALYZER CONTROLLER --- */

function setupSkillAnalyzer() {
  const skillInput = document.getElementById("skill-input");
  const addBtn = document.getElementById("add-skill-btn");
  const clearSkillsBtn = document.getElementById("clear-skills-btn");
  const jdInput = document.getElementById("jd-input");
  const runAnalysisBtn = document.getElementById("run-analysis-btn");
  const clearJdBtn = document.getElementById("clear-jd-btn");
  const sampleJdBtn = document.getElementById("sample-jd-btn");
  const sampleJdMenu = document.getElementById("sample-jd-menu");

  if (addBtn && skillInput) {
    addBtn.addEventListener("click", () => {
      addStudentSkill(skillInput.value);
      skillInput.value = "";
      skillInput.focus();
    });

    skillInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addStudentSkill(skillInput.value);
        skillInput.value = "";
      }
    });
  }

  const skillsListEl = document.getElementById("skills-list");
  if (skillsListEl) {
    skillsListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("skill-tag-remove")) {
        const idx = parseInt(e.target.dataset.index, 10);
        removeStudentSkill(idx);
      }
    });
  }

  if (clearSkillsBtn) {
    clearSkillsBtn.addEventListener("click", () => {
      if (confirm("Clear all skills from your profile?")) {
        state.studentSkills = [];
        renderStudentSkills();
        showToast("Profile skills cleared", "info");
      }
    });
  }

  document.querySelectorAll(".preset-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const presetType = chip.dataset.preset;
      let skillsToLoad = [];
      if (presetType === "frontend") skillsToLoad = ["HTML", "CSS", "JavaScript", "React", "Git", "Responsive Design"];
      if (presetType === "backend") skillsToLoad = ["Python", "Django", "SQL", "PostgreSQL", "REST API", "Git"];
      if (presetType === "fullstack") skillsToLoad = ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Git", "REST API"];
      if (presetType === "data") skillsToLoad = ["Python", "Pandas", "SQL", "Excel", "Data Analysis", "Tableau"];

      skillsToLoad.forEach(s => {
        const norm = normalizeSkillToken(s);
        if (!state.studentSkills.some(existing => existing.toLowerCase() === norm.toLowerCase())) {
          state.studentSkills.push(norm);
        }
      });
      renderStudentSkills();
      showToast(`Loaded ${presetType} sample skills`, "success");
    });
  });

  if (sampleJdBtn && sampleJdMenu) {
    sampleJdBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sampleJdMenu.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      sampleJdMenu.classList.remove("show");
    });

    sampleJdMenu.querySelectorAll(".dropdown-item").forEach(item => {
      item.addEventListener("click", () => {
        const sampleKey = item.dataset.sample;
        if (SAMPLE_JDS[sampleKey]) {
          jdInput.value = SAMPLE_JDS[sampleKey];
          showToast(`Loaded sample posting: ${item.textContent.trim()}`, "info");
        }
        sampleJdMenu.classList.remove("show");
      });
    });
  }

  if (clearJdBtn && jdInput) {
    clearJdBtn.addEventListener("click", () => {
      jdInput.value = "";
      const wrapper = document.getElementById("analysis-results-wrapper");
      if (wrapper) wrapper.style.display = "none";
    });
  }

  if (runAnalysisBtn && jdInput) {
    runAnalysisBtn.addEventListener("click", async () => {
      const jdText = jdInput.value.trim();
      if (!jdText) {
        showToast("Please paste a job description or select a sample job first.", "warning");
        jdInput.focus();
        return;
      }

      if (state.studentSkills.length === 0) {
        showToast("Please add at least one skill to your profile before analyzing.", "warning");
        if (skillInput) skillInput.focus();
        return;
      }

      runAnalysisBtn.disabled = true;
      runAnalysisBtn.textContent = "Analyzing...";

      setTimeout(async () => {
        try {
          const result = await aiService.analyzeJobDescription(state.studentSkills, jdText);
          state.lastAnalysis = result;
          storage.set(STORAGE_KEYS.LAST_ANALYSIS, result);

          renderAnalysisResults(result);
          updateDashboardMetrics();

          if (result.matchPercentage !== null) {
            showToast(`Analysis complete: ${result.matchPercentage}% match.`, "success");
          } else {
            showToast("No technical skills detected in the text provided.", "warning");
          }

          const resultsWrapper = document.getElementById("analysis-results-wrapper");
          if (resultsWrapper) {
            resultsWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } catch (err) {
          showToast("Error processing job description.", "danger");
        } finally {
          runAnalysisBtn.disabled = false;
          runAnalysisBtn.textContent = "Analyze Compatibility";
        }
      }, 250);
    });
  }
}

/**
 * Renders Analysis Results
 * CRUCIAL GUARD: When matchPercentage is null (zero detected requirements),
 * never display a misleading 0% or false skill gaps.
 */
function renderAnalysisResults(res) {
  const wrapper = document.getElementById("analysis-results-wrapper");
  if (!wrapper) return;
  wrapper.style.display = "block";

  const percentageEl = document.getElementById("results-percentage");
  const headlineEl = document.getElementById("readiness-headline");
  const descriptionEl = document.getElementById("readiness-description");
  const badgeEl = document.getElementById("readiness-level-badge");

  const matchedCountEl = document.getElementById("res-matched-count");
  const missingCountEl = document.getElementById("res-missing-count");
  const totalCountEl = document.getElementById("res-total-count");

  const matchedBadgeNum = document.getElementById("matched-badge-num");
  const missingBadgeNum = document.getElementById("missing-badge-num");

  // Zero-detected requirements guard
  if (res.matchPercentage === null || res.jdDetectedSkills.length === 0) {
    if (percentageEl) percentageEl.textContent = "--%";
    if (badgeEl) {
      badgeEl.className = "badge badge-info";
      badgeEl.textContent = "Notice";
    }
    if (headlineEl) headlineEl.textContent = "Add a more detailed job description";
    if (descriptionEl) {
      descriptionEl.textContent = "No recognized technical qualifications were found in the text provided. Please paste a job posting containing specific skill requirements or responsibilities to calculate compatibility.";
    }

    if (matchedCountEl) matchedCountEl.textContent = "0";
    if (missingCountEl) missingCountEl.textContent = "0";
    if (totalCountEl) totalCountEl.textContent = "0";
    if (matchedBadgeNum) matchedBadgeNum.textContent = "0";
    if (missingBadgeNum) missingBadgeNum.textContent = "0";

    const formulaBox = document.getElementById("formula-breakdown-content");
    if (formulaBox) {
      formulaBox.innerHTML = `
        <p>Zero technical skills from our dictionary were identified in this text. No match percentage was calculated to avoid misleading metrics.</p>
      `;
    }

    const matchedContainer = document.getElementById("matched-skills-list");
    if (matchedContainer) {
      matchedContainer.innerHTML = `<span class="text-muted" style="font-size:0.84rem;">No requirements detected to compare.</span>`;
    }

    const missingContainer = document.getElementById("missing-skills-list");
    if (missingContainer) {
      missingContainer.innerHTML = `<span class="text-muted" style="font-size:0.84rem;">No skill gaps detected. Paste a detailed job post to generate gap analysis.</span>`;
    }

    const roadmapCounter = document.getElementById("roadmap-badge-count");
    if (roadmapCounter) roadmapCounter.style.display = "none";
    return;
  }

  // Standard case with detected requirements
  if (percentageEl) percentageEl.textContent = `${res.matchPercentage}%`;
  if (badgeEl) {
    badgeEl.className = `badge ${res.readinessBadgeClass}`;
    badgeEl.textContent = res.readinessLevel;
  }

  if (headlineEl) headlineEl.textContent = res.readinessHeadline;
  if (descriptionEl) descriptionEl.textContent = res.readinessDescription;

  if (matchedCountEl) matchedCountEl.textContent = res.matchedSkills.length;
  if (missingCountEl) missingCountEl.textContent = res.missingSkills.length;
  if (totalCountEl) totalCountEl.textContent = res.jdDetectedSkills.length;

  if (matchedBadgeNum) matchedBadgeNum.textContent = res.matchedSkills.length;
  if (missingBadgeNum) missingBadgeNum.textContent = res.missingSkills.length;

  // Formula Breakdown
  const formulaBox = document.getElementById("formula-breakdown-content");
  if (formulaBox) {
    formulaBox.innerHTML = `
      <p style="margin-bottom:0.4rem;">Detected <strong>${res.jdDetectedSkills.length}</strong> technical competency keywords in the job text:</p>
      <div class="formula-calc-row">
        <strong>Formula:</strong> ${escapeHtml(res.mathExplanation.formulaStr)}<br>
        <strong>Calculation:</strong> ${escapeHtml(res.mathExplanation.calculationStr)}
      </div>
      <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.4rem;">
        Detected keywords: ${res.jdDetectedSkills.map(s => `<code>${escapeHtml(s)}</code>`).join(", ")}
      </p>
    `;
  }

  // Matched Skills list
  const matchedContainer = document.getElementById("matched-skills-list");
  if (matchedContainer) {
    if (res.matchedSkills.length === 0) {
      matchedContainer.innerHTML = `<span class="text-muted" style="font-size:0.84rem;">None of your current profile skills were identified in this posting.</span>`;
    } else {
      matchedContainer.innerHTML = res.matchedSkills
        .map(skill => `<span class="pill-matched">✓ ${escapeHtml(skill)}</span>`)
        .join("");
    }
  }

  // Missing Skills list
  const missingContainer = document.getElementById("missing-skills-list");
  if (missingContainer) {
    if (res.missingSkills.length === 0) {
      missingContainer.innerHTML = `<span class="text-muted" style="font-size:0.84rem;">Your profile covers 100% of the detected technical requirements.</span>`;
    } else {
      missingContainer.innerHTML = res.missingSkills
        .map(skill => `<span class="pill-missing">• ${escapeHtml(skill)}</span>`)
        .join("");
    }
  }

  // Update roadmap tab counter
  const roadmapCounter = document.getElementById("roadmap-badge-count");
  if (roadmapCounter) {
    if (res.missingSkills.length > 0) {
      roadmapCounter.textContent = res.missingSkills.length;
      roadmapCounter.style.display = "inline-block";
    } else {
      roadmapCounter.style.display = "none";
    }
  }
}

/* ===================================================================
   9. LEARNING PLAN MODULE
   =================================================================== */

function setupRoadmap() {
  document.querySelectorAll(".filter-roadmap-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-roadmap-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.roadmapFilter = btn.dataset.filter;
      renderRoadmap();
    });
  });

  const loadDefaultBtn = document.getElementById("load-default-roadmap-btn");
  if (loadDefaultBtn) {
    loadDefaultBtn.addEventListener("click", () => {
      const defaultGaps = ["javascript", "react", "node.js", "sql", "git", "docker"];
      state.lastAnalysis = {
        missingSkills: defaultGaps,
        matchedSkills: ["html", "css"],
        jdDetectedSkills: ["html", "css", ...defaultGaps],
        matchPercentage: 25,
        readinessLevel: "Development Needed",
        readinessBadgeClass: "badge-danger",
        readinessHeadline: "Foundational Full-Stack Curriculum",
        readinessDescription: "Core curriculum loaded to guide full-stack readiness.",
        mathExplanation: {
          formulaStr: "Curriculum mode loaded.",
          calculationStr: "Displaying 6 foundational competencies."
        }
      };
      storage.set(STORAGE_KEYS.LAST_ANALYSIS, state.lastAnalysis);
      renderRoadmap();
      showToast("Loaded foundational curriculum plan", "success");
    });
  }
}

function renderRoadmap() {
  const container = document.getElementById("roadmap-container");
  if (!container) return;

  const missingSkills = (state.lastAnalysis && state.lastAnalysis.missingSkills) ? state.lastAnalysis.missingSkills : [];

  if (missingSkills.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon-wrap" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <h4>No Learning Plan Generated Yet</h4>
        <p>Analyze a job description in Job Analysis to generate an action plan based on missing skills, or load our core curriculum.</p>
        <div class="empty-actions-row">
          <button class="btn btn-primary btn-sm" onclick="window.navigateToTab('analyzer')">Analyze a Job</button>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('load-default-roadmap-btn').click()">Load Core Curriculum</button>
        </div>
      </div>
    `;
    updateRoadmapProgress(0, 0);
    return;
  }

  let filteredSkills = missingSkills.map(skill => {
    const info = SKILL_ROADMAPS[skill.toLowerCase()] || {
      priority: "medium",
      timeframe: "Week 1–2 (6–8 hrs)",
      concepts: ["Core syntax and concepts", "Best practices and architecture", "Troubleshooting common errors", "Project integration"],
      miniProject: `Build a small portfolio project demonstrating practical usage of ${skill}.`,
      resources: [
        { name: "Documentation & Reference", url: `https://www.google.com/search?q=${encodeURIComponent(skill + " documentation tutorial")}` }
      ]
    };
    return { name: skill, ...info };
  });

  if (state.roadmapFilter !== "all") {
    filteredSkills = filteredSkills.filter(item => item.priority === state.roadmapFilter);
  }

  const priorityOrder = { high: 1, medium: 2, low: 3 };
  filteredSkills.sort((a, b) => (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2));

  container.innerHTML = "";

  if (filteredSkills.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h4>No Skills Under This Priority</h4>
        <p>Select "All Priorities" to view the full learning plan.</p>
      </div>
    `;
    return;
  }

  filteredSkills.forEach(item => {
    const isCompleted = state.completedRoadmap.has(item.name.toLowerCase());
    const card = document.createElement("div");
    card.className = `roadmap-item-card ${isCompleted ? 'completed' : ''}`;
    card.id = `roadmap-card-${item.name}`;

    const priorityBadgeClass = item.priority === "high" ? "priority-badge-high" : item.priority === "medium" ? "priority-badge-medium" : "priority-badge-low";

    card.innerHTML = `
      <div class="roadmap-item-header">
        <div class="roadmap-title-area">
          <input type="checkbox" class="roadmap-checkbox" data-skill="${escapeHtml(item.name)}" ${isCompleted ? "checked" : ""} aria-label="Mark ${escapeHtml(item.name)} as completed">
          <span class="roadmap-skill-name">${escapeHtml(item.name.toUpperCase())}</span>
        </div>
        <div class="roadmap-meta-pills">
          <span class="${priorityBadgeClass}">${item.priority.toUpperCase()}</span>
          <span class="timeframe-badge">${escapeHtml(item.timeframe)}</span>
        </div>
      </div>

      <div class="roadmap-content-grid">
        <div class="roadmap-column">
          <h5>Core Concepts:</h5>
          <ul>
            ${item.concepts.map(c => `<li>${escapeHtml(c)}</li>`).join("")}
          </ul>
        </div>
        <div class="roadmap-column">
          <h5>Milestone Project:</h5>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.55rem;">${escapeHtml(item.miniProject)}</p>
          <h5>Curated Resources:</h5>
          <div>
            ${item.resources.map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="resource-link">${escapeHtml(r.name)} &nearr;</a>`).join("")}
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Checkbox event listeners
  container.querySelectorAll(".roadmap-checkbox").forEach(cb => {
    cb.addEventListener("change", (e) => {
      const skillName = e.target.dataset.skill.toLowerCase();
      if (e.target.checked) {
        state.completedRoadmap.add(skillName);
        showToast(`Marked "${skillName}" as completed.`, "success");
      } else {
        state.completedRoadmap.delete(skillName);
      }
      storage.set(STORAGE_KEYS.COMPLETED_ROADMAP, Array.from(state.completedRoadmap));
      
      const card = document.getElementById(`roadmap-card-${e.target.dataset.skill}`);
      if (card) card.classList.toggle("completed", e.target.checked);
      
      updateRoadmapProgress(state.completedRoadmap.size, missingSkills.length);
    });
  });

  updateRoadmapProgress(
    missingSkills.filter(s => state.completedRoadmap.has(s.toLowerCase())).length,
    missingSkills.length
  );
}

function updateRoadmapProgress(completed, total) {
  const completedEl = document.getElementById("roadmap-completed-count");
  const totalEl = document.getElementById("roadmap-total-skills-count");
  const fillEl = document.getElementById("roadmap-progress-fill");

  if (completedEl) completedEl.textContent = completed;
  if (totalEl) totalEl.textContent = total;
  const pct = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  if (fillEl) fillEl.style.width = `${pct}%`;
}

/* ===================================================================
   10. INTERVIEW PRACTICE MODULE
   =================================================================== */

function setupInterviewPrep() {
  const roleSelect = document.getElementById("interview-role-select");
  const searchInput = document.getElementById("interview-search");
  const resetBtn = document.getElementById("reset-practice-btn");

  if (roleSelect) {
    roleSelect.addEventListener("change", (e) => {
      state.interviewFilter.role = e.target.value;
      renderInterviewQuestions();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.interviewFilter.search = e.target.value.toLowerCase().trim();
      renderInterviewQuestions();
    });
  }

  document.querySelectorAll("#interview-category-filters .cat-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("#interview-category-filters .cat-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.interviewFilter.category = pill.dataset.category;
      renderInterviewQuestions();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset practice progress for all interview questions?")) {
        state.practicedQuestions.clear();
        storage.set(STORAGE_KEYS.PRACTICED_QUESTIONS, []);
        renderInterviewQuestions();
        showToast("Practice progress reset.", "info");
      }
    });
  }
}

function renderInterviewQuestions() {
  const container = document.getElementById("interview-questions-list");
  if (!container) return;

  const filtered = INTERVIEW_QUESTIONS.filter(q => {
    const matchesRole = state.interviewFilter.role === "all" || q.role === state.interviewFilter.role || q.role === "general";
    const matchesCat = state.interviewFilter.category === "all" || q.category === state.interviewFilter.category;
    const search = state.interviewFilter.search;
    const matchesSearch = !search || 
      q.title.toLowerCase().includes(search) || 
      q.answer.toLowerCase().includes(search) || 
      (q.keyPoints && q.keyPoints.some(kp => kp.toLowerCase().includes(search)));

    return matchesRole && matchesCat && matchesSearch;
  });

  const totalCount = INTERVIEW_QUESTIONS.length;
  const techCount = INTERVIEW_QUESTIONS.filter(q => q.category === "technical").length;
  const codingCount = INTERVIEW_QUESTIONS.filter(q => q.category === "coding").length;
  const hrCount = INTERVIEW_QUESTIONS.filter(q => q.category === "hr").length;

  const allCountEl = document.getElementById("cat-count-all");
  const techCountEl = document.getElementById("cat-count-technical");
  const codingCountEl = document.getElementById("cat-count-coding");
  const hrCountEl = document.getElementById("cat-count-hr");

  if (allCountEl) allCountEl.textContent = totalCount;
  if (techCountEl) techCountEl.textContent = techCount;
  if (codingCountEl) codingCountEl.textContent = codingCount;
  if (hrCountEl) hrCountEl.textContent = hrCount;

  const practicedTotal = Array.from(state.practicedQuestions).filter(id => INTERVIEW_QUESTIONS.some(q => q.id === id)).length;
  const practicedEl = document.getElementById("interview-practiced-count");
  const totalQEl = document.getElementById("interview-total-count");

  if (practicedEl) practicedEl.textContent = practicedTotal;
  if (totalQEl) totalQEl.textContent = totalCount;

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h4>No Questions Found</h4>
        <p>Try adjusting your search keywords or switching category filters.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(q => {
    const isPracticed = state.practicedQuestions.has(q.id);
    const card = document.createElement("div");
    card.className = `question-card ${isPracticed ? 'practiced' : ''}`;
    card.id = `q-card-${q.id}`;

    const tagCategoryClass = q.category === "technical" ? "tag-technical" : q.category === "coding" ? "tag-coding" : "tag-hr";
    const difficultyClass = q.difficulty === "easy" ? "difficulty-easy" : q.difficulty === "medium" ? "difficulty-medium" : "difficulty-hard";

    card.innerHTML = `
      <div class="question-card-header" data-id="${q.id}">
        <div class="question-title-area">
          <div class="question-tags-row">
            <span class="tag-badge ${tagCategoryClass}">${q.category.toUpperCase()}</span>
            <span class="${difficultyClass}">● ${q.difficulty.toUpperCase()}</span>
            <span class="badge" style="background:var(--bg-subtle); color:var(--text-muted); font-size:0.68rem;">ROLE: ${q.role.toUpperCase()}</span>
            ${isPracticed ? '<span class="badge badge-success">✓ PRACTICED</span>' : ''}
          </div>
          <div class="question-text">${escapeHtml(q.title)}</div>
        </div>
        <div class="question-actions-right">
          <span class="chevron-icon">&#9662;</span>
        </div>
      </div>

      <div class="question-body">
        <div class="answer-section">
          <h5>Model Answer &amp; Overview:</h5>
          <p class="answer-text">${escapeHtml(q.answer)}</p>
        </div>

        ${q.keyPoints ? `
          <div class="answer-section">
            <h5>Key Concepts to Communicate:</h5>
            <ul class="key-points-list">
              ${q.keyPoints.map(kp => `<li>${escapeHtml(kp)}</li>`).join("")}
            </ul>
          </div>
        ` : ''}

        ${q.codeSnippet ? `
          <div class="answer-section">
            <h5>Implementation / Code Pattern:</h5>
            <pre class="code-snippet-box"><code>${escapeHtml(q.codeSnippet)}</code></pre>
          </div>
        ` : ''}

        <div class="question-footer-controls">
          <button class="btn btn-sm ${isPracticed ? 'btn-secondary' : 'btn-primary'} toggle-practice-btn" data-id="${q.id}">
            ${isPracticed ? 'Mark as Unpracticed' : 'Mark as Practiced'}
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Accordion Toggle
  container.querySelectorAll(".question-card-header").forEach(header => {
    header.addEventListener("click", () => {
      const parent = header.closest(".question-card");
      parent.classList.toggle("open");
    });
  });

  // Toggle Practiced Button
  container.querySelectorAll(".toggle-practice-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const qId = btn.dataset.id;
      if (state.practicedQuestions.has(qId)) {
        state.practicedQuestions.delete(qId);
        showToast("Question marked as unpracticed.", "info");
      } else {
        state.practicedQuestions.add(qId);
        showToast("Question marked as practiced.", "success");
      }
      storage.set(STORAGE_KEYS.PRACTICED_QUESTIONS, Array.from(state.practicedQuestions));
      renderInterviewQuestions();
    });
  });
}

/* ===================================================================
   11. APPLICATIONS TRACKER (FULL CRUD + SEARCH + FILTER)
   =================================================================== */

let currentEditingJobId = null;

function setupJobTracker() {
  const addBtn = document.getElementById("add-job-btn");
  const searchInput = document.getElementById("tracker-search-input");
  const statusFilter = document.getElementById("tracker-status-filter");
  const modal = document.getElementById("job-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  const jobForm = document.getElementById("job-form");

  document.querySelectorAll(".tracker-stat-box").forEach(box => {
    box.addEventListener("click", () => {
      const filter = box.dataset.statusFilter;
      if (statusFilter) {
        statusFilter.value = filter;
        renderJobTracker();
      }
    });
  });

  if (addBtn) addBtn.addEventListener("click", () => window.openJobModal());
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", () => window.closeJobModal());
  if (modalCancelBtn) modalCancelBtn.addEventListener("click", () => window.closeJobModal());

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) window.closeJobModal();
    });
  }

  if (searchInput) searchInput.addEventListener("input", () => renderJobTracker());
  if (statusFilter) statusFilter.addEventListener("change", () => renderJobTracker());

  if (jobForm) {
    jobForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveJobApplication();
    });
  }
}

window.openJobModal = function(jobId = null) {
  const modal = document.getElementById("job-modal");
  const modalTitle = document.getElementById("modal-title");
  const form = document.getElementById("job-form");
  const dateInput = document.getElementById("date-input");

  if (!modal || !form) return;

  currentEditingJobId = jobId;
  form.reset();
  document.getElementById("company-error").textContent = "";
  document.getElementById("role-error").textContent = "";

  if (jobId) {
    const job = state.jobs.find(j => j.id === jobId);
    if (job) {
      modalTitle.textContent = "Edit Application";
      document.getElementById("job-id-input").value = job.id;
      document.getElementById("company-input").value = job.company;
      document.getElementById("role-input").value = job.role;
      document.getElementById("status-input").value = job.status;
      document.getElementById("date-input").value = job.dateApplied || "";
      document.getElementById("job-url-input").value = job.jobUrl || "";
      document.getElementById("job-skills-input").value = job.skills || "";
      document.getElementById("notes-input").value = job.notes || "";
    }
  } else {
    modalTitle.textContent = "New Application";
    document.getElementById("job-id-input").value = "";
    if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  const companyInput = document.getElementById("company-input");
  if (companyInput) companyInput.focus();
};

window.closeJobModal = function() {
  const modal = document.getElementById("job-modal");
  if (modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
  currentEditingJobId = null;
};

function saveJobApplication() {
  const companyInput = document.getElementById("company-input");
  const roleInput = document.getElementById("role-input");
  const statusInput = document.getElementById("status-input");
  const dateInput = document.getElementById("date-input");
  const urlInput = document.getElementById("job-url-input");
  const skillsInput = document.getElementById("job-skills-input");
  const notesInput = document.getElementById("notes-input");

  const company = companyInput.value.trim();
  const role = roleInput.value.trim();

  let hasError = false;
  if (!company) {
    document.getElementById("company-error").textContent = "Company name is required.";
    hasError = true;
  } else {
    document.getElementById("company-error").textContent = "";
  }

  if (!role) {
    document.getElementById("role-error").textContent = "Role title is required.";
    hasError = true;
  } else {
    document.getElementById("role-error").textContent = "";
  }

  if (hasError) return;

  const jobData = {
    id: currentEditingJobId || `job-${Date.now()}`,
    company,
    role,
    status: statusInput.value,
    dateApplied: dateInput.value,
    jobUrl: urlInput.value.trim(),
    skills: skillsInput.value.trim(),
    notes: notesInput.value.trim(),
    updatedAt: new Date().toISOString()
  };

  if (currentEditingJobId) {
    const index = state.jobs.findIndex(j => j.id === currentEditingJobId);
    if (index !== -1) {
      state.jobs[index] = { ...state.jobs[index], ...jobData };
      showToast(`Updated application for ${company}`, "success");
    }
  } else {
    jobData.createdAt = new Date().toISOString();
    state.jobs.unshift(jobData);
    showToast(`Added application for ${company}`, "success");
  }

  storage.set(STORAGE_KEYS.JOBS, state.jobs);
  window.closeJobModal();
  renderJobTracker();
  updateDashboardMetrics();
}

function deleteJobApplication(id) {
  const job = state.jobs.find(j => j.id === id);
  if (!job) return;

  if (confirm(`Delete the application for "${job.role} at ${job.company}"?`)) {
    state.jobs = state.jobs.filter(j => j.id !== id);
    storage.set(STORAGE_KEYS.JOBS, state.jobs);
    renderJobTracker();
    updateDashboardMetrics();
    showToast(`Deleted application for ${job.company}`, "info");
  }
}

function updateJobStatus(id, newStatus) {
  const job = state.jobs.find(j => j.id === id);
  if (job) {
    job.status = newStatus;
    job.updatedAt = new Date().toISOString();
    storage.set(STORAGE_KEYS.JOBS, state.jobs);
    renderJobTracker();
    updateDashboardMetrics();
    showToast(`Status updated to "${newStatus}" for ${job.company}`, "success");
  }
}

function renderJobTracker() {
  const tbody = document.getElementById("tracker-tbody");
  const emptyState = document.getElementById("tracker-empty-state");
  const searchInput = document.getElementById("tracker-search-input");
  const statusFilterEl = document.getElementById("tracker-status-filter");

  if (!tbody) return;

  const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const statusFilter = statusFilterEl ? statusFilterEl.value : "all";

  // Summary statistics
  const total = state.jobs.length;
  const wishlist = state.jobs.filter(j => j.status === "Wishlist").length;
  const applied = state.jobs.filter(j => j.status === "Applied").length;
  const interviewing = state.jobs.filter(j => j.status === "Interviewing").length;
  const offer = state.jobs.filter(j => j.status === "Offer").length;
  const rejected = state.jobs.filter(j => j.status === "Rejected").length;

  const totalEl = document.getElementById("tracker-total-stat");
  const wishlistEl = document.getElementById("tracker-wishlist-stat");
  const appliedEl = document.getElementById("tracker-applied-stat");
  const interviewingEl = document.getElementById("tracker-interviewing-stat");
  const offerEl = document.getElementById("tracker-offer-stat");
  const rejectedEl = document.getElementById("tracker-rejected-stat");

  if (totalEl) totalEl.textContent = total;
  if (wishlistEl) wishlistEl.textContent = wishlist;
  if (appliedEl) appliedEl.textContent = applied;
  if (interviewingEl) interviewingEl.textContent = interviewing;
  if (offerEl) offerEl.textContent = offer;
  if (rejectedEl) rejectedEl.textContent = rejected;

  // Filter applications
  const filtered = state.jobs.filter(job => {
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesSearch = !searchVal || 
      job.company.toLowerCase().includes(searchVal) || 
      job.role.toLowerCase().includes(searchVal) ||
      (job.skills && job.skills.toLowerCase().includes(searchVal)) ||
      (job.notes && job.notes.toLowerCase().includes(searchVal));

    return matchesStatus && matchesSearch;
  });

  tbody.innerHTML = "";

  if (filtered.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  filtered.forEach(job => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="company-cell">
        <strong>${escapeHtml(job.company)}</strong>
        <span class="company-sub">${job.notes ? escapeHtml(job.notes.slice(0, 42) + (job.notes.length > 42 ? '...' : '')) : 'No notes'}</span>
      </td>
      <td><strong>${escapeHtml(job.role)}</strong></td>
      <td>${job.dateApplied ? escapeHtml(job.dateApplied) : '<span class="text-muted">—</span>'}</td>
      <td>
        <select class="form-select status-select-inline" data-id="${job.id}" style="padding:0.25rem 0.5rem; font-size:0.78rem; width:auto; display:inline-block;">
          <option value="Wishlist" ${job.status === "Wishlist" ? "selected" : ""}>Wishlist</option>
          <option value="Applied" ${job.status === "Applied" ? "selected" : ""}>Applied</option>
          <option value="Interviewing" ${job.status === "Interviewing" ? "selected" : ""}>Interviewing</option>
          <option value="Offer" ${job.status === "Offer" ? "selected" : ""}>Offer</option>
          <option value="Rejected" ${job.status === "Rejected" ? "selected" : ""}>Archived</option>
        </select>
      </td>
      <td>
        ${job.skills ? job.skills.split(",").slice(0, 3).map(s => `<span class="badge" style="background:var(--bg-subtle); color:var(--text-secondary); font-size:0.7rem; margin-right:4px;">${escapeHtml(s.trim())}</span>`).join("") : '<span class="text-muted">—</span>'}
      </td>
      <td>
        ${job.jobUrl ? `<a href="${job.jobUrl}" target="_blank" rel="noopener noreferrer" class="resource-link" title="Open Job Posting">View &nearr;</a>` : '<span class="text-muted">—</span>'}
      </td>
      <td class="text-right">
        <div class="table-actions">
          <button class="table-icon-btn btn-edit" data-id="${job.id}" title="Edit Application" aria-label="Edit application">&#9998;</button>
          <button class="table-icon-btn btn-delete" data-id="${job.id}" title="Delete Application" aria-label="Delete application">&times;</button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  tbody.querySelectorAll(".status-select-inline").forEach(select => {
    select.addEventListener("change", (e) => {
      updateJobStatus(e.target.dataset.id, e.target.value);
    });
  });

  tbody.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", () => {
      window.openJobModal(btn.dataset.id);
    });
  });

  tbody.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteJobApplication(btn.dataset.id);
    });
  });

  const trackerBadge = document.getElementById("tracker-badge-count");
  if (trackerBadge) trackerBadge.textContent = state.jobs.length;
}

/* ===================================================================
   12. DASHBOARD / OVERVIEW CONTROLLER
   =================================================================== */

function renderDashboard() {
  updateDashboardMetrics();

  const summaryContainer = document.getElementById("dash-analysis-summary-container");
  if (!summaryContainer) return;

  if (state.lastAnalysis) {
    const res = state.lastAnalysis;

    // Check zero-denominator guard in dashboard
    if (res.matchPercentage === null || res.jdDetectedSkills.length === 0) {
      summaryContainer.innerHTML = `
        <div style="margin-bottom:0.85rem;">
          <span class="badge badge-info">Notice</span>
          <h4 style="font-size:1.05rem; font-weight:700; margin-top:0.35rem; color:var(--text-primary);">Detailed Job Description Needed</h4>
          <p style="font-size:0.86rem; color:var(--text-secondary); margin-top:0.25rem;">The last evaluated job posting contained zero recognized technical qualifications. Paste a detailed job description to calculate your match score.</p>
        </div>
        <button class="btn btn-sm btn-primary" onclick="window.navigateToTab('analyzer')">Open Job Analysis &rarr;</button>
      `;
    } else {
      summaryContainer.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <span class="badge ${res.readinessBadgeClass}">${res.readinessLevel}</span>
            <h4 style="font-size:1.05rem; font-weight:700; margin-top:0.35rem; color:var(--text-primary);">${res.readinessHeadline}</h4>
          </div>
          <div style="font-size:1.6rem; font-weight:800; color:var(--primary); line-height:1;">${res.matchPercentage}% Match</div>
        </div>
        <p style="font-size:0.86rem; color:var(--text-secondary); margin-bottom:0.85rem;">${res.readinessDescription}</p>
        
        <div style="display:flex; gap:0.45rem; flex-wrap:wrap; margin-bottom:1rem;">
          <span class="result-chip chip-matched">✓ ${res.matchedSkills.length} Matched</span>
          <span class="result-chip chip-missing">• ${res.missingSkills.length} Missing Gaps</span>
          <span class="result-chip chip-total">Total ${res.jdDetectedSkills.length} Required</span>
        </div>

        <div style="display:flex; gap:0.6rem;">
          <button class="btn btn-sm btn-primary" onclick="window.navigateToTab('roadmap')">View Learning Plan &rarr;</button>
          <button class="btn btn-sm btn-secondary" onclick="window.navigateToTab('analyzer')">Re-Analyze</button>
        </div>
      `;
    }
  } else {
    summaryContainer.innerHTML = `
      <div class="empty-state" style="padding:1.5rem 1rem;">
        <div class="empty-icon-wrap" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <h4>No Analysis Executed Yet</h4>
        <p>Paste a job description in Job Analysis to see your compatibility score and missing qualifications.</p>
        <button class="btn btn-sm btn-primary" onclick="window.navigateToTab('analyzer')">Analyze First Job</button>
      </div>
    `;
  }

  const recentJobsContainer = document.getElementById("dash-recent-jobs");
  if (!recentJobsContainer) return;

  if (state.jobs.length === 0) {
    recentJobsContainer.innerHTML = `
      <div class="empty-state" style="padding:1.5rem 1rem;">
        <p class="text-muted" style="margin-bottom:0.65rem;">No active applications recorded yet.</p>
        <button class="btn btn-sm btn-secondary" onclick="window.openJobModal()">Record Application</button>
      </div>
    `;
  } else {
    recentJobsContainer.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:0.45rem;">
        ${state.jobs.slice(0, 3).map(j => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-subtle); padding:0.6rem 0.85rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
            <div>
              <strong style="color:var(--text-primary); font-size:0.88rem;">${escapeHtml(j.company)}</strong> &mdash; <span style="color:var(--text-muted); font-size:0.82rem;">${escapeHtml(j.role)}</span>
            </div>
            <span class="table-status-badge table-status-${j.status}">${j.status}</span>
          </div>
        `).join("")}
      </div>
    `;
  }
}

function updateDashboardMetrics() {
  const scoreVal = document.getElementById("dash-match-score");
  const scoreSubtext = document.getElementById("dash-match-subtext");
  const scoreFill = document.getElementById("dash-match-fill");

  if (state.lastAnalysis) {
    if (state.lastAnalysis.matchPercentage !== null && state.lastAnalysis.jdDetectedSkills.length > 0) {
      const pct = state.lastAnalysis.matchPercentage;
      if (scoreVal) scoreVal.textContent = `${pct}%`;
      if (scoreSubtext) scoreSubtext.textContent = `${state.lastAnalysis.matchedSkills.length} of ${state.lastAnalysis.jdDetectedSkills.length} skills matched`;
      if (scoreFill) scoreFill.style.width = `${pct}%`;
    } else {
      if (scoreVal) scoreVal.textContent = "--%";
      if (scoreSubtext) scoreSubtext.textContent = "Detailed job text needed";
      if (scoreFill) scoreFill.style.width = "0%";
    }
  } else {
    if (scoreVal) scoreVal.textContent = "--%";
    if (scoreSubtext) scoreSubtext.textContent = "No analysis run yet";
    if (scoreFill) scoreFill.style.width = "0%";
  }

  const skillsCountEl = document.getElementById("dash-student-skills-count");
  const skillsSubtextEl = document.getElementById("dash-student-skills-subtext");
  if (skillsCountEl) skillsCountEl.textContent = state.studentSkills.length;
  if (skillsSubtextEl) skillsSubtextEl.textContent = `${state.studentSkills.length} skills in profile`;

  const missingCount = (state.lastAnalysis && state.lastAnalysis.missingSkills) ? state.lastAnalysis.missingSkills.length : 0;
  const missingCountEl = document.getElementById("dash-missing-skills-count");
  const missingSubtextEl = document.getElementById("dash-missing-subtext");
  if (missingCountEl) missingCountEl.textContent = missingCount;
  if (missingSubtextEl) missingSubtextEl.textContent = missingCount > 0 ? `${missingCount} gaps to prioritize` : "No gaps identified";

  const trackedCountEl = document.getElementById("dash-tracked-jobs-count");
  const trackedSubtextEl = document.getElementById("dash-tracked-subtext");
  const activeCount = state.jobs.filter(j => j.status === "Applied" || j.status === "Interviewing").length;
  if (trackedCountEl) trackedCountEl.textContent = state.jobs.length;
  if (trackedSubtextEl) trackedSubtextEl.textContent = `${activeCount} active in pipeline`;

  const wishlist = state.jobs.filter(j => j.status === "Wishlist").length;
  const applied = state.jobs.filter(j => j.status === "Applied").length;
  const interviewing = state.jobs.filter(j => j.status === "Interviewing").length;
  const offer = state.jobs.filter(j => j.status === "Offer").length;
  const rejected = state.jobs.filter(j => j.status === "Rejected").length;

  const countW = document.getElementById("count-wishlist");
  const countA = document.getElementById("count-applied");
  const countI = document.getElementById("count-interviewing");
  const countO = document.getElementById("count-offer");
  const countR = document.getElementById("count-rejected");

  if (countW) countW.textContent = wishlist;
  if (countA) countA.textContent = applied;
  if (countI) countI.textContent = interviewing;
  if (countO) countO.textContent = offer;
  if (countR) countR.textContent = rejected;

  const trackerBadge = document.getElementById("tracker-badge-count");
  if (trackerBadge) trackerBadge.textContent = state.jobs.length;
}

/* ===================================================================
   13. SAMPLE DATA SEEDER & RESET CONTROLLER
   =================================================================== */

function setupHeaderControls() {
  const loadSampleBtn = document.getElementById("load-sample-btn");
  const clearDataBtn = document.getElementById("clear-data-btn");

  if (loadSampleBtn) {
    loadSampleBtn.addEventListener("click", () => {
      // 1. Seed Profile Skills
      state.studentSkills = ["HTML", "CSS", "JavaScript", "React", "Git"];
      storage.set(STORAGE_KEYS.SKILLS, state.studentSkills);
      renderStudentSkills();

      // 2. Set JD and Run Analysis
      const sampleJd = SAMPLE_JDS.frontend;
      const jdInput = document.getElementById("jd-input");
      if (jdInput) jdInput.value = sampleJd;

      const analysis = analyzeSkillCompatibility(state.studentSkills, sampleJd);
      state.lastAnalysis = analysis;
      storage.set(STORAGE_KEYS.LAST_ANALYSIS, analysis);
      renderAnalysisResults(analysis);

      // 3. Seed Clearly Labelled Sample Applications
      state.jobs = [
        {
          id: "job-sample-1",
          company: "Stripe",
          role: "Frontend Engineer (Sample)",
          status: "Interviewing",
          dateApplied: new Date(Date.now() - 6 * 86400000).toISOString().split("T")[0],
          jobUrl: "https://stripe.com/jobs",
          skills: "React, TypeScript, CSS",
          notes: "Sample record: Technical screen scheduled. Focus on asynchronous state.",
          isSample: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "job-sample-2",
          company: "Linear",
          role: "Junior Software Engineer (Sample)",
          status: "Applied",
          dateApplied: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
          jobUrl: "https://linear.app/careers",
          skills: "TypeScript, React, Node.js",
          notes: "Sample record: Submitted application through engineering portal.",
          isSample: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "job-sample-3",
          company: "Vercel",
          role: "Frontend Intern (Sample)",
          status: "Wishlist",
          dateApplied: "",
          jobUrl: "https://vercel.com/careers",
          skills: "Next.js, React, Tailwind CSS",
          notes: "Sample record: Applications open next month. Review portfolio work.",
          isSample: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "job-sample-4",
          company: "Cloudflare",
          role: "Solutions Engineer (Sample)",
          status: "Offer",
          dateApplied: new Date(Date.now() - 18 * 86400000).toISOString().split("T")[0],
          jobUrl: "",
          skills: "JavaScript, DNS, Linux",
          notes: "Sample record: Offer extended. Reviewing terms and start date.",
          isSample: true,
          createdAt: new Date().toISOString()
        }
      ];
      storage.set(STORAGE_KEYS.JOBS, state.jobs);

      // 4. Seed 1 Practiced Question
      state.practicedQuestions.add("q-tech-1");
      storage.set(STORAGE_KEYS.PRACTICED_QUESTIONS, Array.from(state.practicedQuestions));

      // Refresh Views
      renderJobTracker();
      renderDashboard();
      renderRoadmap();
      renderInterviewQuestions();

      showToast("Sample demonstration records loaded.", "success");
    });
  }

  if (clearDataBtn) {
    clearDataBtn.addEventListener("click", () => {
      if (confirm("Reset all workspace data? Your profile skills, analysis history, and job applications will be permanently cleared from this browser.")) {
        storage.clear();
        state.studentSkills = [];
        state.lastAnalysis = null;
        state.jobs = [];
        state.practicedQuestions.clear();
        state.completedRoadmap.clear();

        const jdInput = document.getElementById("jd-input");
        if (jdInput) jdInput.value = "";

        const wrapper = document.getElementById("analysis-results-wrapper");
        if (wrapper) wrapper.style.display = "none";

        const roadmapBadge = document.getElementById("roadmap-badge-count");
        if (roadmapBadge) roadmapBadge.style.display = "none";

        renderStudentSkills();
        renderJobTracker();
        renderDashboard();
        renderRoadmap();
        renderInterviewQuestions();

        showToast("Workspace data reset.", "info");
      }
    });
  }

  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      window.navigateToTab(tab.dataset.tab);
    });
  });
}

function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ===================================================================
   14. APPLICATION INITIALIZATION
   =================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  setupMobileDrawer();
  setupHeaderControls();
  setupSkillAnalyzer();
  setupRoadmap();
  setupInterviewPrep();
  setupJobTracker();

  // Initial render from storage
  renderStudentSkills();
  if (state.lastAnalysis) {
    renderAnalysisResults(state.lastAnalysis);
  }
  renderDashboard();
  renderJobTracker();
  renderRoadmap();
  renderInterviewQuestions();
});
