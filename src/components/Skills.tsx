import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { skills } from '../data/skills';
import { staggerDelay } from '../lib/motion';

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
  isTabVisible: boolean;
  reducedMotion: boolean | null;
}

const translations = {
  es: {
    title: 'Skills & ',
    titleHighlight: 'Tecnologías',
  },
  en: {
    title: 'Skills & ',
    titleHighlight: 'Technologies',
  },
};

function SkillBar({ name, level, index, isTabVisible, reducedMotion }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <div className="space-y-2" ref={ref}>
      <div className="flex justify-between text-sm">
        <span className="text-text-primary">{name}</span>
        <span className="text-text-secondary">{level}%</span>
      </div>
      <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView && isTabVisible ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.8,
            delay: staggerDelay(index, 0.1, reducedMotion),
          }}
          className="h-full bg-gradient-to-r from-accent to-accent-cyan rounded-full shadow-[0_0_12px_-4px_rgba(6,182,212,0.4)]"
        />
      </div>
    </div>
  );
}

interface SkillsProps {
  locale?: 'es' | 'en';
}

export default function Skills({ locale = 'es' }: SkillsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const t = translations[locale];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-12">
          {t.title}
          <span className="text-accent-cyan">{t.titleHighlight}</span>
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {skills.map((category, index) => (
            <button
              type="button"
              key={category.name}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                activeTab === index
                  ? 'bg-accent text-white shadow-[0_0_28px_-10px_rgba(37,99,235,0.65)]'
                  : 'bg-surface-2 text-text-secondary hover:text-text-primary border border-transparent hover:border-border'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: prefersReducedMotion ? 6 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? -6 : -20 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.3 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {skills[activeTab].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: prefersReducedMotion ? 8 : 20, scale: prefersReducedMotion ? 1 : 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.2 }
                    : {
                        duration: 0.45,
                        delay: staggerDelay(index, 0.07, prefersReducedMotion),
                        type: 'spring',
                        stiffness: 130,
                      }
                }
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                className="glass-panel border border-border rounded-xl p-4 hover-lift"
              >
                <SkillBar {...skill} index={index} isTabVisible={true} reducedMotion={prefersReducedMotion} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
