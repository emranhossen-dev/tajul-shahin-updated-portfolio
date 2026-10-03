import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Mail,
  FolderGit2,
  FileText,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';
import { api } from './api/client';
import type { AdminStats } from './types';
import { Login } from './components/Login';
import { Overview } from './components/Overview';
import { Inbox } from './components/Inbox';
import { ProjectsManager } from './components/ProjectsManager';
import { ResumeManager } from './components/ResumeManager';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'projects' | 'resume'>('overview');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const checkAuth = async () => {
    setCheckingAuth(true);
    const valid = await api.verify();
    setIsAuthenticated(valid);
    setCheckingAuth(false);
    if (valid) {
      loadStats();
    }
  };

  const loadStats = async () => {
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onSuccess={() => { setIsAuthenticated(true); loadStats(); }} />;
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'messages', label: 'Inquiries / Inbox', icon: Mail, badge: stats?.unreadMessages },
    { id: 'projects', label: 'Projects Showcase', icon: FolderGit2, badge: stats?.totalProjects },
    { id: 'resume', label: 'Resume (Cloudflare R2)', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2.5 font-bold text-white">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span>Emran Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:flex flex-col w-full md:w-64 bg-slate-900/95 border-r border-slate-800 p-5 shrink-0`}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="font-bold text-white text-base tracking-tight">Emran Admin</div>
            <div className="text-[11px] text-emerald-400 font-medium">Control Dashboard</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {Boolean(item.badge) && item.badge! > 0 && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      item.id === 'messages'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Portfolio Live Link & Profile Footer */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <a
            href="https://emran.work"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-400 bg-slate-950/60 border border-slate-800/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visit Live Portfolio</span>
            </div>
          </a>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Emran Hossen</div>
              <div className="text-[11px] text-slate-500 truncate">dev@emran.work</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        {activeTab === 'overview' && (
          <Overview
            stats={stats}
            onNavigate={(tab) => {
              setActiveTab(tab as any);
              loadStats();
            }}
          />
        )}
        {activeTab === 'messages' && <Inbox />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'resume' && <ResumeManager />}
      </main>
    </div>
  );
};
export default App;
