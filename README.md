# 💡 VOLTA & CO. — Artisanal Vintage Bulbs & Edison Filament Lighting

A visually stunning, high-performance web experience for handcrafted vintage Edison bulbs, oversized amber globes, and antique steampunk fixtures.

Built with **React 19**, **Tailwind CSS v4**, **Framer Motion**, **Lucide Icons**, **Web Audio API (Synthesized Acoustics)**, **Canvas Confetti**, and an **Express / MongoDB** backend.

---

## ✨ Key Features & Interactive Innovations

### 1. 🎛️ Interactive Filament Simulation & Dynamic Ambient Glow
- **Physics-Inspired Vector Filament Engine**: Dynamic rendering of authentic Edison filament geometries including:
  - *1893 Squirrel Cage*
  - *Titan Double Helix*
  - *Quad Arch Loops*
  - *Marconi Hairpins*
  - *Artisan Heart Contours*
- **Interactive Brass Pull-Chain & Rotary Dimmer**: Pull the animated beaded brass pull-chain or rotate the vintage copper dimmer to dynamically alter the bulb's warmth, luminous flux (lumens), and Kelvin color temperature from 1800K candlelight to 2700K golden amber.
- **Synthesized Tactile Audio (Web Audio API)**: Zero-dependency authentic mechanical toggle snaps, rotary ratchet clicks, and checkout bell chimes synthesized directly in the browser.

### 2. 🔬 The Bulb Studio (Interactive Customizer)
- Configure custom vintage bulbs in real-time:
  - **Glass Silhouettes**: ST64 Teardrop, G125 Giant Globe, T45 Tubular, Art Deco Diamond, Radio Valve Tube, CA35 Bent Candle Flame.
  - **Filament Geometries**: Squirrel Cage, Spiral Helix, Quad Loop, Heart, Hairpin.
  - **Glass Tints**: Amber Gold, Smoked Titanium Mirror, Crystal Clear, Antique Mottled Mercury.
  - **Hardware Metallurgy**: Spun Brass, Aged Copper, Matte Industrial Steel.
- Live price updates, dynamic blueprint preview, and instant ordering.

### 3. 🍸 The Ambiance Lab (Interactive Room Explorer)
- Test how vintage Edison bulbs illuminate real interior spaces:
  - *1920s Velvet Speakeasy Bar*
  - *Artisan Coffee Roastery*
  - *Steampunk Library Study*
  - *Modern Industrial Loft Dining*
- Real-time dimming and Kelvin spectrum adjustments (1800K, 2200K, 2700K).

### 4. 🛍️ E-Commerce & Heritage Catalog
- **Interactive Product Cards**: Toggle bulb ignition on/off per card with live filament glow.
- **Filter & Search**: Filter by categories (Edison Classics, Oversized Globes, Spiral & Smoked, Vintage LEDs, Steampunk Fixtures) and sort by price, rating, or iconic status.
- **360° Quick View Modal**: Inspect technical matrix (CRI 98+, 25,000h lifespan, E26/E27 universal base).
- **Artisan Cart Drawer**: Live coupon code system (`VINTAGE1893` for 15% off), free shipping progress bar, complimentary brass cleaning cloth perk.
- **Secure Simulated Checkout**: Generates unique `VLT-xxxxxx` order records stored in the database with celebratory confetti effects.

### 5. 🛠️ The Craft & Science (Anatomy & Comparison)
- Interactive numbered hotspots exploring mouth-blown soda-lime glass, micro-filament sapphire substrates, noble argon hermetic seals, and unlacquered spun brass bases.
- Comprehensive engineering comparison table against power-hungry 1890s incandescents and harsh plastic LEDs.

### 6. ⭐ Verified Patron Reviews & Newsletter Gazette
- Live customer testimonial gallery with helpful votes.
- Interactive "Write an Artisan Review" modal with star rating and room ambiance tagging.
- "The Edison Gazette" newsletter subscription.

---

## 🏗️ Architecture & Tech Stack

```
Vintage/
├── client/                      # Vite + React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── InteractiveFilamentBulb.jsx  # Vector SVG/Canvas filament engine
│   │   │   ├── Navbar.jsx                   # Master navigation, audio toggle, cart trigger
│   │   │   ├── Hero.jsx                     # Pull-chain & rotary dimmer showcase
│   │   │   ├── BulbStudio.jsx               # Interactive customizer
│   │   │   ├── RoomSimulator.jsx            # Multi-scene ambient room explorer
│   │   │   ├── ProductCatalog.jsx           # Catalog with search & filter
│   │   │   ├── ProductDetailModal.jsx       # 360° Quick View & spec matrix
│   │   │   ├── AnatomySection.jsx           # Craft hotspot explorer & tech comparison
│   │   │   ├── ReviewsSection.jsx           # Testimonials & review submission
│   │   │   ├── CartDrawer.jsx               # Cart & coupon system
│   │   │   ├── CheckoutModal.jsx            # Order placement & confetti
│   │   │   └── Footer.jsx                   # Newsletter & heritage links
│   │   ├── utils/
│   │   │   └── audio.js                     # Synthesized Web Audio API sound engine
│   │   ├── App.jsx                          # Main state coordinator & ambient glow
│   │   └── index.css                        # Tailwind CSS v4 & custom glow shaders
│   └── package.json
│
├── server/                      # Express + Mongoose Backend
│   ├── models/
│   │   ├── Product.js                       # Mongoose product schema
│   │   ├── Order.js                         # Mongoose order schema
│   │   ├── Review.js                        # Mongoose review schema
│   │   └── Subscriber.js                    # Newsletter subscriber schema
│   ├── data/
│   │   └── seedData.js                      # Curated vintage lighting catalogue
│   ├── server.js                            # REST API with MongoDB + in-memory fallback
│   └── package.json
│
└── package.json                 # Root script runner
```

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- (Optional) MongoDB local or MongoDB Atlas connection string (`MONGODB_URI` in `.env`). If MongoDB is not active locally, the server automatically uses the built-in high-fidelity fallback store seamlessly.

### Start Both Servers Concurrently:
```bash
# In the project root directory
npm run dev
```

Or run them individually:
```bash
# Start backend server (Port 5000)
cd server
npm start

# Start frontend dev server (Port 5173)
cd client
npm run dev
```

- **Frontend URL**: [http://localhost:5173](http://localhost:5173)
- **Backend API URL**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
