'use client';

import React from 'react';
import { Code2, Server, Briefcase } from 'lucide-react';

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

// ── Custom fallback icon for tools without a devicon ─────────────────────────
function TextIcon({ label, bg, color = '#fff', size = 11 }: { label: string; bg: string; color?: string; size?: number }) {
  return (
    <div
      className="w-[30px] h-[30px] rounded-full flex items-center justify-center font-black"
      style={{ background: bg, color, fontSize: size, lineHeight: 1 }}
    >
      {label}
    </div>
  );
}

// ── Stripe SVG ───────────────────────────────────────────────────────────────
function StripeSVG() {
  return (
    <svg viewBox="0 0 40 40" width={30} height={30} fill="none">
      <rect width="40" height="40" rx="8" fill="#6772E5" />
      <path d="M20.2 16.3c0-.9.7-1.2 1.9-1.2 1.7 0 3.8.5 5.5 1.4V11c-1.8-.7-3.7-1-5.5-1-4.5 0-7.5 2.3-7.5 6.2 0 6 8.3 5 8.3 7.6 0 1-.9 1.4-2.2 1.4-1.9 0-4.3-.8-6.2-1.9V29c2.1.9 4.2 1.3 6.2 1.3 4.7 0 7.9-2.3 7.9-6.3-.1-6.5-8.4-5.3-8.4-7.5-.1-.7.3-1.2 1.5-1.2z" fill="white" />
    </svg>
  );
}

// ── DaisyUI SVG ─────────────────────────────────────────────────────────────
function DaisyUISVG() {
  return (
    <svg viewBox="0 0 100 100" width={30} height={30}>
      <circle cx="50" cy="50" r="14" fill="#ff9800" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <ellipse
          key={i}
          cx={50 + 22 * Math.cos((deg * Math.PI) / 180)}
          cy={50 + 22 * Math.sin((deg * Math.PI) / 180)}
          rx="9"
          ry="14"
          fill="#ffffff"
          opacity="0.9"
          transform={`rotate(${deg} ${50 + 22 * Math.cos((deg * Math.PI) / 180)} ${50 + 22 * Math.sin((deg * Math.PI) / 180)})`}
        />
      ))}
    </svg>
  );
}

// ── Framer Motion SVG ────────────────────────────────────────────────────────
function FramerSVG() {
  return (
    <svg viewBox="0 0 14 21" width={22} height={22} fill="none">
      <path d="M0 0h14v7H7z" fill="#fff" />
      <path d="M0 7h14L7 14z" fill="#fff" opacity="0.7" />
      <path d="M0 14h7v7z" fill="#fff" opacity="0.5" />
    </svg>
  );
}

// ── shadcn/ui SVG ────────────────────────────────────────────────────────────
function ShadcnSVG() {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Vercel SVG (white triangle) ───────────────────────────────────────────────
function VercelSVG() {
  return (
    <svg viewBox="0 0 512 512" width={28} height={28}>
      <path d="M256 48L496 464H16L256 48Z" fill="white" />
    </svg>
  );
}

// ── Cloudflare SVG ───────────────────────────────────────────────────────────
function CloudflareSVG() {
  return (
    <svg viewBox="0 0 109 44" width={32} height={20}>
      <path d="M74.3 23.5l-1-3.4c-4.8-16.2-22.6-24.4-37.8-17.6-7 3.2-12 9.6-13.4 17.1C10.8 20 4 27.2 4 36c0 9.2 7.5 16.7 16.7 16.7h52.5c7.6 0 13.7-6.1 13.7-13.7 0-7.1-5.4-13-12.6-13.6-.2-1.2-.3-1.3-.3-.2 0-1.2 0-1.2 0-1.7z" fill="#F6821F" />
      <path d="M84.3 38.3c0 .2 0 .4-.1.6h-51a5.8 5.8 0 110-11.6c1.3 0 2.6.5 3.6 1.3 1.7-7.8 8.8-13.6 17.3-13.6 8.5 0 15.8 5.8 17.4 13.7 1-.7 2.2-1.1 3.5-1.1 3.5 0 6.3 2.9 6.3 6.4 0 1.5-.5 2.9-1.4 4 .4-.3.6-.7.6-1.1l.9 1.4z" fill="#FBAD41" />
    </svg>
  );
}

// ── Netlify SVG ───────────────────────────────────────────────────────────────
function NetlifySVG() {
  return (
    <svg viewBox="0 0 40 40" width={28} height={28} fill="none">
      <rect width="40" height="40" rx="6" fill="#00AD9F" />
      <path d="M24 20l-4-7-4 7h8zM16 20l4 7 4-7H16z" fill="white" />
      <rect x="11" y="18" width="18" height="4" rx="2" fill="white" />
    </svg>
  );
}

// ── Cursor IDE ────────────────────────────────────────────────────────────────
function CursorSVG() {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="none">
      <rect width="24" height="24" rx="5" fill="#1A1A2E" />
      <path d="M6 6l12 6-12 6V6z" fill="#6C63FF" />
      <rect x="15" y="14" width="3" height="6" rx="1.5" fill="white" opacity="0.8" />
    </svg>
  );
}

// ── SSLCommerz ────────────────────────────────────────────────────────────────
function SSLCommerzSVG() {
  return (
    <svg viewBox="0 0 40 40" width={28} height={28} fill="none">
      <rect width="40" height="40" rx="6" fill="#DA1F26" />
      <text x="4" y="26" fontSize="11" fill="white" fontWeight="bold" fontFamily="sans-serif">SSL</text>
    </svg>
  );
}

// ── JWT ───────────────────────────────────────────────────────────────────────
function JWTIcon() {
  return (
    <svg viewBox="0 0 40 40" width={28} height={28} fill="none">
      <rect width="40" height="40" rx="6" fill="#000000" />
      <text x="5" y="26" fontSize="11" fill="#d63aff" fontWeight="bold" fontFamily="sans-serif">JWT</text>
    </svg>
  );
}

// ── Better Auth ───────────────────────────────────────────────────────────────
function BetterAuthIcon() {
  return (
    <svg viewBox="0 0 40 40" width={28} height={28} fill="none">
      <rect width="40" height="40" rx="6" fill="#1C1C1C" />
      <path d="M12 20a8 8 0 1116 0 8 8 0 01-16 0z" fill="none" stroke="#a78bfa" strokeWidth="2" />
      <path d="M17 20l2 2 4-4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── OAuth ─────────────────────────────────────────────────────────────────────
function OAuthIcon() {
  return (
    <svg viewBox="0 0 40 40" width={28} height={28} fill="none">
      <rect width="40" height="40" rx="6" fill="#EB5424" />
      <text x="3" y="26" fontSize="10" fill="white" fontWeight="bold" fontFamily="sans-serif">OAuth</text>
    </svg>
  );
}

// ── npm ───────────────────────────────────────────────────────────────────────
function NpmSVG() {
  return (
    <svg viewBox="0 0 40 40" width={30} height={30} fill="none">
      <rect width="40" height="40" rx="4" fill="#CB3837" />
      <rect x="7" y="12" width="26" height="16" rx="1" fill="white" />
      <rect x="13" y="16" width="4" height="8" fill="#CB3837" />
      <rect x="23" y="16" width="4" height="4" fill="#CB3837" />
    </svg>
  );
}

// ── Skill interface ───────────────────────────────────────────────────────────
interface Skill {
  name: string;
  icon: React.ReactNode;
  circleBg?: string;
}

function cdnIcon(path: string, invertDark = false, bg?: string): React.ReactNode {
  return (
    <div
      className="w-[30px] h-[30px] flex items-center justify-center rounded-full"
      style={bg ? { background: bg } : {}}
    >
      <img
        src={`${CDN}/${path}`}
        alt=""
        width={26}
        height={26}
        loading="lazy"
        style={{ objectFit: 'contain' }}
        className={invertDark ? 'brightness-0 invert' : ''}
      />
    </div>
  );
}

// ── Skill Lists ───────────────────────────────────────────────────────────────

const frontend: Skill[] = [
  { name: 'HTML5',          icon: cdnIcon('html5/html5-original.svg') },
  { name: 'CSS3',           icon: cdnIcon('css3/css3-original.svg') },
  { name: 'JavaScript',     icon: cdnIcon('javascript/javascript-original.svg') },
  { name: 'TypeScript',     icon: cdnIcon('typescript/typescript-original.svg') },
  { name: 'React',          icon: cdnIcon('react/react-original.svg') },
  { name: 'Next.js',        icon: cdnIcon('nextjs/nextjs-original.svg', false, '#fff') },
  { name: 'Tailwind CSS',   icon: cdnIcon('tailwindcss/tailwindcss-original.svg') },
  { name: 'Bootstrap',      icon: cdnIcon('bootstrap/bootstrap-original.svg') },
  { name: 'shadcn/ui',      icon: <ShadcnSVG />, circleBg: '#18181b' },
  { name: 'DaisyUI',        icon: <DaisyUISVG />, circleBg: '#1d232a' },
  { name: 'Framer Motion',  icon: <FramerSVG />, circleBg: '#0d0d0d' },
];

const backend: Skill[] = [
  { name: 'Node.js',        icon: cdnIcon('nodejs/nodejs-original.svg') },
  { name: 'Express.js',     icon: cdnIcon('express/express-original.svg', true) },
  { name: 'REST API',       icon: cdnIcon('postman/postman-original.svg') },
  { name: 'Prisma ORM',     icon: cdnIcon('prisma/prisma-original.svg', true) },
  { name: 'JWT Auth',       icon: <JWTIcon /> },
  { name: 'OAuth',          icon: <OAuthIcon /> },
  { name: 'Better Auth',    icon: <BetterAuthIcon /> },
  { name: 'PostgreSQL',     icon: cdnIcon('postgresql/postgresql-original.svg') },
  { name: 'MongoDB',        icon: cdnIcon('mongodb/mongodb-original.svg') },
  { name: 'Firebase',       icon: cdnIcon('firebase/firebase-plain.svg') },
  { name: 'Supabase',       icon: cdnIcon('supabase/supabase-original.svg') },
];

const toolsDevOps: Skill[] = [
  { name: 'Git',            icon: cdnIcon('git/git-original.svg') },
  { name: 'GitHub',         icon: cdnIcon('github/github-original.svg', true) },
  { name: 'VS Code',        icon: cdnIcon('vscode/vscode-original.svg') },
  { name: 'Postman',        icon: cdnIcon('postman/postman-original.svg') },
  { name: 'Figma',          icon: cdnIcon('figma/figma-original.svg') },
  { name: 'Vercel',         icon: <VercelSVG />, circleBg: '#000' },
  { name: 'Netlify',        icon: <NetlifySVG /> },
  { name: 'Cloudflare',     icon: cdnIcon('cloudflare/cloudflare-original.svg') },
  { name: 'Stripe',         icon: <StripeSVG /> },
  { name: 'SSLCommerz',     icon: <SSLCommerzSVG /> },
];

// ── Skill Card ─────────────────────────────────────────────────────────────────

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center border border-slate-200/80 dark:border-white/10 shadow-sm transition-transform duration-200 hover:scale-105"
        style={{
          background: skill.circleBg ?? 'rgba(255, 255, 255, 0.05)',
        }}
      >
        {skill.icon}
      </div>
      <span className="text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 text-center leading-tight max-w-[60px]">
        {skill.name}
      </span>
    </div>
  );
}

// ── Category Card ──────────────────────────────────────────────────────────────

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

function SkillCategory({ title, icon, skills }: CategoryProps) {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <span className="text-indigo-600 dark:text-indigo-400">{icon}</span>
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">{title}</h3>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-5">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function Skills() {
  return (
    <section id="skills" className="py-14 sm:py-16 relative overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full glass-pill text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Technologies and tools I use to build modern, scalable products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCategory
            title="Frontend"
            icon={<Code2 className="w-5 h-5" />}
            skills={frontend}
          />
          <SkillCategory
            title="Backend & Database"
            icon={<Server className="w-5 h-5" />}
            skills={backend}
          />
          <SkillCategory
            title="Tools & DevOps"
            icon={<Briefcase className="w-5 h-5" />}
            skills={toolsDevOps}
          />
        </div>

      </div>
    </section>
  );
}
