"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Target,
  FileCode,
  SlidersHorizontal,
} from "lucide-react";

interface SiteFooterProps {
  phone?: string;
  email?: string;
  location?: string;
}

export default function SiteFooter({
  phone = "+8801629105607",
  email = "tajulshahin96@gmail.com",
  location = "Dhaka, Bangladesh",
}: SiteFooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-base shadow-sm">
                TS
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                TAJUL <span className="text-blue-500">SHAHIN</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Helping businesses in Bangladesh and worldwide scale profitably with complete sales funnels: high-speed COD landing pages, scroll-stopping video ads, and server-side Meta CAPI tracking.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for New Sprints
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  Full Services
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-blue-400 transition-colors">
                  Pricing & Packages
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-blue-400 transition-colors">
                  Verified Case Studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Book Free Audit Call
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-slate-200 transition-colors font-mono">
                  Admin Panel (PIN: 1234)
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              What I Deliver
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>High-Speed COD Landing Pages</li>
              <li>Meta & Google Ads Scaling</li>
              <li>UGC & Motion Video Creatives</li>
              <li>Server-Side Meta CAPI Tracking</li>
              <li>BM & Ad Account Policy Audit</li>
              <li>WhatsApp & SMS Order Recovery</li>
            </ul>
          </div>

          {/* Direct Line */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-400 font-mono">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} Tajul Shahin. All rights reserved. Full-Stack Performance Marketing & Web Development.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/services" className="hover:text-slate-300">
              Services
            </Link>
            <span>·</span>
            <Link href="/packages" className="hover:text-slate-300">
              Packages
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-slate-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
