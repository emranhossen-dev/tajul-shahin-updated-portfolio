import React from 'react';

// Devicon CDN base — official, pixel-perfect brand icons
const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

interface IconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

// ── Official Brand Icons via Devicon CDN ─────────────────────────────────────

export function NextjsIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/nextjs/nextjs-original.svg`}
      alt="Next.js"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function ReactIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/react/react-original.svg`}
      alt="React"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function TypescriptIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/typescript/typescript-original.svg`}
      alt="TypeScript"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function JavascriptIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/javascript/javascript-original.svg`}
      alt="JavaScript"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function TailwindIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/tailwindcss/tailwindcss-original.svg`}
      alt="Tailwind CSS"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function ReduxIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/redux/redux-original.svg`}
      alt="Redux"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function Html5Icon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/html5/html5-original.svg`}
      alt="HTML5"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function Css3Icon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/css3/css3-original.svg`}
      alt="CSS3"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function NodejsIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/nodejs/nodejs-original.svg`}
      alt="Node.js"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function ExpressIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/express/express-original.svg`}
      alt="Express.js"
      width={size}
      height={size}
      className={`${className} brightness-0 invert`}
      style={style}
      loading="lazy"
    />
  );
}

export function PostgresIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/postgresql/postgresql-original.svg`}
      alt="PostgreSQL"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function MongodbIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/mongodb/mongodb-original.svg`}
      alt="MongoDB"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function PrismaIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/prisma/prisma-original.svg`}
      alt="Prisma"
      width={size}
      height={size}
      className={`${className} brightness-0 invert`}
      style={style}
      loading="lazy"
    />
  );
}

export function FirebaseIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/firebase/firebase-plain.svg`}
      alt="Firebase"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function SupabaseIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/supabase/supabase-original.svg`}
      alt="Supabase"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function GitIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/git/git-original.svg`}
      alt="Git"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function FigmaIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/figma/figma-original.svg`}
      alt="Figma"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function PostmanIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/postman/postman-original.svg`}
      alt="Postman"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function VercelIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 512 512" width={size} height={size} className={className} style={style}>
      <path d="M256 48L496 464H16L256 48Z" fill="white" />
    </svg>
  );
}

export function GithubIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/github/github-original.svg`}
      alt="GitHub"
      width={size}
      height={size}
      className={`${className} brightness-0 invert`}
      style={style}
      loading="lazy"
    />
  );
}

export function VscodeIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/vscode/vscode-original.svg`}
      alt="VS Code"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function AwsIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg`}
      alt="AWS"
      width={size}
      height={size}
      className={`${className} brightness-0 invert`}
      style={style}
      loading="lazy"
    />
  );
}

export function NginxIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/nginx/nginx-original.svg`}
      alt="Nginx"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function LinuxIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <img
      src={`${CDN}/linux/linux-original.svg`}
      alt="Linux"
      width={size}
      height={size}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

export function ZustandIcon({ size = 28, className = '', style }: IconProps) {
  // Zustand doesn't have a devicon, use a custom bear emoji-based icon
  return (
    <div
      className={`flex items-center justify-center rounded font-bold text-white text-xs ${className}`}
      style={{ width: size, height: size, background: '#FF8C00', ...style }}
    >
      🐻
    </div>
  );
}

export function StripeIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} style={style} fill="none">
      <rect width="40" height="40" rx="6" fill="#6772E5" />
      <path d="M20.2 16.3c0-.9.7-1.2 1.9-1.2 1.7 0 3.8.5 5.5 1.4V11c-1.8-.7-3.7-1-5.5-1-4.5 0-7.5 2.3-7.5 6.2 0 6 8.3 5 8.3 7.6 0 1-.9 1.4-2.2 1.4-1.9 0-4.3-.8-6.2-1.9v5.5c2.1.9 4.2 1.3 6.2 1.3 4.7 0 7.9-2.3 7.9-6.3-.1-6.5-8.4-5.3-8.4-7.5z" fill="white" />
    </svg>
  );
}

export function TanstackIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <div
      className={`flex items-center justify-center rounded font-black text-white text-[10px] ${className}`}
      style={{ width: size, height: size, background: '#EF4444', ...style }}
    >
      TQ
    </div>
  );
}

export function ShadcnUiIcon({ size = 28, className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
