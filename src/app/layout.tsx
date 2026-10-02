import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wessel Tangai | Business Intelligence Portfolio",
  description:
    "Power BI, Excel, SQL and data modelling projects by Wessel Tangai. Explore dashboards, case studies and project files.",
  openGraph: {
    title: "Wessel Tangai | Business Intelligence Portfolio",
    description:
      "Turning complex data into clear, decision-ready stories with Power BI, Excel, SQL and thoughtful data modelling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
