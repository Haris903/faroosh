'use client';

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  MessageCircle,
  Clock
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

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

export default function FarooshStoryPage() {
  const whatsappUrl = "https://wa.me/923710506436";

  return (
    <div className="faroosh relative min-h-screen bg-[#FFFDF5] text-[#3B110B] selection:bg-[#E11D48] selection:text-white font-jakarta overflow-x-hidden antialiased">
      
      {/* CUSTOM THEME SCROLLBAR STYLES */}
      <style>{`
        ::-webkit-scrollbar {
          width: 9px;
        }
        ::-webkit-scrollbar-track {
          background: #FFFDF5;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #E11D48 0%, #EA580C 50%, #D97706 100%);
          border-radius: 9999px;
          border: 2px solid #FFFDF5;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #BE123C 0%, #C2410C 50%, #B45309 100%);
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #EA580C #FFFDF5;
        }
      `}</style>

      {/* GEOMETRIC GOLDEN BACKGROUND PATTERN */}
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

      {/* HERO SECTION */}
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

      {/* VISUAL BANNER / IMAGE CONTAINER */}
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

      {/* DETAILED NARRATIVE STORY */}
      <section className="relative z-10 px-5 md:px-12 max-w-[1200px] mx-auto mb-32 space-y-20 lg:space-y-32">
        
        {/* STORY CHAPTER 1 */}
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

        {/* STORY CHAPTER 2 */}
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

        {/* STORY CHAPTER 3 */}
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

      {/* HIGHLIGHT FEATURES GRID */}
      <section className="relative z-10 px-5 md:px-12 max-w-[1400px] mx-auto mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <MapPin className="text-[#E11D48]" size={26} />,
              title: "Family-Owned Orchards",
              desc: "100% sourced directly from our private mountain land in Skardu."
            },
            {
              icon: <PackageCheck className="text-[#E11D48]" size={26} />,
              title: "Instant Vacuum Pack",
              desc: "Hygienically packaged right after harvest to lock in moisture."
            },
            {
              icon: <ShieldCheck className="text-[#E11D48]" size={26} />,
              title: "Fair Direct Rates",
              desc: "Transparent and accessible pricing straight from the growers."
            },
            {
              icon: <Clock className="text-[#E11D48]" size={26} />,
              title: "Seasonal Freshness",
              desc: "Peak seasonal fruits and organic nuts delivered straight to your door."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6, ease: EASE }}
              className="p-8 rounded-3xl bg-[#FEFCE8]/80 backdrop-blur-md border border-[#FDE68A] shadow-lg shadow-[#F59E0B]/5 space-y-4 hover:border-[#E11D48]/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-3 bg-white rounded-2xl w-fit border border-[#FDE68A] shadow-sm">
                {item.icon}
              </div>
              <h4 className="text-xl lg:text-2xl font-serif font-semibold tracking-tight text-[#3B110B]">{item.title}</h4>
              <p className="text-sm md:text-base text-[#5F2113]/80 font-jakarta font-normal leading-relaxed tracking-wide">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ONLINE STORE LAUNCH & DIRECT WHATSAPP CTA */}
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

          <div className="flex justify-center md:justify-end w-full md:w-auto z-10">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E11D48] via-[#EA580C] to-[#D97706] text-white font-medium text-base tracking-wide whitespace-nowrap shadow-xl shadow-[#E11D48]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2.5 group shrink-0"
            >
              <MessageCircle size={20} className="shrink-0" />
              <span className="whitespace-nowrap">Talk To Us</span>
            </motion.a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}