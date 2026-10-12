"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, CreditCard, BellRing, Save, Upload, CheckCircle2, 
  Image as ImageIcon, Wallet, ShieldCheck, Sparkles, ArrowUpRight, 
  Building2, KeyRound, Check, AlertCircle, Eye, EyeOff
} from "lucide-react";
import { updateSettingsAction, updatePasswordAction, requestPayoutAction } from "@/app/actions/settingsActions";
import { useRouter } from "next/navigation";

interface InitialData {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  cover: string;
  emailNotifications: boolean;
  iyzicoApiKey: string;
  iyzicoSecretKey: string;
  iban: string;
  plan: string;
  isSubscribed: boolean;
  totalRevenue: number;
  availableBalance: number;
  recentOrdersCount: number;
}

export default function SettingsClient({ initialData }: { initialData: InitialData }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profil");
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Profil Formu
  const [name, setName] = useState(initialData.name);
  const [username, setUsername] = useState(initialData.username);
  const [bio, setBio] = useState(initialData.bio);
  const [avatar, setAvatar] = useState(initialData.avatar);
  const [cover, setCover] = useState(initialData.cover);
  const [emailNotifications, setEmailNotifications] = useState(initialData.emailNotifications);

  // Ödeme & Iyzico / Bakiye Formu
  const [iyzicoApiKey, setIyzicoApiKey] = useState(initialData.iyzicoApiKey);
  const [iyzicoSecretKey, setIyzicoSecretKey] = useState(initialData.iyzicoSecretKey);
  const [iban, setIban] = useState(initialData.iban);
  const [showSecretKey, setShowSecretKey] = useState(false);

  // Bakiye Çekim Formu
  const [payoutAmount, setPayoutAmount] = useState(initialData.availableBalance.toString());
  const [payoutLoading, setPayoutLoading] = useState(false);

  // Şifre Değiştirme Formu
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: "profil", label: "Profil & Hesap", icon: User },
    { id: "bakiye", label: "Bakiye & Para Çekme", icon: Wallet },
    { id: "odeme", label: "Ödeme & Iyzico", icon: CreditCard },
    { id: "guvenlik", label: "Güvenlik & Şifre", icon: ShieldCheck },
    { id: "plan", label: "Abonelik & Plan", icon: Sparkles },
    { id: "bildirimler", label: "Bildirimler", icon: BellRing },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGeneral = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = await updateSettingsAction({
      name,
      username,
      bio,
      avatar,
      cover,
      emailNotifications,
      iyzicoApiKey,
      iyzicoSecretKey,
      iban,
    });

    setLoading(false);
    if (result.success) {
      setIsSaved(true);
      setSuccessMessage(result.message || "Değişiklikler başarıyla kaydedildi!");
      router.refresh();
      setTimeout(() => {
        setIsSaved(false);
        setSuccessMessage(null);
      }, 3500);
    } else {
      setErrorMessage(result.error || "Ayarlar kaydedilemedi.");
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Yeni şifreler birbiriyle eşleşmiyor.");
      return;
    }
    setPasswordLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = await updatePasswordAction({
      currentPassword,
      newPassword,
    });

    setPasswordLoading(false);
    if (result.success) {
      setSuccessMessage(result.message || "Şifreniz başarıyla güncellendi!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccessMessage(null), 3500);
    } else {
      setErrorMessage(result.error || "Şifre güncellenemedi.");
    }
  };

  const handlePayoutRequest = async () => {
    const amountNum = parseFloat(payoutAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setErrorMessage("Lütfen geçerli bir tutar girin.");
      return;
    }
    if (amountNum > initialData.availableBalance) {
      setErrorMessage("Çekmek istediğiniz tutar mevcut bakiyenizden fazla olamaz.");
      return;
    }
    if (!iban || iban.length < 15) {
      setErrorMessage("Lütfen geçerli bir IBAN girin.");
      return;
    }

    setPayoutLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = await requestPayoutAction({
      amount: amountNum,
      iban,
    });

    setPayoutLoading(false);
    if (result.success) {
      setSuccessMessage(result.message || "Ödeme talebiniz başarıyla alındı.");
      setTimeout(() => setSuccessMessage(null), 4000);
    } else {
      setErrorMessage(result.error || "Ödeme talebi oluşturulamadı.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 text-[#1A1A1A]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Ayarlar & Bakiye</h1>
        <p className="text-zinc-500 text-base mt-2 font-medium">
          Hesap tercihlerinizi, Iyzico ödeme entegrasyonunu ve kazanç bakiyenizi buradan yönetin.
        </p>
      </div>

      {/* Başarı ve Hata Bildirimleri */}
      {successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm font-bold flex items-center gap-3"
        >
          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </motion.div>
      )}

      {errorMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm font-bold flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sol Menü (Tabs) */}
        <div className="w-full md:w-64 flex flex-col gap-1.5 flex-shrink-0">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all text-left ${
                  active
                    ? "bg-white border border-black/5 text-[#D32F2F] shadow-sm"
                    : "text-zinc-500 hover:bg-white/60 hover:text-[#1A1A1A] border border-transparent"
                }`}
              >
                <tab.icon className={`w-4 h-4 ${active ? "text-[#D32F2F]" : "text-zinc-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sağ İçerik Alanı */}
        <div className="flex-1">
          {/* ======== 1. PROFİL & HESAP ======== */}
          {activeTab === "profil" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-8"
            >
              {/* Arka Plan (Kapak) Fotoğrafı */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  Vitrin Arka Planı (Kapak)
                </label>
                <div 
                  className="relative w-full h-36 rounded-2xl border-2 border-dashed border-black/10 overflow-hidden bg-zinc-50 flex items-center justify-center cursor-pointer hover:bg-zinc-100 transition-colors group" 
                  onClick={() => coverInputRef.current?.click()}
                >
                  {cover ? (
                    <img src={cover} alt="Kapak Fotoğrafı" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-zinc-400">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <span className="text-xs font-bold">Kapak Fotoğrafı Ekle</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <input type="file" accept="image/*" className="hidden" ref={coverInputRef} onChange={(e) => handleImageUpload(e, setCover)} />
                </div>
              </div>

              {/* Profil Fotoğrafı */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  Profil Fotoğrafı
                </label>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full border border-black/10 overflow-hidden bg-zinc-50 shadow-sm flex-shrink-0">
                    {avatar ? (
                      <img src={avatar} alt="Profil Fotoğrafı" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => avatarInputRef.current?.click()} 
                      className="flex items-center gap-2 px-4 py-2.5 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] hover:bg-zinc-100 transition-colors w-fit"
                    >
                      <Upload className="w-4 h-4" /> Yeni Fotoğraf Yükle
                    </button>
                    <input type="file" accept="image/*" className="hidden" ref={avatarInputRef} onChange={(e) => handleImageUpload(e, setAvatar)} />
                    <p className="text-xs text-zinc-400 font-medium">Önerilen boyut: 256x256 piksel. Maksimum 5MB.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Ad Soyad
                  </label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-bold text-[#1A1A1A]" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    E-posta Adresi
                  </label>
                  <input 
                    type="email" 
                    disabled 
                    value={initialData.email} 
                    className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-100/70 text-zinc-400 text-sm font-medium cursor-not-allowed" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Vitrin URL (Kullanıcı Adı)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-black/5 bg-zinc-100 text-zinc-500 text-sm font-bold">
                    kreo.app/
                  </span>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    className="flex-1 px-4 py-3 rounded-r-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-bold text-[#1A1A1A]" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Biyografi
                </label>
                <textarea 
                  rows={4} 
                  value={bio} 
                  onChange={e => setBio(e.target.value)} 
                  placeholder="Kendinizi veya sunduğunuz ürünleri kısaca tanıtın..." 
                  className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-medium text-[#1A1A1A] resize-none"
                />
                <p className="text-xs text-zinc-400 mt-2 font-medium">Vitrininizde isminizin altında görünecek kısa açıklama.</p>
              </div>

              {/* Kaydet Butonu */}
              <div className="pt-4 flex justify-end">
                <button 
                  onClick={handleSaveGeneral}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#B71C1C] transition-all shadow-[0_4px_14px_rgba(211,47,47,0.3)] disabled:opacity-50"
                >
                  {isSaved ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
                  <span>{loading ? "Kaydediliyor..." : isSaved ? "Kaydedildi!" : "Değişiklikleri Kaydet"}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ======== 2. BAKİYE & PARA ÇEKME ======== */}
          {activeTab === "bakiye" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* 3 KPI Kartı */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-black">
                      ₺
                    </div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Çekilebilir Bakiye</p>
                  </div>
                  <h3 className="text-3xl font-black text-[#1A1A1A]">₺{initialData.availableBalance.toLocaleString("tr-TR")}</h3>
                  <p className="text-xs font-medium text-green-600 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hesabınıza aktarılmaya hazır
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Toplam Ciro</p>
                  </div>
                  <h3 className="text-3xl font-black text-[#1A1A1A]">₺{initialData.totalRevenue.toLocaleString("tr-TR")}</h3>
                  <p className="text-xs font-medium text-zinc-400 mt-2">{initialData.recentOrdersCount} başarılı satış</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Kayıtlı IBAN</p>
                  </div>
                  <h3 className="text-sm font-black text-[#1A1A1A] truncate">{iban ? `${iban.slice(0, 8)}...${iban.slice(-4)}` : "Tanımlanmadı"}</h3>
                  <p className="text-xs font-medium text-zinc-400 mt-2">Iyzico / Havale Transferi</p>
                </div>
              </div>

              {/* Para Çekme Formu */}
              <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[#1A1A1A]">Kazancınızı Hesabınıza Aktarın</h3>
                  <p className="text-sm font-medium text-zinc-500 mt-1">
                    Kazandığınız tutar kayıtlı banka hesabınıza havale edilir.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      Çekilecek Tutar (₺)
                    </label>
                    <input 
                      type="number" 
                      value={payoutAmount} 
                      onChange={e => setPayoutAmount(e.target.value)} 
                      max={initialData.availableBalance}
                      className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-black text-[#1A1A1A]" 
                    />
                    <p className="text-xs text-zinc-400 mt-1 font-medium">Maksimum: ₺{initialData.availableBalance.toLocaleString("tr-TR")}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      Transfer Yapılacak IBAN
                    </label>
                    <input 
                      type="text" 
                      value={iban} 
                      onChange={e => setIban(e.target.value)} 
                      placeholder="TR00 0000 0000 0000 0000 0000 00" 
                      className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-bold text-[#1A1A1A]" 
                    />
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 text-xs text-zinc-500 space-y-1 font-medium">
                  <p className="font-bold text-[#1A1A1A]">💡 Ödeme Takvimi & Kurallar:</p>
                  <p>• Çekim talepleri sonraki iş günü saat 14:00'e kadar bankanıza otomatik olarak transfer edilir.</p>
                  <p>• Kreo Pro satıcılarından para çekme işlemlerinde ek transfer ücreti kesilmez.</p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button 
                    onClick={handlePayoutRequest}
                    disabled={payoutLoading || initialData.availableBalance <= 0}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#1A1A1A] text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-md disabled:opacity-50"
                  >
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                    <span>{payoutLoading ? "Talebiniz İletiliyor..." : "Hesabıma Aktar (Ödeme Talep Et)"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======== 3. ÖDEME & IYZICO ======== */}
          {activeTab === "odeme" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-8"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-[#1A1A1A]">Iyzico Pazaryeri Entegrasyonu</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    iyzicoApiKey ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {iyzicoApiKey ? "Aktif Bağlantı" : "API Anahtarı Bekleniyor"}
                  </span>
                </div>
                <p className="text-sm font-medium text-zinc-500">
                  Müşterilerinizden kredi kartı veya banka kartı ile tahsilat yapabilmek için Iyzico API anahtarlarınızı girin.
                </p>
                
                <div className="space-y-5 mt-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      Iyzico API Key
                    </label>
                    <input 
                      type="text" 
                      value={iyzicoApiKey}
                      onChange={e => setIyzicoApiKey(e.target.value)}
                      placeholder="sandbox-..." 
                      className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-mono text-[#1A1A1A]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      Iyzico Secret Key
                    </label>
                    <div className="relative">
                      <input 
                        type={showSecretKey ? "text" : "password"} 
                        value={iyzicoSecretKey}
                        onChange={e => setIyzicoSecretKey(e.target.value)}
                        placeholder="••••••••••••••••" 
                        className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-mono text-[#1A1A1A] pr-12" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowSecretKey(!showSecretKey)} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                      >
                        {showSecretKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-black/5">
                <h3 className="text-lg font-black text-[#1A1A1A] mb-1">Varsayılan IBAN</h3>
                <p className="text-sm font-medium text-zinc-500 mb-4">Iyzico'daki kazançlarınızın aktarılacağı hesap numarası.</p>
                <div>
                  <input 
                    type="text" 
                    value={iban} 
                    onChange={e => setIban(e.target.value)}
                    placeholder="TR00 0000 0000 0000 0000 0000 00" 
                    className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-bold text-[#1A1A1A]" 
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={handleSaveGeneral}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#B71C1C] transition-all shadow-[0_4px_14px_rgba(211,47,47,0.3)] disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? "Kaydediliyor..." : "Ödeme Ayarlarını Kaydet"}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ======== 4. GÜVENLİK & ŞİFRE ======== */}
          {activeTab === "guvenlik" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
            >
              <div>
                <h3 className="text-xl font-black text-[#1A1A1A]">Hesap Güvenliği & Şifre Değiştir</h3>
                <p className="text-sm font-medium text-zinc-500 mt-1">
                  Kreo hesabınızın güvenliği için güçlü bir şifre kullanmanızı öneririz.
                </p>
              </div>

              <form onSubmit={handlePasswordUpdate} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Mevcut Şifreniz
                  </label>
                  <input 
                    type="password" 
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-medium text-[#1A1A1A]" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      Yeni Şifre
                    </label>
                    <input 
                      type="password" 
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      placeholder="En az 6 karakter" 
                      className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-medium text-[#1A1A1A]" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      Yeni Şifre (Tekrar)
                    </label>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Yeni şifrenizi tekrar girin" 
                      className="w-full px-4 py-3 rounded-xl border border-black/5 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-medium text-[#1A1A1A]" 
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit"
                    disabled={passwordLoading}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#1A1A1A] text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-md disabled:opacity-50"
                  >
                    <KeyRound className="w-4 h-4 text-yellow-400" />
                    <span>{passwordLoading ? "Güncelleniyor..." : "Şifremi Güncelle"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ======== 5. ABONELİK & PLAN ======== */}
          {activeTab === "plan" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
            >
              <div className="flex items-center justify-between pb-6 border-b border-black/5">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#D32F2F] bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    Mevcut Plan
                  </span>
                  <h3 className="text-2xl font-black text-[#1A1A1A] mt-2">Kreo Pro Planı</h3>
                  <p className="text-sm font-medium text-zinc-500 mt-1">Sınırsız ürün, %0 komisyon ve özel alan adı desteği.</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D32F2F]/10 to-orange-500/10 flex items-center justify-center text-2xl font-black text-[#D32F2F]">
                  PRO
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-zinc-50 rounded-2xl border border-black/5">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Platform Komisyonu</p>
                  <p className="text-2xl font-black text-[#1A1A1A] mt-1">%0 Komisyon</p>
                  <p className="text-xs text-zinc-500 mt-1">Kazancınızın tamamı doğrudan sizin hesabınıza geçer.</p>
                </div>
                <div className="p-5 bg-zinc-50 rounded-2xl border border-black/5">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Yayınlanan Ürünler</p>
                  <p className="text-2xl font-black text-[#1A1A1A] mt-1">Sınırsız Kapasite</p>
                  <p className="text-xs text-zinc-500 mt-1">İstediğiniz kadar dijital ürün, bülten ve randevu açabilirsiniz.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-black/5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">Fatura & Üyelik Durumu</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{initialData.email} adresine kayıtlı aktif abonelik.</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                  <Check className="w-3.5 h-3.5" /> Aktif
                </span>
              </div>
            </motion.div>
          )}

          {/* ======== 6. BİLDİRİMLER ======== */}
          {activeTab === "bildirimler" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6"
            >
              <div>
                <h3 className="text-xl font-black text-[#1A1A1A]">E-posta Bildirim Tercihleri</h3>
                <p className="text-sm font-medium text-zinc-500 mt-1">
                  Hangi durumlarda e-posta bildirimi almak istediğinizi seçin.
                </p>
              </div>

              {[
                { title: "Yeni Sipariş & Satış Bildirimi", desc: "Bir müşteri vitrininizden dijital ürün aldığında anında haber ver." },
                { title: "Randevu & Görüşme Hatırlatıcısı", desc: "1:1 görüşmeden 1 saat önce ve rezervasyon anında haber ver." },
                { title: "Haftalık Kazanç & Performans Bülteni", desc: "Her pazartesi mağazanızın haftalık ciro ve ziyaretçi raporunu ilet." },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-black/5 last:border-0">
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">{item.title}</h4>
                    <p className="text-xs font-medium text-zinc-500 mt-1">{item.desc}</p>
                  </div>
                  <div 
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-12 h-7 rounded-full relative cursor-pointer transition-colors shadow-inner flex items-center px-1 ${
                      emailNotifications ? 'bg-[#D32F2F]' : 'bg-zinc-200'
                    }`}
                  >
                    <motion.div 
                      layout
                      className="w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ x: emailNotifications ? 20 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={handleSaveGeneral}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#B71C1C] transition-all shadow-[0_4px_14px_rgba(211,47,47,0.3)] disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? "Kaydediliyor..." : "Tercihleri Kaydet"}</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
