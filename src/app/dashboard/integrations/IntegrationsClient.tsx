"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Link2, Unplug, ArrowUpRight, Zap, ExternalLink, Check, 
  AlertCircle, X, CheckCircle2, ShieldCheck, Sparkles, Copy
} from "lucide-react";
import { updateIntegrationAction } from "@/app/actions/integrationActions";
import { useRouter } from "next/navigation";

interface InitialIntegrations {
  googleAnalyticsId: string;
  metaPixelId: string;
  googleCalendarEmail: string;
  discordWebhookUrl: string;
  mailchimpApiKey: string;
  mailchimpListId: string;
  customWebhookUrl: string;
  webhookSecret: string;
}

export default function IntegrationsClient({ initialData }: { initialData: InitialIntegrations }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modal Yönetimi
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Form State'leri
  const [tempGaId, setTempGaId] = useState(initialData.googleAnalyticsId);
  const [tempPixelId, setTempPixelId] = useState(initialData.metaPixelId);
  const [tempCalendarEmail, setTempCalendarEmail] = useState(initialData.googleCalendarEmail);
  const [tempDiscordUrl, setTempDiscordUrl] = useState(initialData.discordWebhookUrl);
  const [tempMailchimpKey, setTempMailchimpKey] = useState(initialData.mailchimpApiKey);
  const [tempMailchimpList, setTempMailchimpList] = useState(initialData.mailchimpListId);
  const [tempWebhookUrl, setTempWebhookUrl] = useState(initialData.customWebhookUrl);
  const [tempWebhookSecret, setTempWebhookSecret] = useState(initialData.webhookSecret);

  const [copiedDoc, setCopiedDoc] = useState(false);

  const handleConnect = async (type: any, value?: string, secondaryValue?: string) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const res = await updateIntegrationAction({
      type,
      value,
      secondaryValue,
    });

    setLoading(false);
    if (res.success) {
      setSuccessMessage(res.message || "Entegrasyon başarıyla bağlandı!");
      setActiveModal(null);
      router.refresh();
      setTimeout(() => setSuccessMessage(null), 3500);
    } else {
      setErrorMessage(res.error || "Bir hata oluştu.");
    }
  };

  const handleDisconnect = async (type: any) => {
    if (!confirm("Bu entegrasyonun bağlantısını kesmek istediğinize emin misiniz?")) return;

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const res = await updateIntegrationAction({
      type,
      disconnect: true,
    });

    setLoading(false);
    if (res.success) {
      setSuccessMessage(res.message || "Bağlantı başarıyla kesildi.");
      router.refresh();
      setTimeout(() => setSuccessMessage(null), 3500);
    } else {
      setErrorMessage(res.error || "Bağlantı kesilemedi.");
    }
  };

  const integrationsList = [
    {
      id: "googleAnalytics",
      name: "Google Analytics (GA4)",
      desc: "Vitrin sayfanızın ve ürünlerinizin ziyaretçi trafiğini, ülkelerini ve dönüşümlerini ücretsiz takip edin.",
      category: "Analitik",
      isConnected: Boolean(initialData.googleAnalyticsId),
      valuePreview: initialData.googleAnalyticsId,
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#F9AB00" />
          <path d="M12 5V19M6.5 11V19M17.5 14V19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
      badgeText: initialData.googleAnalyticsId ? "Aktif Bağlantı" : "Ücretsiz",
      onOpen: () => {
        setTempGaId(initialData.googleAnalyticsId);
        setActiveModal("googleAnalytics");
      },
    },
    {
      id: "metaPixel",
      name: "Meta (Facebook) Pixel",
      desc: "Instagram ve Facebook reklamlarınızın satış dönüşümlerini ve sepete eklemelerini hassas biçimde ölçün.",
      category: "Pazarlama",
      isConnected: Boolean(initialData.metaPixelId),
      valuePreview: initialData.metaPixelId ? `ID: ${initialData.metaPixelId}` : undefined,
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#0668E1" />
          <path d="M16.5 7.5C14.8431 7.5 13.5 8.84315 13.5 10.5V13.5H16.5V16.5H13.5V21H10.5V16.5H7.5V13.5H10.5V10.5C10.5 7.18629 13.1863 4.5 16.5 4.5V7.5Z" fill="white" />
        </svg>
      ),
      badgeText: initialData.metaPixelId ? "Aktif Bağlantı" : "Ücretsiz",
      onOpen: () => {
        setTempPixelId(initialData.metaPixelId);
        setActiveModal("metaPixel");
      },
    },
    {
      id: "googleCalendar",
      name: "Google Takvim (Calendar)",
      desc: "Müşterilerinizin satın aldığı 1:1 danışmanlık randevularını doğrudan şahsi Google Takviminize işleyin.",
      category: "Randevu",
      isConnected: Boolean(initialData.googleCalendarEmail),
      valuePreview: initialData.googleCalendarEmail,
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#4285F4" />
          <path d="M7 6V4M17 6V4M5 9H19M6 6H18C18.5523 6 19 6.44772 19 7V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V7C5 6.44772 5.44772 6 6 6Z" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      badgeText: initialData.googleCalendarEmail ? "Aktif Senkron" : "Ücretsiz",
      onOpen: () => {
        setTempCalendarEmail(initialData.googleCalendarEmail || "");
        setActiveModal("googleCalendar");
      },
    },
    {
      id: "discord",
      name: "Discord Topluluk Botu",
      desc: "Ürün veya üyelik satın alan müşterilerinize otomatik bildirim yollayın ve özel Discord kanalına aktarın.",
      category: "Topluluk",
      isConnected: Boolean(initialData.discordWebhookUrl),
      valuePreview: initialData.discordWebhookUrl ? "Webhook Tanımlı" : undefined,
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#5865F2" />
          <path d="M17.5 8C16.5 7.5 15.5 7.2 14.5 7C14.3 7.3 14.1 7.7 14 8C12.7 7.8 11.3 7.8 10 8C9.9 7.7 9.7 7.3 9.5 7C8.5 7.2 7.5 7.5 6.5 8C4.5 11 4 14 4.3 16.9C5.6 17.8 6.9 18.4 8.2 18.8C8.5 18.4 8.8 17.9 9.1 17.4C8.6 17.2 8.2 17 7.8 16.7C7.9 16.6 8 16.5 8.1 16.4C10.7 17.6 13.4 17.6 16 16.4C16.1 16.5 16.2 16.6 16.3 16.7C15.9 17 15.5 17.2 15 17.4C15.3 17.9 15.6 18.4 15.9 18.8C17.2 18.4 18.5 17.8 19.8 16.9C20.1 13.5 19.2 10.5 17.5 8ZM9.5 14.5C8.7 14.5 8 13.8 8 13C8 12.2 8.7 11.5 9.5 11.5C10.3 11.5 11 12.2 11 13C11 13.8 10.3 14.5 9.5 14.5ZM14.5 14.5C13.7 14.5 13 13.8 13 13C13 12.2 13.7 11.5 14.5 11.5C15.3 11.5 16 12.2 16 13C16 13.8 15.3 14.5 14.5 14.5Z" fill="white" />
        </svg>
      ),
      badgeText: initialData.discordWebhookUrl ? "Bağlı" : "Ücretsiz",
      onOpen: () => {
        setTempDiscordUrl(initialData.discordWebhookUrl);
        setActiveModal("discord");
      },
    },
    {
      id: "mailchimp",
      name: "Mailchimp E-posta Eşitleme",
      desc: "Her yeni müşterinizi Mailchimp hedef kitlenize otomatik ekleyin ve e-posta pazarlamasını büyütün.",
      category: "E-posta",
      isConnected: Boolean(initialData.mailchimpApiKey),
      valuePreview: initialData.mailchimpApiKey ? `Liste ID: ${initialData.mailchimpListId || "Varsayılan"}` : undefined,
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#FFE01B" />
          <circle cx="12" cy="12" r="7" fill="#1A1A1A" />
          <circle cx="9.5" cy="10.5" r="1.5" fill="#FFE01B" />
          <circle cx="14.5" cy="10.5" r="1.5" fill="#FFE01B" />
          <path d="M10 14.5C10.8 15.5 13.2 15.5 14 14.5" stroke="#FFE01B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      badgeText: initialData.mailchimpApiKey ? "Bağlı" : "Ücretsiz Plan",
      onOpen: () => {
        setTempMailchimpKey(initialData.mailchimpApiKey);
        setTempMailchimpList(initialData.mailchimpListId);
        setActiveModal("mailchimp");
      },
    },
    {
      id: "customWebhook",
      name: "Özel Webhook (Zapier / Make)",
      desc: "Yeni bir satış yapıldığında kendi sunucunuza, Zapier'e veya Make.com senaryonuza anında canlı JSON bildirim fırlatın.",
      category: "Otomasyon",
      isConnected: Boolean(initialData.customWebhookUrl),
      valuePreview: initialData.customWebhookUrl ? initialData.customWebhookUrl.slice(0, 28) + "..." : undefined,
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#FF4F00] flex items-center justify-center text-white">
          <Zap className="w-4 h-4 fill-current" />
        </div>
      ),
      badgeText: initialData.customWebhookUrl ? "Canlı Webhook" : "Gelişmiş",
      onOpen: () => {
        setTempWebhookUrl(initialData.customWebhookUrl);
        setTempWebhookSecret(initialData.webhookSecret);
        setActiveModal("customWebhook");
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-24 text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Entegrasyonlar & Otomasyon</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">
            Kreo mağazanızı analitik, e-posta, Discord ve takvim araçlarıyla ücretsiz olarak bağlayın.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveModal("customWebhook")}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-md active:scale-95"
          >
            <Zap className="w-4 h-4 text-yellow-400 fill-current" />
            <span>Özel Webhook Ekle</span>
          </button>
        </div>
      </div>

      {/* Başarı ve Hata Bildirimleri */}
      {successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm font-bold flex items-center gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </motion.div>
      )}

      {errorMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm font-bold flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {/* Entegrasyon Kartları Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrationsList.map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={item.id}
            className={`bg-white p-7 rounded-[2.5rem] border shadow-sm transition-all duration-300 flex flex-col justify-between ${
              item.isConnected 
                ? "border-green-300 shadow-green-600/5 hover:shadow-xl" 
                : "border-black/5 hover:border-black/10 hover:shadow-xl"
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-zinc-50 border border-black/5 flex items-center justify-center p-2.5 shadow-sm">
                  {item.icon}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    item.isConnected 
                      ? "bg-green-100 text-green-700 border border-green-200" 
                      : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {item.isConnected ? "✓ Aktif" : item.badgeText}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-black text-[#1A1A1A] mb-2">{item.name}</h3>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed mb-4">{item.desc}</p>

              {item.valuePreview && (
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-black/5 text-[11px] font-mono text-zinc-600 truncate mb-4">
                  {item.valuePreview}
                </div>
              )}
            </div>

            <div className="pt-5 border-t border-black/5 flex items-center gap-2">
              {item.isConnected ? (
                <>
                  <button 
                    onClick={item.onOpen}
                    className="flex-1 py-3 bg-zinc-100 text-[#1A1A1A] text-xs font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                  >
                    Ayarları Düzenle
                  </button>
                  <button 
                    onClick={() => handleDisconnect(item.id)}
                    disabled={loading}
                    className="p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                    title="Bağlantıyı Kes"
                  >
                    <Unplug className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button 
                  onClick={item.onOpen}
                  className="w-full py-3 bg-[#1A1A1A] text-white text-xs font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>Entegrasyonu Bağla</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alt Bilgi & API Dokümantasyonu */}
      <div className="mt-12 bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-black text-[#1A1A1A]">Tüm Entegrasyonlar Ücretsizdir</h3>
          </div>
          <p className="text-xs font-medium text-zinc-500 max-w-xl">
            Kreo platformunda üçüncü parti bağlantılar için ek ücret kesilmez. Kendi Google, Meta, Discord veya Mailchimp hesaplarınızı sınırsız bağlayabilirsiniz.
          </p>
        </div>
        <button 
          onClick={() => {
            navigator.clipboard.writeText("https://docs.kreo.app/api-v1");
            setCopiedDoc(true);
            setTimeout(() => setCopiedDoc(false), 2500);
          }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-50 border border-black/5 text-[#1A1A1A] text-xs font-bold rounded-xl hover:bg-zinc-100 transition-colors shadow-sm whitespace-nowrap"
        >
          {copiedDoc ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-zinc-500" />}
          <span>{copiedDoc ? "Link Kopyalandı!" : "API & Webhook Kılavuzu"}</span>
        </button>
      </div>

      {/* ===================== MODALLAR ===================== */}

      {/* 1. Google Analytics Modalı */}
      <AnimatePresence>
        {activeModal === "googleAnalytics" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-md w-full p-8 rounded-[2.5rem] shadow-2xl border border-black/5 relative space-y-6"
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-[#1A1A1A]">
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-2xl font-black text-[#1A1A1A]">Google Analytics (GA4)</h3>
                <p className="text-xs font-medium text-zinc-500 mt-1">
                  Google Analytics panelinizden aldığınız Ölçüm Kimliğini (Measurement ID) girin.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Ölçüm Kimliği (Measurement ID)
                </label>
                <input 
                  type="text" 
                  value={tempGaId}
                  onChange={e => setTempGaId(e.target.value.toUpperCase())}
                  placeholder="G-XXXXXXXXXX" 
                  className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-mono font-bold outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                />
                <p className="text-[11px] text-zinc-400 mt-2 font-medium">
                  Örn: G-1234567890. Vitrinize giren tüm ziyaretçiler ve sayfa görüntülemeleri anında Google panelinize işlenir.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="flex-1 py-3 text-sm font-bold text-zinc-500 hover:text-[#1A1A1A]"
                >
                  Vazgeç
                </button>
                <button 
                  onClick={() => handleConnect("googleAnalytics", tempGaId)}
                  disabled={loading || !tempGaId.trim()}
                  className="flex-1 py-3 bg-[#1A1A1A] hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? "Kaydediliyor..." : "Kaydet ve Aktifleştir"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Meta Pixel Modalı */}
      <AnimatePresence>
        {activeModal === "metaPixel" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-md w-full p-8 rounded-[2.5rem] shadow-2xl border border-black/5 relative space-y-6"
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-[#1A1A1A]">
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-2xl font-black text-[#1A1A1A]">Meta (Facebook) Pixel</h3>
                <p className="text-xs font-medium text-zinc-500 mt-1">
                  Meta Events Manager üzerinden aldığınız Piksel Kimliğini girin.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Pixel ID (Piksel Numarası)
                </label>
                <input 
                  type="text" 
                  value={tempPixelId}
                  onChange={e => setTempPixelId(e.target.value.replace(/\D/g, ""))}
                  placeholder="Örn: 123456789012345" 
                  maxLength={20}
                  className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-mono font-bold outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                />
                <p className="text-[11px] text-zinc-400 mt-2 font-medium">
                  Instagram ve Facebook reklamlarınızdaki tıklama ve satın alma (Purchase) olayları doğrudan takip edilir.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="flex-1 py-3 text-sm font-bold text-zinc-500 hover:text-[#1A1A1A]"
                >
                  Vazgeç
                </button>
                <button 
                  onClick={() => handleConnect("metaPixel", tempPixelId)}
                  disabled={loading || !tempPixelId.trim()}
                  className="flex-1 py-3 bg-[#1A1A1A] hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? "Kaydediliyor..." : "Pikseli Bağla"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Google Takvim Modalı */}
      <AnimatePresence>
        {activeModal === "googleCalendar" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-md w-full p-8 rounded-[2.5rem] shadow-2xl border border-black/5 relative space-y-6"
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-[#1A1A1A]">
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-2xl font-black text-[#1A1A1A]">Google Takvim Senkronizasyonu</h3>
                <p className="text-xs font-medium text-zinc-500 mt-1">
                  Randevularınızın otomatik olarak ekleneceği Google hesabı e-postanızı girin.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Google Hesabı E-postanız
                </label>
                <input 
                  type="email" 
                  value={tempCalendarEmail}
                  onChange={e => setTempCalendarEmail(e.target.value)}
                  placeholder="ornek@gmail.com" 
                  className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                />
                <p className="text-[11px] text-zinc-400 mt-2 font-medium">
                  Müşteri mağazanızdan 1:1 görüşme aldığında toplantı otomatik olarak bu takvime davetiye olarak düşer.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="flex-1 py-3 text-sm font-bold text-zinc-500 hover:text-[#1A1A1A]"
                >
                  Vazgeç
                </button>
                <button 
                  onClick={() => handleConnect("googleCalendar", tempCalendarEmail)}
                  disabled={loading || !tempCalendarEmail.trim()}
                  className="flex-1 py-3 bg-[#1A1A1A] hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? "Bağlanıyor..." : "Takvimi Eşitle"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Discord Modalı */}
      <AnimatePresence>
        {activeModal === "discord" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-md w-full p-8 rounded-[2.5rem] shadow-2xl border border-black/5 relative space-y-6"
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-[#1A1A1A]">
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-2xl font-black text-[#1A1A1A]">Discord Webhook Bildirimleri</h3>
                <p className="text-xs font-medium text-zinc-500 mt-1">
                  Discord sunucunuzdaki kanal ayarlarından aldığınız Webhook URL adresini yapıştırın.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Discord Webhook URL
                </label>
                <input 
                  type="url" 
                  value={tempDiscordUrl}
                  onChange={e => setTempDiscordUrl(e.target.value)}
                  placeholder="https://discord.com/api/webhooks/..." 
                  className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                />
                <p className="text-[11px] text-zinc-400 mt-2 font-medium">
                  Her yeni siparişte Discord kanalınıza anlık şık bir satış kartı bildirimi düşer.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="flex-1 py-3 text-sm font-bold text-zinc-500 hover:text-[#1A1A1A]"
                >
                  Vazgeç
                </button>
                <button 
                  onClick={() => handleConnect("discord", tempDiscordUrl)}
                  disabled={loading || !tempDiscordUrl.trim()}
                  className="flex-1 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-bold rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? "Kaydediliyor..." : "Discord'a Bağla"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Mailchimp Modalı */}
      <AnimatePresence>
        {activeModal === "mailchimp" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-md w-full p-8 rounded-[2.5rem] shadow-2xl border border-black/5 relative space-y-6"
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-[#1A1A1A]">
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-2xl font-black text-[#1A1A1A]">Mailchimp E-posta Eşitleme</h3>
                <p className="text-xs font-medium text-zinc-500 mt-1">
                  Mailchimp hesabınızın API Anahtarını ve hedef kitle (Audience) kimliğini girin.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Mailchimp API Key
                  </label>
                  <input 
                    type="password" 
                    value={tempMailchimpKey}
                    onChange={e => setTempMailchimpKey(e.target.value)}
                    placeholder="xxxxxxxxxxxx-usX" 
                    className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Liste / Audience ID
                  </label>
                  <input 
                    type="text" 
                    value={tempMailchimpList}
                    onChange={e => setTempMailchimpList(e.target.value)}
                    placeholder="Örn: a1b2c3d4e5" 
                    className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="flex-1 py-3 text-sm font-bold text-zinc-500 hover:text-[#1A1A1A]"
                >
                  Vazgeç
                </button>
                <button 
                  onClick={() => handleConnect("mailchimp", tempMailchimpKey, tempMailchimpList)}
                  disabled={loading || !tempMailchimpKey.trim()}
                  className="flex-1 py-3 bg-[#1A1A1A] hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? "Kaydediliyor..." : "Mailchimp'e Bağla"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Özel Webhook Modalı */}
      <AnimatePresence>
        {activeModal === "customWebhook" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-lg w-full p-8 rounded-[2.5rem] shadow-2xl border border-black/5 relative space-y-6"
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-[#1A1A1A]">
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold mb-2">
                  <Zap className="w-3.5 h-3.5 fill-current" /> Canlı Webhook
                </div>
                <h3 className="text-2xl font-black text-[#1A1A1A]">Özel Webhook Kurulumu</h3>
                <p className="text-xs font-medium text-zinc-500 mt-1">
                  Zapier, Make.com veya kendi sunucunuz için sipariş anında tetiklenecek hedef URL.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Hedef Webhook URL (POST İsteği)
                  </label>
                  <input 
                    type="url" 
                    value={tempWebhookUrl}
                    onChange={e => setTempWebhookUrl(e.target.value)}
                    placeholder="https://hooks.zapier.com/hooks/catch/..." 
                    className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Gizli Güvenlik Anahtarı (Opsiyonel Secret)
                  </label>
                  <input 
                    type="password" 
                    value={tempWebhookSecret}
                    onChange={e => setTempWebhookSecret(e.target.value)}
                    placeholder="whsec_xxxxxxxxxxxx" 
                    className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                  />
                  <p className="text-[11px] text-zinc-400 mt-1.5 font-medium">
                    Webhook istekleri <code>X-Kreo-Signature</code> başlığı ile HMAC-SHA256 imzalanır.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="flex-1 py-3 text-sm font-bold text-zinc-500 hover:text-[#1A1A1A]"
                >
                  Vazgeç
                </button>
                <button 
                  onClick={() => handleConnect("customWebhook", tempWebhookUrl, tempWebhookSecret)}
                  disabled={loading || !tempWebhookUrl.trim()}
                  className="flex-1 py-3 bg-[#1A1A1A] hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? "Kaydediliyor..." : "Webhook'u Kaydet"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
