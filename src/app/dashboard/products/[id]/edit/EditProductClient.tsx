"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Upload, FileText, CalendarDays, Lock, Info, CheckCircle2, 
  ArrowRight, Plus, Trash2, Sparkles, Check
} from "lucide-react";
import { useRouter } from "next/navigation";
import { updateProductAction } from "@/app/actions/productActions";

export default function EditProductClient({ product }: { product: any }) {
  const router = useRouter();
  
  const mapTypeToValue = (type: string) => {
    if (type === "Birebir Görüşme" || type === "Birebir Gorusme") return "calendar";
    if (type === "Abonelik") return "subscription";
    return "digital";
  };

  const initialFeatures = () => {
    if (!product.features) return [];
    try {
      const parsed = JSON.parse(product.features);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return product.features.split("\n").map((l: string) => l.trim()).filter(Boolean);
    }
    return [];
  };

  const initialFaqs = () => {
    if (!product.faqs) return [];
    try {
      const parsed = JSON.parse(product.faqs);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return [];
  };

  const [productType, setProductType] = useState(mapTypeToValue(product.type));
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.description || "");
  const [price, setPrice] = useState(product.price.toString());
  const [icon, setIcon] = useState(product.icon || "");
  
  // Tanıtım Sayfası: Paket İçeriği
  const [features, setFeatures] = useState<string[]>(initialFeatures());
  const [newFeatureText, setNewFeatureText] = useState("");

  // Tanıtım Sayfası: SSS
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>(initialFaqs());
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");

  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productFile, setProductFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (icon && icon !== product.icon) formData.append("icon", icon);
    
    // Paket içeriği ve SSS'leri JSON olarak ekle
    formData.append("features", JSON.stringify(features));
    formData.append("faqs", JSON.stringify(faqs));

    if (productFile && productType === "digital") {
      formData.append("file", productFile);
    }

    try {
      const res = await updateProductAction(product.id, formData);
      if (res.success) {
        setIsSaved(true);
        setTimeout(() => {
          router.push("/dashboard/products");
          router.refresh();
        }, 1500);
      } else {
        alert(res.error || "Güncelleme başarısız.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto text-[#1A1A1A] pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard/products"
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-black/5 hover:bg-zinc-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-zinc-500" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Ürünü Düzenle</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Ürün detaylarını, paket içeriğini ve SSS maddelerini güncelleyin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Kolon - Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Ürün Tipi */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm"
          >
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">1. Ürün Tipi</h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setProductType("digital")}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  productType === "digital" 
                    ? "border-[#0288D1] bg-[#0288D1]/5 text-[#0288D1]" 
                    : "border-black/5 hover:border-black/10 text-zinc-500"
                }`}
              >
                <FileText className="w-6 h-6" />
                <span className="text-xs font-bold">Dijital Ürün</span>
              </button>
              <button
                type="button"
                onClick={() => setProductType("calendar")}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  productType === "calendar" 
                    ? "border-[#F57C00] bg-[#F57C00]/5 text-[#F57C00]" 
                    : "border-black/5 hover:border-black/10 text-zinc-500"
                }`}
              >
                <CalendarDays className="w-6 h-6" />
                <span className="text-xs font-bold">Birebir Görüşme</span>
              </button>
              <button
                type="button"
                onClick={() => setProductType("subscription")}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  productType === "subscription" 
                    ? "border-[#FBC02D] bg-[#FBC02D]/10 text-[#B78103]" 
                    : "border-black/5 hover:border-black/10 text-zinc-500"
                }`}
              >
                <Lock className="w-6 h-6" />
                <span className="text-xs font-bold">Abonelik</span>
              </button>
            </div>
          </motion.div>

          {/* Temel Bilgiler */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
          >
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">2. Temel Bilgiler</h3>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Başlık</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ürün adı"
                className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none text-sm font-bold text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Açıklama</label>
              <textarea 
                rows={4} 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Ürün hakkında detaylı bilgi"
                className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none text-sm font-medium text-[#1A1A1A] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Fiyat (₺)</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Fiyat"
                className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none text-sm font-black text-[#1A1A1A]"
              />
            </div>
          </motion.div>

          {/* Görsel ve Dosya */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
          >
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">3. Görsel & Medya</h3>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-zinc-50 border border-black/5 overflow-hidden flex items-center justify-center flex-shrink-0">
                {icon ? (
                  <img src={icon.startsWith('data:') || icon.startsWith('http') ? icon : `/${icon}`} alt="Önizleme" className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-8 h-8 text-zinc-400" />
                )}
              </div>
              <div className="flex-1">
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  id="image-upload" 
                  onChange={handleImageUpload}
                />
                <label 
                  htmlFor="image-upload"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-[#1A1A1A] text-xs font-bold rounded-xl cursor-pointer transition-colors"
                >
                  Yeni Görsel Yükle
                </label>
                <p className="text-xs text-zinc-400 mt-2 font-medium">PNG, JPG veya WebP. Maksimum 5MB.</p>
              </div>
            </div>

            {productType === "digital" && (
              <div className="pt-4 border-t border-black/5">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Teslim Edilecek Dosya (Vercel Blob)
                </label>
                <div 
                  className="border-2 border-dashed border-black/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={(e) => setProductFile(e.target.files?.[0] || null)}
                  />
                  <Upload className="w-8 h-8 text-zinc-400 mb-2" />
                  <p className="text-xs font-bold text-[#1A1A1A]">
                    {productFile ? productFile.name : (product.fileUrl ? "Yeni Dosya Seç (Eskisinin yerini alır)" : "Tıklayın veya dosyayı seçin")}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">ZIP, PDF, MP4 veya RAR (Maks. 50MB)</p>
                </div>
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
            </div>

            <div className="space-y-3 bg-zinc-50 p-4 rounded-2xl border border-black/5">
              <input 
                type="text" 
                value={newFaqQ}
                onChange={(e) => setNewFaqQ(e.target.value)}
                placeholder="Soru: Örn. Görüşme saatini nasıl belirleyeceğim?" 
                className="w-full px-4 py-2.5 rounded-xl border border-black/5 bg-white focus:ring-2 focus:ring-[#D32F2F]/20 outline-none text-xs font-bold text-[#1A1A1A]"
              />
              <textarea 
                rows={2}
                value={newFaqA}
                onChange={(e) => setNewFaqA(e.target.value)}
                placeholder="Cevap: Ödemenizi yaptıktan sonra canlı takvimden istediğiniz saati seçebilirsiniz..." 
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

          {/* Kaydet Butonları */}
          <div className="flex items-center justify-between pt-6">
            <button 
              type="button"
              onClick={() => router.push("/dashboard/products")}
              className="px-6 py-3.5 text-sm font-bold text-zinc-500 hover:text-[#1A1A1A] transition-colors"
            >
              İptal Et
            </button>
            <button 
              type="button"
              onClick={handleSave}
              disabled={!title || !price || isSubmitting}
              className={`px-10 py-4 text-white text-sm font-bold rounded-2xl transition-all shadow-md active:scale-95 disabled:opacity-50 ${
                isSaved ? 'bg-green-600' : 'bg-[#D32F2F] hover:bg-[#B71C1C]'
              }`}
            >
              {isSubmitting ? "Güncelleniyor..." : isSaved ? "Güncellendi!" : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </div>

        {/* Sağ Kolon - Önizleme */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Önizleme</h3>
            <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/5 p-6 space-y-4">
              <div className="w-full aspect-square rounded-2xl bg-zinc-50 border border-black/5 overflow-hidden flex items-center justify-center">
                {icon ? (
                  <img src={icon.startsWith('data:') || icon.startsWith('http') ? icon : `/${icon}`} alt="Önizleme" className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-12 h-12 text-zinc-300" />
                )}
              </div>
              <h4 className="text-xl font-black text-[#1A1A1A] line-clamp-2 leading-tight">
                {title || "Ürün İsmi"}
              </h4>
              <p className="text-xs font-medium text-zinc-500 line-clamp-2">
                {desc || "Açıklama metni burada görünecek..."}
              </p>
              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <span className="text-2xl font-black text-[#1A1A1A]">
                  {price ? `₺${parseFloat(price).toLocaleString("tr-TR")}` : "₺0.00"}
                </span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  ✓ {features.length} Madde
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
