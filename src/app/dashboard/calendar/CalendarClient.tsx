"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Video, ChevronLeft, ChevronRight, Settings, X, Link as LinkIcon, AlertCircle, CalendarSearch } from "lucide-react";

type Meeting = {
  id: string;
  title: string;
  client: string;
  email: string;
  avatar: string;
  date: string;
  time: string;
  link: string;
  status: string;
};

export default function CalendarClient({ initialMeetings }: { initialMeetings: Meeting[] }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Settings State: Day by Day
  const [workingHours, setWorkingHours] = useState([
    { day: "Pazartesi", active: true, start: "09:00", end: "17:00" },
    { day: "Salı", active: true, start: "09:00", end: "17:00" },
    { day: "Çarşamba", active: true, start: "09:00", end: "17:00" },
    { day: "Perşembe", active: true, start: "09:00", end: "17:00" },
    { day: "Cuma", active: true, start: "09:00", end: "17:00" },
    { day: "Cumartesi", active: false, start: "10:00", end: "15:00" },
    { day: "Pazar", active: false, start: "10:00", end: "15:00" },
  ]);
  
  const meetings = initialMeetings.length > 0 ? initialMeetings : [
    {
      id: "1",
      title: "1:1 Yazılım Mentörlüğü",
      client: "Caner Demir",
      email: "caner@example.com",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop",
      date: "23 Ekim 2026",
      time: "14:30 - 15:30",
      link: "https://meet.google.com/abc-defg-hij",
      status: "Yaklaşıyor"
    },
    {
      id: "2",
      title: "Proje Değerlendirme Toplantısı",
      client: "Ayşe Kaya",
      email: "ayse@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
      date: "24 Ekim 2026",
      time: "11:00 - 12:00",
      link: "https://meet.google.com/xyz-uvwx-yz",
      status: "Planlandı"
    },
    {
      id: "3",
      title: "Girişimcilik Danışmanlığı",
      client: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
      date: "25 Ekim 2026",
      time: "16:00 - 17:00",
      link: "https://meet.google.com/test-link",
      status: "Planlandı"
    }
  ];

  const filteredMeetings = selectedDate 
    ? meetings.filter(m => m.date.startsWith(selectedDate.toString())) 
    : meetings;

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSettingsOpen(false);
    }, 1000);
  };

  const handleDayToggle = (index: number) => {
    const newHours = [...workingHours];
    newHours[index].active = !newHours[index].active;
    setWorkingHours(newHours);
  };

  const handleTimeChange = (index: number, field: "start" | "end", value: string) => {
    const newHours = [...workingHours];
    newHours[index][field] = value;
    setWorkingHours(newHours);
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Randevu Takvimi</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">Yaklaşan görüşmelerinizi, takviminizi ve müsaitlik durumunuzu yönetin.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-black/5 text-[#1A1A1A] text-sm font-bold rounded-xl hover:bg-zinc-50 transition-colors shadow-sm"
          >
            <Settings className="w-4 h-4" />
            Müsaitlik Ayarları
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Sol Taraf: Takvim Widget */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm sticky top-28"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-[#1A1A1A]">Ekim 2026</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-zinc-50 rounded-xl border border-black/5 transition-colors"><ChevronLeft className="w-5 h-5 text-zinc-600" /></button>
                <button className="p-2 hover:bg-zinc-50 rounded-xl border border-black/5 transition-colors"><ChevronRight className="w-5 h-5 text-zinc-600" /></button>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map(day => (
                <div key={day} className="text-xs font-black text-zinc-400">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isToday = day === 23;
                const hasMeeting = meetings.some(m => m.date.startsWith(day.toString()));
                const isSelected = selectedDate === day;
                
                return (
                  <button 
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : day)}
                    className={`w-full aspect-square flex flex-col items-center justify-center rounded-[1rem] font-bold transition-all relative ${
                      isSelected 
                        ? 'bg-[#1A1A1A] text-white shadow-lg transform scale-105 z-10'
                        : isToday 
                          ? 'bg-[#D32F2F] text-white shadow-md' 
                          : hasMeeting 
                            ? 'bg-red-50 text-[#D32F2F] hover:bg-red-100' 
                            : 'text-zinc-600 hover:bg-zinc-50 border border-transparent hover:border-black/5'
                    }`}
                  >
                    {day}
                    {hasMeeting && !isToday && !isSelected && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D32F2F] rounded-full"></span>
                    )}
                    {hasMeeting && isSelected && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                    )}
                  </button>
                )
              })}
            </div>

            {selectedDate && (
              <div className="mt-6 flex justify-center">
                <button 
                  onClick={() => setSelectedDate(null)}
                  className="text-xs font-bold text-zinc-500 hover:text-[#1A1A1A] transition-colors"
                >
                  Filtreyi Temizle (Tümünü Gör)
                </button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-black/5">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <p className="text-xs font-bold text-blue-800 leading-relaxed">
                  Müşterileriniz vitrinden randevu aldığında direkt buraya düşer. Tarihleri filtrelemek için takvimdeki günlere tıklayabilirsiniz.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sağ Taraf: Yaklaşan Görüşmeler Listesi */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-2xl font-black text-[#1A1A1A]">
                {selectedDate ? `${selectedDate} Ekim Görüşmeleri` : "Tüm Yaklaşan Görüşmeler"}
              </h2>
            </div>
            <div className="text-sm font-bold text-zinc-500 bg-white px-4 py-2 rounded-xl border border-black/5 shadow-sm">
              {filteredMeetings.length} Görüşme
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredMeetings.length > 0 ? filteredMeetings.map((meeting) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={meeting.id} 
                  className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#D32F2F] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
                    {/* Toplantı Detayı */}
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-red-50 text-[#D32F2F] rounded-2xl flex items-center justify-center border border-red-100 flex-shrink-0">
                        <Video className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                            meeting.status === 'Yaklaşıyor' ? 'bg-[#D32F2F]/10 text-[#D32F2F]' : 'bg-green-100 text-green-700'
                          }`}>
                            {meeting.status}
                          </span>
                          <span className="text-xs font-bold text-zinc-400">ID: #{meeting.id}</span>
                        </div>
                        <h3 className="text-2xl font-black text-[#1A1A1A] mb-3 tracking-tight">{meeting.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-zinc-500 font-bold bg-zinc-50/50 w-fit px-4 py-2 rounded-xl border border-black/5">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-[#D32F2F]" /> {meeting.date}
                          </div>
                          <div className="hidden sm:block w-1 h-1 bg-zinc-300 rounded-full"></div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#D32F2F]" /> {meeting.time}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Müşteri & Aksiyon */}
                    <div className="flex flex-col sm:items-end justify-between gap-6 border-t sm:border-t-0 border-black/5 pt-6 sm:pt-0">
                      <div className="flex items-center gap-4">
                        <div className="text-left sm:text-right">
                          <p className="text-base font-black text-[#1A1A1A]">{meeting.client}</p>
                          <p className="text-sm font-medium text-zinc-500">{meeting.email}</p>
                        </div>
                        <img src={meeting.avatar} alt={meeting.client} className="w-12 h-12 rounded-full object-cover border border-black/10 shadow-sm" />
                      </div>
                      
                      <a 
                        href={meeting.link} 
                        target="_blank" 
                        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm ${
                          meeting.status === 'Yaklaşıyor' 
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-[0_4px_14px_rgba(37,99,235,0.3)]' 
                            : 'bg-zinc-100 text-[#1A1A1A] hover:bg-zinc-200'
                        }`}
                      >
                        <LinkIcon className="w-4 h-4" />
                        {meeting.status === 'Yaklaşıyor' ? 'Görüşmeye Katıl' : 'Google Meet Linki'}
                      </a>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-16 rounded-[2.5rem] border border-black/5 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6 border border-black/5">
                    <CalendarSearch className="w-10 h-10 text-zinc-300" />
                  </div>
                  <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">Bu Tarihte Görüşme Yok</h3>
                  <p className="text-zinc-500 font-medium">Seçtiğiniz tarihte planlanmış bir randevunuz bulunmuyor.</p>
                  <button 
                    onClick={() => setSelectedDate(null)}
                    className="mt-8 px-6 py-3 bg-zinc-100 text-[#1A1A1A] font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                  >
                    Tüm Görüşmeleri Göster
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Müsaitlik Ayarları Modal - GÜN GÜN */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => !isSaving && setIsSettingsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex flex-shrink-0 items-center justify-between p-8 border-b border-black/5 bg-zinc-50/50">
                <div>
                  <h2 className="text-2xl font-black text-[#1A1A1A]">Müsaitlik Ayarları</h2>
                  <p className="text-sm font-medium text-zinc-500 mt-1">Randevu alabileceğiniz gün ve saatleri belirleyin.</p>
                </div>
                <button 
                  onClick={() => !isSaving && setIsSettingsOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-black/5"
                >
                  <X className="w-6 h-6 text-zinc-500" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto space-y-6 flex-1 hide-scrollbar">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Takvim Entegrasyonu</label>
                  <button className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-black/5 rounded-2xl hover:border-black/10 hover:bg-zinc-50 transition-all font-bold text-[#1A1A1A]">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-5 h-5" alt="Google" />
                    Google Calendar İle Bağlan
                  </button>
                </div>

                <div className="pt-4 border-t border-black/5">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Günlük Çalışma Saatleri</label>
                  
                  <div className="space-y-4">
                    {workingHours.map((wh, idx) => (
                      <div key={wh.day} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${wh.active ? 'bg-zinc-50 border-black/5' : 'bg-transparent border-black/5 opacity-60'}`}>
                        <label className="text-sm font-black text-[#1A1A1A] flex items-center gap-3 min-w-[120px] cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={wh.active} 
                            onChange={() => handleDayToggle(idx)}
                            className="w-5 h-5 rounded border-black/20 text-[#D32F2F] focus:ring-[#D32F2F]" 
                          />
                          {wh.day}
                        </label>
                        
                        {wh.active ? (
                          <div className="flex items-center gap-3 flex-1 sm:justify-end">
                            <input 
                              type="time" 
                              value={wh.start}
                              onChange={(e) => handleTimeChange(idx, "start", e.target.value)}
                              className="px-3 py-2 bg-white border border-black/10 rounded-lg text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30 w-28 text-center" 
                            />
                            <span className="text-zinc-400 font-bold">-</span>
                            <input 
                              type="time" 
                              value={wh.end}
                              onChange={(e) => handleTimeChange(idx, "end", e.target.value)}
                              className="px-3 py-2 bg-white border border-black/10 rounded-lg text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30 w-28 text-center" 
                            />
                          </div>
                        ) : (
                          <div className="text-sm font-bold text-zinc-400 sm:text-right flex-1 px-4">
                            Kapalı
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-black/5 bg-white flex-shrink-0">
                <button 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full py-4 bg-[#D32F2F] text-white text-base font-bold rounded-xl hover:bg-[#B71C1C] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Kaydediliyor...
                    </>
                  ) : "Ayarları Kaydet"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
