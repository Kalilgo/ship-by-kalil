'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Loader2, Mail, Linkedin, Github, Calendar } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const translations = {
  es: {
    title: 'Contact',
    titleHighlight: 'o',
    subtitle:
      '¿Tenés un proyecto en mente? ¿Querés trabajar juntos? Escribime y te respondo lo antes posible.',
    quickResponse: 'Respuesta rápida',
    quickResponseDesc: 'Normalmente respondo en menos de 24 horas con propuesta de próximos pasos.',
    name: 'Nombre',
    namePlaceholder: 'Tu nombre',
    email: 'Email',
    emailPlaceholder: 'tu@email.com',
    subject: 'Asunto',
    subjectPlaceholder: '¿De qué se trata?',
    message: 'Mensaje',
    messagePlaceholder: 'Tu mensaje...',
    nameRequired: 'Nombre es requerido',
    emailRequired: 'Email es requerido',
    emailInvalid: 'Email inválido',
    subjectRequired: 'Asunto es requerido',
    messageRequired: 'Mensaje es requerido',
    send: 'Enviar mensaje',
    sending: 'Enviando...',
    sent: 'Enviado!',
    successMessage: '¡Mensaje enviado! Te responderé pronto.',
    errorMessage: 'Error al enviar. Escribime directamente a gomezukalil@gmail.com',
  },
  en: {
    title: 'Contact',
    titleHighlight: '',
    subtitle:
      "Have a project in mind? Want to work together? Write to me and I'll respond as soon as possible.",
    quickResponse: 'Quick response',
    quickResponseDesc: 'I usually respond within 24 hours with a proposal for next steps.',
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    subject: 'Subject',
    subjectPlaceholder: "What's it about?",
    message: 'Message',
    messagePlaceholder: 'Your message...',
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email',
    subjectRequired: 'Subject is required',
    messageRequired: 'Message is required',
    send: 'Send message',
    sending: 'Sending...',
    sent: 'Sent!',
    successMessage: 'Message sent! I will respond soon.',
    errorMessage: 'Error sending. Email me directly at gomezukalil@gmail.com',
  },
};

interface ContactProps {
  locale?: 'es' | 'en';
  contactEmail?: string;
}

export default function Contact({ locale = 'es', contactEmail }: ContactProps) {
  const t = translations[locale];
  const displayEmail =
    contactEmail || (locale === 'es' ? 'gomezukalil@gmail.com' : 'gomezukalil@gmail.com');
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage(t.errorMessage);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-surface relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div className="max-w-6xl mx-auto px-6 relative">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-12">
          {t.title}
          <span className="text-accent-cyan">{t.titleHighlight}</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-text-secondary mb-8">{t.subtitle}</p>

            <div className="glass-panel border border-border rounded-xl p-4 mb-8">
              <p className="text-xs uppercase tracking-wide text-accent-cyan mb-1">
                {t.quickResponse}
              </p>
              <p className="text-sm text-text-secondary">{t.quickResponseDesc}</p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${displayEmail}`}
                className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>{displayEmail}</span>
              </a>
              <a
                href="https://www.linkedin.com/in/matias-gomez-19a1912a5/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Kalilgo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 glass-panel border border-border rounded-xl p-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm text-text-secondary mb-2">
                {t.name}
              </label>
              <input
                {...register('name', { required: t.nameRequired })}
                type="text"
                id="name"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/25 transition-colors"
                placeholder={t.namePlaceholder}
              />
              {errors.name && (
                <span id="name-error" className="text-red-500 text-sm" role="alert">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
                {t.email}
              </label>
              <input
                {...register('email', {
                  required: t.emailRequired,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t.emailInvalid,
                  },
                })}
                type="email"
                id="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/25 transition-colors"
                placeholder={t.emailPlaceholder}
              />
              {errors.email && (
                <span id="email-error" className="text-red-500 text-sm" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-text-secondary mb-2">
                {t.subject}
              </label>
              <input
                {...register('subject', { required: t.subjectRequired })}
                type="text"
                id="subject"
                aria-invalid={errors.subject ? 'true' : 'false'}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/25 transition-colors"
                placeholder={t.subjectPlaceholder}
              />
              {errors.subject && (
                <span id="subject-error" className="text-red-500 text-sm" role="alert">
                  {errors.subject.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-text-secondary mb-2">
                {t.message}
              </label>
              <textarea
                {...register('message', { required: t.messageRequired })}
                id="message"
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
                rows={5}
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/25 transition-colors resize-none"
                placeholder={t.messagePlaceholder}
              />
              {errors.message && (
                <span id="message-error" className="text-red-500 text-sm" role="alert">
                  {errors.message.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-6 py-3 bg-accent text-white rounded-xl font-medium shadow-[0_0_0_1px_rgba(37,99,235,0.35),0_14px_40px_-12px_rgba(37,99,235,0.45)] hover:bg-accent/90 hover:shadow-[0_0_0_1px_rgba(6,182,212,0.25),0_18px_44px_-12px_rgba(6,182,212,0.3)] transition-[transform,box-shadow,background-color] duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
              {status === 'success' && <Check className="w-5 h-5" />}
              {status === 'loading' ? t.sending : status === 'success' ? t.sent : t.send}
            </button>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm"
              >
                {errorMessage}
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-sm"
              >
                {t.successMessage}
              </motion.div>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-text-secondary text-center mb-4">
              {locale === 'es'
                ? '¿Prefieres agendar directamente?'
                : 'Prefer to schedule directly?'}
            </p>
            <a
              href="https://cal.com/matias-gomez-ugzqgi"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-accent-cyan/40 text-accent-cyan rounded-lg hover:bg-accent-cyan/10 transition-colors font-medium text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>{locale === 'es' ? 'Ver horarios disponibles' : 'View available times'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
