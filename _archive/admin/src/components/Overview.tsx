import React from 'react';
import { Mail, MessageSquare, FolderGit2, FileText, Database, Cloud, Image as ImageIcon, ArrowUpRight } from 'lucide-react';
import type { AdminStats } from '../types';

interface OverviewProps {
  stats: AdminStats | null;
  onNavigate: (tab: string) => void;
}

export const Overview: React.FC<OverviewProps> = ({ stats, onNavigate }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-900 border border-emerald-500/20 p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Backend & Services Operational
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Admin!</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Manage your decoupled portfolio system with Supabase PostgreSQL, ImgBB for optimized image hosting, and Cloudflare R2 for resume object storage.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigate('messages')}
          className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
              <Mail className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats?.totalMessages ?? 0}</div>
          <div className="text-sm text-slate-400">Total Contact Inquiries</div>
        </div>

        <div 
          onClick={() => onNavigate('messages')}
          className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-semibold">
              Action Needed
            </span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats?.unreadMessages ?? 0}</div>
          <div className="text-sm text-slate-400">Unread Messages</div>
        </div>

        <div 
          onClick={() => onNavigate('projects')}
          className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-teal-400 transition-colors" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats?.totalProjects ?? 0}</div>
          <div className="text-sm text-slate-400">Published Projects</div>
        </div>

        <div 
          onClick={() => onNavigate('resume')}
          className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
              <FileText className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">R2 Active</div>
          <div className="text-sm text-slate-400">Resume & Documents</div>
        </div>
      </div>

      {/* Services Architecture Overview */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Integrated Infrastructure</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Supabase PostgreSQL</div>
              <p className="text-xs text-slate-400 mt-0.5">Primary relational database for messages, projects, and users.</p>
              <div className="mt-2 text-[11px] text-emerald-400 font-medium">● Connected</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">ImgBB Image CDN</div>
              <p className="text-xs text-slate-400 mt-0.5">High-speed image upload & CDN for project thumbnails.</p>
              <div className="mt-2 text-[11px] text-cyan-400 font-medium">● Configured</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Cloudflare R2 Storage</div>
              <p className="text-xs text-slate-400 mt-0.5">S3-compatible zero-egress object storage for PDF resume.</p>
              <div className="mt-2 text-[11px] text-orange-400 font-medium">● Ready</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
