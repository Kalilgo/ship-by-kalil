import type { APIRoute } from 'astro';

import { siteFixture } from '../../fixtures/site.fixture';

export const prerender = false;

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(clientIp)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!validateEmail(String(email))) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { maxLengths } = siteFixture.contact;
    if (
      String(name).length > maxLengths.name ||
      String(email).length > maxLengths.email ||
      String(subject).length > maxLengths.subject ||
      String(message).length > maxLengths.message
    ) {
      return new Response(JSON.stringify({ error: 'Payload too large' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeSubject = escapeHtml(String(subject));
    const safeMessage = escapeHtml(String(message));

    const resendApiKey = import.meta.env.RESEND_API_KEY;
    const contactEmail = import.meta.env.CONTACT_EMAIL || 'gomezukalil@gmail.com';

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: contactEmail,
        subject: `Portfolio: ${subject}`,
        html: `
          <h2>Nuevo mensaje desde el portfolio</h2>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Asunto:</strong> ${safeSubject}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${safeMessage.replace(/\n/g, '<br/>')}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
