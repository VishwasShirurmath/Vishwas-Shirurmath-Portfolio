import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ActivityTracker } from '../types';
import { Plus, Minus, CheckCircle, RefreshCw, Flame, Calendar, Info } from 'lucide-react';

interface TrackerCardProps {
  initialTrackers: ActivityTracker[];
  accentClass: string;
  accentTextClass: string;
  cardBgClass: string;
}

// Generate some static data for the GitHub contribution grid (e.g. 15 weeks x 7 days)
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const GRID_COLS = 22; // Let's make a beautiful responsive 22-column developer grid

export default function TrackerCard({
  initialTrackers,
  accentClass,
  accentTextClass,
  cardBgClass,
}: TrackerCardProps) {
  const [trackers, setTrackers] = useState<ActivityTracker[]>(() => {
    const saved = localStorage.getItem('portfolio_trackers_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialTrackers;
      }
    }
    return initialTrackers;
  });

  const [contributionGrid, setContributionGrid] = useState<number[]>([]);
  const [streakCount, setStreakCount] = useState(14); // Interactive mock continuous streak
  const [hoveredCell, setHoveredCell] = useState<{ index: number; count: number } | null>(null);

  // Sync back to local storage
  useEffect(() => {
    localStorage.setItem('portfolio_trackers_v2', JSON.stringify(trackers));
  }, [trackers]);

  // Generate mock contribution values based on active tracker states + standard distribution
  useEffect(() => {
    // Generate 154 grid squares (22 cols * 7 rows)
    const baseGrid = Array.from({ length: GRID_COLS * 7 }).map((_, idx) => {
      // Add randomness but make weekend indices lower
      const dayOfWeek = idx % 7;
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      if (isWeekend) {
        return Math.floor(Math.random() * 3);
      }
      return Math.floor(Math.random() * 6 + 1);
    });

    // Blend in the active developer metrics to dynamically warp the current week (latest column of cells)
    const currentWeekStartIndex = (GRID_COLS - 1) * 7;
    const totalCurrentActivitiesInput = trackers
      .filter((t) => t.category === 'coding')
      .reduce((acc, t) => acc + t.current, 0);

    // Populate the final few boxes
    for (let i = 0; i < 7; i++) {
      const cellIdx = currentWeekStartIndex + i;
      if (cellIdx < baseGrid.length) {
        baseGrid[cellIdx] = Math.min(
          9,
          Math.floor((totalCurrentActivitiesInput / 3) + (i === 4 ? 4 : 1))
        );
      }
    }
    setContributionGrid(baseGrid);
  }, [trackers]);

  const handleIncrement = (id: string) => {
    setTrackers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextVal = t.current + 1;
          const targetReached = nextVal >= t.target && t.current < t.target;
          if (targetReached) {
            // Boost streak as positive feedback
            setStreakCount((s) => s + 1);
          }
          return { ...t, current: nextVal };
        }
        return t;
      })
    );
  };

  const handleDecrement = (id: string) => {
    setTrackers((prev) =>
      prev.map((t) => {
        if (t.id === id && t.current > 0) {
          return { ...t, current: t.current - 1 };
        }
        return t;
      })
    );
  };

  const handleReset = () => {
    setTrackers(initialTrackers.map((t) => ({ ...t, current: 0 })));
    setStreakCount(12);
  };

  const totalCompleted = trackers.filter((t) => t.current >= t.target).length;

  return (
    <div className="space-y-6" id="trackers-outer-container">
      {/* Tracker HUD Stats Bar */}
      <div className={`p-5 rounded-2xl ${cardBgClass} flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="text-sm font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Live Engineer Health HUD
            </h4>
          </div>
          <p className="text-xl font-bold text-stone-950">
            {totalCompleted} of {trackers.length} Daily Objectives Met
          </p>
          <p className="text-xs text-stone-500">
            Click metric controllers below to dynamically interact with contribution grids.
          </p>
        </div>

        {/* Streak & Reset */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-300/35 px-4 py-2.5 rounded-xl text-amber-900">
            <Flame className="h-5 w-5 fill-amber-500 text-amber-500 animate-bounce" />
            <div>
              <p className="text-xs uppercase font-semibold font-mono text-amber-700 leading-none">Streak</p>
              <p className="text-lg font-bold font-sans mt-0.5">{streakCount} Days</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-xl transition duration-200"
            title="Reset telemetry counters"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Today
          </button>
        </div>
      </div>

      {/* Grid of Trackers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trackers.map((t) => {
          const percent = Math.min(100, Math.round((t.current / t.target) * 100));
          const isFinished = t.current >= t.target;

          return (
            <div
              key={t.id}
              className={`p-4 rounded-xl transition-all duration-300 hover:shadow-md ${cardBgClass} border border-stone-200/50 flex flex-col justify-between`}
            >
              <div>
                {/* Title line */}
                <div className="flex items-start justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono tracking-wider uppercase bg-stone-100 text-stone-500 px-2 py-0.5 rounded-md font-semibold">
                    {t.category}
                  </span>
                  {isFinished && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold font-mono bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      <CheckCircle className="h-3 w-3 fill-emerald-100" /> Done
                    </span>
                  )}
                </div>

                <h5 className="font-bold text-stone-900 text-sm mt-1">{t.name}</h5>

                {/* Score numbers */}
                <div className="mt-2.5 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight text-stone-950 font-sans">
                    {t.current}
                  </span>
                  <span className="text-stone-400 text-xs font-mono">/ {t.target} {t.unit}</span>
                </div>

                {/* Micro Progress Bar */}
                <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden mt-3 mb-2">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${t.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                  />
                </div>
              </div>

              {/* Action adjustments */}
              <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-stone-100">
                <span className="text-stone-400 text-[10px] font-mono">{percent}% finished</span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDecrement(t.id)}
                    className="h-7 w-7 flex items-center justify-center rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-50 hover:text-stone-900 transition-all duration-150 active:scale-95"
                    disabled={t.current === 0}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleIncrement(t.id)}
                    className={`h-7 w-7 flex items-center justify-center rounded-lg text-white hover:brightness-110 shadow-xs transition-all duration-150 active:scale-95 ${accentClass}`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic GitHub Contributions Grid */}
      <div className={`p-5 rounded-xl border border-stone-200/50 ${cardBgClass} space-y-4`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5 text-stone-500" />
            <div>
              <h5 className="font-bold text-sm text-stone-900">Engineering Activity Calendar (Interactive Heatmap)</h5>
              <p className="text-xs text-stone-500">Simulates consistent coding sprints. Squares light up as logs increase.</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-stone-400 font-mono">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded-xs bg-stone-100 border border-stone-200" />
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-150" />
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-300" />
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500" />
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-700" />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Area */}
        <div className="relative overflow-x-auto pb-2 scrollbar-thin">
          <div className="flex gap-2 min-w-[550px] select-none text-stone-600">
            {/* Days axis */}
            <div className="flex flex-col justify-around text-[10px] font-mono w-6 text-right pr-1.5 h-[98px]">
              <span>M</span>
              <span>W</span>
              <span>F</span>
            </div>

            {/* Matrix grid cells cols */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3.5px]">
              {contributionGrid.map((value, index) => {
                const stepColor = getGridColorClass(value);
                const isHovered = hoveredCell?.index === index;

                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredCell({ index, count: value })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`h-3 w-3 rounded-xs cursor-pointer transition-all duration-150 ${stepColor} ${
                      isHovered ? 'ring-2 ring-amber-500 scale-110 z-10 shadow-xs' : 'hover:scale-105'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Grid tooltip overlays */}
          <div className="h-5 mt-2 flex items-center justify-between gap-2.5 px-1 bg-stone-50/50 rounded-lg py-1 border border-stone-100">
            <p className="text-[10px] font-mono text-stone-500 flex items-center gap-1">
              <Info className="h-3 w-3 inline-block" />
              {hoveredCell !== null ? (
                <span>
                  Contribution Index: <strong className="text-stone-800">{hoveredCell.count} points</strong> (simulated activity snapshot)
                </span>
              ) : (
                <span>Hover over grid nodes to inspect historical daily intensities.</span>
              )}
            </p>
            <span className="text-[9px] font-mono text-stone-400 bg-stone-100/80 px-1.5 py-0.5 rounded">
              Latest week logs generated on hover
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Map rating count to background fill states
function getGridColorClass(val: number): string {
  if (val === 0) return 'bg-stone-100 border border-stone-200/20';
  if (val <= 2) return 'bg-emerald-100';
  if (val <= 4) return 'bg-emerald-300';
  if (val <= 6) return 'bg-emerald-500';
  return 'bg-emerald-700';
}
