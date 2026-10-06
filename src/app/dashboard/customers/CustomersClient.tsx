"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Download, MoreHorizontal, Mail, ArrowUpRight, CheckCircle2, ChevronDown, Check } from "lucide-react";

type Customer = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  product: string;
  amount: string;
  date: string;
  status: string;
};

export default function CustomersClient({ initialCustomers }: { initialCustomers: Customer[] }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tümü");

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 2000);
    }, 1500);
  };

  // Veritabanından gelen gerçek veriyi kullanıyoruz!
  const filteredCustomers = initialCustomers.filter(c => activeFilter === "Tümü" || c.status === activeFilter);


  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Müşteriler</h1>
          <p className="text-zinc-500 text-sm mt-1">Ürünlerini satın alan ve randevu alan tüm müşterilerini yönet.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownload}
            disabled={isDownloading || downloadComplete}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-black/10 text-[#1A1A1A] text-sm font-semibold rounded-xl hover:bg-zinc-50 transition-all shadow-sm min-w-[120px]"
          >
            {isDownloading ? (
              <div className="w-4 h-4 border-2 border-zinc-300 border-t-[#1A1A1A] rounded-full animate-spin" />
            ) : downloadComplete ? (
              <><CheckCircle2 className="w-4 h-4 text-green-600" /> İndirildi</>
            ) : (
              <><Download className="w-4 h-4" /> CSV İndir</>
            )}
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="İsim veya E-posta ara..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          />
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            onBlur={() => setTimeout(() => setIsFilterOpen(false), 200)}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border text-sm font-medium rounded-xl transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${
              isFilterOpen ? 'border-black/20 text-[#1A1A1A]' : 'border-black/5 text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filtrele: {activeFilter}
            <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-12 w-48 bg-white border border-black/5 shadow-xl rounded-xl py-2 z-20"
              >
                <div className="px-3 py-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">Duruma Göre</div>
                {["Tümü", "Başarılı", "İade Edildi"].map(f => (
                  <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-[#1A1A1A]"
                  >
                    {f}
                    {activeFilter === f && <Check className="w-4 h-4 text-[#D32F2F]" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Customers List */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 bg-zinc-50/50">
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Müşteri</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Satın Alınan Ürün</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Tarih</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Tutar</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full object-cover border border-black/5" />
                      <div>
                        <p className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#D32F2F] transition-colors">{customer.name}</p>
                        <p className="text-xs font-medium text-zinc-500 mt-0.5">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-[#1A1A1A]">{customer.product}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-zinc-500">{customer.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-[#1A1A1A]">{customer.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      customer.status === "Başarılı" ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-600"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${customer.status === "Başarılı" ? "bg-green-500" : "bg-zinc-400"}`}></span>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-[#1A1A1A] hover:bg-black/5 rounded-lg transition-colors" title="E-posta Gönder">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-[#1A1A1A] hover:bg-black/5 rounded-lg transition-colors" title="Detaylar">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-black/5 bg-zinc-50/30 flex items-center justify-between text-sm text-zinc-500">
          <span>Toplam {filteredCustomers.length} müşteri gösteriliyor.</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-black/10 rounded-lg bg-white hover:bg-zinc-50 disabled:opacity-50">Önceki</button>
            <button className="px-3 py-1 border border-black/10 rounded-lg bg-white hover:bg-zinc-50">Sonraki</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
