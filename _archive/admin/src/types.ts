export interface Project {
  id: string | number;
  name: string;
  title?: string; // alias for name
  slug?: string;
  type: string;
  image_url: string;
  description: string;
  stack: string[];
  tags?: string[]; // alias for stack
  live_link: string;
  live_url?: string; // alias for live_link
  github_link?: string;
  github_url?: string; // alias for github_link
  is_github_private?: boolean;
  is_wip?: boolean;
  challenges?: string;
  improvements?: string;
  featured?: boolean;
  display_order?: number;
  order_index?: number; // alias for display_order
  created_at?: string;
  updated_at?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  reply_text?: string;
  replied_at?: string;
  created_at: string;
}

export interface AdminStats {
  totalMessages: number;
  unreadMessages: number;
  repliedMessages: number;
  totalProjects: number;
}
