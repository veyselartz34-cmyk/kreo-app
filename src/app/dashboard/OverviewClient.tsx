"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, Wallet, ArrowUpRight, ArrowDownRight, Clock, Plus, CalendarDays } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: '1 Eki', gelir: 4800 },
  { name: '4 Eki', gelir: 3000 },
  { name: '7 Eki', gelir: 7200 },
  { name: '10 Eki', gelir: 3600 },
  { name: '13 Eki', gelir: 10200 },
  { name: '16 Eki', gelir: 5400 },
  { name: '19 Eki', gelir: 11400 },
  { name: '22 Eki', gelir: 7200 },
  { name: '25 Eki', gelir: 12000 },
  { name: '28 Eki', gelir: 9000 },
  { name: '31 Eki', gelir: 5400 },
  { name: '3 Kas', gelir: 9600 },
];

import Link from "next/link";

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
    { label: "Aylık Gelir (MRR)", value: totalRevenue, trend: salesCount > 0 ? "+12.5%" : "0%", isPositive: true, icon: Wallet },
    { label: "Toplam Satış", value: salesCount.toString(), trend: salesCount > 0 ? "+5.2%" : "0%", isPositive: true, icon: TrendingUp },
    { label: "Ürün Sayısı", value: productsCount.toString(), trend: "+100%", isPositive: true, icon: Users },
    { label: "Vitrin Görüntülenmesi", value: salesCount > 0 ? "1.2k" : "0", trend: "+24.1%", isPositive: true, icon: Eye },
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
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Tekrar Hoş Geldin, {userName} 👋</h1>
          <p className="text-zinc-500 text-sm mt-1">İşte vitrininin son 30 günlük performansı.</p>
        </div>
        <Link 
          href="/dashboard/products/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D32F2F] text-white text-sm font-semibold rounded-xl hover:bg-[#C62828] transition-colors shadow-lg shadow-red-500/20"
        >
          <Plus className="w-4 h-4" />
          Yeni Ürün Ekle
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            key={i} 
            className="bg-white p-5 rounded-2xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-zinc-600" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</h3>
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
          className="lg:col-span-2 bg-white p-6 rounded-3xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-[#1A1A1A]">Gelir Analizi</h3>
            <select className="bg-zinc-50 border border-black/5 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 outline-none focus:ring-2 focus:ring-[#D32F2F]/20">
              <option>Son 30 Gün</option>
              <option>Bu Yıl</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full mt-4 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D32F2F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D32F2F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#000000" strokeOpacity={0.05} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#71717A' }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#71717A' }} 
                  tickFormatter={(value) => `₺${value}`} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  itemStyle={{ color: '#D32F2F', fontWeight: 'bold' }}
                  formatter={(value: any) => [`₺${Number(value || 0).toLocaleString()}`, 'Gelir']}
                  labelStyle={{ color: '#71717A', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="gelir" 
                  stroke="#D32F2F" 
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
          className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#1A1A1A]">Yaklaşan Görüşmeler</h3>
            <button className="text-sm font-medium text-[#D32F2F] hover:underline">Tümü</button>
          </div>

          <div className="space-y-4">
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.map((meeting, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-black/5 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-[#D32F2F]/10 flex items-center justify-center flex-shrink-0 text-[#D32F2F]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">{meeting.name}</h4>
                    <p className="text-xs font-medium text-zinc-500 mt-0.5">{meeting.type}</p>
                    <p className="text-xs font-semibold text-zinc-400 mt-2 flex items-center gap-1">
                      <CalendarDays className="w-3 h-3 inline" /> {meeting.time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-sm text-zinc-500">
                Henüz yaklaşan görüşmeniz yok.
              </div>
            )}
          </div>

          <button className="w-full py-3 mt-6 bg-zinc-50 text-[#1A1A1A] text-sm font-bold rounded-xl border border-black/5 hover:bg-zinc-100 transition-colors">
            Takvimi Yönet
          </button>
        </motion.div>
      </div>
    </div>
  );
}
