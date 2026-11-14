# 3D Interactive Workspace Portfolio

An immersive, gamified 3D developer portfolio that places visitors inside a fully interactive, navigable developer workspace in the browser. Instead of browsing a traditional flat website, users explore a stylized room to discover skills, projects, career experience, and contact information through interactive monitors, props, and ambient mechanics.

---

## 🛠️ Tech Stack

- **Core & Runtime:** React 19, TypeScript, Vite 8, React 19 Compiler
- **3D & WebGL:** Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Postprocessing & VFX:** `@react-three/postprocessing` (Selective Bloom & Emissive Glow)
- **UI & Animations:** Framer Motion, CSS Modules & Design Tokens
- **Internationalization (i18n):** `i18next`, `react-i18next`, `i18next-browser-languagedetector` (English, French, Japanese, Malagasy)
- **Routing:** React Router
- **Code Quality:** ESLint Flat Config, TypeScript-ESLint, Prettier

---

## ✨ Key Features

### Implemented & Core

- **First-Person Room Exploration:** WASD / Arrow directional walking and drag-to-look camera rotation at eye-level height.
- **Dynamic 3D In-World Screens:** Interactive HTML terminal interfaces mounted directly onto multiple monitors and laptop screen with 3D occlusion and screen bloom.
- **Vertical Side Menu Navigation:** Rotated Japanese-style side menu providing quick access to all portfolio sections:
    - _Hero_ (Developer introduction & avatar)
    - _Technical Skills_ (Interactive skill categories & proficiencies)
    - _Featured Projects_ (Highlighted showcase with live links)
    - _Recommended Projects_ (Curated open-source projects)
    - _Professional Experiences_ (Career milestones & role timeline)
    - _Contact_ (Interactive contact details & resume download)
- **Cinematic Camera Waypoints:** Smooth interpolated camera flight focusing directly on corresponding desk screens and equipment when switching sections.
- **Multi-Language Support (4 Locales):** Real-time language switching between English (`en`), French (`fr`), Japanese (`ja`), and Malagasy (`mg`).
- **Cyber Glow & Emissive Lighting Rig:** Multi-tier glow system controlling LED ceiling lamps, triangle wall LEDs, shelf underglow, PC accents, neon PlayStation signs, and directional sunlight with shadow maps.
- **Performance & FPS Monitoring:** Built-in FPS counter and frame-time display for tracking WebGL rendering performance.

### Interactive Mechanics

- **Chair Sit & Stand Mechanics:** Click-to-sit interaction transitioning between standing walk mode (1.75m) and seated desk mode (1.15m) with chair swivel.
- **Dynamic UI Themes & Scene Lighting:** Cyber Dark Glass, Minimal Light, and High-Contrast Terminal themes with reactive Three.js light color shifts.
- **Desk Lamp Switch & Customizer:** Toggleable desk lamp with adjustable intensity and color temperatures (Warm Tungsten, Daylight, Cyber Blue).
- **Wearable Headset & Audio System:** Clickable headphones triggering binaural spatial audio filters and a lo-fi/synthwave music player.
- **Laptop Lid & Media Controls:** Open/close lid hinge animation, sleep state, and playback controls.
- **Speaker Audio VFX:** Frequency analyzer pulsing speaker woofer cones along bass kick frequencies with shockwave ripple effects.
- **Desk Drawer & Mini-Fridge Interactions:** Slide-out drawers concealing credentials/USB resume; swing-open mini-fridge with chilled interior lighting.
- **Wall Clock System Time Sync:** Real-time analog clock hands and digital monospace readout synchronized to user local system time.
- **Coffee Mug Drink & Refill:** Sip animation triggering a temporary caffeine sprint speed boost.
- **Trash Can Paper Toss Mini-Game:** Physics-based paper ball trajectory toss with basket score counter.
- **Wall Poster Cinematic Focus:** Raycast click-to-zoom inspection for framed artwork and certificates.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run type-checking & production build
npm run build

# Run code linting
npm run lint

# Format code with Prettier
npm run format
```
