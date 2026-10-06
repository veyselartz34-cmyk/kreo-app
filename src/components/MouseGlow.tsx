"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseGlow() {
  const [isMounted, setIsMounted] = useState(false);

  // SSR hatasını (Hydration Error) önlemek için başlangıçta sabit değer veriyoruz
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100, mass: 0.5 });

  useEffect(() => {
    setIsMounted(true);
    // Yüklendikten sonra ışığı ekranın ortasına alıyoruz
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Bileşen tamamen yüklenmeden (SSR aşamasında) hiçbir şey gösterme
  if (!isMounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[1000px] h-[1000px] rounded-full z-[1]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        // Işığı daha belirgin (parlak) yapıyoruz
        background: "radial-gradient(circle, rgba(251, 192, 45, 0.15) 0%, rgba(245, 124, 0, 0.05) 40%, transparent 70%)",
        filter: "blur(100px)",
      }}
    />
  );
}



