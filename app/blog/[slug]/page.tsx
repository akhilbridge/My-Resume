import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { blogArticles, getBlogArticle } from "@/data/blog";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="blog-shell">
      <div className="scene-bg" />
      <div className="scene-grid" />
      <div className="so so1" />
      <div className="so so2" />

      <article className="blog-article-page">
        <header className="blog-topbar">
          <Link className="blog-backlink" href="/blog">
            Back to blog
          </Link>
          <Link className="blog-topbar-label" href="/">
            Portfolio
          </Link>
        </header>

        <section className="blog-article-hero">
          <div className="blog-meta-row">
            <span>{article.category}</span>
            <span>{article.publishedAt}</span>
            <span>{article.readingTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p className="blog-article-summary">{article.summary}</p>
          <div className="blog-chip-row">
            {article.tags.map((tag) => (
              <span className="blog-chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="blog-image-frame blog-image-frame-hero">
            <Image alt={article.heroAlt} height={900} priority src={article.heroImage} width={1600} />
          </div>
        </section>

        <section className="blog-content-grid">
          <div className="blog-main-column">
            <div className="blog-prose">
              {article.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <section className="blog-section">
              <div className="blog-section-heading">
                <p className="blog-section-kicker">Context</p>
                <h2>The Evolution of ASP.NET Core Development</h2>
              </div>
              <p className="blog-section-lead">
                ASP.NET Core is already one of the strongest frameworks for modern product
                delivery. AI extends that foundation instead of replacing it.
              </p>
              <div className="blog-two-column">
                <article className="blog-surface-card">
                  <p className="blog-surface-label">What teams already build</p>
                  <ul className="blog-list">
                    {article.evolutionAreas.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article className="blog-surface-card">
                  <p className="blog-surface-label">The stack shaping 2026</p>
                  <ul className="blog-list">
                    {article.futureStack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            <section className="blog-section">
              <div className="blog-section-heading">
                <p className="blog-section-kicker">Fit</p>
                <h2>Why AI Fits Perfectly with ASP.NET Core</h2>
              </div>
              <div className="blog-feature-grid">
                {article.aiFit.map((item) => (
                  <article className="blog-feature-card" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="blog-section">
              <div className="blog-section-heading">
                <p className="blog-section-kicker">Transformation</p>
                <h2>Major Ways AI is Changing ASP.NET Core Development</h2>
              </div>
              <div className="blog-change-stack">
                {article.majorChanges.map((item) => (
                  <article className="blog-change-card" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.points?.length ? (
                      <ul className="blog-list">
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="blog-section">
              <div className="blog-image-frame">
                <Image
                  alt={article.inlineImages.enterprise.alt}
                  height={900}
                  src={article.inlineImages.enterprise.src}
                  width={1400}
                />
              </div>
              <p className="blog-image-caption">{article.inlineImages.enterprise.caption}</p>
              <div className="blog-two-column">
                <article className="blog-surface-card">
                  <p className="blog-surface-label">Enterprise AI use cases</p>
                  <ul className="blog-list">
                    {article.enterpriseUseCases.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article className="blog-surface-card">
                  <p className="blog-surface-label">Intelligent document processing</p>
                  <ul className="blog-list">
                    {article.documentProcessingItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            <section className="blog-section">
              <div className="blog-section-heading">
                <p className="blog-section-kicker">Architecture</p>
                <h2>Modern AI Architecture with ASP.NET Core</h2>
              </div>
              <div className="blog-image-frame">
                <Image
                  alt={article.inlineImages.architecture.alt}
                  height={900}
                  src={article.inlineImages.architecture.src}
                  width={1400}
                />
              </div>
              <p className="blog-image-caption">{article.inlineImages.architecture.caption}</p>
              <div className="blog-flow-stack">
                {article.architectureFlow.map((item) => (
                  <div className="blog-flow-step" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="blog-section">
              <div className="blog-section-heading">
                <p className="blog-section-kicker">Code</p>
                <h2>Example: Calling OpenAI from ASP.NET Core</h2>
              </div>
              <pre className="blog-code-block">
                <code>{article.codeExample}</code>
              </pre>
              <p className="blog-section-note">{article.codeCaption}</p>
            </section>

            <section className="blog-section">
              <div className="blog-section-heading">
                <p className="blog-section-kicker">Security</p>
                <h2>Security Challenges in AI Applications</h2>
              </div>
              <ul className="blog-pill-list">
                {article.securityChallenges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="blog-section">
              <div className="blog-section-heading">
                <p className="blog-section-kicker">Next skills</p>
                <h2>What ASP.NET Core Developers Should Learn in 2026</h2>
              </div>
              <div className="blog-feature-grid">
                {article.learningPaths.map((path) => (
                  <article className="blog-feature-card" key={path.title}>
                    <h3>{path.title}</h3>
                    <ul className="blog-list">
                      {path.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="blog-section">
              <div className="blog-section-heading">
                <p className="blog-section-kicker">Outlook</p>
                <h2>The Future of ASP.NET Core Development</h2>
              </div>
              <div className="blog-surface-card">
                <ul className="blog-list">
                  {article.futureSignals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="blog-prose">
                {article.conclusion.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          </div>

          <aside className="blog-side-column">
            <article className="blog-surface-card">
              <p className="blog-surface-label">In this article</p>
              <ul className="blog-list">
                <li>AI-assisted coding</li>
                <li>Smarter enterprise applications</li>
                <li>Chatbots and assistants</li>
                <li>Document intelligence</li>
                <li>Microservices and observability</li>
                <li>Semantic search and RAG</li>
              </ul>
            </article>
            <article className="blog-surface-card">
              <p className="blog-surface-label">AI service modules</p>
              <ul className="blog-list">
                {article.microserviceModules.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="blog-surface-card">
              <p className="blog-surface-label">DevOps impact</p>
              <ul className="blog-list">
                {article.devopsBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="blog-surface-card">
              <p className="blog-surface-label">Semantic search use cases</p>
              <ul className="blog-list">
                {article.semanticSearchUses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </aside>
        </section>
      </article>
    </main>
  );
}
