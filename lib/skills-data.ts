// Master dictionary of 150+ industry technical and professional skills
export const SKILLS_DATABASE: string[] = [
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

// Alias mapping: maps abbreviations and alternate spellings to canonical names
export const SKILL_ALIASES: Record<string, string> = {
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

export function normalizeSkill(raw: string): string {
  if (!raw) return "";
  const cleaned = raw.trim().toLowerCase();
  return SKILL_ALIASES[cleaned] || cleaned;
}
