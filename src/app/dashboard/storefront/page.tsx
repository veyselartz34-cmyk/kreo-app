"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Paintbrush, LayoutTemplate, Palette, Image as ImageIcon, Type, Link as LinkIcon, Monitor, Smartphone, Save } from "lucide-react";

export default function StorefrontPage() {
  const [activeTab, setActiveTab] = useState("theme");
  const [previewMode, setPreviewMode] = useState("desktop");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Vitrin Tasarımı</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">Müşterilerinizin göreceği profil ve vitrin sayfanızı özelleştirin.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-black/5 text-[#1A1A1A] text-sm font-bold rounded-xl hover:bg-zinc-50 transition-colors shadow-sm">
            Vitrini Görüntüle
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#B71C1C] transition-colors shadow-[0_4px_14px_rgba(211,47,47,0.3)] disabled:opacity-50"
          >
            {isSaving ? "Kaydediliyor..." : <><Save className="w-4 h-4" /> Değişiklikleri Kaydet</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Settings (Left) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-black/5 shadow-sm sticky top-28">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-zinc-50 p-2 rounded-2xl border border-black/5">
              <button 
                onClick={() => setActiveTab("theme")}
                className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === "theme" ? "bg-white text-[#1A1A1A] shadow-sm" : "text-zinc-500 hover:text-[#1A1A1A]"}`}
              >
                <Palette className="w-4 h-4" /> Tema
              </button>
              <button 
                onClick={() => setActiveTab("content")}
                className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === "content" ? "bg-white text-[#1A1A1A] shadow-sm" : "text-zinc-500 hover:text-[#1A1A1A]"}`}
              >
                <Type className="w-4 h-4" /> İçerik
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "theme" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <h3 className="text-sm font-black text-[#1A1A1A] mb-4">Vurgu Rengi</h3>
                  <div className="flex flex-wrap gap-3">
                    {["#D32F2F", "#1A1A1A", "#2563EB", "#059669", "#D97706", "#7C3AED"].map((color) => (
                      <button 
                        key={color} 
                        className="w-10 h-10 rounded-full border-2 border-transparent focus:border-black/20 hover:scale-110 transition-transform relative"
                        style={{ backgroundColor: color }}
                      >
                        {color === "#D32F2F" && <div className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full"></div>}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black text-[#1A1A1A] mb-4">Kapak Düzeni</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="aspect-[4/3] rounded-xl border-2 border-[#D32F2F] bg-zinc-50 p-3 flex flex-col relative overflow-hidden">
                      <div className="w-full h-10 bg-zinc-200 rounded-lg mb-2"></div>
                      <div className="w-8 h-8 rounded-full bg-zinc-300 border-2 border-white absolute top-8 left-4"></div>
                      <div className="w-1/2 h-2 bg-zinc-300 rounded mt-2"></div>
                    </button>
                    <button className="aspect-[4/3] rounded-xl border-2 border-black/5 hover:border-black/20 bg-zinc-50 p-3 flex flex-col items-center justify-center relative overflow-hidden transition-colors">
                      <div className="w-10 h-10 rounded-full bg-zinc-300 mb-2"></div>
                      <div className="w-1/2 h-2 bg-zinc-300 rounded"></div>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "content" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Profil Resmi</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center border border-black/5">
                      <ImageIcon className="w-6 h-6 text-zinc-400" />
                    </div>
                    <button className="px-4 py-2 bg-zinc-50 border border-black/5 text-sm font-bold text-[#1A1A1A] rounded-xl hover:bg-zinc-100 transition-colors">Değiştir</button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Vitrin Başlığı</label>
                  <input type="text" defaultValue="Caner Demir" className="w-full px-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Biyografi</label>
                  <textarea rows={3} defaultValue="Dijital pazarlama ve girişimcilik üzerine tecrübelerimi paylaşıyorum." className="w-full px-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30 resize-none"></textarea>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Live Preview (Right) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-end mb-4 gap-2 bg-zinc-100 p-1 rounded-xl w-fit ml-auto">
            <button onClick={() => setPreviewMode("desktop")} className={`p-2 rounded-lg transition-colors ${previewMode === "desktop" ? "bg-white shadow-sm text-[#1A1A1A]" : "text-zinc-500 hover:text-[#1A1A1A]"}`}>
              <Monitor className="w-4 h-4" />
            </button>
            <button onClick={() => setPreviewMode("mobile")} className={`p-2 rounded-lg transition-colors ${previewMode === "mobile" ? "bg-white shadow-sm text-[#1A1A1A]" : "text-zinc-500 hover:text-[#1A1A1A]"}`}>
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className={`mx-auto transition-all duration-500 ${previewMode === "mobile" ? "w-[375px]" : "w-full"}`}>
            <div className="bg-[#FDFBF7] rounded-[2rem] border-4 border-black/5 shadow-2xl overflow-hidden aspect-[4/3] sm:aspect-auto sm:min-h-[600px] relative">
              {/* Fake Storefront UI */}
              <div className="h-32 bg-gradient-to-r from-red-100 to-orange-100 relative">
                <div className="absolute -bottom-10 left-8">
                  <div className="w-20 h-20 bg-white rounded-full border-4 border-[#FDFBF7] flex items-center justify-center text-xl font-black text-[#D32F2F]">C</div>
                </div>
              </div>
              <div className="pt-14 px-8 pb-8">
                <h2 className="text-2xl font-black text-[#1A1A1A]">Caner Demir</h2>
                <p className="text-sm font-medium text-zinc-500 mt-2 max-w-md leading-relaxed">Dijital pazarlama ve girişimcilik üzerine tecrübelerimi paylaşıyorum.</p>
                
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-black/5 flex gap-4">
                      <div className="w-16 h-16 bg-zinc-100 rounded-xl flex-shrink-0"></div>
                      <div>
                        <div className="w-32 h-4 bg-zinc-200 rounded mb-2"></div>
                        <div className="w-16 h-3 bg-zinc-100 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
