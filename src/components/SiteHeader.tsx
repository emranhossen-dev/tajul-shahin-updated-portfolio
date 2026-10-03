"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  Sparkles,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

interface SiteHeaderProps {
  phone?: string;
}

export default function SiteHeader({ phone = "+8801629105607" }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact & Audit", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-base shadow-sm group-hover:scale-105 transition-transform">
            TS
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-slate-900 whitespace-nowrap">
              TAJUL <span className="text-blue-600">SHAHIN</span>
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-mono font-bold tracking-wider uppercase border border-blue-200/60 whitespace-nowrap">
              Performance Marketer
            </span>
          </div>
        </Link>

        {/* Minimal Clean Desktop Nav Menu */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-bold">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1.5 transition-all whitespace-nowrap relative ${
                  active
                    ? "text-blue-600 font-extrabold"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Header Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              "Hi Tajul, I am visiting your portfolio and want to discuss a complete ads & website solution for my business."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-3.5 py-2.5 rounded-xl border border-emerald-200/80 transition-all shadow-2xs whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="primary-gradient-bg text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs glow-button flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200"
            title="Chat on WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-6 shadow-xl animate-fade-in space-y-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl font-bold text-sm ${
                    active
                      ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full primary-gradient-bg text-white font-bold py-3 rounded-xl text-center text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Book Free Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200/80"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct WhatsApp (+8801629105607)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
