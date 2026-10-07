"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Globe2, Smartphone, MousePointerClick, Filter } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const trafficData = [
  { name: 'Pzt', ziyaret: 120 },
  { name: 'Sal', ziyaret: 250 },
  { name: 'Çar', ziyaret: 180 },
  { name: 'Per', ziyaret: 320 },
  { name: 'Cum', ziyaret: 450 },
  { name: 'Cmt', ziyaret: 520 },
  { name: 'Paz', ziyaret: 610 },
];

const sourceData = [
  { name: 'Instagram', value: 55, color: '#D32F2F' },
  { name: 'Twitter (X)', value: 25, color: '#1A1A1A' },
  { name: 'Doğrudan', value: 15, color: '#4ADE80' },
  { name: 'Diğer', value: 5, color: '#A1A1AA' },
];

const funnelData = [
  { name: 'Vitrini Görüntüleme', count: 2450 },
  { name: 'Ürüne Tıklama', count: 850 },
  { name: 'Ödeme Adımı', count: 320 },
  { name: 'Başarılı Satın Alma', count: 125 },
];

const deviceData = [
  { name: 'Mobil', value: 82, color: '#1A1A1A' },
  { name: 'Masaüstü', value: 18, color: '#D32F2F' },
];

const cityData = [
  { name: "İstanbul", count: 850, percent: "35%" },
  { name: "Ankara", count: 420, percent: "18%" },
  { name: "İzmir", count: 310, percent: "12%" },
  { name: "Bursa", count: 150, percent: "6%" },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto text-[#1A1A1A]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Gelişmiş Analiz</h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium">Ziyaretçilerinin davranışlarını izle ve satış hunini optimize et.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] hover:bg-zinc-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4 text-zinc-500" /> Son 7 Gün
          </button>
        </div>
      </div>

      {/* Conversion Funnel (Dönüşüm Hunisi) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)] mb-8"
      >
        <div className="mb-8">
          <h3 className="text-xl font-black text-[#1A1A1A]">Dönüşüm Hunisi (Funnel)</h3>
          <p className="text-sm font-medium text-zinc-500 mt-1">Ziyaretçilerin yüzde kaçının müşteriye dönüştüğünü analiz et.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {funnelData.map((step, idx) => (
            <div key={idx} className="relative bg-zinc-50 border border-black/5 p-6 rounded-2xl">
              {idx < funnelData.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-black/5 rounded-full flex items-center justify-center z-10 shadow-sm">
                  <ArrowRight className="w-3 h-3 text-zinc-400" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${idx === funnelData.length - 1 ? 'bg-green-100 text-green-700' : 'bg-[#1A1A1A] text-white'}`}>
                  {idx + 1}
                </div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{step.name}</p>
              </div>
              <p className="text-3xl font-black text-[#1A1A1A]">{step.count.toLocaleString()}</p>
              
              {idx > 0 && (
                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#D32F2F]">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  % {Math.round((step.count / funnelData[idx-1].count) * 100)} Geçiş
                </div>
              )}
              {idx === 0 && (
                <div className="mt-3 text-xs font-bold text-zinc-400">
                  Başlangıç Noktası
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Trafik Grafiği */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-[#1A1A1A]">Ziyaretçi Trafiği</h3>
              <p className="text-sm font-medium text-zinc-500 mt-1">Vitrininize gelen günlük tekil tıklamalar.</p>
            </div>
            <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-lg border border-black/5 text-sm font-bold text-[#1A1A1A]">
              <Users className="w-4 h-4 text-[#D32F2F]" />
              Toplam 2,450
            </div>
          </div>
          <div className="h-[280px] w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#000000" strokeOpacity={0.05} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717A', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717A', fontWeight: 600 }} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  labelStyle={{ fontWeight: 600, color: '#71717A', marginBottom: '4px' }}
                  itemStyle={{ fontWeight: 900, color: '#1A1A1A' }}
                />
                <Bar dataKey="ziyaret" fill="#1A1A1A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Trafik Kaynakları (Pie Chart) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)] flex flex-col"
        >
          <div className="mb-2">
            <h3 className="text-xl font-black text-[#1A1A1A]">Trafik Kaynağı</h3>
            <p className="text-sm font-medium text-zinc-500 mt-1">Müşteriler nereden geliyor?</p>
          </div>
          
          <div className="h-[200px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}
                  itemStyle={{ fontWeight: 900 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <MousePointerClick className="w-6 h-6 text-zinc-400 mb-1" />
              <span className="text-xs font-bold text-zinc-500">Kaynaklar</span>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            {sourceData.map((source, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                  <span className="text-sm font-bold text-[#1A1A1A]">{source.name}</span>
                </div>
                <span className="text-sm font-black text-zinc-500">%{source.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cihaz Dağılımı */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-[#1A1A1A]">Cihaz Analizi</h3>
              <p className="text-sm font-medium text-zinc-500 mt-1">Mobil vs Masaüstü tıklamaları.</p>
            </div>
            <Smartphone className="w-5 h-5 text-zinc-400" />
          </div>
          
          <div className="space-y-6">
            {deviceData.map((device, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#1A1A1A]">{device.name}</span>
                  <span className="text-sm font-black text-zinc-500">%{device.value}</span>
                </div>
                <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${device.value}%`, backgroundColor: device.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-red-50 rounded-2xl border border-red-100">
            <p className="text-sm font-bold text-[#D32F2F]">
              💡 Ziyaretçilerinizin %82'si mobil cihaz kullanıyor. Vitrin tasarımınızın mobilde kusursuz göründüğünden emin olun.
            </p>
          </div>
        </motion.div>

        {/* Konum / Şehirler */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-[#1A1A1A]">En Çok Ziyaret Eden Şehirler</h3>
              <p className="text-sm font-medium text-zinc-500 mt-1">Takipçilerinizin coğrafi dağılımı.</p>
            </div>
            <Globe2 className="w-5 h-5 text-zinc-400" />
          </div>

          <div className="space-y-4">
            {cityData.map((city, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-zinc-300 w-4">{idx + 1}</span>
                  <span className="text-sm font-bold text-[#1A1A1A]">{city.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium text-zinc-500">{city.count} Kişi</span>
                  <span className="text-sm font-black text-[#1A1A1A] w-10 text-right">{city.percent}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
