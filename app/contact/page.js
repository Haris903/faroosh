'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
/* ------------------------------------------------------------------ */
/* 1. HEADER & NAVIGATION COMPONENT (Unified Pro Edition)             */
/* ------------------------------------------------------------------ */
const EASE = [0.16, 1, 0.3, 1];

const NAV_LINKS = [
  { label: "Story", href: "/#story" },
  { label: "Products", href: "/#products" },
  { label: "Contact", href: "/contact" },
];

const ANNOUNCEMENTS = [
  "100% Pure Wild Alpine Honey Harvested from Gilgit",
  "Fresh Batch: Rain-Fed Potohar Peanuts In Stock",
  "Sun-Cured Hunza Organic Dried Apricots Available",
  "Free Shipping Across Pakistan on Orders Over 3,000 PKR",
];

function Header({ cartCount = 0, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeAnnounce, setActiveAnnounce] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const announceTimer = setInterval(() => {
      setActiveAnnounce((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 7000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(announceTimer);
    };
  }, []);

  const handleCartOpen = () => {
    if (onCartClick) onCartClick();
    setCartOpen(true);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`glass-nav fixed inset-x-0 top-0 z-[99999] isolate transition-all duration-500 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-10">
          
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1 lg:hidden cursor-pointer touch-manipulation text-[#3B110B]"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link href="/" className="text-left leading-none">
              <div className="img flex flex-col h-full items-center text-center group cursor-pointer">
                <Image
                  width={30}
                  height={30}
                  src="/faroosh.png"
                  alt="Faroosh Logo"
                  className="transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-translate-y-1"
                />
                <p className="text-[#CAA387] font-sans text-sm mt-1 transition-colors duration-500 group-hover:text-[#D97706]">
                  Faroosh
                </p>
              </div>
            </Link>
          </div>

          {/* Live Ticker (Seamless Luxury Pill - Zero Black Border) */}
          <div className="hidden justify-center md:flex">
            <div className="flex items-center gap-2.5 rounded-full bg-[#EFECE6]/90 drop-shadow-sm px-4 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-[#E2DDD3]/70 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#059669]" />
              </span>

              <div className="relative h-4 w-[260px] overflow-hidden lg:w-[320px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAnnounce}
                    initial={{ x: 15, opacity: 0 }}
                    animate={{ x: -220, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      x: { delay: 1.8, duration: 4.8, ease: "linear" },
                      opacity: { duration: 0.4 },
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

          {/* Nav Links & Action Icons */}
          <div className="flex items-center justify-end gap-5 md:gap-9">
            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="group relative">
                  <Link
                    href={link.href}
                    className="relative flex items-center gap-1.5 justify-center eyebrow cursor-pointer font-bold tracking-widest py-2 text-[var(--muted-fg)] transition-colors duration-[0.4s] group-hover:text-[#D97706]"
                  >
                    <span>{link.label}</span>

                    {/* Arrow Icon: Rotates 180° instantly on hover without jitter */}
                    {link.label === "Products" && (
                      <span className="relative inline-flex items-center justify-center w-4 h-4 shrink-0 pointer-events-none select-none">
                        <svg
                          className="w-3.5 h-3.5 origin-center transition-transform duration-300 ease-out group-hover:rotate-180 transform-gpu [backface-visibility:hidden]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    )}

                    {/* Golden Sweep Line */}
                    <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-gradient-to-r from-[#E11D48] via-[#EA580C] to-[#D97706] origin-right scale-x-0 transition-transform duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                  </Link>

                  {/* Dropdown Menu: Opens on hover with smooth fade & lift */}
                  {link.label === "Products" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 z-50 opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto">
                      <div className="flex flex-col bg-white/95 backdrop-blur-md border border-[#FDE68A] shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-xl py-2 w-48 overflow-hidden">
                        {["Dry Fruits", "Seasonal Fruits", "Raw Honey", "Potohar Peanuts"].map((cat) => (
                          <a
                            key={cat}
                            href="/#products"
                            className="eyebrow px-5 py-3 text-[10.5px] text-stone-600 transition-colors hover:text-[#D97706] hover:bg-amber-50/80"
                          >
                            {cat}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Action Buttons (Search, Profile, Basket) */}
            <div className="flex items-center gap-5">
              {/* Search Toggle Button */}
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                className="group relative cursor-pointer touch-manipulation p-1"
                aria-label="Search"
              >
                <svg
                  className="w-[19px] h-[19px] text-[#3B110B] transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:text-[#D97706]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D97706] opacity-0 scale-0 transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100" />
              </button>

              {/* User Profile Button */}
              <button
                type="button"
                className="hidden sm:block group relative cursor-pointer touch-manipulation p-1"
                aria-label="Profile"
              >
                <User
                  size={19}
                  strokeWidth={1.5}
                  className="text-[#3B110B] transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:text-[#D97706]"
                />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D97706] opacity-0 scale-0 transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={handleCartOpen}
                className="group relative cursor-pointer touch-manipulation p-1"
                aria-label="Cart"
              >
                <ShoppingBag
                  size={19}
                  strokeWidth={1.5}
                  className="text-[#3B110B] transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:text-[#D97706]"
                />
                <AnimatePresence>
                  {(cart.length > 0 || cartCount > 0) && (
                    <motion.span
                      key={cart.length || cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{ background: "var(--gold)", color: "var(--earth-deep)" }}
                      className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[0.6rem] font-bold shadow-sm"
                    >
                      {cart.length || cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
                {cart.length === 0 && cartCount === 0 && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D97706] opacity-0 scale-0 transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100" />
                )}
              </button>
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
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden bg-white/95"
            >
              <div className="mx-auto max-w-[1600px] px-5 pb-4 pt-5 md:px-10">
                <input
                  autoFocus
                  placeholder="Search raw honey, dry fruits, Potohar peanuts…"
                  className="f-display f-border w-full border-b bg-transparent pb-3 text-2xl outline-none placeholder:text-stone-400 text-[#3B110B]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
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
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="eyebrow f-ink text-sm font-semibold cursor-pointer touch-manipulation"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Cart Drawer Modal (Directly Embedded in page2.js) */}
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
                  <span className="eyebrow f-muted text-xs font-bold tracking-[0.2em] uppercase">
                    Your Basket Selection
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                  className="p-2 rounded-full cursor-pointer hover:bg-[#FDE68A]/30 transition-colors text-[#3B110B]"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="rule-gold my-5" />

              <div className="flex-1 overflow-y-auto py-2">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center px-4">
                    <div className="p-4 rounded-full bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/40 text-[#E11D48] shadow-md">
                      <svg
                        className="w-7 h-7 text-[#E11D48]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                      </svg>
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
                      <li
                        key={`${item}-${i}`}
                        className="f-border flex items-baseline justify-between gap-4 border-b border-[#FDE68A] pb-4"
                      >
                        <span className="f-display text-xl md:text-2xl font-medium text-[#3B110B]">
                          {item}
                        </span>
                        <span className="eyebrow f-muted text-xs">Qty: 01</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-4 mt-auto">
                <button
                  type="button"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#E11D48] via-[#EA580C] to-[#D97706] text-white font-medium text-sm tracking-wider uppercase shadow-lg shadow-[#E11D48]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
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


/* ------------------------------------------------------------------ */
/* COUNTER ROLL COMPONENT FOR HERITAGE SECTION                        */
/* ------------------------------------------------------------------ */
function CounterRoll({ target, duration = 2.2, suffix = "" }) {
  const [val, setVal] = useState(0);
  const elementRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setVal(Math.floor(ease * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setVal(target);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

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
   {/* ========================================================= */}
        {/* 9. CUSTOMER REVIEWS SECTION (Mobile 2-Column Glass Wall)  */}
        {/* ========================================================= */}
        <section className="f-sec f-border relative overflow-hidden border-b border-t px-3.5 sm:px-6 md:px-12 py-12 md:py-20 font-jakarta selection:bg-amber-500 selection:text-white">
          {/* Subtle Ambient Glow Behind Wall */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="mx-auto max-w-[1500px] relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 px-2">
              <span className="eyebrow text-[#D97706] text-[0.7rem] sm:text-xs font-bold tracking-[0.25em] uppercase">
                Real Experiences
              </span>
              <h2 className="f-display mt-2.5 sm:mt-3 text-3xl sm:text-4xl md:text-5xl font-normal text-[#3B110B] leading-tight">
                Trusted Across Homes
              </h2>
              <p className="f-muted mt-2 sm:mt-3 text-xs sm:text-sm md:text-base font-normal">
                Authentic words from families savoring pure harvest across Pakistan.
              </p>
            </div>

            {/* Staggered Dual-Column Mobile & 4-Column Desktop Glass Wall */}
            <div className="columns-2 lg:columns-4 gap-2.5 sm:gap-4 space-y-2.5 sm:space-y-4">
              {[
                {
                  quote: "Can honestly say Faroosh offers unmatched quality. They answered all my questions before I decided to order. The honeycomb and Chakwal peanuts came well packaged and very quickly. Going to place another order soon.",
                  author: "Gareth Malik",
                  time: "1d ago",
                },
                {
                  quote: "Couldn't be happier with this harvest. Kept their site bookmarked till I needed authentic raw honey, and everything has been 100% pure. Delivery was prompt and glass jars are packed with utmost care.",
                  author: "Irene Tariq",
                  time: "2d ago",
                },
                {
                  quote: "Real difference within 2 weeks of substituting sugar with their wild mountain honey. Natural enzymes feel authentic and morning energy levels are noticeably better. Absolutely pure.",
                  author: "Lorna Shah",
                  time: "3d ago",
                },
                {
                  quote: "Easy to order, quick nationwide delivery. All items came in pristine condition. Real mountain produce at very reasonable rates.",
                  author: "Tessa A.",
                  time: "4d ago",
                },
                {
                  quote: "Wanted to try authentic rain-fed peanuts from Chakwal and Gilgit walnuts. The crunch is distinctly richer than supermarket stock, with no chemical aftertaste.",
                  author: "Claire R.",
                  time: "5d ago",
                },
                {
                  quote: "Great purchase, simple checkout process. Discreet and eco-friendly glass packaging. Freshness intact upon opening. Definitely ordering apricots next.",
                  author: "Trevor S.",
                  time: "6d ago",
                },
                {
                  quote: "This is now my 2nd purchase from Faroosh. Super fast delivery to Lahore and product quality is really 100% natural. Thank you team!",
                  author: "Gaynor J.",
                  time: "7d ago",
                },
                {
                  quote: "Nice and easy to order, responsive support team, and fresh batch aroma as soon as the parcel opened.",
                  author: "Andrew Williams",
                  time: "1w ago",
                },
                {
                  quote: "Fair direct farm prices and quick dispatch. Rare to find unheated raw honey with zero crystal additives in Pakistan.",
                  author: "Andrew W.",
                  time: "1w ago",
                },
                {
                  quote: "Great service once again. Reliable growers who actually stand behind their single-origin promise. Highly recommended to everyone.",
                  author: "Irene Tonge",
                  time: "1w ago",
                },
                {
                  quote: "Fast delivery, great product taste, genuine Potohar soil flavor in every single peanut batch.",
                  author: "Chris Martin",
                  time: "1w ago",
                },
                {
                  quote: "Brilliant products, reasonable farm prices, quick dispatch and very detailed harvest origin details on every pack.",
                  author: "Rich Wilson",
                  time: "1w ago",
                },
              ].map((rev, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{
                    duration: 0.3,
                    delay: (idx % 4) * 0.03,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -4 }}
                  style={{
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                    WebkitFontSmoothing: "subpixel-antialiased",
                  }}
                  className="relative overflow-hidden break-inside-avoid transform-gpu rounded-xl sm:rounded-[1.4rem] bg-white/55 hover:bg-white/80 backdrop-blur-2xl saturate-[180%] p-3 sm:p-4 md:p-5 border border-white/80 hover:border-amber-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[-8px_14px_30px_-6px_rgba(225,29,72,0.15),8px_14px_30px_-6px_rgba(217,119,6,0.18)] transition-all duration-200 flex flex-col justify-between group cursor-default"
                >
                  {/* iPhone Specular Glass Glare */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent pointer-events-none rounded-xl sm:rounded-[1.4rem]" />

                  {/* Review Text */}
                  <p className="relative z-10 text-[11px] sm:text-[12.5px] md:text-[13px] leading-snug sm:leading-relaxed text-[#2A160F] font-normal tracking-normal select-none">
                    {rev.quote}
                  </p>

                  {/* Author Line */}
                  <div className="relative z-10 mt-2.5 pt-2 sm:mt-3.5 sm:pt-2.5 border-t border-black/[0.06] flex flex-col xs:flex-row xs:items-center justify-between gap-0.5">
                    <span className="text-[10px] sm:text-xs font-bold text-[#E11D48] tracking-tight sm:tracking-wide group-hover:text-[#B91C1C] transition-colors truncate">
                      {rev.author}
                    </span>
                    <span className="text-[9px] sm:text-[11px] font-medium text-stone-500 whitespace-nowrap">
                      {rev.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Action Button */}
            <div className="mt-8 sm:mt-12 flex justify-center">
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/90 px-6 sm:px-8 py-3 sm:py-3.5 text-[10.5px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#3B110B] shadow-sm hover:border-[#D97706] hover:text-[#D97706] hover:shadow-md transition-colors touch-manipulation cursor-pointer font-jakarta"
              >
                <span>Write Your Own Review</span>
              </motion.a>
            </div>
          </div>
        </section>

      {/* ========================================================= */}
      {/* 10. PURPOSE & HERITAGE SANCTUARY (Jakarta Modern Glass)   */}
      {/* ========================================================= */}
      <section id="story" className="relative overflow-hidden px-5 py-16 md:px-12 md:py-24 font-jakarta z-10">
        <div className="mx-auto max-w-[1400px]">
          {/* Cinematic Transparent Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-black/45 backdrop-blur-3xl border border-white/20 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.6)]"
          >
            {/* Clean 4K Video Canvas */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover opacity-60 scale-105"
              >
                <source src="/dryfruits.mp4" type="video/mp4" />
              </video>

              {/* Crystal Clear Dark Glass Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/75" />
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-amber-500/15 rounded-full blur-[140px]" />
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 px-6 py-16 sm:px-12 md:px-20 md:py-24 flex flex-col items-center text-center font-jakarta">
              
              {/* Top Heritage Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-xl px-5 py-2 shadow-inner"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                </span>
                <span className="text-[#FDE68A] text-[0.75rem] tracking-[0.26em] font-bold uppercase select-none">
                  The Story of Faroosh Starts From Here
                </span>
              </motion.div>

              {/* Modern Branded Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 max-w-4xl text-[clamp(2.1rem,4.2vw,3.6rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-white"
              >
                Faroosh began with a single apricot orchard in the Karakoram shadows. Today, it stands as a{" "}
                <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 drop-shadow-sm">
                  sacred bridge
                </span>{" "}
                connecting Pakistan’s richest, unadulterated terroir straight to your family table.
              </motion.h2>

              {/* Subtitle Description */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-6 max-w-2xl text-stone-200/90 text-sm md:text-base font-normal leading-relaxed tracking-normal"
              >
                No commercial blends, zero artificial post-processing. Every jar of raw mountain nectar and single-harvest peanut is gathered at peak physiological ripeness and packed directly at the source.
              </motion.p>

              {/* 4-Pillar Frosted Metric Cards */}
              <div className="mt-14 grid w-full max-w-4xl grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/15">
                {[
                  { target: 3200, suffix: "m", label: "Origin Altitude", sub: "Glacial meltwater purity" },
                  { target: 99, suffix: "%", label: "Purity Standard", sub: "Raw & unpasteurized" },
                  { target: 3, suffix: "+", label: "Generations", sub: "Ancestral family craft" },
                  { target: 0, prefix: "Zero", label: "Intermediaries", sub: "Direct from private orchards" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.6 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group relative rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-amber-400/60 p-5 transition-all duration-400 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between"
                  >
                    {/* Box Glare Hover Highlight */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative z-10">
                      {/* Rolling Bold Jakarta Number */}
                      <div className="text-2xl sm:text-3xl font-jakarta font-extrabold text-[#FDE68A] group-hover:text-amber-300 tracking-tight [font-variant-numeric:tabular-nums] select-none transition-colors">
                        {stat.prefix ? (
                          <span>{stat.prefix}</span>
                        ) : (
                          <CounterRoll target={stat.target} suffix={stat.suffix} />
                        )}
                      </div>

                      {/* Metric Label */}
                      <p className="mt-2 text-[0.7rem] text-stone-200 font-bold uppercase tracking-[0.16em] group-hover:text-white transition-colors">
                        {stat.label}
                      </p>
                    </div>

                    {/* Sub-text */}
                    <p className="relative z-10 mt-2 text-[11px] text-stone-300/80 font-normal leading-tight">
                      {stat.sub}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* "See More" Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="mt-14 flex w-full justify-center px-4"
              >
                <Link
                  href="/#products"
                  className="group relative inline-flex max-w-full items-center gap-3 overflow-hidden rounded-full border border-amber-500/40 bg-gradient-to-r from-[#FDF9F1] via-[#FFFDF8] to-[#FDF9F1] px-7 py-3 shadow-[0_4px_25px_rgba(217,119,6,0.18)] transition-all duration-500 hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-[0_8px_30px_rgba(225,29,72,0.25)] touch-manipulation cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-amber-500/15 to-orange-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/90 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                  <span className="relative flex h-1.5 w-1.5 shrink-0 md:h-2 md:w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-600 md:h-2 md:w-2" />
                  </span>
                  <span className="relative truncate text-[10.5px] font-bold uppercase tracking-[0.2em] text-stone-800 transition-colors duration-300 group-hover:text-amber-950 md:text-xs">
                    See More
                  </span>
                  <div className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-800 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-amber-500 group-hover:text-white group-hover:shadow-md md:h-6 md:w-6">
                    <svg className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5 md:h-3 md:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. FOOTER SECTION                                        */}
      {/* ========================================================= */}
      <footer id="contact" className="relative overflow-hidden border-t border-[#D97706]/20 bg-white/50 px-6 py-14 md:px-12 md:py-20 font-jakarta selection:bg-amber-500 selection:text-white z-10">
        {/* Ambient Atmospheric Aura */}
        <div className="absolute -top-32 right-1/4 h-[350px] w-[500px] rounded-full bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-24 left-10 h-[280px] w-[350px] rounded-full bg-[#E11D48]/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-[1400px] relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 md:gap-14">
            
            {/* Brand Column (Original Logo 100% Preserved) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="group w-fit cursor-default">
                <div className="bg-[#FAE7AC] flex flex-col justify-center items-center rounded-full w-24 h-24 shadow-[0_6px_25px_rgba(217,119,6,0.18)] border border-amber-200/60 transition-all duration-200 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_10px_28px_rgba(225,29,72,0.2)] transform-gpu">
                  <Image src="/faroosh.png" alt="Faroosh Logo" width={32} height={32} className="object-contain transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span className="text-[#CAA387] font-bold text-[11px] mt-1 tracking-tight">Faroosh</span>
                </div>
              </div>

              <div className="space-y-3 max-w-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md px-3 py-1 border border-stone-300/60 shadow-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F2113]">Single-Origin Harvest</span>
                </div>

                <p className="text-sm md:text-base text-[#5F2113]/85 font-normal leading-relaxed">
                  Pure organic harvest from the Potohar plateau, Gilgit valleys, and Hunza terraces delivered straight to your home.
                </p>
              </div>
            </div>

            {/* Navigation Links Column */}
            <div className="lg:col-span-3 space-y-5">
              <span className="eyebrow text-[#24120C] text-[0.72rem] font-bold uppercase tracking-[0.25em] block">
                Navigation
              </span>
              
              <nav className="flex flex-col gap-2.5">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 py-1 text-lg font-serif md:text-xl text-[#3B110B] transition-colors duration-150 hover:text-[#D97706] w-fit"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[#D97706] origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100" />
                    </span>
                    <ArrowUpRight 
                      size={15} 
                      className="opacity-0 -translate-x-1 translate-y-1 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[#D97706] shrink-0" 
                    />
                  </a>
                ))}
              </nav>
            </div>

            {/* Direct Contact Column */}
            <div className="lg:col-span-4 space-y-5">
              <span className="eyebrow text-[#24120C] text-[0.72rem] font-bold uppercase tracking-[0.25em] block">
                Direct Contact
              </span>

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:hello@faroosh.pk"
                  className="group flex items-center gap-3.5 rounded-2xl bg-white/60 hover:bg-white p-3.5 border border-stone-300/60 hover:border-amber-400/60 backdrop-blur-md shadow-xs hover:shadow-[0_6px_20px_rgba(217,119,6,0.12)] transition-all duration-150 ease-out hover:-translate-y-0.5 transform-gpu [backface-visibility:hidden]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 transition-colors duration-150 group-hover:bg-[#E11D48] group-hover:text-white">
                    <Mail size={16} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Email Inquiry</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#3B110B] group-hover:text-[#D97706] transition-colors duration-150 font-jakarta">
                      hello@faroosh.pk
                    </span>
                  </div>
                </a>

                <a
                  href="https://api.whatsapp.com/send?phone=923710506436"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3.5 rounded-2xl bg-white/60 hover:bg-white p-3.5 border border-stone-300/60 hover:border-amber-400/60 backdrop-blur-md shadow-xs hover:shadow-[0_6px_20px_rgba(217,119,6,0.12)] transition-all duration-150 ease-out hover:-translate-y-0.5 transform-gpu [backface-visibility:hidden]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 transition-colors duration-150 group-hover:bg-[#E11D48] group-hover:text-white">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Farm Direct Line</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#3B110B] group-hover:text-[#D97706] transition-colors duration-150 font-jakarta">
                      +92 371 0506436
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 rounded-2xl bg-white/40 p-3.5 border border-stone-300/40 backdrop-blur-xs">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
                    <MapPin size={16} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Harvest Hubs</span>
                    <span className="text-xs sm:text-sm font-medium text-[#3B110B] font-jakarta">
                      Rawalpindi · Islamabad · Gilgit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-16 mb-8 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <span className="eyebrow text-[#5F2113]/70 text-[0.68rem] tracking-[0.22em] font-semibold">
              © 2026 Faroosh Farms
            </span>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 rounded-full bg-white/80 hover:bg-white px-4 py-1.5 border border-stone-300/70 hover:border-amber-400/60 shadow-xs transition-all duration-150 cursor-pointer text-[#3B110B] hover:text-[#D97706]"
            >
              <span className="text-[10.5px] font-bold uppercase tracking-widest font-jakarta">Back To Top</span>
              <svg className="w-3 h-3 transition-transform duration-150 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>

            <span className="eyebrow text-[#5F2113]/70 text-[0.68rem] tracking-[0.22em] font-semibold">
              Asli Zaiqa · Authentically Pakistani
            </span>
          </div>
        </div>
      </footer>
    </div>
  
  );
}