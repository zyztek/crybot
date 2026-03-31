import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

// Get initial reduced motion preference - must be done in component body
function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [prefersReducedMotion] = useState(getInitialReducedMotion);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  const [, setTick] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParticles([]);
      return;
    }

    const colors = [
      'rgba(139, 92, 246, 0.8)', // purple
      'rgba(236, 72, 153, 0.8)', // pink
      'rgba(251, 191, 36, 0.8)', // yellow
      'rgba(16, 185, 129, 0.8)', // green
      'rgba(59, 130, 246, 0.8)', // blue
    ];

    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(newParticles);
    // Trigger re-render to show particles
    setTick(t => t + 1);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="particle-bg">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            backgroundColor: p.color,
          }}
        />
      ))}
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80" />
    </div>
  );
}
