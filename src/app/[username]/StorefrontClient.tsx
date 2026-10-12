"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Lock, ExternalLink, Calendar, Star, FileText } from "lucide-react";

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

  // Sosyal bağlantılar (Gerçek SVG logoları)
  const socialLinksArr = [
    {
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
      url: socialTwitter,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      url: socialYoutube,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      )
    },
    {
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
      url: socialTiktok,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    },
    {
      url: socialWebsite,
      icon: <ExternalLink className="w-5 h-5" />
    },
  ].filter(l => Boolean(l.url && l.url.trim()));

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-32 font-sans relative overflow-hidden">
      {/* Vurgu rengine duyarlı arka plan ambiyansı */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] blur-[140px] rounded-full pointer-events-none -z-10 transition-colors duration-700" 
        style={{ background: `radial-gradient(circle, ${activeColor}20 0%, transparent 70%)` }}
      />

      {/* Duyuru Rozeti */}
      {announcement && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-white text-center py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 relative z-30 shadow-sm"
          style={{ backgroundColor: activeColor }}
        >
          <Star className="w-4 h-4 fill-current text-white/90" />
          <span>{announcement}</span>
        </motion.div>
      )}

      {/* Kapak Fotoğrafı */}
      <div className="relative h-[28vh] md:h-[35vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#FDFBF7] z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={cover || DUMMY_USER.cover} 
          alt="Kapak Fotoğrafı" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-20 -mt-20 md:-mt-24">
        
        {/* Profil Başlığı */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#FDFBF7] shadow-[0_0_40px_rgba(0,0,0,0.1)] overflow-hidden bg-white mb-6 relative cursor-pointer"
          >
            <img src={avatar || DUMMY_USER.avatar} alt="Profil Fotoğrafı" className="w-full h-full object-cover" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight mb-2">{creatorName}</h1>
          <p 
            className="text-sm md:text-base font-semibold mb-6 px-5 py-1.5 rounded-full border shadow-sm backdrop-blur-md"
            style={{ 
              borderColor: `${activeColor}25`, 
              backgroundColor: `${activeColor}08`, 
              color: activeColor 
            }}
          >
            kreo.app/{username}
          </p>
          
          <p className="text-zinc-600 md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
            {bio || "Buraya henüz bir biyografi eklenmedi."}
          </p>

          {/* Sosyal Medya İkonları */}
          {socialLinksArr.length > 0 && (
            <div className="flex items-center justify-center gap-3">
              {socialLinksArr.map((link, idx) => (
                <a 
                  key={idx} 
                  href={formatUrl(link.url)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 flex items-center justify-center bg-white border border-black/5 rounded-full shadow-sm hover:scale-110 hover:border-black/10 transition-all duration-300 text-zinc-700"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Öne Çıkan Ürün / Birebir Görüşme Hero Kartı */}
        {consultingProduct && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <div className="group relative bg-white border border-black/5 rounded-[2.5rem] p-1 overflow-hidden shadow-xl shadow-black/5 hover:shadow-2xl transition-all duration-500">
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                style={{ background: `linear-gradient(135deg, ${activeColor}15, transparent, ${activeColor}08)` }}
              />
              <div className="relative bg-white border border-black/5 rounded-[2.25rem] p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden border border-black/5"
                  style={{ backgroundColor: `${activeColor}10` }}
                >
                  {consultingProduct.iconStr ? (
                    <img src={consultingProduct.iconStr} alt={consultingProduct.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <>
                      <div className="absolute inset-0 border-2 rounded-full animate-ping opacity-20" style={{ borderColor: activeColor }} />
                      <Calendar className="w-10 h-10 md:w-14 md:h-14 relative z-10" style={{ color: activeColor }} />
                    </>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left flex flex-col h-full justify-center">
                  <div 
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-wider mx-auto md:mx-0 border"
                    style={{ 
                      backgroundColor: `${activeColor}12`, 
                      color: activeColor, 
                      borderColor: `${activeColor}25` 
                    }}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" /> Öne Çıkan Hizmet
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-3 leading-tight">{consultingProduct.title}</h3>
                  <p className="text-zinc-500 text-sm md:text-base mb-8 max-w-lg">
                    {consultingProduct.description || "Birebir görüşme ayarlayarak doğrudan iletişime geçin."}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
                    <span className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: activeColor }}>
                      {consultingProduct.price}
                    </span>
                    <Link 
                      href={`/${username}/${consultingProduct.id}`}
                      className="w-full sm:w-auto px-8 py-4 text-white text-sm md:text-base font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
                      style={{ 
                        backgroundColor: activeColor,
                        boxShadow: `0 8px 24px ${activeColor}35`
                      }}
                    >
                      Detayları Gör & Randevu Al <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Diğer Ürünler (Premium Izgara) */}
        {otherProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl font-black text-[#1A1A1A] mb-8 text-center md:text-left">
              Dijital Ürünler & İçerikler
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherProducts.map((product) => (
                <Link 
                  href={`/${username}/${product.id}`}
                  key={product.id}
                >
                  <motion.div 
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group flex flex-col bg-white border border-black/5 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-black/10 transition-all duration-500 overflow-hidden h-full"
                  >
                    <div className="relative w-full aspect-[4/3] bg-zinc-50 overflow-hidden flex items-center justify-center">
                      {product.icon}
                      <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                        {product.type}
                      </div>
                    </div>
                    
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <h3 
                        className="text-xl font-bold text-[#1A1A1A] mb-3 leading-tight transition-colors line-clamp-2"
                        style={{ color: undefined }}
                      >
                        {product.title}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-zinc-500 line-clamp-3 mb-6">
                          {product.description}
                        </p>
                      )}
                      
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
                        <span className="text-xl font-black" style={{ color: activeColor }}>
                          {product.price}
                        </span>
                        <div 
                          className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center transition-all shadow-sm group-hover:scale-105"
                          style={{ backgroundColor: undefined }}
                        >
                          <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-[#1A1A1A] transition-colors" />
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
          <div className="bg-white p-12 rounded-[3rem] border border-black/5 text-center shadow-sm">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-zinc-300" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Henüz İçerik Yok</h3>
            <p className="text-zinc-500 max-w-sm mx-auto">Satıcı henüz bir ürün veya hizmet yayınlamadı. Lütfen daha sonra tekrar kontrol edin.</p>
          </div>
        )}
        
        {/* Footer Marka İmzası */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-24 flex justify-center"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-[#1A1A1A] transition-colors bg-white/50 px-6 py-3 rounded-full border border-black/5 backdrop-blur-sm">
            <span>Powered by</span>
            <span className="text-[#1A1A1A] tracking-tighter text-lg">Kreo<span style={{ color: activeColor }}>.</span></span>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
