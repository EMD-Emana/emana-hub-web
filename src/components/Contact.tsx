'use client';

import { useState } from 'react';
import { services, site } from '@/lib/content';
import { IconCheck, IconClock, IconMail, IconPin, IconShield } from './Icon';

type Status = { kind: 'idle' | 'sending' | 'ok' | 'error'; message?: string };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      service: String(data.get('service') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      consent: data.get('consent') === 'on',
    };

    const nextErrors: Record<string, string> = {};
    if (payload.name.length < 2) nextErrors.name = 'Escribe tu nombre.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) nextErrors.email = 'Revisa tu correo.';
    if (payload.message.length < 10) nextErrors.message = 'Cuéntanos un poco más (mínimo 10 caracteres).';
    if (!payload.consent) nextErrors.consent = 'Necesitamos tu consentimiento para responderte.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; code?: string };
      if (res.ok && json.ok) {
        setStatus({ kind: 'ok', message: 'Mensaje enviado. Te respondemos en menos de 24 h hábiles.' });
        form.reset();
      } else {
        setStatus({
          kind: 'error',
          message:
            json.error ??
            'No pudimos enviar el mensaje en este momento. Escríbenos directo a hola@emanahub.com.',
        });
      }
    } catch {
      setStatus({
        kind: 'error',
        message: 'Parece que hubo un problema de conexión. Escríbenos directo a hola@emanahub.com.',
      });
    }
  };

  return (
    <section className="section contact" id="contacto" aria-labelledby="contacto-title">
      <div className="wrap">
        <div className="contact__panel" data-reveal>
          <div className="contact__info">
            <div className="section__index" style={{ marginBottom: 18 }}>
              07 — Contacto
            </div>
            <h2 className="h2" id="contacto-title">
              Cuéntanos qué
              <br />
              <span className="serif grad-text">quieres construir.</span>
            </h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Respondemos en menos de 24 horas hábiles, con una propuesta concreta y sin
              compromiso.
            </p>

            <div className="contact__channels">
              <a className="channel" href={`mailto:${site.email}`}>
                <IconMail />
                <span>
                  <b>{site.email}</b>
                  <span>Correo directo del equipo</span>
                </span>
              </a>
              <div className="channel">
                <IconClock />
                <span>
                  <b>Lun–Vie · 9:00–18:00</b>
                  <span>Hora de Lima (GMT-5)</span>
                </span>
              </div>
              <div className="channel">
                <IconPin />
                <span>
                  <b>Lima, Perú</b>
                  <span>Trabajamos con equipos de toda LatAm</span>
                </span>
              </div>
            </div>

            <p className="note" style={{ display: 'flex', gap: 8 }}>
              <IconShield style={{ flex: '0 0 auto', marginTop: 2 }} />
              Tus datos solo se usan para responderte. No los compartimos con terceros ni te
              suscribimos a nada.
            </p>
          </div>

          <form className="contact__form" onSubmit={onSubmit} noValidate>
            <div className="field__row">
              <div className="field">
                <label className="field__label" htmlFor="name">
                  Nombre *
                </label>
                <input
                  className="input"
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  aria-invalid={Boolean(errors.name)}
                  required
                />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>
              <div className="field">
                <label className="field__label" htmlFor="email">
                  Correo *
                </label>
                <input
                  className="input"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@empresa.com"
                  aria-invalid={Boolean(errors.email)}
                  required
                />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>
            </div>

            <div className="field__row">
              <div className="field">
                <label className="field__label" htmlFor="company">
                  Empresa
                </label>
                <input
                  className="input"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Opcional"
                />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="service">
                  ¿Qué necesitas?
                </label>
                <select className="select" id="service" name="service" defaultValue="">
                  <option value="">Elige un servicio</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Varios / no estoy seguro">Varios / no estoy seguro</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="message">
                Cuéntanos del proyecto *
              </label>
              <textarea
                className="textarea"
                id="message"
                name="message"
                placeholder="Qué hace tu negocio, qué necesitas y para cuándo."
                aria-invalid={Boolean(errors.message)}
                required
              />
              {errors.message && <span className="field__error">{errors.message}</span>}
            </div>

            <label className="check">
              <input type="checkbox" name="consent" aria-invalid={Boolean(errors.consent)} />
              <span>
                Acepto que EMANA use estos datos para responderme, según su{' '}
                <a href="/privacidad" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>
                  política de privacidad
                </a>
                .
              </span>
            </label>
            {errors.consent && <span className="field__error">{errors.consent}</span>}

            <button type="submit" className="btn btn--primary" disabled={status.kind === 'sending'}>
              {status.kind === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
              <IconCheck className="btn__arrow" />
            </button>

            {status.kind === 'ok' && (
              <p className="form__status is-ok" role="status">
                {status.message}
              </p>
            )}
            {status.kind === 'error' && (
              <p className="form__status is-error" role="alert">
                {status.message}{' '}
                <a href={`mailto:${site.email}`}>Escribir por correo</a>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
