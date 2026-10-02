import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bi-portfolio-website.vercel.app"),
  title: "Wessel Tangai | Business Intelligence Portfolio",
  description:
    "Power BI, Excel, SQL and data modelling projects by Wessel Tangai. Explore dashboards, case studies and project files.",
  icons: {
    icon: "/wessel-tangai.jpg",
    apple: "/wessel-tangai.jpg",
  },
  openGraph: {
    title: "Wessel Tangai | Business Intelligence Portfolio",
    description:
      "Turning complex data into clear, decision-ready stories with Power BI, Excel, SQL and thoughtful data modelling.",
    type: "website",
    images: ["/wessel-tangai.jpg"],
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
