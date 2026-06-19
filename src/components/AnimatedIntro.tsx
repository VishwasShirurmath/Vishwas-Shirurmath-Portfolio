import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Cpu } from 'lucide-react';

interface AnimatedIntroProps {
  name: string;
  description: string;
  duration?: number;
  steps?: string[];
  onComplete: () => void;
}

export default function AnimatedIntro({ 
  name, 
  description, 
  duration = 3000, 
  steps = [
    'Calibrating inertial reference vectors...',
    'Nullifying domestic gravity matrices...',
    'Interlinking orbital connection meshes...',
    'Aligning professional workspace maps...',
    'Activating interactive portal... Completed!'
  ], 
  onComplete 
}: AnimatedIntroProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Progress meter count-up
    const intervalTime = 25;
    const totalSteps = duration / intervalTime;
    const increment = 100 / totalSteps;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          setIsFinishing(true);
          // Wait momentarily after reaching 100% for an ultra-smooth exit transition
          setTimeout(() => {
            onComplete();
          }, 450);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // Dynamic metadata subtitle text changes spaced evenly over the duration
    const stepIntervalTime = Math.max(200, duration / steps.length);
    const stepInterval = setInterval(() => {
      setStepIndex((idx) => (idx < steps.length - 1 ? idx + 1 : idx));
    }, stepIntervalTime);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepInterval);
    };
  }, [onComplete, duration, steps]);

  // Generate some aesthetic background bubbles to demonstrate anti-gravity upward rise with horizontal drift
  const bubbles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    size: Math.random() * 45 + 25,
    x: Math.random() * 80 + 10, // percentage from left
    delay: Math.random() * 0.4,
    duration: Math.random() * 1.8 + 2.2, // long, graceful rise
    drift: Math.random() * 30 - 15, // horizontal sway range
  }));

  return (
    <AnimatePresence>
      {!isFinishing && (
        <motion.div
          id="loading-landing-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-stone-950 via-neutral-900 to-stone-950 text-stone-100 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -60, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Warm Decorative Aura Blurs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

          {/* Decorative Antigravity Rising Spheres with Sway */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {bubbles.map((b) => (
              <motion.div
                key={b.id}
                className="absolute rounded-full bg-gradient-to-t from-amber-500/12 to-transparent border border-amber-500/20"
                style={{
                  width: b.size,
                  height: b.size,
                  left: `${b.x}%`,
                  bottom: `-15%`,
                }}
                initial={{ y: 0, opacity: 0.1 }}
                animate={{
                  y: '-120vh',
                  opacity: [0, 0.45, 0.45, 0],
                  x: [0, b.drift, -b.drift, b.drift / 2, 0],
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: b.duration,
                  repeat: Infinity,
                  delay: b.delay,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Central Typography and Progress HUD Card */}
          <div className="relative z-10 w-full max-w-lg px-6 text-center">
            
            {/* Soft Glowing Suspended Emblem */}
            <motion.div
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/35 shadow-lg shadow-amber-500/5 text-amber-400"
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [-5, 5, -5],
                rotate: [0, 4, -4, 0],
              }}
              transition={{
                opacity: { duration: 1, delay: 0.1 },
                scale: { duration: 1, delay: 0.1 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
            >
              <Cpu className="h-6 w-6 stroke-[1.5]" />
            </motion.div>

            {/* Display Typography */}
            <motion.h1 
              className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-orange-300 to-amber-200 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {name}
            </motion.h1>

            <motion.p 
              className="text-stone-300 text-sm sm:text-base font-normal max-w-xs sm:max-w-md mx-auto mb-10 leading-relaxed font-sans"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {description}
            </motion.p>

            {/* Antigravity Calibration HUD Container */}
            <motion.div 
              className="bg-stone-950/50 rounded-2xl border border-stone-800/80 p-5 shadow-2xl backdrop-blur-md text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
                <span className="flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Systems Launching
                </span>
                <span className="text-amber-400 font-bold">{Math.round(progress)}%</span>
              </div>

              {/* Progress Bar Track */}
              <div className="h-1 rounded-full bg-stone-900 overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Cycling Informative Lines */}
              <div className="h-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={stepIndex}
                    className="text-xs font-mono text-stone-400 truncate flex items-center gap-1.5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Compass className="h-3.5 w-3.5 inline text-amber-500/80 animate-spin" style={{ animationDuration: '6s' }} />
                    {steps[stepIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
