export type PortfolioFile = {
  label: string;
  path: string;
  format: string;
  group: "Dashboard" | "Source data" | "SQL" | "Documentation";
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  preview?: string;
  tools: string[];
  highlights: string[];
  files: PortfolioFile[];
  showcases?: {
    title: string;
    description: string;
    image: string;
    alt: string;
  }[];
  notice?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "financial-performance",
    title: "Financial performance",
    category: "Finance",
    summary: "Budget, revenue, profit and expense performance in one interactive view.",
    description:
      "An executive-style financial dashboard designed to compare performance across periods and make department-level budget variances easy to investigate.",
    preview: "/projects/financial-performance/preview.png",
    tools: ["Power BI", "Excel", "Power Query", "Data modelling"],
    highlights: [
      "Compare revenue, gross profit and EBITDA across selectable reporting periods.",
      "Investigate budget variances by department and expense group.",
      "Explore the original report and supporting workbook versions.",
    ],
    files: [
      { label: "Financial dashboard", path: "/projects/financial-performance/financial-dashboard.pbix", format: "PBIX", group: "Dashboard" },
      { label: "Dashboard export", path: "/projects/financial-performance/financial-dashboard.pdf", format: "PDF", group: "Dashboard" },
      { label: "Dashboard data model", path: "/projects/financial-performance/ultimate-dashboard-data-model.xlsx", format: "XLSX", group: "Source data" },
      { label: "Worksheet — Alteryx version", path: "/projects/financial-performance/ultimate-dashboard-worksheet-alteryx.xlsx", format: "XLSX", group: "Source data" },
      { label: "Dashboard worksheet", path: "/projects/financial-performance/ultimate-dashboard-worksheet.xlsx", format: "XLSX", group: "Source data" },
    ],
  },
  {
    slug: "hospital-operations",
    title: "Hospital operations",
    category: "Healthcare",
    summary: "A multi-page operational view of visits, costs and patient experience.",
    description:
      "A hospital-management analytics project that brings visit-level operations into an overview of billing, service mix, clinical costs and patient experience.",
    preview: "/projects/hospital-operations/preview.png",
    tools: ["Power BI", "SQL Server", "Excel", "Data modelling"],
    highlights: [
      "Compare monthly visit counts and billed clinical costs.",
      "Explore cost and service patterns by department, diagnosis and procedure.",
      "Use the included SQL example to prepare and summarize visit data.",
    ],
    files: [
      { label: "Hospital Management dashboard", path: "/projects/hospital-operations/hospital-management-dashboard.pbix", format: "PBIX", group: "Dashboard" },
      { label: "Dashboard report", path: "/projects/hospital-operations/hospital-management-dashboard.pdf", format: "PDF", group: "Dashboard" },
      { label: "Hospital operations SQL", path: "/projects/hospital-operations/sql/hospital-operations.sql", format: "SQL", group: "SQL" },
      { label: "Dashboard requirements", path: "/projects/hospital-operations/dashboard-requirements.pdf", format: "PDF", group: "Documentation" },
      { label: "Cities", path: "/projects/hospital-operations/data/cities.csv", format: "CSV", group: "Source data" },
      { label: "Departments", path: "/projects/hospital-operations/data/departments.csv", format: "CSV", group: "Source data" },
      { label: "Diagnoses", path: "/projects/hospital-operations/data/diagnoses.csv", format: "CSV", group: "Source data" },
      { label: "Insurance", path: "/projects/hospital-operations/data/insurance.csv", format: "CSV", group: "Source data" },
      { label: "Patients", path: "/projects/hospital-operations/data/patients.csv", format: "CSV", group: "Source data" },
      { label: "Procedures", path: "/projects/hospital-operations/data/procedures.csv", format: "CSV", group: "Source data" },
      { label: "Providers", path: "/projects/hospital-operations/data/providers.csv", format: "CSV", group: "Source data" },
      { label: "Visits", path: "/projects/hospital-operations/data/visits.csv", format: "CSV", group: "Source data" },
    ],
    showcases: [
      {
        title: "SQL for operational analysis",
        description: "Clean visit data and summarize service volume, cost and satisfaction with T-SQL.",
        image: "/projects/hospital-operations/sql/hospital-operations-query.svg",
        alt: "SQL code preview showing a hospital operations query grouped by service type",
      },
      {
        title: "A star schema for visit analysis",
        description: "A dimensional model that connects visit measures to date, patient, provider and service dimensions.",
        image: "/projects/hospital-operations/star-schema.svg",
        alt: "Illustrative star schema with a central FactVisit table connected to eight dimensions",
      },
    ],
    notice:
      "The supplied healthcare project records were confirmed as synthetic by the portfolio owner. This dashboard is for analytics demonstration only, not for clinical decision-making.",
  },
  {
    slug: "healthcare-analytics",
    title: "Healthcare analytics",
    category: "Healthcare",
    summary: "Admissions, billing and length-of-stay patterns in a Power BI report.",
    description:
      "An aggregate healthcare dashboard exploring admissions, billing, length of stay, test results and patterns across conditions and demographics.",
    preview: "/projects/healthcare-analytics/preview.png",
    tools: ["Power BI", "Excel", "Power Query", "Data modelling"],
    highlights: [
      "Compare admissions and billing across time and condition categories.",
      "Review length-of-stay and test-result distributions.",
      "Explore the included analysis workbook and supporting lookup files.",
    ],
    files: [
      { label: "Healthcare dashboard", path: "/projects/healthcare-analytics/healthcare-dashboard.pbix", format: "PBIX", group: "Dashboard" },
      { label: "Healthcare dataset (CSV)", path: "/projects/healthcare-analytics/healthcare-dataset.csv", format: "CSV", group: "Source data" },
      { label: "Healthcare dataset copy (CSV)", path: "/projects/healthcare-analytics/healthcare-dataset-copy.csv", format: "CSV", group: "Source data" },
      { label: "Healthcare dataset workbook", path: "/projects/healthcare-analytics/healthcare-dataset.xlsx", format: "XLSX", group: "Source data" },
      { label: "Medical condition lookup", path: "/projects/healthcare-analytics/medical-condition.xlsx", format: "XLSX", group: "Source data" },
      { label: "Medical condition lookup copy", path: "/projects/healthcare-analytics/medical-condition-copy.xlsx", format: "XLSX", group: "Source data" },
      { label: "Medication lookup", path: "/projects/healthcare-analytics/medication.xlsx", format: "XLSX", group: "Source data" },
      { label: "Healthcare utilization SQL", path: "/projects/healthcare-analytics/sql/healthcare-utilization.sql", format: "SQL", group: "SQL" },
    ],
    showcases: [
      {
        title: "SQL for utilization trends",
        description: "Normalize source fields and compare encounter volume, billing and length of stay.",
        image: "/projects/healthcare-analytics/sql/healthcare-utilization-query.svg",
        alt: "SQL code preview showing a healthcare utilization summary by medical condition",
      },
    ],
    notice:
      "The supplied healthcare records were confirmed as synthetic by the portfolio owner. This is a descriptive analytics example, not a diagnostic or clinical decision-support tool.",
  },
  {
    slug: "hotel-revenue",
    title: "Hotel revenue",
    category: "Hospitality",
    summary: "Booking, revenue, cost and profit trends with interactive filters.",
    description:
      "A hotel performance analysis with time, customer and hotel-type filters, comparing visits, revenue, costs, realized bookings and lost revenue.",
    preview: "/projects/hotel-revenue/preview.png",
    tools: ["Power BI", "Excel", "Power Query", "Data modelling"],
    highlights: [
      "Compare hotel visits, revenue, costs and profit with the prior year.",
      "Explore performance by month, market segment and hotel type.",
      "Download the report, analysis workbook and source-data workbooks.",
    ],
    files: [
      { label: "Hotel Analysis Power BI report", path: "/projects/hotel-revenue/hotel-analysis.pbix", format: "PBIX", group: "Dashboard" },
      { label: "Hotel Analysis workbook", path: "/projects/hotel-revenue/hotel-analysis-workbook.xlsx", format: "XLSX", group: "Dashboard" },
      { label: "Dashboard report", path: "/projects/hotel-revenue/hotel-analysis.pdf", format: "PDF", group: "Dashboard" },
      { label: "Hotel revenue historical data", path: "/projects/hotel-revenue/hotel-revenue-history.xlsx", format: "XLSX", group: "Source data" },
      { label: "Analysis steps", path: "/projects/hotel-revenue/hotel-analysis-steps.pdf", format: "PDF", group: "Documentation" },
    ],
  },
  {
    slug: "road-safety",
    title: "Road safety",
    category: "Transport",
    summary: "Casualty severity and accident patterns in an interactive Excel dashboard.",
    description:
      "A road-safety dashboard that brings casualty severity, monthly patterns and road-context breakdowns into an interactive Excel report.",
    preview: "/projects/road-safety/preview.png",
    tools: ["Excel", "Interactive filters", "Data modelling"],
    highlights: [
      "Compare fatal, serious and slight casualties.",
      "Explore monthly patterns by vehicle type, road type, area and light conditions.",
      "Download both the interactive dashboard and its source workbook.",
    ],
    files: [
      { label: "Interactive road accident dashboard", path: "/projects/road-safety/road-accident-dashboard.xlsx", format: "XLSX", group: "Dashboard" },
      { label: "Road accident source data", path: "/projects/road-safety/road-accident-data.xlsx", format: "XLSX", group: "Source data" },
    ],
  },
  {
    slug: "sales-performance",
    title: "Sales performance",
    category: "Sales",
    summary: "Revenue, COGS, profit and margin by product, customer and time.",
    description:
      "An interactive Excel sales dashboard for comparing commercial performance across products, locations, customers, salespeople and time.",
    preview: "/projects/sales-performance/preview.png",
    tools: ["Excel", "Power Query", "Data modelling"],
    highlights: [
      "Explore sales revenue, cost of goods sold, profit and margin.",
      "Compare product, customer, location and salesperson performance.",
      "Open the macro-enabled and binary Excel dashboard variants.",
    ],
    files: [
      { label: "WT sales analysis dashboard", path: "/projects/sales-performance/wt-biscuits-sales-analysis.xlsm", format: "XLSM", group: "Dashboard" },
      { label: "WT sales dashboard", path: "/projects/sales-performance/wt-sales-dashboard.xlsb", format: "XLSB", group: "Dashboard" },
      { label: "Practice dataset", path: "/projects/sales-performance/wt-practice-dataset.xlsx", format: "XLSX", group: "Source data" },
      { label: "Dashboard practice files", path: "/projects/sales-performance/biscuit-sales-dashboard-practice.zip", format: "ZIP", group: "Source data" },
      { label: "Dashboard requirements", path: "/projects/sales-performance/biscuit-dashboard-requirements.pdf", format: "PDF", group: "Documentation" },
    ],
    notice:
      "The XLSM workbook contains macros. Review macros according to your organization's security practices before enabling them in Excel.",
  },
  {
    slug: "stroke-data-exploration",
    title: "Stroke data exploration",
    category: "Healthcare",
    summary: "A descriptive exploration of patterns in synthetic health-related data.",
    description:
      "A Power BI exploration of a supplied stroke-related dataset. The project is presented strictly as descriptive visualization and is not a clinical tool.",
    tools: ["Power BI", "Excel", "Data modelling"],
    highlights: [
      "Explore distributions in the supplied dataset.",
      "Download the report and source workbook.",
      "Use the visuals for data exploration only—not diagnosis or individual risk assessment.",
    ],
    files: [
      { label: "Stroke detection dashboard", path: "/projects/stroke-data-exploration/stroke-detection.pbix", format: "PBIX", group: "Dashboard" },
      { label: "Stroke detection source data", path: "/projects/stroke-data-exploration/stroke-detection-data.xlsx", format: "XLSX", group: "Source data" },
      { label: "Dashboard background — light", path: "/projects/stroke-data-exploration/assets/stroke-background-light.png", format: "PNG", group: "Documentation" },
      { label: "Dashboard background — alternate", path: "/projects/stroke-data-exploration/assets/stroke-background-alternate.png", format: "PNG", group: "Documentation" },
      { label: "Gender icon", path: "/projects/stroke-data-exploration/assets/gender-icon.png", format: "PNG", group: "Documentation" },
      { label: "Insights icon", path: "/projects/stroke-data-exploration/assets/insights-icon.png", format: "PNG", group: "Documentation" },
      { label: "Insights icon — alternate", path: "/projects/stroke-data-exploration/assets/insights-icon-alternate.png", format: "PNG", group: "Documentation" },
      { label: "Home navigation icon", path: "/projects/stroke-data-exploration/assets/home-navigation-icon.png", format: "PNG", group: "Documentation" },
      { label: "Navigation icon — alternate", path: "/projects/stroke-data-exploration/assets/navigation-icon-alternate.png", format: "PNG", group: "Documentation" },
      { label: "Global analysis icon", path: "/projects/stroke-data-exploration/assets/global-analysis-icon.png", format: "PNG", group: "Documentation" },
    ],
    notice:
      "This portfolio project is for descriptive analysis only. It does not provide a diagnosis, individual risk estimate or medical advice.",
  },
  {
    slug: "airline-customer-experience",
    title: "Airline customer experience",
    category: "Travel",
    summary: "Airline ratings and service experience across routes and travel classes.",
    description:
      "A review-analysis project exploring overall ratings, service attributes, travel class, routes and recommendation patterns.",
    tools: ["Power BI", "SQL Server", "Data modelling"],
    highlights: [
      "Compare overall and service-attribute ratings by airline.",
      "Explore recommendation share by travel class.",
      "Review the SQL analysis and its privacy-conscious aggregation approach.",
    ],
    files: [
      { label: "Airline review analysis SQL", path: "/projects/airline-customer-experience/sql/airline-reviews.sql", format: "SQL", group: "SQL" },
      { label: "Airline ratings data (de-identified)", path: "/projects/airline-customer-experience/data/airline-review-ratings-deidentified.csv", format: "CSV", group: "Source data" },
    ],
    showcases: [
      {
        title: "SQL for customer experience",
        description: "Aggregate airline ratings and recommendation patterns without exposing reviewer names or written reviews.",
        image: "/projects/airline-customer-experience/sql/airline-reviews-query.svg",
        alt: "SQL code preview showing airline ratings aggregated by airline and travel class",
      },
    ],
    notice:
      "The published CSV omits reviewer names, review titles and free-text reviews. The original PBIX is held back because it may embed those fields; a de-identified report can replace it. Fastjet materials are a separate project and remain excluded.",
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getProjectFileCount() {
  return portfolioProjects.reduce(
    (total, project) => total + project.files.length,
    0,
  );
}
