"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Code, Smartphone } from 'lucide-react';

export const Hero = () => {
    return (
        <Section className="bg-[var(--hero-bg)] text-[var(--hero-fg)] min-h-[90vh] flex items-center pt-32">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm font-medium mb-8 border border-white/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Accepting New Clients
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                        Automate Your <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Digital Future
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                        We build intelligent AI agents, robust software architectures, and cross-platform mobile apps to streamline your business.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <Button size="lg" className="gap-2">
                            Start Your Project <ArrowRight size={18} />
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                            View Workflows
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
                >
                    {[
                        { src: "/ai_automation_hero.png", alt: "AI Agents", label: "AI Agents" },
                        { src: "/software_dev_hero.png", alt: "Software Development", label: "Software" },
                        { src: "/mobile_app_hero.png", alt: "Mobile Apps", label: "Mobile" },
                        { src: "/data_viz_hero.png", alt: "Data Visualization", label: "Data Viz" }
                    ].map((img, index) => (
                        <div key={index} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#05082B] aspect-[4/3]">
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#05082B] via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-4 left-4 font-semibold text-white text-lg">
                                {img.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};
