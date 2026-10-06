import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-black/10  pt-20 pb-10 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-2">
            <a href="#" className="text-xl font-bold tracking-tighter text-[#1A1A1A] flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
              </div>
              Kreo
            </a>
            <p className="text-sm text-zinc-700 max-w-xs leading-relaxed mb-6">
              Türkiye'deki içerik üreticileri için yeni nesil, her şeyi tek noktadan çözebileceğiniz satış platformu.
            </p>
            <div className="flex items-center gap-4">
              {/* Sosyal Medya İkonları için sadece yuvarlaklar koyduk */}
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 border border-black/10 hover:bg-[#1A1A1A]/10 transition-colors cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 border border-black/10 hover:bg-[#1A1A1A]/10 transition-colors cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 border border-black/10 hover:bg-[#1A1A1A]/10 transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-[#1A1A1A] mb-4">Ürün</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-zinc-700 hover:text-[#1A1A1A] transition-colors">Özellikler</a></li>
              <li><a href="#" className="text-sm text-zinc-700 hover:text-[#1A1A1A] transition-colors">Nasıl Çalışır</a></li>
              <li><a href="#" className="text-sm text-zinc-700 hover:text-[#1A1A1A] transition-colors">Fiyatlandırma</a></li>
              <li><a href="#" className="text-sm text-zinc-700 hover:text-[#1A1A1A] transition-colors">Yeni Çıkanlar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-[#1A1A1A] mb-4">Destek</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-zinc-700 hover:text-[#1A1A1A] transition-colors">Yardım Merkezi</a></li>
              <li><a href="#" className="text-sm text-zinc-700 hover:text-[#1A1A1A] transition-colors">SSS</a></li>
              <li><a href="#" className="text-sm text-zinc-700 hover:text-[#1A1A1A] transition-colors">Topluluk</a></li>
              <li><a href="#" className="text-sm text-zinc-700 hover:text-[#1A1A1A] transition-colors">İletişim</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-[#1A1A1A] mb-4">Yasal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-zinc-700 hover:text-[#1A1A1A] transition-colors">Gizlilik Sözleşmesi</a></li>
              <li><a href="#" className="text-sm text-zinc-700 hover:text-[#1A1A1A] transition-colors">Kullanıcı Şartları</a></li>
              <li><a href="#" className="text-sm text-zinc-700 hover:text-[#1A1A1A] transition-colors">Mesafeli Satış</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © 2026 Kreo. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-zinc-700">Tüm sistemler çalışıyor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

