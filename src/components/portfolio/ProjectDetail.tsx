import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, FileArchive, FileSpreadsheet, FileText, Image as ImageIcon, LockKeyhole } from "lucide-react";
import type { PortfolioProject } from "@/data/portfolio";

function FileIcon({ format }: { format: string }) {
  if (format === "XLSX" || format === "XLSM" || format === "XLSB" || format === "CSV") {
    return <FileSpreadsheet size={18} aria-hidden="true" />;
  }
  if (format === "PNG" || format === "SVG") return <ImageIcon size={18} aria-hidden="true" />;
  if (format === "ZIP") return <FileArchive size={18} aria-hidden="true" />;
  return <FileText size={18} aria-hidden="true" />;
}

export function ProjectDetail({ project }: { project: PortfolioProject }) {
  const dashboardFiles = project.files.filter((file) => file.group === "Dashboard");
  const otherFiles = project.files.filter((file) => file.group !== "Dashboard");
  const hasPowerBiFile = project.files.some((file) => file.format === "PBIX");
  const hasExcelFile = project.files.some((file) =>
    ["XLSX", "XLSM", "XLSB"].includes(file.format),
  );
  const availableApps = [
    hasPowerBiFile && "Power BI Desktop",
    hasExcelFile && "Microsoft Excel",
  ].filter(Boolean).join(" or ");

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="/">
          <span className="wordmark-mark">WT</span>
          <span>WESSEL TANGAI</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/#projects">Projects</Link>
          <Link href="/#approach">Approach</Link>
          <a href="https://github.com/chrisWessel/BI-Portfolio" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main className="project-detail">
        <Link className="back-link" href="/#projects"><ArrowLeft size={16} aria-hidden="true" /> Back to all projects</Link>

        <section className="detail-hero">
          <div className="detail-copy">
            <span className="eyebrow">{project.category.toUpperCase()} · PROJECT FILES</span>
            <h1>{project.title}<span className="hero-period">.</span></h1>
            <p className="detail-summary">{project.description}</p>
            <div className="detail-tools">{project.tools.map((tool) => <span className="tool-tag" key={tool}>{tool}</span>)}</div>
          </div>
          {project.preview ? (
            <div className="detail-preview">
              <Image src={project.preview} alt={`${project.title} dashboard preview`} width={1280} height={720} priority sizes="(max-width: 800px) 100vw, 50vw" />
              <span>PROJECT PREVIEW</span>
            </div>
          ) : (
            <div className="detail-placeholder"><FileSpreadsheet size={46} strokeWidth={1.2} aria-hidden="true" /><span>ANALYTICS PROJECT</span></div>
          )}
        </section>

        {project.showcases && project.showcases.length > 0 && (
          <section className="project-showcases" aria-label="SQL and data modelling examples">
            <div className="showcase-heading">
              <span className="eyebrow">UNDER THE HOOD</span>
              <h2>How the analysis is built.</h2>
            </div>
            <div className="showcase-grid">
              {project.showcases.map((showcase) => (
                <article className="showcase-card" key={showcase.image}>
                  <div className="showcase-image">
                    <Image
                      src={showcase.image}
                      alt={showcase.alt}
                      width={1600}
                      height={900}
                      sizes="(max-width: 800px) 100vw, 50vw"
                    />
                  </div>
                  <div className="showcase-copy">
                    <h3>{showcase.title}</h3>
                    <p>{showcase.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="detail-columns">
          <section className="detail-content">
            <span className="eyebrow">THE PROJECT</span>
            <h2>Questions worth<br />answering.</h2>
            <ul className="highlight-list">
              {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
            {project.notice && (
              <aside className="project-notice">
                <LockKeyhole size={17} aria-hidden="true" />
                <p>{project.notice}</p>
              </aside>
            )}
            {availableApps && (
              <div className="open-in-app">
                <strong>Want to explore the interactive report?</strong>
                <p>Download the available report or workbook and open it in {availableApps}.</p>
              </div>
            )}
          </section>

          <aside className="downloads-panel">
            <div className="download-heading">
              <div><span className="eyebrow">TAKE A CLOSER LOOK</span><h2>Project files</h2></div>
              <span className="download-count">{project.files.length.toString().padStart(2, "0")}</span>
            </div>
            {project.files.length === 0 ? (
              <p className="no-files">Project files will be added when a cleared public version is available.</p>
            ) : (
              <>
                {dashboardFiles.length > 0 && <FileGroup title="Dashboards" files={dashboardFiles} />}
                {otherFiles.length > 0 && <FileGroup title="Data & supporting files" files={otherFiles} />}
              </>
            )}
            <p className="download-footnote">Downloads are provided for portfolio review. Large workbooks may take a moment to download.</p>
          </aside>
        </div>
      </main>

      <footer className="site-footer">
        <Link className="wordmark" href="/"><span className="wordmark-mark">WT</span><span>WESSEL TANGAI</span></Link>
        <p>Curious about the data. Serious about the details.</p>
        <Link href="/#projects">All projects <ArrowUpRight size={14} aria-hidden="true" /></Link>
        <span>© {new Date().getFullYear()} Wessel Tangai</span>
      </footer>
    </>
  );
}

function FileGroup({
  title,
  files,
}: {
  title: string;
  files: PortfolioProject["files"];
}) {
  return (
    <div className="file-group">
      <h3>{title}</h3>
      <ul>
        {files.map((file) => (
          <li key={file.path}>
            <span className={`file-kind${file.format === "PNG" ? " file-kind-preview" : ""}`}>
              {file.format === "PNG" ? (
                <Image src={file.path} alt="" width={52} height={52} />
              ) : (
                <FileIcon format={file.format} />
              )}
            </span>
            <span className="file-label"><strong>{file.label}</strong><small>{file.format} · {file.group}</small></span>
            <a href={file.path} download aria-label={`Download ${file.label} (${file.format})`}>
              <Download size={17} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
