"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Users, CreditCard, Package, ArrowRight, Wallet, Bell, Sparkles } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Link from "next/link";

type RecentOrder = {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  amount: number;
  date: string;
};

type TopProduct = {
  title: string;
  count: number;
  revenue: number;
};

type ChartData = {
  name: string;
  revenue: number;
};

export default function OverviewClient({ 
  userName, 
  productsCount, 
  totalRevenue, 
  salesCount,
  recentOrders,
  topProducts,
  chartData
}: { 
  userName: string, 
  productsCount: number, 
  totalRevenue: number, 
  salesCount: number,
  recentOrders: RecentOrder[],
  topProducts: TopProduct[],
  chartData: ChartData[]
}) {

  return (
    <div className="max-w-7xl mx-auto text-[#1A1A1A] pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 shadow-sm text-sm font-bold text-zinc-500 mb-4">
            <Sparkles className="w-4 h-4 text-orange-500" />
            Harika bir gün, {userName}!
          </div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Kreo'ya Hoş Geldin.</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">İşte mağazanın güncel performansı ve son hareketler.</p>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <Link href="/dashboard/products/new" className="hidden sm:flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D32F2F] text-white text-sm font-bold rounded-2xl hover:bg-[#B71C1C] transition-all shadow-[0_4px_14px_rgba(211,47,47,0.3)] hover:shadow-[0_6px_20px_rgba(211,47,47,0.4)] hover:-translate-y-0.5">
            <Package className="w-4 h-4" /> Yeni Ürün Ekle
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-7 rounded-[2rem] border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-black/10 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center border border-green-100">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Toplam Ciro</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black text-[#1A1A1A]">₺{totalRevenue.toLocaleString("tr-TR")}</h3>
          </div>
          {totalRevenue > 0 && (
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 w-fit px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5" /> Geçen haftaya göre +%15
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-7 rounded-[2rem] border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-black/10 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Satış Sayısı</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black text-[#1A1A1A]">{salesCount}</h3>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-7 rounded-[2rem] border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-black/10 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Aktif Ürünler</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black text-[#1A1A1A]">{productsCount}</h3>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-7 rounded-[2rem] border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-black/10 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center border border-purple-100">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Mağaza Ziyareti</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-black text-[#1A1A1A]">--</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-bold text-zinc-400">
            <span>Yakında eklenecek</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sol Taraf: Ciro Grafiği */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-full flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-[#1A1A1A]">Son 7 Günlük Ciro</h3>
                <p className="text-sm font-medium text-zinc-500 mt-1">Günlük satış performansınız.</p>
              </div>
              <select className="px-4 py-2 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none hover:bg-zinc-100 transition-colors cursor-pointer">
                <option>Son 7 Gün</option>
              </select>
            </div>

            <div className="flex-1 min-h-[300px] -ml-4">
              {chartData.every(d => d.revenue === 0) ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400">
                  <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-bold">Henüz satış verisi yok.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D32F2F" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#D32F2F" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#71717A', fontSize: 12, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#71717A', fontSize: 12, fontWeight: 700 }}
                      tickFormatter={(value) => `₺${value}`}
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1A1A1A', borderRadius: '16px', border: 'none', color: '#fff', fontWeight: 700, padding: '12px 20px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
                      itemStyle={{ color: '#fff', fontWeight: 900 }}
                      formatter={(value: any) => [`₺${value}`, 'Ciro']}
                      labelStyle={{ color: '#A1A1AA', marginBottom: '4px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#D32F2F" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                      activeDot={{ r: 6, fill: "#D32F2F", stroke: "#fff", strokeWidth: 3 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sağ Taraf: Son Satışlar & Top Ürünler */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-[#1A1A1A]">Canlı Satışlar</h3>
              <Link href="/dashboard/orders" className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors">
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <p className="text-sm font-bold text-zinc-400 text-center py-4">Henüz hiç satış yok.</p>
              ) : recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition-colors group">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center border border-green-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <span className="text-lg font-black text-green-600">₺</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-[#1A1A1A] truncate">{order.customerName}</h4>
                    <p className="text-xs font-bold text-zinc-500 truncate mt-0.5">{order.productName}</p>
                    <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-wider">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-green-600">+₺{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            <h3 className="text-xl font-black text-[#1A1A1A] mb-6">En Çok Satanlar</h3>
            <div className="space-y-5">
              {topProducts.length === 0 ? (
                 <p className="text-sm font-bold text-zinc-400 text-center py-4">Veri bulunamadı.</p>
              ) : topProducts.map((prod, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-black flex-shrink-0 shadow-md">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-[#1A1A1A] truncate">{prod.title}</h4>
                    <p className="text-xs font-bold text-zinc-500 mt-0.5">{prod.count} Satış</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#1A1A1A]">₺{prod.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
