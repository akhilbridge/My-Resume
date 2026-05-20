"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ChatAssistant } from "@/components/chat-assistant";
import { portfolio } from "@/data/portfolio";

type PanelKey =
  | "search"
  | "dash"
  | "tasks"
  | "music"
  | "msgs"
  | "reco"
  | "wthr";

type PanelMeta = {
  icon: string;
  title: string;
  subtitle: string;
};

const panelOrder: PanelKey[] = ["dash", "tasks", "music", "msgs", "reco", "wthr"];

const panelMeta: Record<PanelKey, PanelMeta> = {
  search: {
    icon: "AI",
    title: "Ask AI About Akhil",
    subtitle: "Portfolio answers from his career data.",
  },
  dash: {
    icon: "DATA",
    title: "Career Dashboard",
    subtitle: "A quick snapshot of experience, delivery range, and strengths.",
  },
  tasks: {
    icon: "WORK",
    title: "Work Experience",
    subtitle: "Three companies, nine-plus years, and growing technical ownership.",
  },
  music: {
    icon: "SKILL",
    title: "Technical Skills",
    subtitle: "Full stack strengths across backend, frontend, cloud, and architecture.",
  },
  msgs: {
    icon: "SHIP",
    title: "Featured Projects",
    subtitle: "Representative projects showing scale, migration, and product depth.",
  },
  reco: {
    icon: "ABOUT",
    title: "About Akhil",
    subtitle: "Lead developer, architect, and hands-on product builder.",
  },
  wthr: {
    icon: "LINK",
    title: "Contact and Location",
    subtitle: "Kochi, Kerala, with openness to remote opportunities worldwide.",
  },
};

const dashboardMetrics = [
  ["9+", "Years Experience", "metric-blue"],
  ["15+", "Core Technologies", "metric-purple"],
  ["3", "Companies", "metric-cyan"],
  ["10+", "Major Projects", "metric-pink"],
] as const;

const depthMetrics = [
  ["C# / .NET Core", 96, "#4f94ff"],
  ["React / Next.js", 90, "#00c8dc"],
  ["Cloud Architecture", 85, "#9060ff"],
  ["Database and SQL", 88, "#f070b0"],
  ["Microservices", 87, "#34d399"],
] as const;

const skillMatrix = [
  {
    category: "Backend",
    accent: "#4f94ff",
    items: [
      ["C# / .NET Core", 96],
      ["ASP.NET Core Web API", 94],
      ["Entity Framework and LINQ", 88],
      ["Minimal APIs", 82],
    ],
  },
  {
    category: "Frontend",
    accent: "#00c8dc",
    items: [
      ["React.js / Next.js", 91],
      ["TypeScript", 86],
      ["Tailwind CSS", 88],
      ["HTML5 / CSS3", 93],
    ],
  },
  {
    category: "Cloud and DevOps",
    accent: "#9060ff",
    items: [
      ["Microsoft Azure", 86],
      ["AWS (Cognito / S3 / SES)", 83],
      ["Docker and CI/CD", 80],
      ["Git / Azure DevOps", 91],
    ],
  },
  {
    category: "Architecture",
    accent: "#f070b0",
    items: [
      ["Microservices", 88],
      ["Clean Architecture", 91],
      ["SOLID Principles", 93],
      ["GraphQL and REST", 90],
    ],
  },
] as const;

const domainHighlights = ["eCommerce", "Insurance", "Enterprise"] as const;

const experiencePreview = [
  {
    company: "Bridge Global",
    period: "2021 - Present",
    role: "Lead Full Stack .NET Developer",
    status: "Current",
  },
  {
    company: "Weboffice Infotech",
    period: "2019 - 2021",
    role: "Full Stack Developer",
    status: "Core APIs",
  },
  {
    company: "Mecnize Software Solutions",
    period: "2016 - 2019",
    role: "Junior Developer",
    status: "Foundation",
  },
] as const;

const experienceTags: Record<string, readonly string[]> = {
  "Bridge Global": ["Litium", "GraphQL", "Azure", "AWS", "Clean Architecture"],
  "Weboffice Infotech": ["ASP.NET Core", "JWT", "SQL Server", "Performance"],
  "Mecnize Software Solutions": ["ASP.NET MVC", "Web API", "SQL Server"],
};

const projectBullets: Record<string, readonly string[]> = {
  "Litium eCommerce Platform": [
    "Multi-country storefront delivery with custom catalog, checkout, and promotions.",
    "GraphQL-driven integrations for dynamic frontend data flows.",
    "Performance tuning with caching, query optimization, and async workflows.",
  ],
  "Cyber Insurance Platform": [
    "Modernized a legacy .NET product into a Node.js-based architecture.",
    "Connected AWS Cognito, SES, and S3 for secure identity and operations.",
    "Supported frontend redesign and backend service restructuring.",
  ],
  "Golf Gaming and Analysis App": [
    "Processed wearable Bluetooth sensor data in near real time.",
    "Translated movement analysis logic into C# scoring algorithms.",
    "Delivered training-focused analytics for player performance feedback.",
  ],
};

const navPanelMap: Record<string, PanelKey> = {
  About: "reco",
  Skills: "music",
  Experience: "tasks",
  Projects: "msgs",
  Contact: "wthr",
};

export function PortfolioHub() {
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePanel(null);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = activePanel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePanel]);

  function renderPopupBody() {
    if (!activePanel) {
      return null;
    }

    if (activePanel === "search") {
      return (
        <div className="popup-section-stack">
          <div className="popup-label">AI Chat</div>
          <ChatAssistant
            prompts={portfolio.quickPrompts}
            title="Ask AI About Akhil"
            subtitle="Portfolio-powered answers"
            variant="compact"
          />
        </div>
      );
    }

    if (activePanel === "dash") {
      return (
        <div className="popup-section-stack">
          <div className="dashboard-metrics">
            {dashboardMetrics.map(([value, label, colorClass]) => (
              <article className="dashboard-card" key={label}>
                <strong className={colorClass}>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>

          <div className="popup-label">Expertise Depth</div>
          {depthMetrics.map(([label, value, color]) => (
            <div className="skillbar-wrap" key={label}>
              <div className="skillbar-top">
                <span>{label}</span>
                <strong style={{ color }}>{value}%</strong>
              </div>
              <div className="skillbar-bg">
                <div
                  className="skillbar-fill"
                  style={{
                    width: `${value}%`,
                    background: `linear-gradient(90deg, ${color}, ${color}88)`,
                  }}
                />
              </div>
            </div>
          ))}

          <div className="popup-divider" />
          <div className="popup-label">Domain Focus</div>
          <div className="popup-tags">
            {domainHighlights.map((domain) => (
              <span className="popup-tag" key={domain}>
                {domain}
              </span>
            ))}
          </div>

          <article className="popup-row">
            <span className="popup-dot" />
            <p>
              Current focus: leading full stack developer for Litium-based eCommerce
              platforms, modern APIs, and cloud-backed systems at Bridge Global.
            </p>
          </article>
        </div>
      );
    }

    if (activePanel === "tasks") {
      return (
        <div className="popup-section-stack">
          {portfolio.experiences.map((experience) => (
            <section className="popup-block" key={experience.company}>
              <div className="popup-label popup-label-colored">
                {experience.company} | {experience.period}
              </div>
              <p className="popup-mini-meta">
                {experience.role} | {experience.location}
              </p>
              <article className="popup-row">
                <span className="popup-dot popup-dot-soft" />
                <p>
                  {experience.company === "Bridge Global"
                    ? "Leading scalable product delivery across eCommerce markets with architecture and API ownership."
                    : experience.company === "Weboffice Infotech"
                      ? "Built secure enterprise applications with backend depth and performance tuning focus."
                      : "Built the early engineering foundation through ASP.NET web application delivery."}
                </p>
              </article>
              {experience.points.map((point) => (
                <article className="popup-row" key={point}>
                  <span className="popup-dot" />
                  <p>{point}</p>
                </article>
              ))}
              <div className="popup-tags">
                {(experienceTags[experience.company] ?? []).map((tag) => (
                  <span className="popup-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      );
    }

    if (activePanel === "music") {
      return (
        <div className="popup-section-stack">
          {skillMatrix.map((group) => (
            <section className="popup-block" key={group.category}>
              <div className="popup-label popup-label-colored" style={{ color: group.accent }}>
                {group.category}
              </div>
              <p className="popup-text">
                {group.category === "Backend"
                  ? "Strongest in .NET service development, API design, and maintainable domain-focused backend systems."
                  : group.category === "Frontend"
                    ? "Comfortable shipping polished React and Next.js experiences with modern TypeScript workflows."
                    : group.category === "Cloud and DevOps"
                      ? "Hands-on with cloud integrations, delivery pipelines, and the operational side of production systems."
                      : "Uses pragmatic patterns that keep systems scalable, secure, and easier for teams to evolve."}
              </p>
              {group.items.map(([label, value]) => (
                <div className="skillbar-wrap" key={label}>
                  <div className="skillbar-top">
                    <span>{label}</span>
                    <strong style={{ color: group.accent }}>{value}%</strong>
                  </div>
                  <div className="skillbar-bg">
                    <div
                      className="skillbar-fill"
                      style={{
                        width: `${value}%`,
                        background: `linear-gradient(90deg, ${group.accent}, ${group.accent}88)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
      );
    }

    if (activePanel === "msgs") {
      return (
        <div className="popup-section-stack">
          {portfolio.projects.map((project) => (
            <section className="popup-block" key={project.title}>
              <div className="project-head">
                <div className="project-emoji">{project.number}</div>
                <div>
                  <h3>{project.title}</h3>
                  <p>
                    {project.duration} | {project.team}
                  </p>
                </div>
              </div>
              <p className="popup-text">{project.description}</p>
              <article className="popup-row">
                <span className="popup-dot" />
                <p>{project.impact}</p>
              </article>
              {(projectBullets[project.title] ?? []).map((point) => (
                <article className="popup-row" key={point}>
                  <span className="popup-dot popup-dot-soft" />
                  <p>{point}</p>
                </article>
              ))}
              <div className="popup-tags">
                {project.stack.map((tag) => (
                  <span className="popup-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      );
    }

    if (activePanel === "reco") {
      return (
        <div className="popup-section-stack">
          <p className="popup-intro">
            Lead Full Stack .NET Developer with <strong>9+ years</strong> of experience
            across <strong>eCommerce, insurance, and enterprise domains</strong>. Strong in
            C#, .NET Core, React, Next.js, Azure, AWS, and scalable API-first systems.
          </p>

          <div className="popup-divider" />
          <div className="popup-label">Education</div>
          {portfolio.person.education.map((item) => (
            <article className="popup-row popup-row-education" key={item}>
              <span className="popup-badge">EDU</span>
              <p>{item}</p>
            </article>
          ))}

          <div className="popup-divider" />
          <div className="popup-label">References</div>
          {portfolio.references.map((reference) => (
            <article className="popup-row popup-row-reference" key={reference.name}>
              <span className="reference-avatar">
                {reference.name
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")}
              </span>
              <div className="reference-copy">
                <strong>{reference.name}</strong>
                <p>{reference.role}</p>
                <span>{reference.contact}</span>
              </div>
            </article>
          ))}
        </div>
      );
    }

    return (
      <div className="popup-section-stack">
        <div className="popup-label">Contact</div>
        <article className="popup-row">
          <span className="popup-dot" />
          <p>
            Based in Kochi, Kerala and open to senior engineering, lead developer,
            and remote full stack opportunities.
          </p>
        </article>
        {portfolio.contacts.map((contact) => (
          <a
            className="popup-row popup-row-link"
            href={contact.href}
            key={contact.label}
            rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
            target={contact.href.startsWith("http") ? "_blank" : undefined}
          >
            <span className="popup-badge">{contact.label.slice(0, 3).toUpperCase()}</span>
            <div className="reference-copy">
              <strong>{contact.label}</strong>
              <span>{contact.value}</span>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <main className="hub-page">
      <div className="scene-bg" />
      <div className="scene-grid" />
      <div className="so so1" />
      <div className="so so2" />

      <header className="hub-nav">
        <div className="nav-in">
          <button className="nlogo button-reset" onClick={() => setActivePanel("reco")} type="button">
            {portfolio.person.initials}
          </button>
          <nav aria-label="Primary">
            <ul className="nlinks">
              {portfolio.nav.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("/") ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <button
                      className="button-reset"
                      onClick={() => setActivePanel(navPanelMap[item.label])}
                      type="button"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <button className="nhire button-reset" onClick={() => setActivePanel("wthr")} type="button">
            Hire Me
          </button>
        </div>
      </header>

      <section className="scene-outer">
        <div className="hero-copy-band">
          <h1>{portfolio.person.name}</h1>
          <p>{portfolio.person.shortBio}</p>
        </div>

        <div id="hub">
          <div className="floor" />

          <svg id="wires" preserveAspectRatio="none" viewBox="0 0 1100 700">
            <defs>
              <linearGradient id="wg1" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#4f94ff" stopOpacity=".9" />
                <stop offset="100%" stopColor="#9060ff" stopOpacity=".9" />
              </linearGradient>
              <linearGradient id="wg2" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#9060ff" stopOpacity=".9" />
                <stop offset="100%" stopColor="#00c8dc" stopOpacity=".9" />
              </linearGradient>
              <linearGradient id="wg3" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#00c8dc" stopOpacity=".9" />
                <stop offset="100%" stopColor="#f070b0" stopOpacity=".9" />
              </linearGradient>
            </defs>
            <path className="wire wire-b" d="M308,168 C370,168 420,240 490,300 C530,330 540,340 550,360" />
            <path className="wire wire-p" d="M792,156 C730,156 680,240 620,300 C580,330 565,342 550,360" />
            <path className="wire wire-c" d="M285,495 C340,475 400,420 480,380 C510,365 530,360 550,360" />
            <path className="wire wire-b" d="M818,460 C760,445 700,415 630,385 C596,370 568,362 550,360" />
            <path className="wire wire-c" d="M812,344 C750,340 696,364 636,344 C602,316 478,304 550,360" />
            <path className="wire wire-p" d="M430,527 C460,490 500,430 540,390 C543,387 547,384 550,360" />
            <path className="wire wire-c" d="M650,528 C635,490 600,435 570,395 C563,386 556,375 550,360" />
            <path className="wire wire-b" d="M550,92 L550,270" opacity=".3" />
            <circle className="wdot" cx="420" cy="234" fill="#4f94ff" r="4" />
            <circle className="wdot" cx="672" cy="228" fill="#9060ff" r="4" />
            <circle className="wdot" cx="392" cy="430" fill="#00c8dc" r="4" />
            <circle className="wdot" cx="706" cy="420" fill="#4f94ff" r="4" />
            <circle className="wdot" cx="480" cy="460" fill="#9060ff" r="4" />
            <circle className="wdot" cx="610" cy="455" fill="#00c8dc" r="4" />
            <circle className="wdot" cx="752" cy="347" fill="#9060ff" r="4" />

          </svg>

          <div className="jnode jnode-chat" style={{ left: 396, top: 220 }}>
            INFO
          </div>
          <div className="jnode jnode-gear" style={{ left: 644, top: 214 }}>
            WORK
          </div>
          <div className="jnode jnode-profile" style={{ left: 366, top: 398 }}>
            TECH
          </div>
          <div className="jnode jnode-star" style={{ left: 670, top: 392 }}>
            STACK
          </div>

          <div className="ai-stack">
            <div className="plat plat3" />
            <div className="plat plat2" />
            <div className="plat plat1" />
            <div className="ai-sphere">
              <span className="ai-sphere-text">AI</span>
            </div>
          </div>

          <button
            className="fcard fc-b button-reset"
            id="fc-search"
            onClick={() => setActivePanel("search")}
            type="button"
          >
            <div className="search-row">
              <span className="si">?</span>
              <span className="st">Ask anything about Akhil...</span>
              <span className="sm">GO</span>
            </div>
          </button>

          <button
            className="fcard fc-b button-reset"
            id="fc-dash"
            onClick={() => setActivePanel("dash")}
            type="button"
          >
            <div className="cp">
              <div className="ch">
                <span className="ct">Dashboard</span>
                <span className="cbadge">This Week</span>
              </div>
              <div className="bars">
                {[32, 48, 28, 55, 38, 44, 56].map((height, index) => (
                  <div className={`bar bar-${index + 1}`} key={height} style={{ height }} />
                ))}
              </div>
              <div className="srow">
                <div>
                  <div className="sn">9+</div>
                  <div className="sl">Years</div>
                  <div className="sup">Lead developer</div>
                </div>
                <div>
                  <div className="sn">3</div>
                  <div className="sl">Domains</div>
                  <div className="sup">eCommerce, insurance</div>
                </div>
                <div>
                  <div className="sn">10+</div>
                  <div className="sl">Projects</div>
                  <div className="sdn">Production scale</div>
                </div>
              </div>
            </div>
          </button>

          <button
            className="fcard fc-p button-reset"
            id="fc-tasks"
            onClick={() => setActivePanel("tasks")}
            type="button"
          >
            <div className="cp">
              <div className="ch">
                <span className="ct">Experience</span>
                <span className="card-ghost">...</span>
              </div>
              {experiencePreview.map((experience, index) => (
                <div className="ti ti-rich" key={experience.company}>
                  <div className={`tck ${index === 0 ? "ck-b" : index === 1 ? "ck-p" : "ck-e"}`}>
                    {index < 2 ? "+" : ""}
                  </div>
                  <div className="ti-copy">
                    <span className="tt">{experience.company}</span>
                    <span className="tt-sub">
                      {experience.role} | {experience.period}
                    </span>
                  </div>
                  <span className="ti-status">{experience.status}</span>
                </div>
              ))}
            </div>
          </button>

          <button
            className="fcard fc-c button-reset"
            id="fc-music"
            onClick={() => setActivePanel("music")}
            type="button"
          >
            <div className="cp cp-skill-card">
              <div className="ch">
                <span className="ct">Skill Stack</span>
                <span className="card-heart">+</span>
              </div>
              <div className="skill-hero-row">
                <div className="mart mart-skill">FS</div>
                <div className="skill-hero-copy">
                  <div className="mn">Full Stack Developer</div>
                  <div className="ma">.NET Core, React, Next.js, Azure</div>
                </div>
                <div className="skill-score">
                  <strong>15+</strong>
                  <span>tools</span>
                </div>
              </div>
              <div className="skill-lanes">
                <div className="skill-lane">
                  <span>Backend</span>
                  <strong>96%</strong>
                </div>
                <div className="skill-lane">
                  <span>Frontend</span>
                  <strong>91%</strong>
                </div>
                <div className="skill-lane">
                  <span>Cloud</span>
                  <strong>85%</strong>
                </div>
              </div>
              <div className="pw skill-progress">
                <div className="pf skill-pf" />
              </div>
              <div className="skill-chip-row">
                <span className="skill-mini-chip active">API</span>
                <span className="skill-mini-chip">UI</span>
                <span className="skill-mini-chip active">Cloud</span>
                <span className="skill-mini-chip">Data</span>
                <span className="skill-mini-chip">Arch</span>
              </div>
            </div>
          </button>

          <button
            className="fcard fc-k button-reset"
            id="fc-msgs"
            onClick={() => setActivePanel("msgs")}
            type="button"
          >
            <div className="cp">
              <div className="ch">
                <span className="ct">Projects</span>
                <span className="cbadge cbadge-pink">3 featured</span>
              </div>
              {portfolio.projects.map((project) => (
                <div className="mi" key={project.title}>
                  <div className="mav">{project.number}</div>
                  <div className="mi-copy">
                    <div className="mn2">{project.title}</div>
                    <div className="mp">{project.stack[0]}</div>
                  </div>
                  <div className="mtm">{project.duration}</div>
                </div>
              ))}
              <div className="view-all">View all</div>
            </div>
          </button>

          <button
            className="fcard fc-p button-reset"
            id="fc-reco"
            onClick={() => setActivePanel("reco")}
            type="button"
          >
            <div className="cp cp-about-card">
              <div className="ch">
                <span className="ct">About</span>
                <span className="card-arrow">{">"}</span>
              </div>
              <div className="about-topline">
                <span className="about-badge">Lead</span>
                <span className="about-badge about-badge-soft">Available</span>
              </div>
              <div className="mn about-title">{portfolio.person.currentRole}</div>
              <div className="ma about-meta">Bridge Global | 9+ years | MCA</div>
              <p className="about-summary">
                Scalable product engineering across eCommerce, insurance, and enterprise systems.
              </p>
              
            </div>
          </button>

          <button
            className="fcard fc-c button-reset"
            id="fc-wthr"
            onClick={() => setActivePanel("wthr")}
            type="button"
          >
            <div className="cp">
              <div className="wrow">
                <span className="wic">IN</span>
                <div>
                  <div className="wt">Kochi</div>
                  <div className="wd">Open to remote and senior lead roles</div>
                </div>
              </div>
            </div>
          </button>

          <Link className="fcard fc-blog" href="/blog" id="fc-blog">
            <div className="cp cp-blog-card">
              <div className="blog-mini-logo" aria-hidden="true">
                <span>B</span>
              </div>
              <div className="blog-mini-copy">
                <strong>Blogs</strong>
                <p>Sharing insights</p>
              </div>
            </div>
          </Link>
        </div>

        <p className="hint-txt">Click any card to explore | Press ESC to close</p>

        <div className="nav-dots">
          {panelOrder.map((panel) => (
            <button
              className={`ndot ${activePanel === panel ? "active" : ""}`}
              key={panel}
              onClick={() => setActivePanel(panel)}
              type="button"
            />
          ))}
        </div>
      </section>

      <div
        className={`overlay ${activePanel ? "open" : ""}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setActivePanel(null);
          }
        }}
      >
        <div className="popup">
          <button className="pclose button-reset" onClick={() => setActivePanel(null)} type="button">
            x
          </button>
          {activePanel ? (
            <>
              <span className="p-icon">{panelMeta[activePanel].icon}</span>
              <div className="p-title">{panelMeta[activePanel].title}</div>
              <div className="p-sub">{panelMeta[activePanel].subtitle}</div>
              <div className="popup-divider" />
              {renderPopupBody()}
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
