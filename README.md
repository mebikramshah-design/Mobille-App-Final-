# Darwish Interserve Mobile App

A React Native (Expo) mobile application for **Darwish Interserve Facility Management W.L.L.**, Qatar's leading integrated facility management company.

## Features — Phase 2: Post-Login Tab Navigation

After successful authentication, the app drops the user into a 4-tab bottom
navigator. Both Guest and Employee users share the same tab structure, but
content adapts based on `user.type`.

| Tab        | Description |
|------------|-------------|
| **Home**     | Greeting, hero stats card, employee quick-actions (Work Orders / Clock In / Schedule / Reports), services grid (Hard FM, Soft FM, Security, MEP, Cleaning, Landscaping), featured client |
| **Events**   | Featured event banner with RSVP, filter chips (All / Training / HSE / Company / Holidays), date-block event list with type pills |
| **Projects** | Stats summary card (Total/Active/Staff/Sites), status filter pills with counts, project cards with progress bars and next-milestone footer |
| **Profile**  | Avatar with verified badge (employees), employee/guest pill, contact info, employee tile row (Tasks/Awards/Tenure), grouped settings (Account/Preferences/Support), logout button |

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

The app has **two parts** that must run together:

### 1. Backend (OTP delivery server)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and fill in Gmail + Twilio credentials (see below)
npm start
```

The server listens on `http://localhost:3000`.

### 2. Mobile app

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** on iOS or Android.

> Update `src/config/api.js` so `API_BASE_URL` points to your backend.
> Use `http://10.0.2.2:3000` for the Android emulator, your machine's LAN IP for a physical device.

## Real OTP Delivery

OTPs are sent for real — no demo bypass codes.

### Gmail (guest email OTP)
1. Enable **2-Step Verification** at <https://myaccount.google.com/security>
2. Open <https://myaccount.google.com/apppasswords>, generate a password for "Mail"
3. In `backend/.env` set:
   ```
   GMAIL_USER=your-account@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### Twilio (employee SMS OTP)
1. Sign up at <https://twilio.com/try-twilio>
2. Copy **Account SID** and **Auth Token** from the console dashboard
3. Provision a phone number under Phone Numbers → Buy a number
4. In `backend/.env` set:
   ```
   TWILIO_ACCOUNT_SID=ACxxxx...
   TWILIO_AUTH_TOKEN=xxxx...
   TWILIO_PHONE_NUMBER=+1XXXXXXXXXX
   ```

OTPs are stored in-memory and expire after **5 minutes**.

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
