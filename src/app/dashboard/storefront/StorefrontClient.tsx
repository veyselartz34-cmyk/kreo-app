"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette, Type, Link2, Megaphone, Monitor, Smartphone, Save,
  Image as ImageIcon, Upload, Camera, Star, ExternalLink, Check, Globe
} from "lucide-react";
import { updateStorefrontAction } from "@/app/actions/storefrontActions";
import Link from "next/link";

type ProductItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  icon: string | null;
};

type InitialData = {
  name: string;
  bio: string;
  themeColor: string;
  username: string;
  avatar: string | null;
  cover: string | null;
  announcement: string;
  featuredProductId: string | null;
  socialInstagram: string;
  socialTwitter: string;
  socialYoutube: string;
  socialLinkedin: string;
  socialTiktok: string;
  socialWebsite: string;
  products: ProductItem[];
};

const TABS = [
  { id: "theme", label: "Tema", icon: Palette },
  { id: "content", label: "Icerik", icon: Type },
  { id: "social", label: "Linkler", icon: Link2 },
  { id: "spotlight", label: "Vitrin", icon: Megaphone },
];

export default function StorefrontClient({ initialData }: { initialData: InitialData }) {
  const [activeTab, setActiveTab] = useState("theme");
  const [previewMode, setPreviewMode] = useState("desktop");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const [name, setName] = useState(initialData.name);
  const [bio, setBio] = useState(initialData.bio);
  const [themeColor, setThemeColor] = useState(initialData.themeColor);
  const [announcement, setAnnouncement] = useState(initialData.announcement);
  const [featuredProductId, setFeaturedProductId] = useState(initialData.featuredProductId);

  // Social Links
  const [socialInstagram, setSocialInstagram] = useState(initialData.socialInstagram);
  const [socialTwitter, setSocialTwitter] = useState(initialData.socialTwitter);
  const [socialYoutube, setSocialYoutube] = useState(initialData.socialYoutube);
  const [socialLinkedin, setSocialLinkedin] = useState(initialData.socialLinkedin);
  const [socialTiktok, setSocialTiktok] = useState(initialData.socialTiktok);
  const [socialWebsite, setSocialWebsite] = useState(initialData.socialWebsite);

  // Avatar & Cover
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialData.avatar);
  const [coverPreview, setCoverPreview] = useState<string | null>(initialData.cover);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const colors = [
    "#D32F2F", "#1A1A1A", "#2563EB", "#059669", "#D97706", "#7C3AED",
    "#EC4899", "#0EA5E9", "#14B8A6", "#F97316"
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("themeColor", themeColor);
      formData.append("announcement", announcement);
      if (featuredProductId) formData.append("featuredProductId", featuredProductId);
      formData.append("socialInstagram", socialInstagram);
      formData.append("socialTwitter", socialTwitter);
      formData.append("socialYoutube", socialYoutube);
      formData.append("socialLinkedin", socialLinkedin);
      formData.append("socialTiktok", socialTiktok);
      formData.append("socialWebsite", socialWebsite);
      if (avatarFile) formData.append("avatarFile", avatarFile);
      if (coverFile) formData.append("coverFile", coverFile);
      await updateStorefrontAction(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const socialLinks = [
    { url: socialInstagram, label: "IG" },
    { url: socialTwitter, label: "X" },
    { url: socialYoutube, label: "YT" },
    { url: socialLinkedin, label: "in" },
    { url: socialTiktok, label: "TT" },
    { url: socialWebsite, label: "WEB" },
  ].filter(l => l.url);

  const featuredProduct = initialData.products.find(p => p.id === featuredProductId);

  return (
    <div className="max-w-[1400px] mx-auto pb-24 text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Vitrin Tasarimi</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">
            Musterilerinizin gorecegi profil ve vitrin sayfanizi ozellesstirin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {initialData.username && (
            <Link
              href={`/${initialData.username}`}
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-black/5 text-[#1A1A1A] text-sm font-bold rounded-xl hover:bg-zinc-50 transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" /> Vitrini Goruntule
            </Link>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-8 py-3 text-white text-sm font-bold rounded-xl transition-all shadow-[0_4px_14px_rgba(211,47,47,0.3)] disabled:opacity-50 ${
              saveSuccess
                ? "bg-green-600 hover:bg-green-700 shadow-[0_4px_14px_rgba(22,163,74,0.3)]"
                : "bg-[#D32F2F] hover:bg-[#B71C1C]"
            }`}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : saveSuccess ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Kaydediliyor..." : saveSuccess ? "Kaydedildi!" : "Degisiklikleri Kaydet"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Editor Settings (Left - 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-black/5 shadow-sm sticky top-28">
            {/* Tab Switcher */}
            <div className="grid grid-cols-4 gap-1.5 mb-8 bg-zinc-50 p-1.5 rounded-2xl border border-black/5">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2.5 text-xs font-bold rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
                    activeTab === tab.id
                      ? "bg-white text-[#1A1A1A] shadow-sm"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ======== TEMA ======== */}
            <AnimatePresence mode="wait">
              {activeTab === "theme" && (
                <motion.div key="theme" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-black text-[#1A1A1A] mb-4">Vurgu Rengi</h3>
                    <div className="flex flex-wrap gap-3">
                      {colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setThemeColor(color)}
                          className={`w-10 h-10 rounded-full transition-all relative ${
                            color === themeColor
                              ? "ring-2 ring-offset-2 ring-black/20 scale-110"
                              : "hover:scale-110"
                          }`}
                          style={{ backgroundColor: color }}
                        >
                          {color === themeColor && (
                            <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Avatar Upload */}
                  <div>
                    <h3 className="text-sm font-black text-[#1A1A1A] mb-4">Profil Fotografi</h3>
                    <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
                    <button
                      onClick={() => avatarInputRef.current?.click()}
                      className="w-full flex items-center gap-4 p-4 bg-zinc-50 border border-dashed border-black/10 rounded-2xl hover:border-black/20 hover:bg-zinc-100/50 transition-all group"
                    >
                      <div className="w-16 h-16 rounded-full bg-white border border-black/5 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-sm">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-6 h-6 text-zinc-300" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-[#1A1A1A]">
                          {avatarPreview ? "Fotografi Degistir" : "Fotograf Yukle"}
                        </p>
                        <p className="text-xs font-medium text-zinc-400 mt-0.5">JPG, PNG (Maks. 5MB)</p>
                      </div>
                      <Upload className="w-5 h-5 text-zinc-300 ml-auto group-hover:text-zinc-500 transition-colors" />
                    </button>
                  </div>

                  {/* Cover Upload */}
                  <div>
                    <h3 className="text-sm font-black text-[#1A1A1A] mb-4">Kapak Fotografi</h3>
                    <input type="file" ref={coverInputRef} onChange={handleCoverChange} accept="image/*" className="hidden" />
                    <button
                      onClick={() => coverInputRef.current?.click()}
                      className="w-full aspect-[3/1] bg-zinc-50 border border-dashed border-black/10 rounded-2xl hover:border-black/20 hover:bg-zinc-100/50 transition-all overflow-hidden relative group"
                    >
                      {coverPreview ? (
                        <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-2">
                          <ImageIcon className="w-8 h-8 text-zinc-300" />
                          <p className="text-xs font-bold text-zinc-400">Kapak Fotografi Yukle</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <Upload className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ======== ICERIK ======== */}
              {activeTab === "content" && (
                <motion.div key="content" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      Vitrin Basligi
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Adiniz veya marka adiniz"
                      className="w-full px-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      Biyografi
                    </label>
                    <textarea
                      rows={4}
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      placeholder="Kendinizi veya markanizi tanitin..."
                      className="w-full px-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30 resize-none transition-all"
                    />
                    <p className="text-xs font-medium text-zinc-400 mt-2 text-right">{bio.length}/300</p>
                  </div>
                </motion.div>
              )}

              {/* ======== SOSYAL LINKLER ======== */}
              {activeTab === "social" && (
                <motion.div key="social" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-5">
                  <p className="text-xs font-medium text-zinc-500 mb-2">
                    Sosyal medya linklerinizi ekleyin. Bos birakirsaniz vitrinde gosterilmez.
                  </p>

                  {[
                    { icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, label: "Instagram", value: socialInstagram, setter: setSocialInstagram, placeholder: "https://instagram.com/kullaniciadi" },
                    { icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: "X (Twitter)", value: socialTwitter, setter: setSocialTwitter, placeholder: "https://x.com/kullaniciadi" },
                    { icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>, label: "YouTube", value: socialYoutube, setter: setSocialYoutube, placeholder: "https://youtube.com/@kanaliniz" },
                    { icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, label: "LinkedIn", value: socialLinkedin, setter: setSocialLinkedin, placeholder: "https://linkedin.com/in/profiliniz" },
                    { icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>, label: "TikTok", value: socialTiktok, setter: setSocialTiktok, placeholder: "https://tiktok.com/@kullaniciadi" },
                    { icon: () => <Globe className="w-4 h-4" />, label: "Web Sitesi", value: socialWebsite, setter: setSocialWebsite, placeholder: "https://siteniz.com" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-black/5 flex items-center justify-center text-zinc-500 flex-shrink-0">
                        {item.icon()}
                      </div>
                      <input
                        type="url"
                        value={item.value}
                        onChange={e => item.setter(e.target.value)}
                        placeholder={item.placeholder}
                        className="flex-1 px-4 py-2.5 bg-zinc-50 border border-black/5 rounded-xl text-sm font-medium text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30 transition-all placeholder:text-zinc-300"
                      />
                    </div>
                  ))}
                </motion.div>
              )}

              {/* ======== VITRIN SPOTLIGHT ======== */}
              {activeTab === "spotlight" && (
                <motion.div key="spotlight" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                  {/* Announcement Badge */}
                  <div>
                    <h3 className="text-sm font-black text-[#1A1A1A] mb-2">Duyuru Rozeti</h3>
                    <p className="text-xs font-medium text-zinc-400 mb-3">
                      Vitrinizin en ustunde dikkat cekici bir duyuru metni gosterin.
                    </p>
                    <input
                      type="text"
                      value={announcement}
                      onChange={e => setAnnouncement(e.target.value)}
                      placeholder="Ornek: Yeni Notion Sablonu Yayinda!"
                      className="w-full px-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30 transition-all placeholder:text-zinc-300"
                    />
                    {announcement && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: themeColor }}>
                          <Star className="w-3 h-3 fill-current" /> {announcement}
                        </div>
                        <span className="text-[10px] text-zinc-400 font-medium">Onizleme</span>
                      </div>
                    )}
                  </div>

                  {/* Featured Product */}
                  <div>
                    <h3 className="text-sm font-black text-[#1A1A1A] mb-2">One Cikan Urun</h3>
                    <p className="text-xs font-medium text-zinc-400 mb-3">
                      Sectiginiz urun vitrinizin tepesinde buyuk bir kartla vurgulanir.
                    </p>
                    {initialData.products.length > 0 ? (
                      <div className="space-y-2">
                        {initialData.products.map(p => (
                          <button
                            key={p.id}
                            onClick={() => setFeaturedProductId(featuredProductId === p.id ? null : p.id)}
                            className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border transition-all text-left ${
                              featuredProductId === p.id
                                ? "border-[#D32F2F]/30 bg-red-50/50 shadow-sm"
                                : "border-black/5 bg-zinc-50 hover:bg-zinc-100/50"
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              featuredProductId === p.id ? "bg-[#D32F2F] text-white" : "bg-white border border-black/5 text-zinc-400"
                            }`}>
                              {featuredProductId === p.id ? <Star className="w-4 h-4 fill-current" /> : <Star className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-[#1A1A1A] truncate">{p.title}</p>
                              <p className="text-xs font-medium text-zinc-500">{p.type}</p>
                            </div>
                            <span className="text-sm font-black text-[#1A1A1A] flex-shrink-0">{'\u20BA'}{p.price}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 bg-zinc-50 rounded-2xl border border-dashed border-black/10 text-center">
                        <p className="text-sm font-bold text-zinc-400">Henuz urun eklenmedi.</p>
                        <Link href="/dashboard/products/new" className="text-xs font-bold text-[#D32F2F] mt-1 inline-block hover:underline">
                          Ilk urununu olustur
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ======== LIVE PREVIEW (Right - 3 cols) ======== */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Canli Onizleme</p>
            <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
              <button
                onClick={() => setPreviewMode("desktop")}
                className={`p-2 rounded-lg transition-colors ${
                  previewMode === "desktop" ? "bg-white shadow-sm text-[#1A1A1A]" : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewMode("mobile")}
                className={`p-2 rounded-lg transition-colors ${
                  previewMode === "mobile" ? "bg-white shadow-sm text-[#1A1A1A]" : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <motion.div
            layout
            className={`mx-auto transition-all duration-500 ${previewMode === "mobile" ? "w-[375px]" : "w-full"}`}
          >
            <div className="bg-[#FDFBF7] rounded-[2rem] border-4 border-black/5 shadow-2xl overflow-hidden min-h-[700px] relative">
              {/* Announcement Badge */}
              {announcement && (
                <div className="w-full py-2.5 px-4 text-center text-xs font-bold text-white flex items-center justify-center gap-1.5" style={{ backgroundColor: themeColor }}>
                  <Star className="w-3 h-3 fill-current" /> {announcement}
                </div>
              )}

              {/* Cover */}
              <div className="h-36 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#FDFBF7] z-10" />
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${themeColor}40, ${themeColor}10)` }} />
                )}
                {/* Avatar */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-20 h-20 rounded-full border-4 border-[#FDFBF7] shadow-lg overflow-hidden bg-white">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-2xl font-black text-white"
                        style={{ backgroundColor: themeColor }}
                      >
                        {name.charAt(0) || "K"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-14 px-8 pb-8 text-center">
                <h2 className="text-2xl font-black text-[#1A1A1A]">{name || "Adiniz"}</h2>
                <p className="text-sm font-medium text-zinc-400 mt-1">kreo.app/{initialData.username || "kullaniciadi"}</p>
                <p className="text-sm font-medium text-zinc-500 mt-3 max-w-md mx-auto leading-relaxed">
                  {bio || "Biyografiniz burada gorunecek."}
                </p>

                {/* Social Icons in Preview */}
                {socialLinks.length > 0 && (
                  <div className="flex items-center justify-center gap-2 mt-5">
                    {socialLinks.map((link, i) => (
                      <div
                        key={i}
                        className="w-9 h-9 flex items-center justify-center bg-white border border-black/5 rounded-full text-xs font-black text-zinc-600 shadow-sm"
                      >
                        {link.label}
                      </div>
                    ))}
                  </div>
                )}

                {/* Featured Product (if selected) */}
                {featuredProduct && (
                  <div className="mt-8 bg-white border border-black/5 rounded-2xl p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: themeColor }} />
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-3.5 h-3.5 fill-current" style={{ color: themeColor }} />
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: themeColor }}>One Cikan</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: `${themeColor}15` }}>
                        {featuredProduct.icon ? (
                          <img src={featuredProduct.icon} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-6 h-6" style={{ color: themeColor }} />
                        )}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-sm font-black text-[#1A1A1A] truncate">{featuredProduct.title}</p>
                        <p className="text-xs font-bold text-zinc-500">{featuredProduct.type}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-black text-[#1A1A1A]">{'\u20BA'}{featuredProduct.price}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Product Cards Grid */}
                <div className={`mt-6 grid gap-3 ${previewMode === "mobile" ? "grid-cols-1" : "grid-cols-2"}`}>
                  {initialData.products
                    .filter(p => p.id !== featuredProductId)
                    .slice(0, 4)
                    .map((prod, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-black/5 flex gap-3 items-center text-left hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-zinc-50 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-black/5">
                        {prod.icon ? (
                          <img src={prod.icon} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-zinc-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-[#1A1A1A] truncate">{prod.title}</div>
                        <div className="text-xs font-medium text-zinc-400">{'\u20BA'}{prod.price}</div>
                      </div>
                    </div>
                  ))}
                  {initialData.products.length === 0 && [1, 2, 3].map(i => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-black/5 flex gap-3 items-center animate-pulse">
                      <div className="w-12 h-12 bg-zinc-100 rounded-xl flex-shrink-0" />
                      <div className="flex-1">
                        <div className="w-24 h-3 bg-zinc-100 rounded mb-2" />
                        <div className="w-12 h-2.5 bg-zinc-50 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
