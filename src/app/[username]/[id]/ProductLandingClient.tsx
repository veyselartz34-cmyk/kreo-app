"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, Check, ShieldCheck, Zap, Lock, 
  Share2, Calendar, FileText, ChevronDown, Sparkles, ExternalLink,
  Star, CheckCircle2, Clock, Award, Shield
} from "lucide-react";
import { Playfair_Display } from "next/font/google";
import MouseGlow from "@/components/MouseGlow";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  style: "italic",
  weight: "700" 
});

const NEUTRAL_AVATAR = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop";

type ProductDetails = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  icon?: string | null;
  color?: string | null;
  fileSize?: string | null;
  features?: string | null;
  faqs?: string | null;
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
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

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

  const isConsulting = product.type.includes("Görüşme") || product.type.includes("Gorusme") || product.type.includes("Danışmanlık") || product.type.includes("Seans");
  const isSubscription = product.type.includes("Abonelik") || product.type.includes("Topluluk");

  // Özel paket içeriği kontrolü
  let customFeatures: string[] | null = null;
  if (product.features) {
    try {
      const parsed = JSON.parse(product.features);
      if (Array.isArray(parsed) && parsed.length > 0) {
        customFeatures = parsed.filter(Boolean);
      }
    } catch {
      const lines = product.features.split("\n").map(l => l.trim()).filter(Boolean);
      if (lines.length > 0) customFeatures = lines;
    }
  }

  const defaultIncludedItems = isConsulting
    ? [
        "60 Dakika Birebir Canlı Seans (Google Meet)",
        "Görüşme Öncesi Hazırlık ve İhtiyaç Analizi",
        "Görüşme Sonrası Kişisel Yol Haritası ve Eylem Planı (PDF)",
        "HD Video ve Ses Kaydı Arşivi",
        "14 Gün Boyunca E-posta ile Takip ve Soru-Cevap Desteği",
      ]
    : isSubscription
    ? [
        "Tüm Özel İçerik ve Dijital Kütüphaneye Sınırsız Erişim",
        "Haftalık Düzenli Canlı Yayınlar ve Yeni Kaynaklar",
        "Özel Topluluk Kanalı (Discord) Erişimi",
        "İstediğiniz Zaman Tek Tıkla İptal Edebilme Esnekliği",
      ]
    : [
        "Orijinal Şablon ve Dijital Kaynak Dosyaları (Notion / PSD / PDF)",
        "Adım Adım Kurulum ve Hızlı Başlangıç Rehberi",
        "Ömür Boyu Ücretsiz Güncellemeler ve Yeni Versiyonlar",
        "Tüm Cihazlarla (Masaüstü, Tablet, Mobil) %100 Uyum",
        "Tek Seferlik Ödeme ile Sınırsız Kullanım Hakkı",
      ];

  const includedItems = (customFeatures && customFeatures.length > 0) ? customFeatures : defaultIncludedItems;

  // Özel SSS kontrolü
  let customFaqs: { q: string; a: string }[] | null = null;
  if (product.faqs) {
    try {
      const parsed = JSON.parse(product.faqs);
      if (Array.isArray(parsed) && parsed.length > 0) {
        customFaqs = parsed.filter(f => f.q && f.a);
      }
    } catch {}
  }

  const defaultFaqs = isConsulting
    ? [
        {
          q: "Görüşme tarihi ve saatini nasıl belirleyeceğim?",
          a: "Ödemenizi tamamladıktan sonra canlı takvimimizden sizin için en uygun gün ve saati tek tıkla seçebileceksiniz. Randevu onayınız ve Google Meet toplantı linkiniz anında e-postanıza iletilir.",
        },
        {
          q: "Görüşmeye nasıl katılacağım?",
          a: "Seçtiğiniz tarih ve saatte doğrudan Google Meet bağlantısı üzerinden katılabilirsiniz. Herhangi bir ekstra yazılım kurmanıza gerek yoktur.",
        },
        {
          q: "Görüşmeyi erteleyebilir miyim?",
          a: "Randevu saatinizden en geç 24 saat öncesine kadar e-posta veya panel üzerinden yeni bir güne kolayca erteleyebilirsiniz.",
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
          a: "İndirdiğiniz paketin içinde adım adım rehber yer almaktadır. Birkaç dakika içinde kullanmaya başlayabilirsiniz.",
        },
        {
          q: "Teknik bir sorun yaşarsam kime ulaşabilirim?",
          a: "Herhangi bir sorun yaşarsanız satıcı profili üzerinden doğrudan satıcıya ulaşabilir veya e-posta ile destek talep edebilirsiniz.",
        },
      ];

  const faqs = (customFaqs && customFaqs.length > 0) ? customFaqs : defaultFaqs;

  // Güvenli profil görseli
  const displayAvatar = creator.avatar && !creator.avatar.includes("53994a69daeb")
    ? creator.avatar
    : NEUTRAL_AVATAR;

  // İsim vurgulama: Soyadı Playfair Display italic
  const nameParts = (creator.name || "Kreo Üreticisi").trim().split(" ");
  const firstName = nameParts.slice(0, -1).join(" ") || nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] pb-32 font-sans relative selection:bg-[#F57C00]/20 selection:text-[#1A1A1A]">
      <MouseGlow />

      {/* 1. ÜST YÜZEN CAM NAVBAR (Floating Glass Navbar) */}
      <nav className="sticky top-4 z-40 max-w-5xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-xl border border-black/[0.08] rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.04)] px-5 py-3 flex items-center justify-between transition-all">
          <Link 
            href={`/${creator.username}`} 
            className="inline-flex items-center gap-2.5 text-xs font-bold text-zinc-600 hover:text-[#1A1A1A] transition-colors group"
          >
            <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            </div>
            <span className="hidden sm:inline font-semibold">{creator.name} Vitrini</span>
            <span className="sm:hidden font-semibold">Vitrin</span>
          </Link>

          {/* Orta Bilgi: Satıcı Avatarı & Adı */}
          <Link 
            href={`/${creator.username}`}
            className="flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-black/5 rounded-full hover:bg-zinc-100 transition-colors"
          >
            <img src={displayAvatar} alt={creator.name} className="w-5 h-5 rounded-full object-cover" />
            <span className="text-xs font-bold text-zinc-800">@{creator.username}</span>
          </Link>

          {/* Sağ Aksiyonlar: Paylaş & Sıcak Degrade Satın Al */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-black/10 rounded-full text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-2xs"
              title="Ürün Linkini Kopyala"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-zinc-500" />}
              <span className="hidden sm:inline">{copied ? "Kopyalandı" : "Paylaş"}</span>
            </button>

            <Link
              href={`/checkout/${product.id}`}
              className="relative group/navbtn overflow-hidden px-5 py-2 rounded-full text-white text-xs font-bold shadow-[0_4px_18px_rgba(245,124,0,0.35)] hover:shadow-[0_6px_25px_rgba(245,124,0,0.5)] hover:scale-105 active:scale-95 transition-all bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100]"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover/navbtn:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Satın Al</span>
                <span className="font-mono">₺{product.price.toLocaleString("tr-TR")}</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. ANA İÇERİK IZGARASI (Bento Layout) */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 md:pt-14 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-20">
          
          {/* Sol Kolon: Ürün Detayları, Görsel ve İçerik (7 Sütun) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Ürün Türü Rozeti */}
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-50 text-[#D32F2F] border border-orange-200/60 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" />
                {product.type}
              </span>
              <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Doğrulanmış Dijital İçerik
              </span>
            </div>

            {/* Ürün Başlığı */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tight leading-[1.15]">
              {product.title}
            </h1>

            {/* Büyük Ürün Görseli / Vitrin Kutusu */}
            <div className="relative aspect-[16/10] w-full rounded-[2.5rem] bg-white border border-black/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.03)] overflow-hidden flex items-center justify-center p-2 group">
              {product.icon ? (
                <img 
                  src={product.icon} 
                  alt={product.title} 
                  className="w-full h-full object-cover rounded-[2rem] group-hover:scale-[1.02] transition-transform duration-700" 
                />
              ) : (
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center bg-orange-50 border border-orange-100 text-[#D32F2F] shadow-inner">
                  {isConsulting ? (
                    <Calendar className="w-12 h-12 text-[#F57C00]" />
                  ) : (
                    <FileText className="w-12 h-12 text-[#F57C00]" />
                  )}
                </div>
              )}
            </div>

            {/* Ürün Açıklaması Kartı */}
            <div className="bg-white p-7 sm:p-9 rounded-[2rem] border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-4">
              <h3 className="text-lg font-black text-[#1A1A1A] flex items-center gap-2">
                <span>Ürün Hakkında Detaylar</span>
              </h3>
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium whitespace-pre-line">
                {product.description || "Bu ürün için henüz detaylı bir açıklama girilmedi."}
              </p>
            </div>

            {/* Bu Pakette Neler Var? (What's Included) */}
            <div className="bg-white p-7 sm:p-9 rounded-[2rem] border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-[#1A1A1A]">Bu Pakette Neler Var?</h3>
                <span className="text-xs font-bold text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-full border border-black/5">
                  {includedItems.length} Madde
                </span>
              </div>

              <div className="space-y-3.5">
                {includedItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3 rounded-2xl bg-zinc-50/60 border border-black/[0.03] transition-colors hover:bg-zinc-50">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sıkça Sorulan Sorular (Accordion) */}
            <div className="bg-white p-7 sm:p-9 rounded-[2rem] border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-5">
              <h3 className="text-lg font-black text-[#1A1A1A]">Sıkça Sorulan Sorular</h3>
              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-black/[0.06] rounded-2xl overflow-hidden transition-colors hover:border-black/15 bg-white"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#1A1A1A]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown 
                          className={`w-4 h-4 text-zinc-400 transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? "rotate-180 text-[#D32F2F]" : ""
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
                            className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed border-t border-black/[0.04] pt-3.5"
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
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Satın Alma Kutusu (Warm Gradient Action Card) */}
            <div className="bg-white p-7 sm:p-9 rounded-[2.5rem] border border-black/[0.08] shadow-[0_8px_35px_rgba(0,0,0,0.05)] space-y-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100]" />
              
              {/* Fiyat Alanı */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
                  TOPLAM TUTAR
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight">
                    ₺{product.price.toLocaleString("tr-TR")}
                  </span>
                  <span className="text-xs font-bold text-zinc-400">
                    {isSubscription ? "/ aylık" : "/ tek seferlik"}
                  </span>
                </div>
              </div>

              {/* İmza Sıcak Degrade Satın Alma Butonu */}
              <div className="space-y-3">
                <Link
                  href={`/checkout/${product.id}`}
                  className="relative group/btn overflow-hidden w-full py-4 px-6 rounded-2xl text-white text-base font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_25px_rgba(245,124,0,0.35)] hover:shadow-[0_8px_35px_rgba(245,124,0,0.5)] bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100]"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                  
                  <span className="relative z-10 flex items-center gap-2.5">
                    <span>{isConsulting ? "Hemen Randevu Oluştur" : "Hemen Satın Al"}</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <p className="text-[11px] text-center text-zinc-400 font-medium">
                  {isConsulting 
                    ? "Satın alma sonrası dilediğiniz gün ve saati seçebilirsiniz." 
                    : "Ödeme sonrası dosyalarınız anında ekranda açılır."}
                </p>
              </div>

              {/* Güven Rozetleri */}
              <div className="pt-6 border-t border-black/5 space-y-3 text-xs font-bold text-zinc-600">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100/60">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>256-Bit SSL Şifreli Güvenli Ödeme</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F57C00] flex items-center justify-center flex-shrink-0 border border-orange-100/60">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span>{isConsulting ? "Anında Otomatik Takvim Onayı" : "Anında Dijital Dosya Teslimatı"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-100/60">
                    <Award className="w-4 h-4" />
                  </div>
                  <span>Doğrulanmış Kreo Satıcısı Güvencesi</span>
                </div>
              </div>
            </div>

            {/* Satıcı Mini Profil Kartı */}
            <div className="bg-white p-6 sm:p-7 rounded-[2rem] border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-black/5 overflow-hidden bg-zinc-50 flex-shrink-0">
                  <img src={displayAvatar} alt={creator.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-black text-[#1A1A1A] truncate">
                    <span>{firstName} </span>
                    {lastName && (
                      <span className={`${playfair.className} bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100] bg-clip-text text-transparent`}>
                        {lastName}
                      </span>
                    )}
                  </h4>
                  <Link 
                    href={`/${creator.username}`} 
                    className="text-xs font-bold text-zinc-400 hover:text-[#D32F2F] transition-colors"
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

        {/* 3. SATICININ DİĞER ÜRÜNLERİ */}
        {otherProducts.length > 0 && (
          <div className="pt-16 border-t border-black/5 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Satıcının Diğer Ürünleri</h3>
                <p className="text-sm font-medium text-zinc-500 mt-1">İlginizi çekebilecek diğer popüler içerikler</p>
              </div>
              <Link 
                href={`/${creator.username}`} 
                className="text-xs font-bold text-[#D32F2F] hover:underline flex items-center gap-1"
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
                  className="group bg-white p-5 rounded-3xl border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:border-black/15 transition-all flex flex-col h-full"
                >
                  <div className="relative w-full aspect-[16/10] bg-zinc-50 rounded-2xl overflow-hidden flex items-center justify-center mb-4">
                    {p.icon ? (
                      <img src={p.icon} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-50 text-[#F57C00]">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] shadow-xs">
                      {p.type}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-[#1A1A1A] mb-2 line-clamp-1 group-hover:text-[#D32F2F] transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs font-medium text-zinc-500 line-clamp-2 mb-4 flex-1 leading-relaxed">
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

      {/* 4. YAPIŞKAN ALT BAR (Mobile & Scroll Sticky Bar) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-t border-black/[0.08] p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]"
          >
            <div className="max-w-5xl mx-auto px-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {product.icon ? (
                    <img src={product.icon} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-[#F57C00]" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-[#1A1A1A] truncate">{product.title}</p>
                  <p className="text-xs font-bold text-[#D32F2F]">
                    ₺{product.price.toLocaleString("tr-TR")}
                  </p>
                </div>
              </div>

              <Link
                href={`/checkout/${product.id}`}
                className="relative group/barbtn overflow-hidden px-7 py-3 rounded-xl text-white text-sm font-bold shadow-[0_4px_20px_rgba(245,124,0,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0 bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100]"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover/barbtn:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10 flex items-center gap-2">
                  <span>Satın Al</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
