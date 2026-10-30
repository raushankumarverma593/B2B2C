import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Recycle, 
  Target, 
  Layers, 
  Shirt, 
  Gift, 
  Users, 
  ShieldCheck
} from 'lucide-react';

export default function AboutUsPage() {
  const { t, lang } = useLanguage();

  const roadmapPhases = [
    {
      phase: lang === 'hindi' ? "चरण 1" : "Phase 1",
      status: lang === 'hindi' ? "वर्तमान में सक्रिय" : "Currently Active",
      badgeColor: "bg-eco-100 text-eco-800 border-eco-200",
      title: t.about.p1Title,
      desc: t.about.p1Desc,
      icon: Recycle,
      highlights: lang === 'hindi' ? [
        "किराना दुकानों, चाय स्टॉलों और कैंटीनों में निःशुल्क ब्रांडेड कलेक्शन बिन",
        "नियमित समय पर डिजिटल वजन रसीद के साथ आसान डोरस्टेप पिकअप",
        "दुकानदारों को सीधे बैंक खाते या यूपीआई में समय पर गारंटीड भुगतान"
      ] : [
        "Free branded collection bins placed at grocery, tea stalls & canteens",
        "Scheduled doorstep pickup logistics with verified weighing slips",
        "Direct weekly/monthly digital payments to shopkeepers"
      ]
    },
    {
      phase: lang === 'hindi' ? "चरण 2" : "Phase 2",
      status: lang === 'hindi' ? "आगामी विस्तार" : "Upcoming Expansion",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      title: t.about.p2Title,
      desc: t.about.p2Desc,
      icon: Layers,
      highlights: lang === 'hindi' ? [
        "क्षेत्रीय स्तर पर ऑटोमेटेड हॉट-वाशिंग और श्रेडिंग प्रसंस्करण इकाइयाँ",
        "उच्च शुद्धता वाले ए-ग्रेड वॉशड पीईटी फ्लेक्स (Flakes) का उत्पादन",
        "घरेलू कपड़ा (Textile) एवं पैकेजिंग विनिर्माण उद्योगों को कच्चा माल आपूर्ति"
      ] : [
        "Regional hot-washing & automated shredding facilities",
        "Production of high-purity washed PET flakes (Grade A)",
        "Supplying recycled flakes to domestic textile & packaging industries"
      ]
    },
    {
      phase: lang === 'hindi' ? "चरण 3" : "Phase 3",
      status: lang === 'hindi' ? "उत्पाद विकास" : "Product Vision",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      title: t.about.p3Title,
      desc: t.about.p3Desc,
      icon: Shirt,
      highlights: lang === 'hindi' ? [
        "100% रीसायकल पीईटी धागे से टिकाऊ टी-शर्ट और पर्यावरण-अनुकूल थैले",
        "संस्थानों और कॉरपोरेट कंपनियों के लिए टिकाऊ उपहार व पैकेजिंग समाधान",
        "कचरे से उपयोगी संसाधन बनाने के वास्तविक चक्रीय चक्र का प्रदर्शन"
      ] : [
        "Manufacturing 100% rPET eco-friendly merchandise (T-shirts, tote bags)",
        "Sustainable corporate gifting and eco-packaging solutions",
        "Demonstrating end-to-end circularity where waste becomes utility"
      ]
    },
    {
      phase: lang === 'hindi' ? "चरण 4" : "Phase 4",
      status: lang === 'hindi' ? "उपभोक्ता तकनीक" : "Consumer Tech",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      title: t.about.p4Title,
      desc: t.about.p4Desc,
      icon: Gift,
      highlights: lang === 'hindi' ? [
        "स्मार्ट क्यूआर-कोड युक्त कलेक्शन बिन, जो बोतल की पहचान तुरंत करेंगे",
        "बोतल रिटर्न मोबाइल ऐप: हर बोतल लौटाने पर तत्काल कैशबैक एवं ग्रीन प्वाइंट्स",
        "लोकप्रिय ब्रांडों के साथ डिस्काउंट कूपन और लॉयल्टी रिवार्ड्स की साझेदारी"
      ] : [
        "Smart QR-code bins with instant bottle recognition technology",
        "Bottle Return Mobile App: Scan & Earn cashback rewards on every drop",
        "Partnership with consumer brands for discount coupons & green points"
      ]
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-eco-50/80 via-white to-slate-50 pt-16 pb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-eco-100 text-eco-800 inline-block">
            {t.about.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            {t.about.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {t.about.missionDesc}
          </p>
        </div>
      </section>

      {/* 2. MISSION & VALUES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-eco-100 text-eco-700 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">{t.about.v1Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.about.v1Desc}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">{t.about.v2Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.about.v2Desc}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">{t.about.v3Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.about.v3Desc}
            </p>
          </div>

        </div>
      </section>

      {/* 3. FUTURE ROADMAP (4 PHASES) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-navy-900 text-white inline-block">
            {lang === 'hindi' ? 'दूरदर्शिता एवं नवाचार' : 'Vision & Innovation'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
            {t.about.futureTitle}
          </h2>
          <p className="text-slate-600 text-sm">
            {t.about.futureSub}
          </p>
        </div>

        <div className="space-y-6">
          {roadmapPhases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-navy-900 flex items-center justify-center shrink-0 border border-slate-200">
                    <Icon className="w-7 h-7 text-eco-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-black text-navy-900 text-lg">
                        {phase.phase}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${phase.badgeColor}`}>
                        {phase.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-navy-950">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                      {phase.desc}
                    </p>
                    <ul className="pt-2 space-y-1 text-xs text-slate-500">
                      {phase.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-eco-500"></span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. JOIN US CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-r from-navy-900 via-navy-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-5 border border-navy-800">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            “{t.tagline}”
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.about.joinSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/shop-partner"
              className="px-6 py-3.5 rounded-xl bg-eco-600 text-white font-bold hover:bg-eco-500 shadow-md transition"
            >
              {t.hero.ctaPartner}
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700 transition"
            >
              {t.hero.ctaContact}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
