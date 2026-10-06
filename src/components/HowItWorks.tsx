"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    id: "01",
    title: "Vitrinini oluştur",
    description:
      "Hesabını aç, profilini düzenle, markana uygun temayı seç. Hiçbir kod bilgisi gerekmeden vitrinin 2 dakikada hazır.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop", // Grid/Tech setup
  },
  {
    id: "02",
    title: "Ürünlerini ekle",
    description:
      "Dijital ürün dosyalarını yükle, 1:1 danışmanlık saatlerini belirle veya ücretli topluluk aboneliklerini fiyatlandır.",
    image:
      "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200&auto=format&fit=crop", // Elegant tech
  },
  {
    id: "03",
    title: "Linkini paylaş & Kazan",
    description:
      "Tek bir vitrin linkini Instagram veya TikTok biyografine ekle. Takipçilerin tıklasın, doğrudan satın alsın ve sen kazan.",
    image:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1200&auto=format&fit=crop", // Network/Graph
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="nasil-calisir" className="py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-left mb-16 md:mb-24">
          <span className="text-xs font-medium tracking-widest text-[#D32F2F] uppercase">
            Nasıl Çalışır
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#1A1A1A] mt-3">
            Sadece <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D32F2F] to-[#F57C00]">3 adımda</span> satışa başla
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Left: Interactive Tabs */}
          <div className="w-full lg:w-4/12 space-y-2">
            {STEPS.map((step, idx) => (
              <div
                key={step.id}
                onClick={() => setActive(idx)}
                className={`cursor-pointer group relative p-6 rounded-2xl transition-all duration-500 ${
                  idx === active ? "bg-[#1A1A1A]/5" : "hover:bg-[#1A1A1A]/[0.02]"
                }`}
              >
                {/* Active Indicator Line */}
                {idx === active && (
                  <motion.div
                    layoutId="active-step-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#D32F2F] rounded-l-2xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <h3
                  className={`text-2xl font-bold tracking-tight transition-colors duration-500 flex flex-col ${
                    idx === active ? "text-[#1A1A1A]" : "text-zinc-600 group-hover:text-zinc-700"
                  }`}
                >
                  <span className="text-xs font-mono tracking-widest mb-2 opacity-50">ADIM {step.id}</span>
                  {step.title}
                </h3>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: idx === active ? "auto" : 0,
                    opacity: idx === active ? 1 : 0,
                    marginTop: idx === active ? 16 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-base text-zinc-700 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right: Dynamic Visual Display */}
          <div className="w-full lg:w-8/12 aspect-[4/3] lg:aspect-[16/10] relative rounded-3xl overflow-hidden border border-black/10 bg-white/40 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={STEPS[active].image}
                alt={STEPS[active].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] grayscale-[0.2]"
              />
            </AnimatePresence>

            {/* Premium UI Overlay Badge */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`ui-${active}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="backdrop-blur-md bg-white/60 border border-black/10 rounded-2xl p-4 md:p-6 w-full max-w-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center font-mono text-sm text-[#1A1A1A] border border-black/20">
                      {STEPS[active].id}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A]">{STEPS[active].title}</div>
                      <div className="text-xs text-zinc-700 mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Sistem Hazır
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


