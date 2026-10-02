"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BarChart3, Database, Download, ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { getProjectFileCount, portfolioProjects } from "@/data/portfolio";

const categories = ["All work", ...new Set(portfolioProjects.map((project) => project.category))];

export function PortfolioHome() {
  const [activeCategory, setActiveCategory] = useState("All work");
  const [search, setSearch] = useState("");

  const visibleProjects = useMemo(() => {
    const term = search.trim().toLowerCase();
    return portfolioProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "All work" || project.category === activeCategory;
      const searchable = [
        project.title,
        project.category,
        project.summary,
        ...project.tools,
      ]
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!term || searchable.includes(term));
    });
  }, [activeCategory, search]);

  const featuredProject = portfolioProjects.find(
    (project) => project.slug === "financial-performance",
  );
  const totalFiles = getProjectFileCount();

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Wessel Tangai home">
          <span className="wordmark-mark">WT</span>
          <span>WESSEL TANGAI</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#projects">Projects</a>
          <a href="#approach">Approach</a>
          <a
            className="nav-github"
            href="https://github.com/chrisWessel/BI-Portfolio"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ExternalLink size={14} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow"><span className="status-dot" /> BUSINESS INTELLIGENCE · DATA STORYTELLING</span>
            <h1>Make data<br />make sense<span className="hero-period">.</span></h1>
            <p className="hero-lede">
              I turn messy data into clear, decision-ready stories — through
              thoughtful modelling, useful analysis and dashboards people
              actually want to explore.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a
                className="button button-quiet"
                href="https://github.com/chrisWessel"
                target="_blank"
                rel="noreferrer"
              >
                GitHub profile <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-metrics" aria-label="Portfolio overview">
              <div><strong>{portfolioProjects.length.toString().padStart(2, "0")}</strong><span>case studies</span></div>
              <div><strong>{totalFiles.toString().padStart(2, "0")}</strong><span>downloadable files</span></div>
              <div><strong>{String(categories.length - 1).padStart(2, "0")}</strong><span>industries explored</span></div>
            </div>
          </div>

          <div className="hero-art" aria-label="Financial dashboard preview">
            <div className="hero-art-top">
              <span><span className="status-dot" /> LIVE PREVIEW</span>
              <span>01 / FINANCE</span>
            </div>
            {featuredProject?.preview && (
              <div className="hero-image-frame">
                <Image
                  src={featuredProject.preview}
                  alt="Financial dashboard with budget, revenue and expense analysis"
                  width={1330}
                  height={747}
                  priority
                  sizes="(max-width: 900px) 100vw, 52vw"
                />
              </div>
            )}
            <div className="hero-art-bottom">
              <span><BarChart3 size={16} aria-hidden="true" /> Interactive reporting</span>
              <span>Power BI · Excel · SQL</span>
            </div>
          </div>

          <span className="hero-index" aria-hidden="true">01 — {String(portfolioProjects.length).padStart(2, "0")}</span>
        </section>

        <section className="tool-strip" aria-label="Core tools">
          <span>BUILT WITH</span>
          <strong>Power BI</strong><i />
          <strong>Excel</strong><i />
          <strong>SQL</strong><i />
          <strong>Power Query</strong><i />
          <strong>Data modelling</strong>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SELECTED WORK · 2024—2026</span>
              <h2>From raw data<br />to <em>real insight.</em></h2>
            </div>
            <p>
              Explore dashboards, the questions behind them, and the files
              used to build them. Download Power BI and Excel projects to
              explore the interactive versions.
            </p>
          </div>

          <div className="project-toolbar">
            <div className="filter-list" role="group" aria-label="Filter projects by industry">
              {categories.map((category) => (
                <button
                  className={`filter-button${activeCategory === category ? " is-active" : ""}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
            <label className="search-box">
              <Search size={16} aria-hidden="true" />
              <span className="visually-hidden">Search projects or tools</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects or tools"
              />
            </label>
          </div>

          {visibleProjects.length > 0 ? (
            <div className="project-grid">
              {visibleProjects.map((project, index) => (
                <article className={`project-card${index === 0 ? " project-card-featured" : ""}`} key={project.slug}>
                  <Link
                    className={`project-image${project.preview ? "" : " project-image-placeholder"}`}
                    href={`/projects/${project.slug}`}
                    aria-label={`View ${project.title} project`}
                  >
                    {project.preview ? (
                      <Image
                        src={project.preview}
                        alt={`${project.title} dashboard preview`}
                        width={1280}
                        height={720}
                        sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                      />
                    ) : (
                      <span className="placeholder-mark" aria-hidden="true">
                        <BarChart3 size={42} strokeWidth={1.25} />
                      </span>
                    )}
                    <span className="image-index">{String(index + 1).padStart(2, "0")}</span>
                    {project.files.length > 0 && (
                      <span className="image-download"><Download size={15} aria-hidden="true" /> {project.files.length} files</span>
                    )}
                  </Link>
                  <div className="project-card-copy">
                    <div className="project-meta"><span>{project.category}</span><span>{project.tools[0]}</span></div>
                    <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
                    <p>{project.summary}</p>
                    <div className="project-card-bottom">
                      <div className="tag-row">
                        {project.tools.slice(0, 3).map((tool) => <span className="tool-tag" key={tool}>{tool}</span>)}
                      </div>
                      <Link className="card-arrow" href={`/projects/${project.slug}`} aria-label={`Open ${project.title}`}>
                        <ArrowRight size={18} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Database size={26} aria-hidden="true" />
              <h3>No matching projects</h3>
              <p>Try another search or reset the industry filter.</p>
              <button className="button button-primary" onClick={() => { setSearch(""); setActiveCategory("All work"); }} type="button">Show all projects</button>
            </div>
          )}
        </section>

        <section className="craft-section" aria-labelledby="craft-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SQL · DATA MODELLING</span>
              <h2 id="craft-title">Built to answer<br /><em>better questions.</em></h2>
            </div>
            <p>
              A clear result depends on what happens before the chart: reliable
              transformations, focused SQL and a model that makes analysis easy.
            </p>
          </div>
          <div className="craft-grid">
            <Link className="craft-card" href="/projects/hospital-operations">
              <div className="craft-image">
                <Image
                  src="/projects/hospital-operations/sql/hospital-operations-query.svg"
                  alt="SQL code preview of a hospital operations aggregation query"
                  width={1600}
                  height={900}
                  sizes="(max-width: 800px) 100vw, 50vw"
                />
              </div>
              <div><span className="eyebrow">01 · SQL</span><h3>From raw visits to useful measures</h3><span className="craft-link">Explore the project <ArrowRight size={15} aria-hidden="true" /></span></div>
            </Link>
            <Link className="craft-card" href="/projects/hospital-operations">
              <div className="craft-image">
                <Image
                  src="/projects/hospital-operations/star-schema.svg"
                  alt="Illustrative hospital operations star schema with a central visit fact table and eight dimensions"
                  width={1600}
                  height={900}
                  sizes="(max-width: 800px) 100vw, 50vw"
                />
              </div>
              <div><span className="eyebrow">02 · DATA MODELLING</span><h3>A star schema built for exploration</h3><span className="craft-link">Explore the project <ArrowRight size={15} aria-hidden="true" /></span></div>
            </Link>
          </div>
        </section>

        <section className="approach-section" id="approach">
          <div className="approach-title">
            <span className="eyebrow">THE THINKING BEHIND THE CHARTS</span>
            <h2>Good analysis<br />starts <em>before</em><br />the dashboard.</h2>
          </div>
          <div className="approach-steps">
            <article><span>01</span><div><h3>Frame the question</h3><p>Start with the decision to support. Define measures that answer something useful, not just something easy to chart.</p></div></article>
            <article><span>02</span><div><h3>Shape and model</h3><p>Clean, transform and relate data with Power Query, SQL and a model designed around the questions.</p></div></article>
            <article><span>03</span><div><h3>Make the signal clear</h3><p>Design visual hierarchy, useful context and intuitive filters so the important insight stands out.</p></div></article>
            <article><span>04</span><div><h3>Validate the story</h3><p>Reconcile totals, test the filters and make assumptions visible before sharing the result.</p></div></article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#top"><span className="wordmark-mark">WT</span><span>WESSEL TANGAI</span></a>
        <p>Curious about the data. Serious about the details.</p>
        <a href="https://github.com/chrisWessel/BI-Portfolio" target="_blank" rel="noreferrer">Portfolio repository <ExternalLink size={14} aria-hidden="true" /></a>
        <span>© {new Date().getFullYear()} Wessel Tangai</span>
      </footer>
    </>
  );
}
