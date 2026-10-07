"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, ExternalLink, Lock, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

// Geçici (Dummy) Veri
const DUMMY_USER = {
  name: "Nuh Veysel",
  username: "nuhveysel",
  bio: "Dijital ürün tasarımcısı ve geliştirici. UI/UX ipuçları ve premium şablonlar paylaşıyorum.",
  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&auto=format&fit=crop",
  cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop", // Abstract mesh
};

type ProductProp = {
  id: string;
  title: string;
  price: string;
  type: string;
  iconStr?: string | null;
};

export default function CreatorStorefront({ 
  initialProducts,
  creatorName = "Nuh Veysel",
  username = "nuhveysel",
  bio = "Dijital Urun tasarimcisi ve gelistirici.",
  avatar,
  cover
}: { 
  initialProducts: ProductProp[];
  creatorName?: string;
  username?: string;
  bio?: string;
  avatar?: string | null;
  cover?: string | null;
}) {
  const products = initialProducts.map(p => ({
    ...p,
    icon: p.iconStr ? <img src={p.iconStr} alt={p.title} className="w-full h-full object-cover rounded-xl" /> : (p.type === "Abonelik" ? <Lock className="w-5 h-5 text-zinc-500" /> : <ExternalLink className="w-5 h-5 text-zinc-500" />)
  }));
  return (
    <main className="min-h-screen bg-[var(--bg)] pb-24">
      {/* Kapak Fotoğrafı */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img 
          src={cover || DUMMY_USER.cover} 
          alt="Cover" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-20 -mt-16">
        
        {/* Profil Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-32 h-32 rounded-full border-4 border-[var(--bg)] shadow-xl overflow-hidden bg-white mb-4">
            <img src={avatar || DUMMY_USER.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-1">{creatorName}</h1>
          <p className="text-sm font-medium text-zinc-500 mb-4">kreo.com/{username}</p>
          
          <p className="text-zinc-700 leading-relaxed max-w-md mx-auto mb-6">
            {bio}
          </p>

          <div className="flex items-center gap-3 mb-10">
            <a href="#" className="p-3 bg-white border border-black/5 rounded-full shadow-sm hover:scale-110 transition-transform text-zinc-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="p-3 bg-white border border-black/5 rounded-full shadow-sm hover:scale-110 transition-transform text-zinc-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="p-3 bg-white border border-black/5 rounded-full shadow-sm hover:scale-110 transition-transform text-zinc-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </motion.div>

        {/* Birebir Görüşme (Hero Card) - Sadece Danışmanlık Ürünü Varsa veya Nuh Veysel İse Göster */}
        {(products.some(p => p.type.includes("Görüşme") || p.type.includes("Danışmanlık")) || username === "nuhveysel") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="group relative bg-white border border-black/10 rounded-3xl p-1 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D32F2F]/5 via-[#F57C00]/5 to-[#FBC02D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white border border-black/5 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D32F2F]/10 text-[#D32F2F] text-xs font-bold mb-3 uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5" /> En Popüler
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Birebir Mentorluk Seansı</h3>
                    <p className="text-sm text-zinc-500">45 dakikalık Google Meet görüşmesi ile projeni analiz edelim.</p>
                  </div>
                  <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                    <span className="text-2xl font-bold text-[#1A1A1A]">₺999</span>
                    <Link 
                      href="/checkout"
                      className="w-full sm:w-auto px-6 py-3 bg-[#1A1A1A] text-white text-sm font-semibold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                      Takvimden Seç <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Diğer Ürünler ve Linkler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider ml-2 mb-4">Dijital Ürünler & Topluluk</h2>
          
          {products.length > 0 ? (
            products.map((product) => (
              <Link 
                href="/checkout"
                key={product.id}
                className="group flex items-center justify-between p-4 bg-white border border-black/5 rounded-2xl shadow-sm hover:shadow-md hover:border-black/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center border border-black/5 group-hover:scale-105 transition-transform ${product.iconStr ? 'p-0' : 'p-3'}`}>
                    {product.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A1A]">{product.title}</h3>
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mt-0.5">{product.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-[#1A1A1A]">{product.price}</span>
                  <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-[#1A1A1A] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-black/5 text-center shadow-sm">
              <p className="text-sm font-medium text-zinc-500">Henüz yayınlanmış bir ürün veya hizmet bulunmuyor.</p>
            </div>
          )}
        </motion.div>
        
        {/* Footer Marka Imzas (Kreo Logo) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-[#1A1A1A] transition-colors">
            <span className="opacity-70">Powered by</span>
            <span className="text-[#1A1A1A] tracking-tighter text-lg">Kreo<span className="text-[#D32F2F]">.</span></span>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
