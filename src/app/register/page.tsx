"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthShowcase } from "@/components/ui/auth-showcase";
import { registerAction } from "@/app/actions/authActions";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!name || !email || !password || !username) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    setIsSubmitting(true);
    const res = await registerAction({ name, username, email, password });

    if (res.success) {
      setSuccessMsg(res.message || "Kayıt başarılı! Lütfen e-postanızı kontrol edin.");
      setIsSubmitting(false);
      // Clear form
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      setError(res.error || "Kayıt olunurken bir sorun oluştu.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[var(--bg)]">
      {/* Sol Taraf - Form */}
      <div className="flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12 relative">
        <Link 
          href="/" 
          className="absolute top-8 left-8 sm:left-16 md:left-24 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>

        <div className="max-w-sm w-full mx-auto mt-12 md:mt-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A] mb-2">Hesap Oluştur</h1>
            <p className="text-sm text-zinc-600">Kreo'da ücretsiz vitrinini aç ve kazanmaya başla.</p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl">
              {error}
            </div>
          )}

          {successMsg ? (
            <div className="mb-6 p-6 bg-green-50 border border-green-200 text-green-800 text-sm font-medium rounded-2xl text-center">
              <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {successMsg}
              <Link href="/login" className="block mt-4 text-[#D32F2F] hover:underline font-bold">Giriş Yapa Git</Link>
            </div>
          ) : (
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Ad Soyad</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ahmet Yilmaz" 
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FBC02D]/50 focus:border-[#FBC02D] transition-all text-sm placeholder:text-zinc-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Kullanıcı Adı (Vitrin Linkin)</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-xs font-bold text-zinc-400">kreo.com/</span>
                    <input 
                      type="text" 
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="ahmet" 
                      className="w-full pl-24 pr-4 py-3 rounded-xl border border-black/10 bg-white/50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FBC02D]/50 focus:border-[#FBC02D] transition-all text-sm placeholder:text-zinc-400"
                    />
                  </div>
                </div>
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
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Şifre</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="En az 6 karakter" 
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
                    {isSubmitting ? "Kayıt Yapılıyor..." : "Kreo'ya Katıl"}
                  </button>
                </div>
              </form>

              <p className="text-center text-sm text-zinc-600 mt-8">
                Zaten hesabın var mı? <Link href="/login" className="text-[#D32F2F] font-semibold hover:underline">Giriş Yap</Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <AuthShowcase 
        badgeText="Senin Sahnene Hos Geldin"
        title="Kitleleri"
        highlight="gelire"
        description="dönüştürmenin en zarif yolu. Dijital ürünler, danışmanlık seansları ve ücretli topluluğun için ihtiyacın olan tek platform."
        metricLabel="Türkiye'nin Seçimi"
        metricDesc="Binlerce üreticiye katıl"
      />
    </main>
  );
}
