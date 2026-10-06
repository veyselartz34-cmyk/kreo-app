"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Calendar, Users, CreditCard, Zap, ShieldCheck } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Yardımcı Sınıf Birleştirici
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Kreo Özellikleri
const FEATURES = [
  {
    id: "digital-products",
    label: "Dijital Ürün Satışı",
    icon: Package,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", // Abstract liquid (Guaranteed)
    description: "E-kitap, şablon, preset. Yükle, fiyatla ve anında sat.",
  },
  {
    id: "consulting",
    label: "1:1 Danışmanlık",
    icon: Calendar,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop", // Retro PC (Guaranteed)
    description: "Müşterin saati seçsin, ödesin, randevu otomatik oluşsun.",
  },
  {
    id: "community",
    label: "Ücretli Topluluk",
    icon: Users,
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop", // Sphere (Guaranteed)
    description: "Aylık abonelik ile özel içerik paylaş ve MRR yarat.",
  },
  {
    id: "payments",
    label: "Ödeme Altyapısı",
    icon: CreditCard,
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop", // Blue mesh (Guaranteed)
    description: "Stripe hesabı açmana gerek kalmadan yerel altyapıyla satış yap.",
  },
  {
    id: "fast-setup",
    label: "Hızlı Kurulum",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", // Wireframe (Guaranteed)
    description: "2 dakikada vitrinini aç. Asla kod bilgisi gerekmez.",
  },
  {
    id: "invoice",
    label: "e-Arşiv Fatura",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop", // Neon lines (Guaranteed)
    description: "Her satışta müşterine otomatik e-Arşiv fatura kesilir.",
  },
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      {/* Dev boşluğu kapatmak için içerikler merkeze çekildi (gap-10) */}
      <div className="relative flex flex-col lg:flex-row min-h-[600px] lg:h-[700px] w-full bg-transparent items-center justify-center gap-10 lg:gap-16">
        
        {/* SOL KOLON: Seçenekler (Chips) - Sağa (merkeze) yaslandı */}
        <div className="w-full lg:w-[45%] relative z-30 flex flex-col items-center lg:items-end justify-center overflow-hidden py-10 lg:py-0">
          <div className="absolute inset-x-0 top-0 h-16 md:h-24 bg-gradient-to-b from-[#000000] via-[#000000]/80 to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 md:h-24 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent z-40 pointer-events-none" />
          
          <div className="relative w-full max-w-[320px] h-full flex items-center justify-start z-20 lg:mr-0 mx-auto">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );
              
              const IconComponent = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-8 py-4 md:py-5 rounded-full transition-all duration-700 text-left group border shadow-lg backdrop-blur-md",
                      isActive
                        ? "bg-white text-black border-white z-10 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        : "bg-[#1A1A1A]/5 text-[#1A1A1A]/60 border-black/10 hover:border-white/30 hover:bg-[#1A1A1A]/10 hover:text-[#1A1A1A]"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-purple-600" : "text-[#1A1A1A]/40"
                      )}
                    >
                      <IconComponent size={20} strokeWidth={isActive ? 2.5 : 2} />
                    </div>

                    <span className={cn(
                        "font-semibold text-sm md:text-[15px] tracking-tight whitespace-nowrap",
                        isActive ? "text-black" : ""
                    )}>
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SAĞ KOLON: 3D Görseller ve Açıklama - Sola (merkeze) yaslandı */}
        <div className="w-full lg:w-[55%] relative flex items-center justify-center lg:justify-start py-10 lg:py-0 overflow-visible">
          
          <div className="relative w-full max-w-[420px] xl:max-w-[480px] aspect-[4/5] flex items-center justify-center mx-auto lg:ml-0">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -4 : isNext ? 4 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-2 border-black/10 bg-[#0a0a0a] origin-center shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700 mix-blend-luminosity", 
                      isActive
                        ? "grayscale-[0.2] blur-0 opacity-100"
                        : "grayscale blur-[4px] opacity-40"
                    )}
                  />
                  
                  {/* Elit SaaS Hissiyatı İçin Mor/Karanlık Renk Filtresi (Tint) */}
                  <div className="absolute inset-0 bg-[#FBC02D]/30 mix-blend-overlay pointer-events-none" />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-8 md:p-10 pt-40 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end pointer-events-none z-10"
                      >
                        <div className="bg-[#1A1A1A]/10 text-[#1A1A1A] backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] w-fit shadow-lg mb-4 border border-black/20">
                          0{index + 1}
                        </div>
                        <h3 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl leading-tight mb-2">
                          {feature.label}
                        </h3>
                        <p className="text-zinc-900 font-normal text-sm md:text-base leading-relaxed tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300 z-10",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse" />
                    <span className="text-[#1A1A1A]/80 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shadow-black drop-shadow-md">
                      YAYINDA
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
