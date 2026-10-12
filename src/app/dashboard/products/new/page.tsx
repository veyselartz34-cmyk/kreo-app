"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Upload, FileText, CalendarDays, Lock, CheckCircle2, 
  Plus, Trash2, HelpCircle, Sparkles, Check
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createProductAction } from "@/app/actions/productActions";

export default function NewProductPage() {
  const router = useRouter();
  const [productType, setProductType] = useState("digital"); // digital, calendar, subscription
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [icon, setIcon] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dosya Yükleme
  const [productFile, setProductFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tanıtım Sayfası: Paket İçeriği ("Bu Pakette Neler Var?")
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = useState("");

  // Tanıtım Sayfası: Sıkça Sorulan Sorular (SSS)
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([]);
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFeatures([...features, newFeatureText.trim()]);
    setNewFeatureText("");
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddFaq = () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    setFaqs([...faqs, { q: newFaqQ.trim(), a: newFaqA.trim() }]);
    setNewFaqQ("");
    setNewFaqA("");
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIcon(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!title || !price || isSubmitting) return;
    setIsSubmitting(true);

    const typeLabel = productType === "digital" ? "Dijital Ürün" : productType === "calendar" ? "Birebir Görüşme" : "Abonelik";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("type", typeLabel);
    if (icon) formData.append("icon", icon);

    // Paket içeriği ve SSS'leri JSON olarak ekle
    if (features.length > 0) {
      formData.append("features", JSON.stringify(features));
    }
    if (faqs.length > 0) {
      formData.append("faqs", JSON.stringify(faqs));
    }
    
    // Dijital dosya
    if (productFile && productType === "digital") {
      formData.append("file", productFile);
    }

    try {
      const res = await createProductAction(formData);

      if (res.success) {
        setIsSaved(true);
        setTimeout(() => {
          router.push("/dashboard/products");
          router.refresh();
        }, 1500);
      } else {
        alert(res.error);
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error(err);
      alert("Sunucuya bağlanırken bir hata oluştu veya dosya çok büyük (Maks. 50MB).");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 text-[#1A1A1A]">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard/products" 
          className="w-12 h-12 bg-white border border-black/5 rounded-2xl flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Yeni Ürün Ekle</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Satmaya başlamak için ürününüzü ve tanıtım detaylarını oluşturun.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Taraf: Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Ürün Tipi */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm"
          >
            <h3 className="text-xs font-bold text-zinc-500 mb-4 uppercase tracking-widest">1. Ürün Tipi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                type="button"
                onClick={() => setProductType("digital")}
                className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 transition-all ${
                  productType === 'digital' 
                    ? 'border-[#0288D1] bg-[#0288D1]/5 text-[#0288D1]' 
                    : 'border-black/5 bg-zinc-50/50 hover:bg-zinc-50 text-zinc-600'
                }`}
              >
                <FileText className={`w-7 h-7 ${productType === 'digital' ? 'text-[#0288D1]' : 'text-zinc-400'}`} />
                <span className="text-sm font-bold">Dijital Ürün</span>
              </button>
              <button 
                type="button"
                onClick={() => setProductType("calendar")}
                className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 transition-all ${
                  productType === 'calendar' 
                    ? 'border-[#F57C00] bg-[#F57C00]/5 text-[#F57C00]' 
                    : 'border-black/5 bg-zinc-50/50 hover:bg-zinc-50 text-zinc-600'
                }`}
              >
                <CalendarDays className={`w-7 h-7 ${productType === 'calendar' ? 'text-[#F57C00]' : 'text-zinc-400'}`} />
                <span className="text-sm font-bold">Birebir Randevu</span>
              </button>
              <button 
                type="button"
                onClick={() => setProductType("subscription")}
                className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 transition-all ${
                  productType === 'subscription' 
                    ? 'border-[#FBC02D] bg-[#FBC02D]/10 text-[#B78103]' 
                    : 'border-black/5 bg-zinc-50/50 hover:bg-zinc-50 text-zinc-600'
                }`}
              >
                <Lock className={`w-7 h-7 ${productType === 'subscription' ? 'text-[#FBC02D]' : 'text-zinc-400'}`} />
                <span className="text-sm font-bold">Abonelik</span>
              </button>
            </div>
          </motion.div>

          {/* 2. Temel Bilgiler */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
          >
            <h3 className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">2. Temel Bilgiler</h3>
            
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Ürün Adı</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: 1 Aylık Figma Eğitimi & Şablon Paketi" 
                className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-bold text-[#1A1A1A]" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Ürün Açıklaması</label>
              <textarea 
                rows={4} 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Ürününüzün neler içerdiğini ve müşteriye katacağı değeri detaylıca anlatın..." 
                className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-medium text-[#1A1A1A] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Fiyat (₺)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="499" 
                className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-black text-[#1A1A1A]" 
              />
            </div>
          </motion.div>

          {/* 3. Medya & İçerik */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
          >
            <h3 className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">3. Medya & Dosya Teslimatı</h3>
            
            <div 
              onClick={() => fileInputRef.current?.click()} 
              className="border-2 border-dashed border-black/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer group relative overflow-hidden aspect-[16/9]"
            >
              {icon ? (
                <img src={icon} alt="Kapak Görseli" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-16 h-16 bg-white border border-black/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm relative z-10">
                    <Upload className="w-6 h-6 text-zinc-400 group-hover:text-[#D32F2F] transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-[#1A1A1A] mb-1 relative z-10">Kapak Fotoğrafı Yükle</p>
                  <p className="text-xs text-zinc-500 relative z-10">PNG, JPG veya WebP (Maks. 5MB)</p>
                </>
              )}
              {icon && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                   <p className="text-white font-bold text-sm">Görseli Değiştir</p>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
            </div>

            {productType === "digital" && (
              <div className="pt-4 border-t border-black/5">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Teslim Edilecek Dijital Dosya (Vercel Blob)
                </label>
                <input 
                  type="file" 
                  onChange={(e) => setProductFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-zinc-500
                    file:mr-4 file:py-2.5 file:px-5
                    file:rounded-xl file:border-0
                    file:text-xs file:font-bold
                    file:bg-[#1A1A1A] file:text-white
                    hover:file:bg-black transition-colors"
                />
                {productFile && (
                  <p className="text-xs text-green-700 font-bold mt-2">
                    ✓ Seçilen Dosya: {productFile.name} ({(productFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* 4. Paket İçeriği ("Bu Pakette Neler Var?") */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">4. Paket İçeriği ("Bu Pakette Neler Var?")</h3>
                <p className="text-xs text-zinc-400 mt-1">Tanıtım sayfasında yeşil tiklerle listelenecek maddeler.</p>
              </div>
              <span className="text-[11px] font-bold text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">Opsiyonel</span>
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                placeholder="Örn: 60 Dakika Birebir Görüşme, Figma Kaynak Dosyaları..." 
                className="flex-1 px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none text-sm font-medium"
              />
              <button 
                type="button"
                onClick={handleAddFeature}
                className="px-5 py-3 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 flex-shrink-0"
              >
                <Plus className="w-4 h-4" /> Madde Ekle
              </button>
            </div>

            {features.length > 0 ? (
              <div className="space-y-2">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-zinc-50 rounded-xl border border-black/5 text-sm font-bold text-[#1A1A1A]">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveFeature(idx)}
                      className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic">
                * Madde eklemezseniz ürün türünüze uygun akıllı varsayılan maddeler otomatik gösterilir.
              </p>
            )}
          </motion.div>

          {/* 5. Sıkça Sorulan Sorular (SSS) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">5. Sıkça Sorulan Sorular (SSS)</h3>
                <p className="text-xs text-zinc-400 mt-1">Tanıtım sayfasında akordeon olarak açılacak soru ve cevaplar.</p>
              </div>
              <span className="text-[11px] font-bold text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">Opsiyonel</span>
            </div>

            <div className="space-y-3 bg-zinc-50 p-4 rounded-2xl border border-black/5">
              <input 
                type="text" 
                value={newFaqQ}
                onChange={(e) => setNewFaqQ(e.target.value)}
                placeholder="Soru: Örn. Satın aldıktan sonra dosyaya nasıl ulaşırım?" 
                className="w-full px-4 py-2.5 rounded-xl border border-black/5 bg-white focus:ring-2 focus:ring-[#D32F2F]/20 outline-none text-xs font-bold text-[#1A1A1A]"
              />
              <textarea 
                rows={2}
                value={newFaqA}
                onChange={(e) => setNewFaqA(e.target.value)}
                placeholder="Cevap: Ödemeniz tamamlandığı an indirme butonu doğrudan ekranda açılır..." 
                className="w-full px-4 py-2.5 rounded-xl border border-black/5 bg-white focus:ring-2 focus:ring-[#D32F2F]/20 outline-none text-xs font-medium text-[#1A1A1A] resize-none"
              />
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={handleAddFaq}
                  disabled={!newFaqQ.trim() || !newFaqA.trim()}
                  className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" /> Soru Ekle
                </button>
              </div>
            </div>

            {faqs.length > 0 ? (
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-zinc-50 rounded-2xl border border-black/5 text-xs space-y-1 relative group">
                    <button 
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      className="absolute top-3 right-3 text-zinc-400 hover:text-red-600 transition-colors p-1"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <p className="font-bold text-[#1A1A1A] pr-8">Q: {faq.q}</p>
                    <p className="text-zinc-600 font-medium">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic">
                * Soru eklemezseniz profesyonel hazır SSS listesi otomatik gösterilir.
              </p>
            )}
          </motion.div>

        </div>

        {/* Sağ Taraf: Önizleme & Yayınla Butonu */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            {/* Canlı Önizleme Kartı */}
            <div className="bg-white border border-black/5 shadow-xl shadow-black/5 rounded-[2.5rem] p-6 space-y-4">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Canlı Önizleme</p>
              
              <div className="w-full aspect-[16/10] bg-zinc-50 rounded-2xl border border-black/5 flex items-center justify-center overflow-hidden">
                {icon ? (
                  <img src={icon} alt="Önizleme" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-zinc-400 text-xs font-bold">Kapak Görseli</span>
                )}
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D32F2F]/10 text-[#D32F2F] text-xs font-bold">
                {productType === "digital" && <FileText className="w-3.5 h-3.5" />}
                {productType === "calendar" && <CalendarDays className="w-3.5 h-3.5" />}
                {productType === "subscription" && <Lock className="w-3.5 h-3.5" />}
                <span>{productType === "digital" ? "Dijital Ürün" : productType === "calendar" ? "Birebir Görüşme" : "Abonelik"}</span>
              </div>

              <h4 className="text-lg font-black text-[#1A1A1A] leading-tight break-words">
                {title || "Örnek Ürün Başlığı"}
              </h4>

              <p className="text-xs text-zinc-500 line-clamp-2 break-words font-medium">
                {desc || "Ürün açıklaması burada görünecek. Müşterileriniz bu özeti okuyarak karar verecek."}
              </p>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-bold">Fiyat</span>
                <span className="text-2xl font-black text-[#1A1A1A]">
                  {price ? `₺${parseFloat(price).toLocaleString("tr-TR")}` : "₺499"}
                </span>
              </div>

              {features.length > 0 && (
                <div className="pt-2 text-xs text-zinc-500 font-medium">
                  <span className="font-bold text-[#1A1A1A]">✓ {features.length} Özel Özellik</span> dahil edildi
                </div>
              )}
            </div>

            {/* Kaydet & Yayınla Butonu */}
            <button 
              type="button"
              onClick={handleSave}
              disabled={!title || !price || isSubmitting}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 text-white text-sm font-black rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:scale-100 ${
                !title || !price || isSubmitting ? 'bg-zinc-400 shadow-none cursor-not-allowed' : 'bg-[#D32F2F] hover:bg-[#B71C1C] shadow-red-500/30'
              }`}
            >
              {isSaved ? (
                <><CheckCircle2 className="w-5 h-5 text-white" /> Ürün Yayınlandı!</>
              ) : isSubmitting ? (
                "Yayınlanıyor..."
              ) : (
                "Ürünü Yayınla"
              )}
            </button>

            <p className="text-xs text-center text-zinc-400 font-medium">
              Yayınla'ya bastıktan sonra ürün mağazanızda ve landing sayfasında anında görünür.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
