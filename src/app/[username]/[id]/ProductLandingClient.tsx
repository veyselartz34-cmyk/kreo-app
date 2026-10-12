"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, Check, ShieldCheck, Zap, Lock, 
  Share2, Calendar, FileText, ChevronDown, Sparkles, ExternalLink,
  Star, CheckCircle2, Copy, AlertCircle
} from "lucide-react";

type ProductDetails = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  icon?: string | null;
  color?: string | null;
  fileSize?: string | null;
  createdAt: string;
};

type CreatorDetails = {
  name: string;
  username: string;
  avatar?: string | null;
  bio?: string | null;
  themeColor: string;
  socialInstagram?: string | null;
  socialTwitter?: string | null;
  socialYoutube?: string | null;
  socialLinkedin?: string | null;
  socialTiktok?: string | null;
  socialWebsite?: string | null;
};

type RelatedProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  icon?: string | null;
};

export default function ProductLandingClient({
  product,
  creator,
  otherProducts,
}: {
  product: ProductDetails;
  creator: CreatorDetails;
  otherProducts: RelatedProduct[];
}) {
  const activeColor = creator.themeColor || "#1A1A1A";
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Sayfa kaydırıldığında yapışkan alt çubuğu göster
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const isConsulting = product.type.includes("Görüşme") || product.type.includes("Gorusme") || product.type.includes("Danışmanlık");
  const isSubscription = product.type.includes("Abonelik");

  // Türe göre "Neler Dahil?" maddeleri
  const includedItems = isConsulting
    ? [
        "60 Dakika Birebir Canlı Seans (Google Meet / Zoom)",
        "Görüşme Öncesi Hazırlık ve İhtiyaç Analizi Formu",
        "Görüşme Sonrası Kişisel Yol Haritası ve Eylem Planı Notları",
        "Kayıtlı Video ve Ses Kaydı Erişimi",
        "7 Gün Boyunca E-posta ile Takip ve Soru-Cevap Desteği",
      ]
    : isSubscription
    ? [
        "Tüm Özel İçerik ve Dijital Kütüphaneye Sınırsız Erişim",
        "Haftalık Düzenli Güncellemeler ve Yeni Kaynaklar",
        "Özel Topluluk Kanalı Erişimi",
        "İstediğiniz Zaman Tek Tıkla İptal Edebilme Esnekliği",
      ]
    : [
        "Orijinal Şablon ve Dijital Kaynak Dosyaları",
        "Adım Adım Kurulum ve Hızlı Başlangıç Rehberi",
        "Ömür Boyu Ücretsiz Güncellemeler ve Yeni Versiyonlar",
        "Tüm Cihazlarla (Masaüstü, Tablet, Mobil) %100 Uyum",
        "Tek Seferlik Ödeme ile Sınırsız Kullanım Hakkı",
      ];

  // Sıkça Sorulan Sorular
  const faqs = isConsulting
    ? [
        {
          q: "Görüşme tarihi ve saatini nasıl belirleyeceğim?",
          a: "Ödemenizi tamamladıktan sonra satıcının canlı takviminden sizin için en uygun gün ve saati tek tıkla seçebileceksiniz. Randevu onayınız ve toplantı linkiniz anında e-postanıza iletilir.",
        },
        {
          q: "Görüşmeye nasıl katılacağım?",
          a: "Seçtiğiniz tarih ve saatte doğrudan Google Meet veya Zoom bağlantısı üzerinden katılabilirsiniz. Herhangi bir ekstra yazılım kurmanıza gerek yoktur.",
        },
        {
          q: "Görüşmeyi erteleyebilir veya iptal edebilir miyim?",
          a: "Randevu saatinden en geç 24 saat öncesine kadar panel üzerinden veya e-posta ile yeni bir tarihe kolayca erteleyebilirsiniz.",
        },
      ]
    : [
        {
          q: "Satın aldıktan sonra dosyalarıma nasıl ulaşırım?",
          a: "Ödemeniz onaylandığı anda indirme butonu doğrudan ekranda açılır. Ayrıca indirme bağlantısı ve faturanız kayıtlı e-posta adresinize anında gönderilir.",
        },
        {
          q: "Bu ürün için ek bir abonelik veya gizli ücret var mı?",
          a: "Hayır. Bu tek seferlik bir ödemedir. Bir kez satın aldıktan sonra tüm dosyalara ve gelecekteki güncellemelere ömür boyu sahip olursunuz.",
        },
        {
          q: "Dosyaları nasıl kurup kullanacağım?",
          a: "İndirdiğiniz paketin içinde adım adım resimli kullanım ve kurulum kılavuzu yer almaktadır. Birkaç dakika içinde kullanmaya başlayabilirsiniz.",
        },
        {
          q: "Teknik bir sorun yaşarsam kime ulaşabilirim?",
          a: "Herhangi bir sorun yaşarsanız bu sayfadaki satıcı profili üzerinden doğrudan satıcıya ulaşabilir veya e-posta ile destek talep edebilirsiniz.",
        },
      ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] pb-32 font-sans selection:bg-[#FBC02D] selection:text-[#1A1A1A] relative">
      {/* Arka Plan Işıltısı */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] blur-[150px] rounded-full pointer-events-none -z-10 opacity-70"
        style={{ background: `radial-gradient(circle, ${activeColor}20 0%, transparent 70%)` }}
      />

      {/* Üst Gezinti Barı */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link 
            href={`/${creator.username}`} 
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#1A1A1A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{creator.name} Vitrinine Dön</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/5 rounded-full text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm"
              title="Ürün Linkini Kopyala"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5 text-zinc-500" />}
              <span>{copied ? "Kopyalandı!" : "Paylaş"}</span>
            </button>
            <Link
              href={`/checkout/${product.id}`}
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 text-white text-xs font-black rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
              style={{ backgroundColor: activeColor }}
            >
              <span>Satın Al</span>
              <span>₺{product.price.toLocaleString("tr-TR")}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-14">
        
        {/* Üst Hero Grid: Görsel ve Satın Alma Kutusu */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20">
          
          {/* Sol Kolon: Büyük Ürün Görseli & Başlık (7 Sütun) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Ürün Türü Rozeti */}
            <div className="flex items-center gap-2">
              <span 
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm"
                style={{ 
                  color: activeColor, 
                  backgroundColor: `${activeColor}10`,
                  borderColor: `${activeColor}20` 
                }}
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                {product.type}
              </span>
              <span className="text-xs font-semibold text-zinc-400">
                • Doğrulanmış Dijital İçerik
              </span>
            </div>

            {/* Ürün Başlığı */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* Büyük Ürün Görseli / Vitrin Kutusu */}
            <div className="relative aspect-[16/10] w-full rounded-[2.5rem] bg-white border border-black/5 shadow-xl shadow-black/5 overflow-hidden flex items-center justify-center p-8 group">
              {product.icon ? (
                <img 
                  src={product.icon} 
                  alt={product.title} 
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700" 
                />
              ) : (
                <div 
                  className="w-28 h-28 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-inner"
                  style={{ backgroundColor: `${activeColor}15` }}
                >
                  {isConsulting ? (
                    <Calendar className="w-14 h-14" style={{ color: activeColor }} />
                  ) : (
                    <FileText className="w-14 h-14" style={{ color: activeColor }} />
                  )}
                </div>
              )}
            </div>

            {/* Açıklama */}
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-black/5 shadow-sm space-y-4">
              <h3 className="text-xl font-black text-[#1A1A1A]">Ürün Hakkında Detaylar</h3>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-medium whitespace-pre-line">
                {product.description || "Bu ürün için henüz detaylı bir açıklama girilmedi."}
              </p>
            </div>

            {/* Bu Pakette Neler Var? (What's Included) */}
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-[#1A1A1A]">Bu Pakette Neler Var?</h3>
              <div className="space-y-4">
                {includedItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white"
                      style={{ backgroundColor: activeColor }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-sm md:text-base font-bold text-zinc-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sıkça Sorulan Sorular */}
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-[#1A1A1A]">Sıkça Sorulan Sorular</h3>
              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-black/5 rounded-2xl overflow-hidden transition-colors hover:border-black/10"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base text-[#1A1A1A]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown 
                          className={`w-4 h-4 text-zinc-400 transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? "rotate-180" : ""
                          }`} 
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-5 pb-5 text-sm text-zinc-600 font-medium leading-relaxed border-t border-black/5 pt-3"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sağ Kolon: Yapışkan Satın Alma & Satıcı Kartı (5 Sütun) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Satın Alma Kartı */}
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/5 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: activeColor }} />
              
              {/* Fiyat Alanı */}
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Toplam Fiyat</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight">
                    ₺{product.price.toLocaleString("tr-TR")}
                  </span>
                  <span className="text-xs font-bold text-zinc-400">/ tek seferlik</span>
                </div>
              </div>

              {/* Satın Al Aksiyon Butonu */}
              <div className="space-y-3">
                <Link
                  href={`/checkout/${product.id}`}
                  className="w-full py-4 px-6 text-white text-base font-black rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-102 active:scale-98 shadow-xl"
                  style={{ 
                    backgroundColor: activeColor,
                    boxShadow: `0 12px 30px ${activeColor}40`
                  }}
                >
                  <span>{isConsulting ? "Hemen Randevu Oluştur" : "Hemen Satın Al"}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <p className="text-[11px] text-center text-zinc-400 font-medium">
                  {isConsulting 
                    ? "Satın alma sonrası dilediğiniz saati seçebilirsiniz." 
                    : "Ödeme sonrası dosyalarınız anında ekranda açılır."}
                </p>
              </div>

              {/* Güven Rozetleri */}
              <div className="pt-6 border-t border-black/5 space-y-3.5 text-xs font-bold text-zinc-600">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>256-Bit SSL Şifreli Güvenli Ödeme Altyapısı</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span>{isConsulting ? "Anında Otomatik Takvim Onayı" : "Anında Dijital Dosya Teslimatı"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <span>Doğrulanmış Kreo Satıcısı Garantisi</span>
                </div>
              </div>
            </div>

            {/* Satıcı Mini Profil Kartı */}
            <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-black/5 overflow-hidden bg-zinc-50 flex-shrink-0">
                  {creator.avatar ? (
                    <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-black text-white" style={{ backgroundColor: activeColor }}>
                      {creator.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-base font-black text-[#1A1A1A]">{creator.name}</h4>
                  <Link 
                    href={`/${creator.username}`} 
                    className="text-xs font-bold hover:underline"
                    style={{ color: activeColor }}
                  >
                    kreo.app/{creator.username}
                  </Link>
                </div>
              </div>

              {creator.bio && (
                <p className="text-xs font-medium text-zinc-500 leading-relaxed line-clamp-3">
                  {creator.bio}
                </p>
              )}

              <Link
                href={`/${creator.username}`}
                className="w-full py-3 px-4 bg-zinc-50 hover:bg-zinc-100 rounded-xl text-xs font-bold text-[#1A1A1A] flex items-center justify-center gap-2 transition-colors border border-black/5"
              >
                <span>Satıcının Tüm Vitrinini Gör</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </Link>
            </div>

          </div>

        </div>

        {/* Satıcının Diğer Ürünleri */}
        {otherProducts.length > 0 && (
          <div className="pt-16 border-t border-black/5 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#1A1A1A]">Satıcının Diğer Ürünleri</h3>
                <p className="text-sm font-medium text-zinc-500 mt-1">İlginizi çekebilecek diğer popüler içerikler</p>
              </div>
              <Link 
                href={`/${creator.username}`} 
                className="text-xs font-bold hover:underline flex items-center gap-1"
                style={{ color: activeColor }}
              >
                <span>Tümünü Gör</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/${creator.username}/${p.id}`}
                  className="group bg-white p-5 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:border-black/10 transition-all flex flex-col h-full"
                >
                  <div className="relative w-full aspect-[16/10] bg-zinc-50 rounded-2xl overflow-hidden flex items-center justify-center mb-4">
                    {p.icon ? (
                      <img src={p.icon} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${activeColor}15` }}>
                        <FileText className="w-6 h-6" style={{ color: activeColor }} />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] shadow-sm">
                      {p.type}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-[#1A1A1A] mb-2 line-clamp-1 group-hover:text-[#D32F2F] transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs font-medium text-zinc-500 line-clamp-2 mb-4 flex-1">
                    {p.description}
                  </p>

                  <div className="pt-3 border-t border-black/5 flex items-center justify-between mt-auto">
                    <span className="text-base font-black text-[#1A1A1A]">
                      ₺{p.price.toLocaleString("tr-TR")}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-[#1A1A1A] transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Yapışkan Alt Bar (Sticky Bar - Sayfa Kaydırıldığında Görünür) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-t border-black/5 p-4 shadow-2xl"
          >
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-black/5"
                  style={{ backgroundColor: `${activeColor}12` }}
                >
                  {product.icon ? (
                    <img src={product.icon} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Sparkles className="w-5 h-5" style={{ color: activeColor }} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-[#1A1A1A] truncate">{product.title}</p>
                  <p className="text-xs font-bold" style={{ color: activeColor }}>
                    ₺{product.price.toLocaleString("tr-TR")}
                  </p>
                </div>
              </div>

              <Link
                href={`/checkout/${product.id}`}
                className="px-8 py-3 text-white text-sm font-black rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0"
                style={{ backgroundColor: activeColor }}
              >
                <span>Satın Al</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
