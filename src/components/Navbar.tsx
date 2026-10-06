"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          ? "bg-[#F5F5DC]/80 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/register" className="text-sm font-semibold tracking-tight text-[#1A1A1A] flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
          </div>
          Kreo
        </a>

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
              className="text-xs font-medium text-zinc-700 hover:text-[#1A1A1A] transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="/register"
            className="px-4 py-2 text-xs font-medium text-black bg-[#D32F2F] rounded-md hover:bg-[#C62828] shadow-md shadow-red-500/20 transition-colors"
          >
            Kayıt Ol
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block h-px w-full bg-white transition-transform ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block h-px w-full bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-full bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-[#FDFBF7] border-b border-black/10 p-6 flex flex-col gap-4"
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
                className="text-sm text-zinc-700"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}




