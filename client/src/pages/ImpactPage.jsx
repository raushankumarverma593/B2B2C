import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Recycle, 
  Store, 
  TreePine, 
  TrendingUp, 
  Factory
} from 'lucide-react';

export default function ImpactPage() {
  const { t, lang } = useLanguage();
  const [impact, setImpact] = useState({
    bottlesCollected: 148520,
    shopsPartnered: 134,
    plasticSavedKg: 3713,
    co2SavedKg: 5569,
    updatedAt: new Date().toISOString()
  });

  useEffect(() => {
    fetch('/api/impact')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setImpact(data.data);
        }
      })
      .catch(err => console.error('Error fetching impact:', err));
  }, []);

  const treesEquivalent = Math.round(impact.co2SavedKg / 21);
  const kwhEnergySaved = Math.round(impact.plasticSavedKg * 5.7);
  const crudeOilSavedLiters = Math.round(impact.plasticSavedKg * 0.4);
  const landfillDivertedTrucks = (impact.bottlesCollected / 25000).toFixed(1);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-eco-50/80 via-white to-slate-50 pt-16 pb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-eco-100 text-eco-800 inline-block">
            {t.impactPage.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            {t.impactPage.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {t.impactPage.subtitle}
          </p>
          <p className="text-xs text-slate-400 font-medium">
            {t.impactPage.lastUpdated}{' '}
            {new Date(impact.updatedAt).toLocaleDateString(lang === 'hindi' ? 'hi-IN' : 'en-IN', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </div>
      </section>

      {/* 2. CORE FOUR IMPACT STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Bottles Collected */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-eco-300 hover:shadow-md transition text-center sm:text-left relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-eco-100 text-eco-700 flex items-center justify-center mb-4 mx-auto sm:mx-0">
              <Recycle className="w-6 h-6" />
            </div>
            <p className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
              {t.impactPage.metric1}
            </p>
            <p className="text-4xl font-black text-navy-950 mt-1 tracking-tight">
              {impact.bottlesCollected.toLocaleString()}
            </p>
            <p className="text-xs text-eco-600 font-semibold mt-2 flex items-center justify-center sm:justify-start gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t.impactPage.metric1Sub}</span>
            </p>
          </div>

          {/* Shops Partnered */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition text-center sm:text-left relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 mx-auto sm:mx-0">
              <Store className="w-6 h-6" />
            </div>
            <p className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
              {t.impactPage.metric2}
            </p>
            <p className="text-4xl font-black text-navy-950 mt-1 tracking-tight">
              {impact.shopsPartnered}+
            </p>
            <p className="text-xs text-blue-600 font-semibold mt-2 flex items-center justify-center sm:justify-start gap-1">
              <span>{t.impactPage.metric2Sub}</span>
            </p>
          </div>

          {/* Plastic Saved */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-teal-300 hover:shadow-md transition text-center sm:text-left relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4 mx-auto sm:mx-0">
              <Factory className="w-6 h-6" />
            </div>
            <p className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
              {t.impactPage.metric3}
            </p>
            <p className="text-4xl font-black text-navy-950 mt-1 tracking-tight">
              {impact.plasticSavedKg.toLocaleString()}{' '}
              <span className="text-2xl font-bold text-slate-500">{lang === 'hindi' ? 'किग्रा' : 'kg'}</span>
            </p>
            <p className="text-xs text-teal-600 font-semibold mt-2 flex items-center justify-center sm:justify-start gap-1">
              <span>{t.impactPage.metric3Sub}</span>
            </p>
          </div>

          {/* CO2 Saved */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition text-center sm:text-left relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 mx-auto sm:mx-0">
              <TreePine className="w-6 h-6" />
            </div>
            <p className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
              {t.impactPage.metric4}
            </p>
            <p className="text-4xl font-black text-navy-950 mt-1 tracking-tight">
              {impact.co2SavedKg.toLocaleString()}{' '}
              <span className="text-2xl font-bold text-slate-500">{lang === 'hindi' ? 'किग्रा' : 'kg'}</span>
            </p>
            <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center justify-center sm:justify-start gap-1">
              <span>{t.impactPage.metric4Sub}</span>
            </p>
          </div>

        </div>
      </section>

      {/* 3. ENVIRONMENTAL EQUIVALENCY HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-navy-800">
          <div className="max-w-3xl mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-eco-400">
              {lang === 'hindi' ? 'पर्यावरणीय बचत' : 'Environmental Value'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.impactPage.eqTitle}
            </h3>
            <p className="text-slate-300 text-sm">
              {t.impactPage.eqSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-navy-950 p-6 rounded-2xl border border-navy-800 space-y-3">
              <span className="text-3xl">🌳</span>
              <h4 className="font-extrabold text-xl text-white">
                {treesEquivalent}+ {lang === 'hindi' ? 'पेड़' : 'Trees'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.impactPage.eq1Desc}
              </p>
            </div>

            <div className="bg-navy-950 p-6 rounded-2xl border border-navy-800 space-y-3">
              <span className="text-3xl">⚡</span>
              <h4 className="font-extrabold text-xl text-white">
                {kwhEnergySaved.toLocaleString()} kWh
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.impactPage.eq2Desc}
              </p>
            </div>

            <div className="bg-navy-950 p-6 rounded-2xl border border-navy-800 space-y-3">
              <span className="text-3xl">🛢️</span>
              <h4 className="font-extrabold text-xl text-white">
                {crudeOilSavedLiters.toLocaleString()} {lang === 'hindi' ? 'लीटर' : 'Liters'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.impactPage.eq3Desc}
              </p>
            </div>

            <div className="bg-navy-950 p-6 rounded-2xl border border-navy-800 space-y-3">
              <span className="text-3xl">🚛</span>
              <h4 className="font-extrabold text-xl text-white">
                {landfillDivertedTrucks} {lang === 'hindi' ? 'ट्रक' : 'Trucks'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.impactPage.eq4Desc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. THE CIRCULAR JOURNEY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-navy-950">
              {t.impactPage.circleTitle}
            </h3>
            <p className="text-slate-600 text-sm">
              {t.impactPage.circleSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-2xl">🧴</span>
              <h4 className="font-bold text-navy-950 text-base">{t.impactPage.c1Title}</h4>
              <p className="text-xs text-slate-600">
                {t.impactPage.c1Desc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-2xl">⚙️</span>
              <h4 className="font-bold text-navy-950 text-base">{t.impactPage.c2Title}</h4>
              <p className="text-xs text-slate-600">
                {t.impactPage.c2Desc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-2xl">👕</span>
              <h4 className="font-bold text-navy-950 text-base">{t.impactPage.c3Title}</h4>
              <p className="text-xs text-slate-600">
                {t.impactPage.c3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-eco-600 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            {t.impactPage.ctaTitle}
          </h3>
          <p className="text-eco-100 max-w-xl mx-auto text-sm sm:text-base">
            {t.impactPage.ctaSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/shop-partner"
              className="px-6 py-3 rounded-xl bg-white text-navy-950 font-bold hover:bg-slate-100 transition shadow-md"
            >
              {t.impactPage.ctaBtn1}
            </Link>
            <Link
              to="/collection-points"
              className="px-6 py-3 rounded-xl bg-navy-900 text-white font-bold hover:bg-navy-800 transition"
            >
              {t.impactPage.ctaBtn2}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
