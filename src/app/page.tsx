"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SiteContent, CaseStudyItem, defaultSiteContent } from "@/lib/types";
import {
  TrendingUp,
  Target,
  BarChart3,
  Search,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Star,
  ChevronRight,
  ShieldCheck,
  Zap,
  DollarSign,
  Layers,
  Sparkles,
  Menu,
  X,
  MessageSquare,
  Video,
  FileCode,
  SlidersHorizontal,
  Building2,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [selectedProject, setSelectedProject] = useState<CaseStudyItem | null>(null);

  // Fetch dynamic content from PostgreSQL/local storage
  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content) {
          setContent(data.content);
        }
      })
      .catch((err) => console.error("Error loading dynamic content:", err));
  }, []);

  // Strategy call booking modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Complete E-Com Growth Package");

  // Interactive ROI & Growth Calculator
  const [adBudget, setAdBudget] = useState(2500);
  const [targetRoas, setTargetRoas] = useState(3.6);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    service: "Complete E-Com Growth Package",
    budget: "$1,000 - $3,000/mo",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculated ROI values
  const projectedRevenue = Math.round(adBudget * targetRoas);
  const projectedProfit = Math.round(projectedRevenue - adBudget);
  const netRoiPercent = Math.round(((projectedRevenue - adBudget) / adBudget) * 100);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 5000);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          budget: formData.budget,
          message:
            formData.message ||
            `Client inquiry for ${formData.service}. Business: ${formData.businessName || "N/A"}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFormSuccess(true);
        setWhatsappUrl(data.whatsappRedirect || `https://wa.me/8801629105607`);
        showNotification(`Thank you, ${formData.name}! Inquiry received.`);
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setFormSuccess(true);
      const encoded = encodeURIComponent(
        `Hi Tajul, my name is ${formData.name} (${formData.phone || formData.email}). I want to discuss ${formData.service} for my business ${formData.businessName || ""}.`
      );
      setWhatsappUrl(`https://wa.me/8801629105607?text=${encoded}`);
      showNotification(`Thank you, ${formData.name}!`);
    } finally {
      setSubmitting(false);
    }
  };

  const openModalWithPackage = (pkgTitle: string) => {
    setSelectedService(pkgTitle);
    setFormData((prev) => ({
      ...prev,
      service: pkgTitle,
    }));
    setModalOpen(true);
    setFormSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white relative font-sans">
      {/* Background Soft Blobs */}
      <div className="fixed -top-32 -left-32 w-[55vw] h-[55vw] rounded-full bg-blue-100/40 blur-[130px] pointer-events-none -z-10" />
      <div className="fixed -bottom-32 -right-32 w-[50vw] h-[50vw] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-grid-dots opacity-25 pointer-events-none -z-10" />

      {/* TOP TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed top-20 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium whitespace-nowrap">{toastMsg}</span>
        </div>
      )}

      {/* Shared Global Header */}
      <SiteHeader phone={content.profile.phone} />

      {/* ======================================================== */}
      {/* 2. HERO SECTION (Targeting Bangladesh & Global E-Com)     */}
      {/* ======================================================== */}
      <section className="pt-32 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Eyebrow - Single Line */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 mb-6 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse-dot shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                  {content.profile.tagline}
                </span>
              </div>

              {/* Bold, Direct Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-6">
                {content.profile.headline}
              </h1>

              {/* Practical, Human Subhead */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed sm:leading-8 mb-9 max-w-xl mx-auto lg:mx-0">
                {content.profile.subhead}
              </p>

              {/* Actions - Clean Single-Line Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap gap-3.5 justify-center lg:justify-start mb-12">
                <button
                  onClick={() => openModalWithPackage(content.packages[1]?.name || "Complete E-Com Growth Package")}
                  className="primary-gradient-bg text-white font-bold px-7 py-4 rounded-xl flex items-center justify-center gap-2 glow-button text-sm sm:text-base shadow-md transition-all whitespace-nowrap shrink-0"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Book Free Strategy Call</span>
                </button>

                <a
                  href={`https://wa.me/${content.profile.phone.replace(/[^0-9]/g, "")}?text=Hi%20Tajul%2C%20I%20need%20help%20with%20ads%2C%20video%20making%2C%20and%20landing%20page%20for%20my%20business.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 py-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-center gap-2 text-sm sm:text-base transition-all whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="#packages"
                  className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 px-3 py-3 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>See All Packages</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </a>
              </div>

              {/* Proof Numbers Bar - Single Line */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-slate-200 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight whitespace-nowrap">
                    {content.profile.adSpend}
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1.5 whitespace-nowrap">
                    Ad Spend Managed
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight whitespace-nowrap">
                    {content.profile.experienceYears}
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1.5 whitespace-nowrap">
                    Growth Experience
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight whitespace-nowrap">
                    {content.profile.projectsCount}
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1.5 whitespace-nowrap">
                    Projects Delivered
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight whitespace-nowrap">
                    {content.profile.satisfactionRate}
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1.5 whitespace-nowrap">
                    Client Satisfaction
                  </div>
                </div>
              </div>
            </div>

            {/* Right Profile Column with Local Image (100% Reliable Loading) */}
            <div className="lg:col-span-5 relative">
              <div className="relative max-w-sm sm:max-w-md mx-auto">
                {/* Floating ROAS badge */}
                <div className="absolute -top-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-3.5 flex items-center gap-3 z-20 animate-float-badge">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Average Client Return
                    </div>
                    <div className="text-base font-extrabold text-slate-900 font-mono whitespace-nowrap">
                      {content.profile.averageRoas} Blended ROAS
                    </div>
                  </div>
                </div>

                {/* Profile Card Frame */}
                <div className="p-3.5 bg-white border border-slate-200/90 rounded-[2rem] shadow-xl relative z-10">
                  <div className="relative aspect-[3/4] rounded-[1.6rem] overflow-hidden bg-slate-100">
                    <Image
                      src="/images/tazul_shahin.png"
                      alt="Tajul Shahin - Digital Marketing & Performance Growth Specialist"
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                      priority
                      unoptimized
                    />

                    {/* Bottom Status bar - Single Line */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl flex items-center justify-between shadow-md">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block leading-tight whitespace-nowrap">
                            {content.profile.name}
                          </span>
                          <span className="text-[10px] text-slate-500 block whitespace-nowrap">
                            {content.profile.location} · Online
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-xs font-bold text-amber-800 whitespace-nowrap">
                          5.0 Rating
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ambient Circles */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[112%] h-[112%] rounded-full border border-blue-200/60 pointer-events-none" />
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[122%] h-[122%] rounded-full border border-slate-200/40 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. CORE SERVICES FOR BANGLADESHI BUSINESSES              */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-white border-y border-slate-200" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider mb-4 inline-block whitespace-nowrap">
              Everything Your Business Needs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Full-Stack <span className="text-blue-600">Marketing & Sales</span> Services
            </h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-xl mx-auto">
              From creative video ads to landing pages and server-side pixel tracking—all designed to lower your acquisition cost and drive sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: Ads Setup & Management */}
            <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 whitespace-nowrap">
                  Facebook & Google Ads Setup
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Complete ad account setup, audience targeting (Bangladesh local or global export markets), purchase conversion campaigns, message ads, and daily budget scaling to prevent ad fatigue.
                </p>
                <ul className="space-y-2.5 text-xs font-medium text-slate-600 pt-4 border-t border-slate-200/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Audience Research & A/B Testing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Purchase & WhatsApp Message Campaigns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Budget Allocation & Cost per Purchase (CPP) Reduction</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 2: Video Ad Making & Creatives */}
            <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 whitespace-nowrap">
                  Ad Creative & Video Making
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  In Bangladesh, video ads convert 3x higher than static images. I script, edit, and produce high-converting product videos, UGC hooks, voiceovers, and dynamic Reels/TikTok formats.
                </p>
                <ul className="space-y-2.5 text-xs font-medium text-slate-600 pt-4 border-t border-slate-200/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Scroll-Stopping 3-Second Hooks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Bangla & English Ad Copywriting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Vertical 9:16 Reels, Stories & Feed Formats</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 3: High-Converting Landing Page */}
            <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <FileCode className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 whitespace-nowrap">
                  Landing Page & Order Funnels
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Fast, mobile-optimized 1-page checkout landing pages with Cash on Delivery (COD) order forms, bKash/Nagad checkout, objection-handling FAQs, and zero loading lag.
                </p>
                <ul className="space-y-2.5 text-xs font-medium text-slate-600 pt-4 border-t border-slate-200/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>1-Click Cash on Delivery Order Forms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Sub-Second Page Load Speed on Mobile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>WordPress / WooCommerce / Shopify / Custom</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 4: Pixel & Meta CAPI Server Tracking */}
            <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 whitespace-nowrap">
                  Meta Pixel & Server-Side CAPI
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Complete setup of Meta Conversions API (CAPI) on cloud server, Google Tag Manager (GTM), GA4, event deduplication, and domain verification. Eliminates iOS 14 tracking loss.
                </p>
                <ul className="space-y-2.5 text-xs font-medium text-slate-600 pt-4 border-t border-slate-200/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Event Deduplication (Browser + Server)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Domain Verification & Catalog Sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>High Event Match Quality (EMQ Score 8+)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 5: Business Manager & Ad Account Audit */}
            <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 whitespace-nowrap">
                  BM & Ad Account Health Audit
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Diagnosing why your ads are restricted or underperforming. Thorough audit of your Business Manager setup, 2FA security, billing thresholds, and policy compliance to prevent bans.
                </p>
                <ul className="space-y-2.5 text-xs font-medium text-slate-600 pt-4 border-t border-slate-200/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Full Account Policy & Restriction Audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Payment Method & Dollar Card Setup Help</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Ad Structure & Campaign Bottleneck Report</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 6: Revenue Funnels & Retention */}
            <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-100/80 text-rose-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 whitespace-nowrap">
                  SMS & WhatsApp Order Recovery
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Recover abandoned checkouts and reduce order cancellation rates. Automated SMS confirmations, WhatsApp notification sequences, and post-purchase customer retention.
                </p>
                <ul className="space-y-2.5 text-xs font-medium text-slate-600 pt-4 border-t border-slate-200/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Automated Order Confirmation via SMS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Cut Return (RTO) Rate on Cash on Delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Repeat Customer Retargeting Funnels</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-400 hover:text-blue-600 text-slate-800 font-bold text-sm shadow-2xs transition-all"
            >
              <span>Explore All 6 Services & Full Technical Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. PACKAGES & PRICING (Tailored for Client Needs)       */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#F8FAFC]" id="packages">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider mb-4 inline-block whitespace-nowrap">
              Tailored Performance Bundles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              All-In-One <span className="text-blue-600">Growth Packages</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-xl mx-auto">
              Choose the package that fits your business stage. Every bundle includes ads, creative assets, and technical tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white p-8 rounded-2xl border flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? "border-2 border-blue-600 shadow-lg relative hover:scale-[1.01]"
                    : "border-slate-200 shadow-2xs hover:border-slate-300"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 primary-gradient-bg px-3.5 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-2xs whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}
                <div>
                  <div
                    className={`text-xs font-bold uppercase tracking-wider mb-3 whitespace-nowrap ${
                      pkg.popular ? "text-blue-600" : "text-slate-500"
                    }`}
                  >
                    {pkg.name}
                  </div>
                  <div className="mb-6 flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono whitespace-nowrap">
                      {pkg.price}
                    </span>
                    <span className="text-slate-500 text-xs font-semibold whitespace-nowrap">
                      {pkg.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>
                  <ul className="space-y-3.5 mb-8 text-xs text-slate-600">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => openModalWithPackage(`${pkg.name} (${pkg.price}${pkg.period})`)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                    pkg.popular
                      ? "primary-gradient-bg text-white glow-button shadow-2xs"
                      : "border border-slate-300 hover:border-blue-600 text-slate-800 hover:text-blue-600"
                  }`}
                >
                  Select {pkg.name}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:text-blue-600 text-slate-800 font-bold text-sm shadow-2xs transition-all"
            >
              <span>Compare All Package Features & Interactive ROI Forecaster</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. VERIFIED CLIENT RESULTS (Local Images)                */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-white border-y border-slate-200" id="case-studies">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider mb-4 inline-block whitespace-nowrap">
                Real Client Results
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Case Studies & <span className="text-blue-600">Verified Growth</span>
              </h2>
              <p className="text-slate-600 text-base mt-2 max-w-xl leading-relaxed">
                Measured results from live campaigns. How we scaled revenue and cut customer acquisition costs.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Real Ad Accounts · Audited Data
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all flex flex-col group"
              >
                <Link
                  href={`/case-studies/${cs.id}`}
                  className="relative h-56 overflow-hidden bg-slate-100 block"
                >
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap shadow-xs">
                    {cs.category}
                  </div>
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                      <span>View Case Study Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                    </span>
                  </div>
                </Link>

                <div className="p-7 flex flex-col flex-grow justify-between">
                  <div>
                    {cs.client && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-2">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{cs.client}</span>
                      </div>
                    )}
                    <Link href={`/case-studies/${cs.id}`}>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-blue-600 transition-colors">
                        {cs.title}
                      </h3>
                    </Link>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {cs.description}
                    </p>

                    {cs.deliverables && cs.deliverables.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {cs.deliverables.slice(0, 2).map((d, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-2.5 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700 border border-slate-200/60"
                          >
                            {d}
                          </span>
                        ))}
                        {cs.deliverables.length > 2 && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[10px] font-bold text-blue-600">
                            +{cs.deliverables.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 font-mono">
                      <div>
                        <div className="text-2xl font-black text-slate-900 whitespace-nowrap">
                          {cs.metric1.value}
                        </div>
                        <div className="text-[11px] uppercase font-bold text-slate-500 whitespace-nowrap">
                          {cs.metric1.label}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-blue-600 whitespace-nowrap">
                          {cs.metric2.value}
                        </div>
                        <div className="text-[11px] uppercase font-bold text-slate-500 whitespace-nowrap">
                          {cs.metric2.label}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/case-studies/${cs.id}`}
                      className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-50 group-hover:primary-gradient-bg text-slate-800 group-hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-200 group-hover:border-blue-600 shadow-2xs whitespace-nowrap"
                    >
                      <span>View Full Details & Metrics</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:text-blue-600 text-slate-800 font-bold text-sm shadow-2xs transition-all"
            >
              <span>Explore All Verified Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. CONTACT & FREE STRATEGY CALL BOOKING                   */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#F8FAFC]" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 sm:p-14 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Direct Contact Info */}
              <div className="lg:col-span-5">
                <span className="text-blue-600 font-mono text-xs font-bold uppercase tracking-widest block mb-3 whitespace-nowrap">
                  Direct Line
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                  Let&apos;s Discuss Your <span className="text-blue-600">Business Growth</span>
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed sm:leading-7 mb-9">
                  Want an audit of your ad account, a high-converting landing page, or video creatives for your products? Message me on WhatsApp directly or submit the form.
                </p>

                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${content.profile.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider whitespace-nowrap">
                        Instant WhatsApp Chat
                      </div>
                      <div className="text-base font-bold text-slate-900 font-mono whitespace-nowrap">
                        {content.profile.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${content.profile.email}`}
                    className="flex items-center gap-4 p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                        Email Address
                      </div>
                      <div className="text-sm font-bold text-slate-900 whitespace-nowrap">
                        {content.profile.email}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                        Office Location
                      </div>
                      <div className="text-sm font-bold text-slate-900 whitespace-nowrap">
                        {content.profile.location} · Available Worldwide
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Form */}
              <div className="lg:col-span-7 bg-slate-50/70 p-7 sm:p-10 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-1.5 whitespace-nowrap">
                  Request a Free Strategy & Ad Account Audit
                </h3>
                <p className="text-xs text-slate-500 mb-7 leading-relaxed">
                  Fill in your details below. I will personally review your business and reply within a few hours.
                </p>

                {formSuccess ? (
                  <div className="text-center py-10 bg-white rounded-xl border border-emerald-200 p-6 space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-lg font-bold text-slate-900 whitespace-nowrap">Inquiry Received!</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for submitting your details. I review every submission personally and will be in touch shortly.
                    </p>
                    {whatsappUrl && (
                      <div className="pt-2">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap"
                        >
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
                          <span>Click to Open WhatsApp & Message Tajul Now</span>
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 whitespace-nowrap">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 whitespace-nowrap">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="017... or 016..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 whitespace-nowrap">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@gmail.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 whitespace-nowrap">
                          Page / Website Link
                        </label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="facebook.com/yourpage"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 whitespace-nowrap">
                          Select Service Package
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        >
                          <option>Complete E-Com Growth Package ($399/mo)</option>
                          <option>Starter Ads & Video Package ($199/mo)</option>
                          <option>Scale & Omnichannel Package ($699/mo)</option>
                          <option>One-Time Setup & Audit Sprint ($149)</option>
                          <option>Landing Page Design Only</option>
                          <option>Meta Pixel & CAPI Fix Only</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 whitespace-nowrap">
                          Monthly Ad Budget
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        >
                          <option>Under 30,000 BDT /mo</option>
                          <option>30,000 - 60,000 BDT /mo</option>
                          <option>60,000 - 1,50,000 BDT /mo</option>
                          <option>1,50,000+ BDT /mo</option>
                          <option>Flexible / To Discuss</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 whitespace-nowrap">
                        What product/service do you sell?
                      </label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="e.g. We sell women's apparel / cosmetics / electronics via Facebook page & website..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full primary-gradient-bg text-white font-bold py-4 px-6 rounded-xl shadow-sm glow-button text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 whitespace-nowrap"
                    >
                      <span>{submitting ? "Submitting Inquiry..." : "Submit Strategy Request"}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Shared Footer */}
      <SiteFooter
        phone={content.profile.phone}
        email={content.profile.email}
        location={content.profile.location}
      />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/8801629105607?text=Hi%20Tajul%2C%20I%20would%20like%20to%20discuss%20growing%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        title="Chat with Tajul on WhatsApp"
        aria-label="WhatsApp"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* ======================================================== */}
      {/* BOOKING MODAL                                            */}
      {/* ======================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-mono whitespace-nowrap">
                Direct Client Booking
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 whitespace-nowrap">
                Book a Free Strategy Session
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Package: <span className="font-semibold text-slate-800">{selectedService}</span>
              </p>
            </div>

            {formSuccess ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900 whitespace-nowrap">Inquiry Confirmed!</h4>
                <p className="text-xs text-slate-600">
                  Tajul Shahin will review your brand details and reach out on WhatsApp/Phone.
                </p>
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all mt-2 whitespace-nowrap"
                  >
                    <span>Open WhatsApp Directly</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>
                )}
                <button
                  onClick={() => setModalOpen(false)}
                  className="block w-full text-xs text-slate-400 hover:text-slate-700 font-semibold pt-4"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 whitespace-nowrap">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 whitespace-nowrap">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="017... or 016..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 whitespace-nowrap">
                      Page / Website Link
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="facebook.com/page"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 whitespace-nowrap">
                    Selected Package
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  >
                    <option>Complete E-Com Growth Package ($399/mo)</option>
                    <option>Starter Ads & Video Package ($199/mo)</option>
                    <option>Scale & Omnichannel Package ($699/mo)</option>
                    <option>One-Time Setup & Audit Sprint ($149)</option>
                    <option>Landing Page Design Only</option>
                    <option>Meta Pixel & CAPI Fix Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 whitespace-nowrap">
                    Tell me about your product or goal
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Scaling Facebook ads for my clothing brand..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full primary-gradient-bg text-white font-bold py-3.5 px-4 rounded-xl shadow-sm glow-button text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  <span>{submitting ? "Booking..." : "Confirm & Send Request"}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. PROJECT / CASE STUDY FULL DETAILS MODAL                */}
      {/* ======================================================== */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/70">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  {selectedProject.client && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                      <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{selectedProject.client}</span>
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0 shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              {/* Media banner */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {selectedProject.liveLink && selectedProject.liveLink !== 'https://' && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md hover:bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all border border-slate-200"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Key Results / Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                    {selectedProject.metric1.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mt-1">
                    {selectedProject.metric1.label}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                  <div className="text-3xl sm:text-4xl font-black text-blue-600 font-mono tracking-tight">
                    {selectedProject.metric2.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mt-1">
                    {selectedProject.metric2.label}
                  </div>
                </div>
              </div>

              {/* Key Deliverables */}
              {selectedProject.deliverables && selectedProject.deliverables.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Key Deliverables Provided
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* In-Depth Story & Strategy Breakdown */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Problem, Strategy & Execution Breakdown
                </h4>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-700 leading-relaxed font-sans space-y-3">
                  <p>{selectedProject.fullDetails || selectedProject.description}</p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 text-center sm:text-left font-medium">
                Want predictable ROAS & sales scaling for your brand?
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/8801629105607?text=${encodeURIComponent(
                    `Hi Tajul, I saw your case study on "${selectedProject.title}". I want to achieve similar results for my business.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuss Similar Project on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    openModalWithPackage(`Consultation on ${title}`);
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all whitespace-nowrap"
                >
                  <span>Book Free Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
