"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, Lock, ExternalLink, Calendar, Star, FileText, 
  Sparkles, CheckCircle2, ShieldCheck, Heart, Share2, Copy, Check 
} from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { useState } from "react";

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

const DUMMY_USER = {
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
  cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
};

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
  themeColor = "#1A1A1A",
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
  const activeColor = themeColor || "#1A1A1A";
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const products = initialProducts.map(p => ({
    ...p,
    icon: p.iconStr ? (
      <img src={p.iconStr} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    ) : (
      p.type === "Abonelik" ? <Lock className="w-8 h-8 text-zinc-300" /> : <FileText className="w-8 h-8 text-zinc-300" />
    )
  }));

  // Öne çıkarılan ürün veya danışmanlık ürünü
  const consultingProduct = featuredProductId 
    ? products.find(p => p.id === featuredProductId)
    : products.find(p => p.type.includes("Gorusme") || p.type.includes("Danismanlik") || p.type === "Birebir Görüşme" || p.type === "Birebir Gorusme");
  
  const otherProducts = products.filter(p => p.id !== consultingProduct?.id);

  // Sosyal bağlantılar
  const socialLinksArr = [
    {
      name: "Instagram",
      url: socialInstagram,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: "YouTube",
      url: socialYoutube,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: socialLinkedin,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      name: "TikTok",
      url: socialTiktok,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    },
    {
      name: "Web Sitesi",
      url: socialWebsite,
      icon: <ExternalLink className="w-5 h-5" />
    },
  ].filter(l => Boolean(l.url && l.url.trim()));

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-32 font-sans relative overflow-hidden selection:bg-[#D32F2F]/20 selection:text-[#D32F2F]">
      
      {/* Dynamic Ambient Background Glows */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] blur-[150px] rounded-full pointer-events-none -z-10 opacity-70 transition-all duration-1000" 
        style={{ 
          background: `radial-gradient(circle at 50% 30%, ${activeColor}22 0%, rgba(245, 124, 0, 0.08) 40%, transparent 75%)` 
        }}
      />
      <div 
        className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] blur-[160px] rounded-full pointer-events-none -z-10 opacity-40" 
        style={{ background: `radial-gradient(circle, ${activeColor}15 0%, transparent 70%)` }}
      />

      {/* Üst Duyuru Bandı */}
      {announcement && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-white text-center py-3 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 relative z-40 shadow-sm"
          style={{ backgroundColor: activeColor }}
        >
          <Sparkles className="w-4 h-4 fill-current text-white/90 animate-pulse" />
          <span>{announcement}</span>
        </motion.div>
      )}

      {/* Hero Header & Kapak */}
      <div className="relative h-[32vh] md:h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-[#FDFBF7] z-10" />
        <motion.img 
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          src={cover || DUMMY_USER.cover} 
          alt="Kapak Fotoğrafı" 
          className="w-full h-full object-cover object-center filter brightness-[0.98]"
        />

        {/* Sağ Üst: Paylaş Butonu */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-[#1A1A1A] backdrop-blur-md rounded-full text-xs font-black shadow-lg border border-black/5 transition-all hover:scale-105 active:scale-95"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-zinc-700" />
                <span>Profili Paylaş</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-20 -mt-24 md:-mt-28">
        
        {/* Profil ve İçerik Kartı (Hero Alanı) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16"
        >
          {/* Avatar with Glow Halo */}
          <div className="relative mb-6">
            <div 
              className="absolute inset-0 rounded-full blur-xl opacity-40 transition-opacity"
              style={{ backgroundColor: activeColor }}
            />
            <motion.div 
              whileHover={{ scale: 1.04 }}
              className="w-36 h-36 md:w-44 md:h-44 rounded-full border-[5px] border-[#FDFBF7] shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden bg-white relative cursor-pointer"
            >
              <img src={avatar || DUMMY_USER.avatar} alt={creatorName} className="w-full h-full object-cover" />
            </motion.div>
            
            {/* Doğrulanmış Rozet */}
            <div 
              className="absolute bottom-2 right-2 p-1.5 rounded-full text-white shadow-md border-2 border-white"
              style={{ backgroundColor: activeColor }}
              title="Doğrulanmış Kreo Üreticisi"
            >
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          {/* İsim & Hibrit Başlık */}
          <h1 className="text-4xl md:text-6xl font-black text-[#1A1A1A] tracking-tight mb-3">
            {creatorName}
          </h1>

          {/* Mağaza Rozeti */}
          <div className="flex items-center gap-2 mb-6">
            <span 
              className="text-xs md:text-sm font-bold px-4 py-1.5 rounded-full border shadow-sm backdrop-blur-md flex items-center gap-1.5"
              style={{ 
                borderColor: `${activeColor}30`, 
                backgroundColor: `${activeColor}0D`, 
                color: activeColor 
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              kreo.app/{username}
            </span>
            <span className="text-xs font-bold text-zinc-400 bg-black/5 px-3 py-1.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
              Güvenli Satıcı
            </span>
          </div>
          
          {/* Biyografi */}
          <p className="text-zinc-600 md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
            {bio || "Dijital içerikler, online eğitimler ve danışmanlık seanslarıma buradan ulaşabilirsiniz."}
          </p>

          {/* Sosyal Medya İkonları */}
          {socialLinksArr.length > 0 && (
            <div className="flex items-center justify-center flex-wrap gap-3">
              {socialLinksArr.map((link, idx) => (
                <a 
                  key={idx} 
                  href={formatUrl(link.url)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title={link.name}
                  className="w-12 h-12 flex items-center justify-center bg-white border border-black/5 rounded-2xl shadow-sm hover:scale-110 hover:shadow-md hover:border-black/10 transition-all duration-300 text-zinc-700 hover:text-[#1A1A1A]"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* ÖNE ÇIKAN HİZMET / BİREBİR SEANS (Hero Spotlight Banner) */}
        {consultingProduct && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div className="relative bg-white border border-black/5 rounded-[2.5rem] p-2 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
              {/* Arka Plan Ambient Gradient */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ background: `linear-gradient(135deg, ${activeColor}, transparent 60%, ${activeColor})` }}
              />

              <div className="relative bg-white border border-black/5 rounded-[2.25rem] p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                <div 
                  className="w-28 h-28 md:w-36 md:h-36 rounded-3xl flex items-center justify-center flex-shrink-0 relative overflow-hidden border border-black/5 shadow-inner"
                  style={{ backgroundColor: `${activeColor}10` }}
                >
                  {consultingProduct.iconStr ? (
                    <img src={consultingProduct.iconStr} alt={consultingProduct.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <>
                      <div className="absolute inset-0 border-2 rounded-3xl animate-ping opacity-15" style={{ borderColor: activeColor }} />
                      <Calendar className="w-12 h-12 md:w-16 md:h-16 relative z-10" style={{ color: activeColor }} />
                    </>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left flex flex-col h-full justify-center">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                    <span 
                      className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs"
                      style={{ 
                        backgroundColor: `${activeColor}15`, 
                        color: activeColor, 
                        borderColor: `${activeColor}30` 
                      }}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" /> Öne Çıkan Fırsat
                    </span>
                    <span className="text-xs font-bold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
                      Hızlı Teslimat
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-black text-[#1A1A1A] mb-3 leading-tight tracking-tight">
                    {consultingProduct.title}
                  </h3>
                  
                  <p className="text-zinc-500 text-sm md:text-base mb-8 max-w-xl leading-relaxed">
                    {consultingProduct.description || "Görüşme veya danışmanlık ayarlayarak doğrudan 1-e-1 seans alabilir ya da dijital ürününüze hemen erişebilirsiniz."}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
                    <div>
                      <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Ücret</span>
                      <span className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: activeColor }}>
                        {consultingProduct.price}
                      </span>
                    </div>

                    <Link 
                      href={`/${username}/${consultingProduct.id}`}
                      className="w-full sm:w-auto px-8 py-4 text-white text-base font-black rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg"
                      style={{ 
                        backgroundColor: activeColor,
                        boxShadow: `0 8px 25px ${activeColor}40`
                      }}
                    >
                      Hemen Başla & Satın Al <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TÜM DİJİTAL ÜRÜNLER (Modern Kart Izgarası) */}
        {otherProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-black tracking-widest text-zinc-400 uppercase">Katalog</span>
                <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] tracking-tight mt-1">
                  Tüm Ürünler & İçerikler
                </h2>
              </div>
              <p className="text-xs font-bold text-zinc-500 bg-white px-4 py-2 rounded-xl border border-black/5 shadow-xs">
                {otherProducts.length} Dijital Ürün
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherProducts.map((product) => (
                <Link 
                  href={`/${username}/${product.id}`}
                  key={product.id}
                  className="group block"
                >
                  <motion.div 
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col bg-white border border-black/5 rounded-[2rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-black/10 transition-all duration-500 overflow-hidden h-full"
                  >
                    {/* Görsel / İkon Alanı */}
                    <div className="relative w-full aspect-[16/10] bg-zinc-50 overflow-hidden flex items-center justify-center border-b border-black/5">
                      {product.icon}
                      
                      {/* Ürün Türü Rozeti */}
                      <div className="absolute top-4 left-4 inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-sm text-xs font-black uppercase tracking-wider text-[#1A1A1A] border border-black/5">
                        {product.type}
                      </div>
                    </div>
                    
                    {/* Ürün Bilgisi */}
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <h3 className="text-xl font-black text-[#1A1A1A] mb-2 leading-tight group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                      
                      {product.description && (
                        <p className="text-sm text-zinc-500 line-clamp-2 mb-6 font-medium">
                          {product.description}
                        </p>
                      )}
                      
                      {/* Fiyat ve Buton */}
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
                        <div>
                          <span className="text-[10px] font-bold text-zinc-400 block uppercase">Fiyat</span>
                          <span className="text-2xl font-black" style={{ color: activeColor }}>
                            {product.price}
                          </span>
                        </div>
                        
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm group-hover:scale-105 text-white"
                          style={{ backgroundColor: activeColor }}
                        >
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
        
        {products.length === 0 && (
          <div className="bg-white p-16 rounded-[3rem] border border-black/5 text-center shadow-sm">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-black/5">
              <Lock className="w-8 h-8 text-zinc-300" />
            </div>
            <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">Henüz Ürün Yayınlanmadı</h3>
            <p className="text-zinc-500 max-w-sm mx-auto font-medium">
              Bu üretici henüz vitrinine bir ürün veya danışmanlık eklemedi.
            </p>
          </div>
        )}
        
        {/* Güven Rozetleri Alt Bandı */}
        <div className="mt-20 p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-black/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#D32F2F] mb-2" />
            <h4 className="text-sm font-black text-[#1A1A1A]">256-Bit SSL & iyzico Güvencesi</h4>
            <p className="text-xs text-zinc-500 mt-1">Tüm ödemeleriniz BDDK lisanslı banka koruması altındadır.</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-amber-500 mb-2" />
            <h4 className="text-sm font-black text-[#1A1A1A]">Anında Dijital Teslimat</h4>
            <p className="text-xs text-zinc-500 mt-1">Ödeme tamamlandığı an indirme linki ekranda ve mailinizdedir.</p>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="w-6 h-6 text-rose-500 mb-2" />
            <h4 className="text-sm font-black text-[#1A1A1A]">Doğrudan Üreticiyi Destekleyin</h4>
            <p className="text-xs text-zinc-500 mt-1">Ödemeniz doğrudan bağımsız içerik üreticisine aktarılır.</p>
          </div>
        </div>

        {/* Footer Kreo İmzası */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-col items-center justify-center gap-3"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-[#1A1A1A] transition-colors bg-white px-6 py-3 rounded-full border border-black/5 shadow-xs hover:shadow-md">
            <span>Powered by</span>
            <span className="text-[#1A1A1A] tracking-tighter text-lg font-black">Kreo<span style={{ color: activeColor }}>.</span></span>
          </Link>
          <p className="text-xs font-medium text-zinc-400">
            Kendi mağazanızı 2 dakikada ücretsiz açın.
          </p>
        </motion.div>

      </div>
    </main>
  );
}
