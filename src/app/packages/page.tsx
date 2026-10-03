"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SiteContent, defaultSiteContent, PackageItem } from "@/lib/types";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  DollarSign,
  TrendingUp,
  Sliders,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function PackagesPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive ROI Calculator State
  const [adBudget, setAdBudget] = useState(2500);
  const [targetRoas, setTargetRoas] = useState(3.8);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content) {
          setContent(data.content);
        }
      })
      .catch((err) => console.error("Error loading packages:", err));
  }, []);

  const projectedRevenue = Math.round(adBudget * targetRoas);
  const projectedProfit = Math.round(projectedRevenue - adBudget);

  const faqs = [
    {
      q: "Why do your packages include both website development and ad management?",
      a: "In Bangladesh and global e-commerce, 80% of ad budget is wasted if traffic lands on a slow, generic, or clunky page. When we build the high-speed landing page with a 1-click Cash on Delivery (COD) form and server-side CAPI tracking, the conversion rate often doubles. Combining web development and ads ensures that every dollar spent generates maximum purchases.",
    },
    {
      q: "Do I need to pay for ad spend separately?",
      a: "Yes, our package fees cover the complete technical build, video creative production, pixel & CAPI engineering, campaign setup, daily optimization, and scaling. The ad spend budget is paid directly from your credit/dual-currency debit card to Meta and Google.",
    },
    {
      q: "Can you help if my Facebook Business Manager or Ad Account is restricted?",
      a: "Yes! All packages include a full Business Manager and compliance health check. If your BM or pixel is restricted, we audit the policy violations, fix your payment authorizations, and guide you through verified appeals or backup account setups.",
    },
    {
      q: "How fast will my landing page and ads be live?",
      a: "Typically within 3 to 5 business days. We write the conversion copy, build the mobile-optimized COD checkout funnel, install server-side CAPI tracking, script and edit the video creatives, and launch the ad campaigns upon your final approval.",
    },
    {
      q: "Can I pay in Bangladeshi Taka (BDT)?",
      a: "Yes, we accept local payments via bKash, Nagad, and local Bangladeshi bank transfers, as well as USD/international payments via Wise, Payoneer, or direct bank transfer.",
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
            Transparent Pricing · No Hidden Fees
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            Complete Ads Solutions: <span className="text-blue-600">From Website to Scaled Ads</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Choose the package tailored to your business stage. Every tier combines high-speed mobile COD landing pages, scroll-stopping video creatives, server-side CAPI tracking, and profitable ad management.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#packages-grid"
              className="primary-gradient-bg text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md glow-button flex items-center gap-2"
            >
              <span>Explore All Bundles</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/8801629105607?text=Hi%20Tajul,%20I%20want%20to%20consult%20about%20your%20growth%20packages%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-300 shadow-2xs flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-white border-y border-slate-200" id="packages-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest block mb-2">
              Performance Bundles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Select Your Growth Plan
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Full-service execution designed to maximize your profit and return on ad spend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? "border-2 border-blue-600 shadow-xl relative hover:scale-[1.02]"
                    : "border-slate-200 shadow-2xs hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 primary-gradient-bg px-4 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-2xs whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div
                    className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                      pkg.popular ? "text-blue-600 font-extrabold" : "text-slate-500"
                    }`}
                  >
                    {pkg.name}
                  </div>

                  <div className="mb-4 flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                      {pkg.price}
                    </span>
                    <span className="text-slate-500 text-xs font-semibold">
                      {pkg.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-6 leading-relaxed min-h-[40px]">
                    {pkg.description}
                  </p>

                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Deliverables Included:
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-slate-700">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/contact?package=${encodeURIComponent(
                      `${pkg.name} (${pkg.price}${pkg.period})`
                    )}`}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all text-center flex items-center justify-center gap-1.5 ${
                      pkg.popular
                        ? "primary-gradient-bg text-white glow-button shadow-xs"
                        : "border border-slate-300 hover:border-blue-600 text-slate-800 hover:text-blue-600 bg-slate-50/50"
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator Section */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider mb-2 inline-block">
                Interactive Forecaster
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Calculate Your Projected Revenue & ROAS
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Estimate what high-converting COD landing pages and structured CBO ad scaling can generate for your store.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Monthly Ad Budget
                    </label>
                    <span className="text-sm font-black text-blue-600 font-mono">
                      ${adBudget.toLocaleString()} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="250"
                    value={adBudget}
                    onChange={(e) => setAdBudget(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>$500</span>
                    <span>$5,000</span>
                    <span>$10,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Target Blended ROAS
                    </label>
                    <span className="text-sm font-black text-emerald-600 font-mono">
                      {targetRoas.toFixed(1)}x ROAS
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2.0"
                    max="6.0"
                    step="0.1"
                    value={targetRoas}
                    onChange={(e) => setTargetRoas(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>2.0x (Break-even)</span>
                    <span>3.8x (Typical Client)</span>
                    <span>6.0x (Peak Scaling)</span>
                  </div>
                </div>
              </div>

              {/* Calculated Output Box */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Projected Gross Revenue
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                    ${projectedRevenue.toLocaleString()}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Est. Gross Profit
                    </div>
                    <div className="text-xl font-bold text-white font-mono">
                      ${projectedProfit.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Multiplier
                    </div>
                    <div className="text-xl font-bold text-blue-400 font-mono">
                      {targetRoas.toFixed(1)}x
                    </div>
                  </div>
                </div>

                <Link
                  href={`/contact?budget=$${adBudget.toLocaleString()}/mo`}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all mt-4"
                >
                  <span>Claim Strategy Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Comparison Matrix */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Feature-by-Feature Comparison
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              See exactly what is included in each complete marketing & development tier.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 font-bold text-slate-900 bg-slate-50 rounded-tl-xl">
                    Deliverable / Capability
                  </th>
                  <th className="py-4 px-4 font-bold text-slate-700 text-center">
                    Starter ($249/mo)
                  </th>
                  <th className="py-4 px-4 font-black text-blue-600 text-center bg-blue-50/50">
                    Complete E-Com ($449/mo)
                  </th>
                  <th className="py-4 px-4 font-bold text-slate-700 text-center">
                    Scale ($799/mo)
                  </th>
                  <th className="py-4 px-4 font-bold text-slate-700 text-center rounded-tr-xl">
                    One-Time ($199)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "High-Speed COD Landing Page", s: "1 Page", c: "Custom Store/Funnel", sc: "Full Store + A/B", o: "1 Page" },
                  { name: "Monthly Video Creatives", s: "2 Videos", c: "4–6 Videos", sc: "8–12 Videos", o: "—" },
                  { name: "Meta & Google Ads Scaling", s: "Meta Only", c: "Meta + Google", sc: "Meta + Google + YouTube", o: "—" },
                  { name: "Server-Side Meta CAPI Tracking", s: "Yes", c: "Yes (Full GTM+GA4)", sc: "Yes (Advanced)", o: "Yes" },
                  { name: "Cash on Delivery (COD) Checkout", s: "Yes", c: "Yes", sc: "Yes", o: "Yes" },
                  { name: "Automated SMS/WhatsApp Verification", s: "—", c: "Yes", sc: "Yes (Advanced RTO)", o: "—" },
                  { name: "Weekly Strategy & Scaling Sync", s: "Bi-Weekly", c: "Weekly", sc: "Daily/Priority", o: "1 Call" },
                ].map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {row.name}
                    </td>
                    <td className="py-4 px-4 text-center text-slate-600 font-mono">
                      {row.s}
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-blue-700 font-mono bg-blue-50/30">
                      {row.c}
                    </td>
                    <td className="py-4 px-4 text-center text-slate-600 font-mono">
                      {row.sc}
                    </td>
                    <td className="py-4 px-4 text-center text-slate-600 font-mono">
                      {row.o}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Everything you need to know about pricing, deliverables, and scaling.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                  className="w-full p-5 text-left flex justify-between items-center font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === fIdx ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === fIdx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
