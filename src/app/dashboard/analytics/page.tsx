"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Search, Lock } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto text-[#1A1A1A]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Gelişmiş Analiz</h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium">Trafiğin nereden geldiğini gör, dönüşümleri ölç, stratejini iyileştir.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] border border-black/5 p-16 text-center shadow-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-white/60 z-10 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 border border-black/5 shadow-xl">
            <Lock className="w-8 h-8 text-[#D32F2F]" />
          </div>
          <h3 className="text-3xl font-black text-[#1A1A1A] mb-3">Çok Yakında</h3>
          <p className="text-zinc-600 mb-8 max-w-md mx-auto font-medium text-lg leading-relaxed">
            Google Analytics seviyesindeki gelişmiş ziyaretçi analiz aracımız şu anda kapalı beta aşamasında.
          </p>
          <button 
            className="inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white text-sm font-bold rounded-2xl hover:bg-black transition-all shadow-md transform hover:-translate-y-0.5"
          >
            Beta Bekleme Listesine Katıl
          </button>
        </div>
        
        {/* Fake Background Content to look good behind the blur */}
        <div className="grid grid-cols-3 gap-6 opacity-30 select-none blur-sm pointer-events-none">
          <div className="h-48 bg-zinc-100 rounded-3xl"></div>
          <div className="h-48 bg-zinc-100 rounded-3xl col-span-2"></div>
          <div className="h-64 bg-zinc-100 rounded-3xl col-span-3"></div>
        </div>
      </motion.div>
    </div>
  );
}
