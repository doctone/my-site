/**
 * The single source of facts about Sam. The home page renders the links and
 * current focus, and the assistant sends the whole object to the model as
 * context, so both always say the same thing.
 */
export type ProfileLink = {
  label: "GitHub" | "LinkedIn" | "Email";
  href: string;
};

type Profile = {
  identity: { name: string; title: string; location: string };
  links: ProfileLink[];
  /** What Sam works on now. Everything else describes past experience. */
  currentFocus: { work: string[]; stack: string[] };
  [section: string]: unknown;
};

export const profile = {
  identity: {
    name: "Sam James",
    title: "Senior Software Engineer",
    location: "United Kingdom",
  },
  links: [
    {
      label: "GitHub",
      href: "https://github.com/doctone",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sam-james1991/",
    },
    {
      label: "Email",
      href: "mailto:samjojames@gmail.com",
    },
  ],
  currentFocus: {
    work: [
      "LLM pipelines ingesting data from internal, external and public sources",
      "Analysis that builds intelligent signals from that data",
      "Entity extraction and consolidation across those signals",
      "Comparison and exploration of intelligence data",
    ],
    stack: [
      "Python intelligence layer, Temporal-orchestrated workers",
      "Next.js product app, shared React design system",
      "EKS, Terraform, ArgoCD. GitOps all the way down",
    ],
  },
  summary:
    "Senior full-stack engineer who designs and delivers reliable products across data, payments, and AI-enabled platforms, with a strong focus on architecture quality and practical business outcomes.",
  coreStack: [
    "TypeScript",
    "Node.js",
    "React",
    "Next.js",
    "AWS",
    "Docker",
    "PostgreSQL",
    "Redis",
    "Event-driven architecture",
    "AI SDK",
  ],
  stackProfile: {
    languages: ["TypeScript", "JavaScript", "SQL", "Bash"],
    frontend: [
      "React",
      "Next.js App Router",
      "Chakra UI",
      "Tailwind CSS",
      "Framer Motion",
      "Accessible component design",
    ],
    backend: [
      "Node.js services",
      "REST and webhook integrations",
      "Async workflows",
      "API design and contract evolution",
      "Background workers",
      "Domain-oriented service boundaries",
    ],
    dataAndState: [
      "PostgreSQL",
      "Redis caching",
      "Schema evolution",
      "Data pipelines",
      "Reporting-oriented models",
      "Idempotent event processing",
    ],
    cloudAndInfra: [
      "AWS deployments",
      "Containerized workloads",
      "Infrastructure-aware application design",
      "Environment and secret management",
      "Production rollouts and rollback strategy",
    ],
    architecture: [
      "Event-driven systems",
      "High-availability service design",
      "Fault-tolerant integration patterns",
      "Observability-first thinking",
      "Incremental modernization of legacy systems",
    ],
    qualityAndTesting: [
      "TDD",
      "Unit and integration testing",
      "Contract and regression testing",
      "Refactoring for maintainability",
      "Production hardening",
    ],
    devTooling: [
      "ESLint",
      "Jest",
      "PostCSS",
      "CI-friendly workflows",
      "Local developer experience improvements",
    ],
    aiProductEngineering: [
      "OpenAI integrations",
      "Vercel AI SDK chat systems",
      "Multi-turn conversation design",
      "Prompt and context engineering",
      "Tool selection and response grounding",
      "ML evaluation frameworks (Braintrust)",
      "Multi-turn conversation evals",
      "Safety and non-hallucination guardrails",
      "Domain-specific LLM applications",
    ],
    documentProcessingAndAi: [
      "PDF extraction and markdown generation",
      "Policy document analysis with LLMs",
      "Reference and relationship extraction",
      "Document classification via AI",
      "Multi-document reasoning systems",
    ],
    monorepoAndSystems: [
      "pnpm workspaces",
      "Turbo build orchestration",
      "AWS Lambda deployments",
      "Serverless function architecture",
      "Inngest background job workflows",
      "Supabase PostgreSQL and file storage",
    ],
    authenticationAndSecurity: [
      "2FA/MFA implementation",
      "Authentication flow design",
      "Token and session management",
    ],
  },
  expertiseAreas: [
    "Backend architecture",
    "Event-driven systems",
    "Payments and transaction platforms",
    "Data infrastructure",
    "AI product engineering",
    "Document processing and AI",
    "ML evaluation and evals frameworks",
    "Multi-turn AI chat systems",
    "Frontend product delivery",
    "Reliability and quality engineering",
    "Technical discovery and system modernization",
    "Monorepo architecture and tooling",
  ],
  experienceHighlights: [
    {
      theme: "Data and analytics",
      detail:
        "Built data infrastructure for US analytics platforms, improving reliability and maintainability for data-heavy workflows.",
    },
    {
      theme: "Fintech and payments",
      detail:
        "Modernized payment systems for major e-commerce contexts, focusing on scalable architecture, provider integration resilience, and operational uptime.",
    },
    {
      theme: "Climate and reporting",
      detail:
        "Delivered carbon accounting tools for Private Equity firms to support portfolio-level emissions understanding and practical reporting workflows.",
    },
    {
      theme: "AI systems for planning and property intelligence",
      detail:
        "Building production AI systems for UK planning permission workflows at Xylo. Implemented PDF extraction pipelines with AI-generated markdown, multi-turn conversation systems with tool-based response grounding, ML eval frameworks (Braintrust) for response quality, and background job processing for async document analysis. Architected 30+ package monorepo with pnpm/Turbo, designed 2FA authentication flows, and drove reliability improvements through comprehensive testing strategies in a domain combining regulatory complexity with AI product delivery.",
    },
  ],
  deliveryScope: {
    builds: [
      "User-facing products with robust backend foundations",
      "Mission-critical service integrations",
      "Data-backed workflows for operational teams",
      "AI copilots and domain-specific assistants",
      "Systems that prioritize reliability, maintainability, and clear ownership",
    ],
    ownership: [
      "Problem framing with stakeholders",
      "Architecture and implementation",
      "Testing strategy",
      "Release planning",
      "Post-release iteration",
    ],
  },
  engineeringValues: [
    "Test-driven development",
    "Well-tested and maintainable code",
    "Domain-led modelling",
    "Pragmatic technical decisions",
    "Clear communication of tradeoffs",
    "Outcome-oriented engineering over tool-chasing",
  ],
  communicationPrefs: {
    style: "Concise, specific, and practical",
    fitAssessment:
      "Map requirements directly to projects delivered, system constraints handled, and outcomes enabled",
    uncertainty: "State assumptions explicitly when details are missing",
    answerPriority:
      "Lead with what was built and why it mattered; include stack detail as supporting evidence",
  },
  responseFramework: {
    defaultOrder: [
      "Outcome",
      "System or capability built",
      "Technical approach",
      "Relevant stack",
    ],
    fitQuestions: [
      "Map requirement to evidence",
      "Highlight delivery risks handled",
      "Call out assumptions and unknowns",
    ],
  },
  doNotClaim: [
    "Specific dates not provided",
    "Certifications not provided",
    "Employers or job titles not in known context",
    "Metrics or outcomes that have not been stated",
  ],
} satisfies Profile;
