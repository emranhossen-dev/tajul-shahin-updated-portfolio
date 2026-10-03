'use client';

import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './BrandIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-12 border-t border-white/10 bg-[#0a1936]/92 relative z-10">
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
            © {new Date().getFullYear()} Emran Hossen. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            Built with Next.js, React 19, and Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/emranhossen-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/emranhossen-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/emranhossen_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="Twitter"
          >
            <TwitterIcon className="w-5 h-5" />
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full border border-slate-200 dark:border-zinc-800/80 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
