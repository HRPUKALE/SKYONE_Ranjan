import React, { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  density: number;
  opacity: number;
  speedY: number;
  speedX: number;
}

export const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Optimal flake count for smooth 60fps on mobile
    const flakeCount = Math.min(45, Math.floor(width / 25));
    const flakes: Snowflake[] = [];

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        density: Math.random() * 1,
        opacity: Math.random() * 0.6 + 0.3,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.5 - 0.25
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.008;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();

        // Update flake position with gentle natural swaying
        flake.y += flake.speedY;
        flake.x += Math.sin(angle + flake.density) * 0.6 + flake.speedX;

        // Reset flakes when they fall below the bottom or drift off sides
        if (flake.y > height + 5) {
          flake.y = -5;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 5) {
          flake.x = -5;
        } else if (flake.x < -5) {
          flake.x = width + 5;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
