import { j as e, m as c } from './proxy.Ce3DUqBB.js';
import { r as o } from './index.DYrVU9rO.js';
import { A as l } from './index.D1eonDqi.js';
const s = [
    {
      id: 1,
      title: 'Sistema de Gestión Financiera',
      description:
        'Aplicación web para gestión de créditos y cobranzas para una financiera. Panel de control con métricas en tiempo real, gestión de clientes y generación de reportes.',
      tags: ['React', 'C#', '.NET', 'SQL Server', 'AWS'],
      type: 'Freelance',
      year: '2024',
      featured: !0,
    },
    {
      id: 2,
      title: 'Portal Inmobiliario',
      description:
        'Plataforma web para listado y búsqueda de propiedades con filtros avanzados, galería de imágenes y formulario de contacto integrado.',
      tags: ['Astro', 'React', 'PostgreSQL', 'Vercel'],
      type: 'Freelance',
      year: '2024',
      featured: !0,
    },
    {
      id: 3,
      title: 'API REST de Inventario',
      description:
        'Backend RESTful para manejo de inventario con autenticación JWT, roles de usuario y documentación automática con Swagger.',
      tags: ['C#', '.NET Core', 'SQL Server', 'Railway'],
      type: 'Personal',
      year: '2023',
      featured: !1,
    },
  ],
  d = Array.from(new Set(s.flatMap((a) => a.tags)));
function u() {
  const [a, r] = o.useState('Todos'),
    i = a === 'Todos' ? s : s.filter((t) => t.tags.includes(a));
  return e.jsx('section', {
    id: 'proyectos',
    className: 'py-20 bg-surface',
    children: e.jsxs('div', {
      className: 'max-w-6xl mx-auto px-6',
      children: [
        e.jsxs('h2', {
          className: 'text-3xl md:text-4xl font-bold font-heading text-text-primary mb-12',
          children: [
            'Proyectos ',
            e.jsx('span', { className: 'text-accent-cyan', children: 'Destacados' }),
          ],
        }),
        e.jsxs('div', {
          className: 'flex flex-wrap gap-2 mb-8',
          children: [
            e.jsx('button', {
              onClick: () => r('Todos'),
              className: `px-4 py-2 rounded-lg text-sm font-medium transition-all ${a === 'Todos' ? 'bg-accent text-white' : 'bg-surface-2 text-text-secondary hover:text-text-primary'}`,
              children: 'Todos',
            }),
            d.map((t) =>
              e.jsx(
                'button',
                {
                  onClick: () => r(t),
                  className: `px-4 py-2 rounded-lg text-sm font-medium transition-all ${a === t ? 'bg-accent text-white' : 'bg-surface-2 text-text-secondary hover:text-text-primary'}`,
                  children: t,
                },
                t
              )
            ),
          ],
        }),
        e.jsx(c.div, {
          layout: !0,
          className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
          children: e.jsx(l, {
            children: i.map((t) =>
              e.jsxs(
                c.article,
                {
                  layout: !0,
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.9 },
                  transition: { duration: 0.3 },
                  className:
                    'bg-surface-2 border border-border rounded-xl p-6 hover:border-accent-cyan transition-colors group',
                  children: [
                    e.jsxs('div', {
                      className: 'flex items-center justify-between mb-4',
                      children: [
                        e.jsx('span', {
                          className: 'text-sm text-text-secondary',
                          children: t.year,
                        }),
                        e.jsx('span', {
                          className: `px-2 py-1 rounded text-xs font-medium ${t.type === 'Freelance' ? 'bg-accent/20 text-accent' : 'bg-accent-cyan/20 text-accent-cyan'}`,
                          children: t.type,
                        }),
                      ],
                    }),
                    e.jsx('h3', {
                      className:
                        'text-xl font-bold font-heading text-text-primary mb-2 group-hover:text-accent-cyan transition-colors',
                      children: t.title,
                    }),
                    e.jsx('p', {
                      className: 'text-text-secondary text-sm mb-4 line-clamp-3',
                      children: t.description,
                    }),
                    e.jsx('div', {
                      className: 'flex flex-wrap gap-2 mb-4',
                      children: t.tags.map((n) =>
                        e.jsx(
                          'span',
                          {
                            className:
                              'px-2 py-1 bg-background text-text-secondary text-xs rounded',
                            children: n,
                          },
                          n
                        )
                      ),
                    }),
                    e.jsxs('div', {
                      className: 'flex gap-4',
                      children: [
                        e.jsx('button', {
                          className: 'text-accent-cyan text-sm font-medium hover:underline',
                          children: 'Ver demo',
                        }),
                        e.jsx('button', {
                          className:
                            'text-text-secondary text-sm font-medium hover:text-text-primary',
                          children: 'Ver código',
                        }),
                      ],
                    }),
                  ],
                },
                t.id
              )
            ),
          }),
        }),
      ],
    }),
  });
}
export { u as default };
