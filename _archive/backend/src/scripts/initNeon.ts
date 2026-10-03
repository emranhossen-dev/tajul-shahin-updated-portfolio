import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

async function initNeon() {
  console.log('Connecting to Neon PostgreSQL...');
  const client = await pool.connect();

  try {
    console.log('Connected! Creating database schema...');

    // 1. Create Messages Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        replied BOOLEAN DEFAULT FALSE,
        reply_text TEXT,
        replied_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
    `);
    console.log('✓ Messages table verified.');

    // 2. Create Projects Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE,
        type VARCHAR(100) NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT NOT NULL,
        stack TEXT[] NOT NULL DEFAULT '{}',
        live_link TEXT NOT NULL,
        github_link TEXT,
        is_github_private BOOLEAN DEFAULT FALSE,
        is_wip BOOLEAN DEFAULT FALSE,
        challenges TEXT,
        improvements TEXT,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order ASC);
    `);
    console.log('✓ Projects table verified.');

    // 3. Create Admin Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name VARCHAR(100) DEFAULT 'Emran Hossen',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✓ Admin users table verified.');

    // 4. Seed Default Admin User
    const adminEmail = 'dev@emran.work';
    const checkAdmin = await client.query('SELECT id FROM admin_users WHERE email = $1', [adminEmail]);
    if (checkAdmin.rows.length === 0) {
      const passwordHash = await bcrypt.hash('Admin@12345', 10);
      await client.query(
        'INSERT INTO admin_users (email, password_hash, name) VALUES ($1, $2, $3)',
        [adminEmail, passwordHash, 'Emran Hossen']
      );
      console.log('✓ Default admin seeded (dev@emran.work / Admin@12345)');
    } else {
      console.log('✓ Admin user already exists.');
    }

    // 5. Seed Initial Projects if empty
    const checkProjects = await client.query('SELECT COUNT(*) FROM projects');
    const projectCount = parseInt(checkProjects.rows[0].count, 10);

    if (projectCount === 0) {
      console.log('Seeding showcase projects...');
      const initialProjects = [
        {
          name: 'ArdhiMart - Premium Full-Stack E-Commerce',
          slug: 'ardhimart-e-commerce',
          type: 'Full-Stack Web App',
          image_url: 'https://i.ibb.co.com/tTrcZk43/project-ardhimart-clean.jpg',
          description: 'A modern, high-performance e-commerce platform built with Next.js 15, PostgreSQL, and Stripe integration.',
          stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
          live_link: 'https://ardhimart.com',
          github_link: 'https://github.com/emranhossen-dev/ArdhiMart',
          is_github_private: false,
          is_wip: false,
          display_order: 1,
        },
        {
          name: 'TaskFlow - Enterprise Workflow Management',
          slug: 'taskflow-management',
          type: 'SaaS Platform',
          image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
          description: 'Team collaboration and kanban task management platform with real-time updates and analytics.',
          stack: ['React', 'Node.js', 'Express', 'Socket.io', 'PostgreSQL'],
          live_link: 'https://taskflow-demo.vercel.app',
          github_link: 'https://github.com/emranhossen-dev/taskflow',
          is_github_private: false,
          is_wip: false,
          display_order: 2,
        },
        {
          name: 'DevPulse - Developer Activity & Metrics Dashboard',
          slug: 'devpulse-metrics',
          type: 'Analytics Tool',
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
          description: 'Aggregates GitHub metrics, CI/CD telemetry, and code coverage into interactive charts.',
          stack: ['Next.js', 'Chart.js', 'Tailwind CSS', 'GitHub API'],
          live_link: 'https://devpulse.work',
          github_link: 'https://github.com/emranhossen-dev/devpulse',
          is_github_private: false,
          is_wip: false,
          display_order: 3,
        },
      ];

      for (const p of initialProjects) {
        await client.query(
          `INSERT INTO projects (name, slug, type, image_url, description, stack, live_link, github_link, is_github_private, is_wip, display_order)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [p.name, p.slug, p.type, p.image_url, p.description, p.stack, p.live_link, p.github_link, p.is_github_private, p.is_wip, p.display_order]
        );
      }
      console.log('✓ Initial projects successfully seeded into Neon PostgreSQL!');
    } else {
      console.log(`✓ Database already has ${projectCount} projects.`);
    }

    console.log('\n🎉 Neon PostgreSQL is completely initialized and ready for production!');
  } catch (err) {
    console.error('Error during Neon initialization:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

initNeon();
