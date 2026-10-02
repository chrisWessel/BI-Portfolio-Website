"use client";

import React from 'react';
import { Section } from '@/components/ui/Section';

const tools = [
    "n8n", "Make", "Zapier", "OpenAI", "Supabase", "Next.js", "React", "Flutter", "Node.js", "Python", "Power BI"
];

export const TechStack = () => {
    return (
        <Section className="py-12 border-y border-white/10 bg-transparent">
            <div className="text-center mb-8">
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Powered by Modern Tech</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {tools.map((tool) => (
                    <div key={tool} className="text-xl font-bold text-gray-300 flex items-center gap-2">
                        {/* In a real app, use actual SVGs/Images here */}
                        <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                        {tool}
                    </div>
                ))}
            </div>
        </Section>
    );
};
