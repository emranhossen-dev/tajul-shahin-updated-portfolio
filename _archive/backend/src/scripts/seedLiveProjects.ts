import { pool, query } from '../config/db.js';

async function seedLiveProjects() {
  console.log('Connecting to Neon PostgreSQL to seed 6 live projects...');

  try {
    // 1. Clear existing projects to replace with exact 6 live projects
    await query('TRUNCATE TABLE projects RESTART IDENTITY CASCADE');

    const projects = [
      {
        name: 'Ardhi Mart',
        slug: 'ardhi-mart',
        type: 'Modern E-Commerce Store',
        image_url: 'https://emran.work/project_ardhimart_store.webp',
        description: 'A complete modern e-commerce storefront designed and developed end-to-end by Emran Hossen. Features a high-converting product showcase, responsive browsing experience, dynamic shopping cart, and smooth checkout flow.',
        stack: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Stripe'],
        live_link: 'https://ardhimart.com',
        github_link: 'https://github.com/emranhossen-dev/ArdhiMart',
        is_github_private: false,
        is_wip: false,
        challenges: 'Architecting a fast, pixel-perfect user interface from ground up with optimal mobile responsiveness, smooth cart state synchronization, and reliable checkout integration.',
        improvements: 'Integrating AI-driven smart product recommendations, real-time order tracking with SMS notifications, multi-currency support, and expanding customer review analytics.',
        display_order: 1,
      },
      {
        name: 'Luminous Centre',
        slug: 'luminous-centre',
        type: 'Learning Management System',
        image_url: 'https://emran.work/project_luminous.webp',
        description: 'A comprehensive skill development training center platform featuring full course catalogs, online video streaming, interactive quizzes, grading models, automated certificate generation, and a management panel for instructors and admins.',
        stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
        live_link: 'https://luminouscentre.org',
        github_link: 'https://github.com/emranhossen-dev/Luminous-Centre',
        is_github_private: false,
        is_wip: false,
        challenges: 'Handling smooth video playback buffering for students on slow networks. Resolved by designing dynamic streaming hooks. Real-time quiz syncing and progress updates were achieved by configuring Supabase database subscriptions directly to React clients.',
        improvements: 'Planning to build an AI learning assistant that analyzes student test performance and dynamically creates customized mock exams. Also packaging the student dashboard inside a native mobile app using React Native.',
        display_order: 2,
      },
      {
        name: 'YazMart',
        slug: 'yazmart',
        type: 'E-Commerce Platform',
        image_url: 'https://emran.work/project_yazmart.webp',
        description: 'A full-featured e-commerce marketplace with product catalogs, shopping cart, secure checkout, order tracking, and admin inventory management. Built for a seamless and modern online shopping experience.',
        stack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Stripe'],
        live_link: 'https://www.yazmart.com',
        github_link: 'https://github.com/emranhossen-dev/YazMart',
        is_github_private: false,
        is_wip: false,
        challenges: 'Building a scalable product search and filtering system that handles large inventories. Implementing secure payment processing and managing order state transitions across multiple services.',
        improvements: 'Adding product recommendation engine, wishlist functionality, multi-vendor support, and integrating real-time delivery tracking.',
        display_order: 3,
      },
      {
        name: 'Symphony Softech Ltd',
        slug: 'symphony-softech',
        type: 'Corporate Website',
        image_url: 'https://emran.work/project_symphony.webp',
        description: 'Official website for Symphony Softech Limited, a software company. Features a modern corporate design with service showcases, team sections, portfolio displays, and contact functionality. Built with performance and SEO optimization in mind.',
        stack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
        live_link: 'https://ssl-institute.shampanlab.com/',
        github_link: 'https://github.com/emranhossen-dev/symphony-softtech-ltd',
        is_github_private: false,
        is_wip: false,
        challenges: 'Creating a design that communicates professionalism while remaining engaging. Implementing smooth page transitions and ensuring the site loads quickly with optimized images and lazy loading.',
        improvements: 'Adding a blog section for tech articles, implementing a client portal for project tracking, and integrating analytics dashboards.',
        display_order: 4,
      },
      {
        name: 'IronLocker',
        slug: 'ironlocker',
        type: 'Secure Personal Vault',
        image_url: 'https://emran.work/project_ironlocker.webp',
        description: 'A secure personal vault where users can store passwords, photos, notes, text, and videos — like a personal drive. No Gmail login or code required. Features strong client-side encryption and an intuitive file management interface.',
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Web Crypto API'],
        live_link: 'https://locker.emran.work',
        github_link: '',
        is_github_private: true,
        is_wip: false,
        challenges: 'Deriving stable, secure encryption keys using PBKDF2 that survive browser reload without storing them in raw format. Solved using session-based memory structures and the native Web Cryptography API.',
        improvements: 'Introducing biometric authentication (WebAuthn/Touch ID), building a Chrome extension for autofill, and adding file sharing with expiring links.',
        display_order: 5,
      },
      {
        name: 'Module Maker',
        slug: 'module-maker',
        type: 'EdTech Tool',
        image_url: 'https://emran.work/project_modulemaker.webp',
        description: 'A specialized tool for educational institutes to create course modules and curriculum structures efficiently. Supports bulk uploading of module content, curriculum organization, and eliminates the hassle of manual module creation.',
        stack: ['React', 'Next.js', 'Node.js', 'Supabase', 'Tailwind CSS'],
        live_link: 'https://module-maker.emran.work',
        github_link: 'https://github.com/emranhossen-dev/module-maker',
        is_github_private: false,
        is_wip: false,
        challenges: 'Designing an intuitive drag-and-drop interface for curriculum builders. Handling bulk CSV/JSON uploads with validation and error reporting.',
        improvements: 'Adding AI-powered curriculum suggestions, PDF export for printed syllabi, collaborative editing for multiple instructors, and template marketplace.',
        display_order: 6,
      },
    ];

    for (const p of projects) {
      await query(
        `INSERT INTO projects (name, slug, type, image_url, description, stack, live_link, github_link, is_github_private, is_wip, challenges, improvements, display_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [p.name, p.slug, p.type, p.image_url, p.description, p.stack, p.live_link, p.github_link, p.is_github_private, p.is_wip, p.challenges, p.improvements, p.display_order]
      );
      console.log(`✓ Seeded project: ${p.name}`);
    }

    console.log('\n🎉 All 6 live website projects have been successfully seeded into Neon PostgreSQL!');
  } catch (error) {
    console.error('Error seeding projects:', error);
  } finally {
    await pool.end();
  }
}

seedLiveProjects();
