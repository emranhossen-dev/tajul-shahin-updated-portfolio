import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import LottieAnimation from '@/components/LottieAnimation';
import {
  NextjsIcon,
  ReactIcon,
  TypescriptIcon,
  TailwindIcon,
  NodejsIcon,
  ExpressIcon,
  PostgresIcon,
  MongodbIcon,
  PrismaIcon,
  SupabaseIcon,
} from '@/components/TechIcons';
import { Code2, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function AboutMe() {
  const techStack = [
    { name: 'Next.js', icon: <NextjsIcon size={20} /> },
    { name: 'React.js', icon: <ReactIcon size={20} /> },
    { name: 'TypeScript', icon: <TypescriptIcon size={20} /> },
    { name: 'Tailwind CSS', icon: <TailwindIcon size={20} /> },
    { name: 'Node.js', icon: <NodejsIcon size={20} /> },
    { name: 'Express.js', icon: <ExpressIcon size={20} /> },
    { name: 'PostgreSQL', icon: <PostgresIcon size={20} /> },
    { name: 'MongoDB', icon: <MongodbIcon size={20} /> },
    { name: 'Supabase', icon: <SupabaseIcon size={20} /> },
    { name: 'Prisma', icon: <PrismaIcon size={20} /> },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
              Background &amp; Philosophy
            </h2>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              About <span className="text-gradient">Emran Hossen</span>
            </h2>
            <div className="w-12 h-1.5 bg-indigo-500 mx-auto mt-4 rounded-full" />
          </div>
        </ScrollReveal>

        {/* 2-Column Grid with 2-Side Reveal Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left Column: Slides from LEFT - Coding Animated Lottie Scene */}
          <div className="lg:col-span-5 flex justify-center items-center h-full">
            <ScrollReveal variant="fade-left" className="w-full flex justify-center">
              <div className="relative w-full max-w-[480px] flex items-center justify-center py-4">
                {/* Subtle backlight glow behind animation */}
                <div className="absolute inset-0 bg-indigo-600/15 blur-[90px] rounded-full pointer-events-none" />

                {/* Animated Lottie Coding JSON */}
                <LottieAnimation
                  animationPath="/Coding.json"
                  className="w-full h-auto max-w-[480px] drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)] relative z-10"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Slides from RIGHT - Detailed Biography & Tech Cards */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal variant="fade-right">
              
              {/* In-depth Detailed Narrative matching Left Column Height */}
              <div className="space-y-4 text-zinc-300 leading-relaxed text-sm sm:text-base text-justify [text-align-last:left]">
                <p>
                  Hi, I&apos;m <strong className="text-white font-bold">Emran Hossen</strong>, a dedicated{' '}
                  <strong className="text-indigo-400 font-bold">Full Stack Software Engineer &amp; Web Developer</strong>{' '}
                  based in <strong className="text-zinc-200 font-semibold">Narsingdi, Dhaka, Bangladesh</strong>. I design,
                  architect, and scale production-ready digital applications utilizing the modern{' '}
                  <strong className="text-white font-semibold">React, Next.js, Node.js, and PostgreSQL/MongoDB</strong> ecosystems.
                </p>

                <p>
                  With over <strong className="text-white font-semibold">2+ years of hands-on experience</strong> in full-stack
                  web engineering, my development philosophy centers on creating software that is both visually captivating and
                  fundamentally robust under the hood. From pixel-perfect, accessible UI components to resilient database schemas and
                  RESTful APIs, I take full ownership of the end-to-end development cycle.
                </p>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed text-justify [text-align-last:left]">
                  My recent projects include engineering full-featured EdTech LMS platforms with video streaming and automated quiz
                  evaluations (<em className="text-indigo-300 not-italic">Luminous Centre</em>), high-converting e-commerce
                  storefronts with Stripe payment workflows (<em className="text-indigo-300 not-italic">Ardhi Mart</em> &amp;{' '}
                  <em className="text-indigo-300 not-italic">YazMart</em>), and zero-knowledge client-side encrypted vaults
                  (<em className="text-indigo-300 not-italic">IronLocker</em>).
                </p>
              </div>

              {/* Three Core Engineering Focus Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-indigo-400">
                    <Code2 className="w-4 h-4" />
                    <span className="text-xs font-bold text-white">Full-Stack Core</span>
                  </div>
                  <p className="text-[11.5px] text-zinc-400 leading-normal">
                    Seamless sync between Next.js frontends and Node.js REST services.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-bold text-white">High Performance</span>
                  </div>
                  <p className="text-[11.5px] text-zinc-400 leading-normal">
                    100/100 Core Web Vitals, SSR/SSG caching, and sub-second loads.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-bold text-white">Clean Code</span>
                  </div>
                  <p className="text-[11.5px] text-zinc-400 leading-normal">
                    Strict TypeScript safety, modular design, and robust security.
                  </p>
                </div>
              </div>

              {/* Core Tech Stack Cards with Official Brand Icons */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Core Technologies &amp; Frameworks</span>
                  </h4>
                  <span className="text-[10px] font-mono text-indigo-400/80 uppercase">Production Stack</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="px-3 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-500/40 transition-all duration-200 flex items-center gap-2.5 group cursor-default shadow-sm"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        {tech.icon}
                      </div>
                      <span className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors truncate">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}