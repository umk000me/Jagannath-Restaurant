import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 61;

// Build frame paths: /ezgif-frame-001.jpg … /ezgif-frame-061.jpg
const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return `/ezgif-frame-${n}.jpg`;
});

export default function ScrollFrameAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const frameIdxRef = useRef(0);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Pre-load all frames ─────────────────────────────────────────────────
    const images: HTMLImageElement[] = Array.from({ length: TOTAL_FRAMES }, () => new Image());
    let loadedCount = 0;

    const drawFrame = (idx: number) => {
      const img = images[idx];
      if (!img.complete || !img.naturalWidth) return;

      // Keep canvas intrinsic size in sync with rendered size
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
      }

      // Cover-fit: centre the image inside the canvas
      const imgAR    = img.naturalWidth / img.naturalHeight;
      const canvasAR = w / h;

      let sw: number, sh: number, sx: number, sy: number;
      if (imgAR > canvasAR) {
        // image wider → fit height, crop sides
        sh = img.naturalHeight;
        sw = sh * canvasAR;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      } else {
        // image taller → fit width, crop top/bottom
        sw = img.naturalWidth;
        sh = sw / canvasAR;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    };

    const setupScrollTrigger = () => {
      // Draw first frame immediately
      drawFrame(0);

      const proxy = { frame: 0 };

      gsap.to(proxy, {
        frame: TOTAL_FRAMES - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,          // small scrub = very tight tracking, still smooth
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (TOTAL_FRAMES - 1));
            if (idx !== frameIdxRef.current) {
              frameIdxRef.current = idx;
              drawFrame(idx);
            }
          },
        },
        onUpdate() {
          drawFrame(Math.round(proxy.frame));
        },
      });
    };

    // Load images in parallel; start scroll trigger when all are ready
    frames.forEach((src, i) => {
      images[i].onload = images[i].onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setupScrollTrigger();
      };
      images[i].src = src;
    });

    // Resize handler
    const onResize = () => drawFrame(frameIdxRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="paneer-drop"
      /* Tall enough for smooth 61-frame scrub — 400 vh gives plenty of room */
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* ── Sticky canvas wrapper ─────────────────────────────────────────── */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
        />

        {/* Dark cinematic vignette on all 4 edges */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(10,6,2,0.75) 100%)",
          }}
        />

        {/* Top + bottom gradient bleeds into page */}
        <div
          className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(10,6,2,1) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to top, rgba(10,6,2,1) 0%, transparent 100%)",
          }}
        />

        {/* ── Overlay text ── */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 pointer-events-none"
        >
          {/* Top label */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
            <p
              className="text-amber-400/70 text-xs tracking-[0.35em] uppercase mb-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Scroll to experience
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-amber-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60 animate-pulse" />
              <div className="h-px w-12 bg-amber-500/40" />
            </div>
          </div>

          {/* Bottom headline */}
          <div className="text-center px-6">
            <h2
              className="text-4xl md:text-6xl font-bold mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: "linear-gradient(135deg, #F0C860 0%, #D4A843 50%, #A07830 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Paneer Drops Into Perfection
            </h2>
            <p
              className="text-amber-100/60 text-base md:text-lg max-w-lg mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Fresh paneer meeting our signature curry — watch the magic unfold as you scroll.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
