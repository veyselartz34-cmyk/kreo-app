"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Video, User, ChevronLeft, ChevronRight, Plus, Settings, X, Mail } from "lucide-react";

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
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Veritabanından gelen randevuları kullanıyoruz!
  const meetings = initialMeetings;


  return (
    <div className="max-w-6xl mx-auto pb-12 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Takvim & Randevular</h1>
          <p className="text-zinc-500 text-sm mt-1">Yaklaşan görüşmelerinizi ve uygunluk durumunuzu yönetin.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-black/10 text-[#1A1A1A] text-sm font-semibold rounded-xl hover:bg-zinc-50 transition-colors shadow-sm"
          >
            Müsaitlik Ayarları
          </button>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1A1A1A] text-white text-sm font-semibold rounded-xl hover:bg-black transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            Manuel Ekle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sol Taraf: Mini Takvim */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-[#1A1A1A]">Ekim 2026</h2>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors"><ChevronLeft className="w-4 h-4 text-zinc-600" /></button>
                <button className="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors"><ChevronRight className="w-4 h-4 text-zinc-600" /></button>
              </div>
            </div>
            
            {/* Fake Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map(day => (
                <div key={day} className="text-xs font-bold text-zinc-400 py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isToday = day === 23;
                const hasMeeting = [23, 24, 25].includes(day);
                
                return (
                  <button 
                    key={day}
                    className={`w-full aspect-square flex items-center justify-center rounded-xl font-medium transition-all relative ${
                      isToday ? 'bg-[#D32F2F] text-white shadow-md' : 'text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {day}
                    {hasMeeting && !isToday && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#F57C00] rounded-full"></span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sağ Taraf: Yaklaşan Görüşmeler */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-zinc-400" />
            Yaklaşan Görüşmeler
          </h2>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {meetings.map((meeting) => (
              <div key={meeting.id} className="bg-white p-5 sm:p-6 rounded-3xl border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-black/10 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center border border-orange-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <CalendarIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          meeting.status === 'Yaklaşıyor' ? 'bg-[#D32F2F]/10 text-[#D32F2F]' : 'bg-green-100 text-green-700'
                        }`}>
                          {meeting.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1A1A1A]">{meeting.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="w-4 h-4 text-zinc-400" /> {meeting.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-zinc-400" /> {meeting.time}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-black/5 pt-4 sm:pt-0 mt-2 sm:mt-0">
                    <div className="flex items-center gap-3">
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-bold text-[#1A1A1A]">{meeting.client}</p>
                        <p className="text-xs text-zinc-500">{meeting.email}</p>
                      </div>
                      <img src={meeting.avatar} alt={meeting.client} className="w-10 h-10 rounded-full object-cover border border-black/5" />
                    </div>
                    
                    <a 
                      href={meeting.link} 
                      target="_blank" 
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                        meeting.status === 'Yaklaşıyor' 
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20' 
                          : 'bg-white border border-black/10 text-[#1A1A1A] hover:bg-zinc-50'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      Google Meet'e Katıl
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-black/5"
            >
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <h3 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                  <Settings className="w-5 h-5 text-zinc-500" />
                  Müsaitlik Ayarları
                </h3>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 text-zinc-400 hover:text-[#1A1A1A] bg-zinc-50 hover:bg-zinc-100 rounded-full transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-zinc-500 mb-4">Müşterilerin hangi gün ve saatlerde sizden randevu alabileceğini belirleyin.</p>
                {['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'].map(day => (
                  <div key={day} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-black/5">
                    <span className="font-bold text-[#1A1A1A] text-sm">{day}</span>
                    <span className="text-sm font-medium text-zinc-500">09:00 - 17:00</span>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-zinc-50 border-t border-black/5">
                <button onClick={() => setIsSettingsOpen(false)} className="w-full py-3 bg-[#1A1A1A] text-white text-sm font-bold rounded-xl hover:bg-black transition-colors">Değişiklikleri Kaydet</button>
              </div>
            </motion.div>
          </div>
        )}

        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-black/5"
            >
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <h3 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                  <Plus className="w-5 h-5 text-zinc-500" />
                  Manuel Randevu Ekle
                </h3>
                <button onClick={() => setIsAddOpen(false)} className="p-2 text-zinc-400 hover:text-[#1A1A1A] bg-zinc-50 hover:bg-zinc-100 rounded-full transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Müşteri Adı</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input type="text" placeholder="Örn: John Doe" className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">E-posta Adresi</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input type="email" placeholder="john@example.com" className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Tarih</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input type="text" placeholder="25 Eki 2026" className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Saat</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input type="text" placeholder="14:30" className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] outline-none transition-all text-sm" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-zinc-50 border-t border-black/5 flex items-center justify-end gap-3">
                <button onClick={() => setIsAddOpen(false)} className="px-5 py-2.5 text-zinc-600 text-sm font-bold rounded-xl hover:bg-black/5 transition-colors">İptal</button>
                <button onClick={() => setIsAddOpen(false)} className="px-5 py-2.5 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#C62828] transition-colors shadow-lg shadow-red-500/20">Randevuyu Oluştur</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
