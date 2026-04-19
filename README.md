# Portfolio - Matías Kalil Gómez

Portfolio profesional de desarrollador web Full Stack. Construido con Astro, React y Tailwind CSS.

---

## 🚀 Quick Start

```bash
# Clonar el proyecto
git clone https://github.com/Kalilgo/ship-by-kalil.git
cd ship-by-kalil

# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview producción
npm run preview
```

---

## 🛠️ Stack Tecnológico

| Tecnología        | Propósito                 |
| ----------------- | ------------------------- |
| **Astro**         | Framework principal (SSG) |
| **React**         | Componentes interactivos  |
| **Tailwind CSS**  | Estilos                   |
| **Framer Motion** | Animaciones               |
| **TypeScript**    | Tipado estático           |
| **Resend**        | Envío de emails           |
| **Vercel**        | Hosting y deployment      |

---

## 📁 Estructura del Proyecto

```
/
├── public/                 # Archivos estáticos
│   ├── CV.pdf            # Currículum
│   ├── favicon.svg       # Favicon
│   ├── og-image.svg      # Open Graph image
│   └── robots.txt        # SEO
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── BookingButton.tsx    # Botón de Cal.com
│   │   ├── Contact.tsx          # Formulario de contacto
│   │   ├── Experience.astro     # Sección experiencia
│   │   ├── Footer.astro         # Footer
│   │   ├── Hero.astro           # Sección hero
│   │   ├── Navbar.astro         # Navegación
│   │   ├── Projects.tsx         # Proyectos
│   │   ├── Skills.tsx           # Habilidades
│   │   ├── WhatsAppButton.tsx   # Botón flotante WhatsApp
│   │   └── ui/                  # Componentes UI
│   ├── data/              # Datos estáticos
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   └── skills.ts
│   ├── fixtures/          # Fixtures de validación
│   ├── i18n/              # Internacionalización
│   │   ├── index.ts
│   │   ├── es.json
│   │   └── en.json
│   ├── layouts/           # Layouts principales
│   │   └── Layout.astro
│   ├── lib/               # Utilidades
│   │   └── motion.ts
│   ├── pages/             # Páginas
│   │   ├── index.astro           # Home (español)
│   │   ├── en/index.astro        # Home (inglés)
│   │   ├── 404.astro             # Página 404
│   │   ├── cv.astro              # Descargar CV
│   │   └── api/                  # API endpoints
│   │       └── contact.ts        # Endpoint de contacto
│   └── styles/
│       └── global.css     # Estilos globales
├── .env.example           # Plantilla de variables
├── astro.config.mjs       # Configuración de Astro
├── tailwind.config.mjs    # Configuración de Tailwind
├── tsconfig.json          # Configuración de TypeScript
├── eslint.config.mjs      # Configuración de ESLint
└── package.json
```

---

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` basado en `.env.example`:

```env
# Clave API de Resend (https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email destino para formulario de contacto
CONTACT_EMAIL=gomezukalil@gmail.com

# URL canonical del sitio (para SEO y Open Graph)
PUBLIC_SITE_URL=https://kalil.dev
```

### Obtener API Key de Resend

1. Ir a https://resend.com
2. Registrarse con cuenta de email
3. Crear API Key en API Keys
4. Copiar key y pegar en `RESEND_API_KEY`

### Configurar en Vercel

1. Ir al proyecto en Vercel
2. Settings → Environment Variables
3. Agregar las variables del `.env`
4. Redeploy si es necesario

---

## 🌐 Internacionalización (i18n)

El sitio soporta español (por defecto) e inglés.

### Archivos de traducción

- `src/i18n/es.json` - Español
- `src/i18n/en.json` - Inglés

### Cómo agregar nuevo texto

1. Editar ambos archivos JSON
2. Agregar la clave en cada idioma
3. Usar en componentes:

```astro
---
import es from '../i18n/es.json';
import en from '../i18n/en.json';

const { locale = 'es' } = Astro.props;
const t = locale === 'en' ? en : es;
---

<h1>{t.titulo}</h1>
```

### Cambiar idioma desde URL

- Español: `/` o `/index.astro`
- Inglés: `/en/`

---

## 📬 Formulario de Contacto

### Flujo

1. Usuario completa formulario en `/#contacto`
2. Datos se envían a `/api/contact` (endpoint serverless)
3. Validación backend (rate limiting, sanitización)
4. Email enviado via Resend API
5. Confirmación mostrada al usuario

### Seguridad

- **Rate limiting**: 3 requests por IP por minuto
- **Validación**: Email regex + sanitización HTML
- **Límites**: Longitud máxima de campos

### Personalizar

Editar textos en `src/components/Contact.tsx`:

```tsx
const translations = {
  es: {
    /* textos en español */
  },
  en: {
    /* textos en inglés */
  },
};
```

---

## 📅 Sistema de Citas (Cal.com)

### Botón de Booking

El botón "Agendar Reunión" enlaza a Cal.com:

- **URL**: `https://cal.com/matias-gomez-ugzqgi`
- **Componente**: `src/components/BookingButton.tsx`

### Configurar en Cal.com

1. Ir a https://cal.com
2. Crear cuenta con username deseado
3. Configurar event types (15min, 30min, 45min)
4. Conectar Google Calendar en Settings → Integrations
5. Configurar disponibilidad en Settings → Availability

### Actualizar URL

Si cambia el username de Cal.com, actualizar en:

- `src/components/BookingButton.tsx` (línea 34)
- `src/components/Contact.tsx` (línea 293)

---

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run start        # Iniciar servidor (alias de dev)

# Producción
npm run build        # Build para producción
npm run preview      # Preview del build

# Calidad de código
npm run lint         # ESLint + Prettier
npm run typecheck    # TypeScript check

# Astro
npm run astro        # CLI de Astro
```

---

## ✅ Checklist de Deployment

- [ ] Variables de entorno configuradas en Vercel
- [ ] API Key de Resend configurada
- [ ] CONTACT_EMAIL correcto
- [ ] PUBLIC_SITE_URL correcto (sin trailing slash)
- [ ]dominio configurado en Vercel (Settings → Domains)
- [ ] SSL automático habilitado (Vercel lo provee)
- [ ] Probar formulario de contacto
- [ ] Probar link de Cal.com
- [ ] Verificar sitemap en `/sitemap-index.xml`
- [ ] Verificar SEO en https://seo analyzer

---

## 🔐 Seguridad

### Medidas Implementadas

- Rate limiting en API de contacto (3 req/min)
- Sanitización de HTML en inputs
- Validación de email en backend
- Variables de entorno nunca committeadas
- Headers de seguridad (CSP, X-Frame-Options, etc.)

### Recomendaciones

1. **Regenerar API Keys** periódicamente
2. **2FA** habilitado en cuentas vinculadas (Google, Resend)
3. **Monitorear** logs de Vercel regularmente
4. **Actualizar** dependencias mensualmente

---

## 📱 SEO

### Meta Tags Incluidas

- Title, Description
- Canonical URL
- Open Graph (Facebook, WhatsApp)
- Twitter Card
- Robots (index, follow)
- Theme color (mobile)

### Sitemap

Generado automáticamente por `@astrojs/sitemap` en `/sitemap-index.xml`

### Robots.txt

En `public/robots.txt` con referencia al sitemap

---

## 🎨 Personalización

### Colores

Editar `tailwind.config.mjs`:

```js
colors: {
  background: '#0A0A0F',  // Fondo principal
  surface: '#12121A',     // Superficies
  accent: '#2563EB',      // Azul principal
  'accent-cyan': '#06B6D4' // Cyan
}
```

### Fuentes

El proyecto usa:

- **Syne** - Headings (Google Fonts)
- **DM Sans** - Body (Google Fonts)

Cambiar en `tailwind.config.mjs` y `src/layouts/Layout.astro`

---

## 🐛 Troubleshooting

### Error: RESEND_API_KEY not configured

1. Verificar que la variable esté en Vercel
2. Revisar que el valor sea correcto (no tenga espacios)
3. Hacer redeploy después de cambiar variables

### Error: Formulario no envía

1. Verificar consola del navegador
2. Revisar logs de Vercel (Functions → Logs)
3. Verificar rate limiting (429 Too Many Requests)

### Cambios no se ven en producción

1. Verificar que el build fue exitoso
2. Hacer hard refresh (Cmd+Shift+R)
3. Verificar que no haya error en build

---

## 📄 Licencia

MIT - Usar freely para propósitos educativos o comerciales.

---

## 🤝 Créditos

- Icons: [Lucide React](https://lucide.dev)
- Animations: [Framer Motion](https://www.framer.com/motion/)
- Fonts: [Google Fonts](https://fonts.google.com)
- Hosting: [Vercel](https://vercel.com)
- Emails: [Resend](https://resend.com)
- Scheduling: [Cal.com](https://cal.com)
