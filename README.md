# Darwish Interserve Mobile App

A React Native (Expo) mobile application for **Darwish Interserve Facility Management W.L.L.**, Qatar's leading integrated facility management company.

## Features — Phase 1: Dual Authentication

### Guest User Flow
1. Tap **"Continue as Guest"** on the Welcome screen
2. Enter **Full Name** + **Gmail address** (@gmail.com only)
3. A **6-digit OTP** is sent to the Gmail inbox
4. Verify the OTP → access the Guest Home dashboard

### Internal Employee Flow
1. Tap **"Employee Login / Register"** on the Welcome screen
2. Fill in **Full Name**, **Employee ID**, **Mobile Number**, and **Password** (with strength indicator)
3. A **6-digit SMS OTP** is sent to the registered mobile number
4. Verify the OTP → access the Employee Home dashboard (with modules, stats, announcements)

## Project Structure

```
src/
├── components/
│   ├── Logo.js           # Darwish Interserve brand logo component
│   ├── PrimaryButton.js  # Reusable button (primary / outline / ghost / accent)
│   ├── InputField.js     # Form input with icon, focus state, and error display
│   └── OTPInput.js       # 6-cell OTP input with auto-focus and backspace handling
├── screens/
│   ├── WelcomeScreen.js                 # Landing / splash with animated entry
│   ├── guest/
│   │   ├── GuestLoginScreen.js          # Gmail + Name form
│   │   ├── GuestOTPScreen.js            # OTP verify + resend (60s cooldown)
│   │   └── GuestHomeScreen.js           # Guest dashboard
│   └── employee/
│       ├── EmployeeRegisterScreen.js    # Full registration form + password strength
│       ├── EmployeeOTPScreen.js         # SMS OTP verify + registration steps tracker
│       └── EmployeeHomeScreen.js        # Employee dashboard with modules and stats
├── navigation/
│   └── AppNavigator.js   # React Navigation stack
└── theme/
    └── index.js           # Colors, Typography, Spacing, Radius, Shadow
```

## Getting Started

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** on iOS or Android.

### Demo OTP Codes (development only)
| Flow     | Code   |
|----------|--------|
| Guest    | 123456 |
| Employee | 654321 |

## Tech Stack

- **Expo** ~51 (managed workflow)
- **React Navigation** v6 (native stack)
- **expo-linear-gradient** — header and welcome gradients
- **@expo/vector-icons** (Ionicons)
- **react-native-safe-area-context**

## Branding

| Token    | Value     | Usage                     |
|----------|-----------|---------------------------|
| Primary  | `#1B3A6B` | Navy Blue — main brand    |
| Accent   | `#C9A84C` | Gold — highlights, badges |
| Success  | `#10B981` | Verification, check marks |
| Error    | `#EF4444` | Validation errors         |
