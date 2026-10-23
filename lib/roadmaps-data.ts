import { PriorityLevel } from './types';

export interface SkillRoadmapDefinition {
  priority: PriorityLevel;
  timeframe: string;
  concepts: string[];
  miniProject: string;
  resources: Array<{ name: string; url: string }>;
}

export const SKILL_ROADMAPS: Record<string, SkillRoadmapDefinition> = {
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
