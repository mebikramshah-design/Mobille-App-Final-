# Darwish Interserve Mobile App

A React Native (Expo) mobile application for **Darwish Interserve Facility
Management W.L.L.**, Qatar's leading integrated facility management company.

## Features

### Authentication
| Flow | How it works |
|------|--------------|
| **Guest** | Name + Gmail → 6-digit code emailed via Gmail/Nodemailer → verify → enter app |
| **Employee** | Name + Employee ID + Mobile + Password → 6-digit SMS code via Twilio → verify → enter app |

OTPs are stored in-memory on the backend and expire after **5 minutes**. The
OTP input supports iOS auto-fill and full-code paste.

### Post-login tabs
After verification, the user lands on a four-tab bottom navigator. Both Guest
and Employee users share the same structure; the Home greeting and badges
adapt to `user.type`.

| Tab        | Content |
|------------|---------|
| **Home**     | Greeting hero, "Redefining the Future" gradient banner, About-us blurb, Hard / Soft / Managed services list, Company-highlights grid, client-logo strip, "Explore Projects" + "Contact Us" CTAs |
| **Events**   | Featured event card with READ MORE, expandable "More Updates" list with type pills, newsletter footer note |
| **Projects** | Stats strip (active projects / sites / workforce), portfolio cards with sector banner and "View Details" → opens `ProjectDetailScreen` (overview, scope-of-work checklist, duration, share + brief-request CTAs) |
| **Profile**  | Gradient header with avatar (✓ verified for employees), Company Overview, Vision & Mission, Core Values, ISO Certifications, Contact rows (mailto / tel deep-links), Log Out |

## Project structure

```
src/
├── components/
│   ├── Logo.js           # DI emblem + wordmark
│   ├── PrimaryButton.js  # primary / outline / ghost / accent variants
│   ├── InputField.js     # labeled input with focus/error/hint + password reveal
│   ├── OTPInput.js       # 6-cell code input — paste-aware, oneTimeCode auto-fill
│   └── ScreenHeader.js   # gradient header used by tab screens
├── config/
│   └── api.js            # OTP backend client
├── navigation/
│   ├── AppNavigator.js   # native stack: auth flow + Main tabs + ProjectDetail
│   └── MainTabs.js       # bottom tabs with active dot indicator
├── screens/
│   ├── WelcomeScreen.js
│   ├── ProjectDetailScreen.js
│   ├── guest/
│   │   ├── GuestLoginScreen.js
│   │   └── GuestOTPScreen.js
│   ├── employee/
│   │   ├── EmployeeRegisterScreen.js
│   │   └── EmployeeOTPScreen.js
│   └── tabs/
│       ├── HomeTab.js
│       ├── EventsTab.js
│       ├── ProjectsTab.js
│       └── ProfileTab.js
└── theme/
    └── index.js          # Colors / Typography / Spacing / Radius / Shadow
```

## Getting started

The app has **two parts** that run together:

### 1. Backend (OTP delivery server)

```bash
cd backend
npm install
cp .env.example .env
# fill in Gmail + Twilio credentials (see below)
npm start
```

The server listens on `http://localhost:3000`.

### 2. Mobile app

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** on iOS or Android.

> Update `src/config/api.js` so `API_BASE_URL` points to your backend:
> - iOS Simulator → `http://localhost:3000`
> - Android Emulator → `http://10.0.2.2:3000`
> - Physical device → `http://<YOUR_LAN_IP>:3000`

## Real OTP delivery

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

## Tech stack

- **Expo** ~51 (managed workflow)
- **React Navigation** v6 (native stack + bottom tabs)
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

## Notes

- App icon and splash image are not bundled in this repo. Drop PNGs into
  `./assets/` and reference them from `app.json` to customize them; Expo's
  defaults are used otherwise.
- Bookmark, search, filter and settings buttons currently surface a "coming
  soon" alert — wire them up when those features are implemented.
