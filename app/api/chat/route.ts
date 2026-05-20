import { NextResponse } from "next/server";

import { assistantKnowledge, portfolio } from "@/data/portfolio";

type ChatRequest = {
  question?: string;
  messages?: Array<{
    role: "assistant" | "user";
    content: string;
  }>;
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
  education: ["education", "study", "degree", "college", "mca", "bca"],
  references: ["reference", "references", "manager", "recommendation"],
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

function answerForEducation() {
  return `His academic background includes a Master of Computer Applications and a Bachelor of Computer Applications from Mahatma Gandhi University. That foundation is backed by years of hands-on production work across modern web stacks.`;
}

function answerForReferences() {
  const referenceText = portfolio.references
    .map((reference) => `${reference.name} (${reference.role})`)
    .join(" and ");

  return `References are available from ${referenceText}. If you would like an introduction, the easiest path is to contact Akhil directly through email or LinkedIn.`;
}

function answerFallback() {
  return `${assistantKnowledge.summary} ${assistantKnowledge.highlights[0]} ${assistantKnowledge.highlights[1]} If you want, ask about his skills, current role, notable projects, or availability.`;
}

function answerForPrivateQuestion() {
  return "I can only answer from Akhil's portfolio data, and it does not include private personal details like relationship or family status. I can help with his skills, experience, projects, current role, education, references, or availability instead.";
}

function buildReply(question: string) {
  if (scoreQuestion(question, keywordBuckets.private) > 0) {
    return answerForPrivateQuestion();
  }

  const scores = {
    skills: scoreQuestion(question, keywordBuckets.skills),
    experience: scoreQuestion(question, keywordBuckets.experience),
    currentRole: scoreQuestion(question, keywordBuckets.currentRole),
    projects: scoreQuestion(question, keywordBuckets.projects),
    availability: scoreQuestion(question, keywordBuckets.availability),
    education: scoreQuestion(question, keywordBuckets.education),
    references: scoreQuestion(question, keywordBuckets.references),
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
    case "education":
      return answerForEducation();
    case "references":
      return answerForReferences();
    default:
      return answerFallback();
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ChatRequest;
  const question =
    body.question?.trim() ||
    body.messages?.filter((message) => message.role === "user").at(-1)?.content ||
    "";

  const reply = question ? buildReply(question) : answerFallback();
  return NextResponse.json({ reply });
}
