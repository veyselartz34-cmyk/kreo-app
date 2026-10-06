"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
  variant = "screen", // "screen" (dashboard gibi) veya "transparent" (içerik için)
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  variant?: "screen" | "transparent";
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Scroll daha erken başlayıp daha geç bitsin diye
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 1] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [25, -5]); // 25 dereceden başlayıp -5'e kadar gidiyor (daha agresif 3D)
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div
      className="h-[80rem] md:h-[90rem] flex items-center justify-center relative p-2 md:p-20 w-full"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1200px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} variant={variant}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-6xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  variant,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
  variant: "screen" | "transparent";
}) => {
  
  if (variant === "transparent") {
    return (
      <motion.div
        style={{ rotateX: rotate, scale }}
        className="max-w-6xl -mt-4 mx-auto w-full"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className="max-w-6xl -mt-4 mx-auto h-[30rem] md:h-[45rem] w-full border border-black/20 p-2 md:p-4 bg-white/80 backdrop-blur-xl rounded-[30px] shadow-[0_0_80px_-20px_rgba(139,92,246,0.5)]"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[#050505] md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
