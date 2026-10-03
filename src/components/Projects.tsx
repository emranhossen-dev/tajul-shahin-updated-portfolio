'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Lock, ChevronDown, ArrowRight } from 'lucide-react';
import { projectsData, Project, formatExternalUrl, slugify } from '@/data/projectsData';

const INITIAL_PROJECT_COUNT = 3;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Fetch live projects from backend API if available
    const fetchLiveProjects = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://ap1.emran.work';
        const res = await fetch(`${apiBase}/api/projects`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: Project[] = json.data.map((item: any, idx: number) => ({
            id: item.id || idx + 1,
            slug: item.slug || slugify(item.name || `project-${idx + 1}`),
            name: item.name,
            image: item.image_url || '/project_ardhimart_store.webp',
            type: item.type || 'Web Project',
            stack: Array.isArray(item.stack) ? item.stack : [],
            description: item.description || '',
            liveLink: item.live_link || '',
            githubLink: item.github_link || '',
            isGithubPrivate: Boolean(item.is_github_private),
            isWIP: Boolean(item.is_wip),
            challenges: item.challenges || '',
            improvements: item.improvements || '',
          }));
          setProjects(mapped);
        }
      } catch {
        // Retain projectsData fallback if backend is offline or starting up
      }
    };

    fetchLiveProjects();
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_PROJECT_COUNT);

  return (
    <section id="projects" className="py-14 sm:py-16 relative overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            My Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Recent <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            A collection of real-world applications I&apos;ve built — from LMS platforms to e-commerce solutions and developer tools.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-8">
          {visibleProjects.map((project) => {
            const detailHref = `/projects/${project.slug || slugify(project.name)}`;

            return (
              <div
                key={project.id}
                className="group flex flex-col h-full rounded-3xl overflow-hidden bg-[#0c152c]/75 hover:bg-[#0e1935]/90 border border-white/10 hover:border-indigo-500/40 shadow-[0_12px_36px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.18)] hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-md"
              >
                {/* Card Image Area */}
                <div className="relative w-full h-[220px] overflow-hidden bg-slate-950">
                  <Link
                    href={detailHref}
                    className="block relative w-full h-full cursor-pointer"
                    aria-label={`View details for ${project.name}`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.name} - Web Application Project by Emran Hossen`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Subtle gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c152c] via-black/20 to-transparent" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/90 text-white text-xs font-bold shadow-lg backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span>View Project Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-cyan-300 bg-cyan-950/85 border border-cyan-500/40 px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm">
                      {project.type}
                    </span>
                  </div>

                  {/* Top Right Status Badge */}
                  <div className="absolute top-3.5 right-3.5 pointer-events-none z-10 flex items-center gap-2">
                    {project.highlightMetric && (
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-950/90 text-indigo-300 border border-indigo-500/40 text-[10px] font-bold tracking-wider backdrop-blur-sm shadow-sm font-mono">
                        {project.highlightMetric}
                      </span>
                    )}
                    {project.isWIP ? (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm">
                        🚧 In Progress
                      </span>
                    ) : project.isGithubPrivate ? (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900/85 text-zinc-300 border border-white/10 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1 shadow-sm">
                        <Lock className="w-3 h-3 text-amber-400" /> Private
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/85 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold tracking-wider backdrop-blur-sm flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                      <Link href={detailHref} className="hover:underline">
                        {project.name}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-[13px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-white/[0.02] text-zinc-500">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Action Buttons: Live Preview + Dedicated Route View Details */}
                  <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.08]">
                    <a
                      href={formatExternalUrl(project.liveLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer group/live"
                      aria-label={`Visit ${project.name} live website`}
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                    </a>

                    <Link
                      href={detailHref}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-zinc-200 hover:text-white font-semibold text-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group/det"
                      aria-label={`View details for ${project.name}`}
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover/det:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More / Show Less Toggle Button */}
        {projects.length > INITIAL_PROJECT_COUNT && (
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={() => {
                setShowAll(!showAll);
                if (showAll) {
                  const el = document.getElementById('projects');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }
              }}
              className="px-8 py-3.5 rounded-xl glass-card border border-white/20 font-bold text-white text-sm hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all duration-300 flex items-center gap-2.5 cursor-pointer group"
            >
              <span>{showAll ? 'Show Less Projects' : 'See More Projects'}</span>
              <ChevronDown className={`w-4 h-4 text-indigo-400 group-hover:text-white transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
