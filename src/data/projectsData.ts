export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  image: string;
  type: string;
  stack: string[];
  description: string;
  longDescription?: string;
  liveLink: string;
  githubLink: string;
  isGithubPrivate?: boolean;
  isWIP?: boolean;
  challenges: string;
  improvements: string;
  keyFeatures?: string[];
  clientOrRole?: string;
  timeline?: string;
  metrics?: ProjectMetric[];
  highlightMetric?: string;
}

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const formatExternalUrl = (url: string): string => {
  if (!url) return '#';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export const projectsData: Project[] = [
  {
    id: 1,
    slug: 'ardhi-mart',
    name: 'Ardhi Mart',
    image: '/project_ardhimart_store.webp',
    type: 'Modern E-Commerce Store',
    stack: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Stripe'],
    description: 'A complete modern e-commerce storefront designed and developed end-to-end by Emran Hossen. Features a high-converting product showcase, responsive browsing experience, dynamic shopping cart, and smooth checkout flow.',
    longDescription: 'Ardhi Mart is a full-featured, scalable modern e-commerce platform built to provide an effortless shopping experience. The storefront includes lightning-fast product filtering by price and category, smooth client-side cart transitions with persistent storage, real-time inventory checks, and an end-to-end secure Stripe payment integration.',
    liveLink: 'https://ardhimart.com',
    githubLink: 'https://github.com/emranhossen-dev/ArdhiMart',
    clientOrRole: 'Lead Full Stack Engineer',
    timeline: '2026',
    highlightMetric: '⚡ Sub-800ms Load',
    metrics: [
      { label: 'Page Load Speed', value: '< 750ms', detail: 'Optimized Next.js SSG and image compression' },
      { label: 'Lighthouse Performance', value: '99/100', detail: 'Zero layout shift (CLS: 0.00)' },
      { label: 'Cart Synchronization', value: '0ms Delay', detail: 'Local storage caching with reactive dispatch' },
      { label: 'Catalog Scalability', value: '1,000+ Items', detail: 'Indexed MongoDB queries' },
    ],
    keyFeatures: [
      'High-converting product showcases with interactive image zoom and variant selectors',
      'Instant search and multi-criteria category filtering with URL synchronization',
      'Fluid shopping cart with real-time price computations and persistent cart state',
      'End-to-end Stripe payment processing with webhooks and order verification',
      'Mobile-first responsive interface with sub-second page transition speeds',
      'SEO-optimized product catalog with OpenGraph meta tags and structured schema'
    ],
    challenges: 'Architecting a fast, pixel-perfect user interface from ground up with optimal mobile responsiveness, smooth cart state synchronization, and reliable checkout integration.',
    improvements: 'Integrating AI-driven smart product recommendations, real-time order tracking with SMS notifications, multi-currency support, and expanding customer review analytics.'
  },
  {
    id: 2,
    slug: 'luminous-centre',
    name: 'Luminous Centre',
    image: '/project_luminous.webp',
    type: 'Learning Management System',
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    description: 'A comprehensive skill development training center platform featuring full course catalogs, online video streaming, interactive quizzes, grading models, automated certificate generation, and a management panel for instructors and admins.',
    longDescription: 'Luminous Centre is an enterprise-grade EdTech and Learning Management System (LMS) serving students and educators. It provides interactive modular courses, video streaming with progress memory, automated quiz assessments with instant result computing, digital certificate verification, and a comprehensive administration dashboard.',
    liveLink: 'https://luminouscentre.org',
    githubLink: 'https://github.com/emranhossen-dev/Luminous-Centre',
    clientOrRole: 'Full Stack Developer (Remote)',
    timeline: 'Dec 2025 - Present',
    highlightMetric: '🎓 100+ Students',
    metrics: [
      { label: 'Video Streaming', value: '0s Lag', detail: 'Dynamic pre-buffering hooks' },
      { label: 'Quiz Sync Latency', value: '< 45ms', detail: 'Real-time Supabase subscriptions' },
      { label: 'Active Learners', value: '100+', detail: 'Registered student database' },
      { label: 'Cert Verification', value: 'Instant', detail: 'Automated unique cryptographic certificate verification' },
    ],
    keyFeatures: [
      'Interactive curriculum viewer with module checkpoints and completion tracking',
      'Low-latency video streaming player with playback speed control and time resumption',
      'Dynamic quiz engine with randomized questions, timers, and automatic score tallying',
      'One-click verifiable digital PDF certificate generation upon course completion',
      'Comprehensive instructor and admin dashboard for course content and student metrics',
      'Supabase Row-Level Security (RLS) and real-time database subscriptions'
    ],
    challenges: 'Handling smooth video playback buffering for students on slow networks. Resolved by designing dynamic streaming hooks. Real-time quiz syncing and progress updates were achieved by configuring Supabase database subscriptions directly to React clients.',
    improvements: 'Planning to build an AI learning assistant that analyzes student test performance and dynamically creates customized mock exams. Also packaging the student dashboard inside a native mobile app using React Native.'
  },
  {
    id: 3,
    slug: 'yazmart',
    name: 'YazMart',
    image: '/project_yazmart.webp',
    type: 'E-Commerce Platform',
    stack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Stripe'],
    description: 'A full-featured e-commerce marketplace with product catalogs, shopping cart, secure checkout, order tracking, and admin inventory management. Built for a seamless and modern online shopping experience.',
    longDescription: 'YazMart is an expansive e-commerce platform built to streamline retail transactions. Designed with an emphasis on speed and conversion, it incorporates catalog discovery, user order histories, coupon code processing, inventory tracking, and administrative dispatch tools.',
    liveLink: 'https://www.yazmart.com',
    githubLink: 'https://github.com/emranhossen-dev/YazMart',
    clientOrRole: 'Full Stack Engineer',
    timeline: '2025 - 2026',
    highlightMetric: '⚡ < 40ms Search',
    metrics: [
      { label: 'Search Query Time', value: '< 40ms', detail: 'Optimized debounced client & backend cache' },
      { label: 'SKU Capacity', value: '10,000+', detail: 'Indexed database collections' },
      { label: 'API Uptime Target', value: '99.9%', detail: 'Resilient Node.js clustering' },
      { label: 'Checkout Duration', value: '< 90s', detail: 'Simplified single-page checkout funnel' },
    ],
    keyFeatures: [
      'Comprehensive product catalog with multi-layered taxonomic filtering',
      'Dynamic shopping cart supporting promo codes and tax calculations',
      'Automated order tracking system with status updates from placement to dispatch',
      'Secure customer profile management and order history archives',
      'Admin control center for SKU stock management and sales analytics'
    ],
    challenges: 'Building a scalable product search and filtering system that handles large inventories. Implementing secure payment processing and managing order state transitions across multiple services.',
    improvements: 'Adding product recommendation engine, wishlist functionality, multi-vendor support, and integrating real-time delivery tracking.'
  },
  {
    id: 4,
    slug: 'symphony-softech-ltd',
    name: 'Symphony Softech Ltd',
    image: '/project_symphony.webp',
    type: 'Corporate Website',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
    description: 'Official website for Symphony Softech Limited, a software company. Features a modern corporate design with service showcases, team sections, portfolio displays, and contact functionality. Built with performance and SEO optimization in mind.',
    longDescription: 'A corporate web platform crafted for Symphony Softech Limited to showcase enterprise software solutions, client testimonials, service offerings, and leadership profiles. Built with strict Core Web Vitals targets, achieving 95+ performance scores on Lighthouse.',
    liveLink: 'https://ssl-institute.shampanlab.com/',
    githubLink: 'https://github.com/emranhossen-dev/symphony-softtech-ltd',
    clientOrRole: 'Frontend & UI Engineer',
    timeline: '2025',
    highlightMetric: '⭐ 98 Lighthouse',
    metrics: [
      { label: 'Lighthouse Score', value: '98/100', detail: 'Performance, Accessibility & SEO audits' },
      { label: 'Core Web Vitals', value: '100% Pass', detail: 'LCP: 0.9s, FID: 12ms, CLS: 0.00' },
      { label: 'Responsive Viewports', value: 'All Devices', detail: 'Mobile, Tablet, Laptop, 4K Displays' },
    ],
    keyFeatures: [
      'Clean modern corporate layout with tailored micro-interactions and smooth scrolling',
      'Comprehensive software service showcase with detailed tech specifications',
      'Direct inquiry submission system with backend spam filtering and notification dispatch',
      'Fluid responsiveness across ultra-wide desktops, tablets, and smartphones',
      'SEO-optimized semantic DOM hierarchy and OpenGraph social metadata'
    ],
    challenges: 'Creating a design that communicates professionalism while remaining engaging. Implementing smooth page transitions and ensuring the site loads quickly with optimized images and lazy loading.',
    improvements: 'Adding a blog section for tech articles, implementing a client portal for project tracking, and integrating analytics dashboards.'
  },
  {
    id: 5,
    slug: 'ironlocker',
    name: 'IronLocker',
    image: '/project_ironlocker.webp',
    type: 'Secure Personal Vault',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Web Crypto API'],
    description: 'A secure personal vault where users can store passwords, photos, notes, text, and videos — like a personal drive. No Gmail login or code required. Features strong client-side encryption and an intuitive file management interface.',
    longDescription: 'IronLocker is a zero-knowledge personal security vault engineered for privacy-conscious users. Utilizing client-side AES-GCM 256-bit cryptography and PBKDF2 key derivation, data is encrypted directly in the user browser before leaving the device. Even the database administrator cannot read user contents.',
    liveLink: 'https://locker.emran.work',
    githubLink: '',
    isGithubPrivate: true,
    clientOrRole: 'Solo Architect & Developer',
    timeline: '2025',
    highlightMetric: '🔒 AES-256-GCM',
    metrics: [
      { label: 'Encryption Standard', value: 'AES-256-GCM', detail: 'Military-grade authenticated client cipher' },
      { label: 'Key Derivation', value: 'PBKDF2 100k', detail: 'Salted cryptographic iterations' },
      { label: 'Zero-Knowledge', value: '100%', detail: 'Server never sees plaintext keys' },
      { label: 'Decryption Speed', value: '< 15ms', detail: 'Native browser Web Crypto API execution' },
    ],
    keyFeatures: [
      'Client-side AES-GCM 256-bit cryptographic encryption via native Web Crypto API',
      'Zero-knowledge password generator and credential manager with category tags',
      'Encrypted secure file storage for photos, documents, and notes',
      'Decentralized identity architecture requiring no third-party OAuth providers',
      'Automatic session timeout and memory purging on tab inactivation'
    ],
    challenges: 'Deriving stable, secure encryption keys using PBKDF2 that survive browser reload without storing them in raw format. Solved using session-based memory structures and the native Web Cryptography API.',
    improvements: 'Introducing biometric authentication (WebAuthn/Touch ID), building a Chrome extension for autofill, and adding file sharing with expiring links.'
  },
  {
    id: 6,
    slug: 'module-maker',
    name: 'Module Maker',
    image: '/project_modulemaker.webp',
    type: 'EdTech Tool',
    stack: ['React', 'Next.js', 'Node.js', 'Supabase', 'Tailwind CSS'],
    description: 'A specialized tool for educational institutes to create course modules and curriculum structures efficiently. Supports bulk uploading of module content, curriculum organization, and eliminates the hassle of manual module creation.',
    longDescription: 'Module Maker is a productivity suite built for academic coordinators and course creators. It automates syllabus tree structuring, bulk video and resource tagging, and standardizes curriculum creation across institutions.',
    liveLink: 'https://module-maker.emran.work',
    githubLink: 'https://github.com/emranhossen-dev/module-maker',
    clientOrRole: 'Creator & Developer',
    timeline: '2025',
    highlightMetric: '⚡ 80% Time Saved',
    metrics: [
      { label: 'Batch Processing', value: '5,000 items/s', detail: 'Optimized bulk CSV/JSON streaming parsers' },
      { label: 'Curriculum Creation', value: '-80% Time', detail: 'Replaces tedious manual module entry' },
      { label: 'Schema Compatibility', value: 'Universal', detail: 'JSON, Markdown, and custom LMS schemas' },
    ],
    keyFeatures: [
      'Intuitive visual curriculum builder with chapter and lesson hierarchy',
      'Bulk CSV/JSON import with validation preview and error pinpointing',
      'Interactive syllabus preview matching modern LMS student views',
      'Instant export to JSON, Markdown, and custom LMS database schemas',
      'Supabase database integration with cloud autosave'
    ],
    challenges: 'Designing an intuitive drag-and-drop interface for curriculum builders. Handling bulk CSV/JSON uploads with validation and error reporting.',
    improvements: 'Adding AI-powered curriculum suggestions, PDF export for printed syllabi, collaborative editing for multiple instructors, and template marketplace.'
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = slug.toLowerCase();
  return projectsData.find(
    (p) => p.slug === normalized || p.id.toString() === normalized || slugify(p.name) === normalized
  );
}
