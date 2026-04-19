# Plan de Implementación: Sistema de Citas Automático

## Objetivo

Agregar al portfolio un sistema de agendamiento de entrevistas que permita a visitantes reservar una reunión directamente en el calendario de Google del desarrollador.

---

## Stack Tecnológico

| Componente | Tecnología               | Costo |
| ---------- | ------------------------ | ----- |
| Scheduling | Cal.com (self-hosted)    | $0    |
| Hosting    | Vercel                   | $0\*  |
| Dominio    | kalil.dev (ya adquirido) | $0\*  |
| Calendar   | Google Calendar (Gmail)  | $0    |

\*Ya incluido en el plan actual del portfolio.

---

## 🔐 Seguridad

### Datos del Usuario (Visitante)

| Medida                | Descripción                                              |
| --------------------- | -------------------------------------------------------- |
| **Datos recopilados** | Solo nombre, email, motivo (opcional)                    |
| **Almacenamiento**    | Solo en Google Calendar (no en servidor)                 |
| **Retención**         | Datos visibles hasta que elimines la entrada manualmente |
| **GDPR**              | Cal.com cumple con GDPR. Puedes exportar/eliminar datos  |

### Datos del Administrador (Tú)

| Medida                | Descripción                                             |
| --------------------- | ------------------------------------------------------- |
| **OAuth restringido** | Solo permisos de lectura/escritura de calendario        |
| **Scopes limitados**  | `https://www.googleapis.com/auth/calendar.events`       |
| **2FA**               | Habilitar 2FA en Google Account (obligatorio)           |
| **Credenciales**      | Client ID/Secret solo en variables de entorno de Vercel |

### Rate Limiting y Protección

| Límite               | Valor             | Justificación                    |
| -------------------- | ----------------- | -------------------------------- |
| **Citas por día**    | 10 max            | Evitar abuse manual              |
| **Citas por semana** | 50 max            | Prevención de spam               |
| **Booking window**   | 60 días           | Solo citas próximas              |
| **Cancelación**      | 12h antes         | Evitar cancelaciones last-minute |
| **Google API**       | 1,000,000 req/día | Límite gratuito de Google        |

### Configuración de Seguridad en Cal.com

```env
# Rate limiting a nivel aplicación
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=60000

# Timeout de sesión
NEXTAUTH_SESSION_MAX_AGE=30d
NEXTAUTH_SESSION_STRATEGY=jwt

# CSP Headers (vía Vercel)
# Content-Security-Policy: default-src 'self'; img-src 'self' data:; font-src 'self'
```

### Hardening Adicional

1. **Crear cuenta Google específica** (opcional):
   - Crear `bookings@kalil.dev` solo para calendario
   - No关联 a datos personales

2. **Configurar en Cal.com**:

   ```
   Settings → Security
   ✓ Require password for booking (opcional)
   ✓ Hide attendee details from calendar (recomendado)
   ✓ Mask attendee email in notifications
   ```

3. **Monitoreo**:
   - Revisar logs de Vercel semanalmente
   - Configurar alerts en Vercel para errores 5xx

---

## Arquitectura

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Visitante     │────▶│  cal.kalil.dev   │────▶│  Google Calendar │
│  (Portfolio)    │     │   (Cal.com)      │     │   (del usuario)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │  Email           │
                        │  Confirmación    │
                        └──────────────────┘
```

---

## Fase 1: Preparación de Google Cloud (30 min)

### 1.1 Crear Proyecto en Google Cloud

1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear nuevo proyecto: `cal-com-integration`
3. Seleccionar proyecto creado

### 1.2 Habilitar APIs necesarias

1. Ir a **APIs y servicios** → **Biblioteca**
2. Habilitar:
   - Google Calendar API
   - People API (opcional, para detalles del contacto)

### 1.3 Crear Credenciales OAuth

1. Ir a **APIs y servicios** → **Credenciales**
2. Crear **ID de cliente OAuth**
3. Configurar:
   - **Tipo de aplicación**: Aplicación web
   - **Nombre**: Cal.com (no usar "Portfolio" o nombres personales)
   - **URI de redirección autorizada**:
     ```
     https://cal.kalil.dev/api/auth/callback/google
     ```
   - **URI de origen de JavaScript**:
     ```
     https://cal.kalil.dev
     ```
4. **Security**: En "Advanced settings" de Google Cloud:
   - ✅ Publicly leaked credentials detection
   - Verificar que no haya URIs de redirect demasiado amplias
5. Guardar `Client ID` y `Client Secret` (solo en .env de Vercel, nunca en código)

### 1.4 Configurar OAuth Consent Screen

1. Pantalla de consentimiento OAuth → Editar app
2. Configure:
   - **App name**: "Kalil.dev Booking"
   - **Email**: Tu gmail
   - **Scopes**: Solo `.../auth/calendar.events` (no contacts, no gmail)
   - **Test users**: Dejar vacío (público)
3. Publicar app en producción

---

## Fase 2: Despliegue de Cal.com (20 min)

### 2.1 Método Recomendado: Vercel

1. Ir a [Cal.com en Vercel](https://vercel.com/calcom)
2. Click en **Deploy**
3. Configurar:
   - Repository name: `cal-com`
   - Framework Preset: Next.js

### 2.2 Variables de Entorno Requeridas

```env
# ===========================================
# 🔐 SEGURIDAD - NO COMPARTIR NUNCA
# ===========================================

# Configuración Base (reemplazar kalil.dev con tu dominio)
NEXT_PUBLIC_WEBAPP_URL=https://cal.kalil.dev
NEXT_PUBLIC_APP_URL=https://cal.kalil.dev
APP_URL=https://cal.kalil.dev

# Google OAuth (obtenidas en Fase 1) - SOLO en Vercel
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret

# Base de datos (SQLite local - se genera automáticamente)
DATABASE_URL=file:./prisma/db.db

# ===========================================
# 🔑 AUTENTICACIÓN
# ===========================================
NEXTAUTH_SECRET=genera-un-secret-unico-con-openssl-rand-base64-32
NEXTAUTH_URL=https://cal.kalil.dev
NEXTAUTH_SESSION_MAX_AGE=2592000          # 30 días
NEXTAUTH_SESSION_STRATEGY=jwt

# ===========================================
# 📧 EMAIL (Resend - ya tienes cuenta)
# ===========================================
RESEND_API_KEY=re_xxx
EMAIL_FROM=Kalil Dev <onboarding@resend.dev>

# ===========================================
# 🛡️ RATE LIMITING
# ===========================================
# Limitar requests por IP (opcional, Vercel ya tiene límites)
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=60000

# ===========================================
# 🔒 SEGURIDAD ADICIONAL
# ===========================================
# Timeout de API
API_TIMEOUT_MS=30000

# Headers de seguridad (Vercel los provee por defecto)
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
```

### 2.3 Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

---

## Fase 3: Configuración de Cal.com (15 min)

### 3.1 Setup Inicial

1. Ir a `https://cal.kalil.dev`
2. Crear cuenta de administrador
3. Completar perfil:
   - Nombre: "Matías Kalil Gómez"
   - Username: "matias"
   - Foto de perfil

### 3.2 Configurar Event Types

Crear tipos de reunión:

| Tipo            | Duración | Descripción                          |
| --------------- | -------- | ------------------------------------ |
| Llamada inicial | 15 min   | Entrevista inicial sin compromiso    |
| Llamada técnica | 30 min   | Revisión técnica del proyecto        |
| Consultoría     | 45 min   | Discusión profunda de requerimientos |

### 3.3 Conectar Google Calendar

1. Settings → Integrations
2. Google Calendar → Install
3. Autorizar con cuenta Gmail
4. Verificar que muestre "Connected"

### 3.4 Configurar Notificaciones

1. Settings → Notifications
2. Configurar emails de confirmación/reminder

### 3.5 Configuración de Seguridad (IMPORTANTE)

Ir a **Settings → Security** y configurar:

| Configuración                         | Valor    | Justificación                |
| ------------------------------------- | -------- | ---------------------------- |
| **Hide attendee email**               | ✅ ON    | No exponer email del cliente |
| **Hide attendee details in calendar** | ✅ ON    | Solo título de la reunión    |
| **Require password for booking**      | ⬜ OFF   | Mantener flujo simple        |
| **Enable CAPTCHA**                    | ✅ ON    | Prevenir bots                |
| **Maximum bookings per day**          | 10       | Prevenir abuse               |
| **Minimum booking notice**            | 60 min   | Tiempo de preparación        |
| **Cancellation window**               | 12 hours | Evitar cancelaciones últimas |
| **Booking window**                    | 60 days  | Solo citas próximas          |

### 3.6 Configurar Event Types con Límites

Para cada Event Type creado:

```
Event Type Settings:
├── Duration: [15/30/45] min
├── Buffer time: 10 min (entre reuniones)
├── Minimum notice: 60 min
├── Maximum attendees: 1 (1:1 meetings)
├── Booking limits:
│   └── 3 per day per user
└── Confirmation required: ⬜ OFF (auto-confirm ok para gratuito)
```

---

## Fase 4: Integración con Portfolio (15 min)

### 4.1 Agregar Botón de Booking

En el componente de contacto o navbar:

```tsx
// src/components/BookingButton.tsx
import { Calendar } from 'lucide-react';

export default function BookingButton({ locale = 'es' }) {
  const labels = {
    es: { text: 'Agendar reunión', subtitle: 'Elige un horario disponible' },
    en: { text: 'Schedule meeting', subtitle: 'Pick an available time' },
  };

  const t = labels[locale];

  return (
    <a
      href="https://cal.kalil.dev/matias"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-background rounded-lg hover:bg-accent-cyan/80 transition-colors font-medium text-sm"
    >
      <Calendar className="w-4 h-4" />
      <span>{t.text}</span>
    </a>
  );
}
```

### 4.2 Actualizar Navbar

Agregar botón de booking junto al CV download.

### 4.3 Actualizar Contact Section

Agregar link adicional después del formulario.

---

## Fase 5: Dominio Personalizado (10 min)

### 5.1 Configurar DNS en Vercel

1. Ir a Vercel → Project → Settings → Domains
2. Agregar: `cal.kalil.dev`
3. Vercel mostrará registros DNS

### 5.2 Configurar DNS en Proveedor

Agregar registro CNAME:

- Name: `cal`
- Value: `cname.vercel-dns.com.` (o el valor de Vercel)

### 5.3 Verificar SSL

Vercel automáticamente provee SSL.

---

## Checklist de Verificación

- [ ] Google Cloud Project creado
- [ ] APIs habilitadas (Calendar, People)
- [ ] OAuth Client configurado
- [ ] Cal.com desplegado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Cuenta de admin creada
- [ ] Event Types configurados (15min, 30min, 45min)
- [ ] Google Calendar conectado
- [ ] Notificaciones configuradas
- [ ] Dominio `cal.kalil.dev` funcionando
- [ ] Botón de booking agregado al portfolio
- [ ] Probada una cita de prueba

---

## Costos Finales

| Item                             | Costo |
| -------------------------------- | ----- |
| Cal.com (self-hosted)            | $0    |
| Vercel                           | $0    |
| Dominio kalil.dev (ya existente) | $0    |
| Google Calendar                  | $0    |
| Resend (emails)                  | $0    |

**Total: $0/mes**

---

## Mantenimiento

- Actualizar Cal.com mensualmente (vía Vercel)
- Monitorear uso de API de Google (límite generous)
- Revisar entradas del calendario regularmente

---

## 🛡️ Checklist de Seguridad

### Configuración Inicial

- [ ] 2FA habilitado en Google Account
- [ ] OAuth consent screen publicado en producción
- [ ] Solo scopes mínimos en OAuth (calendar.events)
- [ ] Redirect URIs exactos (no wildcards)
- [ ] Client ID/Secret en variables de entorno de Vercel (no en código)

### Cal.com

- [ ] Hide attendee email ✅
- [ ] Hide attendee details ✅
- [ ] CAPTCHA habilitado ✅
- [ ] Maximum bookings per day: 10
- [ ] Minimum notice: 60 min
- [ ] Booking window: 60 days
- [ ] Buffer time: 10 min entre reuniones

### Monitoreo

- [ ] Revisar logs de Vercel semanalmente
- [ ] Revisar Google Calendar para entradas sospechosas
- [ ] Verificar uso de API en Google Cloud Console
- [ ] Mantener backups de configuración (export en Cal.com)

### Post-Instalación

- [ ] Probar booking desde navegador incógnito
- [ ] Probar desde dispositivo móvil
- [ ] Verificar email de confirmación llega
- [ ] Verificar invitación llega a Google Calendar
- [ ] Probar cancelación de prueba

---

## 🚨 Respuesta a Incidentes

| Escenario               | Acción                                                 |
| ----------------------- | ------------------------------------------------------ |
| **Spam de bookings**    | Reducir max bookings per day a 1, habilitar CAPTCHA    |
| **Abuse de API**        | Revocar token en Google Cloud → Regenerar credenciales |
| **Datos comprometidos** | Cambiar NEXTAUTH_SECRET, regenerar Google OAuth        |
| **Servidor caído**      | Vercel tiene fallback, revisar status.vercel.app       |

---

## Notas Importantes

1. **Rate Limits**: Google permite 1,000,000 requests/día gratis, Cal.com tiene límites adicionales
2. **Email**: Usar Resend (ya configurado) para notificaciones
3. **Backup**: Exportar configuración periódicamente desde Cal.com Settings
4. **Privacidad**: Datos de usuarios solo en Google Calendar del admin

---

## 📊 Datos Recopilados

| Dato                   | Cómo se protege                  |
| ---------------------- | -------------------------------- |
| **Nombre del cliente** | Visible solo en Google Calendar  |
| **Email del cliente**  | Oculto con "Hide attendee email" |
| **Motivo de reunión**  | Solo visible para ti             |
| **IP del cliente**     | No almacenada por defecto        |

### Flujo de datos:

```
Usuario → Cal.com → Tu Google Calendar → Email confirmación (Resend)
                              ↓
                    Solo видит: "Reunión con [Nombre]"
```
