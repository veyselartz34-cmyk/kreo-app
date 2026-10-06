"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { ContainerScroll } from "./ui/container-scroll-animation";

// Hibrit tipografi için özel İtalik Serif Font
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  style: "italic",
  weight: "700" 
});

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Title ve Butonların bulunduğu ana başlık kısmı
  const TitleComponent = (
    <div className="flex flex-col items-center">
      {/* Shiny Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/20 bg-[#1A1A1A]/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <Sparkles className="w-4 h-4 text-[#1A1A1A]" />
          <span className="text-sm font-medium text-[#1A1A1A]">
            Türkiye'nin Yeni Nesil Satış Platformu
          </span>
        </div>
      </motion.div>

      {/* Massive Headline with Hybrid Typography */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-[#1A1A1A] leading-[1.1] max-w-5xl mx-auto"
      >
        Satışlarınızı tek bir{" "}
        <span 
          className={`${playfair.className} text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 drop-shadow-[0_0_25px_rgba(99,102,241,0.6)] px-2`}
        >
          link
        </span>{" "}
        ile yönetin
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="mt-8 text-lg md:text-xl text-zinc-700 max-w-2xl mx-auto leading-relaxed"
      >
        E-kitap, danışmanlık, dijital kurs ve ücretli topluluk. Karmaşık entegrasyonlar olmadan, kusursuz tasarımla anında satmaya başlayın.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <button className="premium-btn px-8 py-3.5 flex items-center gap-2 text-sm">
          Ücretsiz Başla
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
        <button className="px-8 py-3.5 text-sm font-medium text-zinc-800 hover:text-[#1A1A1A] transition-colors bg-[#1A1A1A]/5 border border-black/10 rounded-full hover:bg-[#1A1A1A]/10">
          Demoyu İncele
        </button>
      </motion.div>
    </div>
  );

  return (
    <section className="relative flex flex-col items-center justify-start pt-10 overflow-hidden bg-[#000000]">
      
      {/* VIBRANT ANIMATED BACKGROUND */}
      {isClient && <AnimatedBackground />}

      {/* ACETERNITY 3D SCROLL COMPONENT */}
      <ContainerScroll titleComponent={TitleComponent}>
        
        {/* Bizim Premium Dashboard Tasarımımız (Resim yerine canlı HTML) */}
        <div className="flex flex-col h-full bg-[#050505]">
          {/* Top Bar */}
          <div className="flex items-center px-4 py-3 border-b border-black/10 bg-zinc-900/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto px-4 py-1 rounded-md bg-[#1A1A1A]/5 border border-black/10 text-xs text-zinc-700 font-mono flex items-center gap-2">
              <span>Kreo.com/dashboard</span>
            </div>
          </div>
          
          {/* Inner UI */}
          <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-hidden">
            <div className="col-span-2 space-y-4">
              <div className="h-40 md:h-64 rounded-xl bg-[#1A1A1A]/5 border border-black/10 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-purple-500/30 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-blue-600/20 group-hover:opacity-80 transition-opacity" />
                  <span className="text-[#1A1A1A]/50 font-medium z-10 group-hover:scale-105 transition-transform">Kapsamlı Gelir Analizi</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-28 md:h-40 rounded-xl bg-[#1A1A1A]/5 border border-black/10 p-4 md:p-6 hover:bg-[#1A1A1A]/10 transition-colors cursor-pointer">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#1A1A1A]/10 mb-2 md:mb-4" />
                  <div className="h-3 md:h-4 w-20 md:w-24 bg-[#1A1A1A]/15 rounded mb-2" />
                  <div className="h-5 md:h-8 w-32 md:w-40 bg-white/40 rounded" />
                </div>
                <div className="h-28 md:h-40 rounded-xl bg-[#1A1A1A]/5 border border-black/10 p-4 md:p-6 hover:bg-[#1A1A1A]/10 transition-colors cursor-pointer">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#1A1A1A]/10 mb-2 md:mb-4" />
                  <div className="h-3 md:h-4 w-20 md:w-24 bg-[#1A1A1A]/15 rounded mb-2" />
                  <div className="h-5 md:h-8 w-32 md:w-40 bg-white/40 rounded" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-20 md:h-28 rounded-xl bg-[#1A1A1A]/5 border border-black/10 p-4 hover:bg-[#1A1A1A]/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#D32F2F] to-[#FBC02D]" />
                    <div>
                      <div className="h-3 md:h-4 w-20 md:w-28 bg-white/40 rounded mb-1.5 md:mb-2" />
                      <div className="h-2 md:h-3 w-12 md:w-16 bg-[#1A1A1A]/15 rounded" />
                    </div>
                  </div>
              </div>
              <div className="h-52 md:h-auto md:flex-1 rounded-xl bg-[#1A1A1A]/5 border border-black/10 p-4 space-y-3 hover:border-black/20 transition-colors cursor-pointer">
                  <div className="h-8 md:h-12 w-full bg-[#1A1A1A]/10 rounded hover:bg-[#1A1A1A]/15 transition-colors" />
                  <div className="h-8 md:h-12 w-full bg-[#1A1A1A]/10 rounded hover:bg-[#1A1A1A]/15 transition-colors" />
                  <div className="h-8 md:h-12 w-full bg-[#1A1A1A]/10 rounded hover:bg-[#1A1A1A]/15 transition-colors" />
                  <div className="h-8 md:h-12 w-full bg-[#1A1A1A]/10 rounded hover:bg-[#1A1A1A]/15 transition-colors hidden md:block" />
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>

      {/* BOTTOM FADE OUT GRADIENT TO FIX SHARP TRANSITION */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
}
