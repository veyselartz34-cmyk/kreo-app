"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { User, CreditCard, BellRing, Save, Upload, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { updateSettingsAction } from "@/app/actions/settingsActions";

interface InitialData {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  cover: string;
  emailNotifications: boolean;
}

export default function SettingsClient({ initialData }: { initialData: InitialData }) {
  const [activeTab, setActiveTab] = useState("profil");
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(initialData.name);
  const [username, setUsername] = useState(initialData.username);
  const [bio, setBio] = useState(initialData.bio);
  const [avatar, setAvatar] = useState(initialData.avatar);
  const [cover, setCover] = useState(initialData.cover);
  const [emailNotifications, setEmailNotifications] = useState(initialData.emailNotifications);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: "profil", label: "Profil Bilgileri", icon: User },
    { id: "odeme", label: "Ödeme & Iyzico", icon: CreditCard },
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

  const handleSave = async () => {
    setLoading(true);
    const result = await updateSettingsAction({
      name,
      username,
      bio,
      avatar,
      cover,
      emailNotifications
    });

    setLoading(false);
    if (result.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Ayarlar</h1>
        <p className="text-zinc-500 text-sm mt-1">Vitrinini ve hesap tercihlerini buradan yönetebilirsin.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sol Menü (Tabs) */}
        <div className="w-full md:w-64 flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-white border border-black/5 text-[#D32F2F] shadow-sm"
                  : "text-zinc-500 hover:bg-black/5 hover:text-[#1A1A1A] border border-transparent"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-[#D32F2F]" : "text-zinc-400"}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sağ İçerik Alanı */}
        <div className="flex-1">
          {activeTab === "profil" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-8"
            >
              
              {/* Arka Plan (Cover) Fotoğrafı */}
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-4">Vitrin Arka Planı</label>
                <div className="relative w-full h-32 rounded-2xl border-2 border-dashed border-black/10 overflow-hidden bg-zinc-50 flex items-center justify-center cursor-pointer hover:bg-zinc-100 transition-colors" onClick={() => coverInputRef.current?.click()}>
                  {cover ? (
                     <img src={cover} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-zinc-400">
                      <ImageIcon className="w-6 h-6 mx-auto mb-2 opacity-50" />
                      <span className="text-xs font-semibold">Arka Plan Ekle</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" ref={coverInputRef} onChange={(e) => handleImageUpload(e, setCover)} />
                </div>
              </div>

              {/* Profil Fotoğrafı */}
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-4">Profil Fotoğrafı</label>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full border border-black/10 overflow-hidden bg-zinc-50">
                    {avatar ? (
                      <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => avatarInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-black/5 rounded-lg text-sm font-semibold text-[#1A1A1A] hover:bg-zinc-100 transition-colors">
                      <Upload className="w-4 h-4" /> Yeni Yükle
                    </button>
                    <input type="file" accept="image/*" className="hidden" ref={avatarInputRef} onChange={(e) => handleImageUpload(e, setAvatar)} />
                    <p className="text-xs text-zinc-400">Önerilen boyut: 256x256px. Maksimum 2MB.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Ad Soyad</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Vitrin URL (Kullanıcı Adı)</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-black/10 bg-zinc-50 text-zinc-500 text-sm">kreo.com/</span>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="flex-1 px-4 py-2.5 rounded-r-xl border border-black/10 bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Biyografi</label>
                <textarea rows={4} value={bio} onChange={e => setBio(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm resize-none"></textarea>
                <p className="text-xs text-zinc-400 mt-2">Vitrininizde isminizin altında görünecek kısa açıklama.</p>
              </div>
            </motion.div>
          )}

          {activeTab === "odeme" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-8"
            >
              <div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">Iyzico Entegrasyonu</h3>
                <p className="text-sm text-zinc-500 mb-6">Ödeme alabilmek için Iyzico API anahtarlarınızı girin.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">API Key</label>
                    <input type="text" placeholder="sandbox-..." className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Secret Key</label>
                    <input type="password" placeholder="••••••••••••••••" className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-mono" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-black/5">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">Banka Bilgileri</h3>
                <p className="text-sm text-zinc-500 mb-4">Iyzico'daki kazançlarınızın yatırılacağı hesap.</p>
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">IBAN</label>
                  <input type="text" placeholder="TR00 0000 0000 0000 0000 0000 00" className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "bildirimler" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-6"
            >
              {[
                { title: "Yeni Sipariş", desc: "Biri ürün satın aldığında e-posta gönder." },
                { title: "Randevu Hatırlatıcısı", desc: "Görüşmeden 1 saat önce haber ver." },
                { title: "Pazarlama E-postaları", desc: "Kreo'dan gelen ipuçları ve güncellemeler." },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between pb-6 border-b border-black/5 last:border-0 last:pb-0">
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">{item.title}</h4>
                    <p className="text-sm text-zinc-500 mt-1">{item.desc}</p>
                  </div>
                  {/* Real Toggle (all tied to one DB field for demo) */}
                  <div 
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-11 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors ${emailNotifications ? 'bg-[#D32F2F]' : 'bg-zinc-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${emailNotifications ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
                <strong>Not:</strong> E-posta bildirimlerinin gerçekte gönderilmesi için Kreo'nun bir e-posta servisine (örn: Resend, SendGrid) bağlanması gerekmektedir. Şu an için sadece tercihleriniz veritabanına kaydedilir.
              </div>
            </motion.div>
          )}

          {/* Kaydet Butonu */}
          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-sm font-semibold rounded-xl hover:bg-black transition-all shadow-md active:scale-95 disabled:opacity-70"
            >
              {isSaved ? (
                <><CheckCircle2 className="w-4 h-4 text-green-400" /> Kaydedildi</>
              ) : (
                <><Save className="w-4 h-4" /> {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
