import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Recycle, 
  ArrowRight, 
  Store, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  Trash2, 
  Coins, 
  Truck, 
  ShieldCheck, 
  Send
} from 'lucide-react';

export default function HomePage() {
  const { t, lang } = useLanguage();
  const [impactData, setImpactData] = useState({
    bottlesCollected: 148520,
    shopsPartnered: 134,
    plasticSavedKg: 3713,
    co2SavedKg: 5569
  });

  // Quick contact form state
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetch('/api/impact')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setImpactData(data.data);
        }
      })
      .catch(err => console.log('Using default impact stats'));
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formData.name || !formData.mobile || !formData.message) {
      setFormError(
        lang === 'hindi'
          ? 'कृपया नाम, मोबाइल नंबर और संदेश भरें।'
          : 'Please provide your name, mobile number, and message.'
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
        setFormError(data.message || 'Error submitting message');
      }
    } catch (err) {
      setFormError(
        lang === 'hindi'
          ? 'सर्वर से संपर्क नहीं हो पाया। कृपया पुनः प्रयास करें।'
          : 'Could not connect to the server. Please try again later.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-eco-50/70 via-white to-slate-50 border-b border-slate-200/60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-eco-200/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute -top-10 right-10 w-72 h-72 bg-blue-100/40 rounded-full blur-2xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-eco-100/80 border border-eco-200 text-eco-800 text-xs sm:text-sm font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-eco-500 animate-pulse"></span>
                <span>{t.hero.badge}</span>
              </div>

              {/* Tagline Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight leading-[1.15]">
                {t.hero.titleStart}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-600 via-eco-700 to-teal-600 underline decoration-eco-300 decoration-wavy decoration-2">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              {/* Tagline Display in Bold */}
              <p className="text-xl sm:text-2xl font-bold text-navy-800">
                “{t.tagline}”
              </p>

              {/* Subtitle / Short Explanation */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.subTagline}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
                
                {/* Button 1: Shop Partner Bano */}
                <Link
                  to="/shop-partner"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-eco-600 hover:bg-eco-700 shadow-md shadow-eco-600/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
                >
                  <Store className="w-5 h-5" />
                  <span>{t.hero.ctaPartner}</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>

                {/* Button 2: Bottle Collection Point Dekho */}
                <Link
                  to="/collection-points"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-bold text-navy-900 bg-white hover:bg-slate-100 border-2 border-navy-800 shadow-xs hover:-translate-y-0.5 transition-all duration-200"
                >
                  <MapPin className="w-5 h-5 text-eco-600" />
                  <span>{t.hero.ctaPoints}</span>
                </Link>

                {/* Button 3: Contact Karein */}
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-bold text-slate-700 hover:text-navy-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all duration-200"
                >
                  <PhoneCall className="w-4 h-4 text-slate-600" />
                  <span>{t.hero.ctaContact}</span>
                </Link>

              </div>

              {/* Micro Trust Points */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-eco-600" />
                  <span>{t.hero.trustFreeBin}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-eco-600" />
                  <span>{t.hero.trustPickup}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-eco-600" />
                  <span>{t.hero.trustPayout}</span>
                </div>
              </div>

            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Card */}
                <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-navy-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-44 h-44 bg-eco-500/20 rounded-full blur-2xl"></div>
                  
                  <div className="flex items-center justify-between pb-6 border-b border-navy-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-eco-600 flex items-center justify-center text-white shadow-md shadow-eco-600/40">
                        <Recycle className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">{t.hero.liveCardTitle}</h3>
                        <p className="text-xs text-eco-400 font-medium">{t.hero.liveCardSub}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-eco-500/20 text-eco-300 border border-eco-500/30">
                      {t.hero.liveBadge}
                    </span>
                  </div>

                  {/* Impact Numbers */}
                  <div className="space-y-5 py-6">
                    <div className="bg-navy-950/80 rounded-2xl p-4 border border-navy-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                          {t.hero.statBottles}
                        </p>
                        <p className="text-3xl font-black text-white mt-0.5">
                          {impactData.bottlesCollected.toLocaleString()}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-eco-500/10 flex items-center justify-center text-eco-400">
                        🍾
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-navy-950/80 rounded-2xl p-4 border border-navy-800">
                        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                          {t.hero.statShops}
                        </p>
                        <p className="text-2xl font-bold text-eco-400 mt-0.5">
                          {impactData.shopsPartnered}+
                        </p>
                      </div>
                      <div className="bg-navy-950/80 rounded-2xl p-4 border border-navy-800">
                        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                          {t.hero.statPlastic}
                        </p>
                        <p className="text-2xl font-bold text-teal-400 mt-0.5">
                          {impactData.plasticSavedKg.toLocaleString()} {lang === 'hindi' ? 'किग्रा' : 'kg'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom hook */}
                  <div className="pt-2">
                    <Link
                      to="/shop-partner"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-eco-600 hover:bg-eco-500 text-white font-bold text-sm shadow-md transition"
                    >
                      <span>{t.hero.rightCardCta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PROBLEM & SOLUTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-eco-100 text-eco-800">
            {t.problemSolution.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
            {t.problemSolution.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Problem Card */}
          <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-md shadow-red-500/5 relative overflow-hidden group hover:border-red-200 transition">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-5 font-bold">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 mb-3">
              {t.problemSolution.problemTitle}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {t.problemSolution.problemDesc}
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-red-600">
              <span>{t.problemSolution.problemFooter}</span>
            </div>
          </div>

          {/* Solution Card */}
          <div className="bg-white rounded-3xl p-8 border border-eco-200 shadow-md shadow-eco-500/10 relative overflow-hidden group hover:border-eco-300 transition">
            <div className="w-12 h-12 rounded-2xl bg-eco-100 text-eco-700 flex items-center justify-center mb-5 font-bold">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 mb-3">
              {t.problemSolution.solutionTitle}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {t.problemSolution.solutionDesc}
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-eco-700">
              <CheckCircle2 className="w-4 h-4 text-eco-600" />
              <span>{t.problemSolution.solutionFooter}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS 4 STEPS PREVIEW */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-navy-900 text-white">
              {t.steps.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
              {t.steps.title}
            </h2>
            <p className="text-slate-600 text-base">
              {t.steps.subtitle}
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 relative hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-eco-50 border border-eco-200 text-eco-700 font-extrabold text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h4 className="font-bold text-navy-950 text-base mb-2">
                {t.steps.step1Title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.steps.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 relative hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-extrabold text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h4 className="font-bold text-navy-950 text-base mb-2">
                {t.steps.step2Title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.steps.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 relative hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-extrabold text-lg flex items-center justify-center mb-4">
                3
              </div>
              <h4 className="font-bold text-navy-950 text-base mb-2">
                {t.steps.step3Title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.steps.step3Desc}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 relative hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-eco-600 text-white font-extrabold text-lg flex items-center justify-center mb-4 shadow-sm shadow-eco-600/30">
                4
              </div>
              <h4 className="font-bold text-navy-950 text-base mb-2">
                {t.steps.step4Title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.steps.step4Desc}
              </p>
            </div>

          </div>

          <div className="mt-10 text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-bold text-eco-700 hover:text-eco-800 group"
            >
              <span>{t.steps.viewFullGuide}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. BENEFITS FOR SHOPKEEPERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-eco-100 text-eco-800">
            {t.benefits.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
            {t.benefits.title}
          </h2>
          <p className="text-slate-600 text-base">
            {t.benefits.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-eco-300 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Coins className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-950 text-lg mb-2">{t.benefits.b1Title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{t.benefits.b1Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-eco-300 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-eco-100 text-eco-800 flex items-center justify-center mb-4">
              <Store className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-950 text-lg mb-2">{t.benefits.b2Title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{t.benefits.b2Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-eco-300 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-950 text-lg mb-2">{t.benefits.b3Title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{t.benefits.b3Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-eco-300 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-950 text-lg mb-2">{t.benefits.b4Title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{t.benefits.b4Desc}</p>
          </div>

        </div>

        {/* Banner linking to Shop Partner */}
        <div className="mt-10 rounded-3xl bg-gradient-to-r from-navy-900 to-navy-800 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.benefits.bannerTitle}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base">
              {t.benefits.bannerDesc}
            </p>
          </div>
          <Link
            to="/shop-partner"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-eco-600 hover:bg-eco-500 text-white font-bold text-base shadow-lg transition active:scale-95"
          >
            {t.benefits.bannerBtn}
          </Link>
        </div>

      </section>

      {/* 5. IMPACT PREVIEW & SUSTAINABILITY */}
      <section className="bg-eco-50/50 py-16 border-y border-eco-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-eco-200 text-eco-900">
                {t.impactPage.tag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
                {t.impactPage.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {t.impactPage.subtitle}
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-xl">🌳</span>
                  <span>{t.impactPage.eq1}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-xl">⚡</span>
                  <span>{t.impactPage.eq2}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-xl">🌊</span>
                  <span>{t.impactPage.eq4}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/impact"
                  className="inline-flex items-center gap-2 font-bold text-eco-700 hover:text-eco-800"
                >
                  <span>{t.impactPage.fullReport}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {lang === 'hindi' ? 'बोतलें' : 'Bottles'}
                </p>
                <p className="text-3xl font-black text-navy-950 mt-1">{impactData.bottlesCollected.toLocaleString()}</p>
                <p className="text-xs text-eco-600 font-semibold mt-1">
                  {lang === 'hindi' ? 'एकत्रित हुईं' : 'Collected'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {lang === 'hindi' ? 'दुकानें' : 'Shops'}
                </p>
                <p className="text-3xl font-black text-navy-950 mt-1">{impactData.shopsPartnered}+</p>
                <p className="text-xs text-eco-600 font-semibold mt-1">
                  {lang === 'hindi' ? 'सक्रिय पार्टनर्स' : 'Active Partners'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {lang === 'hindi' ? 'प्लास्टिक' : 'Plastic'}
                </p>
                <p className="text-3xl font-black text-navy-950 mt-1">{impactData.plasticSavedKg.toLocaleString()}</p>
                <p className="text-xs text-eco-600 font-semibold mt-1">
                  {lang === 'hindi' ? 'किग्रा बचाया' : 'kg Diverted'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {lang === 'hindi' ? 'कार्बन डाईऑक्साइड' : 'CO2'}
                </p>
                <p className="text-3xl font-black text-navy-950 mt-1">{impactData.co2SavedKg.toLocaleString()}</p>
                <p className="text-xs text-eco-600 font-semibold mt-1">
                  {lang === 'hindi' ? 'किग्रा उत्सर्जन रोका' : 'kg Offset'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. QUICK CONTACT FORM */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-navy-100 text-navy-900">
              {t.contact.tag}
            </span>
            <h2 className="text-3xl font-extrabold text-navy-950">
              {t.contact.formTitle}
            </h2>
            <p className="text-slate-600 text-sm">
              {t.contact.formSub}
            </p>
          </div>

          {submitted ? (
            <div className="bg-eco-50 border border-eco-200 rounded-2xl p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-eco-600 mx-auto" />
              <h3 className="text-xl font-bold text-navy-950">{t.contact.successTitle}</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
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
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                  {formError}
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
                    placeholder={lang === 'hindi' ? 'उदाहरण: राहुल शर्मा' : 'e.g. Rahul Sharma'}
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
                  rows="3"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'hindi' ? 'अपना संदेश यहाँ लिखें...' : 'Type your message or inquiry here...'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-eco-600 hover:bg-eco-700 text-white font-bold text-base shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? t.contact.submitting : t.contact.submit}</span>
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
