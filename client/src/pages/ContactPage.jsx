import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  MessageCircle,
  Building2
} from 'lucide-react';

export default function ContactPage() {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const phone = '+91 98765 43210';
  const email = 'support@bottlereturn.in';
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    lang === 'hindi'
      ? 'नमस्ते! मुझे बॉटल रिटर्न (Bottle Return) रीसाइक्लिंग नेटवर्क के बारे में जानकारी चाहिए।'
      : 'Hello! I would like to inquire about Bottle Return recycling network.'
  )}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.mobile || !formData.message) {
      setErrorMsg(
        lang === 'hindi'
          ? 'कृपया अपना नाम, मोबाइल नंबर और संदेश अवश्य भरें।'
          : 'Please enter your name, mobile number, and message.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', mobile: '', email: '', city: '', message: '' });
      } else {
        setErrorMsg(data.message || 'Error submitting message');
      }
    } catch (err) {
      setErrorMsg(
        lang === 'hindi'
          ? 'सर्वर से संपर्क नहीं हो पाया। कृपया पुनः प्रयास करें।'
          : 'Could not connect to the server. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-eco-50/80 via-white to-slate-50 pt-16 pb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-eco-100 text-eco-800 inline-block">
            {t.contact.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            {t.contact.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* 2. CONTACT GRID: INFO & FORM */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Highlight Box */}
            <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-white fill-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">{t.contact.whatsappTitle}</h3>
                  <p className="text-emerald-100 text-xs">{t.contact.whatsappSub}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {t.contact.whatsappDesc}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-emerald-800 font-extrabold text-sm hover:bg-emerald-50 transition shadow-sm"
              >
                <span>{t.contact.whatsappBtn}</span>
              </a>
            </div>

            {/* Phone & Email Cards */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-eco-100 text-eco-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-950 text-sm">{t.contact.callUs}</h4>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-base font-extrabold text-slate-800 hover:text-eco-600 transition">
                    {phone}
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">{t.contact.officeTime}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-950 text-sm">{t.contact.emailUs}</h4>
                  <a href={`mailto:${email}`} className="text-base font-extrabold text-slate-800 hover:text-eco-600 transition">
                    {email}
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {lang === 'hindi' ? '24 घंटे के भीतर उत्तर की गारंटी' : '24 hours response guarantee'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-950 text-sm">{t.contact.officeTitle}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    {t.contact.officeAddress}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-extrabold text-navy-950 mb-2">
                {t.contact.formTitle}
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                {t.contact.formSub}
              </p>

              {submitted ? (
                <div className="bg-eco-50 border border-eco-200 rounded-2xl p-8 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-eco-600 mx-auto" />
                  <h4 className="text-2xl font-extrabold text-navy-950">{t.contact.successTitle}</h4>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    {t.contact.successMsg}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm font-bold text-eco-700 underline"
                  >
                    {t.contact.anotherMsg}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                        {t.contact.name}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === 'hindi' ? 'उदाहरण: रमेश शर्मा' : 'e.g. Ramesh Sharma'}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                        {t.contact.mobile}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                        {t.contact.email}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                        {t.contact.city}
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder={lang === 'hindi' ? 'उदाहरण: दिल्ली' : 'e.g. Delhi NCR'}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                      {t.contact.message}
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'hindi' ? 'अपना प्रश्न या प्रस्ताव यहाँ लिखें...' : 'Type your inquiry or proposal here...'}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-eco-600 hover:bg-eco-700 text-white font-extrabold text-base shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? t.contact.submitting : t.contact.submit}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
