"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, Lock, ExternalLink, Calendar, Star, FileText, 
  Sparkles, CheckCircle2, ShieldCheck, Heart, Share2, Check, 
  Zap, Award, Play, BookOpen, Clock, Download, ChevronRight,
  TrendingUp, MessageCircle, Layers, ArrowUpRight, Compass, Flame
} from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { useState, useEffect } from "react";
import MouseGlow from "@/components/MouseGlow";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  style: "italic",
  weight: "700" 
});

type ProductProp = {
  id: string;
  title: string;
  description?: string;
  price: string;
  type: string;
  iconStr?: string | null;
};

// Şık, karizmatik ve nötr tech/abstract profil görseli
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300";
const NEUTRAL_AVATAR = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"; // Karizmatik erkek portresi

const formatUrl = (url?: string | null) => {
  if (!url) return "#";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
};

export default function CreatorStorefront({ 
  initialProducts, 
  creatorName, 
  username, 
  bio,
  avatar,
  cover,
  themeColor = "#D32F2F",
  announcement,
  featuredProductId,
  socialInstagram,
  socialTwitter,
  socialYoutube,
  socialLinkedin,
  socialTiktok,
  socialWebsite,
}: { 
  initialProducts: ProductProp[], 
  creatorName: string, 
  username: string, 
  bio: string,
  avatar?: string | null,
  cover?: string | null,
  themeColor?: string | null,
  announcement?: string | null,
  featuredProductId?: string | null,
  socialInstagram?: string | null,
  socialTwitter?: string | null,
  socialYoutube?: string | null,
  socialLinkedin?: string | null,
  socialTiktok?: string | null,
  socialWebsite?: string | null,
}) {
  const activeColor = themeColor || "#D32F2F";
  const [copiedLink, setCopiedLink] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // İsim ayıklama: Son kelimeyi (örn: Kızılırmak) Playfair Italic & Gradient ile vurgulayacağız
  const nameParts = (creatorName || "Nuh Veysel Kızılırmak").trim().split(" ");
  const firstName = nameParts.slice(0, -1).join(" ") || nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  // Güvenli profil görseli (belirtilen kadın görselini nötr erkek/profesyonel portre ile değiştiriyoruz)
  const displayAvatar = avatar && !avatar.includes("53994a69daeb") 
    ? avatar 
    : NEUTRAL_AVATAR;

  const hasProducts = initialProducts.length > 0;
  
  // Vitrin asla boş kalmasın, son derece lüks ve hareketli içerikler
  const products = hasProducts ? initialProducts : [
    {
      id: "prod-1",
      title: "1-e-1 Birebir Strateji & Büyüme Seansı",
      description: "60 dakikalık canlı video görüşmesiyle içerik üretimi, gelir modelleri ve büyüme stratejinizi sıfırdan planlıyoruz.",
      price: "₺1.490",
      type: "Birebir Görüşme",
      iconStr: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "prod-2",
      title: "Dijital Gelir & İçerik Üreticisi Master Rehberi",
      description: "Sosyal medyada organik kitle büyütme, e-posta pazarlaması ve dijital ürün satışının tüm sırları. (PDF + Not Şablonları)",
      price: "₺349",
      type: "E-Kitap & Rehber",
      iconStr: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "prod-3",
      title: "Özel Üretici Kulübü & Haftalık Canlı Yayınlar",
      description: "Her hafta düzenli soru-cevap seansları, özel Discord topluluğu ve networking imkanı.",
      price: "₺199/ay",
      type: "Topluluk & Abonelik",
      iconStr: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const spotlightProduct = featuredProductId 
    ? products.find(p => p.id === featuredProductId) || products[0]
    : products[0];

  const otherProducts = products.filter(p => p.id !== spotlightProduct?.id);

  // Sosyal Medya İkonları
  const socialLinks = [
    {
      name: "Instagram",
      url: socialInstagram || "https://instagram.com",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: "X (Twitter)",
      url: socialTwitter,
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: "YouTube",
      url: socialYoutube,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: socialLinkedin,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      name: "Web Sitesi",
      url: socialWebsite,
      icon: <ExternalLink className="w-4 h-4" />
    }
  ].filter(l => Boolean(l.url && l.url.trim()));

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans relative overflow-hidden selection:bg-[#D32F2F]/20 selection:text-[#D32F2F]">
      
      {/* 0. İNTERAKTİF MOUSE TAKİP EDEN PARILTILI IŞIK (Ana Sayfa Efekti) */}
      <MouseGlow />

      {/* CSS Keyframe Animasyonları */}
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 70s linear infinite; }
        @keyframes spin-slow-reverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 60s linear infinite; }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: float-slow 4s ease-in-out infinite; }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.08); } }
        .animate-glow { animation: pulse-glow 3s ease-in-out infinite; }
        @keyframes shimmer { 100% { transform: translateX(300%) skewX(-12deg); } }
      `}</style>

      {/* 1. ARKA PLAN DÖNEN 3D GALAKSİ / MESH KATMANI */}
      {isClient && (
        <div 
          className="absolute inset-0 w-full h-[1100px] pointer-events-none -z-10 overflow-hidden" 
          style={{ 
            perspective: "1200px", 
            transform: "perspective(1200px) rotateX(15deg)", 
            transformOrigin: "center top",
            WebkitMaskImage: "radial-gradient(circle at 50% 15%, black 20%, transparent 75%)",
            maskImage: "radial-gradient(circle at 50% 15%, black 20%, transparent 75%)"
          }}
        >
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-[25%] left-1/2" style={{ width: "1800px", height: "1800px", transform: "translate(-50%, -50%) rotate(279deg)", zIndex: 0 }}>
              <img src="https://cdn.21st.dev/assets/mirror/c6/c66b4f0c389b961a3676312892ca1387d7f8bd1973f44a33c7d47840d297633f.png" alt="" className="w-full h-full object-cover opacity-40" />
            </div>
          </div>
          <div className="absolute inset-0 animate-spin-slow-reverse">
            <div className="absolute top-[25%] left-1/2" style={{ width: "1100px", height: "1100px", transform: "translate(-50%, -50%) rotate(304deg)", zIndex: 1 }}>
              <img src="https://cdn.21st.dev/assets/mirror/75/75f75d84f07a61893dc2a16aad0c781c32b9e758c8f0adda2a8b252c431fdd82.png" alt="" className="w-full h-full object-cover opacity-50" />
            </div>
          </div>
        </div>
      )}

      {/* 2. DİNAMİK AMBIENT IŞIK HAVUZU */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] blur-[150px] rounded-full pointer-events-none -z-20 opacity-80"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${activeColor}30 0%, rgba(245, 124, 0, 0.12) 45%, transparent 75%)`
        }}
      />

      {/* 3. ÜST SABİT FLOATING GLASS NAVBAR */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-black/5 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white text-xs font-black group-hover:scale-105 transition-transform shadow-xs">
                K
              </div>
              <span className="text-sm font-black tracking-tight text-[#1A1A1A]">
                Kreo<span style={{ color: activeColor }}>.</span>
              </span>
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-xs font-bold text-zinc-500">
              {username}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-black/10 hover:border-black/20 text-xs font-bold text-[#1A1A1A] rounded-full shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5 text-zinc-600" />}
              <span>{copiedLink ? "Kopyalandı!" : "Profili Paylaş"}</span>
            </button>

            <a
              href="#katalog"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 text-white text-xs font-black rounded-full shadow-md hover:scale-105 transition-all"
              style={{ backgroundColor: activeColor }}
            >
              İçerikleri Keşfet
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* 4. HERO SECTION (Büyük Hibrit Başlık + Efektli Profil) */}
      <section className="relative pt-12 pb-20 px-6 max-w-5xl mx-auto text-center">
        
        {/* Parıldayan Shiny Pill Rozet */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/10 bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] animate-float">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs font-black text-[#1A1A1A] tracking-wider uppercase">
              {announcement || "Onaylı İçerik Üreticisi Vitrini"}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
        </motion.div>

        {/* Profil Fotoğrafı - Hareketli Halo Işık Efekti */}
        <div className="relative inline-block mb-8">
          <div 
            className="absolute inset-0 rounded-full blur-2xl opacity-70 animate-glow"
            style={{ backgroundColor: activeColor }}
          />
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[5px] border-white shadow-[0_15px_50px_rgba(0,0,0,0.18)] overflow-hidden bg-white relative mx-auto cursor-pointer"
          >
            <img 
              src={displayAvatar} 
              alt={creatorName} 
              className="w-full h-full object-cover" 
            />
          </motion.div>
          <div 
            className="absolute bottom-1 right-1 p-2 rounded-full text-white shadow-xl border-2 border-white"
            style={{ backgroundColor: activeColor }}
            title="Doğrulanmış Üretici Rozeti"
          >
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* BÜYÜK HİBRİT BAŞLIK (İsmin son kelimesi Playfair Italic & Gradient) */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1A1A1A] leading-[1.1] max-w-4xl mx-auto"
        >
          {firstName}{" "}
          {lastName && (
            <span 
              className={`${playfair.className} text-transparent bg-clip-text bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#FBC02D] drop-shadow-[0_0_25px_rgba(211,47,47,0.5)] px-1`}
            >
              {lastName}
            </span>
          )}
        </motion.h1>

        {/* Biyografi */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          {bio || "Geliştirdiğim dijital rehberler, özel şablonlar ve 1-e-1 strateji seanslarıma buradan anında erişebilirsiniz."}
        </motion.p>

        {/* Sosyal Medya İkonları */}
        {socialLinks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center justify-center flex-wrap gap-3"
          >
            {socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={formatUrl(s.url)}
                target="_blank"
                rel="noreferrer"
                title={s.name}
                className="w-11 h-11 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-zinc-600 hover:text-[#1A1A1A] hover:border-black/20 hover:scale-110 shadow-xs hover:shadow-md transition-all"
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        )}

        {/* 3'lü Hızlı Rozet Bandı */}
        <div className="mt-12 inline-flex items-center gap-6 px-7 py-3 bg-white/80 backdrop-blur-md rounded-full border border-black/5 shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-black text-zinc-700">Onaylı Satıcı</span>
          </div>
          <div className="w-1 h-1 bg-zinc-300 rounded-full" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 fill-current" />
            <span className="text-xs font-black text-zinc-700">Anında Teslimat</span>
          </div>
          <div className="w-1 h-1 bg-zinc-300 rounded-full" />
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-rose-500 fill-current" />
            <span className="text-xs font-black text-zinc-700">256-Bit iyzico Koruması</span>
          </div>
        </div>
      </section>

      {/* 5. ÖNE ÇIKAN BENTO SPOTLIGHT KART (Hareketli Canlı Efektler) */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="text-left mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-black tracking-widest text-[#D32F2F] uppercase flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-current" /> ÖNE ÇIKAN FIRSAT
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tight mt-1">
              En Çok Tercih Edilen Seans & İçerik
            </h2>
          </div>
        </div>

        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white border border-black/[0.08] rounded-[2.5rem] p-3 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:border-black/15 transition-all duration-500 overflow-hidden"
        >
          <div className="p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative z-10">
            {/* Görsel Alanı */}
            <div className="w-full lg:w-5/12 aspect-[4/3] rounded-3xl overflow-hidden border border-black/5 bg-zinc-100 relative group-hover:scale-[1.02] transition-transform duration-500">
              <img 
                src={spotlightProduct.iconStr || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"} 
                alt={spotlightProduct.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black/85 backdrop-blur-md rounded-full text-white text-xs font-black uppercase tracking-wider shadow-md">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-current animate-spin-slow" />
                Spotlight
              </div>
            </div>

            {/* İçerik & Fiyat & Satın Alma */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center text-left">
              <div className="flex items-center gap-2 mb-3">
                <span 
                  className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-2xs"
                  style={{ 
                    backgroundColor: `${activeColor}15`, 
                    color: activeColor, 
                    borderColor: `${activeColor}30` 
                  }}
                >
                  {spotlightProduct.type}
                </span>
                <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Sınırlı Kontenjan
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-[#1A1A1A] leading-tight mb-4 tracking-tight">
                {spotlightProduct.title}
              </h3>

              <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
                {spotlightProduct.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-black/5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">TUTAR</span>
                  <span className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: activeColor }}>
                    {spotlightProduct.price}
                  </span>
                </div>

                <Link
                  href={hasProducts ? `/${username}/${spotlightProduct.id}` : `/dashboard/products/new`}
                  className="relative group/btn overflow-hidden px-8 py-3.5 rounded-full text-white text-sm md:text-base font-bold flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_25px_rgba(245,124,0,0.35)] hover:shadow-[0_8px_35px_rgba(245,124,0,0.5)] bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100]"
                >
                  {/* Canlı Parlama (Shimmer) Işığı */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {hasProducts ? "Hemen İncele & Satın Al" : "Kendi Ürününü Ekle"}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. TÜM DİJİTAL İÇERİKLER (Lüks 2 Sütunlu Kartlar) */}
      <section id="katalog" className="max-w-5xl mx-auto px-6 mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <span className="text-xs font-black tracking-widest text-zinc-400 uppercase">
              TÜM İÇERİKLER
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] tracking-tight mt-1">
              Kütüphane & Dijital Ürünler
            </h2>
          </div>
          <p className="text-xs font-black text-zinc-600 bg-white px-4 py-2 rounded-xl border border-black/5 shadow-xs">
            {otherProducts.length + 1} İçerik Mevcut
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProducts.map((p) => (
            <Link
              key={p.id}
              href={hasProducts ? `/${username}/${p.id}` : `/dashboard/products/new`}
              className="group block"
            >
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-black/5 hover:border-black/15 rounded-[2.25rem] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all duration-400 flex flex-col h-full overflow-hidden"
              >
                {/* Kart Görseli */}
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-zinc-100 border border-black/5 relative">
                  <img 
                    src={p.iconStr || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider text-[#1A1A1A] shadow-xs">
                    {p.type}
                  </div>
                </div>

                {/* Başlık & Açıklama */}
                <h3 className="text-xl font-black text-[#1A1A1A] mb-2 leading-tight group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-6 line-clamp-3">
                  {p.description}
                </p>

                {/* Alt Kısım: Fiyat & Ok Butonu */}
                <div className="mt-auto flex items-center justify-between pt-5 border-t border-black/5">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 block uppercase">FİYAT</span>
                    <span className="text-2xl font-black" style={{ color: activeColor }}>
                      {p.price}
                    </span>
                  </div>

                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 group-hover:rotate-45 transition-all"
                    style={{ backgroundColor: activeColor }}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. GÜVEN VE DESTEK ALANI (Lüks Garanti Mimarisi) */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-12 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#D32F2F] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-[#1A1A1A]">256-Bit SSL Koruma</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Tüm banka ve kredi kartı ödemeleriniz BDDK lisanslı iyzico altyapısıyla şifrelenir.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-[#1A1A1A]">Anında Teslimat</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Satın alma bittiği anda dijital dosya veya takvim randevusu ekranınıza anında yansır.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-[#1A1A1A]">Doğrudan Üretici Desteği</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Ödemeniz doğrudan bağımsız içerik üreticisine aktarılır ve tam destek sağlanır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. KREO POWERED FOOTER */}
      <footer className="text-center pt-8 border-t border-black/5 max-w-5xl mx-auto px-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-black/5 hover:border-black/15 rounded-full text-xs font-bold text-zinc-600 shadow-xs hover:shadow-sm transition-all"
        >
          <span>Kendi Mağazanı Aç</span>
          <span className="font-black text-[#1A1A1A]">Kreo<span style={{ color: activeColor }}>.</span></span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
        </Link>
        <p className="text-[11px] text-zinc-400 font-medium mt-3">
          © {new Date().getFullYear()} Kreo. Tüm hakları saklıdır.
        </p>
      </footer>

    </main>
  );
}
