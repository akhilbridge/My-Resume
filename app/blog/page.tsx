import Image from "next/image";
import Link from "next/link";

import { blogArticles } from "@/data/blog";

const featuredArticle = blogArticles[0];

export default function BlogIndexPage() {
  return (
    <main className="blog-shell">
      <div className="scene-bg" />
      <div className="scene-grid" />
      <div className="so so1" />
      <div className="so so2" />

      <div className="blog-page">
        <header className="blog-topbar">
          <Link className="blog-backlink" href="/">
            Back to portfolio
          </Link>
          <span className="blog-topbar-label">Writing</span>
        </header>

        <section className="blog-hero">
          <div className="blog-hero-copy">
            <p className="blog-kicker">Insights from delivery</p>
            <h1>Engineering notes on AI, architecture, and enterprise product work.</h1>
            <p className="blog-hero-text">
              Practical writing from real-world .NET, React, cloud, and systems experience.
              The focus stays on scalable delivery, not trend-chasing.
            </p>
          </div>
          <div className="blog-hero-stats">
            <article>
              <strong>01</strong>
              <span>Published article</span>
            </article>
            <article>
              <strong>AI</strong>
              <span>Current topic focus</span>
            </article>
            <article>
              <strong>.NET</strong>
              <span>Primary engineering lens</span>
            </article>
          </div>
        </section>

        <section className="blog-featured-card">
          <div className="blog-featured-image">
            <Image
              alt={featuredArticle.heroAlt}
              height={900}
              priority
              src={featuredArticle.heroImage}
              width={1600}
            />
          </div>
          <div className="blog-featured-copy">
            <div className="blog-meta-row">
              <span>{featuredArticle.category}</span>
              <span>{featuredArticle.publishedAt}</span>
              <span>{featuredArticle.readingTime}</span>
            </div>
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.summary}</p>
            <div className="blog-chip-row">
              {featuredArticle.tags.slice(0, 4).map((tag) => (
                <span className="blog-chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <Link className="blog-primary-link" href={`/blog/${featuredArticle.slug}`}>
              Read the full article
            </Link>
          </div>
        </section>

        <section className="blog-grid">
          <article className="blog-surface-card">
            <p className="blog-surface-label">Covered inside</p>
            <ul className="blog-list">
              {featuredArticle.majorChanges.slice(0, 4).map((item) => (
                <li key={item.title}>{item.title}</li>
              ))}
            </ul>
          </article>
          <article className="blog-surface-card">
            <p className="blog-surface-label">Architecture themes</p>
            <ul className="blog-list">
              {featuredArticle.futureStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="blog-surface-card">
            <p className="blog-surface-label">Why it matters</p>
            <p className="blog-surface-copy">
              The article focuses on how ASP.NET Core is becoming the orchestration layer for
              secure APIs, AI services, event-driven systems, and semantic enterprise tooling.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
