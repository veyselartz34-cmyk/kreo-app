"use client";

import { useState } from "react";
import { Search, Send, MoreVertical, Image as ImageIcon, Smile, Phone, Video } from "lucide-react";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState("");

  const chats = [
    { id: 1, name: "Caner Demir", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100", lastMessage: "Eğitim setini satın aldım, çok teşekkürler!", time: "10:24", unread: 0 },
    { id: 2, name: "Ayşe Kaya", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", lastMessage: "Randevu saatini 1 saat erteleme şansımız var mı?", time: "Dün", unread: 2 },
    { id: 3, name: "Burak Taş", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", lastMessage: "Teşekkürler, harika bir görüşmeydi.", time: "Salı", unread: 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] text-[#1A1A1A] flex flex-col pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6 flex-shrink-0">
        <div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">Mesajlar</h1>
          <p className="text-zinc-500 text-base mt-2 font-medium">Müşterilerinizle veya abonelerinizle direkt iletişime geçin.</p>
        </div>
      </div>

      {/* Chat Layout */}
      <div className="flex-1 bg-white rounded-[2.5rem] border border-black/5 shadow-sm overflow-hidden flex min-h-0">
        
        {/* Sidebar (List) */}
        <div className="w-full sm:w-80 border-r border-black/5 flex flex-col flex-shrink-0">
          <div className="p-6 border-b border-black/5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Müşteri ara..." 
                className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-black/5 rounded-xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-[#D32F2F]/30 outline-none transition-all placeholder:text-zinc-400"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {chats.map((chat) => (
              <button 
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full flex items-start gap-4 p-5 border-b border-black/5 text-left transition-colors ${
                  activeChat === chat.id ? "bg-zinc-50" : "hover:bg-zinc-50/50"
                }`}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover border border-black/5" />
                  {chat.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D32F2F] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-[#1A1A1A] truncate">{chat.name}</h4>
                    <span className="text-xs font-bold text-zinc-400">{chat.time}</span>
                  </div>
                  <p className={`text-sm truncate ${chat.unread > 0 ? "font-bold text-[#1A1A1A]" : "font-medium text-zinc-500"}`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#FDFBF7]">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="h-20 bg-white border-b border-black/5 px-8 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                  <img src={chats.find(c => c.id === activeChat)?.avatar} className="w-10 h-10 rounded-full object-cover border border-black/5" alt="" />
                  <div>
                    <h3 className="text-base font-bold text-[#1A1A1A]">{chats.find(c => c.id === activeChat)?.name}</h3>
                    <p className="text-xs font-bold text-green-600">Çevrimiçi</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-zinc-400 hover:text-[#1A1A1A] hover:bg-zinc-100 rounded-xl transition-colors"><Phone className="w-5 h-5" /></button>
                  <button className="p-2 text-zinc-400 hover:text-[#1A1A1A] hover:bg-zinc-100 rounded-xl transition-colors"><Video className="w-5 h-5" /></button>
                  <button className="p-2 text-zinc-400 hover:text-[#1A1A1A] hover:bg-zinc-100 rounded-xl transition-colors ml-2"><MoreVertical className="w-5 h-5" /></button>
                </div>
              </div>

              {/* Messages Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 hide-scrollbar flex flex-col justify-end">
                <div className="flex items-end gap-3 justify-start max-w-xl">
                  <img src={chats.find(c => c.id === activeChat)?.avatar} className="w-8 h-8 rounded-full border border-black/5 flex-shrink-0" alt="" />
                  <div className="bg-white px-5 py-3 rounded-2xl rounded-bl-sm border border-black/5 shadow-sm">
                    <p className="text-sm font-medium text-[#1A1A1A]">Eğitim setini satın aldım, çok teşekkürler! İçeriği incelemeye başladım.</p>
                    <span className="text-[10px] font-bold text-zinc-400 mt-1 block">10:24</span>
                  </div>
                </div>

                <div className="flex items-end gap-3 justify-end max-w-xl self-end">
                  <div className="bg-[#1A1A1A] text-white px-5 py-3 rounded-2xl rounded-br-sm shadow-sm">
                    <p className="text-sm font-medium text-white/90">Harika! Sorularınız olursa buradan bana ulaşabilirsiniz.</p>
                    <span className="text-[10px] font-bold text-white/50 mt-1 block text-right">10:26</span>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-black/5 flex-shrink-0">
                <div className="flex items-center gap-3 bg-zinc-50 border border-black/5 rounded-2xl px-4 py-3">
                  <button className="text-zinc-400 hover:text-[#1A1A1A] transition-colors"><ImageIcon className="w-5 h-5" /></button>
                  <button className="text-zinc-400 hover:text-[#1A1A1A] transition-colors"><Smile className="w-5 h-5" /></button>
                  <input 
                    type="text" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Mesajınızı yazın..." 
                    className="flex-1 bg-transparent text-sm font-bold text-[#1A1A1A] outline-none px-2"
                  />
                  <button className="w-10 h-10 rounded-xl bg-[#D32F2F] text-white flex items-center justify-center hover:bg-[#B71C1C] transition-colors shadow-sm">
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 p-8 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border border-black/5 shadow-sm mb-6">
                <Search className="w-8 h-8 text-zinc-300" />
              </div>
              <h3 className="text-xl font-black text-[#1A1A1A] mb-2">Sohbet Seçin</h3>
              <p className="text-sm font-medium">Okumak veya mesaj göndermek için soldan bir sohbet seçin.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
