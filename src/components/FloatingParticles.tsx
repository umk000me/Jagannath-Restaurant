import { useEffect, useRef } from "react";
import gsap from "gsap";

const PARTICLE_COUNT = 18;

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const particles = containerRef.current.querySelectorAll(".fp");

    particles.forEach((p) => {
      const el = p as HTMLElement;
      const startX = Math.random() * window.innerWidth;
      const startY = window.innerHeight + 20;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 8;
      const size = 2 + Math.random() * 4;

      gsap.set(el, { x: startX, y: startY, width: size, height: size, opacity: 0.4 + Math.random() * 0.4 });
      gsap.to(el, {
        y: -50,
        x: `+=${(Math.random() - 0.5) * 200}`,
        opacity: 0,
        duration,
        delay,
        ease: "none",
        repeat: -1,
        repeatDelay: Math.random() * 4,
        onRepeat: () => {
          gsap.set(el, {
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 20,
            opacity: 0.4 + Math.random() * 0.4,
          });
        },
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          className="fp absolute rounded-full"
          style={{
            background: i % 3 === 0
              ? "rgba(212, 168, 67, 0.7)"
              : i % 3 === 1
              ? "rgba(240, 200, 96, 0.5)"
              : "rgba(160, 120, 48, 0.6)",
          }}
        />
      ))}
    </div>
  );
}
