import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

const typeColors: Record<string, string> = {
  Freelance: 'bg-accent/20 text-accent',
  Personal: 'bg-accent-cyan/20 text-accent-cyan',
  Trabajo: 'bg-purple-500/20 text-purple-400',
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredProjects =
    activeFilter === 'Todos' ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="proyectos" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-12">
          Proyectos <span className="text-accent-cyan">Destacados</span>
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveFilter('Todos')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === 'Todos'
                ? 'bg-accent text-white'
                : 'bg-surface-2 text-text-secondary hover:text-text-primary'
            }`}
          >
            Todos
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === tag
                  ? 'bg-accent text-white'
                  : 'bg-surface-2 text-text-secondary hover:text-text-primary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06, type: 'spring', stiffness: 120 }}
                whileHover={{ y: -8 }}
                className="glass-panel bg-surface-2/90 border border-border rounded-xl p-6 hover:border-accent-cyan transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-text-secondary">{project.year}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      typeColors[project.type] || 'bg-surface text-text-secondary'
                    }`}
                  >
                    {project.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
                  {project.title}
                </h3>

                <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-background text-text-secondary text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-cyan text-sm font-medium hover:underline"
                    >
                      Ver demo
                    </a>
                  ) : (
                    <span className="text-text-secondary text-sm">Demo pronto</span>
                  )}
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-sm font-medium hover:text-text-primary"
                    >
                      Ver código
                    </a>
                  ) : (
                    <span className="text-text-secondary text-sm">Código privado</span>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
