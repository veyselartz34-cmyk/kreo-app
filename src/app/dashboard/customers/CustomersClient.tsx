"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Download, MoreHorizontal, Mail, ArrowUpRight, CheckCircle2, Star, Users } from "lucide-react";
import Link from "next/link";

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
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const customers = initialCustomers;

  const filteredCustomers = customers.filter(c => {
    const matchesFilter = activeFilter === "Tümü" || c.status === activeFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const downloadCSV = () => {
    const headers = ["ID,Müşteri Adı,E-posta,Son Satın Alım,Tarih,Harcama,Durum"];
    const rows = filteredCustomers.map(c => 
      `${c.id},"${c.name}","${c.email}","${c.product}","${c.date}","${c.amount}","${c.status}"`
    );
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kreo_musteriler_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Müşteri Listesi</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">Ürünlerinizi satın alan tüm müşterilerinizi ve abonelerinizi yönetin.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={downloadCSV}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-black/5 text-[#1A1A1A] text-sm font-bold rounded-xl hover:bg-zinc-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Dışa Aktar (CSV)
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-zinc-500">Toplam Müşteri</p>
          </div>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-[#1A1A1A]">{customers.length}</h3>
            <span className="flex items-center text-xs font-bold text-green-600 mb-1.5"><ArrowUpRight className="w-4 h-4" /> Yeni 12</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-zinc-500">Aktif Aboneler</p>
          </div>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-[#1A1A1A]">{customers.filter(c => c.status === "Aktif").length}</h3>
            <span className="flex items-center text-xs font-bold text-zinc-400 mb-1.5">Kişi</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-zinc-500">Bülten İzni</p>
          </div>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-[#1A1A1A]">%94</h3>
            <span className="flex items-center text-xs font-bold text-green-600 mb-1.5"><ArrowUpRight className="w-4 h-4" /> Yüksek</span>
          </div>
        </div>
      </div>

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
              placeholder="İsim veya e-posta ara..." 
              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-[#D32F2F]/30 outline-none transition-all placeholder:text-zinc-400"
            />
          </div>
          <div className="flex items-center gap-2">
            {["Tümü", "Aktif", "Pasif"].map((filter) => (
              <button 
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                  activeFilter === filter 
                    ? "bg-zinc-100 text-[#1A1A1A]" 
                    : "text-zinc-500 hover:bg-zinc-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="py-5 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5">Müşteri</th>
                <th className="py-5 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5">Son Satın Alım</th>
                <th className="py-5 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5">Tarih</th>
                <th className="py-5 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5">Harcama</th>
                <th className="py-5 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5">Durum</th>
                <th className="py-5 px-6 text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-black/5 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {paginatedCustomers.length > 0 ? paginatedCustomers.map((customer, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full object-cover border border-black/5" />
                      <div>
                        <p className="text-sm font-bold text-[#1A1A1A]">{customer.name}</p>
                        <p className="text-xs font-medium text-zinc-500 mt-0.5">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-zinc-600">{customer.product}</td>
                  <td className="py-4 px-6 text-sm font-medium text-zinc-500">{customer.date}</td>
                  <td className="py-4 px-6 text-sm font-black text-[#1A1A1A]">{customer.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      customer.status === 'Aktif' || customer.status === 'Yaklaşıyor' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href="/dashboard/marketing/email" className="p-2 text-zinc-400 hover:text-[#1A1A1A] hover:bg-white rounded-lg border border-transparent hover:border-black/10 transition-all shadow-sm" title="E-posta Gönder">
                        <Mail className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-zinc-400 hover:text-[#1A1A1A] hover:bg-white rounded-lg border border-transparent hover:border-black/10 transition-all shadow-sm" title="Seçenekler">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm font-medium text-zinc-500">
                    Arama kriterlerinize uygun müşteri bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-black/5 flex items-center justify-between text-sm font-medium text-zinc-500">
          <p>Toplam {filteredCustomers.length} müşteri listeleniyor.</p>
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
              className="px-4 py-2 border border-black/5 rounded-lg hover:bg-zinc-50 bg-white disabled:opacity-50 transition-colors shadow-sm"
            >
              Sonraki
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
