import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Search, 
  Clock, 
  List, 
  Map as MapIcon, 
  Navigation
} from 'lucide-react';

// Custom Leaflet icon for recycling bin markers
const recyclingPinIcon = new L.DivIcon({
  className: 'custom-pin',
  html: `
    <div style="
      background-color: #16a34a;
      width: 36px;
      height: 36px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid #ffffff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    ">
      <div style="transform: rotate(45deg); color: white; font-size: 16px; font-weight: bold;">
        ♻️
      </div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36]
});

// Component to recenter map dynamically when selected point changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom || 13, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

export default function CollectionPointsPage() {
  const { t, lang } = useLanguage();
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('both'); // 'both' | 'map' | 'list'
  const [activePoint, setActivePoint] = useState(null);

  // Fetch collection points from API
  useEffect(() => {
    fetch('/api/collection-points')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setPoints(data.data);
          if (data.data.length > 0) {
            setActivePoint(data.data[0]);
          }
        }
      })
      .catch(err => console.error('Error fetching collection points:', err))
      .finally(() => setLoading(false));
  }, []);

  // Unique cities & areas for filter dropdowns
  const availableCities = useMemo(() => {
    const set = new Set(points.map(p => p.city).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [points]);

  const availableAreas = useMemo(() => {
    let filtered = points;
    if (selectedCity !== 'All') {
      filtered = points.filter(p => p.city.toLowerCase() === selectedCity.toLowerCase());
    }
    const set = new Set(filtered.map(p => p.area).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [points, selectedCity]);

  // Filtered collection points
  const filteredPoints = useMemo(() => {
    return points.filter(p => {
      const matchCity = selectedCity === 'All' || p.city.toLowerCase() === selectedCity.toLowerCase();
      const matchArea = selectedArea === 'All' || p.area.toLowerCase() === selectedArea.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || (
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q)
      );
      return matchCity && matchArea && matchSearch;
    });
  }, [points, selectedCity, selectedArea, searchQuery]);

  // Map center coordinates
  const mapCenter = useMemo(() => {
    if (activePoint && activePoint.lat && activePoint.lng) {
      return [activePoint.lat, activePoint.lng];
    }
    if (filteredPoints.length > 0 && filteredPoints[0].lat) {
      return [filteredPoints[0].lat, filteredPoints[0].lng];
    }
    return [28.6139, 77.2090]; // Delhi center fallback
  }, [activePoint, filteredPoints]);

  return (
    <div className="space-y-10 pb-20">
      
      {/* 1. HEADER */}
      <section className="bg-gradient-to-b from-eco-50/80 via-white to-slate-50 pt-16 pb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-eco-100 text-eco-800 inline-block">
            {t.collectionPoints.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            {t.collectionPoints.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {t.collectionPoints.subtitle}
          </p>
        </div>
      </section>

      {/* 2. SEARCH & FILTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-md space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
            
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.collectionPoints.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
              />
            </div>

            {/* City Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSelectedArea('All');
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm bg-white font-medium text-slate-700"
              >
                {availableCities.map(city => (
                  <option key={city} value={city}>
                    {city === 'All' ? t.collectionPoints.allCities : city}
                  </option>
                ))}
              </select>
            </div>

            {/* Area Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm bg-white font-medium text-slate-700"
              >
                {availableAreas.map(area => (
                  <option key={area} value={area}>
                    {area === 'All' ? t.collectionPoints.allAreas : area}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="lg:col-span-2 flex items-center justify-end gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('map')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                  viewMode === 'map' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600 hover:text-navy-950'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-eco-600" />
                <span>{t.collectionPoints.viewMap}</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                  viewMode === 'list' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600 hover:text-navy-950'
                }`}
              >
                <List className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.collectionPoints.viewList}</span>
              </button>
              <button
                onClick={() => setViewMode('both')}
                className={`hidden lg:flex py-1.5 px-3 rounded-lg text-xs font-bold transition items-center justify-center gap-1 ${
                  viewMode === 'both' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600 hover:text-navy-950'
                }`}
              >
                <span>{t.collectionPoints.viewBoth}</span>
              </button>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              {t.collectionPoints.showingPrefix} <strong className="text-navy-900">{filteredPoints.length}</strong>
            </span>
            {(selectedCity !== 'All' || selectedArea !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCity('All');
                  setSelectedArea('All');
                  setSearchQuery('');
                }}
                className="text-eco-700 font-bold hover:underline"
              >
                {t.collectionPoints.clearFilters}
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE MAP & LIST VIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200">
            <div className="w-10 h-10 border-4 border-eco-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 text-sm font-semibold">
              {lang === 'hindi' ? 'कलेक्शन केंद्र लोड हो रहे हैं...' : 'Loading Collection Points...'}
            </p>
          </div>
        ) : filteredPoints.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <MapPin className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold text-navy-950">
              {lang === 'hindi' ? 'कोई कलेक्शन केंद्र नहीं मिला' : 'No Collection Points Found'}
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              {t.collectionPoints.noPoints}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* List Column */}
            {(viewMode === 'both' || viewMode === 'list') && (
              <div className={`space-y-4 max-h-[620px] overflow-y-auto pr-1 ${
                viewMode === 'list' ? 'lg:col-span-12' : 'lg:col-span-5'
              }`}>
                {filteredPoints.map((point) => {
                  const isSelected = activePoint?.id === point.id;
                  const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`;
                  
                  return (
                    <div
                      key={point.id}
                      onClick={() => setActivePoint(point)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all text-left ${
                        isSelected
                          ? 'bg-eco-50/70 border-eco-500 shadow-md ring-1 ring-eco-500'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-navy-950 text-base">
                              {point.name}
                            </h4>
                          </div>
                          <p className="text-xs font-semibold text-eco-700 mt-0.5">
                            {point.area}, {point.city}
                          </p>
                        </div>
                        <span className="shrink-0 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {t.collectionPoints.activeBinBadge}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                        {point.address}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100/90 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{point.operatingHours}</span>
                        </div>

                        <a
                          href={gmapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 font-bold text-eco-700 hover:text-eco-800 hover:underline"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>{t.collectionPoints.getDirections}</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Map Column */}
            {(viewMode === 'both' || viewMode === 'map') && (
              <div className={`rounded-3xl overflow-hidden border border-slate-300 shadow-lg relative min-h-[500px] h-[620px] ${
                viewMode === 'map' ? 'lg:col-span-12' : 'lg:col-span-7'
              }`}>
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  scrollWheelZoom={true}
                  style={{ height: '100%', width: '100%' }}
                >
                  <ChangeView center={mapCenter} zoom={13} />
                  
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {filteredPoints.map((point) => (
                    <Marker
                      key={point.id}
                      position={[point.lat, point.lng]}
                      icon={recyclingPinIcon}
                      eventHandlers={{
                        click: () => setActivePoint(point),
                      }}
                    >
                      <Popup>
                        <div className="p-1 space-y-1.5 text-left font-sans">
                          <h4 className="font-bold text-navy-950 text-sm">{point.name}</h4>
                          <p className="text-xs text-slate-600">{point.address}</p>
                          <div className="text-[11px] text-eco-700 font-semibold">
                            🕒 {point.operatingHours}
                          </div>
                          <div className="pt-2">
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block px-3 py-1 bg-eco-600 text-white rounded text-xs font-bold hover:bg-eco-700"
                            >
                              {t.collectionPoints.getDirections}
                            </a>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            )}

          </div>
        )}
      </section>

    </div>
  );
}
