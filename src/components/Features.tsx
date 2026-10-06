"use client";

import DimensionalSwitchSlider from "./ui/dimensional-switch-slider";

export default function Features() {
  return (
    <section id="ozellikler" className="relative z-10  py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-widest text-[#D32F2F] uppercase">
            TÜM ÖZELLİKLER
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#1A1A1A] mt-3">
            Satış için ihtiyacın olan her şey.
          </h2>
          <p className="text-zinc-700 text-base md:text-lg mt-4 max-w-lg mx-auto leading-relaxed">
            Dijital ürün, danışmanlık randevusu ve ücretli topluluk — üç gelir
            modeli, tek platform.
          </p>
        </div>
      </div>
      
      {/* Yeni 3D Slider Bileşeni */}
      <div className="w-full mt-4 overflow-hidden px-4 md:px-0">
        <DimensionalSwitchSlider
          infinite
          direction="horizontal"
          autoplay
          autoplayDelay={4000}
          textColor="#ffffff"
          textSize={56}
          cardWidth={800}
          cardHeight={500}
          cardBorderRadius={24}
        />
      </div>
    </section>
  );
}
