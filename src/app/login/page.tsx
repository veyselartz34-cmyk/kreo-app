"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthShowcase } from "@/components/ui/auth-showcase";
import { loginAction } from "@/app/actions/authActions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Lütfen e-posta ve şifrenizi girin.");
      return;
    }

    setIsSubmitting(true);
    const res = await loginAction({ email, password });

    if (res.success) {
      window.location.href = "/dashboard";
    } else {
      setError(res.error || "Giriş yapılırken bir sorun oluştu.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[var(--bg)]">
      {/* Sol Taraf - Form */}
      <div className="flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12 relative order-2 md:order-1">
        <Link 
          href="/" 
          className="absolute top-8 left-8 sm:left-16 md:left-24 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>

        <div className="max-w-sm w-full mx-auto mt-12 md:mt-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A] mb-2">Tekrar Hoş Geldin</h1>
            <p className="text-sm text-zinc-600">Vitrinini yönetmek ve kazançlarını görmek için giriş yap.</p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">E-posta</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="isim@ornek.com" 
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FBC02D]/50 focus:border-[#FBC02D] transition-all text-sm placeholder:text-zinc-400"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-[#1A1A1A]">Şifre</label>
                  <a href="#" className="text-xs font-medium text-[#D32F2F] hover:underline">Şifremi Unuttum</a>
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FBC02D]/50 focus:border-[#FBC02D] transition-all text-sm placeholder:text-zinc-400"
                />
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-3.5 text-white font-semibold rounded-xl transition-colors shadow-md ${
                    isSubmitting ? 'bg-zinc-400 cursor-not-allowed' : 'bg-[#D32F2F] hover:bg-[#C62828] shadow-red-500/20'
                  }`}
                >
                  {isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-zinc-600 mt-8">
              Henüz hesabın yok mu? <Link href="/register" className="text-[#D32F2F] font-semibold hover:underline">Kayıt Ol</Link>
            </p>
          </div>
        </div>
      </div>

      <AuthShowcase 
        badgeText="Kreo Büyüyor"
        title="Zamanı kendi"
        highlight="kurallarına"
        description="göre yönet. Satışları, analizleri ve danışmanlık takvimini tek bir yerden kontrol et. Tüm süreçlerini otomatikleştir."
        metricLabel="Sürekli Büyüyen MRR"
        metricDesc="Topluluk aboneliklerini kontrol et."
      />
    </main>
  );
}
