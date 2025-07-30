# 🌞 Naluri Mobile Coding Challenge: Solar System π Calculator

## 🚀 Introduction

The **Naluri space project** is investigating how we could model the solar system. As a first step, this project calculates the circumference of the Sun using a dynamically computed value of Pi (π) that increases in precision over time. The solution consists of a backend server that continuously calculates Pi and a mobile app that displays real-time solar system data using this value.

---

## ✨ Features

### 🧠 Backend Server
- Calculates Pi to increasing decimal accuracy (e.g., 3 → 3.1 → 3.14 …).
- Saves and serves the most accurate computed value.
- Exposes HTTP API to:
  - Get latest Pi value.
  - Start calculation.
  - Pause calculation.
  - Reset Pi to base state.

### 📱 React Native Mobile App
#### Screen 1: **Pi Calculator Dashboard**
- Displays the current value of Pi and its accuracy.
- Start, Pause, Reset controls.
- Progress bar visualizing precision.
- Live polling every 2 seconds from the backend.

#### Screen 2: **Solar System Calculator**
- Calculates circumferences of the Sun, Earth, and Mars.
- Switch between **km** and **miles**.
- Visual comparisons using styled text/bars.
- Reacts immediately to Pi changes.

### ⚙️ State Management & UX
- Global state using Zustand.
- State persistence using AsyncStorage.
- Cross-screen reactivity.
- Optimistic UI updates and error handling.
- Offline-safe with resume support.

### 🎨 UI & Theme
- Sci-Fi inspired dark/light theme using React Native Paper.
- Smooth splash screen that waits for fonts + minimum 5s delay.
- Tab navigation with icons.
- Custom app icon and splash assets via [IconKitchen](https://icon.kitchen/).

---

## 🛠️ Tech Stack

| Layer        | Technology                            |
|--------------|----------------------------------------|
| Frontend     | React Native (Expo SDK)                |
| UI Library   | React Native Paper                     |
| Navigation   | React Navigation (Bottom Tabs)         |
| State Mgmt   | Zustand + AsyncStorage                 |
| Fonts        | Expo Google Fonts (Roboto)             |
| Backend      | Node.js + Express                      |
| API Comm     | Fetch + .env-configured endpoints      |
| Build Tool   | Expo EAS (for APK/IPA)                 |

---

## 📦 Installation

### 🔧 Prerequisites
- Node.js
- npm / yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go (for mobile testing)

---

### 💻 Backend Setup

```bash
cd backend
npm install
npm start
```

> The server runs on `http://localhost:3000` (configurable).

**API Endpoints:**

| Method | Endpoint      | Description                   |
|--------|---------------|-------------------------------|
| GET    | `/pi`         | Get current value of Pi       |
| POST   | `/start`      | Start Pi calculation          |
| POST   | `/pause`      | Pause calculation             |
| POST   | `/reset`      | Reset Pi to 3.00              |

---

### 📱 Frontend Setup (Expo App)

```bash
# Clone the project
git clone https://github.com/amirshark/naluri-space-app

# Install dependencies
npm install
```

> Create a `.env` file at the root of the frontend folder:

```env
API_BASE=http://YOUR_LOCAL_IP:3000
```

- Replace `YOUR_LOCAL_IP` with your local network IP (e.g. `192.168.1.100`) if testing on physical device.
- Do **not** use `localhost`.

### Run the app

```bash
npm start
```

Then scan the QR with Expo Go.

---

## 📱 Splash Screen & App Icon

- Uses `expo-splash-screen` for control.
- Splash displays **minimum 5 seconds** and waits for **Roboto font** to finish loading.
- Custom icon and splash assets generated using [IconKitchen](https://icon.kitchen/) and placed in `assets/` folder.

---

## 📤 Build APK for Testing

```bash
npx expo install eas-cli
eas login
eas build:configure

# Build APK for Android
eas build -p android --profile preview
```

> The APK will be available via a download link after the build completes.

---

## ⚠️ Troubleshooting

- **Network error**: Check `API_BASE` in `.env` and ensure it's reachable from the device.
- **Button text shows as `...`**: Ensure fonts are loaded and your theme’s button style is not clipping text.
- **Storage warning**: AsyncStorage requires serializable (stringified) values. Zustand persist handles this by default—check if custom `setItem` or `getItem` overrides exist.
- **Hermes font warning**: Confirm Roboto font is properly imported via `expo-google-fonts`.

---

## 🔮 Future Improvements

- Use WebSockets for live Pi updates (no polling).
- Add planet selection or full solar system support.
- Implement graph/chart of Pi evolution over time.
- Accessibility enhancements (font scaling, contrast).
- Offline queue for actions while disconnected.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---