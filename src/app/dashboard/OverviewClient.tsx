"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, Wallet, ArrowUpRight, ArrowDownRight, Clock, Plus, CalendarDays, ArrowRight } from "lucide-react";
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
    { label: "Aylık Gelir (MRR)", value: totalRevenue, trend: salesCount > 0 ? "+12.5%" : "0%", isPositive: true, icon: Wallet, color: "from-[#FBC02D] to-[#F57C00]" },
    { label: "Toplam Satış", value: salesCount.toString(), trend: salesCount > 0 ? "+5.2%" : "0%", isPositive: true, icon: TrendingUp, color: "from-blue-400 to-indigo-500" },
    { label: "Ürün Sayısı", value: productsCount.toString(), trend: "+100%", isPositive: true, icon: Users, color: "from-emerald-400 to-teal-500" },
    { label: "Vitrin Ziyareti", value: salesCount > 0 ? "1.2k" : "0", trend: "+24.1%", isPositive: true, icon: Eye, color: "from-purple-400 to-pink-500" },
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
    <div className="max-w-7xl mx-auto text-zinc-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-black tracking-tight text-white"
          >
            Tekrar Hoş Geldin, {userName} 👋
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-sm mt-2 font-medium"
          >
            İşte son 30 günlük satış ve etkileşim raporun.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Link 
            href="/dashboard/products/new"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D32F2F] to-[#C62828] text-white text-sm font-bold rounded-xl hover:from-[#C62828] hover:to-[#B71C1C] transition-all shadow-[0_0_20px_rgba(211,47,47,0.3)] hover:shadow-[0_0_30px_rgba(211,47,47,0.5)] transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Yeni Ürün Ekle
          </Link>
        </motion.div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            key={i} 
            className="bg-[#111] p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors"
          >
            {/* Subtle glow effect on hover */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-zinc-300" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.isPositive ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-zinc-400 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-white tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recharts Area/Line Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 bg-[#111] p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">Gelir Analizi</h3>
              <p className="text-sm text-zinc-500 mt-1">Vitrininden elde edilen brüt kazanç.</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-zinc-300 outline-none focus:ring-2 focus:ring-[#D32F2F]/50 appearance-none cursor-pointer">
              <option>Son 30 Gün</option>
              <option>Bu Yıl</option>
            </select>
          </div>
          
          <div className="h-[320px] w-full mt-4 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D32F2F" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#D32F2F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#FFFFFF" strokeOpacity={0.05} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#71717A', fontWeight: 500 }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#71717A', fontWeight: 500 }} 
                  tickFormatter={(value) => `₺${value}`} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#18181B', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#F87171', fontWeight: 'bold' }}
                  formatter={(value: any) => [`₺${Number(value || 0).toLocaleString()}`, 'Gelir']}
                  labelStyle={{ color: '#A1A1AA', marginBottom: '8px', fontWeight: 500 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="gelir" 
                  stroke="#F87171" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorGelir)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Yaklaşan Görüşmeler / Aktiviteler */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-[#111] p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">Görüşmeler</h3>
              <p className="text-sm text-zinc-500 mt-1">Yaklaşan etkinlikleriniz.</p>
            </div>
            <Link href="/dashboard/calendar" className="text-sm font-bold text-[#D32F2F] hover:text-[#F87171] transition-colors">Tümü</Link>
          </div>

          <div className="space-y-3 flex-1">
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.map((meeting, i) => (
                <div key={i} className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D32F2F]/20 to-transparent border border-[#D32F2F]/20 flex items-center justify-center flex-shrink-0 text-[#F87171] group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{meeting.name}</h4>
                    <p className="text-xs font-medium text-zinc-400 mt-1 truncate">{meeting.type}</p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs font-bold text-zinc-500 flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded-md w-fit border border-white/5">
                        <CalendarDays className="w-3.5 h-3.5 text-zinc-400" /> {meeting.time}
                      </p>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                  <CalendarDays className="w-8 h-8 text-zinc-600" />
                </div>
                <p className="text-sm font-medium text-zinc-400">Henüz yaklaşan görüşmeniz yok.</p>
              </div>
            )}
          </div>

          <button className="w-full py-4 mt-6 bg-white/5 text-white text-sm font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-colors focus:ring-2 focus:ring-white/20 outline-none">
            Takvimi Yönet
          </button>
        </motion.div>
      </div>
    </div>
  );
}
