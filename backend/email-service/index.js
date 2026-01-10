require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Health check
app.get('/', (req, res) => res.json({ ok: true }));

// POST /api/email/send
// This service now proxies to EmailJS REST API when configured (no SMTP / nodemailer required).
app.post('/api/email/send', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  const service_id = process.env.EMAILJS_SERVICE_ID || process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const template_id = process.env.EMAILJS_TEMPLATE_ID || process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const user_id = process.env.EMAILJS_PUBLIC_KEY || process.env.EMAILJS_USER_ID || process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  if (!service_id || !template_id || !user_id) {
    return res.status(501).json({ error: 'emailjs_not_configured', message: 'EmailJS server parameters missing. Set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID and EMAILJS_PUBLIC_KEY in env.' });
  }

  try {
    const payload = {
      service_id,
      template_id,
      user_id,
      template_params: {
        // match the template placeholder names seen in templates
        user_name: name,
        user_email: email,
        subject: subject || `Website contact from ${name}`,
        message,
        // keep compatibility aliases
        from_name: name,
        from_email: email
      }
    };

    const resp = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('EmailJS API error:', resp.status, text);
      return res.status(502).json({ error: 'emailjs_failed', detail: text });
    }

    return res.json({ success: true, message: 'Email sent via EmailJS' });
  } catch (err) {
    console.error('EmailJS proxy error:', err && err.message ? err.message : err);
    return res.status(500).json({ error: 'emailjs_exception', detail: err && err.message ? err.message : 'unknown' });
  }
});

app.listen(PORT, () => {
  console.log(`Email service (EmailJS proxy) running on port ${PORT}`);
});