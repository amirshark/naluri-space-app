# Naluri Mobile Coding Challenge – Frontend (React Native)

## 🚀 Introduction

This is the mobile frontend for the Naluri Tech Assessment project. It simulates a space mission system UI that calculates and visualizes the value of Pi to increasing precision, and applies it in planetary circumference estimations. Built with **React Native + Expo**, it connects to a custom backend API that performs Pi calculations and supports interactive controls and real-time visualization.

---

## 📱 App Features

### 🧮 Pi Dashboard
- Displays live Pi value with improving accuracy (e.g. 3 → 3.1 → 3.14 → …).
- Progress bar visualizing current decimal accuracy.
- Control buttons: `Start`, `Pause`, `Reset`.
- Themed with a sci-fi look using `react-native-paper`.

### 🌍 Solar System Calculator
- Displays calculated circumferences of Sun, Earth, and Mars based on current Pi.
- Unit toggle (km ↔ mi).
- Values update in real-time as Pi improves.
- Visual bar comparison of planet sizes (optional).

### 🕒 Pi History Page
- Shows a timeline of Pi values calculated over time.
- Useful for debugging and historical insight.
- Available as a separate screen.

### 🎨 UI & Theming
- Custom sci-fi themed color palette.
- Responsive UI components via `react-native-paper`.
- Dark/light mode ready via dynamic theme provider.

### 🧠 State Management
- Powered by `zustand` and `AsyncStorage`.
- Cross-screen shared state with reactivity.
- Fully persistent across app restarts.
- Optimistic UI with graceful error handling.

### 🔠 Fonts & Splash
- Custom fonts loaded before app starts.
- Splash screen remains visible for at least 5 seconds or until assets are ready.

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

## 📝 Folder Structure

```
/components
  /lib         # Zustand store, theme, hooks
  /utils       # Planet data, helpers
/pages          # PiDashboard, SolarCalculator, History
assets          # Fonts, splash image
App.js
```

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

## 📩 Submission Info

- App and backend are in separate folders.
- Includes `.git` history with progressive commits.
- README files in both frontend and backend folders.

---

## 📄 License

This project is part of the Naluri Tech Assessment and is intended for evaluation purposes only.