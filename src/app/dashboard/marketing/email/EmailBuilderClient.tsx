"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Image as ImageIcon, Package, MousePointerClick, CheckCircle2, Smartphone, Monitor, ChevronDown, Check } from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: number;
  type: string;
  icon: string;
};

export default function EmailBuilderClient({ products }: { products: Product[] }) {
  const [subject, setSubject] = useState("Yeni Eğitim Serim Yayında! 🚀");
  const [body, setBody] = useState("Herkese merhaba,\n\nUzun zamandır üzerinde çalıştığım ve size en çok değer katacak bilgileri derlediğim yeni ürünüm sonunda yayında. Erken erişim fırsatını kaçırmamak için hemen aşağıdan inceleyebilirsiniz.");
  
  const [buttonText, setButtonText] = useState("Hemen İncele");
  const [buttonUrl, setButtonUrl] = useState("https://kreo.app/");
  const [showButton, setShowButton] = useState(true);
  
  const [selectedProductId, setSelectedProductId] = useState<string | null>(products[0]?.id || null);
  const [showProduct, setShowProduct] = useState(true);

  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="max-w-7xl mx-auto pb-24 text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">E-posta Bülteni</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">Kitlenize (1,420 abone) satış odaklı şık bültenler gönderin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Sol Taraf: Editör */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
          >
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Konu Başlığı</label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="İlgi çekici bir konu..."
                className="w-full px-5 py-4 bg-zinc-50 border border-black/5 rounded-2xl text-base font-bold text-[#1A1A1A] focus:ring-2 focus:ring-[#D32F2F]/30 outline-none transition-all placeholder:text-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">E-posta İçeriği</label>
              <textarea 
                rows={6}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Müşterilerinize ne söylemek istersiniz?"
                className="w-full px-5 py-4 bg-zinc-50 border border-black/5 rounded-2xl text-sm font-medium text-[#1A1A1A] focus:ring-2 focus:ring-[#D32F2F]/30 outline-none transition-all placeholder:text-zinc-400 resize-none leading-relaxed"
              ></textarea>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
          >
            <h3 className="text-lg font-black text-[#1A1A1A] mb-4">Pazarlama Eklentileri</h3>
            
            {/* Ürün Ekleme */}
            <div className="p-5 border border-black/5 rounded-2xl bg-zinc-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">Ürün Kartı</h4>
                    <p className="text-xs font-medium text-zinc-500">Mağazanızdan bir ürünü mailin içine gömün.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={showProduct} onChange={() => setShowProduct(!showProduct)} />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D32F2F]"></div>
                </label>
              </div>
              
              {showProduct && (
                <div className="mt-4 relative">
                  <select 
                    value={selectedProductId || ""}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm font-bold text-[#1A1A1A] appearance-none outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                  >
                    {products.length === 0 && <option value="">Ürün bulunamadı</option>}
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.title} - ₺{p.price}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              )}
            </div>

            {/* Buton Ekleme */}
            <div className="p-5 border border-black/5 rounded-2xl bg-zinc-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <MousePointerClick className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">Aksiyon Butonu (CTA)</h4>
                    <p className="text-xs font-medium text-zinc-500">Kullanıcıları sitenize veya linke yönlendirin.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={showButton} onChange={() => setShowButton(!showButton)} />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D32F2F]"></div>
                </label>
              </div>

              {showButton && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Buton Yazısı</label>
                    <input 
                      type="text" 
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm font-bold text-[#1A1A1A] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Hedef Link</label>
                    <input 
                      type="text" 
                      value={buttonUrl}
                      onChange={(e) => setButtonUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm font-medium text-[#1A1A1A] outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

          </motion.div>

          {/* Gönderim Butonu */}
          <div className="pt-4">
            <button 
              onClick={handleSend}
              disabled={isSending || isSent || !subject}
              className={`w-full py-5 rounded-2xl text-base font-black transition-all shadow-[0_8px_30px_rgba(211,47,47,0.3)] flex items-center justify-center gap-3 ${
                isSent ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-[#D32F2F] text-white hover:bg-[#B71C1C] disabled:opacity-50'
              }`}
            >
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Gönderiliyor...
                </>
              ) : isSent ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  1,420 Kişiye Gönderildi!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Tüm Abonelere Gönder (1,420)
                </>
              )}
            </button>
            <p className="text-center text-xs font-bold text-zinc-400 mt-4">
              Gönderilen mailler %0 Kreo komisyonuyla tamamen ücretsizdir.
            </p>
          </div>
        </div>

        {/* Sağ Taraf: Canlı Önizleme */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Canlı Önizleme</h3>
              <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-xl">
                <button 
                  onClick={() => setPreviewMode("desktop")}
                  className={`p-2 rounded-lg transition-colors ${previewMode === "desktop" ? "bg-white shadow-sm text-[#1A1A1A]" : "text-zinc-500 hover:text-[#1A1A1A]"}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setPreviewMode("mobile")}
                  className={`p-2 rounded-lg transition-colors ${previewMode === "mobile" ? "bg-white shadow-sm text-[#1A1A1A]" : "text-zinc-500 hover:text-[#1A1A1A]"}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email Canvas */}
            <div className={`mx-auto transition-all duration-500 ${previewMode === "mobile" ? "w-[340px]" : "w-full"}`}>
              <div className="bg-white rounded-[2rem] border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
                {/* Email Client Header Fake */}
                <div className="bg-zinc-50 border-b border-black/5 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1A1A1A] truncate">{subject || "Konu Yok"}</p>
                    <p className="text-xs text-zinc-500">Kreo'dan size (via Kreo.app)</p>
                  </div>
                </div>

                {/* Email Content Body */}
                <div className="p-8 bg-[#FDFBF7]">
                  <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm max-w-lg mx-auto">
                    {/* Logo Area */}
                    <div className="mb-8 text-center">
                      <span className="text-2xl font-black tracking-tighter text-[#1A1A1A]">
                        Kreo<span className="text-[#D32F2F]">.</span>
                      </span>
                    </div>

                    <h2 className="text-xl font-black text-[#1A1A1A] mb-4 leading-tight">{subject || "Konu Yok"}</h2>
                    
                    <div className="text-[#1A1A1A] text-sm font-medium leading-relaxed whitespace-pre-wrap mb-8 text-zinc-600">
                      {body || "İçerik buraya gelecek..."}
                    </div>

                    {showProduct && selectedProduct && (
                      <div className="mb-8 p-4 rounded-2xl border-2 border-zinc-100 flex items-center gap-4 bg-zinc-50">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-black/5 flex-shrink-0">
                          {selectedProduct.icon ? (
                            <img src={selectedProduct.icon.startsWith('http') || selectedProduct.icon.startsWith('data:') ? selectedProduct.icon : `/${selectedProduct.icon}`} className="w-full h-full object-cover rounded-xl" alt="" />
                          ) : (
                            <Package className="w-8 h-8 text-zinc-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-black text-[#1A1A1A] truncate">{selectedProduct.title}</h4>
                          <p className="text-xs font-bold text-zinc-500 mt-1 uppercase tracking-wider">{selectedProduct.type}</p>
                        </div>
                        <div className="text-right pl-2">
                          <span className="text-base font-black text-[#1A1A1A]">₺{selectedProduct.price}</span>
                        </div>
                      </div>
                    )}

                    {showButton && buttonText && (
                      <div className="text-center mt-2">
                        <span className="inline-block px-8 py-3.5 bg-[#D32F2F] text-white text-sm font-bold rounded-xl w-full sm:w-auto text-center">
                          {buttonText}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center mt-8 text-xs font-medium text-zinc-400">
                    Bu e-posta Kreo altyapısı kullanılarak gönderilmiştir.<br/>
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
