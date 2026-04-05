import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { skills } from '../data/skills';

function SkeletonCard() {
  return (
    <div className="glass-panel border border-border rounded-xl p-4 animate-pulse">
      <div className="flex justify-between mb-2">
        <div className="w-20 h-4 bg-surface rounded" />
        <div className="w-10 h-4 bg-surface rounded" />
      </div>
      <div className="h-2 bg-surface rounded-full overflow-hidden">
        <div className="h-full w-2/3 bg-surface rounded-full" />
      </div>
    </div>
  );
}

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
  isTabVisible: boolean;
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

function SkillBar({ name, level, index, isTabVisible }: SkillBarProps) {
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
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="h-full bg-gradient-to-r from-accent to-accent-cyan rounded-full"
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
  const [isLoading, setIsLoading] = useState(true);

  const t = translations[locale];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

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
              key={category.name}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === index
                  ? 'bg-accent text-white'
                  : 'bg-surface-2 text-text-secondary hover:text-text-primary'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              skills[activeTab].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                    type: 'spring',
                    stiffness: 130,
                  }}
                  whileHover={{ y: -4 }}
                  className="glass-panel border border-border rounded-xl p-4 hover-lift"
                >
                  <SkillBar {...skill} index={index} isTabVisible={true} />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
