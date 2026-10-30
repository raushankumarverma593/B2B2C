import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloating() {
  const { lang } = useLanguage();
  const phone = '917368012661';
  const text = encodeURIComponent(
    lang === 'hindi'
      ? 'नमस्ते! मुझे बॉटल रिटर्न (Bottle Return) पार्टनर प्रोग्राम और रीसाइक्लिंग नेटवर्क के बारे में जानकारी चाहिए।'
      : 'Hello! I would like to learn more about the Bottle Return partner program & recycling network.'
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${text}`;

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover */}
      <div className="mr-3 hidden md:flex items-center bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-200 transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-ping"></span>
        {lang === 'hindi' ? 'व्हाट्सएप पर संपर्क करें' : 'Chat on WhatsApp'}
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
      </a>
    </aside>
  );
}
