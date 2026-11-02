"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { AuthShowcase } from "@/components/ui/auth-showcase";
import { registerAction } from "@/app/actions/authActions";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !username) {
      setError("Lütfen tüm alanları eksiksiz doldurun.");
      return;
    }

    setIsSubmitting(true);
    const res = await registerAction({ name, username, email, password });

    if (res.success) {
      window.location.href = "/dashboard";
    } else {
      setError(res.error || "Kayıt olunurken bir sorun oluştu.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[var(--bg)] font-sans">
      {/* Sol Taraf - Form */}
      <div className="flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12 relative">
        <Link 
          href="/" 
          className="absolute top-8 left-8 sm:left-16 md:left-24 flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>

        <div className="max-w-sm w-full mx-auto mt-12 md:mt-0">
          <div className="mb-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D32F2F] flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" />
              ÜRETİCİ HESABI OLUŞTUR
            </span>
            <h1 className="text-3xl font-black tracking-tight text-[#1A1A1A]">Ücretsiz Vitrinini Aç</h1>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-medium">
              1 dakikada dijital ürünlerini, danışmanlık seanslarını satmaya başla.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1.5">Adınız Soyadınız</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Nuh Veysel" 
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:bg-white outline-none focus:ring-2 focus:ring-[#F57C00]/20 focus:border-[#D32F2F] transition-all text-sm font-medium placeholder:text-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1.5">Vitrin Adresiniz (URL)</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-xs font-bold text-zinc-400">kreo.app/</span>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  placeholder="kullaniciadi" 
                  className="w-full pl-24 pr-4 py-3 rounded-xl border border-black/10 bg-white focus:bg-white outline-none focus:ring-2 focus:ring-[#F57C00]/20 focus:border-[#D32F2F] transition-all text-sm font-bold placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1.5">E-posta Adresiniz</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="isim@ornek.com" 
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:bg-white outline-none focus:ring-2 focus:ring-[#F57C00]/20 focus:border-[#D32F2F] transition-all text-sm font-medium placeholder:text-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1.5">Şifreniz</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="En az 6 karakter" 
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:bg-white outline-none focus:ring-2 focus:ring-[#F57C00]/20 focus:border-[#D32F2F] transition-all text-sm font-medium placeholder:text-zinc-400"
              />
            </div>
            
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="relative group/regbtn overflow-hidden w-full py-4 rounded-xl text-white font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 shadow-[0_4px_25px_rgba(245,124,0,0.35)] hover:shadow-[0_8px_35px_rgba(245,124,0,0.5)] bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100] flex items-center justify-center gap-2"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover/regbtn:animate-[shimmer_1.5s_infinite]" />
                {isSubmitting ? (
                  <span className="relative z-10 flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Mağazanız Açılıyor...</span>
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Hemen Vitrinini Aç</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-zinc-500 mt-6 font-medium">
            Zaten hesabın var mı? <Link href="/login" className="text-[#D32F2F] font-bold hover:underline">Giriş Yap</Link>
          </p>

          <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-center gap-2 text-zinc-400 text-[11px] font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Kredi kartı gerekmez • %0 Başlangıç ücreti</span>
          </div>
        </div>
      </div>

      <AuthShowcase 
        badgeText="Senin Sahnene Hoş Geldin"
        title="Kitleleri"
        highlight="gelire"
        description="dönüştürmenin en zarif yolu. Dijital ürünler, danışmanlık seansları ve ücretli topluluğun için ihtiyacın olan tek platform."
        metricLabel="Türkiye'nin Seçimi"
        metricDesc="Binlerce üreticiye katıl"
      />
    </main>
  );
}
