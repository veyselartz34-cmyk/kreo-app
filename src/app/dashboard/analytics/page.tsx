"use client";

import { motion } from "framer-motion";
import { Users, Globe2, Smartphone, MousePointerClick, Filter, ArrowRight, ArrowDownRight, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const trafficData = [
  { name: 'Pazartesi', ziyaret: 120 },
  { name: 'Salı', ziyaret: 250 },
  { name: 'Çarşamba', ziyaret: 180 },
  { name: 'Perşembe', ziyaret: 320 },
  { name: 'Cuma', ziyaret: 450 },
  { name: 'Cumartesi', ziyaret: 520 },
  { name: 'Pazar', ziyaret: 610 },
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
  { name: "Antalya", count: 80, percent: "3%" },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-5xl mx-auto text-[#1A1A1A] pb-32">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-20 border-b border-black/5 pb-10">
        <div>
          <h1 className="text-5xl font-black text-[#1A1A1A] tracking-tighter">Gelişmiş Analiz</h1>
          <p className="text-zinc-500 text-lg mt-4 font-medium max-w-2xl leading-relaxed">
            Müşterilerinizin vitrininizdeki her adımını, nereden geldiklerini ve nereye tıkladıklarını 
            kusursuz bir netlikle izleyin.
          </p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-white border border-black/5 rounded-2xl text-base font-bold text-[#1A1A1A] hover:bg-zinc-50 transition-colors shadow-sm whitespace-nowrap">
          <Filter className="w-5 h-5 text-[#D32F2F]" /> Son 30 Gün
        </button>
      </div>

      <div className="space-y-24">
        {/* 1. DÖNÜŞÜM HUNİSİ (Tam Genişlik) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white px-10 py-16 sm:px-16 sm:py-20 rounded-[3rem] border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] opacity-60 pointer-events-none -mr-40 -mt-40"></div>
          
          <div className="mb-16 relative z-10 text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Dönüşüm Hunisi (Funnel)</h3>
            <p className="text-lg font-medium text-zinc-500 mt-4 leading-relaxed">Ziyaretçilerinizin satın alma yolculuğundaki adım adım davranışları.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 relative z-10">
            {funnelData.map((step, idx) => (
              <div key={idx} className="flex-1 relative flex flex-col">
                <div className="flex-1 p-8 sm:p-10 rounded-[2rem] border transition-all duration-300 bg-zinc-50/50 border-black/5 hover:bg-white hover:shadow-lg flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl mb-8 shadow-sm ${
                    idx === funnelData.length - 1 ? 'bg-green-500 text-white' : 'bg-white border border-black/10 text-[#1A1A1A]'
                  }`}>
                    {idx + 1}
                  </div>
                  
                  <p className="text-5xl font-black text-[#1A1A1A] tracking-tighter mb-4">{step.count.toLocaleString()}</p>
                  <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{step.name}</p>
                  
                  {idx > 0 && (
                    <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#D32F2F] bg-red-50 px-4 py-2 rounded-xl">
                      <ArrowDownRight className="w-5 h-5" />
                      % {Math.round((step.count / funnelData[idx-1].count) * 100)} Dönüşüm
                    </div>
                  )}
                </div>
                
                {idx < funnelData.length - 1 && (
                  <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-black/5 rounded-full items-center justify-center z-10 shadow-sm text-zinc-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
                {idx < funnelData.length - 1 && (
                  <div className="md:hidden flex justify-center py-6 text-zinc-300">
                    <ArrowDownRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* 2. ZİYARETÇİ TRAFİĞİ (Tam Genişlik) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-10 sm:p-16 rounded-[3rem] border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-16">
            <div>
              <h3 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Ziyaretçi Trafiği</h3>
              <p className="text-lg font-medium text-zinc-500 mt-4">Vitrininize gelen günlük tekil tıklama sayıları.</p>
            </div>
            <div className="flex items-center gap-4 bg-zinc-50 px-8 py-4 rounded-2xl border border-black/5 text-lg font-black text-[#1A1A1A]">
              <Users className="w-6 h-6 text-[#D32F2F]" />
              Toplam 2,450 Ziyaret
            </div>
          </div>
          
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={48}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#000000" strokeOpacity={0.05} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: '#71717A', fontWeight: 600 }} dy={20} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: '#71717A', fontWeight: 600 }} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '24px' }}
                  labelStyle={{ fontWeight: 600, color: '#71717A', marginBottom: '12px', fontSize: '16px' }}
                  itemStyle={{ fontWeight: 900, color: '#1A1A1A', fontSize: '24px' }}
                />
                <Bar dataKey="ziyaret" fill="#1A1A1A" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 3. TRAFİK KAYNAĞI VE CİHAZ (Yatay Büyük Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Trafik Kaynağı */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-10 sm:p-14 rounded-[3rem] border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col"
          >
            <div className="mb-14">
              <h3 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Trafik Kaynağı</h3>
              <p className="text-lg font-medium text-zinc-500 mt-4">Müşterileriniz vitrininize nereden ulaşıyor?</p>
            </div>
            
            <div className="h-[350px] w-full relative flex items-center justify-center mb-12">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={110}
                    outerRadius={150}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontWeight: 900, fontSize: '20px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <MousePointerClick className="w-10 h-10 text-zinc-300 mb-3" />
                <span className="text-base font-bold text-zinc-400 uppercase tracking-widest">Kaynak</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto">
              {sourceData.map((source, idx) => (
                <div key={idx} className="flex items-center gap-5 bg-zinc-50 p-6 rounded-2xl border border-black/5">
                  <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: source.color }}></div>
                  <div>
                    <div className="text-base font-bold text-zinc-500 mb-1">{source.name}</div>
                    <div className="text-2xl font-black text-[#1A1A1A]">%{source.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cihaz Analizi */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-10 sm:p-14 rounded-[3rem] border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col"
          >
            <div className="flex items-center justify-between mb-14">
              <div>
                <h3 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Cihaz Analizi</h3>
                <p className="text-lg font-medium text-zinc-500 mt-4">Mobil ve Masaüstü kullanım oranları.</p>
              </div>
              <div className="w-16 h-16 bg-zinc-50 rounded-[1.5rem] flex items-center justify-center border border-black/5">
                <Smartphone className="w-8 h-8 text-zinc-400" />
              </div>
            </div>
            
            <div className="space-y-12 flex-1">
              {deviceData.map((device, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-[#1A1A1A]">{device.name}</span>
                    <span className="text-3xl font-black text-zinc-400">%{device.value}</span>
                  </div>
                  <div className="w-full h-6 bg-zinc-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${device.value}%`, backgroundColor: device.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-8 bg-red-50 rounded-[2rem] border border-red-100 flex gap-6 items-start">
              <Zap className="w-8 h-8 text-[#D32F2F] flex-shrink-0 mt-1" />
              <p className="text-base font-bold text-[#D32F2F] leading-relaxed">
                Ziyaretçilerinizin büyük çoğunluğu mobil cihaz kullanıyor. Sosyal medya kampanyalarınızı ve ürün görsellerinizi dikey ekranlara uygun tasarlamalısınız.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 4. ŞEHİRLER (Tam Genişlik) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-10 sm:p-16 rounded-[3rem] border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-16 border-b border-black/5 pb-10">
            <div>
              <h3 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Bölgesel Erişim</h3>
              <p className="text-lg font-medium text-zinc-500 mt-4">Vitrininizi en çok ziyaret eden şehirlerin dağılımı.</p>
            </div>
            <div className="w-16 h-16 bg-zinc-50 rounded-[1.5rem] flex items-center justify-center border border-black/5">
              <Globe2 className="w-8 h-8 text-zinc-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {cityData.map((city, idx) => (
              <div key={idx} className="flex items-center justify-between p-6 rounded-2xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-black/5">
                <div className="flex items-center gap-6">
                  <span className="text-2xl font-black text-zinc-300 w-8">{idx + 1}</span>
                  <span className="text-xl font-black text-[#1A1A1A]">{city.name}</span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-base font-bold text-zinc-500">{city.count} Ziyaretçi</span>
                  <span className="text-xl font-black text-[#1A1A1A] w-16 text-right bg-zinc-100 px-3 py-2 rounded-xl">{city.percent}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
