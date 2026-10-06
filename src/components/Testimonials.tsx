"use client";

import { ScrollReelTestimonials } from "./ui/scroll-reel-testimonials";

const TESTIMONIALS = [
  {
    quote: "Kreo'ye geçtiğim günden beri e-kitap satışlarım ikiye katlandı. Stripe açmakla uğraşmamak büyük lüks.",
    author: "Caner Yıldırım - Tasarımcı",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", // Abstract 3D liquid
    alt: "Caner Yıldırım - Tasarım",
  },
  {
    quote: "Özel topluluğumu yönetmek için farklı farklı araçlar kullanıyordum. Şimdi hem abonelikler hem de canlı yayınlar tek bir linkte.",
    author: "Zeynep Arslan - Fitness Eğitmeni",
    image: "https://images.unsplash.com/photo-1554244933-d876deb6b2ff?q=80&w=800&auto=format&fit=crop", // Abstract neon lines
    alt: "Zeynep Arslan - Fitness",
  },
  {
    quote: "1:1 danışmanlık takvimimi buraya taşıdım. Müşteri saati seçiyor, ödemeyi yapıyor ve fatura otomatik kesiliyor. Gerçekten muazzam.",
    author: "Ahmet Yılmaz - Yazılım Danışmanı",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", // Abstract tech 3D mesh
    alt: "Ahmet Yılmaz - Yazılım",
  },
  {
    quote: "Türkiye'de içerik üreticileri için bu kadar premium hissettiren ve iyzico ile bu kadar sorunsuz çalışan başka bir platform yok.",
    author: "Mert Sönmez - YouTuber",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop", // Abstract 3D glowing sphere
    alt: "Mert Sönmez - YouTube",
  },
];

export default function Testimonials() {
  return (
    <section id="musteri-yorumlari" className="relative z-10  py-24 md:py-32 border-t border-black/5">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-widest text-[#D32F2F] uppercase">
            BAŞARI HİKAYELERİ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#1A1A1A] mt-3">
            Onlar başardı, sıra sende.
          </h2>
          <p className="text-zinc-700 text-base md:text-lg mt-4 max-w-lg mx-auto leading-relaxed">
            Türkiye'nin dört bir yanından içerik üreticileri, işlerini Kreo ile ölçeklendiriyor.
          </p>
        </div>

        {/* Yeni Eklenen 21st.dev Scroll Reel Bileşeni */}
        <div className="w-full flex justify-center">
          <ScrollReelTestimonials testimonials={TESTIMONIALS} charStaggerMs={10} />
        </div>

      </div>
    </section>
  );
}
