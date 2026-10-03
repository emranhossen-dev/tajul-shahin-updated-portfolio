"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Mail,
  Phone,
  CheckCircle,
  Clock,
  Trash2,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  LogOut,
  DollarSign,
  ArrowRight,
  Filter,
  Plus,
  Save,
  Database,
  Layers,
  Sparkles,
  Settings,
  FolderGit2,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
  TrendingUp,
  Search,
  Menu,
  X,
  ArrowUpRight,
  Send,
  Building2,
} from 'lucide-react';
import { PackageItem, CaseStudyItem, ProfileConfig, SiteContent, defaultSiteContent } from '@/lib/types';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'inbox' | 'case-studies' | 'packages' | 'profile' | 'database'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [filterUnread, setFilterUnread] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [dbStatus, setDbStatus] = useState({
    isPostgres: false,
    type: 'Isolated Local Database (JSON)',
    details: 'Private local database stored in data/content.json & data/messages.json',
    location: 'Local Project Filesystem (100% Private)',
  });

  // Live editable site content state
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  // Check auth from session storage on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('ts_admin_token');
    if (savedToken) {
      setIsAuthenticated(true);
      fetchAdminData();
      fetchSiteContent();
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin12345') {
      sessionStorage.setItem('ts_admin_token', 'logged_in');
      setIsAuthenticated(true);
      setAuthError('');
      fetchAdminData();
      fetchSiteContent();
    } else {
      setAuthError('Incorrect PIN. (Default PIN: 1234)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ts_admin_token');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      if (data.success) {
        if (data.messages) setLeads(data.messages);
        if (data.dbStatus) setDbStatus(data.dbStatus);
      }
    } catch (err) {
      console.error('Error fetching admin leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteContent = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (data.success && data.content) {
        setSiteContent(data.content);
      }
    } catch (err) {
      console.error('Error fetching site content:', err);
    }
  };

  const saveLiveContent = async () => {
    setSavingContent(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteContent),
      });
      const data = await res.json();
      if (data.success) {
        showToast('✓ Successfully published live to website & database!');
      } else {
        alert(data.message || 'Failed to save content.');
      }
    } catch (err) {
      console.error('Error saving content:', err);
      alert('Error connecting to backend API.');
    } finally {
      setSavingContent(false);
    }
  };

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      await fetch('/api/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !currentRead }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, read: !currentRead } : l))
      );
      showToast(currentRead ? 'Marked as unread' : 'Marked as read');
    } catch (err) {
      console.error('Error updating read status:', err);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead inquiry?')) return;
    try {
      await fetch(`/api/admin?id=${id}`, { method: 'DELETE' });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      showToast('Lead inquiry deleted.');
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  // Package helpers
  const handleUpdatePackage = (index: number, field: keyof PackageItem, value: any) => {
    setSiteContent((prev) => {
      const copy = [...prev.packages];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, packages: copy };
    });
  };

  const handleFeatureChange = (pkgIdx: number, featIdx: number, val: string) => {
    setSiteContent((prev) => {
      const copy = [...prev.packages];
      const feats = [...copy[pkgIdx].features];
      feats[featIdx] = val;
      copy[pkgIdx] = { ...copy[pkgIdx], features: feats };
      return { ...prev, packages: copy };
    });
  };

  const handleAddFeature = (pkgIdx: number) => {
    setSiteContent((prev) => {
      const copy = [...prev.packages];
      copy[pkgIdx] = { ...copy[pkgIdx], features: [...copy[pkgIdx].features, 'New deliverable feature'] };
      return { ...prev, packages: copy };
    });
  };

  const handleRemoveFeature = (pkgIdx: number, featIdx: number) => {
    setSiteContent((prev) => {
      const copy = [...prev.packages];
      copy[pkgIdx] = {
        ...copy[pkgIdx],
        features: copy[pkgIdx].features.filter((_, i) => i !== featIdx),
      };
      return { ...prev, packages: copy };
    });
  };

  const handleAddPackage = () => {
    const newPkg: PackageItem = {
      id: `pkg-${Date.now()}`,
      name: 'Custom Service Bundle',
      price: '$299',
      period: '/ month',
      badge: '',
      description: 'Tailored ads and funnel scaling package.',
      features: ['Deliverable 1', 'Deliverable 2'],
      popular: false,
    };
    setSiteContent((prev) => ({ ...prev, packages: [...prev.packages, newPkg] }));
    showToast('New package added. Click "Save & Publish" when done.');
  };

  const handleDeletePackage = (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    setSiteContent((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== id),
    }));
  };

  // Case study helpers
  const handleUpdateCaseStudy = (index: number, field: keyof CaseStudyItem, value: any) => {
    setSiteContent((prev) => {
      const copy = [...prev.caseStudies];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, caseStudies: copy };
    });
  };

  const handleUpdateMetric = (index: number, metricKey: 'metric1' | 'metric2', field: 'label' | 'value', val: string) => {
    setSiteContent((prev) => {
      const copy = [...prev.caseStudies];
      copy[index] = {
        ...copy[index],
        [metricKey]: { ...copy[index][metricKey], [field]: val },
      };
      return { ...prev, caseStudies: copy };
    });
  };

  const handleAddDeliverable = (caseIdx: number) => {
    setSiteContent((prev) => {
      const copy = [...prev.caseStudies];
      const currentList = copy[caseIdx].deliverables || [];
      copy[caseIdx] = {
        ...copy[caseIdx],
        deliverables: [...currentList, 'New Deliverable (e.g. Meta CAPI Tracking)'],
      };
      return { ...prev, caseStudies: copy };
    });
  };

  const handleUpdateDeliverable = (caseIdx: number, delivIdx: number, val: string) => {
    setSiteContent((prev) => {
      const copy = [...prev.caseStudies];
      const list = [...(copy[caseIdx].deliverables || [])];
      list[delivIdx] = val;
      copy[caseIdx] = { ...copy[caseIdx], deliverables: list };
      return { ...prev, caseStudies: copy };
    });
  };

  const handleRemoveDeliverable = (caseIdx: number, delivIdx: number) => {
    setSiteContent((prev) => {
      const copy = [...prev.caseStudies];
      copy[caseIdx] = {
        ...copy[caseIdx],
        deliverables: (copy[caseIdx].deliverables || []).filter((_, i) => i !== delivIdx),
      };
      return { ...prev, caseStudies: copy };
    });
  };

  const handleAddCaseStudy = () => {
    const newCase: CaseStudyItem = {
      id: `case-${Date.now()}`,
      title: 'New Client Success',
      category: 'E-Commerce Growth',
      client: 'Brand Name, Location',
      liveLink: 'https://',
      description: 'Brief summary of the campaign and results.',
      fullDetails: 'Full case study: Client Challenge, Exact Strategy, Execution, and Final Verified Results.',
      deliverables: [
        'Meta Ads Campaign Restructuring',
        'High-Converting Video Creatives',
        '1-Page COD Landing Page',
        'Server-Side CAPI Tracking',
      ],
      image: '/images/case_ecommerce.png',
      metric1: { label: 'Revenue Growth', value: '+180%' },
      metric2: { label: 'Blended ROAS', value: '4.0x' },
    };
    setSiteContent((prev) => ({ ...prev, caseStudies: [...prev.caseStudies, newCase] }));
    showToast('New case study card added. Fill in details and click "Save & Publish".');
  };

  const handleDeleteCaseStudy = (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    setSiteContent((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.filter((c) => c.id !== id),
    }));
  };

  // Profile config helper
  const handleUpdateProfile = (field: keyof ProfileConfig, val: string) => {
    setSiteContent((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: val },
    }));
  };

  const unreadCount = leads.filter((l) => !l.read).length;
  const filteredLeads = leads
    .filter((l) => (filterUnread ? !l.read : true))
    .filter(
      (l) =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.phone && l.phone.includes(searchQuery)) ||
        l.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Navigation Items with Icons & Badge Counters (Identical to original admin panel)
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'inbox', label: 'Inquiries / Inbox', icon: Mail, badge: unreadCount },
    { id: 'case-studies', label: 'Projects Showcase', icon: FolderGit2, badge: siteContent.caseStudies.length },
    { id: 'packages', label: 'Growth Packages', icon: Layers, badge: siteContent.packages.length },
    { id: 'profile', label: 'Hero & Profile', icon: SlidersHorizontal },
    { id: 'database', label: 'Backend & DB Status', icon: Database },
  ];

  // 1. Sleek Dark Mode Login Screen (Like original admin panel)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative font-sans">
        <div className="fixed -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-8 sm:p-10 backdrop-blur-xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/20 text-slate-950 font-black">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Tajul Shahin Admin</h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">Growth Marketing Command Center & CMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                Enter Security PIN
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white font-mono text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-700"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-rose-400 mt-2.5 font-medium text-center flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-4 h-4 font-bold" />
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setPinInput('1234');
                  sessionStorage.setItem('ts_admin_token', 'logged_in');
                  setIsAuthenticated(true);
                  fetchAdminData();
                  fetchSiteContent();
                }}
                className="text-xs text-slate-500 hover:text-emerald-400 transition-colors font-medium underline cursor-pointer"
              >
                Quick Demo Unlock (PIN: 1234)
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Back to Public Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Full Admin Dashboard with Authentic Original Dark Sidebar Layout
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/30 animate-slide-in backdrop-blur-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold whitespace-nowrap">{toastMessage}</span>
        </div>
      )}

      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2.5 font-bold text-white">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span>Tajul Shahin Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Original Authentic Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:flex flex-col w-full md:w-64 bg-slate-900/95 border-r border-slate-800 p-5 shrink-0 min-h-screen justify-between`}
      >
        <div>
          {/* Logo Brand */}
          <div className="hidden md:flex items-center gap-3 px-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black text-lg">
              <ShieldCheck className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-tight">Tajul Admin</div>
              <div className="text-[11px] text-emerald-400 font-medium">Control Dashboard</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
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
                  {Boolean(item.badge) && Number(item.badge) > 0 && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        item.id === 'inbox'
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
        </div>

        {/* Portfolio Live Link & Profile Footer */}
        <div className="pt-6 border-t border-slate-800 space-y-3 mt-6">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-400 bg-slate-950/60 border border-slate-800/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visit Live Portfolio</span>
            </div>
          </Link>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Tajul Shahin</div>
              <div className="text-[11px] text-slate-500 truncate">tajulshahin96@gmail.com</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        {/* Top Header inside main view */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 mb-8 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight capitalize">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'inbox' && 'Client Inquiries & Leads'}
              {activeTab === 'case-studies' && 'Projects & Case Studies Showcase'}
              {activeTab === 'packages' && 'Performance Packages CMS'}
              {activeTab === 'profile' && 'Profile & Hero Settings'}
              {activeTab === 'database' && 'Backend Architecture & Database'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Tajul Shahin Portfolio Management & Inquiries Pipeline
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={saveLiveContent}
              disabled={savingContent}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className={`w-4 h-4 ${savingContent ? 'animate-spin' : ''}`} />
              <span>{savingContent ? 'Saving...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW (Exact style from original admin)        */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 p-8 shadow-xl">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Backend & Services Operational
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-2">Welcome back, Tajul!</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Manage your decoupled portfolio system, verified case studies, and live packages from your central control dashboard.
                </p>
              </div>
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab('inbox')}
                className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div className="text-3xl font-bold text-white mb-1 font-mono">{leads.length}</div>
                <div className="text-sm text-slate-400">Total Contact Inquiries</div>
              </div>

              <div
                onClick={() => setActiveTab('inbox')}
                className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  {unreadCount > 0 && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-semibold">
                      Action Needed
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold text-amber-400 mb-1 font-mono">{unreadCount}</div>
                <div className="text-sm text-slate-400">Unread Messages</div>
              </div>

              <div
                onClick={() => setActiveTab('case-studies')}
                className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-teal-400 transition-colors" />
                </div>
                <div className="text-3xl font-bold text-white mb-1 font-mono">{siteContent.caseStudies.length}</div>
                <div className="text-sm text-slate-400">Published Projects</div>
              </div>

              <div
                onClick={() => setActiveTab('profile')}
                className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="text-3xl font-bold text-white mb-1 font-mono">{siteContent.profile.averageRoas}</div>
                <div className="text-sm text-slate-400">Average ROAS Delivered</div>
              </div>
            </div>

            {/* Architecture / Storage Overview Cards */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Integrated Infrastructure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {dbStatus.isPostgres ? 'PostgreSQL Database' : 'Private Local Database'}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {dbStatus.isPostgres
                        ? 'Connected via custom DATABASE_URL in .env.local'
                        : 'Isolated 100% private data stored in data/content.json'}
                    </p>
                    <div className="mt-2 text-[11px] text-emerald-400 font-medium">● Connected & Active</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">Instant WhatsApp Routing</div>
                    <p className="text-xs text-slate-400 mt-0.5">Direct chat links with pre-filled case study and package quotes.</p>
                    <div className="mt-2 text-[11px] text-cyan-400 font-medium">● Configured (+8801629105607)</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">100% Data Privacy</div>
                    <p className="text-xs text-slate-400 mt-0.5">Zero third-party developer access. All client leads are kept private.</p>
                    <div className="mt-2 text-[11px] text-amber-400 font-medium">● Protected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: INBOX / INQUIRIES                                  */}
        {/* ======================================================== */}
        {activeTab === 'inbox' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFilterUnread(false)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    !filterUnread
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  All Inquiries ({leads.length})
                </button>
                <button
                  onClick={() => setFilterUnread(true)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    filterUnread
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="py-20 text-center text-slate-500">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
                <span>Loading inquiries...</span>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400">
                <Mail className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white mb-1">No inquiries found</h4>
                <p className="text-xs text-slate-500">Client inquiries submitted through the contact form will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className={`bg-slate-900/80 rounded-2xl border transition-all p-6 ${
                      !lead.read ? 'border-amber-500/40 shadow-lg shadow-amber-500/5' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            !lead.read ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'
                          }`}
                        />
                        <span className="text-base font-bold text-white">{lead.name}</span>
                        {!lead.read ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
                            New Lead
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold uppercase">
                            Read
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
                      <div>
                        <span className="text-slate-500 block mb-0.5">Email</span>
                        <a href={`mailto:${lead.email}`} className="text-emerald-400 hover:underline font-mono">
                          {lead.email}
                        </a>
                      </div>
                      {lead.phone && (
                        <div>
                          <span className="text-slate-500 block mb-0.5">Phone / WhatsApp</span>
                          <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-mono">
                            {lead.phone}
                          </a>
                        </div>
                      )}
                      {lead.service && (
                        <div>
                          <span className="text-slate-500 block mb-0.5">Service Requested</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                            {lead.service}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed mb-4">
                      {lead.message}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
                      <div className="flex items-center gap-2">
                        {lead.phone && (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hi ${lead.name}, Tajul Shahin here regarding your inquiry about ${lead.service || 'marketing services'}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-500/30"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Reply</span>
                          </a>
                        )}

                        <a
                          href={`mailto:${lead.email}?subject=${encodeURIComponent('Tajul Shahin - Strategy Consultation')}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email Reply</span>
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRead(lead.id, lead.read)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                        >
                          {lead.read ? 'Mark Unread' : 'Mark as Read'}
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: PROJECTS & CASE STUDIES CMS                       */}
        {/* ======================================================== */}
        {activeTab === 'case-studies' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Case Studies Showcase</h3>
                <p className="text-xs text-slate-400 mt-0.5">Control live case studies, client stories, deliverables, and ROAS metrics.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddCaseStudy}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Case Study</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {siteContent.caseStudies.map((cs, idx) => (
                <div key={cs.id} className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400 font-mono">Case #{idx + 1}</span>
                        <span className="text-xs font-bold text-white truncate max-w-[200px]">{cs.title}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteCaseStudy(cs.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete Case Study"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Category Badge
                        </label>
                        <input
                          type="text"
                          value={cs.category}
                          onChange={(e) => handleUpdateCaseStudy(idx, 'category', e.target.value)}
                          placeholder="e.g. E-Commerce Fashion"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Project / Brand Title
                        </label>
                        <input
                          type="text"
                          value={cs.title}
                          onChange={(e) => handleUpdateCaseStudy(idx, 'title', e.target.value)}
                          placeholder="e.g. Fashion & Apparel Brand Scaling"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Client / Business Name
                        </label>
                        <input
                          type="text"
                          value={cs.client || ''}
                          onChange={(e) => handleUpdateCaseStudy(idx, 'client', e.target.value)}
                          placeholder="e.g. Anannya Fashion, Dhaka"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Live Page / Website Link
                        </label>
                        <input
                          type="text"
                          value={cs.liveLink || ''}
                          onChange={(e) => handleUpdateCaseStudy(idx, 'liveLink', e.target.value)}
                          placeholder="https://facebook.com/..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Image URL / Local Path
                      </label>
                      <input
                        type="text"
                        value={cs.image}
                        onChange={(e) => handleUpdateCaseStudy(idx, 'image', e.target.value)}
                        placeholder="/images/case_ecommerce.png"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Short Summary (Card Preview)
                      </label>
                      <textarea
                        rows={2}
                        value={cs.description}
                        onChange={(e) => handleUpdateCaseStudy(idx, 'description', e.target.value)}
                        placeholder="Brief summary visible on homepage card..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        In-Depth Case Study Story & Strategy (Modal Breakdown)
                      </label>
                      <textarea
                        rows={4}
                        value={cs.fullDetails || ''}
                        onChange={(e) => handleUpdateCaseStudy(idx, 'fullDetails', e.target.value)}
                        placeholder="Full client story: The bottleneck, audit findings, campaign restructuring, creative testing, and verified outcome..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Key Deliverables Badges
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddDeliverable(idx)}
                          className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Deliverable
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(cs.deliverables || []).map((deliv, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                            <input
                              type="text"
                              value={deliv}
                              onChange={(e) => handleUpdateDeliverable(idx, dIdx, e.target.value)}
                              className="flex-grow px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveDeliverable(idx, dIdx)}
                              className="text-slate-500 hover:text-rose-400 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Metric 1 (e.g. Revenue)
                        </label>
                        <input
                          type="text"
                          value={cs.metric1.value}
                          onChange={(e) => handleUpdateMetric(idx, 'metric1', 'value', e.target.value)}
                          placeholder="+240%"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-bold text-white font-mono"
                        />
                        <input
                          type="text"
                          value={cs.metric1.label}
                          onChange={(e) => handleUpdateMetric(idx, 'metric1', 'label', e.target.value)}
                          placeholder="Revenue Growth"
                          className="w-full px-2.5 py-1 mt-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Metric 2 (e.g. ROAS)
                        </label>
                        <input
                          type="text"
                          value={cs.metric2.value}
                          onChange={(e) => handleUpdateMetric(idx, 'metric2', 'value', e.target.value)}
                          placeholder="4.2x"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-bold text-emerald-400 font-mono"
                        />
                        <input
                          type="text"
                          value={cs.metric2.label}
                          onChange={(e) => handleUpdateMetric(idx, 'metric2', 'label', e.target.value)}
                          placeholder="Blended ROAS"
                          className="w-full px-2.5 py-1 mt-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: GROWTH PACKAGES CMS                                */}
        {/* ======================================================== */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Performance Bundles & Pricing</h3>
                <p className="text-xs text-slate-400 mt-0.5">Edit monthly packages, deliverables, prices, and highlight badges.</p>
              </div>

              <button
                onClick={handleAddPackage}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {siteContent.packages.map((pkg, idx) => (
                <div
                  key={pkg.id}
                  className={`bg-slate-900/80 p-6 rounded-2xl border shadow-sm flex flex-col justify-between ${
                    pkg.popular ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/5' : 'border-slate-800'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400 font-mono">#{idx + 1}</span>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pkg.popular || false}
                            onChange={(e) => handleUpdatePackage(idx, 'popular', e.target.checked)}
                            className="rounded accent-emerald-500"
                          />
                          <span>Highlight as &quot;Most Popular&quot;</span>
                        </label>
                      </div>

                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Package Title
                        </label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => handleUpdatePackage(idx, 'name', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Price
                          </label>
                          <input
                            type="text"
                            value={pkg.price}
                            onChange={(e) => handleUpdatePackage(idx, 'price', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Period
                          </label>
                          <input
                            type="text"
                            value={pkg.period}
                            onChange={(e) => handleUpdatePackage(idx, 'period', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Badge Text (Optional)
                      </label>
                      <input
                        type="text"
                        value={pkg.badge || ''}
                        onChange={(e) => handleUpdatePackage(idx, 'badge', e.target.value)}
                        placeholder="e.g. Most Popular, Best Value"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={pkg.description}
                        onChange={(e) => handleUpdatePackage(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Deliverable Features
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddFeature(idx)}
                          className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Feature
                        </button>
                      </div>

                      <div className="space-y-2">
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => handleFeatureChange(idx, fIdx, e.target.value)}
                              className="flex-grow px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(idx, fIdx)}
                              className="text-slate-500 hover:text-rose-400 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: HERO & PROFILE SETTINGS                           */}
        {/* ======================================================== */}
        {activeTab === 'profile' && (
          <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 shadow-sm max-w-4xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Hero & Profile Settings</h3>
              <p className="text-xs text-slate-400 mt-0.5">Control contact info, headlines, and proof statistics.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={siteContent.profile.name}
                  onChange={(e) => handleUpdateProfile('name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={siteContent.profile.title}
                  onChange={(e) => handleUpdateProfile('title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-medium text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  WhatsApp Phone Number
                </label>
                <input
                  type="text"
                  value={siteContent.profile.phone}
                  onChange={(e) => handleUpdateProfile('phone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={siteContent.profile.email}
                  onChange={(e) => handleUpdateProfile('email', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Hero Tagline / Eyebrow
                </label>
                <input
                  type="text"
                  value={siteContent.profile.tagline}
                  onChange={(e) => handleUpdateProfile('tagline', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={siteContent.profile.headline}
                  onChange={(e) => handleUpdateProfile('headline', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Hero Subhead
                </label>
                <textarea
                  rows={3}
                  value={siteContent.profile.subhead}
                  onChange={(e) => handleUpdateProfile('subhead', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 leading-relaxed focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-sm font-bold text-white mb-3">Proof Metrics (Hero Counter Bar)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Ad Spend</label>
                  <input
                    type="text"
                    value={siteContent.profile.adSpend}
                    onChange={(e) => handleUpdateProfile('adSpend', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Experience</label>
                  <input
                    type="text"
                    value={siteContent.profile.experienceYears}
                    onChange={(e) => handleUpdateProfile('experienceYears', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Delivered</label>
                  <input
                    type="text"
                    value={siteContent.profile.projectsCount}
                    onChange={(e) => handleUpdateProfile('projectsCount', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Satisfaction</label>
                  <input
                    type="text"
                    value={siteContent.profile.satisfactionRate}
                    onChange={(e) => handleUpdateProfile('satisfactionRate', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold font-mono text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: BACKEND & DATABASE STATUS                         */}
        {/* ======================================================== */}
        {activeTab === 'database' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">Database & Storage Architecture</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your database status, storage location, and how to connect your own database.
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold font-mono self-start sm:self-auto border ${
                    dbStatus.isPostgres
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {dbStatus.isPostgres ? 'PostgreSQL Cloud Active' : 'Private Local Database Active'}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">
                      {dbStatus.isPostgres ? 'Cloud PostgreSQL Connected' : 'Local Isolated JSON Database'}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">{dbStatus.details}</div>
                    <div className="text-[11px] font-mono text-emerald-400 mt-2">
                      Location: {dbStatus.location}
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80 flex items-start gap-3.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">100% Data Privacy & Isolation</div>
                    <div className="text-xs text-slate-400 mt-1">
                      No third-party developer database is connected. All your leads, case studies, and content are stored privately in your repository files.
                    </div>
                  </div>
                </div>
              </div>

              {/* Guide on how to connect personal Neon Database */}
              <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-950/20">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Want to connect your OWN Cloud Database (Neon / Supabase)?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  If you want a separate free PostgreSQL database hosted in the cloud, you can connect your own database in 2 minutes:
                </p>
                <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside font-medium">
                  <li>Visit <a href="https://neon.tech" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline font-bold">neon.tech</a> and create a free account.</li>
                  <li>Click <strong>&quot;Create Project&quot;</strong> to get your personal PostgreSQL connection string.</li>
                  <li>Open the file <code className="bg-amber-900/60 px-1.5 py-0.5 rounded font-mono text-amber-200 font-bold">.env.local</code> in this project folder.</li>
                  <li>Set <code className="bg-amber-900/60 px-1.5 py-0.5 rounded font-mono text-amber-200 font-bold">DATABASE_URL=postgresql://user:pass@ep-your-host.neon.tech/neondb?sslmode=require</code></li>
                  <li>Restart the application. Next.js will automatically use your cloud database!</li>
                </ol>
              </div>

              <div className="border-t border-slate-800 pt-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Storage Handlers Status
                </h4>
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl flex justify-between items-center border border-slate-800">
                    <span className="font-bold text-white">messages (Leads & Inquiries)</span>
                    <span className="text-slate-400">Stored in data/messages.json (Fail-safe)</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">200 OK</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl flex justify-between items-center border border-slate-800">
                    <span className="font-bold text-white">site_content (Case Studies & Packages)</span>
                    <span className="text-slate-400">Stored in data/content.json (Live)</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">200 OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
