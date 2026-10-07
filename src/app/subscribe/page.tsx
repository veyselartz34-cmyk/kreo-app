"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { completeSubscriptionAction } from "@/app/actions/subscriptionActions";

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    setLoading(true);
    const res = await completeSubscriptionAction();
    if (res.success) {
      router.push("/dashboard");
    } else {
      alert("Bir hata oluştu.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[2rem] border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center"
      >
        <div className="w-16 h-16 bg-[#D32F2F]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-[#D32F2F]" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">
          Aboneliğinizi Tamamlayın
        </h1>
        <p className="text-zinc-500 mb-8 text-sm">
          Kreo paneline erişmek ve satış yapmaya başlamak için Pro plana abone olmalısınız. (Demo amaçlı Iyzico simulasyonu)
        </p>

        <div className="bg-zinc-50 border border-black/5 rounded-2xl p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5">
            <span className="font-semibold text-[#1A1A1A]">Kreo Pro</span>
            <span className="text-xl font-bold text-[#1A1A1A]">₺299<span className="text-sm text-zinc-400 font-normal">/ay</span></span>
          </div>
          <ul className="space-y-3">
            {[
              "Sınırsız dijital ürün satışı",
              "Sıfır komisyon (Iyzico hariç)",
              "Kendi özel alan adınız (Yakında)",
              "Gelişmiş analitikler"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full py-4 bg-[#1A1A1A] text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-70"
        >
          <CreditCard className="w-5 h-5" />
          {loading ? "İşleniyor..." : "Iyzico ile Öde (Simülasyon)"}
        </button>
        
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-400">
          <Lock className="w-3 h-3" />
          256-bit SSL Güvenli Ödeme
        </div>
      </motion.div>
    </div>
  );
}
