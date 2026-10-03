'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, FileText, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './BrandIcons';

const titles = [
  "Full Stack Developer",
  "Next.js & React Specialist",
  "Node.js & Supabase Engineer",
  "MERN Stack Developer"
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText.length === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleScrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen pt-28 pb-20 flex items-center justify-center relative overflow-hidden">
      {/* Background blueprint grid pattern with radial vignette */}
      <div className="hero-grid" />

      <div className="max-w-[1380px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center relative z-10">

        {/* Left Column: Intro text, typed role, bio, CTAs & socials */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </div>
            <span className="text-zinc-300 font-medium">open to opportunities</span>
          </div>

          {/* Heading with Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
            <span className="block text-zinc-400 text-xl sm:text-2xl font-semibold tracking-normal mb-1">
              Hi, I&apos;m
            </span>
            <span>Emran </span>
            <span className="text-[#7c6fff] text-gradient">Hossen</span>
          </h1>

          {/* Dynamic typing role */}
          <div className="h-10 text-xl sm:text-2xl font-bold text-zinc-200 flex items-center">
            <span className="text-zinc-400 mr-2 font-medium">I am a</span>
            <span className="text-[#7c6fff] dark:text-[#a78bfa] blink-cursor font-semibold">{displayText}</span>
          </div>

          {/* Bio Description */}
          <p className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed">
            Passionate about building <strong className="text-white font-semibold">fast, scalable web applications</strong> end-to-end — from pixel-perfect frontends to robust backend systems. I turn complex ideas into clean, performant products.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-1 w-full sm:w-auto">
            <button
              onClick={handleScrollToProjects}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#7c6fff] hover:bg-[#6c5ee8] text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_6px_20px_rgba(124,111,255,0.32)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View My Works</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/Resume_of_Emran_Hossen.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-200 hover:text-white font-semibold px-7 py-3.5 rounded-xl border border-white/15 hover:border-[#7c6fff] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
              aria-label="View Resume in New Tab"
            >
              <FileText className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors" />
              <span>Resume</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
            {[
              { href: "https://github.com/emranhossen-dev", icon: <GithubIcon className="w-[18px] h-[18px]" />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/emranhossen-dev", icon: <LinkedinIcon className="w-[18px] h-[18px]" />, label: "LinkedIn" },
              { href: "https://twitter.com/emranhossen_dev", icon: <TwitterIcon className="w-[18px] h-[18px]" />, label: "Twitter" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-[#7c6fff] hover:border-[#7c6fff]/50 hover:bg-[#7c6fff]/10 hover:shadow-md hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-200"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: 50% width wrapper with centered card and widely-spaced floating tags */}
        <div className="hidden lg:flex justify-center items-center relative w-full py-8">

          {/* Card & floating badges anchor wrapper */}
          <div className="relative w-[340px] max-w-full">

            {/* Developer IDE / Browser Window Card */}
            <div className="w-full rounded-[22px] overflow-hidden border border-white/10 bg-[#0e0e1a] shadow-[0_24px_56px_rgba(0,0,0,0.55)] z-10">

              {/* Card Window Titlebar */}
              <div className="px-4 py-3.5 bg-[#141422] border-b border-white/[0.07] flex items-center gap-1.5">
                <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
                <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
                <div className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-[11.5px] text-zinc-400/80">emranhossen.dev</span>
              </div>

              {/* Card Center Avatar & Code Block */}
              <div className="pt-8 pb-6 px-5 flex flex-col items-center gap-4 bg-gradient-to-b from-[#141422] to-[#1c1c2e]">
                {/* Circular Profile Avatar with Glowing Border */}
                <div className="relative w-[110px] h-[110px] rounded-full p-[2px] bg-gradient-to-tr from-[#7c6fff]/60 via-[#a78bfa]/40 to-[#34d399]/40 shadow-[0_0_35px_rgba(124,111,255,0.18)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20">
                    <Image
                      src="/emran-hossen-developer-2026.webp"
                      alt="Emran Hossen - Professional Full Stack Developer"
                      fill
                      priority
                      sizes="110px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>

                {/* Developer Object Code Snippet */}
                <div className="w-full bg-[#7c6fff]/[0.07] border border-white/[0.09] rounded-xl p-3.5 font-mono text-[11px] leading-[1.7] text-left">
                  <div><span className="text-[#a78bfa] font-semibold">const</span> <span className="text-white font-medium">dev</span> = &#123;</div>
                  <div className="pl-4"><span className="text-[#c4b5fd]">name</span>: <span className="text-[#34d399]">&quot;Emran Hossen&quot;</span>,</div>
                  <div className="pl-4"><span className="text-[#c4b5fd]">role</span>: <span className="text-[#34d399]">&quot;Full Stack&quot;</span>,</div>
                  <div className="pl-4"><span className="text-[#c4b5fd]">Ice-Cream</span>: <span className="text-[#34d399]">Infinity</span></div>
                  <div>&#125;</div>
                </div>
              </div>

              {/* 3-Column Stats Grid */}
              <div className="grid grid-cols-3 divide-x divide-white/[0.08] border-y border-white/[0.08] bg-[#0e0e1a]">
                <div className="py-3.5 px-2 text-center">
                  <div className="text-[20px] font-extrabold text-white">2+</div>
                  <div className="text-[10.5px] text-zinc-400 mt-0.5">Yrs Exp</div>
                </div>
                <div className="py-3.5 px-2 text-center">
                  <div className="text-[20px] font-extrabold text-white">16+</div>
                  <div className="text-[10.5px] text-zinc-400 mt-0.5">Projects</div>
                </div>
                <div className="py-3.5 px-2 text-center">
                  <div className="text-[20px] font-extrabold text-white">6+</div>
                  <div className="text-[10.5px] text-zinc-400 mt-0.5">Clients</div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-3.5 flex items-center justify-between bg-[#0e0e1a] border-t border-white/[0.07]">
                <span className="font-bold text-[15px] text-white">Emran Hossen</span>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11.5px] font-mono font-semibold bg-[#7c6fff]/[0.14] text-[#a78bfa] border border-[#7c6fff]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                  Full Stack Developer
                </div>
              </div>
            </div>

            {/* Floating Tech Badges - Balanced proximity without touching */}
            {/* Top Right Floating Badge */}
            <div
              className="absolute top-6 left-[calc(100%+16px)] px-3.5 py-2 rounded-xl border border-white/10 bg-[#0e0e1a]/95 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md animate-float flex items-center gap-2 whitespace-nowrap z-20 pointer-events-none"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="text-[#7c6fff] font-bold text-xs">▲</span>
              <span className="text-xs font-mono font-bold text-zinc-200">Next.js 14</span>
            </div>

            {/* Bottom Left Floating Badge */}
            <div
              className="absolute bottom-10 right-[calc(100%+16px)] px-3.5 py-2 rounded-xl border border-white/10 bg-[#0e0e1a]/95 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md animate-float-slow flex items-center gap-2 whitespace-nowrap z-20 pointer-events-none"
              style={{ animationDelay: '2s' }}
            >
              <span className="text-[#34d399] font-bold text-xs">⬡</span>
              <span className="text-xs font-mono font-bold text-zinc-200">Node.js Expert</span>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Scroll Down Indicator */}
      <div
        onClick={handleScrollToAbout}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 opacity-70 hover:opacity-100 transition-opacity"
        role="button"
        aria-label="Scroll to About section"
      >
        <div className="w-[1.5px] h-8 bg-gradient-to-b from-indigo-500 via-indigo-400 to-transparent animate-scroll-line" />
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
          scroll
        </span>
      </div>
    </section>
  );
}
