"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, MoreHorizontal, ExternalLink, FileText, CalendarDays, Lock, Eye, Package, Check, Edit2, Trash2, ArrowRight } from "lucide-react";
import { deleteProductAction } from "@/app/actions/productActions";

type ProductItem = {
  id: string;
  title: string;
  type: string;
  price: string;
  sales: number;
  status: string;
  icon: string;
};

export default function ProductsClient({ initialProducts }: { initialProducts: ProductItem[] }) {
  const [filter, setFilter] = useState("Tümü");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    setIsDeleting(id);
    const res = await deleteProductAction(id);
    if (!res.success) {
      alert(res.error);
    }
    setIsDeleting(null);
    setMenuOpenId(null);
  };

  const mappedProducts = initialProducts.map(p => ({
    ...p,
    icon: p.icon === "Lock" ? Lock : p.icon === "FileText" ? FileText : CalendarDays,
    bg: p.icon === "Lock" ? "bg-orange-500/10 border-orange-500/20" : p.icon === "FileText" ? "bg-blue-500/10 border-blue-500/20" : "bg-emerald-500/10 border-emerald-500/20",
    color: p.icon === "Lock" ? "text-orange-400" : p.icon === "FileText" ? "text-blue-400" : "text-emerald-400",
    glow: p.icon === "Lock" ? "from-orange-500/20 to-transparent" : p.icon === "FileText" ? "from-blue-500/20 to-transparent" : "from-emerald-500/20 to-transparent"
  }));

  const filteredProducts = filter === "Tümü" ? mappedProducts : mappedProducts.filter(p => p.type === filter);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`https://kreo.com/checkout/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto text-zinc-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Ürünler & İçerikler</h1>
          <p className="text-zinc-400 text-sm mt-2 font-medium">Satışta olan dijital ürünlerini ve danışmanlıklarını yönet.</p>
        </div>
        <Link 
          href="/dashboard/products/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D32F2F] to-[#C62828] text-white text-sm font-bold rounded-xl hover:from-[#C62828] hover:to-[#B71C1C] transition-all shadow-[0_0_20px_rgba(211,47,47,0.3)] hover:shadow-[0_0_30px_rgba(211,47,47,0.5)] transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Yeni Ürün Ekle
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Ürünlerde ara..." 
            className="w-full pl-12 pr-4 py-3.5 bg-[#111] border border-white/10 rounded-2xl text-sm font-medium text-white focus:ring-2 focus:ring-[#D32F2F]/50 outline-none transition-all placeholder:text-zinc-600 shadow-inner"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {["Tümü", "Dijital Ürün", "Birebir Görüşme", "Abonelik"].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-3.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border ${
                filter === f 
                  ? "bg-white/10 text-white border-white/20 shadow-lg" 
                  : "bg-[#111] text-zinc-500 border-white/5 hover:bg-white/5 hover:text-zinc-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Premium Product Cards List */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              key={product.id} 
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 bg-[#111] rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle ambient glow on hover */}
              <div className={`absolute -right-20 -top-20 w-48 h-48 bg-gradient-to-br ${product.glow} opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none`} />
              
              <div className="flex items-center gap-5 relative z-10">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${product.bg} border group-hover:scale-105 transition-transform duration-300`}>
                  <product.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${product.color}`} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#D32F2F] transition-colors">{product.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{product.type}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)] animate-pulse"></span>
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-8 mt-6 sm:mt-0 relative z-10 border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1">Satış</p>
                  <p className="text-xl font-black text-white">{product.sales}</p>
                </div>
                <div className="text-left sm:text-right w-24">
                  <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1">Fiyat</p>
                  <p className="text-xl font-black text-white">{product.price}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 border-l border-white/10 pl-8 ml-2">
                  <button 
                    onClick={() => handleCopy(product.id)}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all shadow-sm" 
                    title="Linki Kopyala"
                  >
                    {copiedId === product.id ? <Check className="w-5 h-5 text-green-500" /> : <ExternalLink className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => setMenuOpenId(menuOpenId === product.id ? null : product.id)}
                    onBlur={() => setTimeout(() => setMenuOpenId(null), 200)}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all border ${menuOpenId === product.id ? 'bg-white/10 text-white border-white/20' : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border-transparent hover:border-white/10'} shadow-sm`}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {menuOpenId === product.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 top-14 w-48 bg-[#18181B] border border-white/10 shadow-2xl rounded-2xl py-2 z-50 overflow-hidden"
                      >
                        <Link 
                          href={`/dashboard/products/${product.id}/edit`} 
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-4 h-4" /> Düzenle
                        </Link>
                        <div className="h-px w-full bg-white/5 my-1"></div>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          disabled={isDeleting === product.id}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" /> {isDeleting === product.id ? "Siliniyor..." : "Sil"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredProducts.length === 0 && (
          <div className="bg-[#111] rounded-[3rem] border border-white/5 p-16 text-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-inner">
                <Package className="w-10 h-10 text-zinc-500" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Bu kategoride ürün yok</h3>
              <p className="text-zinc-500 mb-8 max-w-sm mx-auto font-medium leading-relaxed">Seçtiğiniz filtreye uygun bir ürün bulunamadı. Yeni bir tane ekleyerek kazanmaya başlayın.</p>
              <button 
                onClick={() => setFilter("Tümü")}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white text-sm font-bold rounded-2xl border border-white/10 hover:bg-white/20 transition-all shadow-md"
              >
                Filtreyi Temizle
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
