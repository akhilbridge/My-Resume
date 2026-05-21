import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

import { blogArticles } from "@/data/blog";
import { assistantKnowledge, portfolio } from "@/data/portfolio";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type ChatRequest = {
  question?: string;
  messages?: ChatMessage[];
};

const keywordBuckets = {
  skills: [
    "skill",
    "stack",
    "technology",
    "tech",
    "react",
    "next",
    "dotnet",
    ".net",
    "backend",
    "frontend",
    "cloud",
    "azure",
    "aws",
    "graphql",
  ],
  experience: [
    "experience",
    "career",
    "work",
    "company",
    "companies",
    "journey",
    "history",
    "years",
  ],
  currentRole: [
    "current",
    "now",
    "present",
    "job",
    "role",
    "bridge",
    "working",
  ],
  projects: [
    "project",
    "projects",
    "portfolio",
    "built",
    "case study",
    "best",
    "standout",
  ],
  availability: [
    "hire",
    "hiring",
    "available",
    "availability",
    "open",
    "opportunity",
    "opportunities",
    "contact",
    "reach",
  ],
  profiles: [
    "linkedin",
    "instagram",
    "social",
    "profile",
    "profiles",
    "follow",
    "connect",
  ],
  education: ["education", "study", "degree", "college", "mca", "bca"],
  references: ["reference", "references", "manager", "recommendation"],
  blog: ["blog", "article", "writing", "post", "posts", "ai", "asp.net core"],
  private: [
    "married",
    "wife",
    "husband",
    "girlfriend",
    "boyfriend",
    "family",
    "children",
    "child",
    "kids",
    "dating",
    "relationship",
    "religion",
    "caste",
    "politics",
    "salary",
    "income",
  ],
} as const;

const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

function buildDebugInfo() {
  return {
    envDetected: Boolean(geminiApiKey),
    model: geminiApiKey ? geminiModel : null,
  };
}

const portfolioContext = `
Portfolio owner: ${portfolio.person.name}
Role: ${portfolio.person.currentRole}
Current company: ${portfolio.person.currentCompany}
Location: ${portfolio.person.location}
Availability: ${portfolio.person.availability}
Summary: ${portfolio.person.summary}
Short bio: ${portfolio.person.shortBio}
Education: ${portfolio.person.education.join(" | ")}

Skills:
${portfolio.skillGroups
  .map((group) => `${group.title}: ${group.skills.join(", ")}`)
  .join("\n")}

Experience:
${portfolio.experiences
  .map(
    (experience) =>
      `${experience.company} - ${experience.role} (${experience.period}, ${experience.location}): ${experience.points.join(" ")}`
  )
  .join("\n")}

Projects:
${portfolio.projects
  .map(
    (project) =>
      `${project.title}: ${project.description} Impact: ${project.impact} Stack: ${project.stack.join(", ")}`
  )
  .join("\n")}

Contacts:
${portfolio.contacts.map((contact) => `${contact.label}: ${contact.value}`).join(" | ")}

Profiles:
${portfolio.profileSources.map((profile) => `${profile.label}: ${profile.value} (${profile.type})`).join(" | ")}

References:
${portfolio.references.map((reference) => `${reference.name} - ${reference.role} - ${reference.contact}`).join(" | ")}

Blog:
${blogArticles
  .map((article) => `${article.title}: ${article.summary} Published ${article.publishedAt}.`)
  .join("\n")}
`.trim();

function normalize(text: string) {
  return text.toLowerCase();
}

function scoreQuestion(question: string, words: readonly string[]) {
  const normalizedQuestion = normalize(question);
  return words.reduce((score, word) => {
    return normalizedQuestion.includes(word) ? score + 1 : score;
  }, 0);
}

function answerForSkills() {
  const coreSkills = portfolio.skillGroups
    .flatMap((group) => group.skills)
    .slice(0, 10)
    .join(", ");

  return `Akhil's strongest skills center on ${coreSkills}. He is especially valuable when a team needs someone who can move across APIs, frontend delivery, cloud integrations, and scalable architecture without losing product focus.`;
}

function answerForExperience() {
  return `Akhil brings ${portfolio.person.years} of experience across Bridge Global, Weboffice Infotech, and Mecnize Software Solutions. His work has focused on eCommerce, insurance, and enterprise applications, with increasing ownership in architecture, performance, and team leadership.`;
}

function answerForCurrentRole() {
  return `He is currently working at ${portfolio.person.currentCompany} in Kochi as a ${portfolio.person.currentRole}. In that role he leads full stack delivery across Litium eCommerce platforms, API systems, and cloud-backed solutions.`;
}

function answerForProjects() {
  const names = portfolio.projects.map((project) => project.title).join(", ");
  return `The standout projects on his portfolio are ${names}. They show a strong mix of platform engineering, modernization work, and product-focused development with real production complexity.`;
}

function answerForAvailability() {
  return `Yes, Akhil is ${portfolio.person.availability.toLowerCase()}. The best way to reach him is by email at ${portfolio.contacts[1].value} or through LinkedIn at ${portfolio.contacts[2].value}.`;
}

function answerForProfiles() {
  const linkedin = portfolio.profileSources.find((profile) => profile.label === "LinkedIn");
  const instagram = portfolio.profileSources.find((profile) => profile.label === "Instagram");

  return `You can connect with Akhil on LinkedIn at ${linkedin?.value} and follow his Instagram at ${instagram?.value}. LinkedIn is the stronger professional profile, while Instagram is available as an additional social profile.`;
}

function answerForEducation() {
  return `His academic background includes a Master of Computer Applications and a Bachelor of Computer Applications from Mahatma Gandhi University. That foundation is backed by years of hands-on production work across modern web stacks.`;
}

function answerForReferences() {
  const referenceText = portfolio.references
    .map((reference) => `${reference.name} (${reference.role})`)
    .join(" and ");

  return `References are available from ${referenceText}. If you would like an introduction, the easiest path is to contact Akhil directly through email or LinkedIn.`;
}

function answerForBlog() {
  const latestArticle = blogArticles[0];

  return `Akhil's latest article is "${latestArticle.title}". It explores how AI-native architecture, copilots, semantic search, and enterprise automation are changing ASP.NET Core development in 2026. You can read it in the Blog section of the portfolio.`;
}

function answerFallback() {
  return `${assistantKnowledge.summary} ${assistantKnowledge.highlights[0]} ${assistantKnowledge.highlights[1]} If you want, ask about his skills, current role, notable projects, blog posts, or availability.`;
}

function answerForPrivateQuestion() {
  return "I can only answer from Akhil's portfolio data, and it does not include private personal details like relationship or family status. I can help with his skills, experience, projects, current role, education, references, blog posts, or availability instead.";
}

function buildLocalReply(question: string) {
  if (scoreQuestion(question, keywordBuckets.private) > 0) {
    return answerForPrivateQuestion();
  }

  const scores = {
    skills: scoreQuestion(question, keywordBuckets.skills),
    experience: scoreQuestion(question, keywordBuckets.experience),
    currentRole: scoreQuestion(question, keywordBuckets.currentRole),
    projects: scoreQuestion(question, keywordBuckets.projects),
    availability: scoreQuestion(question, keywordBuckets.availability),
    profiles: scoreQuestion(question, keywordBuckets.profiles),
    education: scoreQuestion(question, keywordBuckets.education),
    references: scoreQuestion(question, keywordBuckets.references),
    blog: scoreQuestion(question, keywordBuckets.blog),
  };

  const strongest = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  if (!strongest || strongest[1] === 0) {
    return answerFallback();
  }

  switch (strongest[0]) {
    case "skills":
      return answerForSkills();
    case "experience":
      return answerForExperience();
    case "currentRole":
      return answerForCurrentRole();
    case "projects":
      return answerForProjects();
    case "availability":
      return answerForAvailability();
    case "profiles":
      return answerForProfiles();
    case "education":
      return answerForEducation();
    case "references":
      return answerForReferences();
    case "blog":
      return answerForBlog();
    default:
      return answerFallback();
  }
}

function buildConversationTranscript(messages: ChatMessage[] | undefined, question: string) {
  const recentMessages = (messages ?? []).slice(-8);
  const transcript = recentMessages
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");

  return transcript || `USER: ${question}`;
}

async function buildGeminiReply(question: string, messages: ChatMessage[] | undefined) {
  if (!geminiApiKey) {
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: geminiApiKey });
  const transcript = buildConversationTranscript(messages, question);
  const prompt = [
    "Conversation:",
    transcript,
    "",
    "Answer the user's latest question using only the provided portfolio and blog data.",
    `Latest user question: ${question}`,
  ].join("\n");

  const response = await ai.models.generateContent({
    model: geminiModel,
    contents: prompt,
    config: {
      systemInstruction: [
        "You are Akhil's portfolio assistant for a personal website.",
        "Answer only from the provided portfolio and blog data.",
        "Do not invent facts, private details, or unsupported claims.",
        "If the answer is not in the provided data, say that clearly and offer nearby topics you can answer.",
        "Decline private personal questions like relationship, family, religion, caste, politics, salary, or income.",
        "Keep answers concise, useful, and natural.",
        `Portfolio and blog data:\n${portfolioContext}`,
      ].join("\n"),
      temperature: 0.4,
    },
  });

  const reply = response.text?.trim();
  return reply || null;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ChatRequest;
  const question =
    body.question?.trim() ||
    body.messages?.filter((message) => message.role === "user").at(-1)?.content ||
    "";

  if (!question) {
    return NextResponse.json(
      { debug: buildDebugInfo(), mode: "local", reply: answerFallback() },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  }

  if (!geminiApiKey) {
    return NextResponse.json(
      { debug: buildDebugInfo(), mode: "local", reply: buildLocalReply(question) },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  }

  try {
    const reply = await buildGeminiReply(question, body.messages);

    if (reply) {
      return NextResponse.json(
        { debug: buildDebugInfo(), mode: "gemini", reply },
        { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }
  } catch {
    const fallbackReply = buildLocalReply(question);
    return NextResponse.json({
        debug: buildDebugInfo(),
        mode: "fallback",
        reply: `The live Gemini assistant is unavailable right now, so I answered from the local portfolio data instead. ${fallbackReply}`,
      },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  }

  return NextResponse.json(
    { debug: buildDebugInfo(), mode: "local", reply: buildLocalReply(question) },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      debug: buildDebugInfo(),
      mode: geminiApiKey ? "ready" : "local",
      model: geminiApiKey ? geminiModel : null,
    },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
  );
}
