import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Lock,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Gauge,
  Globe,
  Briefcase,
  Cpu,
  Activity,
  Terminal,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { projectsData, getProjectBySlug, formatExternalUrl } from '@/data/projectsData';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const project of projectsData) {
    params.push({ slug: project.slug });
    params.push({ slug: project.id.toString() });
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: 'Project Not Found | Emran Hossen',
    };
  }

  return {
    title: `${project.name} — ${project.type} | Emran Hossen`,
    description: project.description,
    openGraph: {
      title: `${project.name} — Web Development Case Study by Emran Hossen`,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.name} by Emran Hossen`,
        },
      ],
    },
  };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Find next and prev project for seamless bottom navigation
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];

  const formattedLiveUrl = formatExternalUrl(project.liveLink);
  const formattedGithubUrl = formatExternalUrl(project.githubLink);
  const displayHost = project.liveLink ? project.liveLink.replace(/^https?:\/\/(www\.)?/, '') : 'emran.work';

  return (
    <div className="min-h-screen bg-[#060c1a] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-white relative overflow-hidden font-sans">
      {/* Dynamic ambient lighting & blueprint grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="hero-grid opacity-70" />
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[160px]" />
        <div className="absolute top-[25%] right-[-10%] w-[650px] h-[650px] rounded-full bg-cyan-600/10 blur-[180px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[550px] h-[550px] rounded-full bg-purple-600/12 blur-[160px]" />
      </div>

      {/* Global Navbar (Identical to Home Page) */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 pt-28 pb-14 sm:pt-32 sm:pb-20">
        <div className="max-w-[1380px] mx-auto px-6 md:px-12 space-y-10 sm:space-y-12 w-full">
          
          {/* Top In-Page Breadcrumb & Back Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-all group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 text-indigo-400" />
              <span>Back to All Projects</span>
            </Link>

            {/* Breadcrumb Trail */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Link href="/" className="hover:text-zinc-200 transition-colors">Portfolio</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <Link href="/#projects" className="hover:text-zinc-200 transition-colors">Projects</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-indigo-400 font-bold truncate max-w-[240px]">{project.name}</span>
            </div>

            <a
              href={formattedLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
          </div>
          
          {/* Project Header Hero */}
          <div className="space-y-6">
            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-lg backdrop-blur-md shadow-sm">
                {project.type}
              </span>

              {project.isWIP ? (
                <span className="px-3 py-1 rounded-lg bg-amber-500/80 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  🚧 In Progress
                </span>
              ) : project.isGithubPrivate ? (
                <span className="px-3 py-1 rounded-lg bg-slate-900/85 text-zinc-300 border border-white/10 text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Client Confidential
                </span>
              ) : (
                <span className="px-3 py-1 rounded-lg bg-emerald-950/85 text-emerald-300 border border-emerald-500/40 text-[11px] sm:text-xs font-bold tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Production Live
                </span>
              )}

              {project.timeline && (
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 text-[11px] sm:text-xs font-mono font-medium">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  {project.timeline}
                </span>
              )}
            </div>

            {/* Massive Glowing Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              <span>{project.name}</span>
            </h1>

            {/* Project Summary Description */}
            <p className="text-base sm:text-lg lg:text-xl text-zinc-300 leading-relaxed w-full text-justify [text-align-last:left] font-normal">
              {project.longDescription || project.description}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href={formattedLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/45 hover:-translate-y-0.5 active:translate-y-0 transition-all group cursor-pointer"
              >
                <span>Launch Live Application</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {project.githubLink && !project.isGithubPrivate ? (
                <a
                  href={formattedGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/15 hover:border-indigo-400/40 text-zinc-200 hover:text-white font-semibold text-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Explore Repository</span>
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-400 text-xs sm:text-sm font-medium">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Proprietary / Client Codebase Protected</span>
                </div>
              )}

              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold transition-all"
              >
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Discuss Similar Project</span>
              </Link>
            </div>
          </div>

          {/* Photorealistic Browser Mockup Showcase */}
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.12] bg-[#0c1322] shadow-[0_25px_70px_rgba(0,0,0,0.7)] group">
            {/* Realistic Browser Window Top Chrome */}
            <div className="px-5 py-3.5 bg-[#0a101d] border-b border-white/[0.08] flex items-center justify-between gap-4">
              {/* macOS Traffic Lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] inline-block shadow-sm" />
              </div>

              {/* Centered URL Address Bar */}
              <div className="flex-1 max-w-lg mx-auto flex items-center justify-center">
                <div className="w-full px-4 py-1.5 rounded-xl bg-black/40 border border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400 shadow-inner">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-zinc-500 text-[11px]">https://</span>
                    <span className="text-zinc-200 font-medium truncate">{displayHost}</span>
                  </div>
                  <a
                    href={formattedLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    aria-label="Open in new tab"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Top-Right Floating Metric Highlight */}
              <div className="hidden sm:flex items-center">
                {project.highlightMetric && (
                  <span className="px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-[11px] font-bold">
                    {project.highlightMetric}
                  </span>
                )}
              </div>
            </div>

            {/* Main Screenshot Container with Hover Effects */}
            <div className="relative w-full h-[340px] sm:h-[500px] md:h-[620px] overflow-hidden bg-slate-950">
              <Image
                src={project.image}
                alt={`${project.name} Production Architecture Showcase`}
                fill
                priority
                sizes="(max-width: 1240px) 100vw, 1240px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Subtle top & bottom shadow vignettes for cinematic look */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060c1a] via-transparent to-black/30 opacity-60 pointer-events-none" />

              {/* Hover Cue Banner at Bottom */}
              <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-zinc-300 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Production Snapshot</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Specs Grid Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0c152c]/90 to-[#0c152c]/60 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400">
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  Role &amp; Responsibility
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white">
                {project.clientOrRole || 'Full Stack Developer'}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  Timeline
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white">
                {project.timeline || '2025 - 2026'}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  System Architecture
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white">
                Decoupled / Full Stack
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  Release Status
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Production Ready
              </p>
            </div>
          </div>

          {/* Quantifiable Impact & Engineering Metrics Dashboard */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c152c]/95 via-[#0e1c3b]/80 to-[#0c152c]/95 border border-indigo-500/25 backdrop-blur-md shadow-2xl shadow-indigo-950/40 relative overflow-hidden">
              {/* Subtle neon glow in corner */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6 flex-wrap gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shadow-inner">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Quantifiable Engineering Metrics
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400">
                      Measurable performance benchmarks &amp; architectural impact achieved
                    </p>
                  </div>
                </div>

                {project.highlightMetric && (
                  <span className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 shadow-sm">
                    {project.highlightMetric}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-indigo-500/40 transition-all duration-300 space-y-2 group shadow-sm"
                  >
                    <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-400 group-hover:scale-105 transition-transform origin-left">
                      {metric.value}
                    </div>
                    <div className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                      {metric.label}
                    </div>
                    {metric.detail && (
                      <p className="text-[11.5px] text-zinc-400 leading-snug">
                        {metric.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deep Dive Case Study: Full-Width Justified Sections */}
          <div className="space-y-8 w-full">
            
            {/* Key Features & Architectural Capabilities - Full Width */}
            <div className="w-full p-7 sm:p-8 rounded-3xl bg-[#0c152c]/75 border border-white/10 backdrop-blur-md space-y-6">
              <div className="flex items-center gap-3 text-indigo-400 border-b border-white/[0.08] pb-4">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Key Features &amp; Capabilities</h2>
                  <p className="text-xs text-zinc-400">Core functional modules and user experience design</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(project.keyFeatures || [
                  'Production-grade responsive UI with mobile-first optimizations',
                  'Interactive state synchronization and client-side performance caching',
                  'Secure REST API communication with robust error handling',
                  'Modern styling and accessible markup complying with WCAG guidelines'
                ]).map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5 text-sm text-zinc-300 leading-relaxed text-justify [text-align-last:left] group hover:border-indigo-500/30 transition-colors">
                    <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="flex-1">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Challenges Solved - Full Width */}
            <div className="w-full p-7 sm:p-8 rounded-3xl bg-[#0c152c]/75 border border-white/10 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3 text-amber-400 border-b border-white/[0.08] pb-4">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Engineering Challenges Solved</h2>
                  <p className="text-xs text-zinc-400">Technical hurdles and performance bottlenecks overcome during development</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed pt-1 w-full text-justify [text-align-last:left]">
                {project.challenges}
              </p>
            </div>

            {/* Planned Roadmap & Future Improvements - Full Width */}
            <div className="w-full p-7 sm:p-8 rounded-3xl bg-[#0c152c]/75 border border-white/10 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3 text-cyan-400 border-b border-white/[0.08] pb-4">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Layers className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Planned Roadmap &amp; Improvements</h2>
                  <p className="text-xs text-zinc-400">Next engineering milestones, feature enhancements, and scalability roadmap</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed pt-1 w-full text-justify [text-align-last:left]">
                {project.improvements}
              </p>
            </div>

            {/* Technologies & Frameworks - Full Width */}
            <div className="w-full p-7 sm:p-8 rounded-3xl bg-[#0c152c]/75 border border-white/10 backdrop-blur-md space-y-5">
              <div className="flex items-center gap-3 text-indigo-400 border-b border-white/[0.08] pb-4">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Technologies Used</h2>
                  <p className="text-xs text-zinc-400">Modern software engineering stack utilized in this build</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-400/40 text-xs sm:text-sm font-mono font-medium text-zinc-200 hover:text-white transition-all duration-200 cursor-default shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Developer & Lead Engineer Spotlight Card - Full Width Banner */}
            <div className="w-full p-7 sm:p-8 rounded-3xl bg-gradient-to-r from-[#101b38] via-[#0c152c] to-[#0a1020] border border-indigo-500/35 backdrop-blur-md shadow-xl shadow-indigo-950/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 via-cyan-400 to-indigo-600 shadow-lg shrink-0">
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20">
                    <Image
                      src="/emran-hossen-developer-2026.webp"
                      alt="Emran Hossen"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg sm:text-xl leading-tight">Emran Hossen</h3>
                  <p className="text-xs sm:text-sm font-mono text-indigo-300 mt-0.5">Software Engineer &amp; Full Stack Developer</p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 mt-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for projects &amp; full-time opportunities
                  </span>
                </div>
              </div>

              <div className="flex-1 max-w-xl text-center md:text-left">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify [text-align-last:left]">
                  Looking to build a fast, scalable web application like <strong className="text-white font-semibold">{project.name}</strong>? Let&apos;s collaborate to turn your technical requirements into high-performance digital reality.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/45 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Get in Touch with Emran</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:dev@emran.work"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all text-center"
                >
                  <span>dev@emran.work</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Prev / Next Project Navigator */}
          <div className="pt-10 sm:pt-14 border-t border-white/10">
            <div className="text-center mb-6">
              <span className="text-[11px] uppercase tracking-widest font-mono text-zinc-500">
                Explore More Work
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Previous Project Card */}
              <Link
                href={`/projects/${prevProject.slug}`}
                className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-indigo-500/40 flex items-center justify-between gap-4 transition-all duration-300 group shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  </div>
                  <div>
                    <span className="text-[10.5px] uppercase font-bold tracking-wider text-zinc-500 block">
                      Previous Project
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                      {prevProject.name}
                    </h4>
                    <span className="text-xs text-zinc-400">{prevProject.type}</span>
                  </div>
                </div>
              </Link>

              {/* Next Project Card */}
              <Link
                href={`/projects/${nextProject.slug}`}
                className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-indigo-500/40 flex items-center justify-between gap-4 transition-all duration-300 group shadow-md text-right"
              >
                <div className="flex-1">
                  <span className="text-[10.5px] uppercase font-bold tracking-wider text-zinc-500 block">
                    Next Project
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                    {nextProject.name}
                  </h4>
                  <span className="text-xs text-zinc-400">{nextProject.type}</span>
                </div>
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Global Footer (Identical to Home Page) */}
      <Footer />
    </div>
  );
}
