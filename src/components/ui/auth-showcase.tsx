"use client";

import { motion } from "framer-motion";
import { Sparkles, BarChart3, Calendar, Link as LinkIcon, BadgeDollarSign } from "lucide-react";

export function AuthShowcase({ 
  title, 
  highlight, 
  description, 
  metricLabel, 
  metricDesc,
  badgeText 
}: {
  title: string;
  highlight: string;
  description: string;
  metricLabel: string;
  metricDesc: string;
  badgeText: string;
}) {
  return (
    <div className="hidden md:flex relative flex-col justify-center p-12 lg:p-24 overflow-hidden bg-[#050505] border-l border-white/5">
      
      {/* 1. Liquid Ambient Mesh Background (21st.dev Vibe) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            transform: [
              "translate(0%, 0%) scale(1)",
              "translate(10%, -10%) scale(1.2)",
              "translate(-5%, 5%) scale(0.9)",
              "translate(0%, 0%) scale(1)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#D32F2F] rounded-full mix-blend-screen filter blur-[120px] opacity-40"
        />
        <motion.div
          animate={{
            transform: [
              "translate(0%, 0%) scale(1)",
              "translate(-15%, 10%) scale(1.3)",
              "translate(5%, -5%) scale(0.8)",
              "translate(0%, 0%) scale(1)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#F57C00] rounded-full mix-blend-screen filter blur-[120px] opacity-30"
        />
        <motion.div
          animate={{
            transform: [
              "translate(0%, 0%) scale(1)",
              "translate(10%, 15%) scale(1.1)",
              "translate(-10%, -10%) scale(0.9)",
              "translate(0%, 0%) scale(1)",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[20%] w-[70%] h-[70%] bg-[#FBC02D] rounded-full mix-blend-screen filter blur-[130px] opacity-20"
        />
        
        {/* Grain / Noise Overlay for ultra-premium texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
        />
      </div>

      {/* 2. Floating 3D-like Glass Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[20%] left-[15%] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <BadgeDollarSign className="w-8 h-8 text-[#FBC02D]" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
          className="absolute bottom-[30%] right-[15%] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <BarChart3 className="w-8 h-8 text-[#D32F2F]" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
          className="absolute top-[40%] right-[25%] p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <Calendar className="w-6 h-6 text-[#F57C00]" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }} 
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} 
          className="absolute bottom-[20%] left-[25%] p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <LinkIcon className="w-5 h-5 text-white/70" />
        </motion.div>
      </div>

      {/* 3. Foreground Content */}
      <div className="relative z-10 max-w-md mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-xl">
            <Sparkles className="w-4 h-4 text-[#FBC02D]" />
            <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider">{badgeText}</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#FBC02D]">{highlight}</span>
          </h2>
          
          <p className="text-lg text-zinc-400 leading-relaxed mb-12 font-medium">
            {description}
          </p>

          {/* Premium Glassmorphism Metric Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-default"
          >
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#1A1A1A] bg-zinc-800 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop')] bg-cover" />
              <div className="w-10 h-10 rounded-full border-2 border-[#1A1A1A] bg-zinc-800 bg-[url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop')] bg-cover" />
              <div className="w-10 h-10 rounded-full border-2 border-[#1A1A1A] bg-gradient-to-br from-[#D32F2F] to-[#F57C00] flex items-center justify-center text-xs font-bold text-white">
                +5K
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-white">{metricLabel}</div>
              <div className="text-xs text-zinc-400 mt-0.5">{metricDesc}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
