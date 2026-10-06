import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import { WaitlistHero } from "@/components/ui/waitlist-hero";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#000000]">
      <MouseGlow />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      
      {/* 
        Sitenin en altına eklediğimiz o inanılmaz Waitlist / Confetti kapanış bölümü. 
        Kullanıcı 3D ekranları ve özellikleri gördükten sonra büyülenmiş bir şekilde buraya gelecek.
      */}
      <WaitlistHero />
      
      <Footer />
    </main>
  );
}
