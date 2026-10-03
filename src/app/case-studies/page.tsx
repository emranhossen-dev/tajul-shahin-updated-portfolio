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
  ArrowRight,
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
} from "lucide-react";

export default function CaseStudiesPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content) {
          setContent(data.content);
        }
      })
      .catch((err) => console.error("Error loading case studies:", err));
  }, []);

  const categories = ["All", "E-Commerce Fashion", "B2B Lead Generation", "App Growth & Installs"];

  const filteredStudies =
    activeFilter === "All"
      ? content.caseStudies
      : content.caseStudies.filter((c) => c.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Shared Site Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-36 pb-16 sm:pt-44 sm:pb-24 relative overflow-hidden">
        <div className="fixed -top-32 -left-32 w-[55vw] h-[55vw] rounded-full bg-blue-100/40 blur-[130px] pointer-events-none -z-10" />
        <div className="fixed -bottom-32 -right-32 w-[50vw] h-[50vw] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Verified Ad Account & Revenue Results
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            Proven Growth: <span className="text-blue-600">From Website Build to Scaled Ads</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Real data from real clients in Bangladesh and worldwide. Discover how we combined fast mobile landing pages, scroll-stopping video creatives, and server-side tracking to achieve record ROAS.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm max-w-3xl mx-auto mb-12">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {content.profile.adSpend}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                Ad Spend Managed
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-blue-600 font-mono">
                {content.profile.averageRoas}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                Average ROAS
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {content.profile.projectsCount}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                Completed Funnels
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                {content.profile.satisfactionRate}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                Client Retention
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === cat
                    ? "primary-gradient-bg text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((cs) => (
              <div
                key={cs.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all flex flex-col group"
              >
                {/* Image Banner */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
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
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-slate-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified ROI
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 flex flex-col flex-grow justify-between">
                  <div>
                    {cs.client && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-2">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{cs.client}</span>
                      </div>
                    )}

                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {cs.title}
                    </h2>

                    <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">
                      {cs.description}
                    </p>

                    {/* Deliverables Tags */}
                    {cs.deliverables && cs.deliverables.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {cs.deliverables.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-slate-50 text-[11px] font-medium text-slate-600 border border-slate-200/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Metrics and Action Link */}
                  <div>
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100 font-mono mb-5">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="text-2xl font-black text-slate-900 whitespace-nowrap">
                          {cs.metric1.value}
                        </div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 whitespace-nowrap mt-0.5">
                          {cs.metric1.label}
                        </div>
                      </div>
                      <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100">
                        <div className="text-2xl font-black text-blue-600 whitespace-nowrap">
                          {cs.metric2.value}
                        </div>
                        <div className="text-[10px] uppercase font-bold text-blue-700 whitespace-nowrap mt-0.5">
                          {cs.metric2.label}
                        </div>
                      </div>
                    </div>

                    {/* Dedicated Route Navigation Button */}
                    <Link
                      href={`/case-studies/${cs.id}`}
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 group-hover:primary-gradient-bg text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <span>View Full Breakdown & Metrics</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 4-Pillar Scaled Methodology Section */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Why These Results Happen
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              The Full-Funnel Growth Framework
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We never run ads into a broken, slow website. Every successful client campaign follows our integrated 4-pillar system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-base mb-5">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">High-Speed Mobile Landing Page</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Sub-second load speed with a simplified 1-click Cash on Delivery (COD) form that prevents checkout abandonment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-base mb-5">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Video Creatives with Bangla Hooks</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Vertical UGC reels and dynamic motion videos addressing consumer objections in the first 3 seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-base mb-5">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Server-Side Meta CAPI Tracking</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Eliminates iOS 14 data loss with 100% cloud server event delivery and high Event Match Quality (EMQ).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-base mb-5">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Order Recovery & Scaling</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Instant SMS and WhatsApp order confirmations that reduce Cash on Delivery return (RTO) rates to under 6%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-6 inline-block">
            Take Your Business To The Next Level
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
            Ready To Become Our Next Success Story?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Get a complimentary 30-minute growth audit of your current ad account, landing page speed, and tracking setup.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="primary-gradient-bg text-white font-bold text-sm px-7 py-4 rounded-xl shadow-lg glow-button flex items-center gap-2"
            >
              <span>Book Free Strategy Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${content.profile.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                "Hi Tajul, I reviewed your case studies and would like to audit my store/ads."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-7 py-4 rounded-xl transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <SiteFooter
        phone={content.profile.phone}
        email={content.profile.email}
        location={content.profile.location}
      />
    </div>
  );
}
