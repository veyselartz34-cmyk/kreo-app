"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FDFBF7]/85 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.03)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-tighter text-[#1A1A1A] flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#D32F2F] to-[#F57C00] flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <span className="text-sm font-black">K</span>
          </div>
          <span className="text-xl font-black text-[#1A1A1A]">Kreo<span className="text-[#D32F2F]">.</span></span>
        </Link>

        {/* Linkler */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Özellikler", href: "#ozellikler" },
            { name: "Nasıl Çalışır", href: "#nasil-calisir" },
            { name: "Fiyatlandırma", href: "#fiyatlandirma" },
            { name: "SSS", href: "#sss" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs font-bold text-zinc-600 hover:text-[#1A1A1A] transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Aksiyon Butonları (Giriş Yap & Sıcak Degrade Kayıt Ol) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 text-xs font-bold text-[#1A1A1A] hover:bg-black/5 rounded-full transition-colors"
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="relative group/navbtn overflow-hidden px-6 py-2.5 text-xs font-bold text-white rounded-full shadow-[0_4px_18px_rgba(245,124,0,0.35)] hover:shadow-[0_6px_25px_rgba(245,124,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100]"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover/navbtn:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Hemen Başla</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/navbtn:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-6 p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menüyü Aç"
        >
          <span className={`block h-0.5 w-full bg-[#1A1A1A] transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-full bg-[#1A1A1A] transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-full bg-[#1A1A1A] transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobil Menü */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-black/10 px-6 py-6 space-y-4 shadow-xl"
          >
            {[
              { name: "Özellikler", href: "#ozellikler" },
              { name: "Nasıl Çalışır", href: "#nasil-calisir" },
              { name: "Fiyatlandırma", href: "#fiyatlandirma" },
              { name: "SSS", href: "#sss" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-bold text-zinc-700 hover:text-[#1A1A1A]"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-4 border-t border-black/5 flex flex-col gap-2.5">
              <Link
                href="/login"
                className="w-full py-3 text-center text-xs font-bold text-[#1A1A1A] bg-zinc-100 rounded-xl"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="w-full py-3 text-center text-xs font-bold text-white bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100] rounded-xl shadow-md"
              >
                Hemen Başla &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
