# 🍾 Bottle Return - PET Plastic Bottle Recycling Platform

> **“Khali bottle do, plastic waste kam karo”**

A modern, responsive, eco-friendly website and administrative management portal for **Bottle Return**. The startup collects empty PET plastic bottles from shops, colleges, and public places to supply certified recyclers while providing regular extra income to local shopkeepers.

---

## 🌟 Key Features

1. **Bilingual Experience (English & Hindi/Hinglish)**:
   - Header language toggle between **English** and **Hinglish/हिंदी**.
   - Preserves memorable Hindi/Hinglish taglines:
     - *"Khali bottle do, plastic waste kam karo"*
     - *"Shop Partner Bano"*
     - *"Bottle Collection Point Dekho"*
     - *"Contact Karein"*

2. **Eco-Friendly Visual Design**:
   - Modern color system: Recycling Emerald Green (`#16a34a`), Crisp White (`#ffffff`), and Deep Navy/Dark Blue (`#0f172a` / `#1e3a8a`).
   - Mobile-first, fully responsive with animated drawers, interactive calculators, and smooth navigation.

3. **Public Pages**:
   - **Home Page (`/`)**: Hero section, live impact metrics, 4-step quick overview, shopkeeper benefits, problem/solution breakdown, and quick contact form.
   - **How It Works (`/how-it-works`)**: The 4-step process with clean visual icons, PET accepted vs non-accepted bottle guide, and FAQs.
   - **Shop Partner Page (`/shop-partner`)**: Outlines shopkeeper benefits, interactive monthly earnings estimator slider, and a comprehensive **Partner Registration Form**.
   - **Collection Points Page (`/collection-points`)**: Interactive OpenStreetMap (Leaflet) with recycling pin markers, search by shop/landmark, and filtering by City & Locality.
   - **Impact Page (`/impact`)**: Real-time counter of bottles collected, active partner shops, plastic diverted (kg), and CO2 saved (kg), plus environmental equivalencies (trees, electricity, crude oil, garbage trucks).
   - **About Us Page (`/about`)**: Company mission, local micro-entrepreneur empowerment, and a 4-phase expansion roadmap (Collection -> PET Flakes -> Recycled Products -> Consumer Loyalty App).
   - **Contact Page (`/contact`)**: Inbound inquiry form, 1-click direct WhatsApp chat (`wa.me`), phone, email, and dispatch hub location.
   - **WhatsApp Floating Button**: Quick access from any page directly to WhatsApp chat.

4. **Integrated Admin Dashboard (`/admin`)**:
   - Protected with authentication (default: `admin` / `admin123`).
   - **Live Impact Numbers Editor**: Instantly change total bottles collected, shops partnered, plastic saved, and CO2 saved.
   - **Partner Registration Requests**: Review inbound applications from shopkeepers, approve (automatically converts them into active partners), or reject.
   - **Shop Partners Management**: Full CRUD (create, view, edit, delete).
   - **Collection Points Management**: Add new bin locations with geographical coordinates (lat/lng), address, hours, and status.
   - **Contact Submissions Tracker**: View customer messages and change status (`new`, `contacted`, `resolved`).

5. **Robust Database Layer**:
   - Zero-dependency persistent JSON database (`server/data.json`) with pre-seeded data across Delhi, Mumbai, Noida, and Bengaluru.

---

## 🚀 Getting Started

### 1. Quick Start (Single Command)
The backend server serves both the REST API and the compiled frontend production bundle on port `5000`:

```bash
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

---

### 2. Development Mode (Hot Reloading)

If you want live hot-reloading for frontend development:

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```
   *(API runs at http://localhost:5000)*

2. **In a second terminal, start the Vite frontend:**
   ```bash
   cd client
   npm run dev
   ```
   *(Vite UI runs at http://localhost:3000 with automatic `/api` proxying to port 5000)*

---

### 3. Build for Production

```bash
npm run build
```
This compiles optimized production assets into `client/dist/`, which are immediately served by `server/server.js`.

---

## 🔐 Admin Panel Credentials

- **URL**: [http://localhost:5000/admin](http://localhost:5000/admin)
- **Username**: `admin`
- **Password**: `admin123`

*(You can configure custom admin credentials using environment variables `ADMIN_USERNAME` and `ADMIN_PASSWORD`)*

---

## 📁 Project Directory Structure

```
B2B2C/
├── package.json               # Root scripts
├── README.md                  # Documentation
├── server/
│   ├── package.json
│   ├── server.js              # Express REST API & static file server
│   ├── db.js                  # Persistent database manager & transactions
│   ├── data.json              # Persistent database file
│   └── routes/
│       ├── impact.js          # Impact metrics API
│       ├── partners.js        # Shop partners CRUD
│       ├── requests.js        # Inbound partner applications
│       ├── collectionPoints.js# Collection points locator API
│       ├── contact.js         # Contact inquiries API
│       └── auth.js            # Admin authentication API
└── client/
    ├── package.json
    ├── vite.config.js         # Vite & proxy configuration
    ├── tailwind.config.js     # Eco green & navy color tokens
    ├── index.html             # HTML entry with Leaflet styles & SEO meta
    └── src/
        ├── main.jsx           # React DOM root
        ├── App.jsx            # Routing & layout
        ├── index.css          # Tailwind CSS styles
        ├── translations.js    # Bilingual Hinglish / English dictionary
        ├── context/
        │   ├── LanguageContext.jsx
        │   └── AdminAuthContext.jsx
        ├── components/
        │   ├── Navbar.jsx     # Navigation, logo, language switcher
        │   ├── Footer.jsx     # Brand footer, links, contact
        │   └── WhatsAppFloating.jsx # Fixed WhatsApp quick button
        └── pages/
            ├── HomePage.jsx
            ├── HowItWorksPage.jsx
            ├── ShopPartnerPage.jsx
            ├── CollectionPointsPage.jsx
            ├── ImpactPage.jsx
            ├── AboutUsPage.jsx
            ├── ContactPage.jsx
            └── AdminPage.jsx
```
