"use client";

import { motion } from "framer-motion";
import { Users, Globe2, Smartphone, MousePointerClick, Filter, ArrowRight, ArrowDownRight, Zap } from "lucide-react";
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
    <div className="max-w-7xl mx-auto text-[#1A1A1A] pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Gelişmiş Analiz</h1>
          <p className="text-zinc-500 text-base mt-3 font-medium max-w-xl">
            Vitrininizin performansını en ince ayrıntısına kadar inceleyin. Satış huninizdeki darboğazları keşfedin ve stratejinizi büyütün.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-3 px-6 py-3.5 bg-white border border-black/5 rounded-2xl text-sm font-bold text-[#1A1A1A] hover:bg-zinc-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4 text-[#D32F2F]" /> Son 7 Gün
          </button>
        </div>
      </div>

      {/* Dönüşüm Hunisi - Çok Daha Ferah Tasarım */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white px-8 py-12 sm:px-12 sm:py-16 rounded-[2.5rem] border border-black/5 shadow-sm mb-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-[100px] opacity-50 pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="mb-14 relative z-10">
          <h3 className="text-2xl font-black text-[#1A1A1A]">Dönüşüm Hunisi (Funnel)</h3>
          <p className="text-base font-medium text-zinc-500 mt-2">Ziyaretçilerinizin satın alma yolculuğundaki adım adım davranışları.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 relative z-10">
          {funnelData.map((step, idx) => (
            <div key={idx} className="flex-1 w-full relative">
              {idx < funnelData.length - 1 && (
                <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 z-10 text-zinc-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
              
              <div className={`p-8 rounded-[2rem] border transition-all duration-300 ${
                idx === funnelData.length - 1 
                  ? 'bg-green-50 border-green-100 shadow-sm' 
                  : 'bg-zinc-50/50 border-black/5 hover:bg-white hover:shadow-md'
              }`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                    idx === funnelData.length - 1 ? 'bg-green-500 text-white' : 'bg-[#1A1A1A] text-white'
                  }`}>
                    {idx + 1}
                  </div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{step.name}</p>
                </div>
                
                <p className="text-4xl font-black text-[#1A1A1A] tracking-tight">{step.count.toLocaleString()}</p>
                
                {idx > 0 && (
                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#D32F2F] bg-red-50/50 w-fit px-3 py-1.5 rounded-lg">
                    <ArrowDownRight className="w-4 h-4" />
                    % {Math.round((step.count / funnelData[idx-1].count) * 100)} Geçiş
                  </div>
                )}
                {idx === 0 && (
                  <div className="mt-5 text-sm font-bold text-zinc-400 px-1 py-1.5">
                    Başlangıç Noktası
                  </div>
                )}
              </div>
              
              {idx < funnelData.length - 1 && (
                <div className="lg:hidden flex justify-center py-4 text-zinc-300">
                  <ArrowDownRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Trafik Grafiği - Büyük ve Ferah */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-10 sm:p-12 rounded-[2.5rem] border border-black/5 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <div>
              <h3 className="text-2xl font-black text-[#1A1A1A]">Ziyaretçi Trafiği</h3>
              <p className="text-base font-medium text-zinc-500 mt-2">Vitrininize gelen günlük tekil tıklamalar.</p>
            </div>
            <div className="flex items-center gap-3 bg-zinc-50 px-5 py-2.5 rounded-xl border border-black/5 text-base font-black text-[#1A1A1A]">
              <Users className="w-5 h-5 text-[#D32F2F]" />
              Toplam 2,450
            </div>
          </div>
          <div className="h-[350px] w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barSize={32}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#000000" strokeOpacity={0.05} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#71717A', fontWeight: 600 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#71717A', fontWeight: 600 }} dx={-10} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', padding: '16px' }}
                  labelStyle={{ fontWeight: 600, color: '#71717A', marginBottom: '8px' }}
                  itemStyle={{ fontWeight: 900, color: '#1A1A1A', fontSize: '18px' }}
                />
                <Bar dataKey="ziyaret" fill="#1A1A1A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Trafik Kaynakları (Pie Chart) - Büyük ve Ferah */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 sm:p-12 rounded-[2.5rem] border border-black/5 shadow-sm flex flex-col"
        >
          <div className="mb-12">
            <h3 className="text-2xl font-black text-[#1A1A1A]">Trafik Kaynağı</h3>
            <p className="text-base font-medium text-zinc-500 mt-2">Müşterileriniz vitrininize nereden ulaşıyor?</p>
          </div>
          
          <div className="h-[280px] w-full relative flex items-center justify-center mb-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={120}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="none"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
                  itemStyle={{ fontWeight: 900, fontSize: '16px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <MousePointerClick className="w-8 h-8 text-zinc-300 mb-2" />
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Kaynak</span>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-y-6 gap-x-4">
            {sourceData.map((source, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-zinc-50/50 p-4 rounded-2xl border border-black/5">
                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: source.color }}></div>
                <div>
                  <div className="text-sm font-bold text-zinc-500">{source.name}</div>
                  <div className="text-lg font-black text-[#1A1A1A]">%{source.value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Cihaz Dağılımı - Ferah */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-10 sm:p-12 rounded-[2.5rem] border border-black/5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black text-[#1A1A1A]">Cihaz Analizi</h3>
              <p className="text-base font-medium text-zinc-500 mt-2">Mobil ve Masaüstü kullanım oranları.</p>
            </div>
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-black/5">
              <Smartphone className="w-6 h-6 text-zinc-400" />
            </div>
          </div>
          
          <div className="space-y-8">
            {deviceData.map((device, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-black text-[#1A1A1A]">{device.name}</span>
                  <span className="text-xl font-black text-zinc-400">%{device.value}</span>
                </div>
                <div className="w-full h-4 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${device.value}%`, backgroundColor: device.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-red-50/50 rounded-2xl border border-red-100 flex gap-4 items-start">
            <Zap className="w-6 h-6 text-[#D32F2F] flex-shrink-0 mt-0.5" />
            <p className="text-sm font-bold text-[#D32F2F] leading-relaxed">
              Ziyaretçilerinizin %82'si mobil cihaz kullanıyor. Sosyal medya reklamlarınızı mobil ekranlara optimize etmeniz dönüşüm oranınızı artıracaktır.
            </p>
          </div>
        </motion.div>

        {/* Konum / Şehirler - Ferah Listeleme */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-10 sm:p-12 rounded-[2.5rem] border border-black/5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-[#1A1A1A]">Bölgesel Erişim</h3>
              <p className="text-base font-medium text-zinc-500 mt-2">En çok ziyaret eden şehirler.</p>
            </div>
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-black/5">
              <Globe2 className="w-6 h-6 text-zinc-400" />
            </div>
          </div>

          <div className="space-y-3">
            {cityData.map((city, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 rounded-2xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-black/5">
                <div className="flex items-center gap-5">
                  <span className="text-lg font-black text-zinc-300 w-5">{idx + 1}</span>
                  <span className="text-base font-black text-[#1A1A1A]">{city.name}</span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-sm font-bold text-zinc-500">{city.count} Ziyaretçi</span>
                  <span className="text-base font-black text-[#1A1A1A] w-12 text-right bg-zinc-100 px-2 py-1 rounded-lg">{city.percent}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
