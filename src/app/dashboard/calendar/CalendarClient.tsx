"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar as CalendarIcon, Clock, Video, ChevronLeft, ChevronRight, 
  Settings, X, Link as LinkIcon, AlertCircle, CalendarSearch, Plus, 
  Trash2, CheckCircle2, User, Mail, ExternalLink, CalendarPlus 
} from "lucide-react";
import { 
  saveWorkingHoursAction, 
  createMeetingAction, 
  updateMeetingStatusAction, 
  deleteMeetingAction 
} from "@/app/actions/calendarActions";

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

type WorkingHour = {
  day: string;
  active: boolean;
  start: string;
  end: string;
};

const DEFAULT_WORKING_HOURS: WorkingHour[] = [
  { day: "Pazartesi", active: true, start: "09:00", end: "17:00" },
  { day: "Salı", active: true, start: "09:00", end: "17:00" },
  { day: "Çarşamba", active: true, start: "09:00", end: "17:00" },
  { day: "Perşembe", active: true, start: "09:00", end: "17:00" },
  { day: "Cuma", active: true, start: "09:00", end: "17:00" },
  { day: "Cumartesi", active: false, start: "10:00", end: "15:00" },
  { day: "Pazar", active: false, start: "10:00", end: "15:00" },
];

export default function CalendarClient({ 
  initialMeetings,
  initialWorkingHours 
}: { 
  initialMeetings: Meeting[];
  initialWorkingHours?: WorkingHour[] | null;
}) {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  
  // Working Hours State
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>(
    initialWorkingHours && initialWorkingHours.length > 0 ? initialWorkingHours : DEFAULT_WORKING_HOURS
  );
  const [isSavingHours, setIsSavingHours] = useState(false);
  const [saveHoursSuccess, setSaveHoursSuccess] = useState(false);

  // New Meeting Form State
  const [newTitle, setNewTitle] = useState("1:1 Danışmanlık Seansı");
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newDate, setNewDate] = useState("2026-10-24");
  const [newTime, setNewTime] = useState("14:00 - 15:00");
  const [newLink, setNewLink] = useState("https://meet.google.com/new");
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Filter meetings by selected day if clicked on calendar
  const filteredMeetings = selectedDate 
    ? meetings.filter(m => m.date.includes(selectedDate.toString())) 
    : meetings;

  // Save Working Hours
  const handleSaveSettings = async () => {
    setIsSavingHours(true);
    setSaveHoursSuccess(false);
    try {
      const res = await saveWorkingHoursAction(JSON.stringify(workingHours));
      if (res.success) {
        setSaveHoursSuccess(true);
        setTimeout(() => {
          setSaveHoursSuccess(false);
          setIsSettingsOpen(false);
        }, 1200);
      } else {
        alert(res.error || "Hata oluştu");
      }
    } catch (e) {
      alert("Bağlantı hatası");
    } finally {
      setIsSavingHours(false);
    }
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

  // Create New Meeting
  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientEmail || !newDate || !newTime) {
      setCreateError("Lütfen zorunlu alanları doldurun.");
      return;
    }

    setIsCreatingMeeting(true);
    setCreateError(null);

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("clientName", newClientName);
    formData.append("clientEmail", newClientEmail);
    formData.append("date", newDate);
    formData.append("time", newTime);
    formData.append("link", newLink);

    const res = await createMeetingAction(formData);
    if (res.success && res.meeting) {
      const created: Meeting = {
        id: res.meeting.id,
        title: res.meeting.title,
        client: res.meeting.clientName,
        email: res.meeting.clientEmail,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(res.meeting.clientName)}&background=random`,
        date: res.meeting.date,
        time: res.meeting.time,
        link: res.meeting.link || "https://meet.google.com/new",
        status: res.meeting.status,
      };
      setMeetings([created, ...meetings]);
      setIsNewMeetingOpen(false);
      // Reset form
      setNewClientName("");
      setNewClientEmail("");
    } else {
      setCreateError(res.error || "Görüşme kaydedilemedi.");
    }
    setIsCreatingMeeting(false);
  };

  // Status toggle
  const handleToggleStatus = async (meetingId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Tamamlandı" ? "Planlandı" : "Tamamlandı";
    setMeetings(meetings.map(m => m.id === meetingId ? { ...m, status: nextStatus } : m));
    await updateMeetingStatusAction(meetingId, nextStatus);
  };

  // Delete Meeting
  const handleDeleteMeeting = async (meetingId: string) => {
    if (!confirm("Bu randevuyu takvimden silmek istediğinize emin misiniz?")) return;
    setMeetings(meetings.filter(m => m.id !== meetingId));
    await deleteMeetingAction(meetingId);
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Randevu Takvimi</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">Yaklaşan danışmanlıklarınızı, seanslarınızı ve müsaitlik saatlerinizi yönetin.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-black/10 text-[#1A1A1A] text-sm font-bold rounded-xl hover:bg-zinc-50 transition-colors shadow-sm"
          >
            <Settings className="w-4 h-4 text-zinc-600" />
            Müsaitlik Saatleri
          </button>
          <button 
            onClick={() => setIsNewMeetingOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#B71C1C] transition-all shadow-[0_4px_14px_rgba(211,47,47,0.3)] hover:shadow-[0_6px_20px_rgba(211,47,47,0.4)]"
          >
            <CalendarPlus className="w-4 h-4" />
            Yeni Seans Ekle
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
                const hasMeeting = meetings.some(m => m.date.includes(day.toString()));
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
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#D32F2F] rounded-full"></span>
                    )}
                    {hasMeeting && isSelected && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="mt-6 flex justify-center">
                <button 
                  onClick={() => setSelectedDate(null)}
                  className="text-xs font-bold text-[#D32F2F] hover:underline transition-colors"
                >
                  Filtreyi Temizle (Tüm Görüşmeleri Göster)
                </button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-black/5">
              <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-100 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-orange-900 leading-relaxed">
                  Danışanlarınız mağazanızdan seans satın aldığında randevular buraya anında düşer. Seans bittiğinde "Tamamlandı" olarak işaretleyebilirsiniz.
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
                {selectedDate ? `${selectedDate} Ekim Görüşmeleri` : "Tüm Randevular"}
              </h2>
            </div>
            <div className="text-sm font-bold text-zinc-500 bg-white px-4 py-2 rounded-xl border border-black/5 shadow-sm">
              {filteredMeetings.length} Seans Kayıtlı
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
                  <div className={`absolute left-0 top-0 bottom-0 w-2 transition-all ${
                    meeting.status === 'Tamamlandı' ? 'bg-green-500' : 'bg-[#D32F2F]'
                  }`}></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
                    {/* Toplantı Detayı */}
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border flex-shrink-0 ${
                        meeting.status === 'Tamamlandı' 
                          ? 'bg-green-50 text-green-600 border-green-100' 
                          : 'bg-red-50 text-[#D32F2F] border-red-100'
                      }`}>
                        <Video className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                            meeting.status === 'Tamamlandı' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {meeting.status}
                          </span>
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

                    {/* Danışan & Aksiyonlar */}
                    <div className="flex flex-col sm:items-end justify-between gap-6 border-t sm:border-t-0 border-black/5 pt-6 sm:pt-0">
                      <div className="flex items-center gap-4">
                        <div className="text-left sm:text-right">
                          <p className="text-base font-black text-[#1A1A1A]">{meeting.client}</p>
                          <p className="text-sm font-medium text-zinc-500">{meeting.email}</p>
                        </div>
                        <img src={meeting.avatar} alt={meeting.client} className="w-12 h-12 rounded-full object-cover border border-black/10 shadow-sm" />
                      </div>
                      
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleToggleStatus(meeting.id, meeting.status)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                            meeting.status === 'Tamamlandı' 
                              ? 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100' 
                              : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                          }`}
                          title="Durumu Değiştir"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {meeting.status === 'Tamamlandı' ? 'Planlandıya Al' : 'Tamamlandı Yap'}
                        </button>

                        <a 
                          href={meeting.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1A1A1A] text-white hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Katıl
                        </a>

                        <button
                          onClick={() => handleDeleteMeeting(meeting.id)}
                          className="p-2.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
                  <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">Henüz Görüşme Yok</h3>
                  <p className="text-zinc-500 font-medium max-w-sm mb-6">
                    {selectedDate ? "Seçtiğiniz tarihte planlanmış bir randevunuz bulunmuyor." : "Takviminize ilk danışmanlık seansınızı ekleyin veya danışanlarınızın mağazanızdan randevu almasını bekleyin."}
                  </p>
                  <div className="flex gap-3">
                    {selectedDate && (
                      <button 
                        onClick={() => setSelectedDate(null)}
                        className="px-5 py-2.5 bg-zinc-100 text-[#1A1A1A] font-bold rounded-xl hover:bg-zinc-200 transition-colors text-sm"
                      >
                        Tümünü Göster
                      </button>
                    )}
                    <button 
                      onClick={() => setIsNewMeetingOpen(true)}
                      className="px-6 py-2.5 bg-[#D32F2F] text-white font-bold rounded-xl hover:bg-[#B71C1C] transition-all text-sm shadow-sm"
                    >
                      Yeni Seans Ekle
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* YENİ SEANS OLUŞTURMA MODALI */}
      <AnimatePresence>
        {isNewMeetingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => !isCreatingMeeting && setIsNewMeetingOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between p-8 border-b border-black/5 bg-zinc-50/50">
                <div>
                  <h2 className="text-2xl font-black text-[#1A1A1A]">Yeni Seans / Randevu Ekle</h2>
                  <p className="text-sm font-medium text-zinc-500 mt-1">Danışanınız için takvime manuel seans tanımlayın.</p>
                </div>
                <button 
                  onClick={() => !isCreatingMeeting && setIsNewMeetingOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-black/5"
                >
                  <X className="w-6 h-6 text-zinc-500" />
                </button>
              </div>

              <form onSubmit={handleCreateMeeting} className="p-8 space-y-5">
                {createError && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl">
                    {createError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Görüşme Başlığı</label>
                  <input 
                    type="text" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Danışan Adı</label>
                    <input 
                      type="text" 
                      placeholder="Ahmet Yılmaz"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Danışan E-posta</label>
                    <input 
                      type="email" 
                      placeholder="ahmet@example.com"
                      value={newClientEmail}
                      onChange={(e) => setNewClientEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Tarih</label>
                    <input 
                      type="text" 
                      placeholder="24 Ekim 2026"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Saat Aralığı</label>
                    <input 
                      type="text" 
                      placeholder="14:00 - 15:00"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Toplantı Linki (Meet / Zoom)</label>
                  <input 
                    type="url" 
                    placeholder="https://meet.google.com/xyz-uvwx-yz"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-medium text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsNewMeetingOpen(false)}
                    className="px-5 py-3 rounded-xl border border-black/10 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-colors"
                  >
                    Vazgeç
                  </button>
                  <button 
                    type="submit"
                    disabled={isCreatingMeeting}
                    className="px-6 py-3 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#B71C1C] transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isCreatingMeeting ? "Kaydediliyor..." : "Seansı Kaydet"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MÜSAİTLİK AYARLARI MODAL - GERÇEK DB KAYDI */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => !isSavingHours && setIsSettingsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex flex-shrink-0 items-center justify-between p-8 border-b border-black/5 bg-zinc-50/50">
                <div>
                  <h2 className="text-2xl font-black text-[#1A1A1A]">Müsaitlik & Çalışma Saatleri</h2>
                  <p className="text-sm font-medium text-zinc-500 mt-1">Danışanların randevu alabileceği gün ve saat dilimleri.</p>
                </div>
                <button 
                  onClick={() => !isSavingHours && setIsSettingsOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-black/5"
                >
                  <X className="w-6 h-6 text-zinc-500" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto space-y-4 flex-1">
                {saveHoursSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-bold rounded-2xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Çalışma saatleri başarıyla kaydedildi!
                  </div>
                )}

                <div className="space-y-3">
                  {workingHours.map((wh, idx) => (
                    <div key={wh.day} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${wh.active ? 'bg-zinc-50 border-black/5' : 'bg-transparent border-black/5 opacity-50'}`}>
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
                          Kapalı / İzinli
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 border-t border-black/5 bg-white flex-shrink-0 flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-5 py-3 rounded-xl border border-black/10 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-colors"
                >
                  Kapat
                </button>
                <button 
                  onClick={handleSaveSettings}
                  disabled={isSavingHours}
                  className="px-8 py-3 bg-[#D32F2F] text-white text-sm font-bold rounded-xl hover:bg-[#B71C1C] transition-all disabled:opacity-70 flex items-center gap-2 shadow-[0_4px_14px_rgba(211,47,47,0.3)]"
                >
                  {isSavingHours ? "Kaydediliyor..." : "Ayarları Kaydet"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
