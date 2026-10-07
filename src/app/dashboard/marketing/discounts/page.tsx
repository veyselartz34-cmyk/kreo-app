"use client";

import { motion } from "framer-motion";
import { Tag, Plus, Settings, Percent, CalendarClock } from "lucide-react";
import Link from "next/link";

export default function DiscountsPage() {
  return (
    <div className="max-w-7xl mx-auto text-[#1A1A1A]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">İndirim Kuponları</h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium">Özel kampanyalar oluştur, takipçilerine FOMO yaşat ve satışları katla.</p>
        </div>
        <button 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#B71C1C] transition-all shadow-[0_4px_14px_rgba(211,47,47,0.3)] hover:shadow-[0_6px_20px_rgba(211,47,47,0.4)] transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Yeni Kupon Oluştur
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
            <Percent className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-sm font-bold text-zinc-500 mb-1">Kullanılan Kuponlar</p>
          <h3 className="text-2xl font-black text-[#1A1A1A]">0</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <Tag className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-sm font-bold text-zinc-500 mb-1">Aktif Kampanyalar</p>
          <h3 className="text-2xl font-black text-[#1A1A1A]">0</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
            <CalendarClock className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-sm font-bold text-zinc-500 mb-1">Kuponlardan Kazanılan</p>
          <h3 className="text-2xl font-black text-[#1A1A1A]">₺0</h3>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] border border-black/5 p-16 text-center shadow-sm relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-black/5 shadow-inner">
            <Tag className="w-10 h-10 text-zinc-400" />
          </div>
          <h3 className="text-2xl font-black text-[#1A1A1A] mb-3">Hiç indirim kodunuz yok</h3>
          <p className="text-zinc-500 mb-8 max-w-sm mx-auto font-medium leading-relaxed">İlk indirim kodunuzu oluşturun, sosyal medyada paylaşın ve dönüşümlerin hızla artmasını izleyin.</p>
          <button 
            className="inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white text-sm font-bold rounded-2xl hover:bg-black transition-all shadow-md transform hover:-translate-y-0.5"
          >
            İlk Kodunu Oluştur
          </button>
        </div>
      </motion.div>
    </div>
  );
}
