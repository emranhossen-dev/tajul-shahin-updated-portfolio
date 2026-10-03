"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  Target,
  FileCode,
  Video,
  SlidersHorizontal,
  ShieldCheck,
  Layers,
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const services = [
    {
      id: "landing-pages",
      icon: FileCode,
      tag: "Development & Funnels",
      title: "High-Speed COD Landing Pages & E-Commerce Stores",
      shortDesc:
        "Fast, mobile-first 1-page checkout funnels and stores built with Cash on Delivery (COD) order forms, zero loading lag, and high conversion rates.",
      features: [
        "1-Click Cash on Delivery (COD) order form with instant validation",
        "Sub-second page load speed on Bangladeshi mobile 3G/4G networks",
        "Built on Next.js, WordPress/WooCommerce, or custom Shopify funnels",
        "Conversion-focused product copywriting and objection-handling FAQs",
        "bKash / Nagad / Card payment integration and automated COD verification",
        "Mobile-first responsive design for 95%+ smartphone shoppers",
      ],
      deliverables: [
        "Live Production Funnel",
        "Custom COD Order Form",
        "Mobile Speed 90+ Score",
        "bKash/Nagad Checkout Option",
      ],
      impact: "Cuts bounce rate by 55% and doubles order completion rate.",
    },
    {
      id: "meta-ads",
      icon: Target,
      tag: "Paid Advertising",
      title: "Meta (Facebook & Instagram) & Google Ads Scaling",
      shortDesc:
        "Structured purchase conversion campaigns, message ads, and Performance Max campaigns optimized for maximum return on ad spend (ROAS).",
      features: [
        "Advanced audience research: Divisional targeting, luxury buyers & expat shoppers",
        "Purchase conversion campaigns, catalog sales, and direct WhatsApp ads",
        "Campaign Budget Optimization (CBO) & automated bid rules",
        "Daily budget scaling protocols without triggering ad fatigue",
        "Google Search Ads targeting high-intent buyer keywords",
        "Google Performance Max & YouTube video discovery campaigns",
      ],
      deliverables: [
        "Ad Account Restructuring",
        "A/B Audience Testing",
        "Daily ROAS Optimization",
        "Weekly Strategy Sync",
      ],
      impact: "Proven blended ROAS between 3.8x and 6.2x on scalable budgets.",
    },
    {
      id: "video-creatives",
      icon: Video,
      tag: "Creative Production",
      title: "High-Converting Video Creatives & UGC Ads",
      shortDesc:
        "In Bangladesh, video ads convert 3x higher than static banners. I script, edit, and produce scroll-stopping UGC and motion ads that captivate shoppers.",
      features: [
        "Scroll-stopping 3-second visual and audio hooks in Bangla & English",
        "Problem-Agitation-Solution (PAS) scriptwriting tailored for local consumers",
        "Vertical 9:16 formats optimized for Facebook Reels, Instagram & TikTok",
        "Dynamic text overlays, subtitles, high-energy pacing, and professional audio",
        "Multiple hook variations tested simultaneously to find winning creatives",
        "High-CTR thumbnail creation and direct Call-to-Action prompts",
      ],
      deliverables: [
        "4–12 Monthly Video Ads",
        "Reels/Stories 9:16 Formats",
        "Hook A/B Variations",
        "Full Commercial Rights",
      ],
      impact: "Lowers Cost-Per-Click (CPC) by 40% and triples video engagement.",
    },
    {
      id: "server-capi",
      icon: SlidersHorizontal,
      tag: "Technical Analytics",
      title: "Server-Side Meta CAPI & Tracking Architecture",
      shortDesc:
        "Complete setup of Meta Conversions API (CAPI) on cloud servers to bypass iOS 14 restrictions and ad blockers for 100% accurate purchase data.",
      features: [
        "Cloud-based Meta Conversions API (CAPI) via Google Tag Manager (GTM)",
        "100% Event Deduplication between browser pixel and cloud server",
        "Tracks Purchase, AddToCart, InitiateCheckout, and ViewContent events reliably",
        "High Event Match Quality (EMQ Score 8+) with hashed user data",
        "Domain verification, Aggregated Event Measurement (AEM), and catalog setup",
        "Google Analytics 4 (GA4) and Google Ads Enhanced Conversions setup",
      ],
      deliverables: [
        "Server-Side CAPI Setup",
        "GTM Cloud Container",
        "Event Deduplication Verified",
        "EMQ Score 8.5+ Guarantee",
      ],
      impact: "Recovers 25–35% of lost attribution data for smarter Meta AI optimization.",
    },
    {
      id: "account-audit",
      icon: ShieldCheck,
      tag: "Security & Policy",
      title: "Business Manager Audit & Account Health Recovery",
      shortDesc:
        "Fixing restricted Business Managers, reviewing ad policy violations, and setting up bulletproof payment methods to keep your ads active 24/7.",
      features: [
        "Thorough audit of Business Manager assets, partner permissions, and 2FA",
        "Identification and removal of ad copy or landing page policy violations",
        "Assistance with dual-currency dollar card billing and bank authorizations",
        "Structuring backup ad accounts and backup pixels to ensure zero downtime",
        "Appeals guidance for erroneously disabled accounts or restricted pages",
        "Ad account expenditure limit increases and security hardening",
      ],
      deliverables: [
        "Full Compliance Audit Report",
        "Dollar Card Billing Fixes",
        "Asset Security Hardening",
        "Contingency Backup Setup",
      ],
      impact: "Eliminates surprise account bans and ensures continuous ad delivery.",
    },
    {
      id: "retention-rto",
      icon: Layers,
      tag: "Automation & Retention",
      title: "Automated SMS / WhatsApp COD Order Confirmation",
      shortDesc:
        "Recover abandoned checkouts and cut return-to-origin (RTO) cancel rates with automated SMS verification and WhatsApp notification sequences.",
      features: [
        "Instant automated SMS / WhatsApp confirmation right after customer places COD order",
        "1-Click customer order verification reducing fake or prank orders",
        "Real-time courier parcel tracking updates sent via SMS (Pathao / Steadfast / RedX)",
        "Abandoned checkout recovery sequence via automated WhatsApp reminders",
        "Post-delivery review collection and repeat purchase discount funnels",
        "VIP customer segmentation for high-margin festive campaigns (Eid/Puja/Winter)",
      ],
      deliverables: [
        "SMS Gateway Integration",
        "WhatsApp Automation Bot",
        "Courier Status Webhooks",
        "RTO Reduction Workflow",
      ],
      impact: "Cuts COD parcel returns by 30–50%, saving thousands in courier fees.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-36 pb-20 sm:pt-44 sm:pb-28 relative overflow-hidden">
        <div className="fixed -top-32 -left-32 w-[55vw] h-[55vw] rounded-full bg-blue-100/40 blur-[130px] pointer-events-none -z-10" />
        <div className="fixed -bottom-32 -right-32 w-[50vw] h-[50vw] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Complete Solution: From Code to Scaled Ads
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            Full-Stack <span className="text-blue-600">Marketing & Website</span> Development Services
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Running ads to a slow or broken page is why businesses waste money. I build the complete machine: fast COD landing pages, scroll-stopping video ads, server-side CAPI tracking, and profitable Meta & Google ad campaigns.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/packages"
              className="primary-gradient-bg text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md glow-button flex items-center gap-2"
            >
              <span>View All Growth Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-300 shadow-2xs flex items-center gap-2 transition-colors"
            >
              <span>Book Free Strategy Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-white border-y border-slate-200" id="services-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest block mb-2">
              Everything Under One Roof
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Six Core Pillars of High-ROAS Scaling
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Designed specifically for e-commerce, F-commerce, and high-growth businesses in Bangladesh and global markets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-slate-50/70 p-8 sm:p-10 rounded-3xl border border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-mono text-xs font-bold uppercase tracking-wider">
                        {srv.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                      {srv.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {srv.shortDesc}
                    </p>

                    <div className="mb-6">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Key Capabilities:
                      </div>
                      <ul className="space-y-2.5 text-xs text-slate-700">
                        {srv.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200/80">
                    <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 text-xs text-blue-900 font-medium mb-5 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                      <span><strong>Impact:</strong> {srv.impact}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {srv.deliverables.map((deliv, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-700"
                          >
                            {deliv}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/contact?service=${encodeURIComponent(srv.title)}`}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0 ml-3"
                      >
                        <span>Inquire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The 5-Step End-to-End Workflow */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider mb-3 inline-block">
              Structured Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From First Consultation to Scaled Daily Orders
            </h2>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              How we take your product, engineer a high-speed funnel, and build sustainable ad campaigns that deliver predictable profit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Funnel & BM Audit",
                desc: "We analyze your past ad accounts, margins, customer avatar, and competitors to identify bottlenecks.",
              },
              {
                step: "02",
                title: "Fast COD Page Build",
                desc: "We write conversion copy and engineer a 1-page checkout funnel with Cash on Delivery form.",
              },
              {
                step: "03",
                title: "Server CAPI Setup",
                desc: "We install cloud Meta Conversions API (CAPI) and GTM to track 100% of purchase events.",
              },
              {
                step: "04",
                title: "Creative Video Production",
                desc: "We script and produce 4–6 UGC video ads with scroll-stopping hooks in Bangla and English.",
              },
              {
                step: "05",
                title: "Campaign Scaling",
                desc: "We launch structured purchase campaigns, test creative angles, and scale CBO budgets profitably.",
              },
            ].map((st, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-3xl font-black text-blue-600 mb-3">
                    {st.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block mb-3">
            Ready To Scale?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
            Let&apos;s Build Your High-Converting Sales Funnel Today
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-9">
            Stop losing money on slow pages and unoptimized ads. Let&apos;s discuss the right package for your business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/8801629105607?text=Hi%20Tajul,%20I%20am%20interested%20in%20your%20full-stack%20marketing%20and%20landing%20page%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Chat on WhatsApp (+8801629105607)</span>
            </a>

            <Link
              href="/packages"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors"
            >
              <span>Explore Pricing & Packages</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
