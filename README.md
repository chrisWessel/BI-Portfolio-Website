# Wessel Tangai — Business Intelligence Portfolio

A portfolio website for showcasing Power BI and Excel dashboards, analytics case studies, SQL examples, and downloadable project files.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The project gallery supports category filters and search; each project page includes its dashboard preview and the available downloadable files.

## Build for production

```bash
npm run lint
npm run build
npm run start
```

## Project files

Dashboard files and source data that are approved for publication are stored under `public/projects/` and linked from the project catalogue in `src/data/portfolio.ts`. Previews are also served from `public/projects/`.

Power BI (`.pbix`) and Excel (`.xlsx`, `.xlsm`, `.xlsb`) files are downloads, not live web embeds. Visitors can open them in Power BI Desktop or Excel. PDF previews and screenshots provide an immediate browser view.

The checked-in portfolio source excludes Fastjet company-finance files. Airline reviewer data and its report are withheld until sanitized equivalents are available, because the report can embed the original names and free-text reviews.

## Deploy on Vercel

Import the GitHub repository into Vercel and deploy it as a Next.js project. No environment variables are required for the portfolio pages.

Before publishing additional files, check that you have permission to share them and that reports, workbooks, and datasets do not expose personal or confidential information.
