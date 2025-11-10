# Setup Guide

## Step-by-Step Setup Instructions

### 1. System Requirements Check

Before starting, verify you have:

```bash
# Check Node version (should be 20.19.4+)
node --version
```

**For macOS users:**
```bash
# Check if Xcode is installed
xcodebuild -version

# Check iOS Simulator
xcrun simctl list devices
```

**For Windows/Linux users:**
- Ensure Android Studio is installed
- Set up an Android Virtual Device (AVD) or connect a physical Android device
- Enable USB debugging if using a physical device

### 2. Install Dependencies

```bash
# In project root directory
npm install
```

This will install all required packages (~5 minutes).

### 3. Run the App

**On macOS:**
```bash
# Start Expo dev server and open iOS Simulator
npm run ios
```

**On Windows/Linux:**
```bash
# Start Expo dev server and open Android Emulator
npm run android
```

**Or use Expo Go on your physical device:**
```bash
# Start Expo dev server
npm start
# Then scan the QR code with Expo Go app (iOS/Android)
```

The simulator/emulator should open automatically and you should see the Welcome screen.

### 4. Verify Everything Works

- [ ] App launches without errors
- [ ] You can see the Welcome screen
- [ ] You can navigate to Login screen
- [ ] You can log in with test@test.com / test123
- [ ] You can see the Profile screen after login

### Troubleshooting

**Problem: "Module not found" errors**
```bash
rm -rf node_modules
npm install
```

**Problem: iOS Simulator doesn't open (macOS only)**
```bash
# Open Simulator manually
open -a Simulator
# Then run
npm run ios
```

**Problem: Android Emulator doesn't open (Windows/Linux)**
- Open Android Studio
- Start an AVD from the AVD Manager
- Then run `npm run android`

**Problem: Metro bundler errors**
```bash
# Clear Metro cache
npm start -- --reset-cache
```

**Problem: Build errors (iOS - macOS only)**
```bash
# Clean and rebuild
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
npm run ios
```

**Problem: Build errors (Android)**
```bash
# Clean and rebuild
cd android && ./gradlew clean && cd ..
npm run android
```

## Development Workflow

1. Make code changes
2. Save files (Hot reload should work automatically)
3. If hot reload doesn't work, shake the device/simulator and select "Reload"
4. Check console for errors

## Useful Commands

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android (if you have Android Studio)
npm run android

# Run tests
npm test

# Type checking
npx tsc --noEmit

# Lint code
npm run lint
```

## Tips

- Use simulator/emulator for development (faster than physical device)
- Keep Metro bundler terminal open while developing
- Check Expo terminal and device console for errors
- Use React DevTools for debugging
- Enable Debug JS Remotely for better debugging experience
- On Windows/Linux, Android development works perfectly fine - you can test all features

