'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Check, Loader2, Mail, Linkedin, Github } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
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
      setErrorMessage('Failed to send message. Please try again or email directly.');
    }
  };

  return (
    <section id="contacto" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-12">
          Contact<span className="text-accent-cyan">o</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-text-secondary mb-8">
              ¿Tenés un proyecto en mente? ¿Querés trabajar juntos? Escribime y te respondo lo antes
              posible.
            </p>

            <div className="glass-panel border border-border rounded-xl p-4 mb-8">
              <p className="text-xs uppercase tracking-wide text-accent-cyan mb-1">
                Respuesta rápida
              </p>
              <p className="text-sm text-text-secondary">
                Normalmente respondo en menos de 24 horas con propuesta de próximos pasos.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:gomezukalil@gmail.com"
                className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>gomezukalil@gmail.com</span>
              </a>
              <a
                href="https://linkedin.com/in/matiaskalil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/matiaskalil"
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
                Nombre
              </label>
              <input
                {...register('name', { required: 'Nombre es requerido' })}
                type="text"
                id="name"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none transition-colors"
                placeholder="Tu nombre"
              />
              {errors.name && (
                <span id="name-error" className="text-red-500 text-sm" role="alert">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
                Email
              </label>
              <input
                {...register('email', {
                  required: 'Email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
                type="email"
                id="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none transition-colors"
                placeholder="tu@email.com"
              />
              {errors.email && (
                <span id="email-error" className="text-red-500 text-sm" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-text-secondary mb-2">
                Asunto
              </label>
              <input
                {...register('subject', { required: 'Asunto es requerido' })}
                type="text"
                id="subject"
                aria-invalid={errors.subject ? 'true' : 'false'}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none transition-colors"
                placeholder="¿De qué se trata?"
              />
              {errors.subject && (
                <span id="subject-error" className="text-red-500 text-sm" role="alert">
                  {errors.subject.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-text-secondary mb-2">
                Mensaje
              </label>
              <textarea
                {...register('message', { required: 'Mensaje es requerido' })}
                id="message"
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
                rows={5}
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none transition-colors resize-none"
                placeholder="Tu mensaje..."
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
              className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
              {status === 'success' && <Check className="w-5 h-5" />}
              {status === 'loading'
                ? 'Enviando...'
                : status === 'success'
                  ? 'Enviado!'
                  : 'Enviar mensaje'}
            </button>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm"
              >
                {errorMessage}
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-sm"
              >
                ¡Mensaje enviado! Te responderé pronto.
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
