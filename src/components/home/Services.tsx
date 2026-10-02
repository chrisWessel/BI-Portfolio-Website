"use client";

import React from 'react';
import { Section } from '@/components/ui/Section';
import { Bot, Layers, Smartphone, ArrowRight, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
    {
        icon: <Bot className="w-8 h-8 text-blue-500" />,
        title: "AI Agents & Automation",
        description: "Custom AI agents built with N8N, Make.com, and Zapier to automate your workflows and save hours of manual work.",
        tags: ["N8N", "Make", "Zapier", "OpenAI"],
        slug: "ai-agents-automation"
    },
    {
        icon: <Layers className="w-8 h-8 text-purple-500" />,
        title: "Software Development",
        description: "Scalable, secure, and high-performance web applications tailored to your business needs using modern tech stacks.",
        tags: ["React", "Next.js", "Node.js", "Supabase"],
        slug: "software-development"
    },
    {
        icon: <Smartphone className="w-8 h-8 text-green-500" />,
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications for Android and iOS that provide seamless user experiences.",
        tags: ["Flutter", "React Native", "Android", "iOS"],
        slug: "mobile-app-development"
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-yellow-500" />,
        title: "Dashboard Development",
        description: "Interactive and insightful data dashboards that transform raw data into actionable business intelligence.",
        tags: ["Power BI", "Excel", "SQL", "DAX"],
        slug: "dashboard-development"
    }
];

export const Services = () => {
    return (
        <Section id="services" className="">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Expertise</h2>
                <p className="text-gray-400 text-lg">
                    We combine cutting-edge technology with strategic design to deliver solutions that drive growth.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:shadow-xl hover:border-white/20 transition-all duration-300"
                    >
                        <div className="mb-6 p-3 bg-white/10 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                            {service.icon}
                        </div>

                        <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {service.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {service.tags.map(tag => (
                                <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-white/10 text-gray-300 rounded-md">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <Link href={`/services/${service.slug}`} className="flex items-center text-[var(--accent)] font-medium text-sm group-hover:gap-2 transition-all cursor-pointer">
                            Learn more <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
