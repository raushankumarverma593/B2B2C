import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Recycle, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-eco-600 flex items-center justify-center text-white shadow-md shadow-eco-600/30">
                <Recycle className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold text-white tracking-tight">Bottle</span>
                <span className="text-2xl font-extrabold text-eco-400 tracking-tight">Return</span>
              </div>
            </Link>
            <p className="text-sm font-semibold text-eco-400">
              “{t.tagline}”
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 border border-navy-700/60 text-xs text-eco-300">
              <span className="w-2 h-2 rounded-full bg-eco-400 animate-pulse"></span>
              <span>
                {lang === 'hindi' ? '100% चक्रीय पीईटी रीसाइक्लिंग नेटवर्क' : '100% Circular PET Recycling Network'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-eco-400 transition-colors flex items-center gap-1">
                  <span>{t.nav.home}</span>
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-eco-400 transition-colors flex items-center gap-1">
                  <span>{t.nav.howItWorks}</span>
                </Link>
              </li>
              <li>
                <Link to="/shop-partner" className="text-eco-400 hover:text-eco-300 font-semibold transition-colors flex items-center gap-1">
                  <span>{t.nav.shopPartner}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/collection-points" className="hover:text-eco-400 transition-colors flex items-center gap-1">
                  <span>{t.nav.collectionPoints}</span>
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-eco-400 transition-colors flex items-center gap-1">
                  <span>{t.nav.impact}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-eco-400 transition-colors flex items-center gap-1">
                  <span>{t.nav.about}</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-eco-400 transition-colors flex items-center gap-1">
                  <span>{t.nav.contact}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners & Recyclers */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {t.footer.partnership}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>{t.footer.kirana}</li>
              <li>{t.footer.tea}</li>
              <li>{t.footer.college}</li>
              <li>{t.footer.restaurant}</li>
              <li>{t.footer.recyclers}</li>
              <li>
                <Link to="/admin" className="text-slate-500 hover:text-slate-300 transition text-xs mt-2 block">
                  {t.footer.adminLink}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {t.footer.support}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-eco-400 mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+919876543210" className="hover:text-white transition">
                    +91 98765 43210
                  </a>
                  <p className="text-xs text-slate-500">{t.contact.officeTime}</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-eco-400 shrink-0" />
                <a href="mailto:support@bottlereturn.in" className="hover:text-white transition">
                  support@bottlereturn.in
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-eco-400 mt-0.5 shrink-0" />
                <span>{t.contact.officeAddress}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t.footer.legal}</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{t.footer.ecoPledge}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
