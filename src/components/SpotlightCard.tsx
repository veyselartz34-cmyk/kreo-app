"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      // Sadece relative bırakıyoruz, böylece padding (p-8 vb) korunuyor.
      className={`relative ${className}`}
    >
      {/* 
        1. ARKADAN SIZAN AKIŞKAN NEON AURA (FLUID BACKLIGHT)
        Keskin kenar yok! Kartın -inset-4 (dışına taşacak şekilde) yerleşip,
        blur(30px) ile tamamen sıvı/sisli bir ışık bulutuna dönüşür.
      */}
      <div
        className="pointer-events-none absolute -inset-4 transition-opacity duration-500 z-0"
        style={{
          opacity: opacity * 0.8,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(251, 192, 45, 0.6), transparent 50%)`,
          filter: "blur(30px)",
          borderRadius: "inherit",
        }}
      />

      {/* 
        2. KARTIN KATI GÖVDESİ (SOLID BODY)
        Işığı ortadan kesip sadece arkasından / kenarlarından sızmasını sağlar.
      */}
      <div className="absolute inset-0 bg-white border-black/10 rounded-3xl z-10 border border-black/5 shadow-2xl" />

      {/* 
        3. ÇOK HAFİF İÇ IŞIK (İsteğe bağlı pürüzsüzlük)
      */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-20 rounded-3xl overflow-hidden"
      >
        <div 
          className="absolute inset-0"
          style={{
            opacity: opacity * 0.08,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(251, 192, 45, 1), transparent 50%)`,
          }}
        />
      </div>

      {/* 4. İÇERİK (Yazılar, İkonlar) */}
      <div className="relative z-30 h-full">{children}</div>
    </motion.div>
  );
}

