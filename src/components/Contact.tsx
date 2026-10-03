'use client';

import { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Loader2 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    title: string;
    text: string;
    type: 'success' | 'error';
    buttonText: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://ap1.emran.work';
      const res = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        
        // Custom Tailwind Glassmorphic Alert Notification (matches SweetAlert2 design)
        setAlertModal({
          isOpen: true,
          title: 'Thank You!',
          text: 'Thank you for your message! I will respond to your inquiry within a few hours.',
          type: 'success',
          buttonText: 'Awesome!',
        });
      } else {
        setAlertModal({
          isOpen: true,
          title: 'Oops...',
          text: 'Failed to send message. Please try again.',
          type: 'error',
          buttonText: 'OK',
        });
      }
    } catch {
      setAlertModal({
        isOpen: true,
        title: 'Error',
        text: 'Error connecting to server. Please try again later.',
        type: 'error',
        buttonText: 'OK',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-16 relative overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">Connect</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Get In Touch</p>
            <div className="w-12 h-1.5 bg-indigo-600 dark:bg-indigo-500 mx-auto mt-4 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Contact Details: Slides from LEFT */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal variant="fade-left">
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Let&apos;s discuss your next project</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
                I am open to discussing full-time opportunities, custom contracts, or general web development consulting. Get in touch directly using any of these channels:
              </p>

              <div className="space-y-4 pt-4">
                
                {/* Email Card */}
                <a
                  href="mailto:dev@emran.work"
                  className="p-5 rounded-2xl glass-card flex items-center gap-4 group transition-all duration-300"
                >
                  <div className="p-3 rounded-xl glass-pill text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Send an Email</p>
                    <p className="text-sm font-semibold text-white mt-0.5">dev@emran.work</p>
                  </div>
                </a>

                {/* Call Card */}
                <a
                  href="tel:+8801739642983"
                  className="p-5 rounded-2xl glass-card flex items-center gap-4 group transition-all duration-300"
                >
                  <div className="p-3 rounded-xl glass-pill text-indigo-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Call Directly</p>
                    <p className="text-sm font-semibold text-white mt-0.5">+880 1739-642983</p>
                  </div>
                </a>

                {/* WhatsApp Card */}
                <a
                  href="https://wa.me/8801739642983?text=Hello%20Emran,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl glass-card flex items-center gap-4 group transition-all duration-300"
                >
                  <div className="p-3 rounded-xl glass-pill text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">WhatsApp</p>
                    <p className="text-sm font-semibold text-white mt-0.5">+880 1739-642983</p>
                  </div>
                </a>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Contact Form: Slides from RIGHT */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-right">
              <div className="p-8 sm:p-10 rounded-3xl glass-card relative">
                {isSubmitted ? (
                  <div className="text-center py-12 space-y-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white">Message Delivered!</h3>
                    <p className="text-slate-400 text-sm max-w-md mx-auto">
                      Thank you for reaching out! I have received your message and will respond to your email as soon as possible.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell me about your project, timeline, or requirements..."
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>

      {/* Custom Tailwind Modal Notification (SweetAlert2 Replacement) */}
      {alertModal?.isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in"
          onClick={() => setAlertModal(null)}
        >
          <div 
            className="relative w-full max-w-[420px] p-8 rounded-3xl bg-[#0b1426]/95 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-center animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* SweetAlert2 Circular Icon with Animated Pulse */}
            {alertModal.type === 'success' ? (
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-[3px] border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center relative">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-20 pointer-events-none" />
              </div>
            ) : (
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-[3px] border-rose-500/30 bg-rose-500/10 flex items-center justify-center relative">
                <div className="w-14 h-14 rounded-full bg-rose-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-20 pointer-events-none" />
              </div>
            )}

            {/* Title */}
            <h3 className="text-2xl font-black text-white mb-2.5 tracking-tight">
              {alertModal.title}
            </h3>

            {/* Message body */}
            <p className="text-slate-300 text-sm font-medium leading-relaxed mb-7 px-2">
              {alertModal.text}
            </p>

            {/* Confirm button */}
            <button
              type="button"
              onClick={() => setAlertModal(null)}
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold shadow-lg shadow-indigo-600/40 hover:shadow-indigo-600/60 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {alertModal.buttonText}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
