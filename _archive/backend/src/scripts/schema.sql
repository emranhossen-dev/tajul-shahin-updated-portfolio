-- Supabase PostgreSQL Schema for Emran Hossen's Portfolio

-- 1. Create Messages Table
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

-- Index for sorting messages by creation date
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);

-- 2. Create Projects Table
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

-- 3. Create Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(100) DEFAULT 'Emran Hossen',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow Public to Read Projects
CREATE POLICY "Public can view projects" ON projects
  FOR SELECT USING (true);

-- Allow Public to Insert Contact Messages
CREATE POLICY "Public can submit messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Allow Service Role (Backend API) Full Access to All Tables
CREATE POLICY "Service Role full access to messages" ON messages
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service Role full access to projects" ON projects
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service Role full access to admin_users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');
