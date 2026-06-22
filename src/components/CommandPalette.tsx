import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Globe, FileText, Github, Linkedin, Mail, Calendar } from 'lucide-react';
import { projects } from '../data/projects';
import type { Locale } from '../i18n';

interface Props {
  locale: Locale;
}

interface CommandItem {
  id: string;
  label: string;
  category: 'nav' | 'project' | 'action';
  keywords: string[];
  action: () => void;
}

export default function CommandPalette({ locale }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items: CommandItem[] = [
    ...(locale === 'es'
      ? [
          { id: 'about', label: 'Sobre mí', category: 'nav' as const, keywords: ['sobre mi', 'about', 'bio'], action: () => scrollToSection('sobre-mi') },
          { id: 'skills', label: 'Skills', category: 'nav' as const, keywords: ['habilidades', 'tecnologias', 'tech'], action: () => scrollToSection('skills') },
          { id: 'projects', label: 'Proyectos', category: 'nav' as const, keywords: ['proyectos', 'trabajos', 'portfolio'], action: () => scrollToSection('proyectos') },
          { id: 'experience', label: 'Experiencia', category: 'nav' as const, keywords: ['experiencia', 'trayectoria', 'cv'], action: () => scrollToSection('experiencia') },
          { id: 'contact', label: 'Contacto', category: 'nav' as const, keywords: ['contacto', 'email', 'mensaje'], action: () => scrollToSection('contacto') },
        ]
      : [
          { id: 'about', label: 'About me', category: 'nav' as const, keywords: ['about', 'bio'], action: () => scrollToSection('sobre-mi') },
          { id: 'skills', label: 'Skills', category: 'nav' as const, keywords: ['skills', 'technologies', 'tech'], action: () => scrollToSection('skills') },
          { id: 'projects', label: 'Projects', category: 'nav' as const, keywords: ['projects', 'portfolio', 'work'], action: () => scrollToSection('proyectos') },
          { id: 'experience', label: 'Experience', category: 'nav' as const, keywords: ['experience', 'career', 'cv'], action: () => scrollToSection('experiencia') },
          { id: 'contact', label: 'Contact', category: 'nav' as const, keywords: ['contact', 'email', 'message'], action: () => scrollToSection('contacto') },
        ]),
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      label: p.title,
      category: 'project' as const,
      keywords: [p.title.toLowerCase(), ...p.tags.map((t) => t.toLowerCase())],
      action: () => {
        const el = document.getElementById('proyectos');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.dispatchEvent(new CustomEvent('portfolio:focus-project', { detail: { id: p.id } }));
        }
      },
    })),
    {
      id: 'lang',
      label: locale === 'es' ? 'Switch to English' : 'Cambiar a Español',
      category: 'action' as const,
      keywords: ['idioma', 'language', 'lang', 'english', 'spanish', 'español', 'ingles'],
      action: () => {
        const altHref = document
          .querySelector(`[data-set-locale="${locale === 'es' ? 'en' : 'es'}"]`)
          ?.getAttribute('href');
        if (altHref) {
          try { sessionStorage.setItem('portfolio-locale-scroll-y', String(window.scrollY)); } catch {}
          window.location.href = altHref;
        }
      },
    },
    {
      id: 'cv',
      label: locale === 'es' ? 'Descargar CV' : 'Download CV',
      category: 'action' as const,
      keywords: ['cv', 'curriculum', 'resume', 'pdf', 'descargar', 'download'],
      action: () => { window.location.href = locale === 'en' ? '/en/cv' : '/cv'; },
    },
    {
      id: 'github',
      label: 'GitHub',
      category: 'action' as const,
      keywords: ['github', 'codigo', 'code', 'repo', 'repositorio', 'repository'],
      action: () => { window.open('https://github.com/Kalilgo', '_blank', 'noopener'); },
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      category: 'action' as const,
      keywords: ['linkedin', 'perfil', 'profile'],
      action: () => { window.open('https://www.linkedin.com/in/matias-gomez-19a1912a5/', '_blank', 'noopener'); },
    },
    {
      id: 'email',
      label: locale === 'es' ? 'Enviar email' : 'Send email',
      category: 'action' as const,
      keywords: ['email', 'mail', 'gmail', 'contacto', 'contact'],
      action: () => { window.location.href = 'mailto:gomezukalil@gmail.com'; },
    },
    {
      id: 'calendar',
      label: locale === 'es' ? 'Agendar reunión' : 'Schedule meeting',
      category: 'action' as const,
      keywords: ['calendly', 'calendar', 'reunion', 'meeting', 'schedule', 'agendar'],
      action: () => { window.open('https://cal.com/matias-kalil-gomez', '_blank', 'noopener'); },
    },
  ];

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    closePalette();
  }

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const filtered = query.trim()
    ? items.filter((item) => {
        const q = query.toLowerCase();
        return item.label.toLowerCase().includes(q) || item.keywords.some((k) => k.includes(q));
      })
    : items;

  if (filtered.length > 0 && selectedIndex >= filtered.length) {
    setSelectedIndex(0);
  }

  const categories = [...new Set(filtered.map((i) => i.category))];
  const categoryLabels: Record<string, string> =
    locale === 'es'
      ? { nav: 'Navegación', project: 'Proyectos', action: 'Acciones' }
      : { nav: 'Navigation', project: 'Projects', action: 'Actions' };

  const actionIcons: Record<string, React.ReactNode> = {
    github: <Github className="w-4 h-4" />,
    linkedin: <Linkedin className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
    calendar: <Calendar className="w-4 h-4" />,
    cv: <FileText className="w-4 h-4" />,
    lang: <Globe className="w-4 h-4" />,
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePalette();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(filtered.length, 1));
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, filtered, selectedIndex, closePalette]);

  useEffect(() => {
    if (!listRef.current || !filtered[selectedIndex]) return;
    const el = listRef.current.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex, filtered]);

  function getItemIcon(item: CommandItem): React.ReactNode {
    if (item.category === 'project') return <span className="text-xs">{'📁'}</span>;
    if (item.category === 'action') return actionIcons[item.id] || <Globe className="w-4 h-4" />;
    return <ArrowRight className="w-3.5 h-3.5" />;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-start justify-center pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closePalette();
          }}
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

          <motion.div
            className="relative z-10 w-full max-w-lg mx-4 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label={locale === 'es' ? 'Buscador rápido' : 'Quick search'}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="w-4 h-4 shrink-0 text-text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={locale === 'es' ? 'Navegá rápido...' : 'Quick navigate...'}
                className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] font-mono text-text-muted">
                <span className="text-[9px]">&#8984;</span>K
              </kbd>
            </div>

            <div
              ref={listRef}
              className="max-h-[min(60vh,400px)] overflow-y-auto overscroll-contain py-2"
            >
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-text-muted">
                  {locale === 'es' ? 'Sin resultados para' : 'No results for'}
                  {' "'}
                  {query}
                  '"'
                </div>
              )}

              {categories.map((cat) => (
                <div key={cat}>
                  <div className="flex items-center gap-2 px-4 py-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                      {categoryLabels[cat]}
                    </span>
                    <span className="h-px flex-1 bg-border/60" />
                  </div>
                  {filtered
                    .filter((i) => i.category === cat)
                    .map((item, idx) => {
                      const globalIdx = filtered.indexOf(item);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                            globalIdx === selectedIndex
                              ? 'bg-accent-cyan/10 text-accent-cyan'
                              : 'text-text-primary hover:bg-surface-2'
                          }`}
                          onClick={() => item.action()}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2/60">
                            {getItemIcon(item)}
                          </span>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.category === 'project' && (
                            <span className="shrink-0 text-[10px] text-text-muted">
                              {item.keywords.slice(1, 3).join(', ')}
                            </span>
                          )}
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-4 border-t border-border px-4 py-2 text-[10px] text-text-muted">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-surface-2 px-1 py-0.5 font-mono">&#8593;&#8595;</kbd>
                <span>{locale === 'es' ? 'Navegar' : 'Navigate'}</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-surface-2 px-1 py-0.5 font-mono">&#8629;</kbd>
                <span>{locale === 'es' ? 'Seleccionar' : 'Select'}</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-surface-2 px-1 py-0.5 font-mono">esc</kbd>
                <span>{locale === 'es' ? 'Cerrar' : 'Close'}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
