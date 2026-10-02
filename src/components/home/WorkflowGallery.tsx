"use client";

"use client";

import React from 'react';
import { Section } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const WorkflowGallery = () => {
    const [selectedWorkflow, setSelectedWorkflow] = React.useState<number | null>(null);

    const workflows = [
        {
            title: "Lead Generation Automation",
            tool: "n8n",
            image: "/workflow-n8n.png",
            details: "Our n8n workflows are designed for privacy-first, self-hosted automation. We build custom nodes to connect your proprietary systems, create complex data transformation pipelines that clean and enrich your leads, and ensure all data stays within your infrastructure. Perfect for high-volume lead processing without per-execution costs."
        },
        {
            title: "Customer Support AI Agent",
            tool: "Make.com",
            image: "/workflow-make.png",
            details: "Leveraging Make.com's visual interface, we design intricate support scenarios. This AI agent handles ticket triage, drafts responses based on your knowledge base, and routes complex issues to human agents. It includes robust error handling and multi-app synchronization to keep your support team efficient."
        },
        {
            title: "E-commerce Order Processing",
            tool: "Zapier",
            image: "/workflow-zapier.png",
            details: "For quick and reliable integrations, we use Zapier to connect your e-commerce store with accounting and shipping platforms. This workflow triggers instantly on new orders, updates inventory across channels, sends personalized confirmation emails, and logs transactions in your accounting software automatically."
        },
    ];

    return (
        <Section id="workflows" className="">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Automated Workflows</h2>
                <p className="text-gray-400 text-lg">
                    See how we connect your favorite tools to create seamless, automated systems.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {workflows.map((workflow, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group rounded-2xl overflow-hidden bg-white/5 shadow-sm hover:shadow-xl transition-all duration-300 border border-white/10 flex flex-col"
                    >
                        <div className="h-64 bg-white/5 relative overflow-hidden p-4 flex items-center justify-center">
                            <img
                                src={workflow.image}
                                alt={workflow.title}
                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
                                {workflow.tool}
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white">{workflow.title}</h3>
                            <p className="text-sm text-gray-400 mb-4 flex-1">
                                {workflow.details.substring(0, 100)}...
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white mt-auto"
                                onClick={() => setSelectedWorkflow(index)}
                            >
                                View Details
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Button variant="secondary">View All Projects</Button>
            </div>

            {/* Details Modal */}
            {selectedWorkflow !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedWorkflow(null)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0a0c24] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            onClick={() => setSelectedWorkflow(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div className="mb-6 h-64 bg-white/5 rounded-xl flex items-center justify-center p-4">
                            <img
                                src={workflows[selectedWorkflow].image}
                                alt={workflows[selectedWorkflow].title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
                            {workflows[selectedWorkflow].tool}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{workflows[selectedWorkflow].title}</h3>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {workflows[selectedWorkflow].details}
                        </p>

                        <div className="mt-8 flex justify-end">
                            <Button onClick={() => setSelectedWorkflow(null)}>Close</Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </Section>
    );
};
