"use client";

import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Layers, Smartphone, BarChart3, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const devServices = [
    {
        icon: <Layers className="w-10 h-10 text-purple-500" />,
        title: "Software Development",
        description: "Scalable web applications and custom software solutions built with modern technologies like React, Next.js, and Node.js.",
        slug: "software-development"
    },
    {
        icon: <Smartphone className="w-10 h-10 text-green-500" />,
        title: "Mobile App Development",
        description: "High-performance native and cross-platform mobile apps for iOS and Android using Flutter and React Native.",
        slug: "mobile-app-development"
    },
    {
        icon: <BarChart3 className="w-10 h-10 text-yellow-500" />,
        title: "Dashboard Development",
        description: "Turn your data into insights with interactive Power BI dashboards, Excel automation, and advanced SQL analytics.",
        slug: "dashboard-development"
    }
];

export const DevelopmentServices = () => {
    return (
        <Section id="development" className="bg-white/5">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">End-to-End Development Solutions</h2>
                <p className="text-gray-400 text-lg">
                    From custom software to mobile apps and data analytics, we build the tools your business needs to thrive.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {devServices.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#05082B] border border-white/10 p-8 rounded-2xl hover:border-[var(--accent)]/50 transition-all duration-300 group"
                    >
                        <div className="mb-6 p-4 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            {service.description}
                        </p>
                        <Link href={`/services/${service.slug}`}>
                            <Button variant="outline" className="w-full border-white/20 hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] group-hover:bg-white/5">
                                View Details <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
