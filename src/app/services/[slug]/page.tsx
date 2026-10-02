"use client";

import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This would typically come from a CMS or database
const servicesData: Record<string, {
    title: string;
    description: string;
    longDescription: string;
    image: string;
    benefits: string[];
    technologies: string[];
    cta: string;
}> = {
    "ai-agents-automation": {
        title: "AI Agents & Automation",
        description: "Custom AI agents built with N8N, Make.com, and Zapier to automate your workflows and save hours of manual work.",
        longDescription: `
            In today's fast-paced digital landscape, efficiency is key. Our AI Agents & Automation service is designed to revolutionize how you operate. 
            We build intelligent agents that can handle complex tasks, from customer support to data analysis, without human intervention.
            
            By leveraging powerful platforms like N8N, Make.com, and Zapier, combined with advanced LLMs like OpenAI's GPT-4, we create seamless workflows that integrate with your existing tools.
            Imagine a system that automatically processes leads, updates your CRM, generates personalized emails, and schedules meetings—all while you sleep.
            
            We don't just automate tasks; we engineer intelligent systems that learn and adapt, providing you with a competitive edge.
        `,
        image: "/ai_automation_hero.png",
        benefits: [
            "Save 20+ hours per week on manual tasks",
            "Reduce human error to near zero",
            "24/7 operation without downtime",
            "Scalable solutions that grow with your business",
            "Seamless integration with your existing tech stack"
        ],
        technologies: ["N8N", "Make.com", "Zapier", "OpenAI", "Anthropic", "Python"],
        cta: "Automate Your Business"
    },
    "software-development": {
        title: "Software Development",
        description: "Scalable, secure, and high-performance web applications tailored to your business needs using modern tech stacks.",
        longDescription: `
            We build robust, scalable, and high-performance software solutions that drive business growth. 
            Our team of expert developers specializes in modern web technologies to deliver applications that are not only functional but also delightful to use.
            
            Whether you need a complex SaaS platform, a custom internal tool, or a high-converting landing page, we have the expertise to bring your vision to life.
            We prioritize clean code, security, and performance, ensuring your application can handle growth and evolving business requirements.
            
            From initial architecture design to deployment and maintenance, we are your partners in digital transformation.
        `,
        image: "/software_dev_hero.png",
        benefits: [
            "Custom solutions tailored to your specific needs",
            "Scalable architecture for future growth",
            "High-performance and SEO-optimized code",
            "Secure and reliable applications",
            "Modern, responsive user interfaces"
        ],
        technologies: ["React", "Next.js", "Node.js", "Supabase", "PostgreSQL", "TypeScript"],
        cta: "Build Your Solution"
    },
    "mobile-app-development": {
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications for Android and iOS that provide seamless user experiences.",
        longDescription: `
            Reach your customers wherever they are with our premium mobile app development services.
            We specialize in creating beautiful, intuitive, and high-performance mobile applications for both iOS and Android platforms.
            
            Using cross-platform technologies like Flutter and React Native, we can deliver native-like experiences with a single codebase, saving you time and money without compromising on quality.
            Our apps are designed with a mobile-first approach, ensuring smooth navigation, fast load times, and an engaging user experience.
            
            Whether it's a consumer-facing app or an enterprise solution, we build mobile experiences that users love.
        `,
        image: "/mobile_app_hero.png",
        benefits: [
            "Cross-platform compatibility (iOS & Android)",
            "Native-like performance and feel",
            "Intuitive and engaging UI/UX design",
            "Offline capabilities and push notifications",
            "Faster time-to-market"
        ],
        technologies: ["Flutter", "React Native", "iOS", "Android", "Firebase"],
        cta: "Launch Your App"
    },
    "dashboard-development": {
        title: "Dashboard Development",
        description: "Interactive and insightful data dashboards that transform raw data into actionable business intelligence.",
        longDescription: `
            In the data-driven world, making informed decisions is crucial. Our Dashboard Development service empowers you to visualize your data like never before.
            We specialize in creating interactive, high-impact dashboards using Power BI, Excel, and custom SQL solutions.
            
            We don't just build charts; we tell stories with data. By connecting to your various data sources—databases, spreadsheets, APIs—we create a unified view of your business performance.
            Our dashboards allow you to drill down into the details, identify trends, and spot anomalies instantly.
            
            From executive summaries to operational reports, we design tools that help you understand your business at a glance and drive strategic growth.
        `,
        image: "/data_viz_hero.png",
        benefits: [
            "Real-time visibility into key performance indicators (KPIs)",
            "Interactive drill-down capabilities for deep analysis",
            "Automated data refreshing and reporting",
            "Custom visualizations tailored to your industry",
            "Integration with multiple data sources"
        ],
        technologies: ["Power BI", "Excel", "SQL", "DAX", "Power Query"],
        cta: "Visualize Your Data"
    }
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = servicesData[slug];

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <Section id="service-detail" className="pt-0">
                <div className="container mx-auto px-4 md:px-6">
                    <Link href="/#services" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Services
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Content Side */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="prose prose-invert max-w-none mb-8">
                                {service.longDescription.split('\n').map((paragraph, idx) => (
                                    paragraph.trim() && (
                                        <p key={idx} className="text-gray-400 mb-4 leading-relaxed">
                                            {paragraph.trim()}
                                        </p>
                                    )
                                ))}
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-white mb-4">Key Benefits</h3>
                                <ul className="space-y-3">
                                    {service.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-300">
                                            <CheckCircle2 className="w-5 h-5 text-[var(--accent)] mt-1 flex-shrink-0" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-xl font-semibold text-white mb-4">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {service.technologies.map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Button size="lg" className="w-full sm:w-auto">
                                {service.cta}
                            </Button>
                        </div>

                        {/* Image Side */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#05082B]">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05082B] via-transparent to-transparent opacity-60"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
