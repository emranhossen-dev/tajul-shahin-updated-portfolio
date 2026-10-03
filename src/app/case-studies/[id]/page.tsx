"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SiteContent, CaseStudyItem, defaultSiteContent } from "@/lib/types";
import {
  TrendingUp,
  Target,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Building2,
  CheckCircle2,
  Layers,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  Zap,
  Phone,
  FileCode,
  Video,
  SlidersHorizontal,
  Clock,
  Calendar,
  Smartphone,
  Server,
  DollarSign,
  Award,
} from "lucide-react";

export default function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content) {
          setContent(data.content);
        }
      })
      .catch((err) => console.error("Error loading case studies:", err))
      .finally(() => setLoading(false));
  }, []);

  const caseStudy = content.caseStudies.find((c) => c.id === id);

  // If loading finished and no case study found
  if (!loading && !caseStudy) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center font-sans">
        <h1 className="text-3xl font-black text-slate-900 mb-4">Case Study Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md">
          The requested project or case study could not be found or has been moved.
        </p>
        <Link
          href="/case-studies"
          className="primary-gradient-bg text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Case Studies</span>
        </Link>
      </div>
    );
  }

  // Active case study or fallback
  const cs = caseStudy || content.caseStudies[0];

  // Find previous and next case studies for bottom navigation
  const currentIndex = content.caseStudies.findIndex((c) => c.id === cs.id);
  const prevStudy =
    currentIndex > 0
      ? content.caseStudies[currentIndex - 1]
      : content.caseStudies[content.caseStudies.length - 1];
  const nextStudy =
    currentIndex < content.caseStudies.length - 1
      ? content.caseStudies[currentIndex + 1]
      : content.caseStudies[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Site Header */}
      <SiteHeader phone={content.profile.phone} />

      {/* Main Container */}
      <main className="pt-32 pb-24 sm:pt-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/case-studies" className="hover:text-blue-600 transition-colors">
              Case Studies
            </Link>
            <span>/</span>
            <span className="text-blue-600 font-bold truncate max-w-xs">{cs.title}</span>
          </nav>

          {/* Hero Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
                {cs.category}
              </span>
              {cs.client && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  {cs.client}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Verified Results
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2] mb-6">
              {cs.title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              {cs.description}
            </p>
          </div>

          {/* High-Impact Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm mb-12">
            <div className="border-r border-slate-100 pr-4">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                {cs.metric1.value}
              </div>
              <div className="text-xs uppercase font-bold text-slate-500 mt-1">
                {cs.metric1.label}
              </div>
            </div>

            <div className="border-r border-slate-100 pr-4">
              <div className="text-3xl sm:text-4xl font-black text-blue-600 font-mono">
                {cs.metric2.value}
              </div>
              <div className="text-xs uppercase font-bold text-slate-500 mt-1">
                {cs.metric2.label}
              </div>
            </div>

            <div className="border-r border-slate-100 pr-4">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-mono">
                98.8%
              </div>
              <div className="text-xs uppercase font-bold text-slate-500 mt-1">
                Tracking Accuracy
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 font-mono">
                &lt; 0.9s
              </div>
              <div className="text-xs uppercase font-bold text-slate-500 mt-1">
                Mobile Load Speed
              </div>
            </div>
          </div>

          {/* Featured Visual Showcase */}
          <div className="relative h-[320px] sm:h-[460px] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 mb-14 bg-slate-100">
            <Image
              src={cs.image}
              alt={cs.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-8">
              <div className="text-white max-w-xl">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block mb-1">
                  Full Funnel Case Study
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  Website Development + Paid Ads Architecture
                </h3>
              </div>
            </div>
          </div>

          {/* Deep-Dive Case Study Content */}
          <div className="space-y-12">
            {/* Section 1: The Initial Problem & Bottleneck */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
                    The Challenge
                  </span>
                  <h2 className="text-2xl font-black text-slate-900">
                    What Was Broken Before Tajul Stepped In
                  </h2>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed text-base mb-6">
                {cs.fullDetails ||
                  "The business was facing severe ad fatigue, rising customer acquisition costs (CAC), and unstable day-to-day conversion rates. Most of their ad traffic was directed either to a slow, unoptimized Facebook inbox or a multi-step checkout website that took over 6 seconds to load on mobile 4G networks. Consequently, over 70% of potential buyers bounced before even viewing the product details."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-red-600 block mb-1">High Bounce Rate</span>
                  68% mobile shoppers leaving due to slow WordPress plugins and complex multi-page checkouts.
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-red-600 block mb-1">Ad Fatigue & Low CTR</span>
                  Static banners resulting in under 1.1% CTR and rising Cost-Per-Click (CPC).
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-red-600 block mb-1">iOS 14 Tracking Loss</span>
                  Missing over 35% of purchase events due to relying solely on browser-side pixels.
                </div>
              </div>
            </div>

            {/* Section 2: The Solution - Website to Ads Integration */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
                    The Strategy
                  </span>
                  <h2 className="text-2xl font-black text-slate-900">
                    The Complete &quot;Website to Ads&quot; Execution
                  </h2>
                </div>
              </div>

              <div className="space-y-8">
                {/* Pillar 1 */}
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      1. Custom High-Speed Cash on Delivery (COD) Landing Page
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      We developed a lightweight, single-page checkout funnel with zero unnecessary scripts. The page loads in under 0.8 seconds on 3G/4G networks across Bangladesh and includes an instant 1-click Cash on Delivery order form with automated phone number validation.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                        1-Click COD Checkout
                      </span>
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                        Sub-second Load Time
                      </span>
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                        bKash / Nagad Instant Gateway
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      2. Scroll-Stopping Video Creatives with Bangla Native Hooks
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      Replaced static photo ads with high-energy 9:16 vertical video ads. Every creative was scripted around local consumer pain points, featuring unboxings, quality proof, and clear Bangla voiceovers addressing product authenticity.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                        3-Second Attention Hooks
                      </span>
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                        Bangla Audio & Subtitles
                      </span>
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                        Meta Reels & Feed Variations
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      3. Server-Side Meta CAPI & Google Tag Manager Tracking
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      Deployed cloud server-side Conversions API (CAPI) with full event deduplication. Every purchase, checkout initiation, and lead was securely sent directly from the server to Meta, restoring 100% attribution and lowering Cost-Per-Acquisition.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                        Server-Side CAPI
                      </span>
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                        Event Deduplication
                      </span>
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                        Event Match Quality (EMQ 8.8)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Full Deliverables Checklist */}
            {cs.deliverables && cs.deliverables.length > 0 && (
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-600 uppercase tracking-wider block">
                      Scope of Work
                    </span>
                    <h2 className="text-2xl font-black text-slate-900">
                      Complete Project Deliverables
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cs.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/70"
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-sm font-semibold text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Nav: Previous & Next Case Studies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <Link
                href={`/case-studies/${prevStudy.id}`}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-blue-600" />
                  <span>Previous Case Study</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {prevStudy.title}
                </h4>
              </Link>

              <Link
                href={`/case-studies/${nextStudy.id}`}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between items-end text-right group"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2">
                  <span>Next Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-600" />
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {nextStudy.title}
                </h4>
              </Link>
            </div>

            {/* Bottom CTA Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center shadow-xl">
              <span className="px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                Want Similar Results For Your Business?
              </span>
              <h2 className="text-2xl sm:text-4xl font-black mb-4">
                Let&apos;s Build Your Sales Funnel & Scale Your Ads
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Schedule a complimentary 30-minute growth audit. We will review your current website, checkout speed, video creatives, and Facebook ad account.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="primary-gradient-bg text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg glow-button flex items-center gap-2"
                >
                  <span>Book Free 1-on-1 Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/${content.profile.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hi Tajul, I reviewed your case study "${cs.title}" and want to discuss similar growth for my store.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Tajul</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Site Footer */}
      <SiteFooter
        phone={content.profile.phone}
        email={content.profile.email}
        location={content.profile.location}
      />
    </div>
  );
}
