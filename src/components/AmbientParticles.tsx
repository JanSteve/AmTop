import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  color: string;
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollYRef = useRef(0);
  const scrollForceRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.6; // past Hero section
      
      setIsVisible(currentScrollY > heroThreshold);

      const delta = currentScrollY - lastScrollYRef.current;
      // Scroll direction: scrolling down makes content go UP, so delta > 0.
      // We want particles to drift up faster when scrolling down, and drift down when scrolling up.
      scrollForceRef.current -= delta * 0.04;

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to check scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const particleCount = 45;

    const colors = [
      'rgba(0, 0, 0, ',         // black/dark grey
      'rgba(79, 70, 229, ',     // Indigo-600
      'rgba(124, 58, 237, ',    // Violet-600
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles with randomized traits
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.6, // sizes between 0.6px and 2.1px
        speedX: (Math.random() - 0.5) * 0.15, // minimal horizontal drift
        speedY: -(Math.random() * 0.25 + 0.1), // slowly float upwards by default
        alpha: Math.random() * 0.35 + 0.1, // elegant low opacity
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dampen the scroll kinetic force gently
      scrollForceRef.current *= 0.93;

      // Clamp scroll force to keep motion smooth and non-jarring
      const clampedScrollForce = Math.max(-10, Math.min(10, scrollForceRef.current));

      particles.forEach((p) => {
        // Base upward movement + kinetic scroll drift
        p.x += p.speedX;
        p.y += p.speedY + clampedScrollForce * 0.3;

        // Infinite edge wrapping with soft safety boundaries
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        } else if (p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        // Draw the subtle blurred premium ambient particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      id="ambient-particles"
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] transition-opacity duration-[1200ms] ease-out ${
        isVisible ? 'opacity-70' : 'opacity-0'
      }`}
    />
  );
}
