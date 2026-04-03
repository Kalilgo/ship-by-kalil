# AGENTS.md - Portfolio Project Guidelines

## Project Overview

Astro-based portfolio for Matías Kalil Gómez (Full Stack Developer). Stack: Astro 4, React 18, Tailwind 3, Framer Motion 11, TypeScript 5, Vercel.

---

## Build Commands

```bash
npm run dev         # Development server
npm run build       # Production build
npm run preview     # Preview production build
npm run lint        # ESLint + Prettier
npx tsc --noEmit    # Type checking
```

**Single test execution:** This project does not have a test suite configured.

---

## Code Style Guidelines

### TypeScript
- Strict mode enabled - never use `any`, prefer `unknown` or proper typing
- Use explicit return types for exported functions
- Prefer interfaces over types for object shapes

### Imports
```typescript
// React components (client islands)
import Skills from '../components/Skills';

// Astro components (server-side)
import Navbar from '../components/Navbar.astro';

// Data files
import { projects } from '../data/projects';
```

### Component Patterns

**React (client islands):**
```typescript
import { motion } from 'framer-motion';

interface Props {
  title: string;
  items: Item[];
}

export default function Component({ title, items }: Props) {
  return <motion.div>{/* content */}</motion.div>;
}
```

**Astro:**
```astro
---
interface Props { title: string; }
const { title } = Astro.props;
---
<section><h1>{title}</h1><slot /></section>
```

### Naming Conventions
- Components: PascalCase (`Hero.astro`, `Skills.tsx`)
- Files: kebab-case (`contact-form.ts`)
- Variables: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Props interfaces: `ComponentNameProps`

### CSS / Tailwind
- Custom colors in tailwind.config.mjs: `background` (#0A0A0F), `surface`, `accent` (#2563EB), `accent-cyan` (#06B6D4)
- Fonts: `font-heading` (Syne), `font-body` (DM Sans)
- Use semantic class names for complex layouts

### Error Handling
- Always use `console.error()` for errors, never silence them
- Form submissions must handle loading/success/error states
- API routes return proper error responses

### Accessibility
- All images require `alt` text
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`
- Keyboard focus visible on interactive elements
- Respect `prefers-reduced-motion` for animations
- Proper ARIA labels on buttons and form inputs

---

## Project Structure

```
src/
├── components/
│   ├── ui/          # Button, Badge, SectionTitle
│   ├── Navbar.astro, Hero.astro, About.astro, Experience.astro, Footer.astro
│   ├── Skills.tsx   # React island (client:visible)
│   ├── Projects.tsx # React island (client:visible)
│   └── Contact.tsx  # React island (client:load)
├── data/            # projects.ts, skills.ts, experience.ts
├── layouts/         # Layout.astro
├── pages/
│   ├── index.astro
│   └── api/contact.ts
└── styles/global.css
```

### React Islands Pattern
```astro
<Skills client:visible />
<Projects client:visible />
<Contact client:load />
```

---

## Section Requirements

Each section MUST have an ID for smooth scrolling:
- `id="sobre-mi"` (About)
- `id="skills"` (Skills)
- `id="proyectos"` (Projects)
- `id="experiencia"` (Experience)
- `id="contacto"` (Contact)

---

## Configuration Files

- `astro.config.mjs` - Astro + React + Tailwind + Vercel adapter (output: 'server')
- `tailwind.config.mjs` - Custom colors, fonts, content paths
- `tsconfig.json` - Strict TypeScript
- `.eslintrc.cjs` / `.prettierrc` - Linting rules

---

## Commit Conventions

- `feat:` new feature
- `fix:` bug fix
- `refactor:` code refactoring
- `docs:` documentation
- `style:` formatting
- `chore:` maintenance

---

## Known Issues / Notes

- Form uses Resend API (requires `RESEND_API_KEY` env var)
- Contact form POSTs to `/api/contact`
- Vercel adapter for SSR
- Images: use placeholders until real assets available
- GitHub/LinkedIn are placeholders (github.com/matiaskalil)

---

## Deployment

Push to `main` triggers GitHub Actions CI (lint + build). Auto-deploys to Vercel.

Environment variables:
- `RESEND_API_KEY` - Resend API key
- `CONTACT_EMAIL` - Target email (gomezukalil@gmail.com)