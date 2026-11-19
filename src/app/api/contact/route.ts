import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  company: z.string().max(160).optional().default(''),
  service: z.string().max(120).optional().default(''),
  message: z.string().min(10).max(4000),
  consent: z.boolean().refine((v) => v, { message: 'Consent required' }),
});

const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + 10 * 60 * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Demasiados intentos. Espera unos minutos o escríbenos por correo.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Revisa los campos marcados e inténtalo otra vez.' },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? 'hola@emanahub.com';
  const from = process.env.CONTACT_FROM ?? 'EMANA <web@emanahub.com>';

  if (!apiKey) {
    // No mail provider configured: fail loudly so the UI offers the email fallback
    // instead of pretending the message was delivered.
    console.warn('[contact] RESEND_API_KEY missing, message not delivered', {
      name: data.name,
      email: data.email,
      service: data.service,
    });
    return NextResponse.json(
      {
        ok: false,
        code: 'provider_unavailable',
        error: 'El formulario no está conectado todavía. Escríbenos directo a hola@emanahub.com.',
      },
      { status: 503 },
    );
  }

  const html = `
    <h2>Nuevo mensaje desde emanahub.com</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Correo:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(data.company || '—')}</p>
    <p><strong>Servicio:</strong> ${escapeHtml(data.service || '—')}</p>
    <p><strong>Mensaje:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Nuevo contacto: ${data.name}${data.company ? ` · ${data.company}` : ''}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('[contact] provider error', res.status, detail);
      return NextResponse.json(
        { ok: false, code: 'provider_error', error: 'No pudimos enviar el correo. Inténtalo de nuevo.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] unexpected error', error);
    return NextResponse.json(
      { ok: false, code: 'network', error: 'Error de conexión con el servicio de correo.' },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
