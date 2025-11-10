# Setup Guide

## Step-by-Step Setup Instructions

### 1. System Requirements Check

Before starting, verify you have:

```bash
# Check Node version (should be 20.19.4+)
node --version

# Check if Xcode is installed
xcodebuild -version

# Check iOS Simulator
xcrun simctl list devices
```

### 2. Install Dependencies

```bash
# In project root directory
npm install
```

This will install all required packages (~5 minutes).

### 3. Run the App

```bash
# Start Expo dev server and open iOS Simulator
npm run ios
```

The iOS Simulator should open automatically and you should see the Welcome screen.

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

**Problem: iOS Simulator doesn't open**
```bash
# Open Simulator manually
open -a Simulator
# Then run
npm run ios
```

**Problem: Metro bundler errors**
```bash
# Clear Metro cache
npm start -- --reset-cache
```

**Problem: Build errors**
```bash
# Clean and rebuild
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
npm run ios
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

- Use iOS Simulator for development (faster than physical device)
- Keep Metro bundler terminal open while developing
- Check both Expo terminal and Xcode console for errors
- Use React DevTools for debugging
- Enable Debug JS Remotely for better debugging experience

