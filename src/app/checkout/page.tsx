"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, ShieldCheck, CreditCard, Mail, CheckCircle2, FileText } from "lucide-react";
import { processCheckoutAction } from "@/app/actions/checkoutActions";

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsProcessing(true);

    const clientName = name || email.split("@")[0];

    const res = await processCheckoutAction({
      clientEmail: email,
      clientName: clientName,
      productTitle: "SaaS Tasarım Sistemi (Figma)",
      amount: 499
    });

    setIsProcessing(false);
    if (res.success) {
      setIsSuccess(true);
    } else {
      alert("Hata: " + res.error);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-2xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Ödeme Başarılı!</h2>
          <p className="text-zinc-500 mb-8">Sipariş detaylarınız ve ürün erişim linkiniz e-posta adresinize gönderildi.</p>
          <div className="p-4 bg-zinc-50 rounded-2xl mb-8 text-left">
            <p className="text-sm font-bold text-[#1A1A1A] mb-1">SaaS Tasarım Sistemi (Figma)</p>
            <p className="text-xs text-zinc-500">Tutar: ₺499.00</p>
          </div>
          <Link href="/nuhveysel" className="block w-full py-3.5 bg-[#1A1A1A] text-white text-sm font-bold rounded-xl hover:bg-black transition-colors">
            Vitrine Dön
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col md:flex-row">
      
      {/* Sol Taraf: Ödeme Formu */}
      <div className="flex-1 p-6 md:p-12 lg:p-20 flex flex-col justify-center order-2 md:order-1 relative z-10">
        <Link href="/nuhveysel" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-[#1A1A1A] transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Geri Dön
        </Link>

        <div className="max-w-md w-full mx-auto md:mx-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1A1A1A]">Ödeme Bilgileri</h1>
            <p className="text-sm text-zinc-500 mt-1">Güvenli iyzico altyapısı ile ödemenizi tamamlayın.</p>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            {/* İletişim Bilgileri */}
            <div>
              <h3 className="text-sm font-bold text-[#1A1A1A] mb-3">İletişim</h3>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz" 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-black/10 rounded-xl focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Kredi Kartı Formu (Mockup) */}
            <div>
              <h3 className="text-sm font-bold text-[#1A1A1A] mb-3">Kart Bilgileri</h3>
              <div className="bg-white border border-black/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#D32F2F]/20 focus-within:border-[#D32F2F] transition-all">
                <div className="relative border-b border-black/10">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input 
                    type="text" 
                    required
                    maxLength={19}
                    placeholder="Kart Numarası" 
                    className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-sm font-medium"
                  />
                </div>
                <div className="flex">
                  <input 
                    type="text" 
                    required
                    placeholder="AA / YY" 
                    maxLength={5}
                    className="w-1/2 px-4 py-3 bg-transparent outline-none border-r border-black/10 text-sm font-medium"
                  />
                  <input 
                    type="text" 
                    required
                    placeholder="CVC" 
                    maxLength={3}
                    className="w-1/2 px-4 py-3 bg-transparent outline-none text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Kart Üzerindeki İsim</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ad Soyad" 
                className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-medium"
              />
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold transition-all shadow-lg ${
                isProcessing ? 'bg-zinc-400 cursor-not-allowed shadow-none' : 'bg-[#1A1A1A] hover:bg-black active:scale-95'
              }`}
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Lock className="w-4 h-4" /> ₺499.00 Öde</>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-zinc-400 mt-4">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-medium">256-bit SSL Güvenli Ödeme</span>
            </div>
          </form>
        </div>
      </div>

      {/* Sağ Taraf: Sipariş Özeti */}
      <div className="flex-1 bg-zinc-50 border-l border-black/5 p-6 md:p-12 lg:p-20 flex flex-col justify-center order-1 md:order-2">
        <div className="max-w-md w-full mx-auto md:mx-0">
          
          {/* Ürün Kartı */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1A1A1A] leading-tight">SaaS Tasarım Sistemi (Figma)</h3>
              <p className="text-sm text-zinc-500 mt-1">Dijital Ürün • Kreo.com/nuhveysel</p>
            </div>
            <div className="ml-auto text-right">
              <span className="text-lg font-bold text-[#1A1A1A]">₺499</span>
            </div>
          </div>

          <div className="border-t border-black/5 pt-6 space-y-3">
            <div className="flex justify-between text-sm text-zinc-500">
              <span>Ara Toplam</span>
              <span>₺499.00</span>
            </div>
            <div className="flex justify-between text-sm text-zinc-500">
              <span>KDV (Dahil)</span>
              <span>₺0.00</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-black/5 mt-3">
              <span className="text-base font-bold text-[#1A1A1A]">Ödenecek Tutar</span>
              <span className="text-2xl font-black text-[#1A1A1A]">₺499.00</span>
            </div>
          </div>

          {/* Iyzico / Güvenlik Rozetleri */}
          <div className="mt-12 p-4 bg-white border border-black/5 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xs">iyzi</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1A1A]">iyzico Korumalı Alışveriş</p>
              <p className="text-[10px] text-zinc-500">Ödemeniz iyzico güvencesiyle gerçekleşmektedir.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
