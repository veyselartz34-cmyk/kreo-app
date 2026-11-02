"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Send, Package, MousePointerClick, CheckCircle2, 
  Smartphone, Monitor, ChevronDown, Check, Sparkles, Users, AlertCircle 
} from "lucide-react";
import { sendBroadcastEmailAction } from "@/app/actions/broadcastActions";

type Product = {
  id: string;
  title: string;
  price: number;
  type: string;
  icon: string;
};

export default function EmailBuilderClient({ 
  products, 
  customerCount,
  creatorName 
}: { 
  products: Product[];
  customerCount: number;
  creatorName: string;
}) {
  const [subject, setSubject] = useState("Yeni İçeriğim ve Özel Fırsat Yayında! 🚀");
  const [body, setBody] = useState(`Herkese merhaba,\n\nUzun zamandır üzerinde titizlikle çalıştığım yeni dijital içeriğim ve danışmanlık programım yayında! Vitrinimdeki sınırlı kontenjanı kaçırmamak ve hemen yararlanmak için aşağıdaki bağlantıdan inceleyebilirsiniz.\n\nSevgiler,\n${creatorName}`);
  
  const [buttonText, setButtonText] = useState("Hemen İncele & Eriş");
  const [buttonUrl, setButtonUrl] = useState("https://kreo-app.vercel.app/");
  const [showButton, setShowButton] = useState(true);
  
  const [selectedProductId, setSelectedProductId] = useState<string | null>(products[0]?.id || null);
  const [showProduct, setShowProduct] = useState(true);

  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) return;
    setIsSending(true);
    setSendResult(null);

    const res = await sendBroadcastEmailAction({
      subject,
      body,
      buttonText: showButton ? buttonText : undefined,
      buttonUrl: showButton ? buttonUrl : undefined,
      productId: showProduct ? selectedProductId : null,
    });

    setIsSending(false);
    if (res.success) {
      setSendResult({
        success: true,
        message: res.message || `${customerCount > 0 ? customerCount : 1} müşterinize başarıyla ulaştırıldı!`
      });
      setTimeout(() => setSendResult(null), 5000);
    } else {
      setSendResult({
        success: false,
        message: res.error || "E-posta gönderilirken bir hata oluştu."
      });
    }
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="max-w-7xl mx-auto pb-24 text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#D32F2F] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" />
            E-POSTA PAZARLAMA MERKEZİ
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight mt-1">E-posta Bülteni Gönder</h1>
          <p className="text-zinc-500 text-sm mt-1.5 font-medium">
            Kayıtlı müşterilerinize şık, mobil uyumlu ve satış artıran bültenler ulaştırın.
          </p>
        </div>

        {/* Müşteri Sayacı Rozeti */}
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-black/[0.08] shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100/60 flex items-center justify-center text-[#F57C00]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Kayıtlı Kitle</span>
            <span className="text-lg font-black text-[#1A1A1A]">{customerCount} Müşteri</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Sol Taraf: Editör */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-7 sm:p-8 rounded-[2rem] border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-6"
          >
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Konu Başlığı</label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Açılma oranını artıracak çekici bir başlık..."
                className="w-full px-4 py-3.5 bg-zinc-50/70 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-[#F57C00]/20 focus:border-[#D32F2F] outline-none transition-all placeholder:text-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">E-posta İçeriği</label>
              <textarea 
                rows={7}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Müşterilerinize sunmak istediğiniz mesaj..."
                className="w-full px-4 py-3.5 bg-zinc-50/70 border border-black/5 rounded-xl text-sm font-medium text-[#1A1A1A] focus:ring-2 focus:ring-[#F57C00]/20 focus:border-[#D32F2F] outline-none transition-all placeholder:text-zinc-400 resize-none leading-relaxed"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-7 sm:p-8 rounded-[2rem] border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-5"
          >
            <h3 className="text-base font-black text-[#1A1A1A]">Pazarlama Eklentileri</h3>
            
            {/* Ürün Ekleme */}
            <div className="p-4 sm:p-5 border border-black/5 rounded-2xl bg-zinc-50/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100/60 flex items-center justify-center text-[#F57C00]">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">Öne Çıkan Ürün Kartı</h4>
                    <p className="text-[11px] font-medium text-zinc-500">Bültenin içine doğrudan ürün kartı yerleştirin.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={showProduct} onChange={() => setShowProduct(!showProduct)} />
                  <div className="w-10 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D32F2F]"></div>
                </label>
              </div>
              
              {showProduct && (
                <div className="mt-3 relative">
                  <select 
                    value={selectedProductId || ""}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs sm:text-sm font-bold text-[#1A1A1A] appearance-none outline-none focus:ring-2 focus:ring-[#F57C00]/20"
                  >
                    {products.length === 0 && <option value="">Vitrinizde henüz ürün yok</option>}
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.title} - ₺{p.price.toLocaleString("tr-TR")}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              )}
            </div>

            {/* Aksiyon Butonu (CTA) */}
            <div className="p-4 sm:p-5 border border-black/5 rounded-2xl bg-zinc-50/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100/60 flex items-center justify-center text-emerald-600">
                    <MousePointerClick className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">Aksiyon Butonu (CTA)</h4>
                    <p className="text-[11px] font-medium text-zinc-500">Müşterilerinizi vitrin veya satın alma linkine yönlendirin.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={showButton} onChange={() => setShowButton(!showButton)} />
                  <div className="w-10 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D32F2F]"></div>
                </label>
              </div>

              {showButton && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Buton Yazısı</label>
                    <input 
                      type="text" 
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-black/10 rounded-xl text-xs font-bold text-[#1A1A1A] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Hedef Link</label>
                    <input 
                      type="text" 
                      value={buttonUrl}
                      onChange={(e) => setButtonUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-black/10 rounded-xl text-xs font-medium text-[#1A1A1A] outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

          </motion.div>

          {/* Bildirim Kartı */}
          <AnimatePresence>
            {sendResult && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 ${
                  sendResult.success 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {sendResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span>{sendResult.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sıcak Degrade Gönderim Butonu */}
          <div>
            <button 
              onClick={handleSend}
              disabled={isSending || !subject.trim()}
              className="relative group/sendbtn overflow-hidden w-full py-4 rounded-2xl text-white text-sm sm:text-base font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 shadow-[0_4px_25px_rgba(245,124,0,0.35)] hover:shadow-[0_8px_35px_rgba(245,124,0,0.5)] bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100] flex items-center justify-center gap-2.5"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover/sendbtn:animate-[shimmer_1.5s_infinite]" />
              
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                  <span className="relative z-10">Bülten İletiliyor...</span>
                </>
              ) : (
                <span className="relative z-10 flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>Kayıtlı Müşterilere Gönder ({customerCount > 0 ? customerCount : "Test"})</span>
                </span>
              )}
            </button>
            <p className="text-center text-[11px] font-bold text-zinc-400 mt-3">
              Kreo altyapısı ile doğrudan müşterilerinizin gelen kutusuna güvenle ulaşır.
            </p>
          </div>
        </div>

        {/* Sağ Taraf: Canlı Önizleme */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">E-posta Önizlemesi</h3>
              <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl">
                <button 
                  onClick={() => setPreviewMode("desktop")}
                  className={`p-1.5 rounded-lg transition-colors ${previewMode === "desktop" ? "bg-white shadow-xs text-[#1A1A1A]" : "text-zinc-400 hover:text-[#1A1A1A]"}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setPreviewMode("mobile")}
                  className={`p-1.5 rounded-lg transition-colors ${previewMode === "mobile" ? "bg-white shadow-xs text-[#1A1A1A]" : "text-zinc-400 hover:text-[#1A1A1A]"}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email Canvas */}
            <div className={`mx-auto transition-all duration-500 ${previewMode === "mobile" ? "w-[330px]" : "w-full"}`}>
              <div className="bg-white rounded-[2rem] border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
                
                {/* Email Client Header */}
                <div className="bg-zinc-50/80 border-b border-black/5 p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-100/60 flex items-center justify-center flex-shrink-0 text-[#F57C00]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#1A1A1A] truncate">{subject || "Konu Yok"}</p>
                    <p className="text-[11px] text-zinc-400">{creatorName} (via Kreo.app)</p>
                  </div>
                </div>

                {/* Email Content Body */}
                <div className="p-6 bg-[#FDFBF7]">
                  <div className="bg-white rounded-2xl p-6 border border-black/[0.06] shadow-2xs max-w-lg mx-auto space-y-5">
                    
                    {/* Header */}
                    <div className="text-center pb-3 border-b border-black/5">
                      <h4 className="text-base font-black text-[#1A1A1A]">{creatorName}</h4>
                      <p className="text-[11px] font-bold text-zinc-400">Özel Vitrin Bülteni</p>
                    </div>

                    <h3 className="text-base font-black text-[#1A1A1A] leading-snug">{subject}</h3>
                    
                    <div className="text-xs text-zinc-600 font-medium leading-relaxed whitespace-pre-wrap">
                      {body}
                    </div>

                    {/* Ürün Kutusu */}
                    {showProduct && selectedProduct && (
                      <div className="p-3.5 rounded-xl border border-black/5 flex items-center gap-3 bg-zinc-50/70">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-black/5 flex-shrink-0 overflow-hidden">
                          {selectedProduct.icon ? (
                            <img src={selectedProduct.icon} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <Package className="w-6 h-6 text-zinc-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#1A1A1A] truncate">{selectedProduct.title}</h4>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{selectedProduct.type}</p>
                        </div>
                        <div className="text-right pl-2">
                          <span className="text-sm font-black text-[#1A1A1A]">₺{selectedProduct.price.toLocaleString("tr-TR")}</span>
                        </div>
                      </div>
                    )}

                    {/* Aksiyon Butonu */}
                    {showButton && buttonText && (
                      <div className="text-center pt-2">
                        <span className="inline-block px-7 py-3 bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100] text-white text-xs font-bold rounded-full shadow-sm w-full sm:w-auto text-center">
                          {buttonText} &rarr;
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center mt-5 text-[10px] font-medium text-zinc-400">
                    Bu e-posta Kreo vitrini üzerinden kaydolduğunuz için gönderilmiştir.<br/>
                    Abonelikten çıkmak için <span className="underline cursor-pointer">tıklayın</span>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
