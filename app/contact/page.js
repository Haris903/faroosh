'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  MessageCircle,
  User,
  ShoppingBag,
  Menu,
  X,
  CheckCircle2,
  Mail,
  ArrowUpRight,
  Leaf,
  Check,
  Loader2
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* 0. NEXT.JS FONT OPTIMIZATION & BRAND STYLES                        */
/* ------------------------------------------------------------------ */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const CSS = `
  html { scroll-behavior: smooth !important; }
  .faroosh {
    --ivory: oklch(0.985 0.005 85);
    --ink: oklch(0.16 0.015 60);
    --gold: oklch(0.72 0.14 75);
    --earth: oklch(0.48 0.09 62);
    --earth-deep: oklch(0.24 0.05 55);
    --secondary: oklch(0.96 0.01 85);
    --muted-fg: oklch(0.45 0.02 60);
    --border: oklch(0.89 0.01 80);
    font-family: var(--font-sans);
  }
  .f-display { font-family: var(--font-display); }
  .eyebrow {
    font-family: var(--font-sans); 
    font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.22em; text-transform: uppercase; white-space: nowrap;
  }
  .glass-nav {
    background: color-mix(in oklab, var(--ivory) 85%, transparent);
    backdrop-filter: blur(20px) saturate(160%);
    border-bottom: 1px solid color-mix(in oklab, var(--ink) 8%, transparent);
  }
  
  /* Custom Inputs */
  .faroosh-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(217, 119, 6, 0.3);
    padding: 0.75rem 0;
    font-size: 1rem;
    color: var(--ink);
    transition: all 0.3s ease;
  }
  .faroosh-input:focus {
    outline: none;
    border-bottom-color: var(--gold);
    box-shadow: 0 1px 0 0 var(--gold);
  }
  .faroosh-input::placeholder {
    color: rgba(95, 33, 19, 0.4);
  }
`;

function Styles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

/* ------------------------------------------------------------------ */
/* 1. HEADER COMPONENT (Premium Version)                              */
/* ------------------------------------------------------------------ */
const EASE = [0.16, 1, 0.3, 1];

const NAV_LINKS = [
  { label: "Story", href: "/#story" },
  { label: "Products", href: "/#products" },
  { label: "Contact", href: "/contact" },
];

function Header({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`glass-nav fixed inset-x-0 top-0 z-[99999] isolate transition-all duration-500 ${
        scrolled ? "py-3" : "py-4"
      }`}
    >
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-10">
        
        {/* LOGO */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1 lg:hidden cursor-pointer touch-manipulation text-[#3B110B]"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a href="/" className="text-left leading-none">
            <div className="flex flex-col h-full items-center text-center group">
              <Image width={30} height={30} src="/faroosh.png" alt="Faroosh Logo" className="transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-translate-y-1" />
              <p className="text-[#CAA387] font-sans font-medium text-sm mt-1 transition-colors duration-500 group-hover:text-[#D97706]">Faroosh.pk</p>
            </div>
          </a>
        </div>

        {/* MIDDLE TICKER / TAG (Specific for Contact Page) */}
        <div className="hidden justify-center md:flex">
          <div className="flex items-center gap-3 rounded-full border border-[#D97706]/20 bg-white/50 px-5 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600"></span>
            </span>
            <span className="eyebrow text-[#3B110B] text-[0.65rem] font-semibold uppercase tracking-widest">
              POTHOHAR · PAKISTAN
            </span>
          </div>
        </div>

        {/* RIGHT SIDE LINKS */}
        <div className="flex items-center justify-end gap-5 md:gap-9">
          {/* NAVIGATION LINKS */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="group relative">
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (link.label === "Products") {
                      // Sirf Products ke liye default behavior rokein aur dropdown kholain
                      e.preventDefault();
                      setIsProductsOpen(!isProductsOpen);
                    } else {
                      // Baqi links par click hone par dropdown band kar dein
                      setIsProductsOpen(false);
                      
                      // Aapki purani original scroll logic
                      const targetStr = link.href.replace('/', '');
                      const el = document.querySelector(targetStr);
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className="relative flex items-center gap-1.5 justify-center eyebrow cursor-pointer font-bold tracking-widest py-2 text-[var(--muted-fg)] transition-colors duration-[0.4s] group-hover:text-[#D97706]"
                >
                  <span>{link.label}</span>
                  
                  {/* Arrow icon (Products dropdown ke liye) */}
                  {link.label === "Products" && (
                    <svg 
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : 'rotate-0'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}

                  {/* Golden Sweep Line (Hover par chalegi) */}
                  <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-gradient-to-r from-[#E11D48] via-[#EA580C] to-[#D97706] origin-right scale-x-0 transition-transform duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                </a>

                {/* Dropdown Menu (Click state par kaam karega) */}
                {link.label === "Products" && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 z-50 ${isProductsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                    <div className="flex flex-col bg-white/95 backdrop-blur-md border border-[#FDE68A] shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-xl py-2 w-48 overflow-hidden">
                      <a href="#products" onClick={() => setIsProductsOpen(false)} className="eyebrow px-5 py-3 text-[10.5px] text-stone-600 transition-colors hover:text-[#D97706] hover:bg-amber-50/80">Dry Fruits</a>
                      <a href="#products" onClick={() => setIsProductsOpen(false)} className="eyebrow px-5 py-3 text-[10.5px] text-stone-600 transition-colors hover:text-[#D97706] hover:bg-amber-50/80">Seasonal Fruits</a>
                      <a href="#products" onClick={() => setIsProductsOpen(false)} className="eyebrow px-5 py-3 text-[10.5px] text-stone-600 transition-colors hover:text-[#D97706] hover:bg-amber-50/80">Raw Honey</a>
                      <a href="#products" onClick={() => setIsProductsOpen(false)} className="eyebrow px-5 py-3 text-[10.5px] text-stone-600 transition-colors hover:text-[#D97706] hover:bg-amber-50/80">Potohar Peanuts</a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button type="button" className="hidden sm:block group relative cursor-pointer touch-manipulation p-1">
              <User size={19} strokeWidth={1.5} className="text-[#3B110B] transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:text-[#D97706]" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D97706] opacity-0 scale-0 transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100" />
            </button>
            <button
              type="button"
              onClick={onCartClick}
              className="group relative cursor-pointer touch-manipulation p-1"
            >
              <ShoppingBag size={19} strokeWidth={1.5} className="text-[#3B110B] transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:text-[#D97706]" />
              {cartCount === 0 && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D97706] opacity-0 scale-0 transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white/95 lg:hidden mt-2"
          >
            <div className="flex flex-col gap-5 px-6 pb-8 pt-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="eyebrow text-[#3B110B] text-sm font-semibold cursor-pointer touch-manipulation"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/* 2. INQUIRY FORM COMPONENT (With Validation & Success States)       */
/* ------------------------------------------------------------------ */
function InquiryForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation (Phone is now removed from required errors)
    const newErrors = {
      name: formData.name.trim() === "",
      message: formData.message.trim() === "",
    };
    
    setErrors(newErrors);

    // If validation fails, stop submission
    if (newErrors.name || newErrors.message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] bg-white border border-[#D97706]/20 shadow-2xl shadow-[#D97706]/5">
      <AnimatePresence mode="wait">
        
        {/* SUCCESS STATE */}
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-center justify-center p-12 lg:p-16 text-center h-[500px]"
          >
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-[#E11D48] to-[#EA580C] rounded-full flex items-center justify-center shadow-lg shadow-[#E11D48]/20 mb-6"
            >
              <Check size={36} className="text-white" strokeWidth={3} />
            </motion.div>
            <h3 className="f-display text-4xl lg:text-5xl text-[#3B110B] font-medium tracking-tight mb-4">
              Inquiry received.
            </h3>
            <p className="text-[#5F2113]/80 font-medium max-w-sm mb-8 leading-relaxed">
              Thank you for reaching out to Faroosh. Our team will be in touch shortly from our Pothohar base.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-[#E11D48] font-bold border-b border-[#E11D48]/30 pb-1 hover:border-[#E11D48] transition-colors"
            >
              Send another Inquiry
            </button>
          </motion.div>
        ) : (
          
          /* FORM STATE */
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="p-8 lg:p-12 flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="f-display font-jakarta text-3xl lg:text-4xl whitesapce-nowrap text-[#3B110B]">Send an Inquiry</h3>
              <span className="bg-[#FEF1F2] text-[#E11D48] text-[0.65rem] whitespace-nowrap font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                We're listening
              </span>
            </div>

            <p className="text-[#5F2113]/70 font-medium text-sm mb-8">
              We usually respond within one business day directly from the farm.
            </p>

            <div className="space-y-6 flex-1">
              {/* Name Field (Required) */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if(errors.name) setErrors({...errors, name: false});
                  }}
                  className={`faroosh-input ${errors.name ? 'border-[#E11D48]' : ''}`}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.span 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className="absolute -bottom-5 left-0 text-[0.7rem] font-bold text-[#E11D48]"
                    >
                      *Enter Name
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone Field (Optional - Numbers Only) */}
              <div className="relative">
                <input 
                  type="tel" 
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                    setFormData({...formData, phone: onlyNums});
                  }}
                  className="faroosh-input"
                />
              </div>

              {/* Email Field (Optional) */}
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email Address (Optional)"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="faroosh-input"
                />
              </div>

              {/* Message Field (Required) */}
              <div className="relative pt-4">
                <textarea 
                  placeholder="How can we help you? *"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({...formData, message: e.target.value});
                    if(errors.message) setErrors({...errors, message: false});
                  }}
                  className={`faroosh-input resize-none ${errors.message ? 'border-[#E11D48]' : ''}`}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.span 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className="absolute -bottom-3 left-0 text-[0.7rem] font-bold text-[#E11D48]"
                    >
                      *Message is required
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-10 flex w-full justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-amber-500/40 bg-gradient-to-r from-[#FDF9F1] via-[#FFFDF8] to-[#FDF9F1] px-6 py-3.5 shadow-[0_4px_15px_rgba(217,119,6,0.08)] transition-all duration-500 hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-[0_8px_20px_rgba(225,29,72,0.15)] touch-manipulation cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* Ambient Hover Gradient Backdrop */}
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-amber-500/15 to-orange-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Light Sweep (Shine) Animation */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/90 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

                {/* Live Pulsing Indicator Dot */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-600" />
                </span>

                {/* Typography / Button Text */}
                <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-stone-800 transition-colors duration-300 group-hover:text-amber-950">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin inline" /> : "Send Inquiry"}
                </span>

                {/* Animated Circle Icon with Gradient Fill on Hover */}
                <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-800 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-amber-500 group-hover:text-white group-hover:shadow-md">
                  <svg
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. MAIN CONTACT PAGE COMPONENT                                     */
/* ------------------------------------------------------------------ */
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
};

export default function FarooshContactPage() {
  return (
    <div className={`faroosh relative min-h-screen bg-[#FFFDF5] text-[#3B110B] font-sans antialiased selection:bg-[#D97706] selection:text-white ${cormorant.variable} ${jakarta.variable}`}>
      <Styles />
      <Header cartCount={0} onCartClick={() => {}} />

      {/* SUBTLE BACKGROUND TEXTURE/GLOW */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F59E0B]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#E11D48]/5 blur-[130px]" />
      </div>

      <main className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-24 px-5 md:px-10 max-w-[1400px] mx-auto min-h-[90vh] flex flex-col justify-center">
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
        >
          
          {/* LEFT COLUMN: BRAND STORY & DIRECT CONTACT INFO */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* Intro Text */}
            <div className="space-y-6">
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#E11D48]" />
                <span className="eyebrow text-[#E11D48] tracking-[0.25em]">Direct Connection</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeUp}
                className="f-display text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[1.05] text-[#3B110B]"
              >
                Direct From the Source to Your Hands.
              </motion.h1>
              
              <motion.p 
                variants={fadeUp}
                className="text-[#5F2113]/90 text-lg md:text-xl font-medium leading-relaxed max-w-lg"
              >
                Have a question about our harvest, bulk sourcing, or native produce? Reach out to us directly. No middlemen, just authentic farmers from the Pothohar plateau.
              </motion.p>
            </div>

            {/* Our Promise Section */}
            <motion.div variants={fadeUp} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF1F2] text-[#E11D48] flex items-center justify-center">
                  <Leaf size={18} strokeWidth={2} />
                </div>
                <h3 className="f-display text-2xl font-medium">Our Promise</h3>
              </div>
              
              <ul className="space-y-4 pl-2">
                {["Native Region Sourcing", "Zero Middlemen", "Premium Unadulterated Quality"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#5F2113] font-medium text-sm md:text-base">
                    <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-[#D97706]" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Direct Contact Links */}
            <motion.div variants={fadeUp} className="space-y-5 pt-4">
              <span className="eyebrow text-[#5F2113]/60 tracking-widest block mb-2">Talk to us directly</span>
              
              {/* WhatsApp Premium Button */}
             <a 
  href="https://api.whatsapp.com/send?phone=923710506436" 
  target="_blank" 
  rel="noreferrer"
  className="group flex items-center justify-between w-full max-w-md p-4 rounded-2xl border border-[#D97706]/30 bg-white/60 hover:bg-white shadow-sm hover:shadow-md transition-all duration-300"
>
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-[#E11D48] text-white flex items-center justify-center shadow-lg shadow-[#E11D48]/30 group-hover:scale-105 transition-transform">
      <MessageCircle size={22} fill="currentColor" />
    </div>
    <div>
      <p className="text-xs font-bold text-[#5F2113]/70 uppercase tracking-widest mb-0.5">WhatsApp</p>
      <p className="text-lg font-jakarta tracking-wide font-bold text-[#3B110B]">Chat Instantly</p>
    </div>
  </div>
  <ArrowUpRight size={20} className="text-[#D97706] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
</a>

              {/* Email & Location */}
              <div className="flex flex-col gap-4 pl-2 mt-6">
                <a href="mailto:hello@faroosh.pk" className="flex items-center gap-4 text-[#5F2113] font-medium hover:text-[#D97706] transition-colors w-fit">
                  <Mail size={18} className="text-[#E11D48]" />
                  hello@faroosh.pk
                </a>
                <div className="flex items-center gap-4 text-[#5F2113] font-medium">
                  <MapPin size={18} className="text-[#E11D48]" />
                  Pothohar Region Base
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: THE INQUIRY FORM */}
          <motion.div variants={fadeUp} className="lg:col-span-6 w-full max-w-xl mx-auto lg:ml-auto lg:mr-0 mt-8 lg:mt-0">
            <InquiryForm />
          </motion.div>

        </motion.div>
      </main>

      {/* MINIMAL LUXURY FOOTER */}
      <footer className="relative z-10 border-t border-[#D97706]/20 mt-12 bg-white/40 backdrop-blur-sm">
  <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
    <p className="font-serif text-xs md:text-sm text-[#5F2113] font-medium tracking-wider leading-relaxed">
      Faroosh <span className="inline-block mx-1.5 opacity-50">·</span> Grown with care in the Pothohar Region
    </p>
    <p className="font-serif text-xs md:text-sm text-[#5F2113]/80 font-normal tracking-wide italic">
      Native produce. Honest relationships.
    </p>
  </div>
</footer>
    </div>
  );
}