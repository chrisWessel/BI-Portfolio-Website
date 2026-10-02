import React from 'react';
import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-transparent border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4 text-white">
                            <div className="bg-[var(--accent)] text-white p-1.5 rounded-lg">
                                <Zap size={20} fill="currentColor" />
                            </div>
                            <span>FlowForce</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering businesses with AI agents, seamless automations, and cutting-edge software solutions.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-white">Services</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-[var(--accent)]">AI Agents</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)]">Automations (n8n/Make)</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)]">Web Development</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)]">Mobile Apps</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-white">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-[var(--accent)]">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)]">Careers</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)]">Blog</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)]">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-white">Connect</h3>
                        <div className="flex gap-4 text-gray-400">
                            <Link href="#" className="hover:text-[var(--accent)]"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-[var(--accent)]"><Github size={20} /></Link>
                            <Link href="#" className="hover:text-[var(--accent)]"><Linkedin size={20} /></Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} FlowForce Agency. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
