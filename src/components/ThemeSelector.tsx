import { motion } from 'motion/react';
import { ThemePreset } from '../types';
import { Palette, Check, Sparkles } from 'lucide-react';

interface ThemeSelectorProps {
  presets: ThemePreset[];
  activePresetId: string;
  onSelect: (preset: ThemePreset) => void;
}

export default function ThemeSelector({ presets, activePresetId, onSelect }: ThemeSelectorProps) {
  return (
    <div className="w-full" id="theme-selector-panel">
      {/* Header Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
            <Palette className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              Select Your Website Design
              <span className="text-[10px] uppercase font-mono bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-full font-semibold">
                6 Choices
              </span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">Pick your favorite preset configuration in real-time.</p>
          </div>
        </div>

        <div className="self-start sm:self-center flex items-center gap-1 text-[11px] font-mono text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/25 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900/50">
          <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
          <span>No Refresh Required!</span>
        </div>
      </div>

      {/* Grid of 6 Themes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {presets.map((preset, index) => {
          const isActive = preset.id === activePresetId;

          // Color helper circles for preview
          const colorsPreview = getColorsList(preset.id);

          return (
            <button
              key={preset.id}
              onClick={() => onSelect(preset)}
              className={`text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden group border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                isActive
                  ? 'bg-white dark:bg-stone-900 shadow-md border-amber-400 dark:border-amber-500 scale-[1.01] ring-1 ring-amber-400 dark:ring-amber-500'
                  : 'bg-stone-50/50 hover:bg-stone-50 dark:bg-stone-950/50 dark:hover:bg-stone-900/60 border-stone-200 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-xs'
              }`}
            >
              {/* Corner Design Tag */}
              <div className="absolute top-0 right-0 py-0.5 px-2 bg-stone-100 dark:bg-stone-850 border-b border-l border-stone-200 dark:border-stone-800 rounded-bl-lg text-[9px] font-mono text-stone-500 dark:text-stone-400 font-semibold uppercase">
                Design #{index + 1}
              </div>

              {/* Title & Palette */}
              <div className="flex items-start justify-between gap-2 mt-1 mb-2">
                <div className="font-bold text-sm text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  {preset.name}
                  {isActive && (
                    <motion.span
                      layoutId="active-check-badge"
                      className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                    >
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </motion.span>
                  )}
                </div>

                {/* Color swatches */}
                <div className="flex gap-1 items-center">
                  {colorsPreview.map((c, i) => (
                    <span key={i} className={`h-2.5 w-2.5 rounded-full border border-stone-900/10 dark:border-white/10 ${c}`} />
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed pr-8 line-clamp-2">
                {preset.description}
              </p>

              {/* Hover highlight bar */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                  isActive ? 'bg-amber-500' : 'bg-transparent group-hover:bg-stone-350 dark:group-hover:bg-stone-755'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Helpers to get styling previews for theme display circles
function getColorsList(themeId: string): string[] {
  switch (themeId) {
    case 'sandstone':
      return ['bg-stone-100', 'bg-amber-600', 'bg-stone-800'];
    case 'slate':
      return ['bg-slate-50', 'bg-cyan-600', 'bg-slate-800'];
    case 'peach':
      return ['bg-orange-50', 'bg-rose-500', 'bg-stone-800'];
    case 'solar':
      return ['bg-white', 'bg-yellow-400', 'bg-zinc-800'];
    case 'matcha':
      return ['bg-emerald-50', 'bg-emerald-600', 'bg-emerald-900'];
    case 'wheat':
      return ['bg-amber-50', 'bg-amber-500', 'bg-stone-800'];
    default:
      return ['bg-stone-200', 'bg-stone-400', 'bg-stone-800'];
  }
}
