"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, MoreHorizontal, ExternalLink, FileText, CalendarDays, Lock, Eye, Package, Check, Edit2, Trash2 } from "lucide-react";

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

  const mappedProducts = initialProducts.map(p => ({
    ...p,
    icon: p.type === "Abonelik" ? Lock : p.type.includes("Görüşme") || p.type.includes("Danışmanlık") ? CalendarDays : FileText,
    color: p.type === "Abonelik" ? "text-[#FBC02D]" : p.type.includes("Görüşme") ? "text-[#F57C00]" : "text-blue-500",
    bg: p.type === "Abonelik" ? "bg-[#FBC02D]/10" : p.type.includes("Görüşme") ? "bg-[#F57C00]/10" : "bg-blue-50",
  }));

  const filteredProducts = mappedProducts.filter(p => filter === "Tümü" || p.type === filter);

  const handleCopy = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Ürünler</h1>
          <p className="text-zinc-500 text-sm mt-1">Dijital ürünlerini, danışmanlıklarını ve aboneliklerini yönet.</p>
        </div>
        <Link 
          href="/dashboard/products/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D32F2F] text-white text-sm font-semibold rounded-xl hover:bg-[#C62828] transition-colors shadow-lg shadow-red-500/20"
        >
          <Plus className="w-4 h-4" />
          Yeni Ürün Ekle
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Ürünlerde ara..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {["Tümü", "Dijital Ürün", "Danışmanlık", "Abonelik"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filter === tab 
                  ? "bg-white border-black/10 text-[#1A1A1A] shadow-sm border" 
                  : "bg-transparent border-transparent text-zinc-500 hover:bg-black/5 border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-zinc-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Toplam Ürün</p>
            <p className="text-xl font-bold text-[#1A1A1A]">{initialProducts.length} Adet</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Toplam Satış</p>
            <p className="text-xl font-bold text-[#1A1A1A]">{initialProducts.length > 0 ? "142 İşlem" : "0 İşlem"}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#D32F2F]/10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Hacim</p>
            <p className="text-xl font-bold text-[#1A1A1A]">{initialProducts.length > 0 ? "₺35,400" : "₺0"}</p>
          </div>
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
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 bg-white rounded-3xl border border-black/5 hover:border-black/10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300"
            >
              {/* Subtle left accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${product.bg} opacity-0 group-hover:opacity-100 transition-opacity rounded-l-3xl`} />
              
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${product.bg} border border-black/5 group-hover:scale-105 transition-transform duration-300`}>
                  <product.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${product.color}`} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] group-hover:text-[#D32F2F] transition-colors">{product.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{product.type}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 mt-4 sm:mt-0 pl-19 sm:pl-0">
                <div className="text-left sm:text-right">
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-0.5">Satış</p>
                  <p className="text-base font-bold text-[#1A1A1A]">{product.sales}</p>
                </div>
                <div className="text-left sm:text-right w-24">
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-0.5">Fiyat</p>
                  <p className="text-base font-bold text-[#1A1A1A]">{product.price}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 border-l border-black/5 pl-6 relative">
                  <Link href="/nuhveysel" target="_blank" className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-50 text-zinc-500 hover:text-[#D32F2F] hover:bg-[#D32F2F]/10 transition-colors" title="Vitrinde Gör">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => handleCopy(product.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-50 text-zinc-500 hover:text-green-600 hover:bg-green-50 transition-colors" 
                    title="Linki Kopyala"
                  >
                    {copiedId === product.id ? <Check className="w-4 h-4 text-green-600" /> : <ExternalLink className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => setMenuOpenId(menuOpenId === product.id ? null : product.id)}
                    onBlur={() => setTimeout(() => setMenuOpenId(null), 200)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${menuOpenId === product.id ? 'bg-black/5 text-[#1A1A1A]' : 'bg-zinc-50 text-zinc-500 hover:text-[#1A1A1A] hover:bg-black/5'}`}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {menuOpenId === product.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 top-12 w-40 bg-white border border-black/5 shadow-xl rounded-xl py-2 z-10"
                      >
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-[#1A1A1A]">
                          <Edit2 className="w-4 h-4" /> Düzenle
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" /> Sil
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
          <div className="bg-white rounded-3xl border border-black/5 p-12 text-center shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <Package className="w-10 h-10 text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Bu kategoride ürün yok</h3>
            <p className="text-sm text-zinc-500 mb-8 max-w-sm mx-auto">Seçtiğiniz filtreye uygun bir ürün bulunamadı. Yeni bir tane ekleyebilirsiniz.</p>
            <button 
              onClick={() => setFilter("Tümü")}
              className="inline-flex items-center justify-center px-6 py-3 bg-zinc-100 text-[#1A1A1A] text-sm font-bold rounded-xl hover:bg-zinc-200 transition-colors"
            >
              Filtreyi Temizle
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
