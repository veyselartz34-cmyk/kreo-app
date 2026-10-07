"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, MoreHorizontal, ExternalLink, FileText, CalendarDays, Lock, Package, Check, Edit2, Trash2 } from "lucide-react";
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
    bg: p.icon === "Lock" ? "bg-orange-50 border-orange-100" : p.icon === "FileText" ? "bg-blue-50 border-blue-100" : "bg-emerald-50 border-emerald-100",
    color: p.icon === "Lock" ? "text-orange-500" : p.icon === "FileText" ? "text-blue-500" : "text-emerald-500",
  }));

  const filteredProducts = filter === "Tümü" ? mappedProducts : mappedProducts.filter(p => p.type === filter);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`https://kreo.com/checkout/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Ürünler & İçerikler</h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium">Satışta olan dijital ürünlerini ve danışmanlıklarını yönet.</p>
        </div>
        <Link 
          href="/dashboard/products/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#B71C1C] transition-all shadow-[0_4px_14px_rgba(211,47,47,0.3)] hover:shadow-[0_6px_20px_rgba(211,47,47,0.4)] transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Yeni Ürün Ekle
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Ürünlerde ara..." 
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-black/5 rounded-2xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-[#D32F2F]/30 outline-none transition-all placeholder:text-zinc-400 shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {["Tümü", "Dijital Ürün", "Birebir Görüşme", "Abonelik"].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-3.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border ${
                filter === f 
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md" 
                  : "bg-white text-zinc-500 border-black/5 hover:bg-zinc-50 hover:text-[#1A1A1A]"
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
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 bg-white rounded-3xl border border-black/5 hover:border-black/10 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl"
            >
              <div className="flex items-center gap-5 relative z-10">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${product.bg} border group-hover:scale-105 transition-transform duration-300`}>
                  <product.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${product.color}`} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#1A1A1A] group-hover:text-[#D32F2F] transition-colors">{product.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{product.type}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-8 mt-6 sm:mt-0 relative z-10 border-t sm:border-t-0 border-black/5 pt-4 sm:pt-0">
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Satış</p>
                  <p className="text-xl font-black text-[#1A1A1A]">{product.sales}</p>
                </div>
                <div className="text-left sm:text-right w-24">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Fiyat</p>
                  <p className="text-xl font-black text-[#1A1A1A]">{product.price}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 border-l border-black/5 pl-8 ml-2">
                  <button 
                    onClick={() => handleCopy(product.id)}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-50 text-zinc-500 hover:text-[#1A1A1A] hover:bg-zinc-100 border border-transparent hover:border-black/5 transition-all shadow-sm" 
                    title="Linki Kopyala"
                  >
                    {copiedId === product.id ? <Check className="w-5 h-5 text-green-600" /> : <ExternalLink className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => setMenuOpenId(menuOpenId === product.id ? null : product.id)}
                    onBlur={() => setTimeout(() => setMenuOpenId(null), 200)}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all border ${menuOpenId === product.id ? 'bg-black/5 text-[#1A1A1A] border-black/10' : 'bg-zinc-50 text-zinc-500 hover:text-[#1A1A1A] hover:bg-zinc-100 border-transparent hover:border-black/5'} shadow-sm`}
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
                        className="absolute right-0 top-14 w-48 bg-white border border-black/10 shadow-xl rounded-2xl py-2 z-50 overflow-hidden"
                      >
                        <Link 
                          href={`/dashboard/products/${product.id}/edit`} 
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-50 hover:text-[#1A1A1A] transition-colors"
                        >
                          <Edit2 className="w-4 h-4" /> Düzenle
                        </Link>
                        <div className="h-px w-full bg-black/5 my-1"></div>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          disabled={isDeleting === product.id}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-50"
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
          <div className="bg-white rounded-[3rem] border border-black/5 p-16 text-center shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-black/5">
                <Package className="w-10 h-10 text-zinc-400" />
              </div>
              <h3 className="text-2xl font-black text-[#1A1A1A] mb-3">Bu kategoride ürün yok</h3>
              <p className="text-zinc-500 mb-8 max-w-sm mx-auto font-medium leading-relaxed">Seçtiğiniz filtreye uygun bir ürün bulunamadı. Yeni bir tane ekleyerek kazanmaya başlayın.</p>
              <button 
                onClick={() => setFilter("Tümü")}
                className="inline-flex items-center justify-center px-8 py-4 bg-zinc-100 text-[#1A1A1A] text-sm font-bold rounded-2xl hover:bg-zinc-200 transition-all shadow-sm"
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
