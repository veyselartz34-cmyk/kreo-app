"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, CalendarDays, Users, Settings, Bell, ExternalLink, Menu, LogOut, ChevronRight } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/login";
  };

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Genel Bakış", exact: true },
    { href: "/dashboard/products", icon: Package, label: "Ürünler", exact: false },
    { href: "/dashboard/calendar", icon: CalendarDays, label: "Randevular", exact: false },
    { href: "/dashboard/customers", icon: Users, label: "Müşteriler", exact: false },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex font-sans selection:bg-[#D32F2F] selection:text-white">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#0A0A0A] fixed inset-y-0 z-30">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#D32F2F] to-[#F57C00] rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-white text-lg leading-none mt-[-2px]">K</span>
            </div>
            Kreo<span className="text-[#D32F2F]">.</span>
          </Link>
        </div>
        
        <div className="p-4">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 px-4">Yönetim Paneli</p>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                    active 
                      ? "text-white bg-white/10 shadow-sm" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {active && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D32F2F] to-[#F57C00] rounded-r-full"
                    />
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    <item.icon className={`w-5 h-5 transition-colors ${active ? "text-[#FBC02D]" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                    {item.label}
                  </div>
                  {active && <ChevronRight className="w-4 h-4 text-zinc-500" />}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-white/5">
          <Link 
            href="/dashboard/settings" 
            className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
              isActive("/dashboard/settings") 
                ? "text-white bg-white/10 shadow-sm" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings className={`w-5 h-5 transition-colors ${isActive("/dashboard/settings") ? "text-[#FBC02D]" : "text-zinc-500 group-hover:text-zinc-300"}`} />
            Ayarlar
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        {/* Top Header - Glassmorphism */}
        <header className="h-20 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 sticky top-0 z-20">
          <div className="flex items-center gap-4 md:hidden">
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-white text-xl">Kreo.</span>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-medium text-zinc-300 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
              Kreo Pro Aktif
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link 
              href={`/${user.username}`} 
              target="_blank"
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors group"
            >
              Vitrinimi Gör <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            
            <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
            
            {/* Notifications */}
            <button className="relative text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <Bell className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold text-zinc-200 hidden sm:block">{user.name.split(" ")[0]}</span>
              </button>
              
              <AnimatePresence>
                {profileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-56 bg-[#111] border border-white/10 shadow-2xl rounded-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/5 bg-white/5">
                      <p className="text-sm font-bold text-white truncate">{user.name}</p>
                      <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <Settings className="w-4 h-4" /> Hesap Ayarları
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors mt-1"
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
