"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, CalendarDays, Users, Settings, Bell, ExternalLink, Menu } from "lucide-react";

import { logoutAction } from "@/app/actions/authActions";

type UserProp = {
  name: string;
  email: string;
  username: string;
  avatar: string;
};

export default function DashboardLayoutClient({ children, user }: { children: React.ReactNode; user: UserProp }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/login";
  };

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Genel Bakış", exact: true },
    { href: "/dashboard/products", icon: Package, label: "Ürünler", exact: false },
    { href: "/dashboard/calendar", icon: CalendarDays, label: "Takvim & Randevular", exact: false },
    { href: "/dashboard/customers", icon: Users, label: "Müşteriler", exact: false },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-black/5 bg-white/50 backdrop-blur-xl fixed inset-y-0 z-10">
        <div className="p-6">
          <Link href="/" className="text-2xl font-black tracking-tighter text-[#1A1A1A]">
            Kreo<span className="text-[#D32F2F]">.</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active 
                    ? "bg-[#1A1A1A] text-white shadow-md" 
                    : "text-zinc-500 hover:text-[#1A1A1A] hover:bg-black/5"
                }`}
              >
                <item.icon className={`w-4 h-4 ${active ? "text-white" : "text-zinc-400"}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-black/5">
          <Link 
            href="/dashboard/settings" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive("/dashboard/settings") 
                ? "bg-[#1A1A1A] text-white shadow-md" 
                : "text-zinc-500 hover:text-[#1A1A1A] hover:bg-black/5"
            }`}
          >
            <Settings className={`w-4 h-4 ${isActive("/dashboard/settings") ? "text-white" : "text-zinc-400"}`} />
            Ayarlar
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        {/* Top Header */}
        <header className="h-16 border-b border-black/5 bg-white/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4 md:hidden">
            <button className="text-[#1A1A1A]">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-[#1A1A1A]">Kreo.</span>
          </div>
          
          <div className="hidden md:flex items-center text-sm text-zinc-500">
            <span className="bg-[#D32F2F]/10 text-[#D32F2F] px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mr-2">Pro</span>
            Planındasın
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href={`/${user.username}`} 
              target="_blank"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-[#1A1A1A] transition-colors"
            >
              Vitrinimi Gör <ExternalLink className="w-4 h-4" />
            </Link>
            <div className="w-px h-6 bg-black/10 hidden sm:block"></div>
            
            {/* Bell Dropdown */}
            <div className="relative group">
              <button className="relative text-zinc-500 hover:text-[#1A1A1A] transition-colors p-2 rounded-full hover:bg-black/5">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D32F2F] rounded-full"></span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-black/5 shadow-xl rounded-2xl opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-4 border-b border-black/5">
                  <h4 className="text-sm font-bold text-[#1A1A1A]">Bildirimler</h4>
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm text-zinc-500">Okunmamış bildiriminiz yok.</p>
                </div>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="w-9 h-9 rounded-full bg-zinc-200 border-2 border-white shadow-sm overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 transition-all">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-black/5 shadow-xl rounded-2xl opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all z-50 overflow-hidden">
                <div className="p-3 border-b border-black/5 bg-zinc-50/50">
                  <p className="text-sm font-bold text-[#1A1A1A]">{user.name}</p>
                  <p className="text-xs text-zinc-500">{user.email}</p>
                </div>
                <div className="p-1.5">
                  <Link href="/dashboard/settings" className="block px-3 py-2 text-sm font-medium text-zinc-700 hover:text-[#1A1A1A] hover:bg-zinc-50 rounded-lg transition-colors">
                    Hesap Ayarları
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                  >
                    Çıkış Yap
                  </button>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
