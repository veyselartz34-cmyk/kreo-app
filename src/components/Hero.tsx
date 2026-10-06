"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";

// Hibrit tipografi
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

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      
      {/* CSS Animasyonları */}
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 60s linear infinite; }
        @keyframes spin-slow-reverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 60s linear infinite; }
      `}</style>

      {/* Arka Plan Galaksi İkonları (mask-image ile kenarlara doğru şeffaflaşır) */}
      {isClient && (
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ 
            perspective: "1200px", 
            transform: "perspective(1200px) rotateX(15deg)", 
            transformOrigin: "center bottom",
            WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 60%)",
            maskImage: "radial-gradient(circle at center, black 0%, transparent 60%)"
          }}
        >
          {/* En Arka Katman */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-[30%] left-1/2" style={{ width: "2000px", height: "2000px", transform: "translate(-50%, -50%) rotate(279deg)", zIndex: 0 }}>
              <img src="https://cdn.21st.dev/assets/mirror/c6/c66b4f0c389b961a3676312892ca1387d7f8bd1973f44a33c7d47840d297633f.png" alt="" className="w-full h-full object-cover opacity-30" />
            </div>
          </div>
          {/* Orta Katman */}
          <div className="absolute inset-0 animate-spin-slow-reverse">
            <div className="absolute top-[30%] left-1/2" style={{ width: "1000px", height: "1000px", transform: "translate(-50%, -50%) rotate(304deg)", zIndex: 1 }}>
              <img src="https://cdn.21st.dev/assets/mirror/75/75f75d84f07a61893dc2a16aad0c781c32b9e758c8f0adda2a8b252c431fdd82.png" alt="" className="w-full h-full object-cover opacity-40" />
            </div>
          </div>
          {/* Ön Katman */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-[30%] left-1/2" style={{ width: "800px", height: "800px", transform: "translate(-50%, -50%) rotate(48deg)", zIndex: 2 }}>
              <img src="https://cdn.21st.dev/assets/mirror/e0/e08cdf40df3bedc96255e0e30240d7583b0a309da36bcd8a760d3c35cc67a286.png" alt="" className="w-full h-full object-cover opacity-60" />
            </div>
          </div>
        </div>
      )}

      {/* İçerik */}
      <div className="flex flex-col items-center relative z-20 w-full px-6 -mt-20">
        
        {/* Shiny Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/20 bg-[#1A1A1A]/5 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.05)]">
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
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-[#1A1A1A] leading-[1.1] max-w-5xl mx-auto text-center"
        >
          Satışlarınızı tek bir{" "}
          <span 
            className={`${playfair.className} text-transparent bg-clip-text bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#FBC02D] drop-shadow-[0_0_25px_rgba(211,47,47,0.6)] px-2`}
          >
            link
          </span>{" "}
          ile yönetin
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg md:text-xl text-zinc-700 max-w-2xl mx-auto leading-relaxed text-center"
        >
          E-kitap, danışmanlık, dijital kurs ve ücretli topluluk. Karmaşık entegrasyonlar olmadan, hemen sıranı ayırt.
        </motion.p>

        {/* Minimalist CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="/register" className="px-8 py-3.5 bg-[#D32F2F] text-white font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(211,47,47,0.3)] flex items-center gap-2">
            Ücretsiz Başla
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="/nuhveysel" target="_blank" className="px-8 py-3.5 bg-[#1A1A1A]/5 border border-black/10 text-[#1A1A1A] font-medium rounded-full hover:bg-[#1A1A1A]/10 transition-colors">
            Demoyu İncele
          </a>
        </motion.div>
      </div>

    </section>
  );
}
