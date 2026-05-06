const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// In-memory OTP store: key → { otp, expiresAt }
const otpStore = new Map();

function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function storeOTP(key, otp) {
  otpStore.set(key, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
}

function checkOTP(key, otp) {
  const record = otpStore.get(key);
  if (!record) return { valid: false, message: 'Code expired or not found. Request a new one.' };
  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return { valid: false, message: 'Code has expired. Please request a new one.' };
  }
  if (record.otp !== otp) return { valid: false, message: 'Invalid code. Please try again.' };
  otpStore.delete(key);
  return { valid: true };
}

// ─── Email (Nodemailer + Gmail) ───────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.post('/send-otp/email', async (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const otp = generateOTP();

  try {
    await transporter.sendMail({
      from: `"Darwish Interserve" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your Verification Code — Darwish Interserve',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;">
          <div style="background:#1B3A6B;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
            <h2 style="color:#C9A84C;margin:0;font-size:20px;letter-spacing:1px;">DARWISH INTERSERVE</h2>
            <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:13px;">Integrated Facilities Management</p>
          </div>
          <div style="background:#ffffff;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none;">
            <p style="color:#374151;font-size:15px;margin-top:0;">Hello${name ? ' ' + name : ''},</p>
            <p style="color:#6B7280;font-size:14px;">Use the code below to verify your identity. It expires in <strong>5 minutes</strong>.</p>
            <div style="text-align:center;margin:28px 0;">
              <span style="display:inline-block;font-size:38px;font-weight:800;letter-spacing:10px;color:#1B3A6B;background:#EEF2FF;padding:14px 28px;border-radius:10px;border:2px solid #C9A84C;">${otp}</span>
            </div>
            <p style="color:#9CA3AF;font-size:12px;text-align:center;margin-bottom:0;">Never share this code. Darwish Interserve staff will never ask for it.</p>
          </div>
        </div>
      `,
    });
    storeOTP(email.toLowerCase(), otp);
    console.log(`[EMAIL] OTP sent to ${email}`);
    res.json({ success: true });
  } catch (err) {
    console.error('[EMAIL] Error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to send email. Check server credentials.' });
  }
});

app.post('/verify-otp/email', (req, res) => {
  const { email, otp } = req.body;
  const result = checkOTP(email?.toLowerCase(), otp);
  if (result.valid) console.log(`[EMAIL] OTP verified for ${email}`);
  res.json(result);
});

// ─── SMS (Twilio REST API) ────────────────────────────────────────────────────

app.post('/send-otp/sms', async (req, res) => {
  const { mobile, name } = req.body;
  if (!mobile) return res.status(400).json({ success: false, message: 'Mobile is required' });

  // Normalize: remove spaces, ensure E.164
  const normalized = mobile.replace(/\s/g, '');
  const otp = generateOTP();

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: normalized,
          From: TWILIO_PHONE_NUMBER,
          Body: `Your Darwish Interserve verification code is: ${otp}. Valid for 5 minutes. Do not share it.`,
        }),
      }
    );

    const data = await response.json();
    if (data.error_code) throw new Error(`Twilio ${data.error_code}: ${data.message}`);

    storeOTP(normalized, otp);
    console.log(`[SMS] OTP sent to ${normalized}`);
    res.json({ success: true });
  } catch (err) {
    console.error('[SMS] Error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to send SMS. Check server credentials.' });
  }
});

app.post('/verify-otp/sms', (req, res) => {
  const { mobile, otp } = req.body;
  const normalized = mobile?.replace(/\s/g, '');
  const result = checkOTP(normalized, otp);
  if (result.valid) console.log(`[SMS] OTP verified for ${normalized}`);
  res.json(result);
});

// ─── Health check ─────────────────────────────────────────────────────────────

app.get('/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅  DIFM OTP server running on http://localhost:${PORT}`);
  console.log(`   Email : ${process.env.GMAIL_USER || '⚠️  GMAIL_USER not set'}`);
  console.log(`   Twilio: ${process.env.TWILIO_ACCOUNT_SID ? '✓ configured' : '⚠️  TWILIO_ACCOUNT_SID not set'}\n`);
});
