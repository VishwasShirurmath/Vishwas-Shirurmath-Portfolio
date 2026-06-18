import { useEffect, useRef } from 'react';

interface AntiGravityBackgroundProps {
  nodeColor: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseVx: number;
  baseVy: number;
  originalSize: number;
}

export default function AntiGravityBackground({ nodeColor }: AntiGravityBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize particles
    const createParticles = () => {
      const density = Math.min(50, Math.floor((width * height) / 25000));
      const temp: Particle[] = [];
      for (let i = 0; i < density; i++) {
        const size = Math.random() * 4 + 2;
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        temp.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          size,
          originalSize: size,
        });
      }
      particlesRef.current = temp;
    };

    createParticles();

    // Resize observer
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    // Track mouse / Touch
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      // Color extraction for links - use the provided color but change alpha
      const nodeColStr = nodeColor || 'rgba(217, 119, 6, 0.45)';
      // Extract RGB values
      let rgb = '120, 120, 120';
      const rgbMatch = nodeColStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbMatch) {
        rgb = `${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}`;
      }

      particles.forEach((p, idx) => {
        // Slow constant movement
        p.x += p.vx;
        p.y += p.vy;

        // Warp boundaries (floating offscreen enters other side)
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Anti-Gravity Repulsion Force calculations
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxRepulseDist = 180;

          if (dist < maxRepulseDist) {
            // Strong push away proportional to proximity
            const force = (maxRepulseDist - dist) / maxRepulseDist;
            const pushX = (dx / dist) * force * 1.5;
            const pushY = (dy / dist) * force * 1.5;

            p.vx += pushX * 0.15;
            p.vy += pushY * 0.15;
            p.size = p.originalSize * (1 + force * 0.8);

            // Cap velocity
            const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            const maxSpeed = 3.5;
            if (currentSpeed > maxSpeed) {
              p.vx = (p.vx / currentSpeed) * maxSpeed;
              p.vy = (p.vy / currentSpeed) * maxSpeed;
            }
          } else {
            // Decay back to baseline velocities slowly
            p.vx += (p.baseVx - p.vx) * 0.03;
            p.vy += (p.baseVy - p.vy) * 0.03;
            p.size += (p.originalSize - p.size) * 0.05;
          }
        } else {
          // Slowly recover original glide
          p.vx += (p.baseVx - p.vx) * 0.02;
          p.vy += (p.baseVy - p.vy) * 0.02;
          p.size += (p.originalSize - p.size) * 0.04;
        }

        // Render Particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = nodeColStr;
        ctx.fill();

        // Connect other particles within range
        for (let j = idx + 1; j < particles.length; j++) {
          const target = particles[j];
          const distDx = p.x - target.x;
          const distDy = p.y - target.y;
          const distance = Math.sqrt(distDx * distDx + distDy * distDy);
          const maxLinkDist = 130;

          if (distance < maxLinkDist) {
            const opacity = ((maxLinkDist - distance) / maxLinkDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationId);
    };
  }, [nodeColor]);

  return (
    <canvas
      ref={canvasRef}
      id="antigravity-background-canvas"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
