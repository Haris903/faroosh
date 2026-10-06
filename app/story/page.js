'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  MessageCircle,
  Clock,
  Search,
  User,
  ShoppingBag,
  ArrowUpRight,
  Menu,
  X
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* 0. FONTS & THEME CONFIGURATION                                     */
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

const CSS_STYLES = `
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
  .f-bg { background: var(--ivory); }
  .f-ink { color: var(--ink); }
  .f-muted { color: var(--muted-fg); }
  .f-accent { color: var(--gold); }
  .f-sec { background: var(--secondary); }
  .f-border { border-color: var(--border); }
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
  .rule-gold {
    height: 1px;
    background: linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 90%, transparent), transparent);
  }
`;

/* ------------------------------------------------------------------ */
/* 1. CONSTANTS & ANIMATION VARIANTS                                 */
/* ------------------------------------------------------------------ */
const EASE = [0.16, 1, 0.3, 1];

const NAV_LINKS = [
  { label: "Story", href: "/home/#story" },
  { label: "Products", href: "/home/#products" },
  { label: "Contact", href: "./contact" },
];

const ANNOUNCEMENTS = [
  "100% Pure Wild Alpine Honey Harvested from Gilgit",
  "Fresh Batch: Rain-Fed Potohar Peanuts In Stock",
  "Sun-Cured Hunza Organic Dried Apricots Available",
  "Free Shipping Across Pakistan on Orders Over 3,000 PKR",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 }
  }
};

/* ------------------------------------------------------------------ */
/* 2. MAIN STORY PAGE (Unified Component)                             */
/* ------------------------------------------------------------------ */
export default function FarooshStoryPage() {
  // Navigation & Cart States
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeAnnounce, setActiveAnnounce] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const whatsappUrl = "https://api.whatsapp.com/send?phone=923710506436";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });

    const announceTimer = setInterval(() => {
      setActiveAnnounce((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 7000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(announceTimer);
    };
  }, []);

  return (
    <div className={`faroosh relative min-h-screen bg-[#FFFDF5] text-[#3B110B] selection:bg-[#E11D48] selection:text-white font-jakarta overflow-x-hidden antialiased ${cormorant.variable} ${jakarta.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS_STYLES }} />

      {/* CUSTOM THEME SCROLLBAR STYLES */}
      <style>{`
        ::-webkit-scrollbar { width: 9px; }
        ::-webkit-scrollbar-track { background: #FFFDF5; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #E11D48 0%, #EA580C 50%, #D97706 100%);
          border-radius: 9999px; border: 2px solid #FFFDF5;
        }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #BE123C 0%, #C2410C 50%, #B45309 100%); }
        * { scrollbar-width: thin; scrollbar-color: #EA580C #FFFDF5; }
      `}</style>

      {/* ========================================================= */}
      {/* 1. NAVBAR & HEADER                                        */}
      {/* ========================================================= */}
        <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                className={`fixed inset-x-0 top-0 z-[99999] isolate transition-all duration-500 font-jakarta ${
                  scrolled
                    ? "py-2 sm:py-2.5 px-3 sm:px-6 md:px-5"
                    : "py-3 sm:py-4 px-4 sm:px-8 md:px-12"
                }`}
              >
                {/* Main Floating Glass Island */}
                <div
                  className={`mx-auto max-w-[1520px] transition-all duration-500 rounded-2xl md:rounded-full border ${
                    scrolled
                      ? "bg-[#FFFDF8]/85 backdrop-blur-2xl shadow-[0_12px_40px_-10px_rgba(36,18,12,0.12)] border-[#D97706]/25 px-4 sm:px-6 py-2.5"
                      : "bg-white/70 backdrop-blur-xl border-white/60 shadow-xs px-4 sm:px-6 py-2.5 sm:py-3"
                  }`}
                >
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
                    
                    {/* LEFT: Mobile Menu Button & Brand Monogram */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Tactical Minimalist Mobile Trigger */}
                      <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300/80 bg-white/80 text-[#3B110B] lg:hidden cursor-pointer touch-manipulation hover:border-[#D97706] transition-colors"
                        aria-label="Toggle Navigation"
                      >
                        <AnimatePresence mode="wait">
                          {menuOpen ? (
                            <motion.div
                              key="close"
                              initial={{ rotate: -90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              exit={{ rotate: 90, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <X size={18} strokeWidth={2} />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="menu"
                              initial={{ rotate: 90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              exit={{ rotate: -90, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="flex flex-col gap-1 items-center justify-center"
                            >
                              <span className="h-[1.5px] w-4 bg-[#3B110B] rounded-full" />
                              <span className="h-[1.5px] w-3 bg-[#D97706] rounded-full self-start ml-0.5" />
                              <span className="h-[1.5px] w-4 bg-[#3B110B] rounded-full" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
      
                      {/* Brand Identity Seal */}
                      <Link href="/" className="group flex items-center gap-2.5 cursor-pointer">
                        <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/40 shadow-xs transition-transform duration-300 group-hover:scale-105">
                          <Image
                            src="/faroosh.png"
                            alt="Faroosh Logo"
                            width={22}
                            height={22}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col leading-none">
                          <span className="f-display text-lg sm:text-xl font-medium tracking-tight text-[#3B110B] group-hover:text-[#D97706] transition-colors">
                            Faroosh
                          </span>
                          <span className="text-[8px] sm:text-[8.5px] font-bold uppercase tracking-[0.24em] text-[#CAA387]">
                            Farms
                          </span>
                        </div>
                      </Link>
                    </div>
      
                   
                   
              {/* CENTER: Desktop Live Ticker Bulletin */}
             <div className="hidden lg:flex justify-center">
                             <div className="flex items-center gap-3 rounded-full border border-stone-200/80 bg-white/70 px-4 py-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-md">
                               <span className="relative flex h-2 w-2 shrink-0">
                                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                 <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                               </span>
             
                               <div className="relative h-4 w-[280px] xl:w-[340px] overflow-hidden">
                                 <AnimatePresence mode="wait">
                                   <motion.div
                                     key={activeAnnounce}
                                     initial={{ x: 10, opacity: 0 }}
                                     animate={{ x: -240, opacity: 1 }}
                                     exit={{ opacity: 0 }}
                                     transition={{
                                       x: { delay: 1.6, duration: 4.8, ease: "linear" },
                                       opacity: { duration: 0.35 },
                                     }}
                                     className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap will-change-transform"
                                   >
                                     <span className="eyebrow text-[#24120C] text-[0.68rem] font-bold uppercase tracking-[0.22em] select-none">
                                       {ANNOUNCEMENTS[activeAnnounce]}
                                     </span>
                                   </motion.div>
                                 </AnimatePresence>
                               </div>
                             </div>
                           </div>

                    {/* RIGHT: Desktop Nav & Action Suite */}
                    <div className="flex items-center justify-end gap-3 sm:gap-6">
                      
                      {/* Desktop Editorial Navigation Links */}
                      {/* Desktop Editorial Navigation Links */}
                      <nav className="hidden lg:flex items-center gap-7">
                        {NAV_LINKS.map((link) => (
                          <div key={link.label} className="group relative">
                            <Link
                              href={link.href}
                              onClick={(e) => {
                                if (link.href.includes("#")) {
                                  const hash = "#" + link.href.split("#")[1];
                                  const isHome =
                                    window.location.pathname === "/home" ||
                                    window.location.pathname === "/";

                                  // Agar user pehle se home page par hai toh smooth scroll hoga
                                  if (isHome) {
                                    e.preventDefault();
                                    const el = document.querySelector(hash);
                                    if (el) {
                                      const headerOffset = 90;
                                      const elementPosition = el.getBoundingClientRect().top;
                                      const offsetPosition = elementPosition + window.scrollY - headerOffset;
                                      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                                    }
                                  }
                                  // Agar kisi doosre page par hai toh Next.js khud /home/#story ya /home/#products par le jayega
                                }
                              }}
                              className="relative flex items-center gap-1.5 py-1 text-xs font-bold tracking-[0.2em] uppercase text-stone-700 transition-colors duration-200 hover:text-[#D97706] cursor-pointer"
                            >
                              <span>{link.label}</span>
      
                              {link.label === "Products" && (
                                <svg
                                  className="w-3 h-3 origin-center transition-transform duration-300 ease-out group-hover:rotate-180 text-stone-500 group-hover:text-[#D97706]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  <path d="m6 9 6 6 6-6" />
                                </svg>
                              )}
      
                              {/* Gold Underline Sweep */}
                              <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[#D97706] origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
                            </Link>
      
                            {/* Dropdown Menu */}
                            {link.label === "Products" && (
                              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 z-50 opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto">
                                <div className="flex flex-col bg-white/95 backdrop-blur-2xl border border-amber-200/80 shadow-[0_14px_35px_-5px_rgba(0,0,0,0.12)] rounded-2xl py-2 w-52 overflow-hidden">
                                  {["Dry Fruits", "Seasonal Fruits", "Raw Honey", "Potohar Peanuts"].map((cat) => (
                                    <Link
                                      key={cat}
                                      href="/home/#products"
                                      onClick={(e) => {
                                        const isHome =
                                          window.location.pathname === "/home" ||
                                          window.location.pathname === "/";
                                        if (isHome) {
                                          e.preventDefault();
                                          const el = document.querySelector("#products");
                                          if (el) {
                                            const headerOffset = 90;
                                            const elementPosition = el.getBoundingClientRect().top;
                                            const offsetPosition = elementPosition + window.scrollY - headerOffset;
                                            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                                          }
                                        }
                                      }}
                                      className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-stone-700 transition-colors hover:text-[#D97706] hover:bg-amber-50/70"
                                    >
                                      {cat}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </nav>
      
                      <div className="h-4 w-[1px] bg-stone-300 hidden lg:block" />
      
                      {/* Interactive Action Badges */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        
                        {/* Search Icon Trigger */}
                      
      
                        {/* Profile (Desktop Only) */}
                       
      
                        {/* Cart Basket Button with Amber Glow Count */}
                        <button
                          type="button"
                          onClick={() => setCartOpen(true)}
                          className="group relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-stone-200/80 bg-white/70 hover:bg-white text-stone-700 hover:text-[#D97706] shadow-2xs transition-all cursor-pointer"
                          aria-label="View Shopping Basket"
                        >
                          <ShoppingBag size={16} strokeWidth={2} />
                          <AnimatePresence>
                            {cart.length > 0 && (
                              <motion.span
                                key={cart.length}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#E11D48] px-1 text-[9px] font-bold text-white shadow-sm"
                              >
                                {cart.length}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>
      
                    </div>
      
                  </div>
      
                  {/* MOBILE ONLY: Live Kinetic Terroir Ribbon (Khali Pan Khatam Karne Ke Liye) */}

               {/* MOBILE ONLY: Live Kinetic Terroir Ribbon */}
            <div className="mt-2 pt-2 border-t border-stone-200/60 lg:hidden flex items-center gap-2 overflow-hidden">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D97706]" />
                            </span>
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#B45309]">
                              Live:
                            </span>
                          </div>
            
                          <div className="relative h-4 w-full overflow-hidden">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeAnnounce}
                                initial={{ x: 10, opacity: 0 }}
                                animate={{ x: -260, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  x: { delay: 1.5, duration: 5.2, ease: "linear" },
                                  opacity: { duration: 0.35 },
                                }}
                                className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap will-change-transform"
                              >
                                <span className="eyebrow text-[#24120C] text-[0.65rem] font-bold uppercase tracking-wider select-none">
                                  {ANNOUNCEMENTS[activeAnnounce]}
                                </span>
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>
                </div>
      
                {/* Search Dropdown Drawer */}
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden mx-auto max-w-[1520px] mt-2 rounded-2xl bg-white/95 backdrop-blur-2xl border border-amber-200/70 shadow-xl"
                    >
                      <div className="px-6 py-4 flex items-center gap-3">
                        <Search size={18} className="text-[#D97706] shrink-0" />
                        <input
                          autoFocus
                          placeholder="Search raw honey, Potohar peanuts, swatted apricots…"
                          className="w-full bg-transparent text-sm sm:text-base font-medium outline-none placeholder:text-stone-400 text-[#3B110B] font-jakarta"
                        />
                        <button
                          type="button"
                          onClick={() => setSearchOpen(false)}
                          className="text-stone-400 hover:text-stone-700 p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
      
                {/* Full-Screen Editorial Mobile Curtain Menu */}
              {/* Full-Screen Editorial Mobile Curtain Menu */}
                <AnimatePresence>
                  {menuOpen && (
                    <motion.nav
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="lg:hidden mx-auto max-w-[1520px] mt-2 overflow-hidden rounded-3xl bg-[#FFFDF9]/98 backdrop-blur-3xl border border-amber-300/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6"
                    >
                      {/* Header Tag */}
                      <div className="flex items-center justify-between border-b border-stone-200/80 pb-3 mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B45309]">
                          Faroosh Directory
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Autumn Harvest
                        </span>
                      </div>
      
                      {/* Main Navigation Links */}
                      <div className="flex flex-col gap-5">
                        {[
                          { num: "01", label: "Story", href: "/home/#story", sub: "Three Generations of Craft" },
                          { num: "02", label: "Products", href: "/home/#products", sub: "Potohar & Gilgit Terroir" },
                          { num: "03", label: "Contact", href: "/contact", sub: "Direct From Orchards" },
                        ].map((link, idx) => (
                          <motion.div
                            key={link.label}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 + 0.05 }}
                          >
                            <Link
                              href={link.href}
                              onClick={(e) => {
                                setMenuOpen(false);
                                if (link.href.includes("#")) {
                                  const hash = "#" + link.href.split("#")[1];
                                  const isHome =
                                    window.location.pathname === "/home" ||
                                    window.location.pathname === "/";

                                  if (isHome) {
                                    e.preventDefault();
                                    const el = document.querySelector(hash);
                                    if (el) {
                                      const headerOffset = 90;
                                      const elementPosition = el.getBoundingClientRect().top;
                                      const offsetPosition = elementPosition + window.scrollY - headerOffset;
                                      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                                    }
                                  }
                                }
                              }}
                              className="group flex items-center justify-between border-b border-stone-100 pb-3"
                            >
                              <div>
                                <div className="flex items-baseline gap-2.5">
                                  <span className="text-xs font-mono font-bold text-[#D97706]">
                                    {link.num}
                                  </span>
                                  <span className="f-display text-2xl font-normal text-[#3B110B] group-hover:text-[#D97706] transition-colors">
                                    {link.label}
                                  </span>
                                </div>
                                <p className="text-[11px] text-stone-500 font-normal pl-6 mt-0.5">
                                  {link.sub}
                                </p>
                              </div>
                              <ArrowUpRight
                                size={16}
                                className="text-stone-300 group-hover:text-[#D97706] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                              />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
      
                      {/* Quick Harvest Category Pills */}
                      <div className="mt-6 pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-3">
                          Quick Selection
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {["Raw Honey", "Potohar Peanuts", "Hunza Apricots", "Honeycomb"].map((tag) => (
                            <Link
                              key={tag}
                              href="/home/#products"
                              onClick={() => setMenuOpen(false)}
                              className="rounded-full bg-amber-50/80 border border-amber-200/80 px-3 py-1.5 text-[10.5px] font-bold text-[#5F2113] active:bg-[#D97706] active:text-white transition-colors"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </div>
      
                      {/* Direct Concierge Footer */}
                      <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between">
                        <a
                          href="https://api.whatsapp.com/send?phone=923710506436"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D48] tracking-wider uppercase font-jakarta"
                        >
                          <span>Talk Directly on WhatsApp</span>
                          <ArrowUpRight size={13} />
                        </a>
      
                        <span className="text-[9px] font-semibold text-stone-400">
                          Pothohar Base
                        </span>
                      </div>
                    </motion.nav>
                  )}
                </AnimatePresence>
              </motion.header>

      {/* ========================================================= */}
      {/* 2. CART DRAWER MODAL                                      */}
      {/* ========================================================= */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              style={{ willChange: "opacity" }}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "130%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35, mass: 0.8 }}
              style={{ willChange: "transform" }}
              className="fixed inset-x-0 bottom-0 z-[70] mx-auto w-full max-w-lg rounded-t-[2.5rem] md:rounded-3xl md:bottom-auto md:top-86 md:-translate-y-1/2 f-bg p-6 md:p-8 shadow-2xl border border-[#F59E0B]/30 bg-[#FFFDF5] text-[#3B110B] max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-[#E11D48]" />
                  <span className="eyebrow f-muted text-xs font-bold tracking-[0.2em] uppercase">Your Basket Selection</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setCartOpen(false)} 
                  className="p-2 cursor-pointer rounded-full hover:bg-[#FDE68A]/30 transition-colors text-[#3B110B]"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="rule-gold my-5" />

              <div className="flex-1 overflow-y-auto py-2">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center px-4">
                    <div className="p-4 rounded-full bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/40 text-[#E11D48] shadow-md">
                      <Sparkles size={28} />
                    </div>
                    <div className="space-y-1.5 mt-4">
                      <span className="eyebrow uppercase tracking-[0.25em] text-[#D97706] text-[0.7rem] font-bold">
                        Faroosh Farms
                      </span>
                      <h3 className="f-display text-3xl md:text-4xl font-normal tracking-tight text-[#3B110B]">
                        Coming Soon
                      </h3>
                    </div>
                    <p className="f-muted text-sm md:text-base font-jakarta font-medium max-w-[280px] mx-auto leading-relaxed text-[#5F2113]/80 mt-2">
                      Our direct artisan checkout experience is launching shortly. Stay tuned for farm-fresh deliveries.
                    </p>
                  </div>             
                ) : (
                  <ul className="flex flex-col gap-4">
                    {cart.map((item, i) => (
                      <li key={i} className="f-border flex items-baseline justify-between gap-4 border-b border-[#FDE68A] pb-4">
                        <span className="f-display text-xl md:text-2xl font-medium text-[#3B110B]">{item}</span>
                        <span className="eyebrow f-muted text-xs">Qty: 01</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-4 mt-auto">
                <button type="button" className="w-full py-4 rounded-full bg-gradient-to-r from-[#E11D48] via-[#EA580C] to-[#D97706] text-white font-medium text-sm tracking-wider uppercase shadow-lg shadow-[#E11D48]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2">
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 3. GEOMETRIC BACKGROUND PATTERN                           */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-25">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#F59E0B]/20 blur-[130px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#E11D48]/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#FBBF24]/20 blur-[150px]" />
        <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="poly-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#D97706" strokeWidth="0.8" opacity="0.4" />
              <path d="M 0 0 L 80 80 M 80 0 L 0 80" fill="none" stroke="#F59E0B" strokeWidth="0.5" opacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#poly-grid)" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 4. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 px-5 md:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto space-y-6 lg:space-y-8"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F59E0B]/40 bg-[#FEF3C7]/80 backdrop-blur-md shadow-sm">
            <MapPin size={15} className="text-[#E11D48]" />
            <span className="text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.2em] text-[#78350F]">
              Skardu Valley, Northern Pakistan
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold tracking-tight leading-[1.15] lg:leading-[1.1] text-[#3B110B]"
          >
            From Our Orchards to Your Door, <br />
            <span className="italic font-normal bg-gradient-to-r from-[#E11D48] via-[#EA580C] to-[#D97706] bg-clip-text text-transparent">
              Direct with Zero Middlemen.
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-base md:text-lg lg:text-xl text-[#5F2113]/85 font-jakarta font-normal tracking-wide leading-relaxed lg:leading-[1.8] max-w-2xl lg:max-w-3xl mx-auto"
          >
            The Faroosh story begins in the high-altitude valleys of Skardu, where our personal orchards yield nature's finest organic dry fruits and fresh seasonal harvests.
          </motion.p>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* 5. VISUAL BANNER / IMAGE CONTAINER                        */}
      {/* ========================================================= */}
      <section className="relative z-10 px-5 md:px-12 max-w-[1400px] mx-auto mb-24 lg:mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="relative h-[360px] md:h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border border-[#F59E0B]/30"
        >
          <img
            src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1600"
            alt="Skardu Valley Orchards"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A080C]/90 via-[#3B110B]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 lg:bottom-12 lg:left-12 lg:right-12 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="text-white space-y-2 lg:space-y-3 max-w-xl lg:max-w-2xl">
              <span className="text-[0.7rem] uppercase tracking-[0.25em] text-[#FBBF24] font-bold">Our Heritage</span>
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-serif font-medium tracking-tight">Glacial Water & Pure Altitude</h3>
              <p className="text-sm md:text-base lg:text-lg text-amber-50/90 font-jakarta font-normal leading-relaxed tracking-wide">
                Pure snowmelt from the Karakoram peaks and crisp mountain air nurture our crops with unmatched rich flavor and organic purity.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-amber-300/30 p-4 lg:p-5 rounded-2xl flex items-center gap-4 text-white">
              <div className="p-2.5 lg:p-3 rounded-xl bg-gradient-to-br from-[#E11D48] to-[#EA580C]">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-amber-200 font-semibold mb-0.5">Guaranteed Quality</p>
                <p className="text-sm md:text-base font-medium font-jakarta tracking-wide">100% Organic & Chemical Free</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* 6. DETAILED NARRATIVE CHAPTERS                            */}
      {/* ========================================================= */}
      <section className="relative z-10 px-5 md:px-12 max-w-[1200px] mx-auto mb-32 space-y-20 lg:space-y-32">
        
        {/* Story Chapter 1 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="md:col-span-5 space-y-4 lg:space-y-5">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#E11D48]">Chapter 01</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-semibold tracking-tight leading-tight lg:leading-[1.1] text-[#3B110B]">
              Our Roots in Skardu Valley
            </h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-[#E11D48] to-[#F59E0B] rounded-full mt-2" />
          </motion.div>
          <motion.div variants={fadeInUp} className="md:col-span-7 space-y-5 lg:space-y-6">
            <p className="font-jakarta text-base md:text-lg lg:text-xl font-normal leading-relaxed lg:leading-[1.8] tracking-wide text-[#5F2113]/90">
              Faroosh is not an ordinary commercial retail brand. It is a living testament to our family's generational connection to the fertile soil of Skardu. We cultivate our own private land and orchards where nature bestows its most precious harvests every season.
            </p>
            <p className="font-jakarta text-base md:text-lg lg:text-xl font-normal leading-relaxed lg:leading-[1.8] tracking-wide text-[#5F2113]/90">
              Glacial meltwaters trickling down from Karakoram peaks naturally nourish our trees. Depending on the season, our orchards yield organic almonds, walnuts, apricots, and sweet cherries. We do not source through third-party traders; every single item is grown under our direct care.
            </p>
          </motion.div>
        </motion.div>

        {/* Story Chapter 2 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="md:col-span-7 md:order-1 order-2 space-y-5 lg:space-y-6">
            <p className="font-jakarta text-base md:text-lg lg:text-xl font-normal leading-relaxed lg:leading-[1.8] tracking-wide text-[#5F2113]/90">
              Conventional dry fruits and seasonal produce pass through multiple regional wholesalers and prolonged warehouse storage, losing their natural moisture and authentic flavor in transit. At Faroosh, we abide by a strict protocol: <strong className="font-semibold text-[#3B110B]">Harvested and Packaged Instantly</strong>.
            </p>
            <p className="font-jakarta text-base md:text-lg lg:text-xl font-normal leading-relaxed lg:leading-[1.8] tracking-wide text-[#5F2113]/90">
              As soon as our produce achieves optimal ripeness, trained local farmers hand-pick each harvest and seal it in hygienic, airtight packaging without heavy chemical preservatives. When you open a Faroosh box, you experience the unadulterated freshness of Skardu.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="md:col-span-5 md:order-2 order-1 space-y-4 lg:space-y-5">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#E11D48]">Chapter 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-semibold tracking-tight leading-tight lg:leading-[1.1] text-[#3B110B]">
              Fresh Harvesting & Immediate Packing
            </h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-[#E11D48] to-[#F59E0B] rounded-full mt-2" />
          </motion.div>
        </motion.div>

        {/* Story Chapter 3 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="md:col-span-5 space-y-4 lg:space-y-5">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#E11D48]">Chapter 03</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-semibold tracking-tight leading-tight lg:leading-[1.1] text-[#3B110B]">
              Direct Retail & Fair Pricing
            </h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-[#E11D48] to-[#F59E0B] rounded-full mt-2" />
          </motion.div>
          <motion.div variants={fadeInUp} className="md:col-span-7 space-y-5 lg:space-y-6">
            <p className="font-jakarta text-base md:text-lg lg:text-xl font-normal leading-relaxed lg:leading-[1.8] tracking-wide text-[#5F2113]/90">
              Because we are direct growers, we have completely removed intermediary distribution markups. Our mission is to make premium mountain produce accessible to every home at fair, reasonable rates.
            </p>
            <p className="font-jakarta text-base md:text-lg lg:text-xl font-normal leading-relaxed lg:leading-[1.8] tracking-wide text-[#5F2113]/90">
              Whether you require fresh seasonal cherries for your family or bulk organic dry fruits, Faroosh delivers guaranteed quality at farm-direct prices with absolute transparency.
            </p>
          </motion.div>
        </motion.div>

      </section>

      {/* ========================================================= */}
      {/* 7. HIGHLIGHT FEATURES GRID                                */}
      {/* ========================================================= */}
     <section className="relative z-10 px-5 md:px-12 max-w-[1400px] mx-auto mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <MapPin className="text-[#E11D48] transition-colors duration-300 group-hover:text-[#B91C1C]" size={26} />,
              title: "Family-Owned Orchards",
              desc: "100% sourced directly from our private mountain land in Skardu."
            },
            {
              icon: <PackageCheck className="text-[#E11D48] transition-colors duration-300 group-hover:text-[#B91C1C]" size={26} />,
              title: "Instant Vacuum Pack",
              desc: "Hygienically packaged right after harvest to lock in moisture."
            },
            {
              icon: <ShieldCheck className="text-[#E11D48] transition-colors duration-300 group-hover:text-[#B91C1C]" size={26} />,
              title: "Fair Direct Rates",
              desc: "Transparent and accessible pricing straight from the growers."
            },
            {
              icon: <Clock className="text-[#E11D48] transition-colors duration-300 group-hover:text-[#B91C1C]" size={26} />,
              title: "Seasonal Freshness",
              desc: "Peak seasonal fruits and organic nuts delivered straight to your door."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: EASE }}
              whileHover={{ y: -8 }}
              style={{ willChange: "transform, box-shadow" }}
              className="group relative transform-gpu rounded-3xl p-8 bg-[#FEFCE8]/80 hover:bg-white border border-[#FDE68A] hover:border-[#F59E0B]/60 shadow-[0_4px_20px_rgba(245,158,11,0.06)] hover:shadow-[-18px_22px_45px_-8px_rgba(225,29,72,0.2),18px_22px_45px_-8px_rgba(217,119,6,0.22)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between cursor-default"
            >
              {/* Content & Liftable Icon */}
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-2xl w-fit border border-[#FDE68A] shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_12px_24px_-4px_rgba(225,29,72,0.3)] group-hover:border-[#E11D48]/30 group-hover:bg-[#FFFDF5]">
                  {item.icon}
                </div>

                <h4 className="text-xl lg:text-2xl font-serif font-semibold tracking-tight text-[#3B110B] transition-colors duration-300 group-hover:text-[#831843]">
                  {item.title}
                </h4>
                <p className="text-sm md:text-base text-[#5F2113]/80 font-jakarta font-normal leading-relaxed tracking-wide">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Golden Glow Bar on Hover */}
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#E11D48] via-[#EA580C] to-[#D97706] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. ONLINE STORE LAUNCH & DIRECT WHATSAPP CTA               */}
      {/* ========================================================= */}
      <section className="relative z-10 px-5 md:px-12 max-w-[1200px] mx-auto mb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative rounded-3xl p-8 md:p-12 lg:p-16 bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] text-[#3B110B] overflow-hidden shadow-2xl border border-[#F59E0B]/40 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E11D48]/15 blur-3xl pointer-events-none" />

          <div className="space-y-4 lg:space-y-5 max-w-xl lg:max-w-2xl z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[#E11D48] text-[0.7rem] lg:text-xs font-semibold tracking-[0.15em] uppercase border border-[#F59E0B]/30 shadow-sm">
              <Sparkles size={14} /> Opening Very Soon
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-tight leading-tight text-[#3B110B]">
              Faroosh Farms Launching Shortly
            </h3>
            <p className="text-base md:text-lg text-[#5F2113]/90 font-jakarta font-normal leading-relaxed tracking-wide">
              Our direct online checkout store will be fully active soon. Reach out to us directly on WhatsApp for pre-orders and instant inquiries.
            </p>
          </div>

         
           
              <a
                  href="#contact"
                  className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 px-8 py-4 text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_25px_rgba(225,29,72,0.3)] touch-manipulation cursor-pointer"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
              <MessageCircle size={20} className="shrink-0" />
                  <span className="relative">Talk To Us</span>
                </a>
        </motion.div>
      </section>

    </div>
  );
}