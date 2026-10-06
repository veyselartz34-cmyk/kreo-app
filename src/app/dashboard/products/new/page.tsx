"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, FileText, CalendarDays, Lock, Info, CheckCircle2 } from "lucide-react";

import { createProductAction } from "@/app/actions/productActions";

export default function NewProductPage() {
  const [productType, setProductType] = useState("digital"); // digital, calendar, subscription
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!title || !price || isSubmitting) return;
    setIsSubmitting(true);

    const typeLabel = productType === "digital" ? "Dijital Ürün" : productType === "calendar" ? "Birebir Görüşme" : "Abonelik";

    const res = await createProductAction({
      title,
      description: desc,
      price: parseFloat(price),
      type: typeLabel
    });

    if (res.success) {
      setIsSaved(true);
      setTimeout(() => {
        window.location.href = "/dashboard/products";
      }, 1000);
    } else {
      alert("Hata: " + res.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard/products"
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-black/10 bg-white text-zinc-500 hover:text-[#1A1A1A] hover:bg-zinc-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Yeni Ürün Ekle</h1>
          <p className="text-zinc-500 text-sm mt-1">Vitrininizde sergilenecek yeni bir ürün veya hizmet oluşturun.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Taraf: Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Ürün Tipi Seçimi */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-4 uppercase tracking-wider">1. Ne Satıyorsun?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => setProductType("digital")}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${productType === 'digital' ? 'border-[#D32F2F] bg-[#D32F2F]/5' : 'border-black/5 bg-white hover:border-black/10'}`}
              >
                <FileText className={`w-6 h-6 ${productType === 'digital' ? 'text-[#D32F2F]' : 'text-zinc-400'}`} />
                <span className={`text-sm font-bold ${productType === 'digital' ? 'text-[#D32F2F]' : 'text-zinc-600'}`}>Dijital Dosya</span>
              </button>
              <button 
                onClick={() => setProductType("calendar")}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${productType === 'calendar' ? 'border-[#F57C00] bg-[#F57C00]/5' : 'border-black/5 bg-white hover:border-black/10'}`}
              >
                <CalendarDays className={`w-6 h-6 ${productType === 'calendar' ? 'text-[#F57C00]' : 'text-zinc-400'}`} />
                <span className={`text-sm font-bold ${productType === 'calendar' ? 'text-[#F57C00]' : 'text-zinc-600'}`}>Birebir Randevu</span>
              </button>
              <button 
                onClick={() => setProductType("subscription")}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${productType === 'subscription' ? 'border-[#FBC02D] bg-[#FBC02D]/5' : 'border-black/5 bg-white hover:border-black/10'}`}
              >
                <Lock className={`w-6 h-6 ${productType === 'subscription' ? 'text-[#FBC02D]' : 'text-zinc-400'}`} />
                <span className={`text-sm font-bold ${productType === 'subscription' ? 'text-[#FBC02D]' : 'text-zinc-600'}`}>Abonelik</span>
              </button>
            </div>
          </motion.div>

          {/* Temel Bilgiler Formu */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-6"
          >
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-4 uppercase tracking-wider">2. Temel Bilgiler</h3>
            
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Ürün Adı</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: 1 Aylık Figma Eğitimi" 
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-medium" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Açıklama</label>
              <textarea 
                rows={4} 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Ürününüzün neler içerdiğini detaylıca anlatın..." 
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Fiyat (₺)</label>
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="499" 
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-medium" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">İndirimli Fiyat <span className="text-zinc-400 font-normal">(Opsiyonel)</span></label>
                <input 
                  type="number" 
                  placeholder="399" 
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-medium" 
                />
              </div>
            </div>
          </motion.div>

          {/* Dosya / Medya Yükleme */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-4 uppercase tracking-wider">3. Medya & İçerik</h3>
            
            <div className="border-2 border-dashed border-black/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-white border border-black/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <Upload className="w-6 h-6 text-zinc-400 group-hover:text-[#D32F2F] transition-colors" />
              </div>
              <p className="text-sm font-bold text-[#1A1A1A] mb-1">Kapak Fotoğrafı Yükle</p>
              <p className="text-xs text-zinc-500">PNG, JPG veya GIF (Maks. 5MB)</p>
            </div>

            {productType === "digital" && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  Müşterinin satın aldıktan sonra indireceği <b>PDF, ZIP veya Video</b> dosyasını ürünü kaydettikten sonraki ekranda yükleyeceksiniz.
                </p>
              </div>
            )}
          </motion.div>

        </div>

        {/* Sağ Taraf: Önizleme & Kaydet */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            {/* Canlı Önizleme Kartı */}
            <div className="bg-white border border-black/5 shadow-xl shadow-black/5 rounded-3xl p-6">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 text-center">Canlı Önizleme</p>
              <div className="w-full aspect-[4/3] bg-zinc-100 rounded-2xl border border-black/5 mb-4 flex items-center justify-center">
                <span className="text-zinc-400 text-sm font-medium">Kapak Görseli</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D32F2F]/10 text-[#D32F2F] text-xs font-bold mb-3">
                {productType === "digital" && <FileText className="w-3.5 h-3.5" />}
                {productType === "calendar" && <CalendarDays className="w-3.5 h-3.5" />}
                {productType === "subscription" && <Lock className="w-3.5 h-3.5" />}
                {productType === "digital" ? "Dijital Ürün" : productType === "calendar" ? "Randevu" : "Abonelik"}
              </div>
              <h4 className="text-lg font-bold text-[#1A1A1A] leading-tight mb-2 break-words">
                {title || "Örnek Ürün Başlığı"}
              </h4>
              <p className="text-sm text-zinc-500 line-clamp-2 mb-4 break-words">
                {desc || "Ürün açıklaması burada görünecek. Müşterileriniz bu özeti okuyarak karar verecek."}
              </p>
              <div className="text-2xl font-black text-[#1A1A1A]">
                {price ? `₺${price}` : "₺499"}
              </div>
            </div>

            {/* Kaydet Butonu */}
            <button 
              onClick={handleSave}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 text-white text-sm font-bold rounded-2xl transition-all shadow-lg active:scale-95 ${
                !title || !price ? 'bg-zinc-300 cursor-not-allowed shadow-none' : 'bg-[#D32F2F] hover:bg-[#C62828] shadow-red-500/20'
              }`}
            >
              {isSaved ? (
                <><CheckCircle2 className="w-5 h-5 text-white" /> Ürün Oluşturuldu!</>
              ) : (
                "Ürünü Yayınla"
              )}
            </button>
            <p className="text-xs text-center text-zinc-400 mt-4">
              Yayınla'ya bastıktan sonra ürün vitrininizde görünmeye başlar.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
