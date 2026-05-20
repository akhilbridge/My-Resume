export type BlogFeature = {
  title: string;
  description: string;
  points?: string[];
};

export type BlogArticle = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  heroImage: string;
  heroAlt: string;
  inlineImages: {
    architecture: {
      src: string;
      alt: string;
      caption: string;
    };
    enterprise: {
      src: string;
      alt: string;
      caption: string;
    };
  };
  intro: string[];
  evolutionAreas: string[];
  futureStack: string[];
  aiFit: BlogFeature[];
  majorChanges: BlogFeature[];
  enterpriseUseCases: string[];
  documentProcessingItems: string[];
  microserviceModules: string[];
  devopsBenefits: string[];
  semanticSearchUses: string[];
  architectureFlow: string[];
  codeExample: string;
  codeCaption: string;
  securityChallenges: string[];
  learningPaths: Array<{
    title: string;
    items: string[];
  }>;
  futureSignals: string[];
  conclusion: string[];
  tags: string[];
};

export const blogArticles = [
  {
    slug: "how-ai-is-changing-aspnet-core-development-in-2026",
    title: "How AI is Changing ASP.NET Core Development in 2026",
    summary:
      "Artificial intelligence is shifting ASP.NET Core from a traditional backend framework into the foundation for AI-native enterprise systems.",
    category: "AI x .NET",
    publishedAt: "May 20, 2026",
    readingTime: "9 min read",
    heroImage: "/blog/ai-aspnet-core-2026-hero.svg",
    heroAlt:
      "Editorial illustration showing ASP.NET Core, cloud services, and AI layers connected in a modern application stack.",
    inlineImages: {
      architecture: {
        src: "/blog/ai-aspnet-core-2026-architecture.svg",
        alt: "Diagram of a modern AI architecture with frontend, ASP.NET Core gateway, AI services, microservices, and data layers.",
        caption:
          "A common 2026 delivery pattern uses ASP.NET Core as the secure orchestration layer between product UI, AI services, and domain microservices.",
      },
      enterprise: {
        src: "/blog/ai-aspnet-core-2026-enterprise.svg",
        alt: "Visual grid of enterprise AI scenarios including copilots, observability, semantic search, and document intelligence.",
        caption:
          "The most valuable AI work in .NET is rarely a single chatbot. It is usually a connected system of assistants, search, workflow automation, and domain APIs.",
      },
    },
    intro: [
      "Artificial Intelligence is no longer an experimental capability in software engineering. In 2026, it has become part of the core application stack for many ASP.NET Core teams.",
      "From AI-powered APIs and intelligent automation to AI-assisted coding and predictive analytics, the .NET ecosystem is moving well beyond traditional backend development.",
      "Developers are no longer building applications that only process data. They are building systems that can understand, predict, automate, and assist users intelligently.",
    ],
    evolutionAreas: [
      "Enterprise applications",
      "Cloud-native APIs",
      "Microservices",
      "SaaS platforms",
      "eCommerce systems",
      "Real-time applications",
    ],
    futureStack: [
      "ASP.NET Core",
      "React / Next.js",
      "Cloud platforms",
      "AI APIs",
      "Event-driven architecture",
    ],
    aiFit: [
      {
        title: "High performance",
        description:
          "ASP.NET Core gives AI-enabled services a fast, efficient runtime for orchestrating model calls, domain logic, and API responses.",
      },
      {
        title: "Scalability",
        description:
          "AI workloads often create unpredictable traffic patterns. Microservices built with ASP.NET Core can scale independently using Docker, Kubernetes, and cloud-native deployment models.",
      },
      {
        title: "Cloud integration",
        description:
          "The framework fits naturally with Azure, AWS, Azure OpenAI, Cognitive Services, and serverless workflows, which makes hybrid AI architecture easier to ship.",
      },
      {
        title: "Secure API architecture",
        description:
          "Enterprise AI still needs disciplined security. ASP.NET Core provides strong building blocks for JWT authentication, OAuth2, identity management, and role-based access control.",
      },
    ],
    majorChanges: [
      {
        title: "1. AI-assisted coding",
        description:
          "GitHub Copilot, ChatGPT, and other coding assistants are reducing repetitive implementation work so developers can spend more time on architecture and business logic.",
        points: [
          "Generate boilerplate code",
          "Write APIs faster",
          "Create unit tests",
          "Optimize LINQ queries",
          "Generate SQL queries",
          "Debug exceptions",
        ],
      },
      {
        title: "2. Smarter enterprise applications",
        description:
          "Traditional enterprise systems reacted to user input. Modern systems can understand language, analyze behavior, predict outcomes, and automate recommendations.",
        points: [
          "AI-powered dashboards",
          "Smart search systems",
          "Intelligent document processing",
          "AI customer support assistants",
          "Predictive analytics platforms",
        ],
      },
      {
        title: "3. AI-powered chatbots and virtual assistants",
        description:
          "ASP.NET Core APIs are now frequently the backend engine behind enterprise copilots and support assistants powered by OpenAI, Azure OpenAI, Semantic Kernel, and LangChain.",
        points: [
          "HR support bots",
          "Insurance assistants",
          "Internal enterprise copilots",
          "eCommerce recommendation assistants",
          "IT support systems",
        ],
      },
      {
        title: "4. Intelligent document processing",
        description:
          "Documents such as invoices, contracts, reports, and insurance files can now be summarized, classified, and validated automatically using OCR and document intelligence services.",
      },
      {
        title: "5. AI in microservices architecture",
        description:
          "Instead of embedding AI everywhere, teams increasingly isolate recommendation, analytics, fraud detection, and notification intelligence into focused services.",
      },
      {
        title: "6. AI-driven DevOps and monitoring",
        description:
          "Modern observability stacks can predict failures, detect abnormal traffic, analyze logs, and surface performance improvements before users feel the impact.",
      },
      {
        title: "7. Semantic search and vector databases",
        description:
          "Keyword search is giving way to systems that understand meaning and context through embeddings, vector search, and retrieval-augmented generation.",
      },
    ],
    enterpriseUseCases: [
      "AI customer support assistants",
      "Recommendation engines",
      "Workflow automation",
      "Predictive analytics dashboards",
      "Natural language search and reporting",
    ],
    documentProcessingItems: [
      "Extract key information",
      "Summarize content",
      "Classify documents",
      "Detect anomalies",
    ],
    microserviceModules: [
      "AI recommendation services",
      "AI analytics services",
      "AI notification engines",
      "AI fraud detection modules",
    ],
    devopsBenefits: [
      "Predict failures",
      "Detect abnormal traffic",
      "Analyze logs intelligently",
      "Suggest performance improvements",
    ],
    semanticSearchUses: [
      "Knowledge management systems",
      "AI-powered documentation portals",
      "Smart enterprise search engines",
      "Internal company assistants",
    ],
    architectureFlow: [
      "React / Next.js frontend",
      "ASP.NET Core Web API gateway",
      "AI service layer (OpenAI / Azure OpenAI)",
      "Microservices architecture",
      "SQL Server / vector database",
      "Event bus / message queue",
    ],
    codeExample: `using System.Net.Http.Headers;

var client = new HttpClient();

client.DefaultRequestHeaders.Authorization =
    new AuthenticationHeaderValue("Bearer", apiKey);

var request = new
{
    model = "gpt-4o-mini",
    messages = new[]
    {
        new
        {
            role = "user",
            content = "Explain Clean Architecture in ASP.NET Core"
        }
    }
};

var response = await client.PostAsJsonAsync(
    "https://api.openai.com/v1/chat/completions",
    request);

var result = await response.Content.ReadAsStringAsync();

Console.WriteLine(result);`,
    codeCaption:
      "A small ASP.NET Core integration like this can power assistants, content generation, recommendation systems, and intelligent internal tools.",
    securityChallenges: [
      "Prompt injection attacks",
      "AI response validation",
      "API rate limiting",
      "Secure AI key storage",
      "Sensitive data protection",
      "Hallucination handling",
    ],
    learningPaths: [
      {
        title: "AI and integration",
        items: ["OpenAI APIs", "Azure OpenAI", "Prompt engineering", "Semantic Kernel", "LangChain"],
      },
      {
        title: "Architecture",
        items: ["Microservices", "Event-driven systems", "Clean Architecture", "CQRS", "Distributed systems"],
      },
      {
        title: "Cloud and DevOps",
        items: ["Docker", "Kubernetes", "Azure Functions", "CI/CD pipelines"],
      },
      {
        title: "Data and search",
        items: ["Vector databases", "Embeddings", "Semantic search", "RAG architecture"],
      },
    ],
    futureSignals: [
      "AI copilots",
      "Autonomous workflows",
      "Predictive systems",
      "Intelligent automation",
      "AI-driven analytics",
    ],
    conclusion: [
      "AI is fundamentally changing how ASP.NET Core applications are designed, developed, and deployed.",
      "Modern developers are no longer building static systems. They are creating intelligent platforms that understand users, automate decisions, and deliver smarter experiences.",
      "By combining ASP.NET Core, React / Next.js, cloud-native architecture, AI services, and microservices, teams can build scalable, secure, and future-ready enterprise platforms.",
      "The future of .NET development is not just cloud-native. It is AI-native.",
    ],
    tags: [
      "ASP.NET Core",
      "Artificial Intelligence",
      "OpenAI",
      "Azure OpenAI",
      "Microservices",
      "Semantic Search",
      "DevOps",
    ],
  },
] satisfies BlogArticle[];

export function getBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}
