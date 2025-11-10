# MetaEstetics Mobile Hiring Test

Welcome to the MetaEstetics mobile developer hiring challenge!

## Overview

This is a React Native (Expo) application. Some features are implemented, some aren't. Your job is to make it work.

**Note:** This test uses mock APIs instead of Firebase/Firestore for security and simplicity. In production, we use Firebase Authentication and Firestore for data storage. The patterns and structure should match production code (async operations, error handling, state management), but you'll work with mock services instead of real Firebase.

## Prerequisites

**REQUIRED:**
- Mac computer (macOS 12+)
- Xcode 16.1+ installed
- Node.js 20.19.4+
- iOS Simulator working
- React Native/Expo experience

**If you don't have these, please don't proceed.**

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run on iOS Simulator:
   ```bash
   npm run ios
   ```
4. Verify the app loads and you can see the Welcome screen

## Test Login Credentials

Use these credentials to test the login functionality:
- Email: `test@test.com`
- Password: `test123`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Application screens
├── navigation/     # Navigation configuration
├── store/         # Redux store (state management)
├── services/      # API and storage services
├── utils/         # Helper functions and validation
├── types/         # TypeScript type definitions
└── theme/         # Colors, spacing, typography
```

## Technologies Used

- **Expo SDK 54**
- **React Native 0.81.4**
- **TypeScript**
- **Redux Toolkit** (state management)
- **React Navigation** (navigation)
- **Formik + Yup** (forms and validation)
- **AsyncStorage** (local persistence)
- **Mock API Service** (simulates backend - in production we use Firebase/Firestore)

## What's Already Implemented

✅ Project setup and configuration
✅ Reusable components (Button, Input, etc.)
✅ Redux store structure
✅ Navigation structure
✅ Mock API service (simulates backend calls)
✅ Storage service (AsyncStorage)
✅ Login screen (fully functional)
✅ Profile display screen
✅ Type definitions

## Your Tasks

See `CHALLENGE.md` for what you need to build.

## Submission Process

1. **Fork this repository**
2. **Create a branch** for your work
3. **Make your changes** and commit them
4. **Create a Pull Request** with:
   - Your code changes
   - Link to screen recording in PR description
   - Explanation of your approach

See `CHALLENGE.md` for detailed submission requirements.

Good luck! 🚀
