import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Store, 
  UserCheck, 
  Boxes, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle
} from 'lucide-react';

export default function HowItWorksPage() {
  const { t, lang } = useLanguage();

  const stepsList = [
    {
      step: 1,
      badge: lang === 'hindi' ? "चरण 01" : "Step 01",
      icon: Store,
      color: "bg-eco-600 text-white",
      borderColor: "border-eco-200",
      bgLight: "bg-eco-50/50",
      title: t.steps.step1Title,
      desc: t.steps.step1Desc,
      details: lang === 'hindi' ? [
        "शून्य निवेश: कलेक्शन बिन 100% निःशुल्क प्रदान किया जाता है",
        "कम जगह: दुकान के बाहर केवल 1.5 वर्ग फीट स्थान घेरता है",
        "मजबूत मौसम-रोधी धातु जाली (Metal Mesh) संरचना",
        "ग्राहकों द्वारा आसानी से पहचान योग्य स्पष्ट ब्रांडिंग"
      ] : [
        "Zero investment: Collection bin provided 100% free of charge",
        "Compact footprint: Takes only 1.5 sq ft space outside shop",
        "Sturdy weather-resistant metal mesh structure",
        "High-visibility branding for immediate customer recognition"
      ]
    },
    {
      step: 2,
      badge: lang === 'hindi' ? "चरण 02" : "Step 02",
      icon: UserCheck,
      color: "bg-blue-600 text-white",
      borderColor: "border-blue-200",
      bgLight: "bg-blue-50/50",
      title: t.steps.step2Title,
      desc: t.steps.step2Desc,
      details: lang === 'hindi' ? [
        "पीईटी पैकेज्ड पानी, कोल्ड ड्रिंक, एनर्जी ड्रिंक व जूस की बोतलें",
        "ग्राहक खाली बोतलें सीधे बिन के विशेष स्लॉट में डालते हैं",
        "गीले कचरे में मिलने से बचकर प्लास्टिक साफ रहता है",
        "दुकान के आसपास का परिसर साफ-सुथरा और स्वच्छ बना रहता है"
      ] : [
        "Clean PET water, soft drink, energy drink & juice bottles",
        "Customers drop bottles directly into the designated bin slot",
        "Prevents bottles from contaminating with wet organic waste",
        "Keeps shop surroundings spotless, clean, and litter-free"
      ]
    },
    {
      step: 3,
      badge: lang === 'hindi' ? "चरण 03" : "Step 03",
      icon: Boxes,
      color: "bg-amber-600 text-white",
      borderColor: "border-amber-200",
      bgLight: "bg-amber-50/50",
      title: t.steps.step3Title,
      desc: t.steps.step3Desc,
      details: lang === 'hindi' ? [
        "बोतलें कलेक्शन बैग में सुरक्षित एकत्र होती रहती हैं",
        "दुकानदार प्रतिदिन या साप्ताहिक बोतलों की संख्या नोट करते हैं",
        "प्रत्येक बोतल पर तय कमीशन सीधे खाते में जुड़ता है",
        "बोतलों को स्वयं छांटने या अलग करने का कोई झंझट नहीं"
      ] : [
        "Bottles securely accumulate inside collection bags",
        "Shopkeepers track bottle counts effortlessly",
        "Fixed per-bottle commission credited to your account",
        "No hassle of sorting, crushing, or grading bottles yourself"
      ]
    },
    {
      step: 4,
      badge: lang === 'hindi' ? "चरण 04" : "Step 04",
      icon: Truck,
      color: "bg-teal-600 text-white",
      borderColor: "border-teal-200",
      bgLight: "bg-teal-50/50",
      title: t.steps.step4Title,
      desc: t.steps.step4Desc,
      details: lang === 'hindi' ? [
        "पिकअप वाहन तय दिनों (जैसे सप्ताह में दो बार) दुकान पर आता है",
        "पिकअप के समय तुरंत डिजिटल वजन और संख्या की रसीद",
        "भुगतान सीधे बैंक खाते या यूपीआई में ट्रांसफर",
        "बोतलें सीधे अधिकृत रीसाइक्लिंग कारखानों तक पहुंचाई जाती हैं"
      ] : [
        "Dedicated pickup vehicle arrives on fixed weekly schedules",
        "Instant digital weight/count slip provided at pickup",
        "Direct payments transferred via Bank or UPI",
        "Bottles transported directly to certified recycling plants"
      ]
    }
  ];

  const faqs = [
    {
      q: lang === 'hindi' 
        ? "क्या कलेक्शन बिन लगवाने का कोई शुल्क या किराया है?" 
        : "Is there any cost or rental fee for installing the collection bin?",
      a: lang === 'hindi'
        ? "बिल्कुल नहीं! कलेक्शन बिन 100% निःशुल्क है। कोई सिक्योरिटी डिपॉजिट, किराया या छुपा हुआ शुल्क नहीं लिया जाता।"
        : "Not at all! The collection bin is 100% free of cost with zero deposit, rental, or hidden maintenance charges."
    },
    {
      q: lang === 'hindi' 
        ? "बोतलों का भुगतान कब और किस माध्यम से मिलता है?" 
        : "When and how are payments disbursed to shopkeepers?",
      a: lang === 'hindi'
        ? "भुगतान प्रत्येक महीने की 5 तारीख तक सीधे आपके बैंक खाते या सत्यापित यूपीआई (UPI) आईडी में भेज दिया जाता है।"
        : "Payouts are disbursed monthly (by 5th of every month) directly to your bank account or verified UPI ID."
    },
    {
      q: lang === 'hindi' 
        ? "यदि बिन समय से पहले भर जाए तो क्या करें?" 
        : "What if the collection bin fills up ahead of schedule?",
      a: lang === 'hindi'
        ? "आप हमारे व्हाट्सएप नंबर पर तुरंत संदेश भेज सकते हैं। हमारी एक्सप्रेस पिकअप टीम 4 घंटे के भीतर आकर बोतलें उठा लेगी।"
        : "Simply send a quick WhatsApp message to our dispatch team, and an express pickup will be coordinated within 4 hours."
    },
    {
      q: lang === 'hindi' 
        ? "कलेक्शन बिन में कौन-कौन सी बोतलें डाली जा सकती हैं?" 
        : "Which plastic bottles are accepted in the bins?",
      a: lang === 'hindi'
        ? "सभी प्रकार की पीईटी (PET टाइप 1) प्लास्टिक बोतलें जैसे पानी, पेप्सी, कोका कोला, फ्रूटी, स्टिंग, जूस इत्यादि। कांच की बोतलें या तेल के डिब्बे स्वीकार्य नहीं हैं।"
        : "All standard PET beverage bottles (Water, Soda, Juices, Energy drinks). Glass bottles and motor oil containers are not accepted."
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-eco-50 via-white to-slate-50 pt-16 pb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-eco-100 text-eco-800 inline-block">
            {t.steps.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            {t.steps.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.steps.subtitle}
          </p>
        </div>
      </section>

      {/* 4 Steps Detailed Breakdown */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {stepsList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`flex flex-col lg:flex-row gap-8 items-center bg-white rounded-3xl p-8 sm:p-10 border ${item.borderColor} shadow-sm hover:shadow-md transition`}
              >
                {/* Visual Icon Side */}
                <div className={`w-full lg:w-1/3 flex flex-col items-center justify-center p-8 rounded-2xl ${item.bgLight}`}>
                  <div className={`w-20 h-20 rounded-2xl ${item.color} flex items-center justify-center shadow-lg shadow-slate-300/50 mb-4`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                    {item.badge}
                  </span>
                  <div className="mt-2 text-2xl font-black text-navy-900">
                    {lang === 'hindi' ? `चरण ${item.step}` : `Step ${item.step}`}
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-2/3 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-eco-600 mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Accepted vs Not Accepted Bottles Guide */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'hindi' ? 'कौन सी बोतलें स्वीकार्य हैं? (पीईटी गाइड)' : 'Which Bottles are Accepted? (PET Guide)'}
            </h2>
            <p className="text-slate-400 text-sm">
              {lang === 'hindi' 
                ? 'केवल स्वच्छ पीईटी प्लास्टिक बोतलें एकत्र की जाती हैं ताकि रीसाइक्लिंग उच्च गुणवत्ता की हो सके:' 
                : 'Only clean PET beverage bottles are collected to maintain high recycling standards:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Accepted */}
            <div className="bg-slate-950/60 rounded-2xl p-6 border border-eco-500/30 space-y-4">
              <div className="flex items-center gap-2 text-eco-400 font-bold text-lg">
                <CheckCircle2 className="w-6 h-6" />
                <span>{lang === 'hindi' ? 'स्वीकार्य बोतलें (कलेक्शन योग्य)' : 'Accepted Bottles'}</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-eco-400"></span>
                  <span>{lang === 'hindi' ? 'पैकेज्ड पीने के पानी की बोतलें (बिसलेरी, किनले, एक्वाफिना आदि)' : 'Packaged drinking water bottles (Bisleri, Kinley, Aquafina, etc.)'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-eco-400"></span>
                  <span>{lang === 'hindi' ? 'सॉफ्ट ड्रिंक एवं सोडा बोतलें (कोका-कोला, पेप्सी, थम्स-अप, स्प्राइट आदि)' : 'Carbonated soft drink bottles (Coca Cola, Pepsi, Thums Up, Sprite)'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-eco-400"></span>
                  <span>{lang === 'hindi' ? 'एनर्जी ड्रिंक व जूस बोतलें (स्टिंग, फ्रूटी, माज़ा, रियल आदि)' : 'Energy drinks & juice PET bottles (Sting, Frooti, Maaza, Real)'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-eco-400"></span>
                  <span>{lang === 'hindi' ? 'पारदर्शी एवं रंगीन पीईटी प्लास्टिक (टाइप 1 रीसाइकिलेबल प्लास्टिक)' : 'Clean transparent & tinted PET beverage bottles (Type 1 PETE)'}</span>
                </li>
              </ul>
            </div>

            {/* Not Accepted */}
            <div className="bg-slate-950/60 rounded-2xl p-6 border border-red-500/30 space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-bold text-lg">
                <XCircle className="w-6 h-6" />
                <span>{lang === 'hindi' ? 'अस्वीकार्य (कृपया बिन में न डालें)' : 'Not Accepted (Do Not Drop)'}</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span>{lang === 'hindi' ? 'कांच की बोतलें' : 'Glass bottles of any kind'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span>{lang === 'hindi' ? 'पॉलीथीन थैलियां, चिप्स पैकेट और रैपर' : 'Polythene carry bags, wrappers & chip packets'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span>{lang === 'hindi' ? 'इंजन ऑयल, कीटनाशक या रासायनिक डिब्बे' : 'Engine oil, chemical or pesticide containers'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span>{lang === 'hindi' ? 'गीला भोजन कचरा या चाय के कप' : 'Wet food waste, disposables, or tea cups'}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-200 text-slate-800">
            {lang === 'hindi' ? 'प्रश्नोत्तरी' : 'FAQ'}
          </span>
          <h2 className="text-3xl font-extrabold text-navy-950">
            {lang === 'hindi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h4 className="text-base font-bold text-navy-950 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-eco-600 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-sm text-slate-600 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-r from-eco-600 to-eco-700 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.benefits.bannerTitle}
          </h3>
          <p className="text-eco-100 max-w-xl mx-auto text-sm sm:text-base">
            {t.benefits.bannerDesc}
          </p>
          <div className="pt-2">
            <Link
              to="/shop-partner"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-navy-950 font-bold hover:bg-slate-100 shadow-md transition"
            >
              <span>{t.hero.ctaPartner}</span>
              <ArrowRight className="w-4 h-4 text-eco-600" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
