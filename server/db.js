const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_FILE = path.join(__dirname, 'data.json');

const INITIAL_DATA = {
  impact: {
    bottlesCollected: 148520,
    shopsPartnered: 134,
    plasticSavedKg: 3713,
    co2SavedKg: 5569,
    updatedAt: new Date().toISOString()
  },
  partners: [
    {
      id: "partner-1",
      shopName: "Sharma Kirana & General Store",
      ownerName: "Ramesh Sharma",
      mobile: "+91 98112 34567",
      city: "Delhi",
      area: "Connaught Place",
      shopType: "Kirana Store",
      bottlesPerDay: 180,
      address: "Shop 14, Outer Circle, Near Block C, Connaught Place, New Delhi",
      status: "active",
      joinedDate: "2026-01-15T10:00:00.000Z"
    },
    {
      id: "partner-2",
      shopName: "Chai Point & Snacks Corner",
      ownerName: "Sunil Verma",
      mobile: "+91 98765 43210",
      city: "Delhi",
      area: "Karol Bagh",
      shopType: "Tea & Snacks Stall",
      bottlesPerDay: 240,
      address: "Opposite Metro Gate 3, Arya Samaj Road, Karol Bagh, Delhi",
      status: "active",
      joinedDate: "2026-02-01T11:30:00.000Z"
    },
    {
      id: "partner-3",
      shopName: "Campus Canteen Fresh Bites",
      ownerName: "Pooja Deshmukh",
      mobile: "+91 99201 12345",
      city: "Mumbai",
      area: "Bandra West",
      shopType: "College Canteen",
      bottlesPerDay: 420,
      address: "Hill Road, Near National College, Bandra West, Mumbai",
      status: "active",
      joinedDate: "2026-02-18T09:15:00.000Z"
    },
    {
      id: "partner-4",
      shopName: "Green Oasis Juice & Shakes",
      ownerName: "Imran Khan",
      mobile: "+91 97410 98765",
      city: "Bengaluru",
      area: "Indiranagar",
      shopType: "Juice Shop",
      bottlesPerDay: 310,
      address: "100 Feet Road, 12th Main Junction, Indiranagar, Bengaluru",
      status: "active",
      joinedDate: "2026-03-05T14:20:00.000Z"
    },
    {
      id: "partner-5",
      shopName: "Gupta Pan & Cold Drink Center",
      ownerName: "Alok Gupta",
      mobile: "+91 94501 55667",
      city: "Noida",
      area: "Sector 18",
      shopType: "Pan & Beverage Kiosk",
      bottlesPerDay: 190,
      address: "Atta Market, Sector 18, Noida, Uttar Pradesh",
      status: "active",
      joinedDate: "2026-03-12T16:00:00.000Z"
    }
  ],
  requests: [
    {
      id: "req-1",
      shopName: "Aggarwal Sweets & Dairy",
      ownerName: "Vikas Aggarwal",
      mobile: "+91 98101 22334",
      cityArea: "Gurgaon - Cyber City",
      shopType: "Sweets & Dairy",
      bottlesPerDay: "150-200",
      address: "Shop 7, DLF Phase 2 Market, Gurgaon",
      message: "Daily customer footfall is huge, many water bottles discarded. Want free bin immediately.",
      status: "pending",
      createdAt: "2026-10-15T09:30:00.000Z"
    },
    {
      id: "req-2",
      shopName: "Quick Bites Fast Food",
      ownerName: "Manish Rawat",
      mobile: "+91 98991 77665",
      cityArea: "Delhi - Laxmi Nagar",
      shopType: "Fast Food Joint",
      bottlesPerDay: "300+",
      address: "Main Vikas Marg, Near Metro Pillar 32, Laxmi Nagar, Delhi",
      message: "We generate 300+ cold drink bottles daily. Please guide pickup schedule.",
      status: "pending",
      createdAt: "2026-10-16T11:45:00.000Z"
    }
  ],
  collectionPoints: [
    {
      id: "cp-1",
      name: "Sharma Kirana Bin Point",
      city: "Delhi",
      area: "Connaught Place",
      address: "Shop 14, Outer Circle, Near Block C, Connaught Place",
      lat: 28.6315,
      lng: 77.2167,
      operatingHours: "08:00 AM - 10:00 PM",
      binType: "High-Capacity 250 PET Bin",
      status: "active"
    },
    {
      id: "cp-2",
      name: "Karol Bagh Metro Exit Bin",
      city: "Delhi",
      area: "Karol Bagh",
      address: "Opposite Metro Gate 3, Arya Samaj Road, Karol Bagh",
      lat: 28.6448,
      lng: 77.1906,
      operatingHours: "07:00 AM - 11:00 PM",
      binType: "Dual Sorting PET Bin",
      status: "active"
    },
    {
      id: "cp-3",
      name: "Bandra National College Corner Bin",
      city: "Mumbai",
      area: "Bandra West",
      address: "Hill Road, Near National College, Bandra West",
      lat: 19.0596,
      lng: 72.8295,
      operatingHours: "08:30 AM - 09:30 PM",
      binType: "Eco-Mesh PET Collection Point",
      status: "active"
    },
    {
      id: "cp-4",
      name: "Indiranagar 100ft Collection Hub",
      city: "Bengaluru",
      area: "Indiranagar",
      address: "100 Feet Road, 12th Main Junction, Indiranagar",
      lat: 12.9784,
      lng: 77.6408,
      operatingHours: "09:00 AM - 10:30 PM",
      binType: "Smart Sensor PET Bin",
      status: "active"
    },
    {
      id: "cp-5",
      name: "Sector 18 Atta Market Bin",
      city: "Noida",
      area: "Sector 18",
      address: "Atta Market, Near Metro Station, Sector 18, Noida",
      lat: 28.5708,
      lng: 77.3261,
      operatingHours: "08:00 AM - 10:00 PM",
      binType: "High-Capacity 250 PET Bin",
      status: "active"
    }
  ],
  contactSubmissions: [
    {
      id: "cnt-1",
      name: "Rohit Malhotra",
      mobile: "+91 98111 00011",
      email: "rohit.m@example.com",
      city: "Delhi",
      message: "We run a college environmental club with 500 members. Can we install 3 bins on our university campus?",
      status: "new",
      createdAt: "2026-10-14T14:10:00.000Z"
    },
    {
      id: "cnt-2",
      name: "Ananya Sen",
      mobile: "+91 97112 33445",
      email: "ananya@ecopack.org",
      city: "Mumbai",
      message: "We are an authorized PET recycling facility. Interested in bulk supply partnerships.",
      status: "contacted",
      createdAt: "2026-10-15T16:40:00.000Z"
    }
  ]
};

// Initialize file if not existing
function loadData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
      return JSON.parse(JSON.stringify(INITIAL_DATA));
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database file, resetting to initial data:", err);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Error writing database file:", err);
    return false;
  }
}

const db = {
  // Impact metrics
  getImpact() {
    const data = loadData();
    return data.impact;
  },
  updateImpact(updates) {
    const data = loadData();
    data.impact = {
      ...data.impact,
      ...updates,
      bottlesCollected: Number(updates.bottlesCollected ?? data.impact.bottlesCollected),
      shopsPartnered: Number(updates.shopsPartnered ?? data.impact.shopsPartnered),
      plasticSavedKg: Number(updates.plasticSavedKg ?? data.impact.plasticSavedKg),
      co2SavedKg: Number(updates.co2SavedKg ?? data.impact.co2SavedKg),
      updatedAt: new Date().toISOString()
    };
    saveData(data);
    return data.impact;
  },

  // Shop Partners
  getPartners() {
    const data = loadData();
    return data.partners || [];
  },
  addPartner(partnerData) {
    const data = loadData();
    const newPartner = {
      id: `partner-${crypto.randomUUID().slice(0, 8)}`,
      shopName: partnerData.shopName || '',
      ownerName: partnerData.ownerName || '',
      mobile: partnerData.mobile || '',
      city: partnerData.city || 'Delhi',
      area: partnerData.area || '',
      shopType: partnerData.shopType || 'Kirana Store',
      bottlesPerDay: Number(partnerData.bottlesPerDay || 0),
      address: partnerData.address || '',
      status: partnerData.status || 'active',
      joinedDate: new Date().toISOString()
    };
    data.partners.unshift(newPartner);
    // increment shops partnered counter automatically
    data.impact.shopsPartnered = (data.partners.filter(p => p.status === 'active')).length;
    data.impact.updatedAt = new Date().toISOString();
    saveData(data);
    return newPartner;
  },
  updatePartner(id, updates) {
    const data = loadData();
    const idx = data.partners.findIndex(p => p.id === id);
    if (idx === -1) return null;
    data.partners[idx] = { ...data.partners[idx], ...updates };
    data.impact.shopsPartnered = (data.partners.filter(p => p.status === 'active')).length;
    saveData(data);
    return data.partners[idx];
  },
  deletePartner(id) {
    const data = loadData();
    const initialLen = data.partners.length;
    data.partners = data.partners.filter(p => p.id !== id);
    if (data.partners.length !== initialLen) {
      data.impact.shopsPartnered = (data.partners.filter(p => p.status === 'active')).length;
      saveData(data);
      return true;
    }
    return false;
  },

  // Partner Requests (Inbound from website form)
  getRequests() {
    const data = loadData();
    return data.requests || [];
  },
  addRequest(reqData) {
    const data = loadData();
    const newReq = {
      id: `req-${crypto.randomUUID().slice(0, 8)}`,
      shopName: reqData.shopName || '',
      ownerName: reqData.ownerName || '',
      mobile: reqData.mobile || '',
      cityArea: reqData.cityArea || '',
      shopType: reqData.shopType || 'Other',
      bottlesPerDay: reqData.bottlesPerDay || '100',
      address: reqData.address || '',
      message: reqData.message || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    data.requests.unshift(newReq);
    saveData(data);
    return newReq;
  },
  updateRequestStatus(id, status) {
    const data = loadData();
    const req = data.requests.find(r => r.id === id);
    if (!req) return null;
    req.status = status;

    // If approved, optionally auto-create as active partner
    if (status === 'approved') {
      const parts = (req.cityArea || '').split('-');
      const city = parts[0]?.trim() || 'Delhi';
      const area = parts[1]?.trim() || req.cityArea || '';
      
      const newPartner = {
        id: `partner-${crypto.randomUUID().slice(0, 8)}`,
        shopName: req.shopName,
        ownerName: req.ownerName,
        mobile: req.mobile,
        city: city,
        area: area,
        shopType: req.shopType,
        bottlesPerDay: parseInt(req.bottlesPerDay) || 100,
        address: req.address,
        status: 'active',
        joinedDate: new Date().toISOString()
      };
      data.partners.unshift(newPartner);
      data.impact.shopsPartnered = (data.partners.filter(p => p.status === 'active')).length;
    }

    saveData(data);
    return req;
  },
  deleteRequest(id) {
    const data = loadData();
    const initialLen = data.requests.length;
    data.requests = data.requests.filter(r => r.id !== id);
    if (data.requests.length !== initialLen) {
      saveData(data);
      return true;
    }
    return false;
  },

  // Collection Points
  getCollectionPoints() {
    const data = loadData();
    return data.collectionPoints || [];
  },
  addCollectionPoint(pointData) {
    const data = loadData();
    const newPoint = {
      id: `cp-${crypto.randomUUID().slice(0, 8)}`,
      name: pointData.name || 'New Collection Point',
      city: pointData.city || 'Delhi',
      area: pointData.area || '',
      address: pointData.address || '',
      lat: Number(pointData.lat) || 28.6139,
      lng: Number(pointData.lng) || 77.2090,
      operatingHours: pointData.operatingHours || '08:00 AM - 10:00 PM',
      binType: pointData.binType || 'Standard 200-PET Bin',
      status: pointData.status || 'active'
    };
    data.collectionPoints.unshift(newPoint);
    saveData(data);
    return newPoint;
  },
  updateCollectionPoint(id, updates) {
    const data = loadData();
    const idx = data.collectionPoints.findIndex(cp => cp.id === id);
    if (idx === -1) return null;
    data.collectionPoints[idx] = {
      ...data.collectionPoints[idx],
      ...updates,
      lat: updates.lat !== undefined ? Number(updates.lat) : data.collectionPoints[idx].lat,
      lng: updates.lng !== undefined ? Number(updates.lng) : data.collectionPoints[idx].lng
    };
    saveData(data);
    return data.collectionPoints[idx];
  },
  deleteCollectionPoint(id) {
    const data = loadData();
    const initialLen = data.collectionPoints.length;
    data.collectionPoints = data.collectionPoints.filter(cp => cp.id !== id);
    if (data.collectionPoints.length !== initialLen) {
      saveData(data);
      return true;
    }
    return false;
  },

  // Contact Submissions
  getContactSubmissions() {
    const data = loadData();
    return data.contactSubmissions || [];
  },
  addContactSubmission(cntData) {
    const data = loadData();
    const newSubmission = {
      id: `cnt-${crypto.randomUUID().slice(0, 8)}`,
      name: cntData.name || '',
      mobile: cntData.mobile || '',
      email: cntData.email || '',
      city: cntData.city || '',
      message: cntData.message || '',
      status: 'new',
      createdAt: new Date().toISOString()
    };
    data.contactSubmissions.unshift(newSubmission);
    saveData(data);
    return newSubmission;
  },
  updateContactStatus(id, status) {
    const data = loadData();
    const item = data.contactSubmissions.find(c => c.id === id);
    if (!item) return null;
    item.status = status;
    saveData(data);
    return item;
  },
  deleteContactSubmission(id) {
    const data = loadData();
    const initialLen = data.contactSubmissions.length;
    data.contactSubmissions = data.contactSubmissions.filter(c => c.id !== id);
    if (data.contactSubmissions.length !== initialLen) {
      saveData(data);
      return true;
    }
    return false;
  }
};

module.exports = db;
