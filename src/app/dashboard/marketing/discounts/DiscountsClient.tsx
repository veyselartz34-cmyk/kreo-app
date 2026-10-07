"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Plus, Percent, CalendarClock, Trash2, Power, PowerOff, X } from "lucide-react";
import { createDiscountCodeAction, deleteDiscountCodeAction, toggleDiscountCodeStatusAction } from "@/app/actions/marketingActions";

type DiscountCode = {
  id: string;
  code: string;
  discount: number;
  isPercent: boolean;
  usageLimit: number | null;
  usedCount: number;
  isActive: boolean;
  createdAt: Date;
};

export default function DiscountsClient({ 
  initialCodes, 
  activeCount, 
  usedCount 
}: { 
  initialCodes: DiscountCode[];
  activeCount: number;
  usedCount: number;
}) {
  const [codes, setCodes] = useState<DiscountCode[]>(initialCodes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [isPercent, setIsPercent] = useState(true);
  const [usageLimit, setUsageLimit] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !discount) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("code", code);
    formData.append("discount", discount);
    formData.append("isPercent", isPercent.toString());
    if (usageLimit) formData.append("usageLimit", usageLimit);

    const res = await createDiscountCodeAction(formData);
    
    if (res.success && res.discountCode) {
      setCodes([res.discountCode, ...codes]);
      setIsModalOpen(false);
      // Reset form
      setCode("");
      setDiscount("");
      setUsageLimit("");
    } else {
      alert(res.error);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu kodu silmek istediğinize emin misiniz?")) return;
    
    setCodes(codes.filter(c => c.id !== id));
    await deleteDiscountCodeAction(id);
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    setCodes(codes.map(c => c.id === id ? { ...c, isActive: !currentStatus } : c));
    await toggleDiscountCodeStatusAction(id, !currentStatus);
  };

  return (
    <div className="max-w-7xl mx-auto text-[#1A1A1A]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">İndirim Kuponları</h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium">Özel kampanyalar oluştur, takipçilerine FOMO yaşat ve satışları katla.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#B71C1C] transition-all shadow-[0_4px_14px_rgba(211,47,47,0.3)] hover:shadow-[0_6px_20px_rgba(211,47,47,0.4)] transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Yeni Kupon Oluştur
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
            <Percent className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-sm font-bold text-zinc-500 mb-1">Kullanılan Kuponlar</p>
          <h3 className="text-3xl font-black text-[#1A1A1A]">{usedCount}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <Tag className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-sm font-bold text-zinc-500 mb-1">Aktif Kampanyalar</p>
          <h3 className="text-3xl font-black text-[#1A1A1A]">{activeCount}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
            <CalendarClock className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-sm font-bold text-zinc-500 mb-1">Kuponlardan Kazanılan</p>
          <h3 className="text-3xl font-black text-[#1A1A1A]">₺0</h3>
        </div>
      </div>

      {codes.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] border border-black/5 p-16 text-center shadow-sm relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-black/5 shadow-inner">
              <Tag className="w-10 h-10 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-black text-[#1A1A1A] mb-3">Hiç indirim kodunuz yok</h3>
            <p className="text-zinc-500 mb-8 max-w-sm mx-auto font-medium leading-relaxed">İlk indirim kodunuzu oluşturun, sosyal medyada paylaşın ve dönüşümlerin hızla artmasını izleyin.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white text-sm font-bold rounded-2xl hover:bg-black transition-all shadow-md transform hover:-translate-y-0.5"
            >
              İlk Kodunu Oluştur
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5 bg-zinc-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Kupon Kodu</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">İndirim</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Kullanım</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-zinc-500 uppercase tracking-wider">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {codes.map((c) => (
                  <tr key={c.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-zinc-100 text-[#1A1A1A] font-black tracking-widest text-sm border border-black/5">
                        {c.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#1A1A1A]">
                      {c.isPercent ? `%${c.discount}` : `₺${c.discount}`}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1A1A1A]">{c.usedCount}</span>
                        <span className="text-zinc-400 text-sm font-medium">
                          / {c.usageLimit ? c.usageLimit : "Sınırsız"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-500'}`}>
                        {c.isActive ? (
                          <><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Aktif</>
                        ) : (
                          <><div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div> Pasif</>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleToggle(c.id, c.isActive)}
                          className={`p-2 rounded-xl transition-colors ${c.isActive ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                          title={c.isActive ? "Durdur" : "Başlat"}
                        >
                          {c.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => handleDelete(c.id)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <h2 className="text-2xl font-black text-[#1A1A1A] mb-1">Yeni Kupon</h2>
              <p className="text-sm font-medium text-zinc-500 mb-6">Müşterilerinize özel bir indirim tanımlayın.</p>

              <form onSubmit={handleCreate} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Kupon Kodu</label>
                  <input 
                    type="text" 
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Örn: YAZ50"
                    required
                    className="w-full px-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-[#D32F2F]/30 outline-none transition-all placeholder:text-zinc-400 tracking-widest"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">İndirim Tipi</label>
                    <select 
                      value={isPercent ? "percent" : "fixed"}
                      onChange={(e) => setIsPercent(e.target.value === "percent")}
                      className="w-full px-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none"
                    >
                      <option value="percent">Yüzde (%)</option>
                      <option value="fixed">Tutar (₺)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Değer</label>
                    <input 
                      type="number" 
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="Örn: 50"
                      required
                      min="1"
                      className="w-full px-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Kullanım Sınırı (Opsiyonel)</label>
                  <input 
                    type="number" 
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                    placeholder="Örn: 100 (Boş bırakılırsa sınırsız)"
                    min="1"
                    className="w-full px-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30 placeholder:text-zinc-400 placeholder:font-medium"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 mt-2 bg-[#D32F2F] text-white text-sm font-black rounded-xl hover:bg-[#B71C1C] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Oluşturuluyor..." : "Kuponu Oluştur"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
