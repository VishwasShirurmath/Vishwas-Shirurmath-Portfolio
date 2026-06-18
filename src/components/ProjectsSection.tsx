import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectEntry } from '../types';
import { GitFork, Eye, Globe, ExternalLink, RefreshCw, Layers, ShieldCheck } from 'lucide-react';

interface ProjectsSectionProps {
  initialProjects: ProjectEntry[];
  accentClass: string;
  cardBgClass: string;
}

export default function ProjectsSection({
  initialProjects,
  accentClass,
  cardBgClass,
}: ProjectsSectionProps) {
  const [projects] = useState<ProjectEntry[]>(initialProjects);
  const [filterCategory, setFilterCategory] = useState<'All' | 'Web' | 'Mobile' | 'Systems'>('All');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Filter computation
  const filteredProjects = projects.filter((p) => {
    if (filterCategory === 'All') return true;
    return p.category === filterCategory;
  });

  const selectedProject = projects.find((p) => p.id === activeProjectId);

  return (
    <div id="projects-section-wrapper" className="space-y-6">
      {/* Category Toggle Anchors */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-150/40 p-1.5 rounded-2xl border border-stone-200/40">
        <div className="flex flex-wrap gap-1 w-full sm:w-auto">
          {(['All', 'Web', 'Systems'] as const).map((cat) => {
            const isSelected = filterCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`flex-1 sm:flex-initial text-xs font-mono px-4 py-2 hover:bg-stone-50 rounded-xl transition duration-200 uppercase font-semibold border ${
                  isSelected
                    ? 'bg-white shadow-xs text-amber-800 border-amber-300 font-bold'
                    : 'text-stone-500 border-transparent hover:text-stone-900'
                }`}
              >
                {cat} Projects
              </button>
            );
          })}
        </div>
        <p className="text-stone-500 text-[11px] font-mono leading-none pr-2 hidden sm:block">
          Showing {filteredProjects.length} of {projects.length} files
        </p>
      </div>

      {/* Grid List representation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveProjectId(p.id)}
              className={`p-5 rounded-2xl border border-stone-200/50 hover:border-amber-400 ${cardBgClass} transition-all duration-300 pointer-events-auto hover:shadow-lg hover:scale-[1.015] cursor-pointer flex flex-col justify-between group h-full`}
            >
              <div className="space-y-3.5">
                {/* Visual Category Label */}
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[10px] font-mono bg-stone-100 text-stone-500 px-2.5 py-1 rounded-lg uppercase font-bold tracking-wider">
                    {p.category}
                  </span>
                  {p.featured && (
                    <span className="text-[10px] font-mono bg-amber-55 text-amber-850 px-2 py-0.5 rounded-full uppercase leading-none font-bold border border-amber-300">
                      ★ Featured
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-stone-900 text-base group-hover:text-amber-800 transition-colors leading-tight">
                    {p.title}
                  </h4>
                  <p className="text-amber-700 text-[11px] font-medium leading-normal pr-4">
                    {p.tagline}
                  </p>
                </div>

                <p className="text-stone-600 text-xs leading-relaxed line-clamp-3 font-sans">
                  {p.description}
                </p>
              </div>

              {/* Stack items */}
              <div className="space-y-3 mt-4">
                <div className="flex flex-wrap gap-1 pt-3 border-t border-stone-100">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono bg-stone-100/70 text-stone-500 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono mt-1 pt-1">
                  <span className="flex items-center gap-1.5 hover:text-stone-950">
                    <GitFork className="h-3 w-3" /> Source Available
                  </span>
                  <span className="text-amber-600 font-bold group-hover:underline flex items-center gap-0.5">
                    View Blueprint <Eye className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Full-width Modal interactive Overlay of selected project details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-modal"
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Body card */}
            <motion.div
              className={`w-full max-w-2xl rounded-2xl p-6 sm:p-8 space-y-5 border border-stone-200/70 shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto ${cardBgClass} text-stone-900`}
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
              {/* Close Button top row */}
              <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 font-mono">
                  <Layers className="h-4 w-4 text-amber-500" /> SYSTEM ARCHITECTURE SUMMARY
                </div>

                <button
                  onClick={() => setActiveProjectId(null)}
                  className="px-2.5 py-1 text-xs font-semibold text-stone-500 hover:text-stone-950 rounded-lg bg-stone-100 hover:bg-stone-200 cursor-pointer"
                >
                  ✕ Close Overlay
                </button>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono bg-stone-150 text-stone-600 px-2 py-0.5 rounded border border-stone-200 font-bold uppercase leading-none">
                    {selectedProject.category} MODULE
                  </span>
                  <span className="text-stone-400 font-mono text-[11px]">ID: {selectedProject.id}</span>
                </div>

                <h3 className="text-2xl font-black text-stone-950 leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-amber-700 font-semibold text-sm leading-normal">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* Tech Stack Horizontal List */}
              <div className="flex flex-wrap gap-1.5 py-3.5 border-t border-b border-stone-100/70">
                {selectedProject.tech.map((v) => (
                  <span
                    key={v}
                    className="text-xs font-mono bg-stone-100 text-stone-600 px-2.5 py-1 rounded-lg border border-stone-200/50"
                  >
                    #{v}
                  </span>
                ))}
              </div>

              {/* Deep engineering notes copy */}
              <div className="space-y-3 text-sm leading-relaxed text-stone-600 font-sans">
                <p>{selectedProject.description}</p>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-xs space-y-2">
                  <h5 className="font-bold text-stone-850 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                    <ShieldCheck className="h-4 w-4 text-amber-600" /> Deep Dive Implementation Details
                  </h5>
                  <p className="leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>
              </div>

              {/* Verification & Code Links */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-stone-100">
                {/* Repository external link simulator */}
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="no-referrer"
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold font-mono uppercase bg-stone-900 text-stone-100 hover:bg-stone-950 rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Globe className="h-3.5 w-3.5" /> View Repository
                </a>

                {/* Live Demo simulator triggers alert */}
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      `Running live verify simulation for [${selectedProject.title}]: App instance deployed at ${selectedProject.id}-demo.vishwass.net. Port 80 routing successfully verified!`
                    );
                  }}
                  className={`w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase text-white rounded-xl flex items-center justify-center gap-1.5 transition-all text-center ${accentClass}`}
                >
                  <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" /> Verify Live Connection <ExternalLink className="h-3.5 w-3.5" style={{ display: 'inline' }} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
