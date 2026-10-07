"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Package, CalendarDays, Users, Settings, Bell, ExternalLink, 
  Menu, LogOut, ChevronRight, BarChart3, Tag, Mail, CreditCard, Paintbrush, 
  Share2, Zap, MessageSquare, Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { logoutAction } from "@/app/actions/authActions";

type UserProp = {
  name: string;
  email: string;
  username: string;
  avatar: string;
};

export default function DashboardLayoutClient({ children, user }: { children: React.ReactNode; user: UserProp }) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/login";
  };

  const menuCategories = [
    {
      title: "Ana Menü",
      items: [
        { href: "/dashboard", icon: LayoutDashboard, label: "Genel Bakış", exact: true },
        { href: "/dashboard/analytics", icon: BarChart3, label: "Gelişmiş Analiz", exact: false, isNew: true },
      ]
    },
    {
      title: "Satış & Yönetim",
      items: [
        { href: "/dashboard/products", icon: Package, label: "Ürünler & İçerikler", exact: false },
        { href: "/dashboard/orders", icon: CreditCard, label: "Siparişler", exact: false },
        { href: "/dashboard/calendar", icon: CalendarDays, label: "Randevu Takvimi", exact: false },
      ]
    },
    {
      title: "Pazarlama & Büyüme",
      items: [
        { href: "/dashboard/marketing/discounts", icon: Tag, label: "İndirim Kuponları", exact: false },
        { href: "/dashboard/marketing/email", icon: Mail, label: "E-posta Bülteni", exact: false },
        { href: "/dashboard/marketing/affiliate", icon: Share2, label: "Ortaklık (Affiliate)", exact: false },
      ]
    },
    {
      title: "Topluluk & CRM",
      items: [
        { href: "/dashboard/customers", icon: Users, label: "Müşteri Listesi", exact: false },
        { href: "/dashboard/messages", icon: MessageSquare, label: "Mesajlar", exact: false },
      ]
    },
    {
      title: "Vitrin & Sistem",
      items: [
        { href: "/dashboard/storefront", icon: Paintbrush, label: "Vitrin Tasarımı", exact: false },
        { href: "/dashboard/integrations", icon: Zap, label: "Entegrasyonlar", exact: false },
      ]
    }
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] flex font-sans selection:bg-[#FBC02D] selection:text-[#1A1A1A]">
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-black/5 bg-[#FDFBF7] fixed inset-y-0 z-30 overflow-y-auto hide-scrollbar">
        <div className="h-20 flex flex-shrink-0 items-center px-8 border-b border-black/5 sticky top-0 bg-[#FDFBF7] z-10">
          <Link href="/" className="text-3xl font-black tracking-tighter text-[#1A1A1A] flex items-center gap-2">
            Kreo<span className="text-[#D32F2F]">.</span>
          </Link>
        </div>
        
        <div className="p-5 flex-1 space-y-8">
          {menuCategories.map((category, idx) => (
            <div key={idx}>
              <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-3 px-3">{category.title}</p>
              <nav className="space-y-1">
                {category.items.map((item) => {
                  const active = isActive(item.href, item.exact);
                  return (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden ${
                        active 
                          ? "text-[#D32F2F] bg-white shadow-sm border border-black/5" 
                          : "text-zinc-500 hover:text-[#1A1A1A] hover:bg-black/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        <item.icon className={`w-5 h-5 transition-colors ${active ? "text-[#D32F2F]" : "text-zinc-400 group-hover:text-[#1A1A1A]"}`} />
                        {item.label}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.isNew && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-white bg-green-500 px-2 py-0.5 rounded-full shadow-sm">
                            YENİ
                          </span>
                        )}
                        {active && <ChevronRight className="w-4 h-4 text-[#D32F2F]" />}
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-auto p-5 border-t border-black/5 sticky bottom-0 bg-[#FDFBF7]">
          <Link 
            href="/dashboard/settings" 
            className={`group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              isActive("/dashboard/settings") 
                ? "text-[#D32F2F] bg-white shadow-sm border border-black/5" 
                : "text-zinc-500 hover:text-[#1A1A1A] hover:bg-black/5 border border-transparent"
            }`}
          >
            <Settings className={`w-5 h-5 transition-colors ${isActive("/dashboard/settings") ? "text-[#D32F2F]" : "text-zinc-400 group-hover:text-[#1A1A1A]"}`} />
            Ayarlar & Bakiye
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen relative bg-zinc-50/50">
        {/* Top Header */}
        <header className="h-20 border-b border-black/5 bg-[#FDFBF7]/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 sticky top-0 z-20">
          <div className="flex items-center gap-4 lg:hidden">
            <button className="text-[#1A1A1A] hover:text-[#D32F2F] transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-[#1A1A1A] text-xl">Kreo.</span>
          </div>
          
          <div className="hidden lg:flex items-center">
            {/* Command Pallete Simulation */}
            <div className="flex items-center gap-3 bg-white border border-black/5 px-4 py-2 rounded-2xl shadow-sm text-sm text-zinc-400 w-96 cursor-pointer hover:border-black/10 transition-colors">
              <Search className="w-4 h-4" />
              <span>Ürünlerde, müşterilerde veya ayarlarda ara...</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd className="bg-zinc-100 border border-black/5 px-1.5 rounded text-xs font-sans text-zinc-500">⌘</kbd>
                <kbd className="bg-zinc-100 border border-black/5 px-1.5 rounded text-xs font-sans text-zinc-500">K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="px-4 py-2 rounded-full bg-white border border-black/5 flex items-center gap-2 text-xs font-bold text-[#1A1A1A] shadow-sm hidden md:flex">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse"></div>
              Kreo Pro
            </div>
            
            <Link 
              href={`/${user.username}`} 
              target="_blank"
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-[#D32F2F] transition-colors group"
            >
              Vitrinimi Gör <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            
            <div className="w-px h-6 bg-black/10 hidden sm:block"></div>
            
            {/* Notifications */}
            <button className="relative text-zinc-500 hover:text-[#1A1A1A] transition-colors p-2 rounded-full hover:bg-black/5">
              <Bell className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-1 pr-4 rounded-full bg-white border border-black/5 hover:bg-zinc-50 transition-colors shadow-sm focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-black/5">
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold text-[#1A1A1A] hidden sm:block">{user.name.split(" ")[0]}</span>
              </button>
              
              <AnimatePresence>
                {profileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-56 bg-white border border-black/5 shadow-2xl rounded-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-black/5 bg-zinc-50/50">
                      <p className="text-sm font-bold text-[#1A1A1A] truncate">{user.name}</p>
                      <p className="text-xs font-medium text-zinc-500 truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-zinc-600 hover:text-[#1A1A1A] hover:bg-black/5 rounded-xl transition-colors">
                        <Settings className="w-4 h-4" /> Hesap Ayarları
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold text-[#D32F2F] hover:bg-[#D32F2F]/10 rounded-xl transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4" /> Çıkış Yap
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
