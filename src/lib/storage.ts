import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import {
  LeadMessage,
  PackageItem,
  CaseStudyItem,
  ProfileConfig,
  SiteContent,
  defaultSiteContent,
} from './types';

export * from './types';

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  tag: string;
  description: string;
  metric1: { label: string; value: string };
  metric2: { label: string; value: string };
  image: string;
}

// Neon PostgreSQL connection pool (fail-safe)
let pool: Pool | null = null;
if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
    });
  } catch (err) {
    console.warn('PostgreSQL pool creation failed, using file fallback.', err);
    pool = null;
  }
}

const DATA_DIR = path.join(process.cwd(), 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readLocalMessages(): LeadMessage[] {
  ensureDataDir();
  if (!fs.existsSync(MESSAGES_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local messages:', err);
    return [];
  }
}

function writeLocalMessages(messages: LeadMessage[]) {
  ensureDataDir();
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local messages:', err);
  }
}

// Default initial case studies from Tajul's verified stats (backward compatibility)
export const defaultCaseStudies: CaseStudy[] = defaultSiteContent.caseStudies.map(c => ({
  id: c.id,
  title: c.title,
  client: c.category,
  tag: c.category,
  description: c.description,
  metric1: c.metric1,
  metric2: c.metric2,
  image: c.image,
}));

export async function addMessage(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  subject?: string;
}): Promise<LeadMessage> {
  const newMsg: LeadMessage = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim(),
    service: data.service?.trim() || 'Paid Advertising (Meta & Google)',
    budget: data.budget?.trim() || 'Flexible',
    message: data.message.trim(),
    subject: data.subject?.trim() || 'Growth Strategy Inquiry',
    createdAt: new Date().toISOString(),
    read: false,
    replied: false,
  };

  // 1. Try writing to PostgreSQL
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO messages (name, email, subject, message)
         VALUES ($1, $2, $3, $4)`,
        [
          newMsg.name,
          newMsg.email,
          `${newMsg.service} [Budget: ${newMsg.budget}] ${newMsg.phone ? `Phone: ${newMsg.phone}` : ''}`,
          newMsg.message,
        ]
      );
    } catch (err) {
      console.warn('PostgreSQL insert failed, relying on file storage:', err);
    }
  }

  // 2. Always persist to local messages.json as well for local reliability
  const current = readLocalMessages();
  current.unshift(newMsg);
  writeLocalMessages(current);

  return newMsg;
}

export async function getAllMessages(): Promise<LeadMessage[]> {
  // Try reading from Postgres first if available
  if (pool) {
    try {
      const res = await pool.query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 100');
      if (res.rows && res.rows.length > 0) {
        return res.rows.map((row: any) => ({
          id: row.id?.toString() || `msg_${Math.random()}`,
          name: row.name || 'Anonymous',
          email: row.email || '',
          phone: row.phone || '',
          service: row.subject || 'Growth Inquiry',
          budget: '',
          message: row.message || '',
          subject: row.subject || '',
          createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
          read: Boolean(row.is_read),
          replied: false,
        }));
      }
    } catch (err) {
      console.warn('Postgres fetch messages failed, falling back to local file:', err);
    }
  }

  return readLocalMessages();
}

export async function markMessageRead(id: string, read: boolean = true) {
  if (pool) {
    try {
      await pool.query('UPDATE messages SET is_read = $1 WHERE id = $2', [read, id]);
    } catch (err) {
      console.warn('Postgres mark read failed:', err);
    }
  }

  const list = readLocalMessages();
  const item = list.find((m) => m.id === id);
  if (item) {
    item.read = read;
    writeLocalMessages(list);
  }
}

export async function deleteMessage(id: string) {
  if (pool) {
    try {
      await pool.query('DELETE FROM messages WHERE id = $1', [id]);
    } catch (err) {
      console.warn('Postgres delete message failed:', err);
    }
  }

  const list = readLocalMessages().filter((m) => m.id !== id);
  writeLocalMessages(list);
}

const CONTENT_FILE = path.join(DATA_DIR, 'content.json');

export async function getSiteContent(): Promise<SiteContent> {
  // 1. Try reading from Postgres first
  if (pool) {
    try {
      const res = await pool.query("SELECT data FROM site_content WHERE key = 'main' LIMIT 1");
      if (res.rows && res.rows.length > 0 && res.rows[0].data) {
        return res.rows[0].data as SiteContent;
      }
    } catch (err) {
      console.warn('Postgres get site_content failed, falling back to local file:', err);
    }
  }

  // 2. Try reading from local content.json
  ensureDataDir();
  if (fs.existsSync(CONTENT_FILE)) {
    try {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading local content.json:', e);
    }
  }

  // 3. Fallback to defaultSiteContent
  return defaultSiteContent;
}

export async function updateSiteContent(data: Partial<SiteContent>): Promise<SiteContent> {
  const current = await getSiteContent();
  const updated: SiteContent = {
    ...current,
    ...data,
    profile: { ...current.profile, ...(data.profile || {}) },
    packages: data.packages || current.packages,
    caseStudies: data.caseStudies || current.caseStudies,
  };

  // 1. Write to Postgres
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO site_content (key, data, updated_at)
         VALUES ('main', $1, NOW())
         ON CONFLICT (key)
         DO UPDATE SET data = $1, updated_at = NOW()`,
        [JSON.stringify(updated)]
      );
    } catch (err) {
      console.warn('Postgres update site_content failed:', err);
    }
  }

  // 2. Write to local content.json
  ensureDataDir();
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing content.json:', err);
  }

  return updated;
}

