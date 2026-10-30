import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  Recycle, 
  Menu, 
  X, 
  Globe, 
  Store, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const { isAuthenticated } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.howItWorks, path: '/how-it-works' },
    { name: t.nav.shopPartner, path: '/shop-partner', highlight: true },
    { name: t.nav.collectionPoints, path: '/collection-points' },
    { name: t.nav.impact, path: '/impact' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-navy-900 text-slate-200 text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-eco-400 animate-pulse"></span>
            <span className="font-semibold text-eco-400">“{t.tagline}”</span>
            <span className="hidden md:inline text-slate-400">| {t.announcement}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/admin" 
              className="hover:text-eco-300 flex items-center gap-1 transition-colors text-slate-300"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-eco-400" />
              <span>
                {isAuthenticated 
                  ? (lang === 'hindi' ? 'एडमिन डैशबोर्ड (सक्रिय)' : 'Admin Dashboard (Active)') 
                  : (lang === 'hindi' ? 'एडमिन लॉगिन' : 'Admin Login')}
              </span>
            </Link>
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 px-2.5 py-0.5 rounded-full border border-slate-700 transition"
              title={lang === 'hindi' ? 'Switch to English' : 'हिंदी में बदलें'}
            >
              <Globe className="w-3 h-3 text-eco-400" />
              <span className="text-[11px] font-bold tracking-wide">
                {lang === 'hindi' ? 'English' : 'हिंदी'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-eco-600 to-eco-700 flex items-center justify-center text-white shadow-md shadow-eco-600/30 group-hover:scale-105 transition-transform">
              <Recycle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-navy-950 tracking-tight">Bottle</span>
                <span className="text-xl font-extrabold text-eco-600 tracking-tight">Return</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-1 hidden sm:block">
                {lang === 'hindi' ? 'रीसायकल करें एवं कमाएं' : 'Recycle & Earn'}
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              if (link.highlight) {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-eco-600 hover:bg-eco-700 text-white shadow-sm shadow-eco-600/30 hover:shadow-md transition-all active:scale-95"
                  >
                    <Store className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'text-eco-700 bg-eco-50/80'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-xs font-bold px-2 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              <Globe className="w-3.5 h-3.5 text-eco-600" />
              <span>{lang === 'hindi' ? 'English' : 'हिंदी'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-navy-900 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-semibold transition-all ${
                    link.highlight
                      ? 'bg-eco-600 text-white font-bold my-2 shadow-sm'
                      : active
                      ? 'bg-eco-50 text-eco-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${link.highlight ? 'text-white' : 'text-slate-400'}`} />
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-100 mt-2">
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-navy-900 px-3 py-2"
              >
                <ShieldCheck className="w-4 h-4 text-eco-600" />
                <span>
                  {isAuthenticated 
                    ? (lang === 'hindi' ? 'एडमिन डैशबोर्ड' : 'Admin Dashboard') 
                    : (lang === 'hindi' ? 'एडमिन लॉगिन' : 'Admin Login')}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
