// OTP backend base URL
// • iOS Simulator  → http://localhost:3000
// • Android Emulator → http://10.0.2.2:3000
// • Physical device  → http://<YOUR_MACHINE_LAN_IP>:3000  (e.g. http://192.168.1.10:3000)
export const API_BASE_URL = 'http://localhost:3000';

export async function sendEmailOTP(email, name) {
  const res = await fetch(`${API_BASE_URL}/send-otp/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name }),
  });
  return res.json();
}

export async function verifyEmailOTP(email, otp) {
  const res = await fetch(`${API_BASE_URL}/verify-otp/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  return res.json();
}

export async function sendSmsOTP(mobile, name) {
  const res = await fetch(`${API_BASE_URL}/send-otp/sms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, name }),
  });
  return res.json();
}

export async function verifySmsOTP(mobile, otp) {
  const res = await fetch(`${API_BASE_URL}/verify-otp/sms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, otp }),
  });
  return res.json();
}
