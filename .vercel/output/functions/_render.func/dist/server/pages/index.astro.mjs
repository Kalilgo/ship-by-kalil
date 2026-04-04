/* empty css                                 */
import { e as createComponent, g as addAttribute, k as renderHead, l as renderSlot, r as renderTemplate, h as createAstro, m as maybeRenderHead, n as renderScript, o as renderComponent } from '../chunks/astro/server_Cl90dAzA.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Mat\xEDas Kalil G\xF3mez \u2014 Full Stack Developer",
    description = "Desarrollador Web Full Stack especializado en React, Astro, .NET y AWS. Disponible para proyectos freelance."
  } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="/og-image.png"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"><link rel="icon" type="image/svg+xml" href="/favicon.svg">${renderHead()}</head> <body class="bg-background text-text-primary font-body antialiased"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/matiasgomez/Developer/Portfolio/src/layouts/Layout.astro", void 0);

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const navLinks = [
    { label: "Sobre m\xED", href: "#sobre-mi" },
    { label: "Skills", href: "#skills" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Experiencia", href: "#experiencia" },
    { label: "Contacto", href: "#contacto" }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"> <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"> <a href="#" class="text-2xl font-bold font-heading text-text-primary">
MKG<span class="text-accent-cyan">.</span> </a> <div class="hidden md:flex items-center gap-8"> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="text-text-secondary hover:text-text-primary transition-colors"> ${link.label} </a>`)} <a href="/cv-matias-kalil.pdf" download class="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
Descargar CV
</a> </div> <button id="mobile-menu-toggle" class="md:hidden p-2 text-text-primary" aria-label="Toggle menu"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="3" y1="6" x2="21" y2="6"></line> <line x1="3" y1="12" x2="21" y2="12"></line> <line x1="3" y1="18" x2="21" y2="18"></line> </svg> </button> </div> <div id="mobile-menu" class="hidden md:hidden bg-surface border-t border-border"> <div class="px-6 py-4 flex flex-col gap-4"> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="text-text-secondary hover:text-text-primary py-2"> ${link.label} </a>`)} <a href="/cv-matias-kalil.pdf" download class="px-4 py-2 bg-accent text-white rounded-lg text-center">
Descargar CV
</a> </div> </div> </nav> ${renderScript($$result, "/Users/matiasgomez/Developer/Portfolio/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/matiasgomez/Developer/Portfolio/src/components/Navbar.astro", void 0);

const $$Astro = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Hero;
  return renderTemplate`${maybeRenderHead()}<section class="min-h-screen flex items-center pt-20"> <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"> <div class="space-y-6"> <div class="inline-flex items-center gap-2 px-4 py-2 bg-surface-2 rounded-full"> <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> <span class="text-text-secondary">Disponible para proyectos</span> </div> <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-text-primary leading-tight">
Matías Kalil<br> <span class="text-accent">Gómez</span> </h1> <p class="text-xl text-text-secondary">Desarrollador Web Full Stack</p> <p class="text-lg text-text-secondary max-w-lg">
Construyo aplicaciones web modernas para el sector financiero e inmobiliario.
        Especializado en React, Astro, .NET y AWS.
</p> <div class="flex flex-wrap gap-4"> <a href="#proyectos" class="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
Ver proyectos
</a> <a href="#contacto" class="px-6 py-3 border border-border text-text-primary rounded-lg hover:border-accent-cyan hover:text-accent-cyan transition-colors">
Contactarme
</a> </div> <div class="flex items-center gap-4 pt-4"> <a href="https://github.com/matiaskalil" target="_blank" rel="noopener noreferrer" class="p-2 text-text-secondary hover:text-text-primary transition-colors" aria-label="GitHub"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path> </svg> </a> <a href="https://linkedin.com/in/matiaskalil" target="_blank" rel="noopener noreferrer" class="p-2 text-text-secondary hover:text-text-primary transition-colors" aria-label="LinkedIn"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path> </svg> </a> <a href="mailto:gomezukalil@gmail.com" class="p-2 text-text-secondary hover:text-text-primary transition-colors" aria-label="Email"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path> <polyline points="22,6 12,13 2,6"></polyline> </svg> </a> </div> </div> <div class="hidden md:block relative"> <div class="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent-cyan/20 blur-3xl"></div> <div class="relative bg-surface-2 border border-border rounded-xl p-6 font-mono text-sm"> <div class="flex gap-2 mb-4"> <span class="w-3 h-3 rounded-full bg-red-500"></span> <span class="w-3 h-3 rounded-full bg-yellow-500"></span> <span class="w-3 h-3 rounded-full bg-green-500"></span> </div> <pre class="text-accent-cyan overflow-x-auto"><code><span class="text-text-secondary">${"const"}</span> developer = ${"{"}
  name: <span class="text-accent">"Matías Kalil Gómez"</span>,
  stack: [<span class="text-accent">"React"</span>, <span class="text-accent">"Astro"</span>, <span class="text-accent">".NET"</span>],
  passion: <span class="text-accent">"building products that work"</span>
${"}"};</code></pre> </div> </div> </div> </section>`;
}, "/Users/matiasgomez/Developer/Portfolio/src/components/Hero.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  const highlights = [
    { icon: "\u{1F4CD}", text: "San Miguel, Buenos Aires" },
    { icon: "\u{1F393}", text: "Lic. en Sistemas \u2014 UNGS (en curso)" },
    { icon: "\u{1F4BC}", text: "Freelance \xB7 Disponible" }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="sobre-mi" class="py-20 bg-surface"> <div class="max-w-6xl mx-auto px-6"> <h2 class="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-12">
Sobre <span class="text-accent-cyan">mí</span> </h2> <div class="grid md:grid-cols-2 gap-12 items-start"> <div class="flex flex-col items-center"> <div class="w-48 h-48 rounded-full bg-surface-2 border-2 border-accent-cyan flex items-center justify-center text-4xl font-heading text-accent-cyan">
MKG
</div> </div> <div class="space-y-6"> <p class="text-lg text-text-secondary leading-relaxed">
Soy un desarrollador Full Stack basado en San Miguel, Buenos Aires. Trabajo con
          equipos freelance desarrollando soluciones para financieras e inmobiliarias. Me
          apasiona construir productos que realmente funcionen, usar las mejores herramientas
          disponibles y seguir aprendiendo.
</p> <div class="grid sm:grid-cols-3 gap-4 pt-4"> ${highlights.map((item) => renderTemplate`<div class="flex items-center gap-2 text-text-secondary"> <span>${item.icon}</span> <span class="text-sm">${item.text}</span> </div>`)} </div> </div> </div> </div> </section>`;
}, "/Users/matiasgomez/Developer/Portfolio/src/components/About.astro", void 0);

const experience = [
  {
    period: "2024 — Presente",
    role: "Desarrollador Web Full Stack",
    company: "Equipo Freelance Independiente",
    description: "Desarrollo de aplicaciones web para el sector financiero e inmobiliario. Trabajo en equipo con metodologías ágiles.",
    tech: ["React", "Astro", "C#", ".NET", "AWS", "PostgreSQL"],
    current: true
  },
  {
    period: "2021 — Presente",
    role: "Diplomatura en Programación .NET",
    company: "Universidad Tecnológica Nacional",
    description: "Formación en desarrollo con tecnología .NET Core, C#, MVC y SQL Server.",
    tech: ["C#", ".NET Core", "SQL Server"],
    current: false
  },
  {
    period: "2019 — Presente",
    role: "Lic. en Sistemas (en curso)",
    company: "Universidad Nacional de General Sarmiento",
    description: "Carrera universitaria orientada al desarrollo de software y sistemas de información.",
    tech: [],
    current: false
  }
];

const $$Experience = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="experiencia" class="py-20"> <div class="max-w-6xl mx-auto px-6"> <h2 class="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-12">
Experiencia & <span class="text-accent-cyan">Formación</span> </h2> <div class="relative"> <div class="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2"></div> <div class="space-y-12"> ${experience.map((item, index) => renderTemplate`<div${addAttribute(`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`, "class")}> <div class="absolute left-4 md:left-1/2 w-3 h-3 bg-accent-cyan rounded-full transform -translate-x-1/2 mt-6"></div> <div class="ml-12 md:ml-0 md:w-1/2 p-6 bg-surface-2 border border-border rounded-xl hover:border-accent-cyan transition-colors"> <div class="flex items-center gap-2 mb-2"> ${item.current && renderTemplate`<span class="px-2 py-1 bg-accent/20 text-accent text-xs rounded">Actual</span>`} </div> <h3 class="text-lg font-bold font-heading text-text-primary mb-1"> ${item.role} </h3> <p class="text-accent-cyan text-sm mb-2">${item.company}</p> <p class="text-text-secondary text-sm mb-4">${item.description}</p> <div class="flex flex-wrap gap-2"> ${item.tech.map((tech) => renderTemplate`<span class="px-2 py-1 bg-background text-text-secondary text-xs rounded"> ${tech} </span>`)} </div> <p class="text-text-secondary text-sm mt-4 font-medium">${item.period}</p> </div> </div>`)} </div> </div> </div> </section>`;
}, "/Users/matiasgomez/Developer/Portfolio/src/components/Experience.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="py-8 border-t border-border"> <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4"> <p class="text-text-secondary text-sm">
© ${currentYear} Matías Kalil Gómez. Todos los derechos reservados.
</p> <div class="flex items-center gap-4"> <a href="https://github.com/matiaskalil" target="_blank" rel="noopener noreferrer" class="text-text-secondary hover:text-text-primary transition-colors" aria-label="GitHub"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path> </svg> </a> <a href="https://linkedin.com/in/matiaskalil" target="_blank" rel="noopener noreferrer" class="text-text-secondary hover:text-text-primary transition-colors" aria-label="LinkedIn"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"> <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path> </svg> </a> <a href="mailto:gomezukalil@gmail.com" class="text-text-secondary hover:text-text-primary transition-colors" aria-label="Email"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path> <polyline points="22,6 12,13 2,6"></polyline> </svg> </a> </div> </div> </footer>`;
}, "/Users/matiasgomez/Developer/Portfolio/src/components/Footer.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "About", $$About, {})} ${renderComponent($$result2, "Skills", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/matiasgomez/Developer/Portfolio/src/components/Skills", "client:component-export": "default" })} ${renderComponent($$result2, "Projects", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/matiasgomez/Developer/Portfolio/src/components/Projects", "client:component-export": "default" })} ${renderComponent($$result2, "Experience", $$Experience, {})} ${renderComponent($$result2, "Contact", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/matiasgomez/Developer/Portfolio/src/components/Contact", "client:component-export": "default" })} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/matiasgomez/Developer/Portfolio/src/pages/index.astro", void 0);

const $$file = "/Users/matiasgomez/Developer/Portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
