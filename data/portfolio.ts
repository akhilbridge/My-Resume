export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type SkillGroup = {
  title: string;
  accent: "blue" | "cyan" | "amber";
  summary: string;
  skills: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};

export type Project = {
  number: string;
  title: string;
  duration: string;
  team: string;
  description: string;
  impact: string;
  stack: string[];
};

export type ContactItem = {
  label: string;
  value: string;
  href: string;
};

export type Reference = {
  name: string;
  role: string;
  contact: string;
};

export type FeaturedWriting = {
  title: string;
  summary: string;
  href: string;
  category: string;
};

export type ProfileSource = {
  label: string;
  value: string;
  href: string;
  type: "professional" | "social";
};

export const portfolio = {
  person: {
    name: "Akhil M Nair",
    initials: "AMN",
    role: "Lead Full Stack Developer",
    years: "9+ years",
    location: "Kochi, Kerala, India",
    availability: "Available for senior engineering and lead roles",
    summary:
      "I build scalable web platforms for eCommerce, insurance, and enterprise products with a strong focus on clean architecture, API design, and modern React delivery.",
    shortBio:
      "Lead Full Stack .NET developer with deep experience across .NET Core, React, Next.js, Azure, AWS, and microservices-based systems.",
    currentCompany: "Bridge Global",
    currentRole: "Lead Full Stack .NET Developer",
    education: [
      "Master of Computer Applications, Mahatma Gandhi University (2016)",
      "Bachelor of Computer Applications, Mahatma Gandhi University (2013)",
    ],
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],
  stats: [
    { value: "9+", label: "Years shipping software" },
    { value: "3", label: "Career chapters" },
    { value: "10+", label: "Major projects" },
    { value: "15+", label: "Core technologies" },
  ] satisfies Stat[],
  strengths: [
    {
      title: "Architecture that scales",
      text: "Comfortable leading clean, API-first systems with pragmatic patterns that teams can maintain over time.",
    },
    {
      title: "Product-minded delivery",
      text: "Strong at turning business requirements into reliable releases across frontend, backend, and cloud layers.",
    },
    {
      title: "Modern engineering leadership",
      text: "Experienced in code reviews, system ownership, performance tuning, and cross-team collaboration.",
    },
  ],
  skillGroups: [
    {
      title: "Backend and APIs",
      accent: "blue",
      summary:
        "Production-focused service development with maintainable code, stable contracts, and strong domain modeling.",
      skills: [
        "C#",
        ".NET Core",
        "ASP.NET Core",
        "Web API",
        "Entity Framework",
        "LINQ",
        "Minimal APIs",
      ],
    },
    {
      title: "Frontend delivery",
      accent: "cyan",
      summary:
        "React-based interfaces with attention to responsiveness, maintainability, and a smooth user experience.",
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
      ],
    },
    {
      title: "Architecture and security",
      accent: "amber",
      summary:
        "Systems designed around clarity, reliability, and long-term growth instead of short-term patchwork.",
      skills: [
        "Microservices",
        "Clean Architecture",
        "SOLID",
        "Event-Driven Design",
        "REST APIs",
        "GraphQL",
        "JWT",
        "OAuth2",
      ],
    },
    {
      title: "Data and cloud",
      accent: "blue",
      summary:
        "Hands-on experience with databases, deployment pipelines, and cloud services used in real production teams.",
      skills: [
        "SQL Server",
        "MySQL",
        "Dapper",
        "Query Optimization",
        "Azure",
        "AWS",
        "Docker",
        "CI/CD",
      ],
    },
  ] satisfies SkillGroup[],
  experiences: [
    {
      company: "Bridge Global",
      role: "Lead Full Stack .NET Developer",
      period: "2021 - Present",
      location: "Kochi",
      points: [
        "Led development of scalable Litium-based eCommerce platforms across multi-country markets.",
        "Built GraphQL and REST APIs for high-performance workflows and platform integrations.",
        "Improved maintainability and performance using Clean Architecture and SOLID principles.",
        "Integrated AWS and Azure services including Cognito, S3, and SES for secure delivery.",
      ],
    },
    {
      company: "Weboffice Infotech",
      role: "Full Stack Developer",
      period: "2019 - 2021",
      location: "Trivandrum",
      points: [
        "Delivered enterprise applications using ASP.NET Core, Web API, and SQL Server.",
        "Designed secure APIs with JWT authentication and role-based access control.",
        "Optimized database performance through tuning, stored procedures, and cleaner data access patterns.",
      ],
    },
    {
      company: "Mecnize Software Solutions",
      role: "Junior Developer",
      period: "2016 - 2019",
      location: "Kochi",
      points: [
        "Built web applications with ASP.NET MVC, Web API, and SQL Server.",
        "Created reusable components and strengthened system reliability in production projects.",
      ],
    },
  ] satisfies Experience[],
  projects: [
    {
      number: "01",
      title: "Litium eCommerce Platform",
      duration: "5 years",
      team: "Team of 10",
      description:
        "Multi-country eCommerce solutions with product catalog management, pricing, promotions, checkout, and order workflows.",
      impact:
        "Built for multi-market and multi-currency needs while keeping the stack stable and scalable.",
      stack: ["ASP.NET Core", "React", "GraphQL", "SQL Server"],
    },
    {
      number: "02",
      title: "Cyber Insurance Platform",
      duration: "1 year",
      team: "Team of 10",
      description:
        "Led migration from a legacy .NET application to a modern Node.js architecture for a cyber insurance product.",
      impact:
        "Re-architected backend services and connected AWS Cognito, SES, and S3 for secure operations.",
      stack: ["Node.js", "React", "AWS Cognito", "S3 / SES"],
    },
    {
      number: "03",
      title: "Golf Gaming and Analysis App",
      duration: "3 years",
      team: "Team of 10",
      description:
        "Bluetooth-enabled golf training app that captured body movement data from wearable sensors.",
      impact:
        "Translated motion analysis logic into C# to generate XYZ performance scoring in real time.",
      stack: ["ASP.NET Web API", "C#", "SQL Server", "Bluetooth SDK"],
    },
  ] satisfies Project[],
  contacts: [
    {
      label: "Phone",
      value: "+91 7558811227",
      href: "tel:+917558811227",
    },
    {
      label: "Email",
      value: "akhilmnair7@gmail.com",
      href: "mailto:akhilmnair7@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/akhil1m1n",
      href: "https://www.linkedin.com/in/akhil1m1n",
    },
    {
      label: "Instagram",
      value: "instagram.com/_real_akhil",
      href: "https://www.instagram.com/_real_akhil/",
    },
    {
      label: "Location",
      value: "Kochi, Kerala, India",
      href: "https://www.google.com/maps/search/Kochi,+Kerala,+India",
    },
  ] satisfies ContactItem[],
  profileSources: [
    {
      label: "LinkedIn",
      value: "linkedin.com/in/akhil1m1n",
      href: "https://www.linkedin.com/in/akhil1m1n",
      type: "professional",
    },
    {
      label: "Instagram",
      value: "instagram.com/_real_akhil",
      href: "https://www.instagram.com/_real_akhil/",
      type: "social",
    },
  ] satisfies ProfileSource[],
  references: [
    {
      name: "Jinesh V",
      role: "Bridge Global - Process Manager",
      contact: "+91 9846298009",
    },
    {
      name: "Vishnu KJ",
      role: "Bridge Global - Project Manager",
      contact: "+91 9847870905",
    },
  ] satisfies Reference[],
  featuredWriting: {
    title: "How AI is Changing ASP.NET Core Development in 2026",
    summary:
      "A practical look at how AI-native architecture, copilots, semantic search, and intelligent enterprise workflows are reshaping modern .NET delivery.",
    href: "/blog/how-ai-is-changing-aspnet-core-development-in-2026",
    category: "AI x .NET",
  } satisfies FeaturedWriting,
  quickPrompts: [
    "What are his strongest skills?",
    "What is his current role?",
    "Which projects stand out most?",
    "Is he open to new opportunities?",
  ],
} as const;

export const assistantKnowledge = {
  summary:
    "Akhil M Nair is a Lead Full Stack .NET Developer with 9+ years of experience across eCommerce, insurance, and enterprise software.",
  highlights: [
    "Strong in C#, .NET Core, ASP.NET Core, React, Next.js, Azure, AWS, SQL Server, GraphQL, and microservices.",
    "Currently works at Bridge Global in Kochi as a Lead Full Stack .NET Developer.",
    "Has led scalable Litium eCommerce work and modern API-driven systems.",
    "Open to new senior engineering and lead opportunities.",
  ],
};
