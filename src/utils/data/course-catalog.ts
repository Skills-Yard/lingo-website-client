import type { CourseSubject } from "@/utils/types/type";

export const courseSubjects: CourseSubject[] = [
  {
    id: "python",
    shortName: "Python",
    title: "Python",
    subtitle: "Translate ideas into powerful code",
    icon: "braces",
    theme: {
      accent: "#3776ab",
      glow: "rgba(55, 118, 171, 0.24)",
      panel: "rgba(16, 45, 71, 0.38)",
    },
    courses: [
      {
        id: "thinking-in-python",
        title: "Thinking in Python",
        illustration: "python",
      },
      {
        id: "functions-in-python",
        title: "Functions in Python",
        illustration: "python-functions",
      },
      {
        id: "recursion-in-python",
        title: "Recursion in Python",
        illustration: "recursion",
      },
      {
        id: "algorithms-in-python",
        title: "Algorithms in Python",
        illustration: "python-algorithms",
        isNew: true,
      },
    ],
  },
  {
    id: "javascript",
    shortName: "JS",
    title: "JavaScript",
    subtitle: "Build interactive applications",
    icon: "layers",
    theme: {
      accent: "#c58a52",
      glow: "rgba(197, 138, 82, 0.24)",
      panel: "rgba(84, 52, 28, 0.38)",
    },
    courses: [
      {
        id: "thinking-in-javascript",
        title: "Thinking in JavaScript",
        illustration: "code-window",
      },
      {
        id: "variables-in-javascript",
        title: "Variables in JavaScript",
        illustration: "variables",
      },
      {
        id: "functions-in-javascript",
        title: "Functions in JavaScript",
        illustration: "functions",
      },
      {
        id: "async-javascript",
        title: "Async JavaScript",
        illustration: "algorithm",
        isNew: false,
      },
    ],
  },
  {
    id: "java",
    shortName: "Java",
    title: "Java",
    subtitle: "Master object-oriented development",
    icon: "chart",
    theme: {
      accent: "#e76f51",
      glow: "rgba(231, 111, 81, 0.24)",
      panel: "rgba(89, 32, 19, 0.40)",
    },
    courses: [
      {
        id: "thinking-in-java",
        title: "Thinking in Java",
        illustration: "data-visual",
      },
      {
        id: "java-oop",
        title: "Object-Oriented Programming",
        illustration: "probability",
      },
      {
        id: "java-collections",
        title: "Collections Framework",
        illustration: "clusters",
      },
      {
        id: "java-streams",
        title: "Streams & Lambdas",
        illustration: "regression",
      },
    ],
  },
  {
    id: "cpp",
    shortName: "C++",
    title: "C++",
    subtitle: "Control performance and memory",
    icon: "atoms",
    theme: {
      accent: "#2dd4bf",
      glow: "rgba(45, 212, 191, 0.24)",
      panel: "rgba(10, 66, 60, 0.38)",
    },
    courses: [
      {
        id: "thinking-in-cpp",
        title: "Thinking in C++",
        illustration: "science",
      },
      {
        id: "pointers-references",
        title: "Pointers & References",
        illustration: "motion",
      },
      {
        id: "memory-management",
        title: "Memory Management",
        illustration: "energy",
        isNew: false,
      },
    ],
  },
  {
    id: "csharp",
    shortName: "C#",
    title: "C#",
    subtitle: "Build modern applications with .NET",
    icon: "logic",
    theme: {
      accent: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.24)",
      panel: "rgba(42, 23, 90, 0.38)",
    },
    courses: [
      {
        id: "thinking-in-csharp",
        title: "Thinking in C#",
        illustration: "logic",
      },
      {
        id: "csharp-oop",
        title: "Object-Oriented Programming",
        illustration: "deduction",
      },
      {
        id: "dotnet-fundamentals",
        title: ".NET Fundamentals",
        illustration: "proof",
      },
    ],
  },
  {
    id: "go",
    shortName: "Go",
    title: "Go",
    subtitle: "Write simple and scalable software",
    icon: "pie",
    theme: {
      accent: "#22c55e",
      glow: "rgba(34, 197, 94, 0.24)",
      panel: "rgba(15, 65, 35, 0.38)",
    },
    courses: [
      {
        id: "thinking-in-go",
        title: "Thinking in Go",
        illustration: "numbers",
      },
      {
        id: "goroutines-channels",
        title: "Goroutines & Channels",
        illustration: "money",
      },
      {
        id: "go-concurrency",
        title: "Concurrency Patterns",
        illustration: "ratio",
      },
    ],
  },
];

