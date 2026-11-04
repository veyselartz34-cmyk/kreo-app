"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, ArrowRight, ShieldCheck, Zap, TrendingUp, 
  Users, CheckCircle2, Star, Play, Compass, DollarSign,
  Lock, Award
} from "lucide-react";
import { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

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
    <section className="relative flex flex-col items-center justify-center min-h-[92vh] pt-24 pb-16 overflow-hidden">
      
      {/* CSS Animasyonları */}
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 70s linear infinite; }
        @keyframes spin-slow-reverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 70s linear infinite; }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        @keyframes float-slow-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
        .animate-float-delayed { animation: float-slow-delayed 4.5s ease-in-out infinite; }
      `}</style>

      {/* 1. Arka Plan Galaksi & Parçacık Ağı */}
      {isClient && (
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ 
            perspective: "1200px", 
            transform: "perspective(1200px) rotateX(15deg)", 
            transformOrigin: "center bottom",
            WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 65%)",
            maskImage: "radial-gradient(circle at center, black 0%, transparent 65%)"
          }}
        >
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-[32%] left-1/2" style={{ width: "2000px", height: "2000px", transform: "translate(-50%, -50%) rotate(279deg)", zIndex: 0 }}>
              <img src="https://cdn.21st.dev/assets/mirror/c6/c66b4f0c389b961a3676312892ca1387d7f8bd1973f44a33c7d47840d297633f.png" alt="" className="w-full h-full object-cover opacity-25" />
            </div>
          </div>
          <div className="absolute inset-0 animate-spin-slow-reverse">
            <div className="absolute top-[32%] left-1/2" style={{ width: "1050px", height: "1050px", transform: "translate(-50%, -50%) rotate(304deg)", zIndex: 1 }}>
              <img src="https://cdn.21st.dev/assets/mirror/75/75f75d84f07a61893dc2a16aad0c781c32b9e758c8f0adda2a8b252c431fdd82.png" alt="" className="w-full h-full object-cover opacity-35" />
            </div>
          </div>
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-[32%] left-1/2" style={{ width: "850px", height: "850px", transform: "translate(-50%, -50%) rotate(48deg)", zIndex: 2 }}>
              <img src="https://cdn.21st.dev/assets/mirror/e0/e08cdf40df3bedc96255e0e30240d7583b0a309da36bcd8a760d3c35cc67a286.png" alt="" className="w-full h-full object-cover opacity-50" />
            </div>
          </div>
        </div>
      )}

      {/* 2. Ana İçerik */}
      <div className="flex flex-col items-center relative z-20 w-full px-4 sm:px-6 max-w-5xl mx-auto text-center">
        
        {/* Shiny Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/[0.08] bg-white/70 backdrop-blur-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)]">
            <Sparkles className="w-4 h-4 text-[#F57C00]" />
            <span className="text-xs font-black uppercase tracking-wider text-zinc-800">
              Türkiye'nin Yeni Nesil İçerik Üreticisi Platformu
            </span>
          </div>
        </motion.div>

        {/* Başlık - Playfair & Sıcak Degrade Hibrit Tipografi */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black tracking-tight text-[#1A1A1A] leading-[1.12] max-w-4xl mx-auto"
        >
          Satışlarınızı tek bir{" "}
          <span 
            className={`${playfair.className} text-transparent bg-clip-text bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100] px-2 inline-block`}
          >
            link
          </span>{" "}
          ile yönetin
        </motion.h1>

        {/* Açıklama */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          E-kitap, danışmanlık seansı, dijital şablon ve ücretli topluluk. Karmaşık entegrasyonlar olmadan, 2 dakikada kendi lüks vitrininizi açın.
        </motion.p>

        {/* CTA Butonları (İmza Sıcak Degrade + Shimmer) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link 
            href="/register" 
            className="relative group/btn overflow-hidden px-9 py-4 rounded-full text-white text-base font-bold shadow-[0_4px_25px_rgba(245,124,0,0.35)] hover:shadow-[0_8px_35px_rgba(245,124,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100] flex items-center justify-center gap-2.5 w-full sm:w-auto"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 flex items-center gap-2">
              <span>Hemen Ücretsiz Başla</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link 
            href="/nnv1234" 
            target="_blank" 
            className="px-8 py-4 bg-white/80 hover:bg-white border border-black/[0.08] text-[#1A1A1A] font-bold text-sm rounded-full shadow-2xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>Canlı Vitrin Demosu</span>
            <span className="text-xs text-zinc-400">↗</span>
          </Link>
        </motion.div>

        {/* Güven ve Avantaj Rozetleri (Sosyal Kanıt) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-bold text-zinc-500"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span>Kredi Kartı Gerekmez</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-50 text-[#F57C00] flex items-center justify-center border border-orange-100/60">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span>256-Bit iyzico Altyapısı</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-rose-50 text-[#D32F2F] flex items-center justify-center border border-rose-100/60">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span>2 Dakikada Canlıda</span>
          </div>
        </motion.div>

        {/* 3. İNTERAKTİF CANLI MOCKUP / DASHBOARD ÖNİZLEMESİ (Sayfaya Derinlik Katacak Bölüm) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-16 w-full max-w-4xl relative"
        >
          {/* Arka Plan Yumuşak Işıltı */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D32F2F]/20 via-[#F57C00]/20 to-[#E65100]/20 rounded-[2.5rem] blur-2xl opacity-60 -z-10" />

          {/* Ana Vitrin Çerçevesi */}
          <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] border border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden text-left p-6 sm:p-8">
            
            {/* Üst Bar: Mac Tarzı Butonlar & Link */}
            <div className="flex items-center justify-between pb-6 border-b border-black/[0.06] mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              
              <div className="px-4 py-1.5 bg-zinc-100/80 rounded-full text-xs font-bold text-zinc-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>kreo.app/nnv1234</span>
              </div>

              <div className="text-xs font-bold text-zinc-400 hidden sm:block">
                Canlı Vitrin Önizlemesi
              </div>
            </div>

            {/* Vitrin İçi Canlı Kartlar Izgarası */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Kart 1: Danışmanlık */}
              <div className="bg-zinc-50/70 p-5 rounded-2xl border border-black/[0.04] space-y-3 hover:bg-zinc-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-orange-100/80 text-[#D32F2F]">
                    Birebir Görüşme
                  </span>
                  <span className="text-xs font-black text-[#1A1A1A]">₺1.450</span>
                </div>
                <h4 className="text-sm font-black text-[#1A1A1A] leading-snug">
                  1-e-1 Bireysel Strateji & Büyüme Seansı
                </h4>
                <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                  60 dakika Google Meet canlı seansı ve kişisel aksiyon planı.
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-[#F57C00]">
                  <span>Takvimden Saat Seç</span>
                  <span>&rarr;</span>
                </div>
              </div>

              {/* Kart 2: Dijital Ürün (Notion Kit) */}
              <div className="bg-zinc-50/70 p-5 rounded-2xl border border-black/[0.04] space-y-3 hover:bg-zinc-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-blue-100/80 text-blue-700">
                    Dijital Ürün
                  </span>
                  <span className="text-xs font-black text-[#1A1A1A]">₺499</span>
                </div>
                <h4 className="text-sm font-black text-[#1A1A1A] leading-snug">
                  İçerik Üreticisi ve Dijital Gelir Kiti
                </h4>
                <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                  50+ hazır sosyal medya şablonu ve Notion işletim sistemi.
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-blue-600">
                  <span>Anında Dosya İndir</span>
                  <span>&rarr;</span>
                </div>
              </div>

              {/* Kart 3: Canlı Bildirim / Kazanç Kutusu */}
              <div className="bg-gradient-to-br from-zinc-900 to-[#1A1A1A] p-5 rounded-2xl text-white space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                      GÜNLÜK ÖZET
                    </span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-black text-white tracking-tight">₺18.450</p>
                  <p className="text-[11px] text-zinc-400 font-medium mt-0.5">Bu hafta tamamlanan satışlar</p>
                </div>

                <div className="p-2.5 bg-white/10 rounded-xl flex items-center gap-2.5 text-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <span className="text-[11px] font-medium text-zinc-300 truncate">
                    Yeni sipariş: <strong>₺499 (E-Kitap)</strong>
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Yüzen Rozet 1: Sol Üst Satış Bildirimi */}
          <div className="hidden sm:flex absolute -top-5 -left-6 bg-white/95 backdrop-blur-md border border-black/[0.08] rounded-2xl p-3.5 shadow-xl items-center gap-3 animate-float-slow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
              ₺
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-[#1A1A1A]">+₺1.450 Yeni Satış</p>
              <p className="text-[10px] text-zinc-400 font-medium">Birebir Görüşme Seansı</p>
            </div>
          </div>

          {/* Yüzen Rozet 2: Sağ Alt Otomatik Takvim */}
          <div className="hidden sm:flex absolute -bottom-5 -right-6 bg-white/95 backdrop-blur-md border border-black/[0.08] rounded-2xl p-3.5 shadow-xl items-center gap-3 animate-float-delayed">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F57C00] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-[#1A1A1A]">Otomatik Takvim Onayı</p>
              <p className="text-[10px] text-zinc-400 font-medium">Google Meet bağlantısı gönderildi</p>
            </div>
          </div>

        </motion.div>

      </div>

    </section>
  );
}
