'use client';

import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';

// CustomerReviews ko dynamically import karein
const CustomerReviews = dynamic(() => Promise.resolve(CustomerReviewsComponent), {
  loading: () => <p className="text-center py-12 f-muted">Loading reviews...</p>,
  ssr: false,
});

import Link from "next/link";
import Image from "next/image";
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
  Plus,
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
/* 1. IMAGE PLACEHOLDERS & PATHS                                      */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/* 2. DESIGN & TYPOGRAPHY SYSTEM STYLES                               */
/* ------------------------------------------------------------------ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

html {
  scroll-behavior: smooth !important;
}
.faroosh {
  --ivory: oklch(0.985 0.005 85);
  --ink: oklch(0.16 0.015 60);
  --gold: oklch(0.72 0.14 75);
  --earth: oklch(0.48 0.09 62);
  --earth-deep: oklch(0.24 0.05 55);
  --secondary: oklch(0.96 0.01 85);
  --muted-fg: oklch(0.45 0.02 60);
  --border: oklch(0.89 0.01 80);
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-sans: "Plus Jakarta Sans", -apple-system, sans-serif;
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

/* Premium Clean Eyebrow / Label System */
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
.pill-outline {
  display: inline-flex; align-items: center; justify-content: center; gap: .6rem;
  border-radius: 999px; padding: 0.85rem 2rem;
  border: 1px solid color-mix(in oklab, var(--ink) 30%, transparent);
  color: var(--ink); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
  white-space: nowrap;
  transition: all .4s cubic-bezier(.16,1,.3,1);
}
.pill-outline:hover { background: var(--ink); color: var(--ivory); }
.rule-gold {
  height: 1px;
  background: linear-gradient(90deg, transparent,
    color-mix(in oklab, var(--gold) 90%, transparent), transparent);
}
`;

function Styles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}


const heroFarms = "/hero-farms.jpg";
const honeycomb = "/farms-honey.jpg";
const dryFruit = "/farms-dryfruit.jpg";
const peanuts = "/prod-peanuts.jpg";
const honeyJar = "/prod-honey.jpg";
// const seasonal=["/mangoes.png", "/apples.png","/plums.png","/cherry.png"];
/* ------------------------------------------------------------------ */
/* 3. BRAND DATA & CONTENT                                            */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: "Story",href: "#story" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
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
    image: peanuts,
  },
  {
    id: "honey",
    category: "honey",
    title: "Pure Mountain Honey",
    spec: "450 g · Raw & Unfiltered",
    price: "PKR 2,400",
    blurb: "Harvested high in the Gilgit valleys from wild mountain blossoms. Never heated, maintaining natural enzymes.",
    image: honeyJar,
  },
  {
    id: "dryfruit",
    category: "nuts",
    title: "Organic Sun-Dried Apricots & Figs",
    spec: "600 g · Naturally Sun-Cured",
    price: "PKR 1,850",
    blurb: "Handpicked in Hunza and cured on mountain stone terraces without chemical preservatives or artificial sulfur.",
    image: dryFruit,
  },
  {
    id: "comb",
    category: "honey",
    title: "Raw Wild Honeycomb",
    spec: "350 g · Cut Comb",
    price: "PKR 3,100",
    blurb: "100% pure wild honeycomb lifted directly from high-altitude frames. Rich in natural propolis and floral wax.",
    image: honeycomb,
  },

  // Sub se short tariqa (.map automated list):
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

const EASE = [0.16, 1, 0.3, 1];

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

/* ------------------------------------------------------------------ */
/* 4. HEADER & CART                                                   */
/* ------------------------------------------------------------------ */

const ANNOUNCEMENTS = [
  "100% Pure Wild Alpine Honey Harvested from Gilgit",
  "Fresh Batch: Rain-Fed Potohar Peanuts In Stock",
  "Sun-Cured Hunza Organic Dried Apricots Available",
  "Free Shipping Across Pakistan on Orders Over 3,000 PKR",
];

// 2. Exact Header Component to Replace
function Header({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAnnounce, setActiveAnnounce] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAnnounce((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 7000);
    return () => clearInterval(timer);
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
        
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1 lg:hidden cursor-pointer touch-manipulation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a href="/" className="text-left leading-none">
            <div className="img flex flex-col h-full items-center text-center">
              <img width={30} height={30} src="/faroosh.png" alt="Faroosh Logo" />
              <p className="text-[#CAA387]">Faroosh.pk</p>
            </div>
          </a>
        </div>

        {/* CENTER: TICKER */}
        <div className="hidden justify-center md:flex">
          <div className="f-sec f-border flex items-center gap-3 rounded-full border px-4 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600"></span>
            </span>

            <div className="relative h-4 w-[260px] overflow-hidden lg:w-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAnnounce}
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: -180, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    x: { delay: 2, duration: 4.5, ease: "linear" },
                    opacity: { duration: 0.5 }
                  }}
                  className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap"
                >
                  <span className="eyebrow f-ink text-[0.68rem] font-semibold uppercase tracking-wider">
                    {ANNOUNCEMENTS[activeAnnounce]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT: NAV LINKS */}
        <div className="flex items-center justify-end gap-5 md:gap-7">
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="eyebrow f-muted cursor-pointer font-semibold transition-opacity duration-300 hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="transition-transform duration-300 hover:scale-110 cursor-pointer touch-manipulation"
            >
              {/* <Search size={19} strokeWidth={1.5} /> */}
            </button>
            <button type="button" aria-label="Account" className="hidden hover:scale-110 sm:block cursor-pointer touch-manipulation">
              <User size={19} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Open cart"
              onClick={onCartClick}
              className="relative cursor-pointer touch-manipulation transition-transform duration-300 hover:scale-110"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{ background: "var(--gold)", color: "var(--earth-deep)" }}
                    className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[0.6rem] font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH BAR DROPDOWN */}
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
                className="f-display f-border w-full border-b bg-transparent pb-3 text-2xl outline-none placeholder:text-stone-400"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white/95 lg:hidden"
          >
            <div className="flex flex-col gap-5 px-6 pb-8 pt-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="eyebrow f-ink text-sm font-semibold cursor-pointer touch-manipulation"
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
function CartDrawer({ open, onClose, items }) {
  return (
<AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            style={{ willChange: "opacity" }}
          />

          {/* Drawer Container - Optimized with hardware acceleration */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35, mass: 0.8 }}
            style={{ willChange: "transform" }}
            className="fixed inset-x-0 bottom-0 z-[70] mx-auto w-full max-w-lg rounded-t-[2.5rem] md:rounded-3xl md:bottom-auto md:top-1/2 md:-translate-y-1/2 f-bg p-6 md:p-8 shadow-2xl border border-[#F59E0B]/30 bg-[#FFFDF5] text-[#3B110B] max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#E11D48]" />
                <span className="eyebrow f-muted text-xs font-bold tracking-[0.2em] uppercase">Your Basket Selection</span>
              </div>
              <button 
                type="button" 
                onClick={onClose} 
                aria-label="Close cart"
                className="p-2 rounded-full hover:bg-[#FDE68A]/30 transition-colors text-[#3B110B]"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="rule-gold my-5" />

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto py-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-4">
                  <div className="p-4 rounded-full bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/40 text-[#E11D48] shadow-md">
                    <Sparkles size={28} />
                  </div>
                  
                  <div className="space-y-1.5">
                    <span className="eyebrow uppercase tracking-[0.25em] text-[#D97706] text-[0.7rem] font-bold">
                      Faroosh Skardu
                    </span>
                    <h3 className="f-display text-3xl md:text-4xl font-normal tracking-tight text-[#3B110B]">
                      Coming Soon
                    </h3>
                  </div>

                  <p className="f-muted text-sm md:text-base font-jakarta font-bold max-w-[280px] mx-auto leading-relaxed text-[#5F2113]/80">
                    Our direct artisan checkout experience is launching shortly. Stay tuned for farm-fresh deliveries.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item, i) => (
                    <li
                      key={`${item}-${i}`}
                      className="f-border flex items-baseline justify-between gap-4 border-b border-[#FDE68A] pb-4"
                    >
                      <span className="f-display text-xl md:text-2xl font-medium text-[#3B110B]">{item}</span>
                      <span className="eyebrow f-muted text-xs">Qty: 01</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer Action */}
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
  );
}
/* ------------------------------------------------------------------ */
/* 5. HERO SECTION                                                    */
/* ------------------------------------------------------------------ */
function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 45 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE },
    },
  };

  return (
    <section id="home" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden pt-20">
      <motion.img
        src={heroFarms}
        alt="Faroosh Farms"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--earth-deep) 35%, transparent) 0%, color-mix(in oklab, var(--earth-deep) 85%, transparent) 100%)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ color: "var(--ivory)" }}
        className="relative z-10 flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <motion.span variants={itemVariants} className="eyebrow opacity-90">
          Pure. Natural. Authentic Pakistan.
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="f-display mt-6 text-[clamp(3.2rem,7vw,6.2rem)] font-normal leading-[0.98] tracking-tight"
        >
          Faroosh Farms
        </motion.h1>

        <motion.div variants={itemVariants} className="rule-gold my-6 w-28" />

        <motion.p
          variants={itemVariants}
          className="max-w-xl text-base font-normal leading-relaxed text-stone-200 md:text-lg"
        >
          Authentic Potohar peanuts, high-altitude raw honey, and organic sun-cured harvest straight from local family orchards.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="#products"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="pill-light inline-flex touch-manipulation"
          >
            Explore Harvest
            <ArrowUpRight size={15} strokeWidth={1.8} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. TRUST BAR SECTION                                               */
/* ------------------------------------------------------------------ */
function TrustBar() {
  return (
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
  );
}

/* ------------------------------------------------------------------ */
/* 7. FARMS STORY                                                     */
/* ------------------------------------------------------------------ */
function FarmsStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section id="farms" ref={ref} className="f-bg relative overflow-hidden px-6 py-28 md:px-12 md:py-36">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
        className="mx-auto max-w-[1400px]"
      >
        <motion.div variants={rise} className="max-w-2xl">
          <span className="eyebrow f-accent">Faroosh Farms</span>
          <h2 className="f-display mt-6 text-[clamp(2.6rem,5.5vw,5rem)] font-normal leading-[1.05]">
            A harvest shaped by
            <span className="f-earth italic"> altitude, soil, and patience.</span>
          </h2>
          <p className="f-muted mt-6 max-w-lg text-base font-normal leading-relaxed">
            From three generations of rain-fed farming on the Potohar plateau to apiaries set high in the Gilgit and Hunza valleys, Faroosh brings authentic, unadulterated Pakistani goodness straight from the source to your doorstep.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <motion.figure variants={rise} className="relative overflow-hidden md:col-span-7 md:row-span-2 rounded-xl">
            <motion.img
              style={{ y: y1, scale }}
              src={heroFarms}
              alt="Potohar Plateau Orchards"
              loading="lazy"
              width={1280}
              height={1600}
              className="h-[52vh] w-full object-cover md:h-[76vh]"
            />
            <figcaption
              className="absolute bottom-0 left-0 right-0 p-8"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in oklab, var(--earth-deep) 88%, transparent), transparent)",
                color: "var(--ivory)",
              }}
            >
              <span className="eyebrow opacity-80">Potohar & Gilgit Origins</span>
              <p className="f-display mt-2 text-2xl md:text-3xl">Sun-cured fruits, raw combs, and rain-fed nuts</p>
            </figcaption>
          </motion.figure>

          <motion.figure variants={rise} className="overflow-hidden md:col-span-5 rounded-xl">
            <motion.img
              style={{ y: y2 }}
              src={honeycomb}
              alt="Raw Honeycomb"
              loading="lazy"
              width={1024}
              height={1280}
              className="h-[37vh] w-full object-cover"
            />
          </motion.figure>

          <motion.blockquote
            variants={rise}
            className="f-sec f-border flex flex-col justify-between border rounded-xl p-8 md:col-span-5"
          >
            <p className="f-display text-[clamp(1.6rem,2.2vw,2.2rem)] font-normal leading-snug">
              “We do not chase commercial yield. We wait for the soil and the climate to bring the fruit to its peak natural flavor.”
            </p>
            <footer className="eyebrow f-muted mt-8 font-semibold">Ghulam Faroosh · Third Generation Producer</footer>
          </motion.blockquote>

          <motion.figure variants={rise} className="overflow-hidden md:col-span-5 rounded-xl">
            <img
              src={dryFruit}
              alt="Sun-dried Organic Apricots"
              loading="lazy"
              width={1024}
              height={768}
              className="h-[32vh] w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
            />
          </motion.figure>

          <motion.div
            variants={rise}
            className="f-border grid grid-cols-1 gap-px overflow-hidden border sm:grid-cols-3 md:col-span-7 rounded-xl"
            style={{ background: "var(--border)" }}
          >
            {[
              { icon: MapPin, k: "Origin", v: "Potohar Plateau & Gilgit Valleys" },
              { icon: Sun, k: "Method", v: "Sun-cured, 100% unheated" },
              { icon: Leaf, k: "Standard", v: "Authentic, small-batch harvest" },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="f-bg p-8">
                <Icon size={20} strokeWidth={1.5} className="f-accent" />
                <p className="eyebrow f-muted mt-6 font-semibold">{k}</p>
                <p className="f-display mt-2 text-2xl leading-tight">{v}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. SOURCING PROCESS FLOW SECTION                                  */
/* ------------------------------------------------------------------ */
function ProcessSection() {
  return (
    <section className="f-sec f-border border-b border-t px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-xl">
          <span className="eyebrow f-accent">From Source to Doorstep</span>
          <h2 className="f-display mt-4 text-4xl font-normal md:text-5xl">Where it grows is where quality begins.</h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.num} className="f-bg f-border rounded-xl relative flex flex-col justify-between border p-8">
              <div>
                <span className="f-display text-4xl font-light f-accent">{step.num}</span>
                <h3 className="f-display mt-6 text-2xl font-medium">{step.title}</h3>
                <p className="f-muted mt-3 text-sm font-normal leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 9. FARM STORYTELLING SECTION                                       */
/* ------------------------------------------------------------------ */
function FarmStorytellingSection() {
  const [activeStory, setActiveStory] = useState(0);

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

  return (
    <section className="f-bg f-border border-b px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <span className="eyebrow f-accent">The Roots of Faroosh</span>
            <h2 className="f-display mt-4 text-[clamp(2.4rem,4.8vw,4.2rem)] font-normal leading-[1.08]">
              Stories shaped by <span className="f-earth italic">sun, soil, and hands.</span>
            </h2>
          </div>
          <p className="f-muted max-w-md text-sm font-normal leading-relaxed md:text-base">
            Behind every jar and parcel lies the story of Pakistan's true treasures and the dedication of its traditional farmers.
          </p>
        </motion.div>

        <div className="rule-gold my-12" />

        {/* Story Grid */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Navigation Tabs */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {STORIES.map((story, idx) => {
              const isActive = activeStory === idx;
              return (
                <motion.button
                  key={story.title}
                  type="button"
                  onClick={() => setActiveStory(idx)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                className={`group relative flex flex-col rounded-sm border p-6 text-left transition-all touch-manipulation cursor-pointer ${
                isActive
                  ? " bg-gradient-to-r from-amber-50 via-yellow-100/60 to-orange-50 shadow-lg border border-amber-200/80 f-border shadow-sm"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="eyebrow f-accent">{story.tag}</span>
                    <span className="f-display f-muted text-sm font-medium">0{idx + 1}</span>
                  </div>
                  <h3 className="f-display mt-2 text-2xl font-medium">{story.title}</h3>
                  <p className="f-muted mt-1 text-xs font-semibold uppercase tracking-wider">{story.subtitle}</p>

                  {isActive && (
                    <motion.div
                      layoutId="activeStoryLine"
                      className="absolute bottom-0 left-0 top-0 w-1 rounded-l-sm bg-[var(--gold)]"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right Active Story Details */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="f-sec f-border relative overflow-hidden rounded-sm border p-8 md:p-12"
              >
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
                  <div className="flex-1">
                    <span className="eyebrow f-earth">{STORIES[activeStory].tag}</span>
                    <h3 className="f-display mt-3 text-3xl font-normal leading-tight md:text-4xl">
                      {STORIES[activeStory].title}
                    </h3>
                    <p className="f-muted mt-5 text-sm font-normal leading-relaxed md:text-base">
                      {STORIES[activeStory].body}
                    </p>
                  </div>

                  <div className="f-bg f-border min-w-[190px] shrink-0 rounded-sm border p-6 text-center">
                    <p className="f-display f-accent text-4xl font-medium md:text-5xl">{STORIES[activeStory].stat}</p>
                    <p className="eyebrow f-muted mt-2 text-[0.68rem] font-bold leading-tight whitespace-normal">
                      {STORIES[activeStory].statLabel}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-stone-200 pt-6">
                  <span className="eyebrow f-muted">Guaranteed Single-Origin</span>
                  <a href="#products" className="eyebrow f-ink border-b border-black pb-0.5 font-bold transition-opacity hover:opacity-70">
                    {STORIES[activeStory].linkText}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 10. PRODUCT GRID & OFFERING CARD                                   */
/* ------------------------------------------------------------------ */
const FILTERS = [
  { id: "all", label: "All Harvest" },
  { id: "honey", label: "Raw Honey" },
  { id: "nuts", label: "Nuts & Dried Fruits" },
  { id: "seasonal", label: "Seasonal Fruits" }, // Naya filter add ho gaya
];

function OfferingCard({ item }) {
  return (
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
  );
}



function FeatureGrid({ onAdd }) {
  const [filter, setFilter] = useState("all");
  const scrollContainerRef = useRef(null);

  const items = OFFERINGS.filter((o) => filter === "all" || o.category === filter);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="products" className="f-bg relative overflow-hidden px-6 py-28 md:px-12 md:py-36">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="mx-auto max-w-[1400px]">
        {/* ANIMATED TALK TO US BANNER */}
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

        {/* HEADER & FILTERS */}
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
                onClick={() => setFilter(f.id)}
                className="eyebrow whitespace-nowrap rounded-full border px-6 py-2.5 text-xs font-bold transition-all duration-300 touch-manipulation cursor-pointer"
                style={
                  filter === f.id
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

        {/* HORIZONTAL CAROUSEL WITH FIXED ORIGINAL CARD WIDTH */}
        <div className="relative group -mx-4 px-4 sm:mx-0 sm:px-0">
          {/* Left Arrow Button */}
          <button 
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-800 shadow-[0_4px_20px_rgba(0,0,0,0.18)] border border-amber-100 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 hover:bg-stone-50 cursor-pointer touch-manipulation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button 
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-800 shadow-[0_4px_20px_rgba(0,0,0,0.18)] border border-amber-100 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 hover:bg-stone-50 cursor-pointer touch-manipulation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>

          {/* Cards Container with original compact card sizes */}
          <motion.div 
            ref={scrollContainerRef}
            layout 
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 scroll-smooth"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <div key={item.id} className="w-[260px] sm:w-[275px] md:w-[285px] snap-start shrink-0">
                  <OfferingCard item={item} onAdd={onAdd} />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 11. REVIEWS / TESTIMONIALS SECTION                                 */
/* ------------------------------------------------------------------ */
function CustomerReviewsComponent() {
  return (
    <section className="f-sec f-border border-b border-t px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <span className="eyebrow f-accent">Trusted Across Homes</span>
          <h2 className="f-display mt-4 text-4xl font-normal md:text-5xl">What Our Customers Experience</h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {REVIEWS.map((rev, idx) => (
            <div key={idx} className="f-bg f-border flex flex-col justify-between border p-8">
              <div>
                <div className="flex gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p className="f-display mt-6 text-2xl font-medium leading-relaxed">
                  “{rev.quote}”
                </p>
              </div>
              <div className="mt-8 border-t border-stone-200 pt-5">
                <p className="eyebrow font-bold text-xs">{rev.author}</p>
                <p className="f-muted mt-0.5 text-xs font-medium">{rev.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 12. FOOTER                                                         */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer id="contact" className="f-sec f-border border-t px-6 py-20 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-3"
      >
        <div>
      <div>
      {/* Medium Circle with both Image and Text Inside */}
      <div className="bg-[#FAE7AC] flex flex-col justify-center items-center rounded-full w-24 h-24">
        <img 
          src="/faroosh.png" 
          alt="Faroosh Logo" 
          className="w-8 h-auto object-contain" 
        />
        <span className="text-[#CAA387] font-bold text-[11px] mt-1 tracking-tight">
          Faroosh.pk
        </span>
      </div>

      {/* Description Paragraph */}
      <p className="f-muted mt-6 max-w-xs text-sm font-normal leading-relaxed">
        Pure organic harvest from the Potohar plateau, Gilgit valleys, and Hunza terraces delivered straight to your home.
      </p>
    </div>
        </div>
        <nav className="flex flex-col gap-3.5">
          <span className="eyebrow f-muted">Navigation</span>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="f-display w-fit text-2xl font-normal hover:opacity-70">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-4">
          <span className="eyebrow f-muted">Direct Contact</span>
          <a href="mailto:hello@faroosh.com" className="flex items-center gap-3 text-sm font-medium">
            <Mail size={16} strokeWidth={1.5} className="f-accent" />
            hello@faroosh.com
          </a>
          <a href="tel:+923000000000" className="flex items-center gap-3 text-sm font-medium">
            <Phone size={16} strokeWidth={1.5} className="f-accent" />
            +92 300 0000000
          </a>
          <p className="f-muted flex items-center gap-3 text-sm font-normal">
            <MapPin size={16} strokeWidth={1.5} className="f-accent" />
            Rawalpindi · Islamabad · Gilgit
          </p>
        </div>
      </motion.div>
      <div className="f-border mx-auto mt-16 flex max-w-[1400px] flex-col gap-3 border-t pt-8 sm:flex-row sm:justify-between">
        <span className="eyebrow f-muted">© 2026 Faroosh Farms</span>
        <span className="eyebrow f-muted">Asli Zaiqa · Authentically Pakistani</span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* 13. MAIN PAGE COMPONENT                                            */
/* ------------------------------------------------------------------ */
export default function FarooshSinglePage() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (title) => {
    setCart((prev) => [...prev, title]);
    setCartOpen(true);
  };

  return (
    <MotionConfig reducedMotion="never">
      <Styles />
      <main className="faroosh min-h-screen overflow-x-hidden">
        <Header cartCount={cart.length} onCartClick={() => setCartOpen(true)} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} />
        <Hero />
        <TrustBar />
        <FarmsStory />
        <ProcessSection />
        <FarmStorytellingSection />
        <FeatureGrid onAdd={addToCart} />
        <CustomerReviews />
        
        <section id="story" className="f-bg px-6 pb-10 md:px-12">
          <div className="mx-auto max-w-[900px] py-24 text-center">
            <span className="eyebrow f-muted">Our Purpose</span>
            <p className=" f-display mt-8 text-[clamp(1.8rem,3.4vw,2.9rem)] font-normal leading-[1.28]">
              Faroosh began with a single apricot orchard in the mountains. Today it stands as a bridge connecting Pakistan's richest organic harvest straight to your family home.
            </p>
            {/* HIGH-IMPACT CLASSIC ANIMATED SEE MORE BUTTON */}
    {/* MEDIUM CLASSIC ANIMATED SEE MORE BUTTON (Responsive) */}
<div className="mt-6 flex w-full justify-center px-4 md:mt-8">
  <Link
    href="/story"
    className="group relative inline-flex max-w-full items-center gap-3 overflow-hidden rounded-full border border-amber-500/40 bg-gradient-to-r from-[#FDF9F1] via-[#FFFDF8] to-[#FDF9F1] px-5 py-2 shadow-[0_4px_15px_rgba(217,119,6,0.08)] transition-all duration-500 hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-[0_8px_20px_rgba(225,29,72,0.15)] md:px-6 md:py-2.5 touch-manipulation cursor-pointer"
  >
    {/* Ambient Hover Gradient Backdrop */}
    <span className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-amber-500/15 to-orange-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

    {/* Light Sweep (Shine) Animation */}
    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/90 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

    {/* Live Pulsing Indicator Dot */}
    <span className="relative flex h-1.5 w-1.5 shrink-0 md:h-2 md:w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-600 md:h-2 md:w-2" />
    </span>

    {/* Typography */}
    <span className="relative truncate text-[10px] font-bold uppercase tracking-[0.2em] text-stone-800 transition-colors duration-300 group-hover:text-amber-950 md:text-xs">
      See More
    </span>

    {/* Animated Circle Icon with Gradient Fill on Hover */}
    <div className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-800 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-amber-500 group-hover:text-white group-hover:shadow-md md:h-6 md:w-6">
      <svg
        className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5 md:h-3 md:w-3"
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
  </Link>
</div>
          </div>
        </section>

        <Footer />
      </main>
    </MotionConfig>
  );
}