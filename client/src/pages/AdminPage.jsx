import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  LogOut, 
  TrendingUp, 
  Store, 
  MapPin, 
  Inbox, 
  MessageSquare, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  RefreshCw, 
  Save, 
  AlertCircle,
  Eye
} from 'lucide-react';

export default function AdminPage() {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const { lang } = useLanguage();

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState('impact'); // 'impact' | 'requests' | 'partners' | 'points' | 'contact'

  // Data states
  const [impact, setImpact] = useState({
    bottlesCollected: 0,
    shopsPartnered: 0,
    plasticSavedKg: 0,
    co2SavedKg: 0
  });
  const [requests, setRequests] = useState([]);
  const [partners, setPartners] = useState([]);
  const [points, setPoints] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Modals / forms
  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);
  const [showAddPointModal, setShowAddPointModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [editingPoint, setEditingPoint] = useState(null);
  const [viewingRequest, setViewingRequest] = useState(null);

  // Partner form state
  const [partnerForm, setPartnerForm] = useState({
    shopName: '',
    ownerName: '',
    mobile: '',
    city: 'Delhi',
    area: '',
    shopType: lang === 'hindi' ? 'किराना स्टोर' : 'Grocery Store',
    bottlesPerDay: 100,
    address: '',
    status: 'active'
  });

  // Point form state
  const [pointForm, setPointForm] = useState({
    name: '',
    city: 'Delhi',
    area: '',
    address: '',
    lat: 28.6139,
    lng: 77.2090,
    operatingHours: '08:00 AM - 10:00 PM',
    binType: 'Standard 200-PET Bin',
    status: 'active'
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  // Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        login(data.token, data.user);
        showToast(lang === 'hindi' ? 'लॉगिन सफल रहा!' : 'Login successful!');
      } else {
        setLoginError(
          data.message || 
          (lang === 'hindi' ? 'अमान्य यूज़रनेम या पासवर्ड।' : 'Invalid username or password.')
        );
      }
    } catch (err) {
      setLoginError(
        lang === 'hindi' 
          ? 'प्रमाणीकरण सर्वर से संपर्क नहीं हो पाया।' 
          : 'Could not connect to authentication server.'
      );
    } finally {
      setLoginLoading(false);
    }
  };

  // Fetch all admin data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [resImp, resReq, resPart, resPts, resCnt] = await Promise.all([
        fetch('/api/impact'),
        fetch('/api/requests'),
        fetch('/api/partners'),
        fetch('/api/collection-points'),
        fetch('/api/contact')
      ]);

      const [dImp, dReq, dPart, dPts, dCnt] = await Promise.all([
        resImp.json(),
        resReq.json(),
        resPart.json(),
        resPts.json(),
        resCnt.json()
      ]);

      if (dImp.success) setImpact(dImp.data);
      if (dReq.success) setRequests(dReq.data);
      if (dPart.success) setPartners(dPart.data);
      if (dPts.success) setPoints(dPts.data);
      if (dCnt.success) setContacts(dCnt.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  // Update Impact Numbers
  const handleSaveImpact = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/impact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(impact)
      });
      const data = await res.json();
      if (data.success) {
        setImpact(data.data);
        showToast(lang === 'hindi' ? 'प्रभाव आंकड़े सफलतापूर्वक अपडेट किए गए!' : 'Impact metrics updated successfully!');
      }
    } catch (err) {
      showToast(lang === 'hindi' ? 'अपडेट करने में त्रुटि हुई।' : 'Error updating impact metrics.');
    }
  };

  // Partner Request Status Change (Approve/Reject)
  const handleRequestStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/requests/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        showToast(
          status === 'approved'
            ? (lang === 'hindi' ? 'आवेदन स्वीकृत किया गया और पार्टनर जोड़ दिया गया।' : 'Application approved & partner added.')
            : (lang === 'hindi' ? 'आवेदन अस्वीकृत किया गया।' : 'Application rejected.')
        );
        fetchAllData();
      }
    } catch (err) {
      showToast('Error updating request status');
    }
  };

  // Delete Request
  const handleDeleteRequest = async (id) => {
    const confirmMsg = lang === 'hindi' 
      ? 'क्या आप इस पंजीकरण अनुरोध को हटाना चाहते हैं?' 
      : 'Are you sure you want to delete this registration request?';
    if (!window.confirm(confirmMsg)) return;
    try {
      const res = await fetch(`/api/requests/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(lang === 'hindi' ? 'अनुरोध हटा दिया गया।' : 'Request deleted.');
        setRequests(prev => prev.filter(r => r.id !== id));
      }
    } catch (err) {
      showToast('Error deleting request');
    }
  };

  // Save Partner (Create or Update)
  const handleSavePartner = async (e) => {
    e.preventDefault();
    try {
      const url = editingPartner ? `/api/partners/${editingPartner.id}` : '/api/partners';
      const method = editingPartner ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast(
          editingPartner 
            ? (lang === 'hindi' ? 'पार्टनर विवरण अपडेट हुआ!' : 'Partner updated!')
            : (lang === 'hindi' ? 'नया पार्टनर जोड़ा गया!' : 'New partner added!')
        );
        setShowAddPartnerModal(false);
        setEditingPartner(null);
        setPartnerForm({
          shopName: '',
          ownerName: '',
          mobile: '',
          city: 'Delhi',
          area: '',
          shopType: lang === 'hindi' ? 'किराना स्टोर' : 'Grocery Store',
          bottlesPerDay: 100,
          address: '',
          status: 'active'
        });
        fetchAllData();
      }
    } catch (err) {
      showToast('Error saving partner');
    }
  };

  // Delete Partner
  const handleDeletePartner = async (id) => {
    const confirmMsg = lang === 'hindi' 
      ? 'क्या आप इस पार्टनर को हटाना चाहते हैं?' 
      : 'Delete this partner?';
    if (!window.confirm(confirmMsg)) return;
    try {
      const res = await fetch(`/api/partners/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(lang === 'hindi' ? 'पार्टनर हटा दिया गया।' : 'Partner deleted.');
        fetchAllData();
      }
    } catch (err) {
      showToast('Error deleting partner');
    }
  };

  // Save Collection Point (Create or Update)
  const handleSavePoint = async (e) => {
    e.preventDefault();
    try {
      const url = editingPoint ? `/api/collection-points/${editingPoint.id}` : '/api/collection-points';
      const method = editingPoint ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pointForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast(
          editingPoint 
            ? (lang === 'hindi' ? 'कलेक्शन केंद्र अपडेट हुआ!' : 'Collection point updated!')
            : (lang === 'hindi' ? 'नया कलेक्शन केंद्र जोड़ा गया!' : 'New collection point added!')
        );
        setShowAddPointModal(false);
        setEditingPoint(null);
        setPointForm({
          name: '',
          city: 'Delhi',
          area: '',
          address: '',
          lat: 28.6139,
          lng: 77.2090,
          operatingHours: '08:00 AM - 10:00 PM',
          binType: 'Standard 200-PET Bin',
          status: 'active'
        });
        fetchAllData();
      }
    } catch (err) {
      showToast('Error saving collection point');
    }
  };

  // Delete Collection Point
  const handleDeletePoint = async (id) => {
    const confirmMsg = lang === 'hindi' 
      ? 'क्या आप इस कलेक्शन केंद्र को हटाना चाहते हैं?' 
      : 'Delete this collection point?';
    if (!window.confirm(confirmMsg)) return;
    try {
      const res = await fetch(`/api/collection-points/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(lang === 'hindi' ? 'कलेक्शन केंद्र हटा दिया गया।' : 'Collection point deleted.');
        fetchAllData();
      }
    } catch (err) {
      showToast('Error deleting collection point');
    }
  };

  // Update Contact Status
  const handleContactStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        showToast(lang === 'hindi' ? `स्थिति '${status}' में बदली गई।` : `Status updated to ${status}`);
        fetchAllData();
      }
    } catch (err) {
      showToast('Error updating status');
    }
  };

  // Delete Contact Message
  const handleDeleteContact = async (id) => {
    const confirmMsg = lang === 'hindi' ? 'क्या आप इस संदेश को हटाना चाहते हैं?' : 'Delete this message?';
    if (!window.confirm(confirmMsg)) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(lang === 'hindi' ? 'संदेश हटा दिया गया।' : 'Message deleted.');
        setContacts(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      showToast('Error deleting message');
    }
  };

  // RENDER: LOGIN GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-navy-900 text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-8 h-8 text-eco-400" />
            </div>
            <h2 className="text-2xl font-extrabold text-navy-950">
              {lang === 'hindi' ? 'बोतल रिटर्न एडमिन' : 'Bottle Return Admin'}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'hindi' 
                ? 'दुकान पार्टनर, कलेक्शन केंद्र एवं प्रभाव आंकड़े प्रबंधित करने के लिए साइन इन करें' 
                : 'Sign in to manage shop partners, collection points, and impact stats'}
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                {lang === 'hindi' ? 'यूज़रनेम' : 'Username'}
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                {lang === 'hindi' ? 'पासवर्ड' : 'Password'}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl bg-eco-600 hover:bg-eco-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
            >
              {loginLoading 
                ? (lang === 'hindi' ? 'लॉगिन हो रहा है...' : 'Signing In...') 
                : (lang === 'hindi' ? 'डैशबोर्ड में प्रवेश करें' : 'Sign In to Dashboard')}
            </button>
          </form>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
            {lang === 'hindi' ? 'परीक्षण हेतु डिफ़ॉल्ट विवरण:' : 'Default credentials for testing:'} <br />
            <strong>Username:</strong> <code className="text-slate-800">admin</code> | <strong>Password:</strong> <code className="text-slate-800">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: AUTHENTICATED DASHBOARD
  return (
    <div className="space-y-8 pb-20">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-navy-700 flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
          <Check className="w-5 h-5 text-eco-400" />
          <span className="text-sm font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Header bar */}
      <section className="bg-navy-950 text-white pt-8 pb-10 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-eco-400"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-eco-400">
                  {lang === 'hindi' ? 'नियंत्रण कक्ष' : 'Control Panel'}
                </span>
              </div>
              <h1 className="text-3xl font-black text-white mt-1">
                {lang === 'hindi' ? 'एडमिन डैशबोर्ड' : 'Admin Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchAllData}
                disabled={loading}
                className="px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-200 text-xs font-bold border border-navy-700 flex items-center gap-1.5 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-eco-400' : ''}`} />
                <span>{lang === 'hindi' ? 'रीफ़्रेश' : 'Refresh'}</span>
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-600/90 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{lang === 'hindi' ? 'लॉग आउट' : 'Log Out'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-navy-900/90 p-4 rounded-2xl border border-navy-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase">
                {lang === 'hindi' ? 'सक्रिय पार्टनर' : 'Active Partners'}
              </p>
              <p className="text-2xl font-black text-white mt-0.5">{partners.length}</p>
            </div>
            <div className="bg-navy-900/90 p-4 rounded-2xl border border-navy-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase">
                {lang === 'hindi' ? 'पार्टनर आवेदन' : 'Partner Requests'}
              </p>
              <p className="text-2xl font-black text-amber-400 mt-0.5">
                {requests.filter(r => r.status === 'pending').length} {lang === 'hindi' ? 'लंबित' : 'Pending'}
              </p>
            </div>
            <div className="bg-navy-900/90 p-4 rounded-2xl border border-navy-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase">
                {lang === 'hindi' ? 'कलेक्शन केंद्र' : 'Collection Points'}
              </p>
              <p className="text-2xl font-black text-teal-400 mt-0.5">{points.length}</p>
            </div>
            <div className="bg-navy-900/90 p-4 rounded-2xl border border-navy-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase">
                {lang === 'hindi' ? 'संपर्क संदेश' : 'Contact Messages'}
              </p>
              <p className="text-2xl font-black text-eco-400 mt-0.5">
                {contacts.filter(c => c.status === 'new').length} {lang === 'hindi' ? 'नए' : 'New'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Tabs Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('impact')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'impact' ? 'bg-navy-950 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-eco-400" />
            <span>{lang === 'hindi' ? 'प्रभाव आंकड़े संपादक' : 'Impact Numbers Editor'}</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'requests' ? 'bg-navy-950 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Inbox className="w-4 h-4 text-amber-400" />
            <span>
              {lang === 'hindi' ? 'पार्टनर पंजीकरण आवेदन' : 'Partner Requests'} ({requests.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('partners')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'partners' ? 'bg-navy-950 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Store className="w-4 h-4 text-blue-400" />
            <span>
              {lang === 'hindi' ? 'दुकान पार्टनर' : 'Shop Partners'} ({partners.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('points')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'points' ? 'bg-navy-950 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4 text-teal-400" />
            <span>
              {lang === 'hindi' ? 'कलेक्शन केंद्र' : 'Collection Points'} ({points.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'contact' ? 'bg-navy-950 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span>
              {lang === 'hindi' ? 'संपर्क संदेश' : 'Contact Messages'} ({contacts.length})
            </span>
          </button>
        </div>

        {/* TAB 1: IMPACT NUMBERS EDITOR */}
        {activeTab === 'impact' && (
          <div className="mt-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md max-w-3xl space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-navy-950">
                {lang === 'hindi' ? 'लाइव प्रभाव आंकड़े अपडेट करें' : 'Update Live Impact Statistics'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'hindi' 
                  ? 'ये संख्याएं वेबसाइट के होम पेज और प्रभाव पेज पर सीधे प्रदर्शित होती हैं।' 
                  : 'These numbers are directly displayed on the Home Page and Impact Page across the entire site.'}
              </p>
            </div>

            <form onSubmit={handleSaveImpact} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'कुल एकत्रित बोतलें' : 'Total Bottles Collected'}
                  </label>
                  <input
                    type="number"
                    required
                    value={impact.bottlesCollected}
                    onChange={(e) => setImpact({ ...impact, bottlesCollected: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm font-bold text-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'कुल पार्टनर दुकानें' : 'Total Shops Partnered'}
                  </label>
                  <input
                    type="number"
                    required
                    value={impact.shopsPartnered}
                    onChange={(e) => setImpact({ ...impact, shopsPartnered: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm font-bold text-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'बचाया गया प्लास्टिक कचरा (किग्रा)' : 'Plastic Saved (in kg)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={impact.plasticSavedKg}
                    onChange={(e) => setImpact({ ...impact, plasticSavedKg: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm font-bold text-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'रोका गया कार्बन उत्सर्जन (किग्रा)' : 'CO2 Saved / Reduced (in kg)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={impact.co2SavedKg}
                    onChange={(e) => setImpact({ ...impact, co2SavedKg: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm font-bold text-navy-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {lang === 'hindi' ? 'सहेजने पर तुरंत डेटाबेस में सुरक्षित होता है' : 'Auto-saved to database upon submit'}
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-eco-600 hover:bg-eco-700 text-white font-bold text-sm shadow-md transition flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{lang === 'hindi' ? 'आंकड़े सुरक्षित करें' : 'Save Impact Numbers'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: PARTNER REGISTRATION REQUESTS */}
        {activeTab === 'requests' && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-navy-950">
                  {lang === 'hindi' ? 'आए हुए पार्टनर पंजीकरण आवेदन' : 'Inbound Partner Requests'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'hindi' ? 'वेबसाइट के पार्टनर फॉर्म द्वारा प्राप्त दुकानदारों के आवेदन' : 'Shopkeepers who registered via the Shop Partner page'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="p-4">{lang === 'hindi' ? 'दुकान एवं मालिक' : 'Shop & Owner'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'मोबाइल' : 'Mobile'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'स्थान' : 'Location'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'प्रकार / बोतलें' : 'Type / Volume'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'स्थिति' : 'Status'}</th>
                      <th className="p-4 text-right">{lang === 'hindi' ? 'कार्रवाई' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-slate-400">
                          {lang === 'hindi' ? 'अभी तक कोई नया आवेदन प्राप्त नहीं हुआ।' : 'No partner registration requests received yet.'}
                        </td>
                      </tr>
                    ) : (
                      requests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50 transition">
                          <td className="p-4">
                            <p className="font-bold text-navy-950">{req.shopName}</p>
                            <p className="text-xs text-slate-500">{req.ownerName}</p>
                          </td>
                          <td className="p-4 font-mono font-medium">{req.mobile}</td>
                          <td className="p-4">
                            <p className="font-medium text-slate-800">{req.cityArea}</p>
                            <p className="text-[11px] text-slate-400 truncate max-w-xs">{req.address}</p>
                          </td>
                          <td className="p-4">
                            <span className="block font-medium">{req.shopType}</span>
                            <span className="text-[11px] text-slate-500">{req.bottlesPerDay}</span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              req.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : req.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {req.status === 'approved' ? (lang === 'hindi' ? 'स्वीकृत' : 'Approved') :
                               req.status === 'rejected' ? (lang === 'hindi' ? 'अस्वीकृत' : 'Rejected') :
                               (lang === 'hindi' ? 'लंबित' : 'Pending')}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            {req.status !== 'approved' && (
                              <button
                                onClick={() => handleRequestStatus(req.id, 'approved')}
                                title={lang === 'hindi' ? 'स्वीकार करें एवं पार्टनर बनाएं' : 'Approve & Convert to Active Partner'}
                                className="px-2.5 py-1 bg-eco-600 hover:bg-eco-700 text-white rounded-lg text-xs font-bold"
                              >
                                {lang === 'hindi' ? 'स्वीकार' : 'Approve'}
                              </button>
                            )}
                            {req.status === 'pending' && (
                              <button
                                onClick={() => handleRequestStatus(req.id, 'rejected')}
                                title={lang === 'hindi' ? 'अस्वीकार करें' : 'Reject'}
                                className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold"
                              >
                                {lang === 'hindi' ? 'अस्वीकार' : 'Reject'}
                              </button>
                            )}
                            <button
                              onClick={() => setViewingRequest(req)}
                              className="p-1 text-slate-600 hover:text-navy-950"
                              title={lang === 'hindi' ? 'विवरण देखें' : 'View Details'}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRequest(req.id)}
                              className="p-1 text-red-500 hover:text-red-700"
                              title={lang === 'hindi' ? 'हटाएं' : 'Delete'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SHOP PARTNERS */}
        {activeTab === 'partners' && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-navy-950">
                  {lang === 'hindi' ? 'सक्रिय दुकान पार्टनर' : 'Active Shop Partners'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'hindi' ? 'हमारे कलेक्शन नेटवर्क से जुड़े दुकानदार' : 'Retailers hosting our PET bottle collection bins'}
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingPartner(null);
                  setPartnerForm({
                    shopName: '',
                    ownerName: '',
                    mobile: '',
                    city: 'Delhi',
                    area: '',
                    shopType: lang === 'hindi' ? 'किराना स्टोर' : 'Grocery Store',
                    bottlesPerDay: 100,
                    address: '',
                    status: 'active'
                  });
                  setShowAddPartnerModal(true);
                }}
                className="px-4 py-2 bg-eco-600 hover:bg-eco-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'hindi' ? 'नया पार्टनर जोड़ें' : 'Add Partner'}</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="p-4">{lang === 'hindi' ? 'दुकान का नाम' : 'Shop Name'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'मालिक एवं मोबाइल' : 'Owner & Mobile'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'शहर / क्षेत्र' : 'City / Area'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'प्रकार' : 'Type'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'बोतलें/दिन' : 'Bottles/Day'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'स्थिति' : 'Status'}</th>
                      <th className="p-4 text-right">{lang === 'hindi' ? 'कार्रवाई' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {partners.map((partner) => (
                      <tr key={partner.id} className="hover:bg-slate-50 transition">
                        <td className="p-4">
                          <p className="font-bold text-navy-950">{partner.shopName}</p>
                          <p className="text-[11px] text-slate-400 truncate max-w-xs">{partner.address}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium">{partner.ownerName}</p>
                          <p className="text-xs text-slate-500">{partner.mobile}</p>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-slate-800">{partner.city}</span>
                          <span className="text-xs text-slate-500 block">{partner.area}</span>
                        </td>
                        <td className="p-4 font-medium">{partner.shopType}</td>
                        <td className="p-4 font-bold text-eco-700">{partner.bottlesPerDay}</td>
                        <td className="p-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            partner.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {partner.status === 'active' ? (lang === 'hindi' ? 'सक्रिय' : 'Active') : (lang === 'hindi' ? 'निष्क्रिय' : 'Inactive')}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingPartner(partner);
                              setPartnerForm(partner);
                              setShowAddPartnerModal(true);
                            }}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title={lang === 'hindi' ? 'संशोधन करें' : 'Edit Partner'}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePartner(partner.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title={lang === 'hindi' ? 'हटाएं' : 'Delete Partner'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COLLECTION POINTS */}
        {activeTab === 'points' && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-navy-950">
                  {lang === 'hindi' ? 'कलेक्शन केंद्र (कलेक्शन बिन)' : 'Collection Points (Bins)'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'hindi' ? 'विभिन्न शहरों में स्थापित सार्वजनिक ड्रॉप-ऑफ केंद्र' : 'Public drop-off locations mapped across cities'}
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingPoint(null);
                  setPointForm({
                    name: '',
                    city: 'Delhi',
                    area: '',
                    address: '',
                    lat: 28.6139,
                    lng: 77.2090,
                    operatingHours: '08:00 AM - 10:00 PM',
                    binType: 'Standard 200-PET Bin',
                    status: 'active'
                  });
                  setShowAddPointModal(true);
                }}
                className="px-4 py-2 bg-eco-600 hover:bg-eco-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'hindi' ? 'नया केंद्र जोड़ें' : 'Add Collection Point'}</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="p-4">{lang === 'hindi' ? 'केंद्र का नाम' : 'Point Name'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'शहर / क्षेत्र' : 'City / Area'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'निर्देशांक (अक्षांश, देशांतर)' : 'Coordinates (Lat, Lng)'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'समय' : 'Hours'}</th>
                      <th className="p-4">{lang === 'hindi' ? 'बिन का प्रकार' : 'Bin Type'}</th>
                      <th className="p-4 text-right">{lang === 'hindi' ? 'कार्रवाई' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {points.map((pt) => (
                      <tr key={pt.id} className="hover:bg-slate-50 transition">
                        <td className="p-4">
                          <p className="font-bold text-navy-950">{pt.name}</p>
                          <p className="text-[11px] text-slate-400 truncate max-w-xs">{pt.address}</p>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-slate-800">{pt.city}</span>
                          <span className="text-xs text-slate-500 block">{pt.area}</span>
                        </td>
                        <td className="p-4 font-mono text-xs text-slate-600">
                          {pt.lat?.toFixed(4)}, {pt.lng?.toFixed(4)}
                        </td>
                        <td className="p-4 text-xs">{pt.operatingHours}</td>
                        <td className="p-4 text-xs text-eco-700 font-medium">{pt.binType}</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingPoint(pt);
                              setPointForm(pt);
                              setShowAddPointModal(true);
                            }}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title={lang === 'hindi' ? 'संशोधन करें' : 'Edit Point'}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePoint(pt.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title={lang === 'hindi' ? 'हटाएं' : 'Delete Point'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CONTACT SUBMISSIONS */}
        {activeTab === 'contact' && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-navy-950">
                  {lang === 'hindi' ? 'आए हुए संपर्क संदेश' : 'Inbound Contact Messages'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'hindi' ? 'वेबसाइट के संपर्क फॉर्म द्वारा भेजे गए संदेश' : 'Messages sent via website contact forms'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {contacts.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-slate-400">
                  {lang === 'hindi' ? 'अभी तक कोई संदेश प्राप्त नहीं हुआ।' : 'No contact messages received yet.'}
                </div>
              ) : (
                contacts.map((cnt) => (
                  <div key={cnt.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-navy-950 text-base">{cnt.name}</span>
                        <span className="font-mono text-xs text-slate-600">{cnt.mobile}</span>
                        {cnt.email && <span className="text-xs text-blue-600">{cnt.email}</span>}
                        {cnt.city && <span className="text-xs bg-slate-100 px-2 py-0.5 rounded font-medium">{cnt.city}</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={cnt.status}
                          onChange={(e) => handleContactStatus(cnt.id, e.target.value)}
                          className="text-xs font-bold border border-slate-300 rounded-lg px-2 py-1 bg-white"
                        >
                          <option value="new">{lang === 'hindi' ? 'नया' : 'New'}</option>
                          <option value="contacted">{lang === 'hindi' ? 'संपर्क किया' : 'Contacted'}</option>
                          <option value="resolved">{lang === 'hindi' ? 'हल किया गया' : 'Resolved'}</option>
                        </select>
                        <button
                          onClick={() => handleDeleteContact(cnt.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title={lang === 'hindi' ? 'हटाएं' : 'Delete message'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      "{cnt.message}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>
                        {lang === 'hindi' ? 'प्राप्त हुआ:' : 'Received:'} {new Date(cnt.createdAt).toLocaleString(lang === 'hindi' ? 'hi-IN' : 'en-US')}
                      </span>
                      <a
                        href={`https://wa.me/${cnt.mobile.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 font-bold hover:underline"
                      >
                        {lang === 'hindi' ? 'व्हाट्सएप पर उत्तर दें →' : 'Reply on WhatsApp →'}
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </section>

      {/* MODAL: ADD / EDIT PARTNER */}
      {showAddPartnerModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-bold text-navy-950">
                {editingPartner 
                  ? (lang === 'hindi' ? 'दुकान पार्टनर संपादित करें' : 'Edit Shop Partner') 
                  : (lang === 'hindi' ? 'नया दुकान पार्टनर जोड़ें' : 'Add New Shop Partner')}
              </h3>
              <button
                onClick={() => setShowAddPartnerModal(false)}
                className="p-1 text-slate-400 hover:text-navy-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePartner} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {lang === 'hindi' ? 'दुकान का नाम *' : 'Shop Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={partnerForm.shopName}
                  onChange={(e) => setPartnerForm({ ...partnerForm, shopName: e.target.value })}
                  placeholder={lang === 'hindi' ? 'उदाहरण: वर्मा किराना स्टोर' : 'e.g. Verma Grocery Store'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'मालिक का नाम *' : 'Owner Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerForm.ownerName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, ownerName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'मोबाइल नंबर *' : 'Mobile *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={partnerForm.mobile}
                    onChange={(e) => setPartnerForm({ ...partnerForm, mobile: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'शहर *' : 'City *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerForm.city}
                    onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'क्षेत्र *' : 'Area *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerForm.area}
                    onChange={(e) => setPartnerForm({ ...partnerForm, area: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'दुकान का प्रकार' : 'Shop Type'}
                  </label>
                  <input
                    type="text"
                    value={partnerForm.shopType}
                    onChange={(e) => setPartnerForm({ ...partnerForm, shopType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'बोतलें / दिन' : 'Bottles / Day'}
                  </label>
                  <input
                    type="number"
                    value={partnerForm.bottlesPerDay}
                    onChange={(e) => setPartnerForm({ ...partnerForm, bottlesPerDay: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {lang === 'hindi' ? 'पूरा पता' : 'Address'}
                </label>
                <textarea
                  rows="2"
                  value={partnerForm.address}
                  onChange={(e) => setPartnerForm({ ...partnerForm, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPartnerModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600"
                >
                  {lang === 'hindi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-eco-600 hover:bg-eco-700 text-white text-xs font-bold"
                >
                  {editingPartner 
                    ? (lang === 'hindi' ? 'अपडेट करें' : 'Update Partner') 
                    : (lang === 'hindi' ? 'सुरक्षित करें' : 'Save Partner')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT COLLECTION POINT */}
      {showAddPointModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-bold text-navy-950">
                {editingPoint 
                  ? (lang === 'hindi' ? 'कलेक्शन केंद्र संपादित करें' : 'Edit Collection Point') 
                  : (lang === 'hindi' ? 'नया कलेक्शन केंद्र जोड़ें' : 'Add New Collection Point')}
              </h3>
              <button
                onClick={() => setShowAddPointModal(false)}
                className="p-1 text-slate-400 hover:text-navy-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePoint} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {lang === 'hindi' ? 'केंद्र का नाम *' : 'Point Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={pointForm.name}
                  onChange={(e) => setPointForm({ ...pointForm, name: e.target.value })}
                  placeholder={lang === 'hindi' ? 'उदाहरण: कनॉट प्लेस मेट्रो गेट 2 बिन' : 'e.g. Connaught Place Metro Exit Bin'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'शहर *' : 'City *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={pointForm.city}
                    onChange={(e) => setPointForm({ ...pointForm, city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'क्षेत्र *' : 'Area *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={pointForm.area}
                    onChange={(e) => setPointForm({ ...pointForm, area: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {lang === 'hindi' ? 'पूरा पता *' : 'Address *'}
                </label>
                <input
                  type="text"
                  required
                  value={pointForm.address}
                  onChange={(e) => setPointForm({ ...pointForm, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'अक्षांश (Latitude)' : 'Latitude (Lat)'}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={pointForm.lat}
                    onChange={(e) => setPointForm({ ...pointForm, lat: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'देशांतर (Longitude)' : 'Longitude (Lng)'}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={pointForm.lng}
                    onChange={(e) => setPointForm({ ...pointForm, lng: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'खुलने का समय' : 'Operating Hours'}
                  </label>
                  <input
                    type="text"
                    value={pointForm.operatingHours}
                    onChange={(e) => setPointForm({ ...pointForm, operatingHours: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {lang === 'hindi' ? 'बिन का प्रकार' : 'Bin Type'}
                  </label>
                  <input
                    type="text"
                    value={pointForm.binType}
                    onChange={(e) => setPointForm({ ...pointForm, binType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPointModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600"
                >
                  {lang === 'hindi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-eco-600 hover:bg-eco-700 text-white text-xs font-bold"
                >
                  {editingPoint 
                    ? (lang === 'hindi' ? 'अपडेट करें' : 'Update Point') 
                    : (lang === 'hindi' ? 'सुरक्षित करें' : 'Save Point')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW REQUEST DETAILS */}
      {viewingRequest && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-bold text-navy-950">
                {lang === 'hindi' ? 'पार्टनर आवेदन विवरण' : 'Partner Request Details'}
              </h3>
              <button
                onClick={() => setViewingRequest(null)}
                className="p-1 text-slate-400 hover:text-navy-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs uppercase font-bold text-slate-400">
                  {lang === 'hindi' ? 'दुकान का नाम' : 'Shop Name'}
                </p>
                <p className="font-extrabold text-navy-950">{viewingRequest.shopName}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">
                    {lang === 'hindi' ? 'मालिक का नाम' : 'Owner Name'}
                  </p>
                  <p className="font-medium text-slate-800">{viewingRequest.ownerName}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">
                    {lang === 'hindi' ? 'मोबाइल नंबर' : 'Mobile'}
                  </p>
                  <p className="font-mono font-medium text-slate-800">{viewingRequest.mobile}</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-slate-400">
                  {lang === 'hindi' ? 'शहर / क्षेत्र' : 'City / Area'}
                </p>
                <p className="text-slate-800">{viewingRequest.cityArea}</p>
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-slate-400">
                  {lang === 'hindi' ? 'पूरा पता' : 'Address'}
                </p>
                <p className="text-slate-800 text-xs">{viewingRequest.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">
                    {lang === 'hindi' ? 'दुकान का प्रकार' : 'Shop Category'}
                  </p>
                  <p className="text-slate-800">{viewingRequest.shopType}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">
                    {lang === 'hindi' ? 'प्रतिदिन बोतलें' : 'Est. Bottles / Day'}
                  </p>
                  <p className="text-eco-700 font-bold">{viewingRequest.bottlesPerDay}</p>
                </div>
              </div>
              {viewingRequest.message && (
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">
                    {lang === 'hindi' ? 'दुकानदार का संदेश' : 'Message from Shopkeeper'}
                  </p>
                  <p className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                    "{viewingRequest.message}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <a
                href={`https://wa.me/${viewingRequest.mobile.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                {lang === 'hindi' ? 'व्हाट्सएप पर बात करें →' : 'Chat on WhatsApp →'}
              </a>
              <button
                onClick={() => setViewingRequest(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                {lang === 'hindi' ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
