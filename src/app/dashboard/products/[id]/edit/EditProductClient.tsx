"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, FileText, CalendarDays, Lock, Info, CheckCircle2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { updateProductAction } from "@/app/actions/productActions";

export default function EditProductClient({ product }: { product: any }) {
  const router = useRouter();
  
  const mapTypeToValue = (type: string) => {
    if (type === "Birebir Görüşme" || type === "Birebir Gorusme") return "calendar";
    if (type === "Abonelik") return "subscription";
    return "digital";
  };

  const [productType, setProductType] = useState(mapTypeToValue(product.type));
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.description || "");
  const [price, setPrice] = useState(product.price.toString());
  const [icon, setIcon] = useState(product.icon || "");
  
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productFile, setProductFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div className="max-w-4xl mx-auto text-[#1A1A1A] pb-24">
      <div className="flex items-center gap-4 mb-10">
        <Link 
          href="/dashboard/products"
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-black/5 hover:bg-zinc-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-zinc-500" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Ürünü Düzenle</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Ürün detaylarını güncelle</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Kolon - Form */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm"
          >
            <h3 className="text-xl font-black text-[#1A1A1A] mb-8">Ürün Tipi Seçimi</h3>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => setProductType("digital")}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${productType === "digital" ? 'border-[#D32F2F] bg-red-50/50 text-[#D32F2F]' : 'border-transparent bg-zinc-50 hover:bg-zinc-100 text-zinc-500'}`}
              >
                <FileText className="w-6 h-6" />
                <span className="text-sm font-bold">Dijital Ürün</span>
              </button>
              <button 
                onClick={() => setProductType("calendar")}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${productType === "calendar" ? 'border-[#D32F2F] bg-red-50/50 text-[#D32F2F]' : 'border-transparent bg-zinc-50 hover:bg-zinc-100 text-zinc-500'}`}
              >
                <CalendarDays className="w-6 h-6" />
                <span className="text-sm font-bold text-center">Birebir Görüşme</span>
              </button>
              <button 
                onClick={() => setProductType("subscription")}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${productType === "subscription" ? 'border-[#D32F2F] bg-red-50/50 text-[#D32F2F]' : 'border-transparent bg-zinc-50 hover:bg-zinc-100 text-zinc-500'}`}
              >
                <Lock className="w-6 h-6" />
                <span className="text-sm font-bold text-center">Özel Topluluk</span>
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
          >
            <h3 className="text-xl font-black text-[#1A1A1A] mb-4">Temel Bilgiler</h3>
            
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Ürün İsmi</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Profesyonel Notion Şablonu"
                className="w-full px-5 py-4 bg-zinc-50 border border-black/5 rounded-2xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-[#D32F2F]/30 outline-none transition-all placeholder:text-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Açıklama (Opsiyonel ama önerilir)</label>
              <textarea 
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Bu ürün müşteriye tam olarak ne sunuyor?"
                className="w-full px-5 py-4 bg-zinc-50 border border-black/5 rounded-2xl text-sm font-medium text-[#1A1A1A] focus:ring-2 focus:ring-[#D32F2F]/30 outline-none transition-all placeholder:text-zinc-400 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Satış Fiyatı (₺)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-5 py-4 bg-zinc-50 border border-black/5 rounded-2xl text-xl font-black text-[#1A1A1A] focus:ring-2 focus:ring-[#D32F2F]/30 outline-none transition-all placeholder:text-zinc-300"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm"
          >
            <h3 className="text-xl font-black text-[#1A1A1A] mb-2">Görsel / Kapak</h3>
            <p className="text-sm text-zinc-500 font-medium mb-6">Satışları artırmak için çarpıcı bir kapak yükleyin.</p>
            
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-zinc-50 border border-black/5 overflow-hidden flex items-center justify-center flex-shrink-0 relative">
                {icon ? (
                  <img src={icon.startsWith('data:') || icon.startsWith('http') ? icon : `/${icon}`} alt="Kapak" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-8 h-8 text-zinc-300" />
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
                  className="inline-flex items-center justify-center px-6 py-3 bg-zinc-100 text-[#1A1A1A] text-sm font-bold rounded-xl cursor-pointer hover:bg-zinc-200 transition-colors"
                >
                  Yeni Görsel Yükle
                </label>
                <p className="text-xs text-zinc-500 mt-2 font-medium">Önerilen boyut: 1080x1080px (Kare). Maksimum 5MB.</p>
              </div>
            </div>
          </motion.div>

          {/* SADECE DİJİTAL ÜRÜNSE DOSYA YÜKLEME ÇIKAR */}
          {productType === "digital" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm"
            >
              <h3 className="text-xl font-black text-[#1A1A1A] mb-2">Dijital Dosya</h3>
              <p className="text-sm text-zinc-500 font-medium mb-6">Yeni bir dosya yüklerseniz eskisinin yerini alır.</p>
              
              <div className="border-2 border-dashed border-black/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={(e) => setProductFile(e.target.files?.[0] || null)}
                />
                <Upload className="w-10 h-10 text-zinc-400 mb-4" />
                <h4 className="text-sm font-bold text-[#1A1A1A] mb-1">
                  {productFile ? productFile.name : (product.fileUrl ? "Yeni Dosya Seç (Eskisinin yerini alır)" : "Tıklayın veya dosyayı sürükleyin")}
                </h4>
                <p className="text-xs text-zinc-500 font-medium">ZIP, PDF, MP4 veya RAR (Maks 100MB)</p>
              </div>
              
              {product.fileUrl && !productFile && (
                 <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100 flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                   <div>
                     <p className="text-sm font-bold text-green-800">Sistemde yüklü bir dosya bulunuyor.</p>
                     <p className="text-xs text-green-600 mt-1">Boyut: {product.fileSize}</p>
                   </div>
                 </div>
              )}
            </motion.div>
          )}

          <div className="flex items-center justify-between pt-6">
            <button 
              onClick={() => router.push("/dashboard/products")}
              className="px-6 py-4 text-sm font-bold text-zinc-500 hover:text-[#1A1A1A] transition-colors"
            >
              İptal Et
            </button>
            <button 
              onClick={handleSave}
              disabled={!title || !price || isSubmitting}
              className={`px-10 py-4 text-white text-sm font-bold rounded-xl transition-all shadow-md transform hover:-translate-y-0.5 ${
                isSaved ? 'bg-green-500' : 'bg-[#D32F2F] hover:bg-[#B71C1C] disabled:opacity-50 disabled:transform-none'
              }`}
            >
              {isSubmitting ? "Güncelleniyor..." : isSaved ? "Güncellendi!" : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </div>

        {/* Sağ Kolon - Önizleme */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 px-2">Vitrin Önizlemesi</h3>
            <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)] p-6 group">
              <div className="w-full aspect-square rounded-2xl bg-zinc-50 border border-black/5 mb-6 overflow-hidden flex items-center justify-center">
                {icon ? (
                  <img src={icon.startsWith('data:') || icon.startsWith('http') ? icon : `/${icon}`} alt="Önizleme" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-black/5 flex items-center justify-center">
                    {productType === "digital" && <FileText className="w-8 h-8 text-blue-500" />}
                    {productType === "calendar" && <CalendarDays className="w-8 h-8 text-green-500" />}
                    {productType === "subscription" && <Lock className="w-8 h-8 text-orange-500" />}
                  </div>
                )}
              </div>
              <h4 className="text-xl font-black text-[#1A1A1A] line-clamp-2 leading-tight">
                {title || "Ürün İsmi"}
              </h4>
              <p className="text-sm font-medium text-zinc-500 mt-2 line-clamp-2">
                {desc || "Açıklama metni burada görünecek..."}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-black text-[#1A1A1A]">
                  {price ? `₺${price}` : "₺0.00"}
                </span>
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-[#D32F2F] group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4 items-start">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-blue-800 leading-relaxed">
                <strong className="block mb-1">Müşteri Deneyimi:</strong>
                Müşterileriniz vitrinden bu ürüne tıkladığında, ödeme ekranına gitmeden önce mükemmel bir tanıtım sayfasıyla karşılaşacak.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
