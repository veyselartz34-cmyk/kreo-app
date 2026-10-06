"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Kreo nedir?",
      a: "Kreo, Türk içerik üreticilerinin dijital ürünlerini, danışmanlık seanslarını ve topluluk aboneliklerini tek vitrinden satmalarını sağlayan platformdur."
    },
    {
      q: "Stripe olmadan nasıl ödeme alıyorsunuz?",
      a: "iyzico ve PayTR gibi Türkiye'de lisanslı ödeme kuruluşlarını kullanıyoruz. Kredi kartı, banka kartı ve taksitli ödeme destekleniyor."
    },
    {
      q: "Komisyon oranı ne kadar?",
      a: "Başlangıç planında %4, Pro planında %1.5 komisyon alıyoruz. Ödeme kuruluşunun kendi komisyonu ayrıca uygulanır."
    },
    {
      q: "Fatura kesme nasıl oluyor?",
      a: "Her satışta otomatik e-Arşiv fatura kesilir ve müşteriye gönderilir. Sizin ekstra bir işlem yapmanıza gerek kalmaz."
    },
    {
      q: "Ücretsiz deneme var mı?",
      a: "İlk 14 gün tamamen ücretsiz. Kredi kartı bilgisi girmeniz gerekmez."
    },
    {
      q: "Paramı ne zaman çekebilirim?",
      a: "Satışlar, işlem tarihinden itibaren T+3 iş günü içinde doğrudan tanımladığınız banka hesabınıza aktarılır."
    }
  ];

  return (
    <section id="sss" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-widest text-emerald-500 uppercase">
            SSS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#1A1A1A] mt-3">
            Sık sorulan sorular
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <SpotlightCard key={i} className="rounded-2xl ">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-sm font-medium text-[#1A1A1A]">{faq.q}</span>
                <Plus 
                  size={18} 
                  className={`text-zinc-600 transition-transform duration-300 ${openIndex === i ? "rotate-45 text-[#1A1A1A]" : ""}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm text-zinc-700 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
