"use client";

import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [meteors, setMeteors] = useState<any[]>([]);

  useEffect(() => {
    // Rastgele konumlarda ve farklı gecikmelerle kayan yıldızlar (meteorlar) oluştur
    const newMeteors = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100, // %
      left: Math.random() * 100, // %
      delay: Math.random() * 5, // 0 to 5s delay
      duration: Math.random() * 2 + 2, // 2s to 4s duration
    }));
    setMeteors(newMeteors);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#030303]">
      
      {/* Sabit ama çok parlak Renk Hüzmeleri (Auroralar) */}
      <div className="aurora-blob-1" />
      <div className="aurora-blob-2" />

      {/* BELİRGİN HAREKET: Sürekli aşağı doğru kayan Izgara (Grid) */}
      <div className="bg-moving-grid" />

      {/* BELİRGİN HAREKET: Ekranı çaprazlama kesen Kayan Yıldızlar (Meteors) */}
      {meteors.map((m) => (
        <div
          key={m.id}
          className="meteor-effect"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
