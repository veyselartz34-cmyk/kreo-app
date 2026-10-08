"use client";

import { motion } from "framer-motion";
import { Link2, Unplug, ArrowUpRight, Plus, ExternalLink, Zap } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    { id: 1, name: "Google Analytics", desc: "Sitenizin trafiğini ve kullanıcı davranışlarını detaylı analiz edin.", status: "Bağlı", icon: "https://upload.wikimedia.org/wikipedia/commons/8/89/Google_Analytics_icon_%282023%29.svg", category: "Analiz" },
    { id: 2, name: "Facebook Pixel", desc: "Reklam dönüşümlerini takip edin ve yeniden pazarlama yapın.", status: "Bağlan", icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Facebook_icon_2013.svg", category: "Pazarlama" },
    { id: 3, name: "Mailchimp", desc: "Müşterilerinizi otomatik e-posta listelerinize eşitleyin.", status: "Bağlan", icon: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Mailchimp_Freddie_icon.svg", category: "E-posta" },
    { id: 4, name: "ConvertKit", desc: "Gelişmiş e-posta otomasyonları ve pazarlama hunileri kurun.", status: "Bağlan", icon: "https://logowik.com/content/uploads/images/convertkit-icon6364.jpg", category: "E-posta" },
    { id: 5, name: "Zapier", desc: "Kreo'yu 5,000+ farklı web uygulaması ile birbirine bağlayın.", status: "Bağlı", icon: "https://upload.wikimedia.org/wikipedia/commons/6/69/Zapier_logo.svg", category: "Otomasyon" },
    { id: 6, name: "Discord", desc: "Satın alım sonrası müşterilerinizi özel Discord sunucunuza ekleyin.", status: "Bağlan", icon: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6918e57475a843f59f_icon_clyde_blurple_RGB.svg", category: "Topluluk" },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-24 text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Entegrasyonlar</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">Kreo'yu diğer favori araçlarınızla bağlayın ve iş akışınızı otomatikleştirin.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-sm font-bold rounded-xl hover:bg-black transition-colors shadow-sm">
            <Zap className="w-4 h-4" />
            Özel Webhook Ekle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((int, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={int.id}
            className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-xl hover:border-black/10 transition-all duration-300 group flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-black/5 flex items-center justify-center p-3">
                <img src={int.icon} alt={int.name} className="w-full h-full object-contain" />
              </div>
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                int.status === "Bağlı" ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"
              }`}>
                {int.status === "Bağlı" ? "Aktif" : int.category}
              </span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-black text-[#1A1A1A] mb-2">{int.name}</h3>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">{int.desc}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-black/5">
              {int.status === "Bağlı" ? (
                <button className="w-full py-3 bg-zinc-50 text-[#1A1A1A] text-sm font-bold rounded-xl border border-black/5 hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2">
                  <Unplug className="w-4 h-4 text-zinc-400" />
                  Bağlantıyı Kes
                </button>
              ) : (
                <button className="w-full py-3 bg-zinc-100 text-[#1A1A1A] text-sm font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group-hover:bg-[#1A1A1A] group-hover:text-white">
                  <Link2 className="w-4 h-4" />
                  Bağlan
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-[#FDFBF7] p-8 rounded-[2.5rem] border-2 border-dashed border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-lg font-black text-[#1A1A1A]">Aradığınız aracı bulamadınız mı?</h3>
          <p className="text-sm font-medium text-zinc-500 mt-1">Geliştirici dokümantasyonumuzu inceleyerek kendi entegrasyonunuzu yazabilirsiniz.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-black/5 text-[#1A1A1A] text-sm font-bold rounded-xl hover:bg-zinc-50 transition-colors shadow-sm whitespace-nowrap">
          API Dokümanı <ExternalLink className="w-4 h-4 text-zinc-400" />
        </button>
      </div>
    </div>
  );
}
