import { InterviewQuestion } from './types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
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
