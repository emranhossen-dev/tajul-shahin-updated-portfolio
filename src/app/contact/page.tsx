"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SiteContent, defaultSiteContent } from "@/lib/types";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Send,
  MessageSquare,
  Zap,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function ContactPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    service: "Complete E-Com Growth: Website to Ads ($449/mo)",
    budget: "50,000 - 1,50,000 BDT / month",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content) {
          setContent(data.content);
        }
      })
      .catch((err) => console.error("Error loading content:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

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
            `Audit request for ${formData.service}. Brand: ${formData.businessName || "Not provided"}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setWhatsappUrl(data.whatsappRedirect || `https://wa.me/8801629105607`);
      } else {
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      // Fallback
      setSubmitted(true);
      const encoded = encodeURIComponent(
        `Hi Tajul, my name is ${formData.name} (${formData.phone || formData.email}). I want to book a free growth audit for my brand ${formData.businessName || ""}. Package: ${formData.service}.`
      );
      setWhatsappUrl(`https://wa.me/8801629105607?text=${encoded}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Site Header */}
      <SiteHeader phone={content.profile.phone} />

      {/* Main Content */}
      <main className="pt-36 pb-24 sm:pt-44">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Complimentary 30-Minute Growth Audit
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
              Let&apos;s Build Your Funnel & <span className="text-blue-600">Scale Your Sales</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Ready to fix your mobile checkout, produce high-converting Bangla video ads, and scale your Meta & Google ads profitably? Fill out the details below or message directly on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info & Audit Highlights (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* WhatsApp Fast Track Card */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
                    Fastest Response (Under 10 Mins)
                  </div>
                  <h3 className="text-2xl font-black mb-3">Direct WhatsApp Discussion</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed mb-6">
                    Prefer direct chat? Send a WhatsApp message to Tajul Shahin to discuss your brand&apos;s goals immediately.
                  </p>
                  <a
                    href={`https://wa.me/${content.profile.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      "Hi Tajul, I am reaching out from your portfolio and would like to audit my store/ads."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-emerald-800 font-bold text-sm shadow-md hover:bg-emerald-50 transition-all"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Direct Phone / WhatsApp
                      </span>
                      <a
                        href={`tel:${content.profile.phone}`}
                        className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors"
                      >
                        {content.profile.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${content.profile.email}`}
                        className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors"
                      >
                        {content.profile.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Location
                      </span>
                      <span className="text-base font-bold text-slate-900">
                        {content.profile.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Working Hours
                      </span>
                      <span className="text-sm font-semibold text-slate-800">
                        Saturday – Thursday (10:00 AM – 10:00 PM BST)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Happens in the Free Audit */}
              <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200/80">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  What You Get in the Free Audit
                </h4>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ad Account & Business Manager compliance check</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Mobile landing page load speed & COD checkout analysis</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Server-side Meta CAPI & pixel tracking audit</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Actionable 60-day ROAS scaling roadmap</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Interactive Audit Request Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm relative">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      Audit Request Received!
                    </h3>
                    <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed mb-8">
                      Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Tajul will review your store details and contact you within 2 to 4 business hours.
                    </p>

                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 shadow-md transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Continue Conversation on WhatsApp</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-slate-100 pb-4 mb-6">
                      <h3 className="text-2xl font-black text-slate-900">
                        Request Your Growth Audit
                      </h3>
                      <p className="text-slate-500 text-xs mt-1">
                        Fill out the information below to schedule your review.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Your Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Tanvir Ahmed"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          WhatsApp / Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+880 17XX XXXXXX"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="tanvir@brand.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Business / Page / Website URL
                        </label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) =>
                            setFormData({ ...formData, businessName: e.target.value })
                          }
                          placeholder="facebook.com/yourpage or brand.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Select Desired Package
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-900 bg-slate-50/50"
                        >
                          <option value="Landing Page & Ads Starter ($249/mo)">
                            Landing Page & Ads Starter ($249/mo)
                          </option>
                          <option value="Complete E-Com Growth: Website to Ads ($449/mo)">
                            Complete E-Com Growth: Website to Ads ($449/mo - Recommended)
                          </option>
                          <option value="Scale & Dominance: Full-Stack Marketing ($799/mo)">
                            Scale & Dominance: Full-Stack Marketing ($799/mo)
                          </option>
                          <option value="One-Time Website & Tracking Sprint ($199 one-time)">
                            One-Time Website & Tracking Sprint ($199)
                          </option>
                          <option value="Custom Consultation / BM Audit">
                            Custom Consultation / BM Audit
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Current Monthly Ad Budget
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-900 bg-slate-50/50"
                        >
                          <option value="Under 50,000 BDT / month">Under 50,000 BDT / month</option>
                          <option value="50,000 - 1,50,000 BDT / month">
                            50,000 - 1,50,000 BDT / month
                          </option>
                          <option value="1,50,000 - 3,00,000 BDT / month">
                            1,50,000 - 3,00,000 BDT / month
                          </option>
                          <option value="3,00,000+ BDT / month (Scaling Brand)">
                            3,00,000+ BDT / month (Scaling Brand)
                          </option>
                          <option value="International ($1,000 - $5,000 USD/mo)">
                            International ($1,000 - $5,000 USD/mo)
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        What is your biggest current bottleneck or challenge?
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="e.g. My ads are getting clicks but few purchases; checkout is slow; or my BM pixel isn't reporting conversions accurately..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl primary-gradient-bg text-white font-bold text-sm shadow-md glow-button flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <span>Submit Free Audit Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-slate-500">
                      🔒 Your data is kept strictly confidential. No spam, ever.
                    </p>
                  </form>
                )}
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
