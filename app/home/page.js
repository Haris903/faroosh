'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Sparkles,
  Leaf,
  MapPin,
  Mail,
  Phone,
  Package,
  Truck,
  ShieldCheck,
  Star,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* 1. FONTS & THEME CONFIGURATION                                     */
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
    background: var(--ivory);
    color: var(--ink);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  .faroosh h1, .faroosh h2, .faroosh h3 { 
    font-family: var(--font-display); 
    font-weight: 500; 
    letter-spacing: -0.01em;
  }
  .f-display { font-family: var(--font-display); }
  .f-bg { background: var(--ivory); }
  .f-ink { color: var(--ink); }
  .f-muted { color: var(--muted-fg); }
  .f-accent { color: var(--gold); }
  .f-earth { color: var(--earth); }
  .f-sec { background: var(--secondary); }
  .f-border { border-color: var(--border); }
  .eyebrow {
    font-family: var(--font-sans); 
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.22em; 
    text-transform: uppercase;
    white-space: nowrap;
  }
  .glass-nav {
    background: color-mix(in oklab, var(--ivory) 85%, transparent);
    backdrop-filter: blur(20px) saturate(160%);
    border-bottom: 1px solid color-mix(in oklab, var(--ink) 8%, transparent);
  }
  .pill-light {
    display: inline-flex; align-items: center; justify-content: center; gap: .6rem; border-radius: 999px;
    padding: 0.95rem 2.2rem; background: var(--ivory); color: var(--ink);
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
    white-space: nowrap;
    box-shadow: 0 16px 36px -18px rgba(0,0,0,0.6);
    transition: transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s ease;
  }
  .pill-light:hover { transform: translateY(-2px); }
  .rule-gold {
    height: 1px;
    background: linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 90%, transparent), transparent);
  }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

/* ------------------------------------------------------------------ */
/* 2. CONSTANT DATA ARRAYS                                            */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Products", href: "/#products" },
  { label: "Contact", href: "/contact" },
];

const ANNOUNCEMENTS = [
  "100% Pure Wild Alpine Honey Harvested from Gilgit",
  "Fresh Batch: Rain-Fed Potohar Peanuts In Stock",
  "Sun-Cured Hunza Organic Dried Apricots Available",
  "Free Shipping Across Pakistan on Orders Over 3,000 PKR",
];

const TRUST_ITEMS = [
  { icon: Leaf, title: "Carefully Selected", desc: "Hand-harvested for natural taste" },
  { icon: ShieldCheck, title: "100% Authentic", desc: "Sourced directly from local growers" },
  { icon: Package, title: "Freshly Packed", desc: "Small-batch packed in eco glass & boxes" },
  { icon: Truck, title: "Nationwide Delivery", desc: "Delivered fresh anywhere in Pakistan" },
];

const OFFERINGS = [
  {
    id: "peanuts",
    category: "nuts",
    title: "Premium Potohar Peanuts",
    spec: "500 g · Slow roasted",
    blurb: "Sourced from rain-fed plateau soil in Chakwal. Hand-sorted and slow roasted in small batches for unbeatable crunch.",
    image: "/prod-peanuts.jpg",
  },
  {
    id: "honey",
    category: "honey",
    title: "Pure Mountain Honey",
    spec: "450 g · Raw & Unfiltered",
    price: "PKR 2,400",
    blurb: "Harvested high in the Gilgit valleys from wild mountain blossoms. Never heated, maintaining natural enzymes.",
    image: "/prod-honey.jpg",
  },
  {
    id: "dryfruit",
    category: "nuts",
    title: "Organic Sun-Dried Apricots & Figs",
    spec: "600 g · Naturally Sun-Cured",
    price: "PKR 1,850",
    blurb: "Handpicked in Hunza and cured on mountain stone terraces without chemical preservatives or artificial sulfur.",
    image: "/farms-dryfruit.jpg",
  },
  {
    id: "comb",
    category: "honey",
    title: "Raw Wild Honeycomb",
    spec: "350 g · Cut Comb",
    price: "PKR 3,100",
    blurb: "100% pure wild honeycomb lifted directly from high-altitude frames. Rich in natural propolis and floral wax.",
    image: "/farms-honey.jpg",
  },
  ...[
    { id: "mangoes", title: "Fresh Farm Mangoes", img: "/mangoes.png", price: "PKR 1,500" },
    { id: "apples", title: "Organic Swat Apples", img: "/apples.png", price: "PKR 1,200" },
    { id: "plums", title: "Fresh Mountain Plums", img: "/plums.png", price: "PKR 1,100" },
    { id: "cherry", title: "Fresh Hunza Cherries", img: "/cherry.png", price: "PKR 1,800" },
  ].map((item) => ({
    id: item.id,
    category: "seasonal",
    title: item.title,
    spec: "1 kg · Fresh Harvest",
    price: item.price,
    blurb: "Handpicked fresh harvest directly from organic mountain orchards.",
    image: item.img,
  })),
];

const STEPS = [
  { num: "01", title: "Sourced", desc: "Handpicked from small family farms in Potohar, Gilgit, and Hunza." },
  { num: "02", title: "Selected", desc: "Rigorous quality check ensures only ripe, single-harvest batches make the cut." },
  { num: "03", title: "Cured & Packed", desc: "Traditional sun-drying and small-batch glass packing preserve raw flavor." },
  { num: "04", title: "Delivered", desc: "Shipped straight to your doorstep across Pakistan with freshness intact." },
];

const STORIES = [
  {
    tag: "Potohar Plateau · Chakwal",
    title: "Rain-Fed Soil & Red Clay",
    subtitle: "Where Peanuts Grow Slow",
    body: "Nurtured exclusively by natural rainfall in the nutrient-dense red clay of Chakwal, our peanuts undergo a slow, unhurried growth cycle. This traditional rain-fed process unlocks a deep, rich flavor profile that mass-cultivated crops simply cannot match.",
    stat: "100%",
    statLabel: "Rain-Fed Organic Soil",
    linkText: "Explore Potohar Peanuts",
  },
  {
    tag: "Gilgit Valleys · 3,000m Altitude",
    title: "Wild Blossom Apiaries",
    subtitle: "Raw Nectar from Mountain Flora",
    body: "High in the untouched alpine sanctuaries of Gilgit, honeybees forage exclusively on wild thyme, clover, and mountain flora. Harvested without heat processing, fine filtering, or artificial sugar feeding, every jar delivers raw wild nectar in its purest form.",
    stat: "0%",
    statLabel: "Heat Treatment or Sugar",
    linkText: "Explore Pure Honey",
  },
  {
    tag: "Hunza Terraces · Heritage Curing",
    title: "Sun-Cured on River Stones",
    subtitle: "No Sulfur, Pure Ancestral Craft",
    body: "In the high stone terraces of Hunza, drying fruit is a heritage craft passed down through generations. Dried naturally under the mountain sun on smooth river stones, our harvest contains zero chemical sprays, sulfur oxidation, or artificial additives.",
    stat: "3+",
    statLabel: "Generations of Heritage",
    linkText: "Explore Dry Fruits",
  },
];

const REVIEWS = [
  {
    quote: "The Potohar peanuts and raw honeycomb reminded me of visiting our ancestral farm. You can taste the authenticity immediately.",
    author: "Zainab Malik",
    location: "Lahore",
    rating: 5,
  },
  {
    quote: "Faroosh isn't just selling dry fruits; they're bringing back genuine Pakistani pride in local produce. Packaging is top tier.",
    author: "Hamza Tariq",
    location: "Islamabad",
    rating: 5,
  },
  {
    quote: "Ordered the mountain honey for my family. The flavor profile is distinct, unadulterated, and far better than supermarket brands.",
    author: "Dr. Tariq Shah",
    location: "Rawalpindi",
    rating: 5,
  },
];

const FILTERS = [
  { id: "all", label: "All Harvest" },
  { id: "honey", label: "Raw Honey" },
  { id: "nuts", label: "Nuts & Dried Fruits" },
  { id: "seasonal", label: "Seasonal Fruits" },
];

const EASE = [0.16, 1, 0.3, 1];
const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

/* ------------------------------------------------------------------ */
/* SMOOTH HIGH-PERFORMANCE ROLLING NUMBER COMPONENT                   */
/* ------------------------------------------------------------------ */
function CounterRoll({ target, duration = 2.2, suffix = "" }) {
  const [val, setVal] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            // Ultra-smooth easeOutExpo easing curve
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


/* ------------------------------------------------------------------ */
/* 3. MAIN COMPONENT (Unified Human-Centric Flow)                     */
/* ------------------------------------------------------------------ */
export default function FarooshSinglePage() {
  // Navigation & Header States
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeAnnounce, setActiveAnnounce] = useState(0);

  // Cart & Drawer States
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Interactive Content States
  const [activeStory, setActiveStory] = useState(0);
  const [productFilter, setProductFilter] = useState("all");
  const [isMounted, setIsMounted] = useState(false);

  // Refs & Scroll Hooks
  const farmStoryRef = useRef(null);
  const scrollContainerRef = useRef(null);
  

  const { scrollYProgress } = useScroll({ target: farmStoryRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  // Scroll event listeners & tickers
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });

    const announceTimer = setInterval(() => {
      setActiveAnnounce((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 7000);

    const handleSmoothScroll = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 85;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    };
    document.addEventListener('click', handleSmoothScroll, { passive: false });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(announceTimer);
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  const handleProductScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const filteredItems = OFFERINGS.filter((o) => productFilter === "all" || o.category === productFilter);

  return (
    <MotionConfig reducedMotion="never">
      <style dangerouslySetInnerHTML={{ __html: CSS_STYLES }} />

      <main className={`faroosh min-h-screen overflow-x-hidden ${cormorant.variable} ${jakarta.variable}`}>
        
        {/* ========================================================= */}
        {/* 1. NAVBAR & HEADER (Ultra-Luxury Dynamic Glass Island)     */}
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
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -12, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap"
                      >
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#3B110B] font-jakarta select-none">
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
                <nav className="hidden lg:flex items-center gap-7">
                  {NAV_LINKS.map((link) => (
                    <div key={link.label} className="group relative">
                      <a
                        href={link.href}
                        onClick={(e) => {
                          const targetStr = link.href.replace("/", "");
                          const el = document.querySelector(targetStr);
                          if (el) {
                            e.preventDefault();
                            el.scrollIntoView({ behavior: "smooth" });
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
                      </a>

                      {/* Dropdown Menu */}
                      {link.label === "Products" && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 z-50 opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto">
                          <div className="flex flex-col bg-white/95 backdrop-blur-2xl border border-amber-200/80 shadow-[0_14px_35px_-5px_rgba(0,0,0,0.12)] rounded-2xl py-2 w-52 overflow-hidden">
                            {["Dry Fruits", "Seasonal Fruits", "Raw Honey", "Potohar Peanuts"].map((cat) => (
                              <a
                                key={cat}
                                href="#products"
                                className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-stone-700 transition-colors hover:text-[#D97706] hover:bg-amber-50/70"
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
            <div className="mt-2 pt-2 border-t border-stone-200/60 lg:hidden flex items-center justify-between gap-2 overflow-hidden">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D97706]" />
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#B45309]">
                  Live Harvest:
                </span>
              </div>

              <div className="relative h-3.5 w-full overflow-hidden text-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAnnounce}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-y-0 right-0 flex items-center"
                  >
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-stone-700 truncate">
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
                    { num: "01", label: "Story", href: "#story", sub: "Three Generations of Craft" },
                    { num: "02", label: "Products", href: "#products", sub: "Potohar & Gilgit Terroir" },
                    { num: "03", label: "Contact", href: "/contact", sub: "Direct From Orchards" },
                  ].map((link, idx) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.05 }}
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
                    </motion.a>
                  ))}
                </div>

                {/* Quick Harvest Category Pills */}
                <div className="mt-6 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-3">
                    Quick Selection
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Raw Honey", "Potohar Peanuts", "Hunza Apricots", "Honeycomb"].map((tag) => (
                      <a
                        key={tag}
                        href="#products"
                        onClick={() => setMenuOpen(false)}
                        className="rounded-full bg-amber-50/80 border border-amber-200/80 px-3 py-1.5 text-[10.5px] font-bold text-[#5F2113] active:bg-[#D97706] active:text-white transition-colors"
                      >
                        {tag}
                      </a>
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
                        <Sparkles size={28} />
                      </div>
                      <div className="space-y-1.5 mt-4">
                        <span className="eyebrow uppercase tracking-[0.25em] text-[#D97706] text-[0.7rem] font-bold">Faroosh Farms</span>
                        <h3 className="f-display text-3xl md:text-4xl font-normal tracking-tight text-[#3B110B]">Coming Soon</h3>
                      </div>
                      <p className="f-muted text-sm md:text-base font-jakarta font-medium max-w-[280px] mx-auto leading-relaxed text-[#5F2113]/80 mt-2">
                        Our direct artisan checkout experience is launching shortly. Stay tuned for farm-fresh deliveries.
                      </p>
                    </div>
                  ) : (
                    <ul className="flex flex-col gap-4">
                      {cart.map((item, i) => (
                        <li key={`${item}-${i}`} className="f-border flex items-baseline justify-between gap-4 border-b border-[#FDE68A] pb-4">
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
        {/* 3. HERO SECTION (Cinematic 4K Editorial Minimalist)        */}
        {/* ========================================================= */}
        <section
          id="home"
          className="relative flex min-h-[92vh] md:min-h-screen items-center justify-center overflow-hidden pt-16 pb-24 md:pb-28"
        >
          {/* 4K Background Video Canvas with Ultra-Deep Color Grading */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover scale-105 filter brightness-[0.72] contrast-[1.08] saturate-[1.1]"
            >
              <source src="/dryfruits.mp4" type="video/mp4" />
            </video>

            {/* Cinematic Lens Gradients & Atmospheric Aura */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C0F0A]/75 via-transparent to-[#1A0E09]/95" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(20,10,6,0.65)_100%)]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px]" />
          </div>

          {/* Central Editorial Typography (Clean & Unblocked) */}
          <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center flex flex-col items-center">
            {/* Compact Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <h1 className="f-display text-[clamp(2.4rem,4.8vw,4.2rem)] font-normal leading-[1.08] tracking-[-0.02em] text-[#FFFDF8] drop-shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                Faroosh Farms
              </h1>

              {/* Minimal Golden Hairline */}
              <div className="flex items-center justify-center gap-3 py-1">
                <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-amber-400/80" />
                <span className="text-[#F3C06B] text-[10px] tracking-[0.3em] uppercase font-bold font-jakarta">
                  Est. 2026
                </span>
                <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-amber-400/80" />
              </div>
            </motion.div>

            {/* Micro-Editorial Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="mt-4 max-w-lg text-xs sm:text-sm md:text-[15px] font-light leading-relaxed text-stone-200/90 tracking-wide font-jakarta drop-shadow-sm"
            >
              Native rain-fed peanuts, alpine wild nectar, and sun-cured harvest gathered directly at peak ripeness.
            </motion.p>
          </div>

          {/* Bottom Docked Floating Metrics HUD (Screen Ke Niche Set) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-6 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 w-max max-w-[92vw]"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 rounded-xl border border-white/20 bg-black/45 sm:bg-white/[0.08] backdrop-blur-2xl px-5 sm:px-7 py-2.5 sm:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                <span className="text-[10px] sm:text-[11px] font-bold text-stone-200 font-jakarta uppercase tracking-wider">
                  100% Unadulterated
                </span>
              </div>
              <span className="text-white/25 hidden xs:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-200 font-jakarta uppercase tracking-wider">
                  Raw & Unheated
                </span>
              </div>
              <span className="text-white/25 hidden xs:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold text-stone-200 font-jakarta uppercase tracking-wider">
                  3,000m Glacial Melt
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================= */}
        {/* 4. TRUST BAR SECTION                                      */}
        {/* ========================================================= */}
        {/* ========================================================= */}
        {/* 4. TRUST BAR & CONTINUOUS MARQUEE SECTION                */}
        {/* ========================================================= */}
        <div className="f-sec f-border border-b border-t px-6 py-9 md:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="f-bg flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-200">
                    <Icon size={20} className="f-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="eyebrow f-ink font-bold text-xs leading-none">{item.title}</p>
                    <p className="f-muted mt-1.5 text-xs font-medium leading-tight">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* INFINITE RUNNING STRIP (Theme-Matched Earth & Gold Marquee) */}
        <div className="relative overflow-hidden bg-[#24120C] py-3.5 border-y border-[#D97706]/30 shadow-inner">
          <motion.div
            className="flex w-max items-center whitespace-nowrap will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 28,
            }}
          >
            {[...Array(2)].map((_, listIdx) => (
              <div key={listIdx} className="flex items-center shrink-0">
                {[
                  "Pure Pakistani Harvest",
                  "Potohar Rain-Fed Peanuts",
                  "Raw Mountain Honey",
                  "Organic Dried Apricots",
                  "Sun-Cured Mountain Figs",
                  "Raw Wild Honeycomb",
                  "100% Unadulterated & Farm-Direct",
                ].map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-center">
                    <span className="f-display text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase text-[#F3C06B] px-5 sm:px-8 font-medium drop-shadow-sm select-none">
                      {item}
                    </span>
                    <span className="text-[#D97706] text-xs opacity-75 select-none">
                      •
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

  
      {/* ================================================================= */}
        {/* 5. FARMS STORY SECTION (Ultra-Luxury Kinetic Terroir Showcase)    */}
        {/* ================================================================= */}
        <section
          id="farms"
          ref={farmStoryRef}
          className="relative overflow-hidden bg-[#FAF7F2] px-4 py-16 sm:px-6 md:px-12 md:py-24 font-jakarta selection:bg-amber-500 selection:text-white"
        >
          {/* 1. Mathematical Ambient Optical Glows & Topographic Contours */}
          <div className="absolute -top-32 -left-24 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-amber-500/10 via-orange-400/5 to-transparent blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-0 h-[600px] w-[600px] rounded-full bg-[#E11D48]/5 blur-[160px] pointer-events-none" />

          {/* Mathematical Topographic Elevation Grid (Subtle Luxury Watermark) */}
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none select-none bg-[radial-gradient(#24120C_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="mx-auto max-w-[1440px] relative z-10">
            {/* Section Header with Terroir Coordinates & Kinetic Typography */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 md:mb-20"
            >
              <div className="max-w-3xl">
                {/* Micro Provenance Pill */}
                <motion.div
                  variants={rise}
                  className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-100/50 backdrop-blur-md px-4 py-1.5 mb-5 shadow-xs"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D97706]" />
                  </span>
                  <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#92400E]">
                    32.9328° N, 72.8549° E · Potohar & Gilgit Valleys
                  </span>
                </motion.div>

                {/* Editorial Display Heading */}
                <motion.h2
                  variants={rise}
                  className="f-display text-[clamp(2.3rem,5.6vw,4.8rem)] font-normal leading-[1.04] text-[#24120C] tracking-tight"
                >
                  A harvest shaped by{" "}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#EA580C] italic font-serif">
                    altitude, soil, & patience.
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400/80 via-orange-500/80 to-transparent origin-left pointer-events-none"
                    />
                  </span>
                </motion.h2>
              </div>

              {/* Editorial Description Column */}
              <motion.div variants={rise} className="max-w-md lg:pb-2">
                <p className="text-stone-600 text-sm sm:text-base font-normal leading-relaxed">
                  From three generations of rain-fed farming on the Potohar plateau to apiaries set high in the Gilgit and Hunza valleys, Faroosh preserves authentic, unadulterated Pakistani terroir from roots to your table.
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-amber-900/80">
                  <span className="h-px w-8 bg-amber-500/60" />
                  <span>Ancestral Direct Cultivation</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Main Interactive Showcase Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-7 items-stretch">
              
              {/* ============================================================== */}
              {/* CARD 1: Large Immersion Canvas (Potohar Plateau Orchards)      */}
              {/* ============================================================== */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                  e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
                }}
                className="group relative md:col-span-7 md:row-span-2 overflow-hidden rounded-[2rem] border border-amber-900/10 bg-[#1A0E0A] shadow-[0_20px_50px_-15px_rgba(36,18,12,0.12)] min-h-[460px] md:min-h-[720px] flex flex-col justify-between"
              >
                {/* Interactive Dynamic Specular Lighting Tracker */}
                <div
                  className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(253, 230, 138, 0.15), transparent 45%)",
                  }}
                />

                {/* Parallax Image Canvas with Smooth Scale */}
                <motion.div
                  style={{ y: isMounted ? y1 : 0, scale: isMounted ? scale : 1.05 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src="/hero-farms.jpg"
                    alt="Potohar Plateau Orchards"
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.92]"
                  />
                  {/* Cinematic Film Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150A06] via-[#150A06]/35 to-transparent" />
                </motion.div>

                {/* Top Floating Badge Bar */}
                <div className="relative z-30 p-6 sm:p-8 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 px-3.5 py-1.5 text-white shadow-lg">
                    <MapPin size={13} className="text-amber-400" />
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                      Chakwal Rain-Fed Estate
                    </span>
                  </div>

                  {/* Rotating Artisan Seal Monogram */}
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 select-none pointer-events-none hidden sm:block">
                    <svg
                      viewBox="0 0 100 100"
                      className="h-full w-full animate-spin [animation-duration:16s] text-amber-200/80"
                    >
                      <path
                        id="terroirCircle"
                        d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                        fill="none"
                      />
                      <text className="text-[8.8px] font-extrabold uppercase tracking-[0.24em] fill-current">
                        <textPath href="#terroirCircle">
                          • SINGLE ORIGIN • ANCESTRAL HARVEST •
                        </textPath>
                      </text>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-amber-300">
                      <Sparkles size={16} />
                    </div>
                  </div>
                </div>

                {/* Bottom Floating Glass Card */}
                <div className="relative z-30 p-5 sm:p-8">
                  <div className="rounded-2xl bg-black/45 backdrop-blur-2xl border border-white/20 p-5 sm:p-6 text-white shadow-2xl">
                    <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1.5">
                      <Leaf size={14} />
                      <span>Natural Red Clay Terroir</span>
                    </div>
                    <h3 className="f-display text-2xl sm:text-3xl text-white font-normal leading-snug">
                      Sun-cured fruits, raw combs, & rain-fed nuts
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-stone-300/85 font-normal leading-relaxed">
                      Nurtured purely by seasonal rainfall without canal flooding or commercial fertilizers, unlocking deeper natural aromatics.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ============================================================== */}
              {/* CARD 2: Wild Apiaries & Raw Honeycomb Card                     */}
              {/* ============================================================== */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative md:col-span-5 overflow-hidden rounded-[2rem] border border-amber-900/10 bg-white shadow-md hover:shadow-xl transition-all duration-300 min-h-[260px] sm:min-h-[290px] flex flex-col justify-end p-6"
              >
                <motion.div
                  style={{ y: isMounted ? y2 : 0 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src="/farms-honey.jpg"
                    alt="Raw Mountain Honeycomb"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                </motion.div>

                {/* Live Micro Metric Overlay */}
                <div className="relative z-10 text-white">
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/20 backdrop-blur-md border border-amber-400/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200 mb-2">
                    <Sun size={11} className="text-amber-300" />
                    <span>0% Sugar Feeding · Pure Wild Nectar</span>
                  </div>
                  <h4 className="f-display text-2xl text-white font-normal">
                    Gilgit Wild Flora Apiaries
                  </h4>
                  <p className="text-xs text-stone-300/85 mt-1 font-normal">
                    Harvested at 3,000m altitude from untouched thyme and alpine blooms.
                  </p>
                </div>
              </motion.div>

              {/* ============================================================== */}
              {/* CARD 3: Master Artisan Sanctuary Quote Card                   */}
              {/* ============================================================== */}
              <motion.blockquote
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative md:col-span-5 overflow-hidden rounded-[2rem] border border-amber-300/70 bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0] p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(217,119,6,0.06)] hover:shadow-[0_16px_40px_rgba(217,119,6,0.12)] transition-all duration-300 group"
              >
                {/* Subtle Luxury Watermark Graphic */}
                <span className="absolute -bottom-6 -right-3 text-8xl font-serif text-amber-900/[0.04] select-none pointer-events-none group-hover:text-amber-900/[0.07] transition-colors">
                  “
                </span>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#B45309]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Generational Creed
                    </span>
                    <ShieldCheck size={18} className="text-[#D97706]" />
                  </div>

                  <p className="f-display text-xl sm:text-2xl md:text-[1.55rem] font-normal text-[#24120C] leading-snug">
                    “We do not chase commercial yield. We wait for the soil and the mountain climate to bring each harvest to its peak physiological flavor.”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-900/10 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#24120C] tracking-tight">
                      Ghulam Faroosh
                    </h5>
                    <p className="text-[10px] sm:text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                      Third Generation Grower
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full">
                    Est. Potohar
                  </span>
                </div>
              </motion.blockquote>

              {/* ============================================================== */}
              {/* CARD 4: Sun-Dried Organic Apricots (Interactive Stone Terraces)*/}
              {/* ============================================================== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="group relative md:col-span-5 overflow-hidden rounded-[2rem] border border-amber-900/10 bg-black min-h-[250px] flex flex-col justify-end p-6 shadow-md"
              >
                <Image
                  src="/farms-dryfruit.jpg"
                  alt="Sun-dried Organic Apricots"
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-108 filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="relative z-10 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FDE68A]">
                    Hunza Valley Stone Terraces
                  </span>
                  <h4 className="f-display text-2xl text-white font-normal mt-0.5">
                    Sun-Cured River Stones
                  </h4>
                  <p className="text-xs text-stone-300 mt-1">
                    Cured under natural mountain rays with zero chemical sulfites.
                  </p>
                </div>
              </motion.div>

              {/* ============================================================== */}
              {/* CARD 5: 3-Pillar Origin Bar (Interactive Kinetic Capsules)      */}
              {/* ============================================================== */}
           {/* ============================================================== */}
              {/* CARD 5: 3-Pillar Origin Bar (Zero-Jitter GPU Hardware-Accelerated) */}
              {/* ============================================================== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                {[
                  {
                    icon: MapPin,
                    label: "Terroir Origin",
                    title: "Potohar & Gilgit",
                    detail: "Native Micro-Climates",
                    color: "text-amber-600",
                    badge: "Single-Source",
                  },
                  {
                    icon: Sun,
                    label: "Craft Method",
                    title: "Sun-Cured & Raw",
                    detail: "100% Unheated Cold-Poured",
                    color: "text-orange-500",
                    badge: "Ancestral",
                  },
                  {
                    icon: Leaf,
                    label: "Integrity Standard",
                    title: "Small-Batch Audit",
                    detail: "Zero Synthetic Sprays",
                    color: "text-emerald-600",
                    badge: "Pure Terroir",
                  },
                ].map((pillar) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <motion.div
                      key={pillar.label}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                      style={{
                        transform: "translateZ(0)",
                        backfaceVisibility: "hidden",
                        WebkitFontSmoothing: "subpixel-antialiased",
                      }}
                      className="group relative flex flex-col justify-between rounded-2xl bg-white border border-stone-200/90 hover:border-amber-400/80 p-5 shadow-xs hover:shadow-[0_12px_28px_-6px_rgba(217,119,6,0.14)] transition-colors duration-150 transform-gpu overflow-hidden cursor-default"
                    >
                      {/* Top Specular Gold Shine Bar */}
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/0 group-hover:via-amber-400/80 to-transparent transition-opacity duration-150 opacity-0 group-hover:opacity-100 pointer-events-none" />

                      <div>
                        {/* Header Row: Icon & Badge */}
                        <div className="flex items-center justify-between mb-3.5">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 group-hover:bg-[#E11D48] transition-colors duration-150 text-amber-700 group-hover:text-white shadow-xs">
                            <PillarIcon size={17} strokeWidth={2.2} />
                          </div>
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-stone-400 group-hover:text-amber-600 transition-colors duration-150 whitespace-nowrap">
                            {pillar.badge}
                          </span>
                        </div>

                        {/* Eyebrow Label */}
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B45309] block">
                          {pillar.label}
                        </span>

                        {/* Card Title */}
                        <h4 className="text-base sm:text-lg font-bold text-[#24120C] mt-0.5 tracking-tight group-hover:text-[#D97706] transition-colors duration-150 whitespace-nowrap">
                          {pillar.title}
                        </h4>
                      </div>

                      {/* Detail Subtitle */}
                      <p className="text-[11px] text-stone-500 mt-2.5 font-medium leading-normal whitespace-nowrap">
                        {pillar.detail}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>

            </div>
          </div>
        </section>


        {/* ========================================================= */}
        {/* 6. SOURCING PROCESS FLOW SECTION (Sequential Kinetic Deck)*/}
        {/* ========================================================= */}
        <section className="f-sec f-border relative overflow-hidden border-b border-t px-5 py-12 sm:py-16 md:px-12 md:py-20 font-jakarta selection:bg-amber-500 selection:text-white">
          {/* Ambient Subtle Warmth */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[380px] w-[450px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />
          <div className="absolute bottom-6 right-8 h-[300px] w-[350px] rounded-full bg-orange-500/5 blur-[130px] pointer-events-none" />

          <div className="mx-auto max-w-[1400px] relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
            >
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50/70 backdrop-blur-md px-3.5 py-1 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D97706]" />
                  </span>
                  <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#B45309] whitespace-nowrap">
                    From Source to Doorstep
                  </span>
                </div>

                <h2 className="f-display text-[clamp(2.1rem,4.2vw,3.8rem)] font-normal text-[#24120C] leading-[1.1] tracking-tight">
                  Where it grows is where{" "}
                  <span className="f-earth italic font-serif">quality begins.</span>
                </h2>
              </div>

              <p className="max-w-md text-stone-600 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
                From high-altitude organic orchards to unhurried traditional sun-curing, every batch follows an unbroken line of uncompromising purity.
              </p>
            </motion.div>

            {/* Kinetic Pipeline Container */}
            <div className="relative">
              {/* Desktop Horizontal Connecting Beam (Cards Ke Peeche) */}
              <div className="absolute top-[3.75rem] left-[6%] right-[6%] hidden lg:block h-[1.5px] z-0 pointer-events-none">
                <div className="w-full h-full bg-amber-200/50" />
                <motion.div
                  className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#E11D48] to-transparent"
                  animate={{ left: ["-10%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
                />
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 gap-7 sm:gap-6 lg:grid-cols-4 relative z-10">
                {[
                  {
                    num: "01",
                    tag: "Private Orchards",
                    title: "Sourced",
                    desc: "Handpicked from small family farms in Potohar, Gilgit, and Hunza.",
                    badge: "100% Single-Origin",
                    icon: Leaf,
                  },
                  {
                    num: "02",
                    tag: "Physical Audit",
                    title: "Selected",
                    desc: "Rigorous quality check ensures only ripe, single-harvest batches make the cut.",
                    badge: "Grade-A Batches",
                    icon: ShieldCheck,
                  },
                  {
                    num: "03",
                    tag: "Ancestral Method",
                    title: "Cured & Packed",
                    desc: "Traditional sun-drying and small-batch glass packing preserve raw flavor.",
                    badge: "Sun-Cured Quality",
                    icon: Sun,
                  },
                  {
                    num: "04",
                    tag: "Direct Transit",
                    title: "Delivered",
                    desc: "Shipped straight to your doorstep across Pakistan with freshness intact.",
                    badge: "Nationwide Safe",
                    icon: Truck,
                  },
                ].map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.28,
                        delay: idx * 0.06,
                        ease: "easeOut",
                      }}
                      whileHover={{ y: -5 }}
                      className="group relative flex flex-col justify-between rounded-2xl bg-white border border-stone-200/80 hover:border-amber-400/60 p-5 sm:p-6 shadow-[0_6px_25px_-10px_rgba(36,18,12,0.04)] hover:shadow-[0_16px_35px_-8px_rgba(217,119,6,0.14)] transition-all duration-150 ease-out transform-gpu [backface-visibility:hidden] z-10"
                    >
                      {/* Inner Safe Overflow Container (Watermark & Top Shine) */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
                        <span className="absolute -right-2 -bottom-4 text-6xl sm:text-7xl font-extrabold text-stone-900/[0.03] group-hover:text-amber-500/[0.07] transition-colors duration-150 select-none font-jakarta">
                          {step.num}
                        </span>
                      </div>

                      <div className="relative z-10">
                        {/* Top Indicator Row */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#24120C] text-[#FDE68A] text-xs font-extrabold font-jakarta tracking-tight shadow-xs shrink-0">
                            {step.num}
                          </span>

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 transition-colors duration-150 group-hover:bg-[#E11D48] group-hover:text-white group-hover:border-transparent">
                            <Icon size={15} strokeWidth={2.2} />
                          </div>
                        </div>

                        {/* Tag */}
                        <div className="mt-4">
                          <p className="text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#B45309] font-jakarta whitespace-nowrap overflow-hidden text-ellipsis">
                            {step.tag}
                          </p>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-[#24120C] tracking-tight group-hover:text-[#D97706] transition-colors duration-150 font-jakarta mt-1.5 whitespace-nowrap">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-2.5 text-xs sm:text-[13px] text-stone-600 font-normal leading-relaxed font-jakarta">
                          {step.desc}
                        </p>
                      </div>

                      {/* Bottom Metric Pill */}
                      <div className="relative z-10 mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-amber-900/90 bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-200/60 font-jakarta whitespace-nowrap">
                          <Sparkles size={11} className="text-[#D97706]" />
                          {step.badge}
                        </span>

                        <span className="h-1.5 w-1.5 rounded-full bg-stone-300 group-hover:bg-emerald-500 transition-colors duration-150" />
                      </div>

                      {/* MOBILE VERTICAL BEAM: Strictly side ke 01, 02, 03 ke niche aligned (left-[34px]) aur sequential timing */}
                      {idx < 3 && (
                        <div className="lg:hidden absolute -bottom-7 left-[34px] -translate-x-1/2 w-[1.5px] h-7 bg-amber-200/60 z-0 overflow-hidden pointer-events-none">
                          <motion.div
                            className="absolute inset-x-0 w-full h-3.5 bg-gradient-to-b from-transparent via-[#E11D48] to-transparent"
                            animate={{ top: ["-100%", "200%"] }}
                            transition={{
                              repeat: Infinity,
                              duration: 3.3, // Total cycle
                              delay: idx * 1.1, // Ik sath nahi chalenge, step-by-step
                              ease: "easeInOut",
                            }}
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Responsive Commitment Strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-stone-200/80 bg-white/60 backdrop-blur-md px-5 py-3.5 shadow-xs"
            >
              <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-stone-700 font-jakarta text-center sm:text-left">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>All farm batches are cold-stored in Rawalpindi and dispatched within 24 hours of ordering.</span>
              </div>

              <a
                href="#products"
                className="group inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#24120C] hover:text-[#D97706] transition-colors duration-150 font-jakarta whitespace-nowrap shrink-0"
              >
                <span>View Fresh Batches</span>
                <ArrowUpRight size={13} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>

          </div>
        </section>
       {/* ========================================================= */}
        {/* 7. FARM STORYTELLING SECTION (Mobile Layout Fixed)        */}
        {/* ========================================================= */}
        <section className="f-bg relative overflow-hidden border-b border-stone-200/80 px-4 sm:px-6 py-12 md:px-12 md:py-18">
          <div className="mx-auto max-w-[1400px]">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10"
            >
              <div className="max-w-2xl">
                <span className="eyebrow f-accent text-xs">The Roots of Faroosh</span>
                <h2 className="f-display mt-3 text-[clamp(2.2rem,4.5vw,4.2rem)] font-normal leading-[1.08] text-[#24120C]">
                  Stories shaped by <span className="f-earth italic">sun, soil, and hands.</span>
                </h2>
              </div>
              <p className="f-muted max-w-md text-sm md:text-base font-normal leading-relaxed">
                Behind every jar and parcel lies the story of Pakistan's true treasures and the dedication of its traditional farmers.
              </p>
            </motion.div>

            <div className="rule-gold my-8" />

            {/* Main Interactive Showcase Grid */}
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-10">
              
              {/* Left Column: Authentic Tabs */}
              <div className="flex flex-col gap-3 lg:col-span-4 justify-between">
                {STORIES.map((story, idx) => {
                  const isActive = activeStory === idx;
                  return (
                    <motion.button
                      key={story.title}
                      type="button"
                      onClick={() => setActiveStory(idx)}
                      whileHover={{ x: isActive ? 0 : 3 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.15 }}
                      className={`group relative flex flex-col justify-between rounded-xl border p-4 sm:p-6 text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-amber-50/90 via-[#FFFDF8] to-orange-50/50 border-amber-300/80 shadow-[0_10px_30px_-10px_rgba(217,119,6,0.15)]"
                          : "bg-white/40 hover:bg-white/80 border-stone-200/70 opacity-75 hover:opacity-100"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="heritageTabBorder"
                          className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D97706]"
                          transition={{ duration: 0.3, ease: EASE }}
                        />
                      )}

                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider font-jakarta transition-colors ${
                          isActive ? "text-[#D97706]" : "text-stone-500"
                        }`}>
                          {story.tag}
                        </span>
                        <span className="f-display f-muted text-xs font-semibold">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="mt-2">
                        <h3 className={`f-display text-xl sm:text-2xl font-medium tracking-tight transition-colors ${
                          isActive ? "text-[#24120C]" : "text-stone-800"
                        }`}>
                          {story.title}
                        </h3>
                        <p className="text-[10.5px] text-stone-500 mt-1 uppercase tracking-wider font-jakarta font-semibold">
                          {story.subtitle}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-stone-200/50 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 font-jakarta">
                          <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-amber-500 animate-pulse" : "bg-transparent"}`} />
                          {isActive ? "Currently Viewing" : "Explore Origin"}
                        </span>
                        <ArrowUpRight size={13} className={`transition-all duration-200 ${isActive ? "text-[#D97706] opacity-100" : "opacity-0 text-stone-400 group-hover:opacity-100"}`} />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Right Column: Detail Card (With Safe Responsive Header) */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStory}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="f-sec f-border relative flex flex-col justify-between h-full rounded-2xl border border-stone-200/90 bg-[#FFFDF9] p-4 sm:p-7 md:p-10 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
                  >
                    {/* Fixed Card Top Provenance Bar (No More Overflow on Mobile) */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-stone-200/70 pb-3 sm:pb-4">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-[#5F2113]/90 font-jakarta">
                        {STORIES[activeStory].tag}
                      </span>
                      
                      {/* Responsive Green Terroir Badge */}
                      <span className="inline-flex items-center gap-1.5 text-[9.5px] sm:text-[10.5px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full uppercase tracking-wider font-jakarta shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Single-Origin Terroir
                      </span>
                    </div>

                    {/* Middle: Integrated Story Copy + Terroir Media */}
                    <div className="my-5 sm:my-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                      
                      {/* Left Side: Story Copy */}
                      <div className="md:col-span-7 space-y-3.5">
                        <h3 className="f-display text-2xl sm:text-3xl md:text-4xl font-normal text-[#24120C] leading-snug">
                          {STORIES[activeStory].title}
                        </h3>

                        <p className="f-muted text-xs sm:text-sm md:text-base font-normal leading-relaxed">
                          {STORIES[activeStory].body}
                        </p>

                        {/* Purity Capsules */}
                        <div className="flex flex-wrap gap-2 pt-1.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10.5px] font-bold text-amber-900 font-jakarta">
                            <Leaf size={12} className="text-amber-600" />
                            {activeStory === 0 ? "Rain-Fed Clay Soil" : activeStory === 1 ? "Wild Mountain Flora" : "Sun-Cured River Stones"}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-[10.5px] font-semibold text-stone-700 font-jakarta">
                            <ShieldCheck size={12} className="text-emerald-600" />
                            Zero Additives
                          </span>
                        </div>
                      </div>

                      {/* Right Side: Terroir Image with Stat Overlay */}
                      <div className="md:col-span-5 relative">
                        <div className="relative aspect-[4/3] sm:aspect-square md:aspect-[4/4] w-full overflow-hidden rounded-xl border border-stone-200 shadow-md group">
                          <Image
                            src={
                              activeStory === 0 
                                ? "/hero-farms.jpg" 
                                : activeStory === 1 
                                ? "/farms-honey.jpg" 
                                : "/farms-dryfruit.jpg"
                            }
                            alt={STORIES[activeStory].title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                          {/* Floating Stat Overlay */}
                          <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 p-2.5 sm:p-3 text-center text-white shadow-lg">
                            <p className="f-display text-2xl sm:text-3xl font-light text-[#F3C06B] tracking-tight">
                              {STORIES[activeStory].stat}
                            </p>
                            <p className="text-[9px] sm:text-[9.5px] font-bold text-stone-200 mt-0.5 tracking-wider uppercase font-jakarta">
                              {STORIES[activeStory].statLabel}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3.5 border-t border-stone-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <span className="text-[11px] font-semibold text-stone-500 font-jakarta">
                        Guaranteed Single-Origin
                      </span>

                      <a
                        href="#products"
                        className="group inline-flex items-center gap-1.5 text-xs f-ink font-bold tracking-wider font-jakarta border-b border-[#24120C] pb-0.5 transition-colors hover:text-[#D97706] hover:border-[#D97706]"
                      >
                        <span>{STORIES[activeStory].linkText}</span>
                        <ArrowUpRight size={13} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#D97706]" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>
        
        {/* ========================================================= */}
        {/* 8. PRODUCTS HARVEST SECTION & CAROUSEL                    */}
        {/* ========================================================= */}
        <section id="products" className="f-bg relative overflow-hidden px-6 py-10 md:px-12 md:py-14">
          <div className="mx-auto max-w-[1400px]">
            {/* Guidance Banner */}
            <div className="relative overflow-hidden w-full mx-auto mb-12 rounded-3xl bg-gradient-to-r from-amber-50 via-yellow-100/60 to-orange-50 p-8 md:p-12 shadow-lg border border-amber-200/80">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-gradient-to-br from-rose-500/20 to-orange-500/20 blur-[60px] animate-pulse" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center md:text-left max-w-2xl">
                  <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent text-xs font-bold tracking-[0.25em] uppercase">
                    Expert Guidance
                  </span>
                  <h3 className="text-3xl md:text-4xl text-stone-900 font-serif font-medium tracking-wide">
                    Curious about our harvest? Let's talk.
                  </h3>
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                    Whether you have questions about our pure ancestral crafting methods or need help choosing the perfect jar, our experts are here to guide you.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 px-8 py-4 text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_25px_rgba(225,29,72,0.3)] touch-manipulation cursor-pointer"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                  <span className="relative">Talk To Us</span>
                  <svg className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow f-accent">Curated Harvest</span>
                <h2 className="f-display mt-4 text-[clamp(2.4rem,5vw,4.2rem)] font-normal leading-none">
                  Farm Products
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setProductFilter(f.id)}
                    className="eyebrow whitespace-nowrap rounded-full border px-6 py-2.5 text-xs font-bold transition-all duration-300 touch-manipulation cursor-pointer"
                    style={
                      productFilter === f.id
                        ? { borderColor: "var(--ink)", background: "var(--ink)", color: "var(--ivory)" }
                        : { borderColor: "var(--border)", color: "var(--muted-fg)" }
                    }
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rule-gold my-12" />

            {/* Product Scroll Carousel */}
            <div className="relative group -mx-4 px-4 sm:mx-0 sm:px-0">
              <button
                type="button"
                onClick={() => handleProductScroll("left")}
                aria-label="Scroll left"
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-800 shadow-[0_4px_20px_rgba(0,0,0,0.18)] border border-amber-100 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 hover:bg-stone-50 cursor-pointer touch-manipulation"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => handleProductScroll("right")}
                aria-label="Scroll right"
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-800 shadow-[0_4px_20px_rgba(0,0,0,0.18)] border border-amber-100 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 hover:bg-stone-50 cursor-pointer touch-manipulation"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              <motion.div
                ref={scrollContainerRef}
                layout
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 scroll-smooth"
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="w-[260px] sm:w-[275px] md:w-[285px] snap-start shrink-0">
                      <motion.article
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="group flex flex-col"
                      >
                        <div className="relative overflow-hidden rounded-xl">
                          <Image
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            width={900}
                            height={1100}
                            className="aspect-[4/5] w-full object-cover transition-transform duration-[1.1s] group-hover:scale-105"
                          />
                          <span className="glass-nav eyebrow absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest">
                            Farms Harvest
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col pt-5">
                          <div className="flex items-baseline gap-2">
                            <p className="eyebrow f-muted text-xs font-semibold">{item.spec}</p>
                          </div>
                          <h3 className="f-display mt-3 text-2xl font-normal leading-tight">{item.title}</h3>
                          <p className="f-muted mt-2.5 text-sm font-normal leading-relaxed">{item.blurb}</p>
                        </div>
                      </motion.article>
                    </div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

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
            {/* <Link></Link> */}
            <div className="mt-8 sm:mt-12 flex justify-center">
  <Link href="/contact">
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/90 px-6 sm:px-8 py-3 sm:py-3.5 text-[10.5px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#3B110B] shadow-sm hover:border-[#D97706] hover:text-[#D97706] hover:shadow-md transition-colors touch-manipulation cursor-pointer font-jakarta"
    >
      <span>Write Your Own Review</span>
    </motion.div>
  </Link>
</div>
          </div>
        </section>

         {/* ========================================================= */}
        {/* 10. PURPOSE & HERITAGE SANCTUARY (Jakarta Modern Glass)   */}
        {/* ========================================================= */}
        <section id="story" className="relative overflow-hidden px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            {/* Cinematic Transparent Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-black/45 backdrop-blur-3xl border border-white/20 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.6)]"
            >
              {/* Clean 4K Video Canvas (No Muddy Brown Tint) */}
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

                {/* Crystal Clear Dark Glass Gradients for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/75" />
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-amber-500/15 rounded-full blur-[140px]" />
              </div>

              {/* Main Content (Branded Jakarta Typography) */}
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

                {/* 4-Pillar Frosted Metric Cards (Jakarta Numbers + Zero Jitter) */}
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

                {/* "See More" Button (Preserved Original Design) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65, duration: 0.7 }}
                  className="mt-14 flex w-full justify-center px-4"
                >
                  <Link
                    href="/story"
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
     <footer id="contact" className="f-sec f-border relative overflow-hidden border-t px-6 py-14 md:px-12 md:py-20 font-jakarta selection:bg-amber-500 selection:text-white">
          {/* Ambient Luxury Atmospheric Aura */}
          <div className="absolute -top-32 right-1/4 h-[350px] w-[500px] rounded-full bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-24 left-10 h-[280px] w-[350px] rounded-full bg-[#E11D48]/5 blur-[120px] pointer-events-none" />

          <div className="mx-auto max-w-[1400px] relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 md:gap-14">
              
              {/* Brand Column (Original Logo 100% Preserved) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="group w-fit cursor-default">
                  {/* Faroosh Original Badge Intact */}
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

              {/* Navigation Links Column (Arrow Perfectly Positioned Beside Text) */}
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
                        {/* Instant Underline Sweep */}
                        <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[#D97706] origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100" />
                      </span>
                      
                      {/* Arrow: Exactly Beside Text with Micro-Diagonal Lift */}
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
                    href="mailto:hello@faroosh.com"
                    className="group flex items-center gap-3.5 rounded-2xl bg-white/60 hover:bg-white p-3.5 border border-stone-300/60 hover:border-amber-400/60 backdrop-blur-md shadow-xs hover:shadow-[0_6px_20px_rgba(217,119,6,0.12)] transition-all duration-150 ease-out hover:-translate-y-0.5 transform-gpu [backface-visibility:hidden]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 transition-colors duration-150 group-hover:bg-[#E11D48] group-hover:text-white">
                      <Mail size={16} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Email Inquiry</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#3B110B] group-hover:text-[#D97706] transition-colors duration-150 font-jakarta">
                        hello@faroosh.com
                      </span>
                    </div>
                  </a>

                  <a
                    href="tel:+923000000000"
                    className="group flex items-center gap-3.5 rounded-2xl bg-white/60 hover:bg-white p-3.5 border border-stone-300/60 hover:border-amber-400/60 backdrop-blur-md shadow-xs hover:shadow-[0_6px_20px_rgba(217,119,6,0.12)] transition-all duration-150 ease-out hover:-translate-y-0.5 transform-gpu [backface-visibility:hidden]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 transition-colors duration-150 group-hover:bg-[#E11D48] group-hover:text-white">
                      <Phone size={16} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Farm Direct Line</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#3B110B] group-hover:text-[#D97706] transition-colors duration-150 font-jakarta">
                        +92 300 0000000
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

            {/* Glowing Golden Hairline Divider */}
            <div className="relative mt-16 mb-8 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

            {/* Bottom Bar & Smooth Back-To-Top Trigger */}
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

      </main>
    </MotionConfig>
  );
}