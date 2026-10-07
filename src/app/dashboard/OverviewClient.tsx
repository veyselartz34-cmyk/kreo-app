"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, Wallet, ArrowUpRight, ArrowDownRight, Clock, Plus, CalendarDays, ArrowRight, Package, Link2, Download, Zap, Star } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from "next/link";

const chartData = [
  { name: '1 Eki', gelir: 4800 },
  { name: '4 Eki', gelir: 3000 },
  { name: '7 Eki', gelir: 7200 },
  { name: '10 Eki', gelir: 3600 },
  { name: '13 Eki', gelir: 10200 },
  { name: '16 Eki', gelir: 5000 },
  { name: '19 Eki', gelir: 8000 },
  { name: '22 Eki', gelir: 12500 },
  { name: '25 Eki', gelir: 6200 },
  { name: '28 Eki', gelir: 9000 },
  { name: '31 Eki', gelir: 5400 },
  { name: '3 Kas', gelir: 9600 },
];

const recentSales = [
  { id: 1, customer: "Ahmet Yılmaz", product: "Girişimcilik 101 E-Kitap", amount: "₺200", time: "12 dk önce", type: "digital" },
  { id: 2, customer: "Ayşe Kaya", product: "1:1 Yazılım Mentörlüğü", amount: "₺1.200", time: "1 saat önce", type: "meeting" },
  { id: 3, customer: "Caner Demir", product: "Notion Verimlilik Şablonu", amount: "₺150", time: "3 saat önce", type: "digital" },
  { id: 4, customer: "Zeynep Çelik", product: "Kreo Pro Aboneliği", amount: "₺499", time: "5 saat önce", type: "subscription" },
];

const topProducts = [
  { id: 1, title: "1:1 Yazılım Mentörlüğü", sales: 24, revenue: "₺28.800", icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 2, title: "Girişimcilik 101 E-Kitap", sales: 145, revenue: "₺29.000", icon: Download, color: "text-green-500", bg: "bg-green-50" },
  { id: 3, title: "Notion Verimlilik Şablonu", sales: 89, revenue: "₺13.350", icon: Package, color: "text-purple-500", bg: "bg-purple-50" },
];

type OverviewProps = {
  userName: string;
  productsCount: number;
  meetingsCount: number;
  totalRevenue: string;
  salesCount: number;
  upcomingMeetings: { name: string; type: string; time: string }[];
};

export default function OverviewClient({
  userName,
  productsCount,
  meetingsCount,
  totalRevenue,
  salesCount,
  upcomingMeetings,
}: OverviewProps) {
  const stats = [
    { label: "Aylık Gelir (MRR)", value: totalRevenue, trend: salesCount > 0 ? "+12.5%" : "0%", isPositive: true, icon: Wallet, bg: "bg-orange-50", color: "text-orange-500" },
    { label: "Toplam Satış", value: salesCount.toString(), trend: salesCount > 0 ? "+5.2%" : "0%", isPositive: true, icon: TrendingUp, bg: "bg-blue-50", color: "text-blue-500" },
    { label: "Ürün Sayısı", value: productsCount.toString(), trend: "+100%", isPositive: true, icon: Users, bg: "bg-emerald-50", color: "text-emerald-500" },
    { label: "Vitrin Ziyareti", value: salesCount > 0 ? "1.2k" : "0", trend: "+24.1%", isPositive: true, icon: Eye, bg: "bg-purple-50", color: "text-purple-500" },
  ];

  const emptyChartData = [
    { name: '1 Eki', gelir: 0 },
    { name: '7 Eki', gelir: 0 },
    { name: '14 Eki', gelir: 0 },
    { name: '21 Eki', gelir: 0 },
    { name: '28 Eki', gelir: 0 },
  ];

  const userChartData = salesCount > 0 ? chartData : emptyChartData;

  return (
    <div className="max-w-7xl mx-auto text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-black tracking-tight text-[#1A1A1A]"
          >
            Tekrar Hoş Geldin, {userName} 👋
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-sm mt-2 font-medium"
          >
            İşte vitrininin son 30 günlük satış ve etkileşim raporu.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex gap-3"
        >
          <button className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-black/5 text-[#1A1A1A] text-sm font-bold rounded-xl hover:bg-zinc-50 transition-all shadow-sm">
            <Link2 className="w-4 h-4" />
            Vitrin Linkini Kopyala
          </button>
          <Link 
            href="/dashboard/products/new"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#B71C1C] transition-all shadow-[0_4px_14px_rgba(211,47,47,0.3)] hover:shadow-[0_6px_20px_rgba(211,47,47,0.4)] transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Yeni Ürün Ekle
          </Link>
        </motion.div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            key={i} 
            className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:border-black/10 transition-colors cursor-default"
          >
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-sm font-bold text-zinc-500 mb-1 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-black text-[#1A1A1A] tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recharts Area/Line Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-[#1A1A1A]">Gelir Analizi</h3>
              <p className="text-sm font-medium text-zinc-500 mt-1">Vitrininden elde edilen brüt kazanç akışı.</p>
            </div>
            <select className="bg-zinc-50 border border-black/5 rounded-xl px-4 py-2 text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/50 appearance-none cursor-pointer">
              <option>Son 30 Gün</option>
              <option>Bu Yıl</option>
            </select>
          </div>
          
          <div className="h-[320px] w-full mt-4 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D32F2F" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#D32F2F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#000000" strokeOpacity={0.05} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#71717A', fontWeight: 600 }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#71717A', fontWeight: 600 }} 
                  tickFormatter={(value) => `₺${value}`} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#FFFFFF', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
                  itemStyle={{ color: '#D32F2F', fontWeight: '900' }}
                  formatter={(value: any) => [`₺${Number(value || 0).toLocaleString()}`, 'Gelir']}
                  labelStyle={{ color: '#71717A', marginBottom: '8px', fontWeight: 600 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="gelir" 
                  stroke="#D32F2F" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorGelir)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Canlı Satış Akışı (Recent Activity) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)] flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-[#1A1A1A]">Canlı Satışlar</h3>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
              <p className="text-sm font-medium text-zinc-500 mt-1">Son gerçekleşen siparişler.</p>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            {salesCount > 0 ? (
              recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    sale.type === 'digital' ? 'bg-green-100 text-green-600' :
                    sale.type === 'meeting' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {sale.type === 'digital' ? <Download className="w-4 h-4" /> :
                     sale.type === 'meeting' ? <Clock className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1A1A1A] truncate">{sale.customer}</p>
                    <p className="text-xs font-medium text-zinc-500 truncate">{sale.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-green-600">{sale.amount}</p>
                    <p className="text-xs font-bold text-zinc-400">{sale.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-4 border border-black/5">
                  <Zap className="w-8 h-8 text-zinc-400" />
                </div>
                <p className="text-sm font-bold text-zinc-500">Henüz bir satış gerçekleşmedi.</p>
              </div>
            )}
          </div>
          <Link href="/dashboard/orders" className="w-full text-center py-3 mt-4 text-sm font-bold text-[#D32F2F] hover:bg-red-50 rounded-xl transition-colors">
            Tüm Siparişleri Gör
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* En Çok Satan Ürünler */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-[#1A1A1A]">En Çok Satanlar</h3>
              <p className="text-sm font-medium text-zinc-500 mt-1">Cironuzu oluşturan ana ürünler.</p>
            </div>
            <Link href="/dashboard/products" className="text-sm font-bold text-[#D32F2F] hover:text-[#B71C1C]">Tümü</Link>
          </div>
          
          <div className="space-y-4">
            {salesCount > 0 ? topProducts.map((product, idx) => (
              <div key={product.id} className="flex items-center gap-4 p-4 border border-black/5 rounded-2xl hover:border-black/10 transition-colors">
                <div className="font-black text-xl text-zinc-300 w-6 text-center">{idx + 1}</div>
                <div className={`w-12 h-12 rounded-xl ${product.bg} flex items-center justify-center flex-shrink-0`}>
                  <product.icon className={`w-5 h-5 ${product.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#1A1A1A] truncate">{product.title}</h4>
                  <p className="text-xs font-bold text-zinc-500 mt-0.5">{product.sales} Satış</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-[#1A1A1A]">{product.revenue}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm font-medium text-zinc-500 text-center py-8">Yeterli veri yok.</p>
            )}
          </div>
        </motion.div>

        {/* Yaklaşan Görüşmeler (Mevcut Olan) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)] flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-[#1A1A1A]">Yaklaşan Görüşmeler</h3>
              <p className="text-sm font-medium text-zinc-500 mt-1">Takvimindeki 1:1 randevular.</p>
            </div>
            <Link href="/dashboard/calendar" className="text-sm font-bold text-[#D32F2F] hover:text-[#B71C1C]">Takvim</Link>
          </div>

          <div className="space-y-3 flex-1">
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.map((meeting, i) => (
                <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors border border-transparent hover:border-black/5 cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#1A1A1A] truncate">{meeting.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-zinc-500 bg-white border border-black/5 px-2 py-0.5 rounded-md">
                        {meeting.type}
                      </span>
                      <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" /> {meeting.time}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#D32F2F] transition-colors" />
                </div>
              ))
            ) : (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-4 border border-black/5">
                  <CalendarDays className="w-8 h-8 text-zinc-400" />
                </div>
                <p className="text-sm font-bold text-zinc-500">Henüz yaklaşan görüşmeniz yok.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
