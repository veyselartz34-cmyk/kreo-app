"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, Filter, Eye, MoreHorizontal, ArrowUpRight, ArrowDownRight, CreditCard, X, Package } from "lucide-react";
import { useState } from "react";

type Order = {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  date: string;
  status: string;
};

export default function OrdersClient({ 
  initialOrders, 
  totalRevenue, 
  totalOrders 
}: { 
  initialOrders: Order[], 
  totalRevenue: number, 
  totalOrders: number 
}) {
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = initialOrders.filter(o => {
    const matchesFilter = activeFilter === "Tümü" || o.status === activeFilter;
    const matchesSearch = o.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const downloadCSV = () => {
    const headers = ["Sipariş ID,Müşteri,E-posta,Ürün,Tutar,Tarih,Durum"];
    const rows = filteredOrders.map(o => 
      `${o.id},"${o.customer}","${o.email}","${o.product}",${o.amount},"${o.date}","${o.status}"`
    );
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kreo_siparisler_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto text-[#1A1A1A] pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Siparişler</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">Tüm satış işlemlerini, iadeleri ve finansal durumları yönetin.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={downloadCSV}
            className="flex items-center gap-2 px-5 py-3 bg-[#1A1A1A] text-white rounded-2xl text-sm font-bold hover:bg-black transition-colors shadow-sm"
          >
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
            <p className="text-sm font-bold text-zinc-500">Toplam Ciro</p>
          </div>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-[#1A1A1A]">₺{totalRevenue.toLocaleString("tr-TR")}</h3>
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
            <h3 className="text-3xl font-black text-[#1A1A1A]">{totalOrders}</h3>
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
            <h3 className="text-3xl font-black text-[#1A1A1A]">%0.0</h3>
            <span className="flex items-center text-xs font-bold text-green-600 mb-1.5"><ArrowDownRight className="w-4 h-4" /> Düşük</span>
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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Müşteri adı veya sipariş no ara..." 
              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-[#D32F2F]/30 outline-none transition-all placeholder:text-zinc-400"
            />
          </div>
          <div className="flex items-center gap-2">
            {["Tümü", "Tamamlandı", "Beklemede", "İade Edildi"].map(f => (
              <button 
                key={f}
                onClick={() => {
                  setActiveFilter(f);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeFilter === f ? "bg-zinc-100 text-[#1A1A1A]" : "text-zinc-500 hover:bg-zinc-50"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
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
              {paginatedOrders.length > 0 ? paginatedOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="py-4 px-6 text-sm font-bold text-[#1A1A1A]">#{order.id}</td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold text-[#1A1A1A]">{order.customer}</p>
                    <p className="text-xs font-medium text-zinc-500 mt-0.5">{order.email}</p>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-zinc-600">{order.product}</td>
                  <td className="py-4 px-6 text-sm font-medium text-zinc-500">{order.date}</td>
                  <td className="py-4 px-6 text-sm font-black text-[#1A1A1A]">₺{order.amount}</td>
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
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-zinc-400 hover:text-[#1A1A1A] hover:bg-white rounded-lg border border-transparent hover:border-black/10 transition-all shadow-sm"
                        title="Detayı Gör"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm font-bold text-zinc-500">
                    Sipariş bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-black/5 flex items-center justify-between text-sm font-medium text-zinc-500">
          <p>Toplam {filteredOrders.length} siparişten {filteredOrders.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredOrders.length)} arası gösteriliyor.</p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-black/5 rounded-lg hover:bg-zinc-50 disabled:opacity-50 transition-colors"
            >
              Önceki
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 border border-black/5 rounded-lg hover:bg-zinc-50 bg-white disabled:opacity-50 transition-colors"
            >
              Sonraki
            </button>
          </div>
        </div>
      </motion.div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between p-8 border-b border-black/5 bg-zinc-50/50">
                <div>
                  <h2 className="text-2xl font-black text-[#1A1A1A]">Sipariş Detayı</h2>
                  <p className="text-sm font-bold text-zinc-500 mt-1">#{selectedOrder.id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-black/5">
                  <X className="w-6 h-6 text-zinc-500" />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-black/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Satın Alınan Ürün</p>
                      <p className="text-sm font-black text-[#1A1A1A] mt-0.5">{selectedOrder.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-[#1A1A1A]">₺{selectedOrder.amount}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Müşteri Bilgileri</p>
                  <div className="bg-white p-4 rounded-2xl border border-black/5 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-zinc-500">İsim:</span>
                      <span className="text-sm font-bold text-[#1A1A1A]">{selectedOrder.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-zinc-500">E-posta:</span>
                      <span className="text-sm font-bold text-[#1A1A1A]">{selectedOrder.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-zinc-500">İşlem Tarihi:</span>
                      <span className="text-sm font-bold text-[#1A1A1A]">{selectedOrder.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-zinc-500">Durum:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${
                        selectedOrder.status === 'Tamamlandı' ? 'bg-green-100 text-green-700' :
                        selectedOrder.status === 'Beklemede' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
