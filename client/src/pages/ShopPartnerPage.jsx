import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Coins, 
  Store, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Calculator
} from 'lucide-react';

export default function ShopPartnerPage() {
  const { t, lang } = useLanguage();

  // Calculator state
  const [bottlesPerDay, setBottlesPerDay] = useState(150);
  const ratePerBottle = 0.75; // average ₹0.75 per bottle
  const monthlyEarnings = Math.round(bottlesPerDay * 30 * ratePerBottle);
  const yearlyEarnings = Math.round(monthlyEarnings * 12);

  // Form state
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    mobile: '',
    cityArea: '',
    shopType: lang === 'hindi' ? 'किराना / जनरल स्टोर' : 'Grocery / General Store',
    bottlesPerDay: lang === 'hindi' ? '100 - 200 बोतलें / दिन' : '100 - 200 bottles / day',
    address: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const shopTypes = lang === 'hindi' ? [
    'किराना / जनरल स्टोर',
    'चाय एवं स्नैक्स स्टॉल',
    'पान एवं कोल्ड ड्रिंक कियोस्क',
    'जूस एवं शेक कॉर्नर',
    'कॉलेज / स्कूल कैंटीन',
    'रेस्टोरेंट एवं फास्ट फूड',
    'बेकरी एवं कन्फेक्शनरी',
    'बस स्टैंड / रेलवे स्टेशन दुकान',
    'अन्य खुदरा दुकान'
  ] : [
    'Grocery / General Store',
    'Tea & Snacks Stall',
    'Pan & Cold Drink Kiosk',
    'Juice & Beverage Corner',
    'College / School Canteen',
    'Restaurant & Fast Food',
    'Bakery & Confectionery',
    'Bus Station / Railway Kiosk',
    'Other Retail Store'
  ];

  const bottleEstimates = lang === 'hindi' ? [
    '20 - 50 बोतलें / दिन',
    '50 - 100 बोतलें / दिन',
    '100 - 200 बोतलें / दिन',
    '200 - 400 बोतलें / दिन',
    '500+ बोतलें / दिन'
  ] : [
    '20 - 50 bottles / day',
    '50 - 100 bottles / day',
    '100 - 200 bottles / day',
    '200 - 400 bottles / day',
    '500+ bottles / day'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.shopName || !formData.ownerName || !formData.mobile || !formData.cityArea || !formData.address) {
      setErrorMsg(
        lang === 'hindi'
          ? 'कृपया सभी आवश्यक (चिह्नित *) फ़ील्ड भरें।'
          : 'Please fill in all required fields marked with *'
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({
          shopName: '',
          ownerName: '',
          mobile: '',
          cityArea: '',
          shopType: shopTypes[0],
          bottlesPerDay: bottleEstimates[2],
          address: '',
          message: ''
        });
      } else {
        setErrorMsg(
          data.message || 
          (lang === 'hindi' ? 'आवेदन जमा करने में समस्या आई।' : 'Failed to submit application.')
        );
      }
    } catch (err) {
      setErrorMsg(
        lang === 'hindi'
          ? 'सर्वर से संपर्क नहीं हो पाया। कृपया पुनः प्रयास करें।'
          : 'Could not connect to server. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-eco-50/80 via-white to-slate-50 pt-16 pb-14 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-eco-100 text-eco-800 inline-block shadow-2xs">
            {t.benefits.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            {lang === 'hindi' ? (
              <>
                अपनी दुकान को बनाएं{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-600 to-teal-600">
                  बोतल रिटर्न पार्टनर
                </span>
              </>
            ) : (
              <>
                Partner Your Store with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-600 to-teal-600">
                  Bottle Return
                </span>
              </>
            )}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hindi'
              ? 'निःशुल्क कलेक्शन बिन लगवाएं, ग्राहकों से पीईटी बोतलें एकत्र करें और हर महीने बिना किसी झंझट के गारंटीड अतिरिक्त मासिक आय प्राप्त करें!'
              : 'Install a 100% free collection bin, collect empty PET beverage bottles from customers, and generate predictable extra monthly revenue!'}
          </p>
        </div>
      </section>

      {/* 2. CORE BENEFITS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold text-navy-950">
            {t.benefits.title}
          </h2>
          <p className="text-slate-600 text-sm">
            {t.benefits.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Extra Income */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:border-amber-300 hover:shadow-md transition group">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Coins className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 mb-2">
              {t.benefits.b1Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.benefits.b1Desc}
            </p>
          </div>

          {/* Free Collection Bin */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:border-eco-300 hover:shadow-md transition group">
            <div className="w-14 h-14 rounded-2xl bg-eco-100 text-eco-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Store className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 mb-2">
              {t.benefits.b2Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.benefits.b2Desc}
            </p>
          </div>

          {/* Easy Pickup */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:border-blue-300 hover:shadow-md transition group">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 mb-2">
              {t.benefits.b3Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.benefits.b3Desc}
            </p>
          </div>

          {/* Monthly Payment */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:border-emerald-300 hover:shadow-md transition group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 mb-2">
              {t.benefits.b4Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.benefits.b4Desc}
            </p>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE EARNINGS ESTIMATOR */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-navy-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-eco-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-eco-600 flex items-center justify-center text-white shadow-md">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white">
                {t.calculator.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {t.calculator.subtitle}
              </p>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">{t.calculator.sliderLabel}</span>
              <span className="text-2xl font-black text-eco-400 bg-navy-950 px-4 py-1 rounded-xl border border-navy-800">
                {bottlesPerDay} {t.calculator.bottlesDay}
              </span>
            </div>
            
            <input
              type="range"
              min="30"
              max="500"
              step="10"
              value={bottlesPerDay}
              onChange={(e) => setBottlesPerDay(Number(e.target.value))}
              className="w-full h-3 bg-navy-950 rounded-lg appearance-none cursor-pointer accent-eco-500"
            />
            
            <div className="flex justify-between text-xs text-slate-400">
              <span>{lang === 'hindi' ? '30 बोतलें/दिन' : '30 bottles/day'}</span>
              <span>{lang === 'hindi' ? '250 बोतलें/दिन' : '250 bottles/day'}</span>
              <span>{lang === 'hindi' ? '500+ बोतलें/दिन' : '500+ bottles/day'}</span>
            </div>
          </div>

          {/* Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-navy-800">
            <div className="bg-navy-950 p-5 rounded-2xl border border-navy-800 text-center sm:text-left">
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                {t.calculator.monthlyEst}
              </p>
              <p className="text-3xl sm:text-4xl font-black text-eco-400 mt-1">
                ₹{monthlyEarnings.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 ml-1">
                  {lang === 'hindi' ? '/ महीना' : '/ month'}
                </span>
              </p>
            </div>

            <div className="bg-navy-950 p-5 rounded-2xl border border-navy-800 text-center sm:text-left">
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                {t.calculator.yearlyEst}
              </p>
              <p className="text-3xl sm:text-4xl font-black text-teal-400 mt-1">
                ₹{yearlyEarnings.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 ml-1">
                  {lang === 'hindi' ? '/ वर्ष' : '/ year'}
                </span>
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center mt-4">
            *{t.calculator.rateNote}
          </p>
        </div>
      </section>

      {/* 4. PARTNER REGISTRATION FORM */}
      <section id="partner-form-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-eco-100 text-eco-900 inline-block">
              {t.partnerForm.badge}
            </span>
            <h2 className="text-3xl font-extrabold text-navy-950">
              {t.partnerForm.title}
            </h2>
            <p className="text-slate-600 text-sm">
              {t.partnerForm.subtitle}
            </p>
          </div>

          {submitted ? (
            <div className="bg-eco-50 border border-eco-200 rounded-2xl p-8 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-eco-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-eco-600/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-extrabold text-navy-950">
                {t.partnerForm.successTitle}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                {t.partnerForm.successMsg}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-eco-600 text-white font-bold text-sm hover:bg-eco-700 transition"
                >
                  {t.partnerForm.anotherBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Shop Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    {t.partnerForm.shopName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    placeholder={t.partnerForm.shopNamePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                  />
                </div>

                {/* Owner Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    {t.partnerForm.ownerName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    placeholder={t.partnerForm.ownerNamePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    {t.partnerForm.mobile}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder={t.partnerForm.mobilePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                  />
                </div>

                {/* City / Area */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    {t.partnerForm.cityArea}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cityArea}
                    onChange={(e) => setFormData({ ...formData, cityArea: e.target.value })}
                    placeholder={t.partnerForm.cityAreaPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Shop Type */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    {t.partnerForm.shopType}
                  </label>
                  <select
                    value={formData.shopType}
                    onChange={(e) => setFormData({ ...formData, shopType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm bg-white"
                  >
                    {shopTypes.map((type, idx) => (
                      <option key={idx} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Approximate Bottles / Day */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    {t.partnerForm.bottlesPerDay}
                  </label>
                  <select
                    value={formData.bottlesPerDay}
                    onChange={(e) => setFormData({ ...formData, bottlesPerDay: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm bg-white"
                  >
                    {bottleEstimates.map((est, idx) => (
                      <option key={idx} value={est}>{est}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Complete Address */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  {t.partnerForm.address}
                </label>
                <textarea
                  rows="2"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={t.partnerForm.addressPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                ></textarea>
              </div>

              {/* Message (Optional) */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  {t.partnerForm.message}
                </label>
                <textarea
                  rows="2"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.partnerForm.messagePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-eco-600 hover:bg-eco-700 text-white font-extrabold text-base shadow-lg shadow-eco-600/30 transition disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-5 h-5" />
                <span>{submitting ? t.partnerForm.submittingBtn : t.partnerForm.submitBtn}</span>
              </button>

            </form>
          )}

        </div>
      </section>

    </div>
  );
}
