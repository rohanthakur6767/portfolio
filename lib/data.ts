// Single source of truth for all portfolio content.
// Update fields here; every section reads from this file.

export const profile = {
  name: "Rohan Thakur",
  title: "AI/ML Engineer",
  tagline: "Building production agentic AI & RAG systems.",
  location: "Dehradun, India",
  email: "rt633811@gmail.com",
  phone: "+91 7505330991",
  github: "https://github.com/rohanthakur6767",
  githubUsername: "rohanthakur6767",
  linkedin: "https://www.linkedin.com/in/rohan-thakur-75b8b8296/",
  resumeUrl: "/resume.pdf",
  photo: "/profile.jpg", // drop your headshot at public/profile.jpg
  availability: "Open to AI/ML Engineer roles · Full-time & Internships",
  shortBio:
    "AI/ML Engineer specializing in agentic systems, RAG, and LLM orchestration. I build end-to-end AI products — from LangGraph state machines and vector retrieval to FastAPI backends and deployed demos.",
  longBio:
    "I work at the intersection of applied machine learning and production engineering. My focus is shipping AI systems that survive contact with real users — agentic workflows with human-in-the-loop control, retrieval pipelines over messy enterprise data, and ML services with explainability built in. I care about latency, traceability, and the unglamorous parts of LLM apps: state, streaming, evaluation, and deployment.",
  focusAreas: [
    "Agentic AI & multi-step LLM workflows",
    "RAG pipelines on PostgreSQL + pgvector",
    "Explainable ML for high-stakes decisions",
    "Real-time inference APIs and streaming UX",
  ],
} as const;

export const metrics = [
  { label: "AUC-ROC on fraud detection", value: "0.952" },
  { label: "Inference latency", value: "<2s" },
  { label: "Manual workflow cut", value: "12m → 2s" },
  { label: "CNN accuracy across 43 classes", value: "98%+" },
] as const;

export type SkillCategory = {
  label: string;
  icon: string;
  skills: { name: string; level?: number }[];
};

export const skills: SkillCategory[] = [
  {
    label: "AI / ML",
    icon: "Brain",
    skills: [
      { name: "PyTorch", level: 85 },
      { name: "TensorFlow", level: 85 },
      { name: "Keras", level: 88 },
      { name: "Scikit-Learn", level: 92 },
      { name: "XGBoost", level: 92 },
      { name: "SHAP", level: 80 },
      { name: "Pandas / NumPy", level: 95 },
    ],
  },
  {
    label: "LLM & Agentic AI",
    icon: "Sparkles",
    skills: [
      { name: "LangGraph", level: 90 },
      { name: "LangChain", level: 88 },
      { name: "RAG Pipelines", level: 90 },
      { name: "Embeddings", level: 88 },
      { name: "pgvector", level: 85 },
      { name: "Groq / Llama-3.3", level: 82 },
      { name: "Gemini / OpenAI APIs", level: 85 },
    ],
  },
  {
    label: "Backend",
    icon: "Server",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Flask", level: 82 },
      { name: "REST APIs", level: 92 },
      { name: "Server-Sent Events", level: 80 },
    ],
  },
  {
    label: "Frontend",
    icon: "Layout",
    skills: [
      { name: "React.js", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Chart.js", level: 78 },
      { name: "Next.js", level: 80 },
    ],
  },
  {
    label: "Cloud / DevOps",
    icon: "Cloud",
    skills: [
      { name: "Docker", level: 82 },
      { name: "Hugging Face Spaces", level: 88 },
      { name: "Vercel", level: 88 },
      { name: "Git / GitHub", level: 92 },
      { name: "GCP (Pro ML cert)", level: 80 },
    ],
  },
  {
    label: "Databases",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "pgvector", level: 85 },
      { name: "SQL", level: 88 },
    ],
  },
  {
    label: "Languages & Tools",
    icon: "Code",
    skills: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 85 },
      { name: "C++", level: 75 },
      { name: "Power BI", level: 82 },
      { name: "Kaggle", level: 80 },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  featured: boolean;
  category: "Agentic AI" | "Machine Learning" | "Deep Learning" | "Full-Stack";
  problem: string;
  features: string[];
  architecture: string[];
  stack: string[];
  challenges: string[];
  metrics?: { label: string; value: string }[];
  links: { github?: string; demo?: string };
  accent: "violet" | "cyan" | "amber" | "emerald";
};

export const projects: Project[] = [
  {
    slug: "newsletter-agent",
    title: "Autonomous AI Newsletter Agent",
    tagline:
      "A 7-node LangGraph state machine that researches, drafts, self-critiques, and ships newsletters — with human approval baked into the graph.",
    featured: true,
    category: "Agentic AI",
    problem:
      "Drafting research-driven newsletters is repetitive and error-prone. The goal was a fully autonomous loop that still defers to a human at the right step — not a chatbot wrapper, but an actual stateful workflow.",
    features: [
      "7-node graph: plan → research → summarize → draft → critique → approval → send",
      "Self-critique revision loop with LLM-scored conditional routing",
      "Human-in-the-Loop pause/resume via LangGraph interrupt_before",
      "Per-session thread_id keeps approval state across independent HTTP requests",
      "Server-Sent Events stream live per-node trace to the UI",
      "~45s end-to-end runs powered by Groq Llama-3.3-70B + Tavily search",
    ],
    architecture: [
      "LangGraph StateGraph with MemorySaver checkpointing",
      "FastAPI backend exposing /run and /resume endpoints over SSE",
      "Groq for low-latency inference, Tavily for grounded web research",
      "Containerised with Docker, deployed to Hugging Face Spaces with env-injected secrets",
    ],
    stack: ["LangGraph", "LangChain", "FastAPI", "Groq", "Tavily", "Docker", "SSE", "Python"],
    challenges: [
      "Persisting graph state across stateless HTTP boundaries (solved with thread_id + MemorySaver)",
      "Streaming intermediate node outputs without blocking the event loop",
      "Designing the critique loop to converge instead of oscillating",
    ],
    metrics: [
      { label: "Graph nodes", value: "7" },
      { label: "End-to-end runtime", value: "~45s" },
      { label: "Streaming", value: "SSE" },
    ],
    links: {
      github: "https://github.com/rohanthakur6767",
      demo: "https://huggingface.co/spaces/rohan6767/newsletter-agent",
    },
    accent: "violet",
  },
  {
    slug: "fraud-detection",
    title: "AI Fraud Detection & Prevention Ecosystem with RPA",
    tagline:
      "Production-grade fraud classifier with SHAP explainability and a 4-bot RPA pipeline that cuts case handling from 12 minutes to under 2 seconds.",
    featured: true,
    category: "Machine Learning",
    problem:
      "Fraud teams drown in low-precision alerts and manual paperwork. The system had to be both accurate enough to trust and operationally useful — predictions alone are not a product.",
    features: [
      "Benchmarked XGBoost, LightGBM, Random Forest, AdaBoost on IEEE-CIS (590K+ tx, 471 features)",
      "XGBoost won: F1 = 0.6762, Precision = 0.89, AUC-ROC = 0.9522",
      "SHAP TreeExplainer surfaces per-transaction top-5 feature attributions",
      "React 19 analyst dashboard backed by FastAPI (<2s end-to-end latency)",
      "4-bot Python RPA pipeline: customer alert → risk-routed case creation → RBI-format STR → audit logger",
    ],
    architecture: [
      "SMOTE applied post-split to handle 3.5% class imbalance without leakage",
      "FastAPI inference service with SHAP attributions in the response payload",
      "RPA bots auto-trigger when fraud probability > 0.5",
      "React 19 analyst console with live attribution charts",
    ],
    stack: ["XGBoost", "SHAP", "FastAPI", "React 19", "SMOTE", "Python RPA", "Pandas"],
    challenges: [
      "Avoiding data leakage when oversampling a heavily imbalanced dataset",
      "Making model explanations operationally usable, not just plots in a notebook",
      "Designing the RPA hand-off so high-confidence cases skip human triage entirely",
    ],
    metrics: [
      { label: "AUC-ROC", value: "0.9522" },
      { label: "Precision", value: "0.89" },
      { label: "Workflow", value: "12m → 2s" },
    ],
    links: {
      github:
        "https://github.com/rohanthakur6767/AI-Powered-Fraud-Detection-Prevention-Ecosystem-with-RPA",
    },
    accent: "cyan",
  },
  {
    slug: "traffic-sign-detection",
    title: "AI Traffic Sign Detection",
    tagline:
      "CNN classifier across 43 traffic-sign classes, served behind a Flask API and deployed for live inference.",
    featured: true,
    category: "Deep Learning",
    problem:
      "Build a deployable computer-vision service for traffic-sign recognition that works for arbitrary user-uploaded images, not just curated test sets.",
    features: [
      "Convolutional neural network in TensorFlow / Keras",
      "98%+ accuracy across all 43 GTSRB sign classes",
      "Flask inference API with a minimal upload UI",
      "Hosted on Hugging Face Spaces for public live inference",
    ],
    architecture: [
      "Standard CNN trained on GTSRB with augmentation",
      "Flask service exposes /predict accepting multipart image uploads",
      "Lightweight HTML/JS frontend served from the same container",
      "Deployed to Hugging Face Spaces (Docker runtime)",
    ],
    stack: ["TensorFlow", "Keras", "CNN", "Flask", "Hugging Face Spaces"],
    challenges: [
      "Keeping inference latency low on the free-tier deployment",
      "Handling arbitrary image sizes and lighting conditions at inference time",
    ],
    metrics: [
      { label: "Accuracy", value: "98%+" },
      { label: "Classes", value: "43" },
    ],
    links: {
      github: "https://github.com/rohanthakur6767/TrafficSignDetection",
      demo: "https://rohan6767-traffic-sign-detection.hf.space",
    },
    accent: "emerald",
  },
  {
    slug: "personal-finance-tracker",
    title: "Personal Finance Tracker",
    tagline:
      "Full-stack React app for tracking spending patterns with interactive Chart.js dashboards. Live, deployed, and used daily.",
    featured: false,
    category: "Full-Stack",
    problem:
      "Most finance apps over-engineer the simple act of categorising spending. Goal: a fast, visual, no-friction tracker.",
    features: [
      "Interactive Chart.js dashboards for spending patterns and budget",
      "React Context API for clean state management",
      "Deployed to Vercel — live and functional",
    ],
    architecture: [
      "React + Tailwind frontend",
      "Chart.js for client-side visualisations",
      "Vercel deployment",
    ],
    stack: ["React.js", "Chart.js", "Tailwind CSS", "Vercel"],
    challenges: [
      "Keeping dashboards responsive as transaction count grows",
    ],
    links: {
      github: "https://github.com/rohanthakur6767/Personal_finance_Tracker",
      demo: "https://personal-finance-tracker-dun-eight.vercel.app/",
    },
    accent: "amber",
  },
];

export const experience = [
  {
    role: "AI/ML Intern",
    company: "AI Future Gen Pvt. Ltd.",
    location: "Dehradun, India",
    period: "Jan 2026 — Present",
    description:
      "Working on production AI infrastructure: retrieval pipelines, LLM backends, and multilingual voice-to-rule systems.",
    contributions: [
      "Built and deployed a Retrieval-Augmented Generation pipeline on Node.js + PostgreSQL (pgvector) with embedding-based semantic search.",
      "Designed document ingestion pipelines supporting PDF and structured JSON datasets to power AI-driven knowledge retrieval.",
      "Developed an AI backend using Node.js + OpenAI Whisper + GPT-4o-mini that converts voice or text instructions in any language into structured JSON rules for SMS filtering.",
    ],
    impact: [
      "Enabled multilingual rule-creation by non-technical users",
      "Made enterprise documents queryable through natural language",
    ],
    stack: ["Node.js", "PostgreSQL", "pgvector", "OpenAI Whisper", "GPT-4o-mini", "Embeddings"],
  },
];

export const education = [
  {
    institution: "Graphic Era Hill University, Dehradun",
    degree: "B.Tech CSE (Hons.) in AI & ML",
    period: "Aug 2022 — Present",
    score: "CGPA: 7.3",
  },
  {
    institution: "Mount Litera Zee School, Roorkee",
    degree: "Senior Secondary (XII)",
    period: "2022",
    score: "73.8%",
  },
];

export const certifications = [
  {
    name: "Professional Machine Learning Engineer",
    issuer: "Google Cloud",
    date: "Jul 2024",
    accent: "violet",
  },
  {
    name: "Power BI Data Analyst Associate",
    issuer: "Microsoft",
    date: "May 2025",
    accent: "cyan",
  },
  {
    name: "Machine Learning with Python",
    issuer: "SLOG Solutions Pvt. Ltd.",
    date: "Nov 2023",
    accent: "emerald",
  },
] as const;

export const specializations = [
  {
    title: "RAG Systems",
    description:
      "Production retrieval pipelines on PostgreSQL + pgvector. Document ingestion for PDFs and structured JSON, embedding-based semantic search, and grounded generation.",
    icon: "Database",
  },
  {
    title: "Multi-Agent Systems",
    description:
      "LangGraph state machines with conditional routing, self-critique loops, and human-in-the-loop checkpoints that survive across HTTP boundaries.",
    icon: "Network",
  },
  {
    title: "LLM Orchestration",
    description:
      "Streaming inference over Server-Sent Events, tool-use loops, and multi-provider routing across Groq, Gemini, GPT, and Whisper.",
    icon: "Workflow",
  },
  {
    title: "Vector Databases",
    description:
      "Hands-on with pgvector for hybrid retrieval — embeddings co-located with relational data, no separate vector store to operate.",
    icon: "Layers",
  },
  {
    title: "AI Automation & RPA",
    description:
      "Bots that turn ML predictions into operations: alerting, case routing, regulatory report generation, and audit logging.",
    icon: "Bot",
  },
  {
    title: "Deployment",
    description:
      "Docker, Hugging Face Spaces, Vercel, FastAPI services in production. Latency, secrets, and observability are not afterthoughts.",
    icon: "Rocket",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "AI Stack", href: "#specialization" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];
