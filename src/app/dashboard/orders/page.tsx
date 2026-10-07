"use client";

import { motion } from "framer-motion";
import { Search, Download, Filter, Eye, MoreHorizontal, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";

const orders = [
  { id: "#ORD-001", customer: "Ahmet Yılmaz", email: "ahmet@example.com", product: "Girişimcilik 101 E-Kitap", amount: "₺200", date: "12 Eki 2026, 14:30", status: "Tamamlandı" },
  { id: "#ORD-002", customer: "Ayşe Kaya", email: "ayse@example.com", product: "1:1 Yazılım Mentörlüğü", amount: "₺1.200", date: "12 Eki 2026, 11:15", status: "Tamamlandı" },
  { id: "#ORD-003", customer: "Caner Demir", email: "caner@example.com", product: "Notion Verimlilik Şablonu", amount: "₺150", date: "11 Eki 2026, 09:45", status: "Tamamlandı" },
  { id: "#ORD-004", customer: "Zeynep Çelik", email: "zeynep@example.com", product: "Kreo Pro Aboneliği", amount: "₺499", date: "10 Eki 2026, 16:20", status: "İade Edildi" },
  { id: "#ORD-005", customer: "Burak Taş", email: "burak@example.com", product: "Girişimcilik 101 E-Kitap", amount: "₺200", date: "10 Eki 2026, 10:05", status: "Tamamlandı" },
  { id: "#ORD-006", customer: "Elif Aydın", email: "elif@example.com", product: "1:1 Yazılım Mentörlüğü", amount: "₺1.200", date: "09 Eki 2026, 15:50", status: "Beklemede" },
];

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto text-[#1A1A1A] pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Siparişler</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">Tüm satış işlemlerini ve müşteri faturalarını yönetin.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-black/5 rounded-2xl text-sm font-bold text-[#1A1A1A] hover:bg-zinc-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4 text-zinc-500" /> Filtrele
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-[#1A1A1A] text-white rounded-2xl text-sm font-bold hover:bg-black transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Dışa Aktar (CSV)
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-zinc-500">Bugünkü Ciro</p>
          </div>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-[#1A1A1A]">₺1.400</h3>
            <span className="flex items-center text-xs font-bold text-green-600 mb-1.5"><ArrowUpRight className="w-4 h-4" /> %12</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-zinc-500">Toplam Sipariş</p>
          </div>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-[#1A1A1A]">142</h3>
            <span className="flex items-center text-xs font-bold text-green-600 mb-1.5"><ArrowUpRight className="w-4 h-4" /> %5</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-zinc-500">İade Oranı</p>
          </div>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-[#1A1A1A]">%1.2</h3>
            <span className="flex items-center text-xs font-bold text-red-600 mb-1.5"><ArrowDownRight className="w-4 h-4" /> Düşük</span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Müşteri adı veya sipariş no ara..." 
              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-[#D32F2F]/30 outline-none transition-all placeholder:text-zinc-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-zinc-100 text-[#1A1A1A] text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors">Tümü</button>
            <button className="px-4 py-2 text-zinc-500 text-sm font-bold rounded-lg hover:bg-zinc-50 transition-colors">Tamamlanan</button>
            <button className="px-4 py-2 text-zinc-500 text-sm font-bold rounded-lg hover:bg-zinc-50 transition-colors">İadeler</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="py-4 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5">Sipariş</th>
                <th className="py-4 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5">Müşteri</th>
                <th className="py-4 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5">Ürün</th>
                <th className="py-4 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5">Tarih</th>
                <th className="py-4 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5">Tutar</th>
                <th className="py-4 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5">Durum</th>
                <th className="py-4 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {orders.map((order, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="py-4 px-6 text-sm font-bold text-[#1A1A1A]">{order.id}</td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold text-[#1A1A1A]">{order.customer}</p>
                    <p className="text-xs font-medium text-zinc-500 mt-0.5">{order.email}</p>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-zinc-600">{order.product}</td>
                  <td className="py-4 px-6 text-sm font-medium text-zinc-500">{order.date}</td>
                  <td className="py-4 px-6 text-sm font-black text-[#1A1A1A]">{order.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Tamamlandı' ? 'bg-green-100 text-green-700' :
                      order.status === 'Beklemede' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-zinc-400 hover:text-[#1A1A1A] hover:bg-white rounded-lg border border-transparent hover:border-black/10 transition-all shadow-sm">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-[#1A1A1A] hover:bg-white rounded-lg border border-transparent hover:border-black/10 transition-all shadow-sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-black/5 flex items-center justify-between text-sm font-medium text-zinc-500">
          <p>Toplam 142 siparişten 1-6 arası gösteriliyor.</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-black/5 rounded-lg hover:bg-zinc-50 disabled:opacity-50" disabled>Önceki</button>
            <button className="px-4 py-2 border border-black/5 rounded-lg hover:bg-zinc-50 bg-white">Sonraki</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
