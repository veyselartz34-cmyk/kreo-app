"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(CustomEase);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;

type SlideItem = { image: string; title: string; description: string };
type CSSLength = string | number;

const ITEMS: SlideItem[] = [
  { 
    image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1200&auto=format&fit=crop", // Dark matte minimal
    title: "Dijital Ürün Satışı", 
    description: "E-kitap, şablon, preset. Yükle, fiyatla ve anında sat."
  },
  { 
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1200&auto=format&fit=crop", // Black geometric cubes
    title: "1:1 Danışmanlık", 
    description: "Müşterin saati seçsin, ödesin, randevu otomatik oluşsun."
  },
  { 
    image: "https://images.unsplash.com/photo-1502809737437-1d85c70dd2ca?q=80&w=1200&auto=format&fit=crop", // Dark architectural lines
    title: "Ücretli Topluluk", 
    description: "Aylık abonelik ile özel içerik paylaş ve MRR yarat."
  },
  { 
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1200&auto=format&fit=crop", // Dark paper/texture
    title: "Ödeme Altyapısı", 
    description: "Stripe hesabı açmana gerek kalmadan yerel altyapıyla satış yap."
  },
  { 
    image: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=1200&auto=format&fit=crop", // Dark slatted lines
    title: "Hızlı Kurulum", 
    description: "2 dakikada vitrinini aç. Asla kod bilgisi gerekmez."
  },
  { 
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop", // Black minimal sphere
    title: "e-Arşiv Fatura", 
    description: "Her satışta müşterine otomatik e-Arşiv fatura kesilir."
  },
];

const DEFAULT_EASE = "cubic-bezier(1, -0.001, 0.159, 0.838)";
const CUBIC_BEZIER_RE = /^cubic-bezier\(\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)$/;

function resolveEase(ease: string): string {
  const match = ease.match(CUBIC_BEZIER_RE);
  if (!match) return ease;

  const id = `ease-${match.slice(1, 5).join("_").replace(/[^\d.-]/g, "n")}`;
  if (!CustomEase.get(id)) {
    CustomEase.create(id, match.slice(1, 5).join(","));
  }
  return id;
}

function toCssLength(value: CSSLength) {
  return typeof value === "number" ? `${value}px` : value;
}

const EASE = "power4.inOut";
const DURATION = 0.9;
const TEXT_TRANSLATE_PERCENT = 40;
const TEXT_ROTATE_DEG = 45;
const OUTGOING_DURATION = DURATION * 0.45;
const VERTICAL_TEXT_TRANSLATE_PERCENT = 40;
const VERTICAL_TEXT_ROTATE_DEG = 45;
const VERTICAL_TEXT_ROTATE_REVERSED = true;
const VERTICAL_TEXT_TRANSLATE_REVERSED = true;
const VERTICAL_OUTGOING_DURATION = DURATION * 0.45;
const TEXT_Z = 60;

export interface DimensionalSwitchSliderProps {
  infinite?: boolean;
  ease?: string;
  textColor?: string;
  cardClassName?: string;
  cardWidth?: CSSLength;
  cardHeight?: CSSLength;
  direction?: "horizontal" | "vertical";
  textSize?: CSSLength;
  cardBorderRadius?: CSSLength;
  autoplay?: boolean;
  autoplayDelay?: number;
}

export default function DimensionalSwitchSlider({
  infinite = true,
  ease = DEFAULT_EASE,
  textColor = "#ffffff",
  cardClassName = "max-md:w-[85vw]! max-md:h-[75vw]! max-[1024px]:w-[85vw]! max-[1024px]:h-[55vw]!",
  cardWidth = 800,
  cardHeight = 450,
  direction = "horizontal",
  textSize = 64,
  cardBorderRadius = 32,
  autoplay = true,
  autoplayDelay = 3500,
}: DimensionalSwitchSliderProps = {}) {
  const isVertical = direction === "vertical";
  const flipAxis = isVertical ? "rotateX" : "rotateY";
  const flipperRef = useRef<HTMLDivElement>(null);
  const prevTextRef = useRef<HTMLDivElement>(null);
  const nextTextRef = useRef<HTMLDivElement>(null);
  const showingNextRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const rotationRef = useRef(0);
  const resolvedEase = useMemo(() => resolveEase(ease), [ease]);
  
  const resolvedCardWidth = toCssLength(cardWidth);
  const resolvedCardHeight = toCssLength(cardHeight);
  const resolvedTextSize = toCssLength(textSize);
  const resolvedCardBorderRadius = toCssLength(cardBorderRadius);
  
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(1 % ITEMS.length);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (prevTextRef.current && nextTextRef.current) {
      gsap.set([prevTextRef.current, nextTextRef.current], { z: TEXT_Z });
    }
  }, []);

  useEffect(() => {
    if (!flipperRef.current || !prevTextRef.current || !nextTextRef.current) return;
    gsap.killTweensOf([flipperRef.current, prevTextRef.current, nextTextRef.current]);

    const wasShowingNext = showingNextRef.current;
    rotationRef.current = wasShowingNext ? 180 : 0;
    gsap.set(flipperRef.current, { rotateX: 0, rotateY: 0, [flipAxis]: rotationRef.current });

    const visibleRef = wasShowingNext ? nextTextRef : prevTextRef;
    const hiddenRef = wasShowingNext ? prevTextRef : nextTextRef;
    gsap.set(visibleRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 1 });
    gsap.set(hiddenRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 0 });

    isAnimatingRef.current = false;
  }, [direction, flipAxis]);

  const flipTo = useCallback((direction: "prev" | "next", newIndex: number) => {
    const goingNext = direction === "next";
    if (isAnimatingRef.current) return;
    const wasShowingNext = showingNextRef.current;
    
    flushSync(() => {
      setCurrentIndex(newIndex);
      if (wasShowingNext) {
        setFrontIndex(newIndex);
      } else {
        setBackIndex(newIndex);
      }
    });

    showingNextRef.current = !wasShowingNext;

    if (!nextTextRef.current || !prevTextRef.current || !flipperRef.current) return;

    const outgoingRef = wasShowingNext ? nextTextRef : prevTextRef;
    const incomingRef = wasShowingNext ? prevTextRef : nextTextRef;
    const flipGoingNext = isVertical ? !goingNext : goingNext;
    rotationRef.current += flipGoingNext ? 180 : -180;
    const rotateValue = rotationRef.current;
    
    if (prefersReducedMotion()) {
      gsap.set(flipperRef.current, { [flipAxis]: rotateValue });
      gsap.set(outgoingRef.current, {
        xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 0,
      });
      gsap.set(incomingRef.current, {
        xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 1,
      });
      isAnimatingRef.current = false;
      return;
    }

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      defaults: { duration: DURATION, ease: EASE },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    tl.to(
      flipperRef.current,
      { [flipAxis]: rotateValue, ease: resolvedEase, duration: 0.7 },
      0,
    );
    
    const textTl = gsap.timeline();

    if (isVertical) {
      const rotateGoingNext = VERTICAL_TEXT_ROTATE_REVERSED ? !goingNext : goingNext;
      const translateGoingNext = VERTICAL_TEXT_TRANSLATE_REVERSED ? !goingNext : goingNext;

      const outgoingEndRotate = rotateGoingNext ? VERTICAL_TEXT_ROTATE_DEG : -VERTICAL_TEXT_ROTATE_DEG;
      const outgoingEndY = translateGoingNext ? -VERTICAL_TEXT_TRANSLATE_PERCENT * 2 : VERTICAL_TEXT_TRANSLATE_PERCENT * 2;
      const incomingStartRotate = rotateGoingNext ? -VERTICAL_TEXT_ROTATE_DEG : VERTICAL_TEXT_ROTATE_DEG;
      const incomingStartY = translateGoingNext ? VERTICAL_TEXT_TRANSLATE_PERCENT * 2 : -VERTICAL_TEXT_TRANSLATE_PERCENT * 2;

      textTl.to(
        outgoingRef.current,
        {
          yPercent: outgoingEndY,
          rotateX: outgoingEndRotate,
          duration: VERTICAL_OUTGOING_DURATION * 1.5,
          ease: resolvedEase,
        },
        0,
      );
      textTl.to(outgoingRef.current, { opacity: 0, delay: -0.3, duration: 0 });
      textTl.fromTo(
        incomingRef.current,
        { yPercent: incomingStartY, rotateX: incomingStartRotate, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: VERTICAL_OUTGOING_DURATION * 1.5,
          ease: resolvedEase,
        },
        0.15,
      );
    } else {
      const outgoingEndRotate = goingNext ? TEXT_ROTATE_DEG : -TEXT_ROTATE_DEG;
      const outgoingEndX = goingNext ? TEXT_TRANSLATE_PERCENT : -TEXT_TRANSLATE_PERCENT;
      const incomingStartRotate = goingNext ? -TEXT_ROTATE_DEG : TEXT_ROTATE_DEG;
      const incomingStartX = goingNext ? -TEXT_TRANSLATE_PERCENT : TEXT_TRANSLATE_PERCENT;

      textTl.to(
        outgoingRef.current,
        {
          xPercent: outgoingEndX,
          rotateY: outgoingEndRotate,
          duration: OUTGOING_DURATION * 1.5,
          ease: resolvedEase,
        },
        0,
      );
      textTl.to(outgoingRef.current, { opacity: 0, delay: -0.3, duration: 0 });
      textTl.fromTo(
        incomingRef.current,
        { xPercent: incomingStartX, rotateY: incomingStartRotate, opacity: 0 },
        {
          xPercent: 0,
          rotateY: 0,
          opacity: 1,
          duration: OUTGOING_DURATION * 1.5,
          ease: resolvedEase,
        },
        0.15,
      );
    }

    tl.add(textTl, 0);
  }, [flipAxis, isVertical, resolvedEase]);

  const switchTo = useCallback((direction: "prev" | "next") => {
    const goingNext = direction === "next";
    const wasShowingNext = showingNextRef.current;
    const currentVisibleIndex = wasShowingNext ? backIndex : frontIndex;
    const rawIndex = currentVisibleIndex + (goingNext ? 1 : -1);
    const newIndex = infinite
      ? ((rawIndex % ITEMS.length) + ITEMS.length) % ITEMS.length
      : rawIndex;

    if (!infinite && (newIndex < 0 || newIndex >= ITEMS.length)) return;

    flipTo(direction, newIndex);
  }, [backIndex, flipTo, frontIndex, infinite]);

  useEffect(() => {
    if (!autoplay || autoplayDelay <= 0 || prefersReducedMotion()) return;

    const intervalId = window.setInterval(() => {
      switchTo("next");
    }, autoplayDelay);

    return () => window.clearInterval(intervalId);
  }, [autoplay, autoplayDelay, switchTo]);

  const goToIndex = useCallback((targetIndex: number) => {
    if (targetIndex === currentIndex) return;

    let dir: "prev" | "next";
    if (infinite) {
      const forwardDistance = ((targetIndex - currentIndex) % ITEMS.length + ITEMS.length) % ITEMS.length;
      dir = forwardDistance <= ITEMS.length - forwardDistance ? "next" : "prev";
    } else {
      dir = targetIndex > currentIndex ? "next" : "prev";
    }

    flipTo(dir, targetIndex);
  }, [currentIndex, flipTo, infinite]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[600px] py-16 gap-8">
      <div
        className={`relative ${cardClassName}`}
        style={{ perspective: "1500px", width: resolvedCardWidth, height: resolvedCardHeight }}
      >
        <div ref={flipperRef} className="relative h-full w-full [transform-style:preserve-3d]">
          {/* Front face */}
          <div
            className="absolute inset-0 h-full w-full overflow-hidden [backface-visibility:hidden] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-black/10"
            style={{ borderRadius: resolvedCardBorderRadius }}
          >
            {/* Mor overlay kaldırıldı, sadece okunaklılık için şeffaf siyah alt gradyan bırakıldı */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
            <img
              src={ITEMS[frontIndex].image}
              className="w-full h-full object-cover filter brightness-[0.6]"
              alt={ITEMS[frontIndex].title}
            />
          </div>
          
          {/* Back face */}
          <div
            className={`absolute inset-0 h-full w-full overflow-hidden [backface-visibility:hidden] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-black/10 ${
              isVertical ? "[transform:rotateX(180deg)]" : "[transform:rotateY(180deg)]"
            }`}
            style={{ borderRadius: resolvedCardBorderRadius }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
            <img
              src={ITEMS[backIndex].image}
              className="w-full h-full object-cover filter brightness-[0.6]"
              alt={ITEMS[backIndex].title}
            />
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 z-20 flex items-center justify-center w-full h-full pointer-events-none px-4"
        style={{ perspective: "1500px" }}
      >
        <div
          ref={prevTextRef}
          className="absolute w-full max-w-[800px] flex flex-col items-center justify-center text-center drop-shadow-[0_4px_24px_rgba(0,0,0,1)]"
          style={{ color: textColor }}
        >
          <h3 className="font-bold tracking-tight mb-4" style={{ fontSize: resolvedTextSize }}>
            {ITEMS[frontIndex].title}
          </h3>
          <p className="text-xl md:text-2xl text-zinc-200 font-medium max-w-2xl leading-relaxed">
            {ITEMS[frontIndex].description}
          </p>
        </div>
        <div
          ref={nextTextRef}
          className="absolute w-full max-w-[800px] flex flex-col items-center justify-center text-center opacity-0 drop-shadow-[0_4px_24px_rgba(0,0,0,1)]"
          style={{ color: textColor }}
        >
          <h3 className="font-bold tracking-tight mb-4" style={{ fontSize: resolvedTextSize }}>
            {ITEMS[backIndex].title}
          </h3>
          <p className="text-xl md:text-2xl text-zinc-200 font-medium max-w-2xl leading-relaxed">
            {ITEMS[backIndex].description}
          </p>
        </div>
      </div>

      <div className="flex gap-6 z-30 mt-8">
        <button
          type="button"
          onClick={() => switchTo("prev")}
          aria-label="Previous"
          disabled={!infinite && currentIndex === 0}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white/60 text-[#1A1A1A] backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-[#1A1A1A]/10 hover:border-white/30 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => switchTo("next")}
          aria-label="Next"
          disabled={!infinite && currentIndex === ITEMS.length - 1}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white/60 text-[#1A1A1A] backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-[#1A1A1A]/10 hover:border-white/30 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-3 z-30 mt-4">
        {ITEMS.map((item, idx) => (
          <button
            key={item.title}
            type="button"
            onClick={() => goToIndex(idx)}
            aria-label={`Go to ${item.title}`}
            aria-current={idx === currentIndex}
            className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
              idx === currentIndex
                ? "w-10 bg-zinc-200 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                : "w-2 bg-[#1A1A1A]/15 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


