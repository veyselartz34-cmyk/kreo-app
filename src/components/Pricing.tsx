"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
  };

  return (
    <section id="fiyatlandirma" className="py-24 md:py-32 relative z-10 overflow-hidden">
      {/* Çok daha yumuşak, kesilmeyen bir arka plan parlaması (radial) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FBC02D]/30 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center">
          <span className="text-xs font-medium tracking-widest text-[#D32F2F] uppercase">
            Fiyatlandırma
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#1A1A1A] mt-3">
            Basit ve şeffaf
          </h2>
          <p className="text-zinc-700 text-base md:text-lg mt-4 max-w-lg mx-auto">
            Gizli maliyet veya sürpriz kesinti yok. İhtiyacına uygun olanı seç, istediğin zaman iptal et.
          </p>
        </div>

        {/* Aylık / Yıllık Toggle */}
        <div className="mt-12 flex justify-center items-center gap-4">
          <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-[#1A1A1A]' : 'text-zinc-600'}`}>Aylık</span>
          <button 
            type="button"
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-7 rounded-full bg-[#FBC02D] p-1 relative transition-colors focus:outline-none"
            aria-label="Toggle billing cycle"
          >
            <motion.div 
              className="w-5 h-5 rounded-full bg-white shadow-md"
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              initial={false}
              animate={{ x: isYearly ? 28 : 0 }}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-[#1A1A1A]' : 'text-zinc-600'}`}>Yıllık</span>
            <span className="bg-[#D32F2F]/20 text-[#F57C00] border border-purple-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              %20 İndirim
            </span>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16"
        >
          {/* Card 1 — Başlangıç */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-[#1A1A1A]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full p-10 rounded-3xl bg-[#1A1A1A]/50 border border-black/5 backdrop-blur-sm transition-all duration-500 hover:border-black/10 hover:bg-white/70 flex flex-col">
              <h3 className="text-xl font-medium text-[#1A1A1A] mb-2">Başlangıç</h3>
              <div className="flex items-end gap-1 mb-2 overflow-hidden h-[60px]">
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={isYearly ? 'year' : 'month'}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="text-5xl font-bold text-[#1A1A1A] tracking-tighter leading-none"
                  >
                    ₺{isYearly ? '199' : '249'}
                  </motion.span>
                </AnimatePresence>
                <span className="text-zinc-600 mb-1 leading-none">/ay</span>
              </div>
              <p className="text-sm text-zinc-700 mb-8">+ satış başına %4 komisyon</p>
              
              <button type="button" className="w-full py-3 px-4 rounded-xl font-medium text-sm text-[#1A1A1A] bg-[#1A1A1A]/5 border border-black/10 hover:bg-[#1A1A1A]/10 transition-colors mb-8">
                Ücretsiz Denemeye Başla
              </button>

              <div className="space-y-4 flex-1">
                {[
                  "Sınırsız dijital ürün yükleme",
                  "1:1 danışmanlık takvimi modülü",
                  "Ücretli topluluk abonelikleri",
                  "iyzico/PayTR ödeme entegrasyonu",
                  "Otomatik e-Arşiv fatura kesimi",
                  "Temel ziyaretçi analitiği",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={16} className="text-zinc-600 shrink-0" />
                    <span className="text-sm text-zinc-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Pro (Tavsiye Edilen) */}
          <motion.div variants={itemVariants} className="relative group">
            {/* Animated glowing border effect */}
            <div className="absolute -inset-[1.5px] bg-gradient-to-b from-[#D32F2F] via-[#F57C00] to-transparent rounded-[1.5rem] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[#D32F2F]/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="relative h-full p-10 rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 mt-8">
                <span className="bg-gradient-to-r from-[#D32F2F] to-[#FBC02D] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full shadow-lg">
                  Tavsiye Edilen
                </span>
              </div>

              <h3 className="text-xl font-medium text-[#1A1A1A] mb-2">Pro</h3>
              <div className="flex items-end gap-1 mb-2 overflow-hidden h-[60px]">
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={isYearly ? 'year' : 'month'}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#D32F2F] to-[#F57C00] tracking-tighter leading-none"
                  >
                    ₺{isYearly ? '479' : '599'}
                  </motion.span>
                </AnimatePresence>
                <span className="text-zinc-600 mb-1 leading-none">/ay</span>
              </div>
              <p className="text-sm text-zinc-600 mb-8">+ satış başına sadece %1.5 komisyon</p>
              
              <button type="button" className="w-full py-3 px-4 rounded-xl font-medium text-sm text-black bg-[#D32F2F] hover:bg-[#C62828] hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(211,47,47,0.4)] mb-8">
                Pro Plan'a Geç
              </button>

              <div className="space-y-4 flex-1">
                {[
                  "Başlangıç planındaki her şey",
                  "Kendi özel alan adını (domain) bağlama",
                  "Video kurs barındırma (50GB)",
                  "Gelişmiş gelir analitiği ve raporlar",
                  "Öncelikli 7/24 canlı destek",
                  "API erişimi ve webhook entegrasyonu",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 bg-[#D32F2F]/20 p-0.5 rounded-full border border-purple-500/30 shrink-0">
                      <Check size={12} className="text-[#F57C00]" />
                    </div>
                    <span className="text-sm text-zinc-900">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <p className="text-center text-xs text-zinc-600 mt-12">
          İlk 14 gün tamamen ücretsiz. Herhangi bir kredi kartı bilgisi gerekmez.
        </p>
      </div>
    </section>
  );
}


