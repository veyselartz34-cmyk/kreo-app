"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Lock, ShieldCheck, CreditCard, Mail, CheckCircle2, 
  FileText, CalendarDays, Tag, Download, Check, AlertCircle, 
  User, Sparkles, X, ChevronRight, HelpCircle, Calendar, Video, Clock
} from "lucide-react";
import { processCheckoutAction, validateCouponAction } from "@/app/actions/checkoutActions";
import MouseGlow from "@/components/MouseGlow";

type ProductData = {
  id: string;
  title: string;
  price: number;
  type: string;
  icon?: string | null;
  fileUrl?: string | null;
  creatorName: string;
  creatorUsername: string;
};

export default function CheckoutClient({ product }: { product: ProductData }) {
  const isConsulting = product.type.includes("Görüşme") || 
                       product.type.includes("Danışmanlık") || 
                       product.type.includes("Seans") ||
                       product.title.toLowerCase().includes("görüşme") ||
                       product.title.toLowerCase().includes("danışmanlık");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    amount: number;
    createdAt: string;
    meeting?: {
      id: string;
      date: string;
      time: string;
      link: string | null;
    } | null;
  } | null>(null);

  // Form State
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  // Randevu Tercihleri (Danışmanlık/Görüşme için)
  const defaultDate = new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0];
  const [appointmentDate, setAppointmentDate] = useState(defaultDate);
  const [appointmentTime, setAppointmentTime] = useState("14:00 - 15:00");

  const timeSlots = ["10:00 - 11:00", "14:00 - 15:00", "16:30 - 17:30", "19:00 - 20:00"];

  // Kupon State
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
    finalPrice: number;
    message: string;
  } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Fiyat Hesaplama
  const finalPrice = appliedCoupon ? appliedCoupon.finalPrice : product.price;

  // Kart Numarası Formatlama
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    val = val.substring(0, 16);
    const parts = val.match(/[\s\S]{1,4}/g) || [];
    setCardNumber(parts.join(" "));
  };

  // Son Kullanma Tarihi Formatlama (AA/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    val = val.substring(0, 4);
    if (val.length >= 3) {
      setExpiry(`${val.substring(0, 2)}/${val.substring(2)}`);
    } else {
      setExpiry(val);
    }
  };

  // Kupon Uygulama
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError(null);

    const res = await validateCouponAction({
      code: couponCode,
      creatorUsername: product.creatorUsername,
      price: product.price,
    });

    setCouponLoading(false);
    if (res.success) {
      setAppliedCoupon({
        code: res.couponCode!,
        discountAmount: res.discountAmount!,
        finalPrice: res.finalPrice!,
        message: res.message!,
      });
      setCouponCode("");
    } else {
      setCouponError(res.error || "Geçersiz kupon kodu.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  // Ödeme İşlemi
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    setIsProcessing(true);
    setCheckoutError(null);

    const res = await processCheckoutAction({
      clientEmail: email,
      clientName: name,
      productTitle: product.title,
      amount: finalPrice,
      creatorUsername: product.creatorUsername,
      productId: product.id,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      appointmentDate: isConsulting ? appointmentDate : null,
      appointmentTime: isConsulting ? appointmentTime : null,
    });

    setIsProcessing(false);
    if (res.success && res.orderId) {
      setCompletedOrder({
        orderId: res.orderId,
        amount: res.amount || finalPrice,
        createdAt: res.createdAt || new Date().toISOString(),
        meeting: res.meeting || null,
      });
      setIsSuccess(true);
    } else {
      setCheckoutError(res.error || "Ödeme işlenirken bir hata oluştu.");
    }
  };

  // Başarılı Sipariş Ekranı
  if (isSuccess && completedOrder) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 sm:p-6 text-center font-sans relative selection:bg-[#F57C00]/20 selection:text-[#1A1A1A]">
        <MouseGlow />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-lg w-full bg-white p-7 sm:p-10 rounded-[2.5rem] border border-black/[0.08] shadow-[0_12px_45px_rgba(0,0,0,0.06)] space-y-6 text-left relative z-10"
        >
          {/* Üst İkon & Başlık */}
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-inner">
              <CheckCircle2 className="w-9 h-9 text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">Ödemeniz Başarılı!</h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-medium">
              Sipariş faturanız ve onay detayları <strong>{email}</strong> adresinize iletildi.
            </p>
          </div>

          {/* Sipariş Özeti Kartı */}
          <div className="bg-zinc-50 p-5 rounded-2xl border border-black/5 space-y-2.5 text-xs font-medium">
            <div className="flex justify-between pb-2.5 border-b border-black/5">
              <span className="text-zinc-500">Sipariş Referansı:</span>
              <span className="font-mono font-bold text-[#1A1A1A]">{completedOrder.orderId.slice(0, 16)}</span>
            </div>
            <div className="flex justify-between pb-2.5 border-b border-black/5">
              <span className="text-zinc-500">Satın Alınan Ürün:</span>
              <span className="font-bold text-[#1A1A1A] truncate max-w-[200px]">{product.title}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-zinc-500 font-bold">Ödenen Tutar:</span>
              <span className="text-lg font-black text-[#1A1A1A]">₺{completedOrder.amount.toLocaleString("tr-TR")}</span>
            </div>
          </div>

          {/* Danışmanlık / Randevu Durumu */}
          {completedOrder.meeting ? (
            <div className="p-5 bg-orange-50/70 border border-orange-200/60 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-[#D32F2F] uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-[#F57C00]" />
                <span>Canlı Randevunuz Planlandı</span>
              </div>
              <div className="text-xs text-zinc-700 space-y-1 font-medium">
                <p><strong>Tarih & Saat:</strong> {completedOrder.meeting.date} ({completedOrder.meeting.time})</p>
                <p><strong>Katılımcı:</strong> {name} ({email})</p>
              </div>
              {completedOrder.meeting.link && (
                <a
                  href={completedOrder.meeting.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white border border-orange-200 text-[#D32F2F] hover:bg-orange-100/50 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <Video className="w-4 h-4 text-[#F57C00]" />
                  <span>Google Meet Bağlantısını Aç</span>
                </a>
              )}
            </div>
          ) : product.fileUrl ? (
            /* Dijital Dosya İndirme Butonu */
            <div className="space-y-2">
              <a 
                href={product.fileUrl} 
                download 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-emerald-600 text-white text-sm font-bold rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>Dosyayı Bilgisayarına İndir</span>
              </a>
              <p className="text-[11px] text-center text-zinc-400 font-medium">
                İndirme bağlantısı e-postanıza da gönderildi.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50/80 border border-emerald-100 rounded-2xl text-xs text-emerald-800 font-medium text-center">
              🎉 <strong>Tebrikler!</strong> Dijital içerik erişim anahtarlarınız e-posta adresinize gönderildi.
            </div>
          )}

          {/* Vitrine Dön */}
          <Link 
            href={`/${product.creatorUsername}`} 
            className="block w-full py-3.5 bg-zinc-100 hover:bg-zinc-200 text-[#1A1A1A] text-xs font-bold rounded-2xl transition-colors text-center"
          >
            {product.creatorName} Vitrinine Dön
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col md:flex-row font-sans text-[#1A1A1A] relative selection:bg-[#F57C00]/20 selection:text-[#1A1A1A]">
      <MouseGlow />

      {/* Sol Taraf: Ödeme Formu */}
      <div className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1 relative z-10">
        
        {/* Geri Dön Linki */}
        <Link 
          href={`/${product.creatorUsername}/${product.id}`} 
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-[#1A1A1A] transition-colors mb-8 w-fit group"
        >
          <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          </div>
          <span>Ürün Sayfasına Geri Dön</span>
        </Link>

        <div className="max-w-md w-full mx-auto md:mx-0">
          <div className="mb-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D32F2F]">GÜVENLİ ÖDEME</span>
            <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight mt-1">Ödeme Detayları</h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-medium">
              BDDK lisanslı 256-bit iyzico altyapısıyla siparişinizi tamamlayın.
            </p>
          </div>

          {checkoutError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>{checkoutError}</span>
            </motion.div>
          )}

          <form onSubmit={handlePayment} className="space-y-6">
            
            {/* İletişim Bilgileri */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                İletişim Bilgileriniz
              </h3>

              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1.5">Adınız Soyadınız</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ad Soyad" 
                    className="w-full pl-11 pr-4 py-3 bg-white border border-black/10 rounded-xl focus:ring-2 focus:ring-[#F57C00]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1.5">E-posta Adresi (Fatura ve Teslimat için)</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@posta.com" 
                    className="w-full pl-11 pr-4 py-3 bg-white border border-black/10 rounded-xl focus:ring-2 focus:ring-[#F57C00]/20 focus:border-[#D32F2F] outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Birebir Görüşme İse Randevu Tarih & Saat Seçimi */}
            {isConsulting && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F57C00]" />
                  <span>Tercih Ettiğiniz Randevu Saati</span>
                </h3>

                <div className="p-4 bg-white border border-black/10 rounded-2xl space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1">Görüşme Tarihi</label>
                    <input 
                      type="date"
                      value={appointmentDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-black/5 rounded-xl text-xs font-bold text-[#1A1A1A] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5">Saat Aralığı</label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setAppointmentTime(slot)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                            appointmentTime === slot
                              ? "bg-orange-50 border-[#F57C00] text-[#D32F2F]"
                              : "bg-zinc-50 border-black/5 text-zinc-600 hover:bg-zinc-100"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Kart Bilgileri */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Kart Bilgileri
              </h3>

              <div className="bg-white border border-black/10 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-[#F57C00]/20 focus-within:border-[#D32F2F] transition-all shadow-2xs">
                <div className="relative border-b border-black/10">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    required
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    placeholder="Kart Numarası (16 Hane)" 
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent outline-none text-sm font-mono font-medium"
                  />
                </div>
                <div className="flex">
                  <input 
                    type="text" 
                    required
                    value={expiry}
                    onChange={handleExpiryChange}
                    placeholder="AA / YY" 
                    maxLength={5}
                    className="w-1/2 px-4 py-3 bg-transparent outline-none border-r border-black/10 text-sm font-mono font-medium"
                  />
                  <input 
                    type="password" 
                    required
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").substring(0, 4))}
                    placeholder="CVC" 
                    maxLength={4}
                    className="w-1/2 px-4 py-3 bg-transparent outline-none text-sm font-mono font-medium"
                  />
                </div>
              </div>
            </div>

            {/* İmza Sıcak Degrade Ödeme Yap Butonu */}
            <button 
              type="submit" 
              disabled={isProcessing}
              className="relative group/paybtn overflow-hidden w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 shadow-[0_4px_25px_rgba(245,124,0,0.35)] hover:shadow-[0_8px_35px_rgba(245,124,0,0.5)] bg-gradient-to-r from-[#D32F2F] via-[#F57C00] to-[#E65100] flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover/paybtn:animate-[shimmer_1.5s_infinite]" />
              
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
              ) : (
                <span className="relative z-10 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>₺{finalPrice.toLocaleString("tr-TR")} Güvenle Öde</span>
                </span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-zinc-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-zinc-500">256-bit SSL Şifreli Güvenli Ödeme Altyapısı</span>
            </div>
          </form>
        </div>
      </div>

      {/* Sağ Taraf: Sipariş & Kupon Özeti */}
      <div className="flex-1 bg-zinc-50/70 border-l border-black/5 p-6 md:p-12 lg:p-16 flex flex-col justify-center order-1 md:order-2">
        <div className="max-w-md w-full mx-auto md:mx-0 space-y-6">
          
          {/* Ürün Mini Kartı */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-black/[0.08] shadow-2xs">
            <div className="w-16 h-16 bg-orange-50 border border-orange-100/60 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
              {product.icon ? (
                <img src={product.icon} alt={product.title} className="w-full h-full object-cover" />
              ) : isConsulting ? (
                <CalendarDays className="w-7 h-7 text-[#F57C00]" />
              ) : (
                <FileText className="w-7 h-7 text-[#F57C00]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-black text-[#1A1A1A] leading-tight truncate">{product.title}</h3>
              <p className="text-xs font-medium text-zinc-400 mt-0.5">{product.type} • {product.creatorName}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-base sm:text-lg font-black text-[#1A1A1A]">₺{product.price.toLocaleString("tr-TR")}</span>
            </div>
          </div>

          {/* İndirim Kuponu Kutusu */}
          <div className="bg-white p-4 rounded-2xl border border-black/[0.08] shadow-2xs">
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#D32F2F]" />
              <span>İndirim Kuponu</span>
            </label>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{appliedCoupon.code} ({appliedCoupon.message})</span>
                </div>
                <button 
                  onClick={handleRemoveCoupon}
                  className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                  title="Kuponu Kaldır"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Kupon kodunuz (örn: YAZ20)" 
                  className="flex-1 px-4 py-2.5 bg-zinc-50 border border-black/5 rounded-xl text-xs font-bold text-[#1A1A1A] uppercase outline-none focus:ring-2 focus:ring-[#F57C00]/20"
                />
                <button 
                  type="submit"
                  disabled={couponLoading || !couponCode.trim()}
                  className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                >
                  {couponLoading ? "..." : "Uygula"}
                </button>
              </form>
            )}

            {couponError && (
              <p className="text-xs text-red-600 font-bold mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {couponError}
              </p>
            )}
          </div>

          {/* Fiyat Detay Tablosu */}
          <div className="border-t border-black/5 pt-6 space-y-3">
            <div className="flex justify-between text-xs sm:text-sm font-medium text-zinc-500">
              <span>Ara Toplam</span>
              <span>₺{product.price.toLocaleString("tr-TR")}</span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-xs sm:text-sm font-bold text-emerald-600">
                <span>Kupon İndirimi ({appliedCoupon.code})</span>
                <span>-₺{appliedCoupon.discountAmount.toLocaleString("tr-TR")}</span>
              </div>
            )}

            <div className="flex justify-between text-xs sm:text-sm font-medium text-zinc-500">
              <span>KDV & Güvenli Ödeme Altyapısı</span>
              <span className="text-emerald-600 font-bold">Dahil</span>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-black/5 mt-4">
              <span className="text-sm sm:text-base font-black text-[#1A1A1A]">Ödenecek Toplam Tutar</span>
              <span className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
                ₺{finalPrice.toLocaleString("tr-TR")}
              </span>
            </div>
          </div>

          {/* Iyzico Güven Rozeti */}
          <div className="p-4 bg-white border border-black/[0.08] rounded-2xl flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1A1A1A] to-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-black text-xs shadow-xs">
              iyzi
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1A1A]">Iyzico Korumalı Güvenli Alışveriş</p>
              <p className="text-[11px] text-zinc-400 font-medium">Ödemeniz BDDK lisanslı Iyzico altyapısıyla korunmaktadır.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
