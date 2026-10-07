"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, Lock, ExternalLink, Calendar, Star, FileText } from "lucide-react";

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

export default function CreatorStorefront({ 
  initialProducts, 
  creatorName, 
  username, 
  bio,
  avatar,
  cover
}: { 
  initialProducts: ProductProp[], 
  creatorName: string, 
  username: string, 
  bio: string,
  avatar?: string | null,
  cover?: string | null
}) {
  const products = initialProducts.map(p => ({
    ...p,
    icon: p.iconStr ? (
      <img src={p.iconStr} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    ) : (
      p.type === "Abonelik" ? <Lock className="w-8 h-8 text-zinc-300" /> : <FileText className="w-8 h-8 text-zinc-300" />
    )
  }));

  // Find the first consulting/meeting product for the Hero Card
  const consultingProduct = products.find(p => p.type.includes("Gorusme") || p.type.includes("Danismanlik") || p.type === "Birebir Görüşme");
  
  // The rest are digital products/subscriptions
  const otherProducts = products.filter(p => p.id !== consultingProduct?.id);

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-32 font-sans relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#FBC02D]/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Kapak Fotoğrafı */}
      <div className="relative h-[28vh] md:h-[35vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#FDFBF7] z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={cover || DUMMY_USER.cover} 
          alt="Cover" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-20 -mt-20 md:-mt-24">
        
        {/* Profil Header */}
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
            <img src={avatar || DUMMY_USER.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight mb-2">{creatorName}</h1>
          <p className="text-sm md:text-base font-medium text-zinc-500 mb-6 bg-white/50 backdrop-blur-md px-5 py-1.5 rounded-full border border-black/5 shadow-sm">
            kreo.com/{username}
          </p>
          
          <p className="text-zinc-600 md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
            {bio || "Buraya henüz bir biyografi eklenmedi."}
          </p>

          <div className="flex items-center justify-center gap-3">
            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white border border-black/5 rounded-full shadow-sm hover:scale-110 hover:border-black/10 transition-all duration-300 text-zinc-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white border border-black/5 rounded-full shadow-sm hover:scale-110 hover:border-black/10 transition-all duration-300 text-zinc-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white border border-black/5 rounded-full shadow-sm hover:scale-110 hover:border-black/10 transition-all duration-300 text-zinc-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </motion.div>

        {/* Birebir Görüşme (Premium Hero Card) */}
        {consultingProduct && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <div className="group relative bg-white border border-black/5 rounded-[2.5rem] p-1 overflow-hidden shadow-xl shadow-black/5 hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D32F2F]/10 via-transparent to-[#FBC02D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative bg-white border border-black/5 rounded-[2.25rem] p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0 relative">
                  <div className="absolute inset-0 border-2 border-orange-200/50 rounded-full animate-ping opacity-20" />
                  <Calendar className="w-10 h-10 md:w-14 md:h-14 text-orange-500" />
                </div>
                <div className="flex-1 text-center md:text-left flex flex-col h-full justify-center">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-100/50 text-orange-700 text-xs font-bold mb-4 uppercase tracking-wider mx-auto md:mx-0">
                    <Star className="w-3.5 h-3.5 fill-current" /> En Popüler Hizmet
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-3 leading-tight">{consultingProduct.title}</h3>
                  <p className="text-zinc-500 text-sm md:text-base mb-8 max-w-lg">
                    {consultingProduct.description || "Birebir görüşme ayarlayarak doğrudan iletişime geçin."}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
                    <span className="text-3xl md:text-4xl font-black text-[#1A1A1A] tracking-tight">{consultingProduct.price}</span>
                    <Link 
                      href={`/checkout/${consultingProduct.id}`}
                      className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] text-white text-sm md:text-base font-bold rounded-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/20"
                    >
                      Hemen Randevu Al <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Diger Urunler (Premium Grid) */}
        {otherProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl font-black text-[#1A1A1A] mb-8 text-center md:text-left">Dijital Ürünler & Icerikler</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherProducts.map((product) => (
                <Link 
                  href={`/checkout/${product.id}`}
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
                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 leading-tight group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-zinc-500 line-clamp-3 mb-6">
                          {product.description}
                        </p>
                      )}
                      
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
                        <span className="text-xl font-black text-[#1A1A1A]">{product.price}</span>
                        <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-[#1A1A1A] transition-colors shadow-sm">
                          <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
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
        
        {/* Footer Marka Imzasi */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-24 flex justify-center"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-[#1A1A1A] transition-colors bg-white/50 px-6 py-3 rounded-full border border-black/5 backdrop-blur-sm">
            <span>Powered by</span>
            <span className="text-[#1A1A1A] tracking-tighter text-lg">Kreo<span className="text-[#D32F2F]">.</span></span>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
