import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MapPin, Star, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 61;
const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
  `/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`
);

export default function HeroSection() {
  const outerRef = useRef<HTMLDivElement>(null);  // scroll-spacer wrapper
  const stickyRef = useRef<HTMLDivElement>(null);  // the pinned viewport div
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIdxRef = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // ── Canvas frame-scrub over 4×100vh ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !outer || !sticky) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const draw = (idx: number) => {
      const img = imagesRef.current[idx];
      if (!img?.complete || !img.naturalWidth) return;
      const w = canvas.width, h = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = w / h;
      let sx: number, sy: number, sw: number, sh: number;
      if (ir > cr) {
        sh = img.naturalHeight; sw = sh * cr;
        sx = (img.naturalWidth - sw) / 2; sy = 0;
      } else {
        sw = img.naturalWidth; sh = sw / cr;
        sx = 0; sy = (img.naturalHeight - sh) / 2;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    };

    let loaded = 0;
    imagesRef.current = frames.map((src, i) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (i === 0 && img.complete) draw(0);
        if (loaded === TOTAL_FRAMES) init();
      };
      img.src = src;
      return img;
    });

    const init = () => {
      draw(0);

      // Scrub through frames while `outer` scrolls past.
      // `outer` is 400vh; pin the sticky child to top throughout.
      ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: "bottom bottom",
        pin: sticky,           // GSAP pins this div — works even w/ overflow:hidden parent
        pinSpacing: false,     // outer section already provides the scroll space
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate(self) {
          const idx = Math.min(TOTAL_FRAMES - 1, Math.round(self.progress * (TOTAL_FRAMES - 1)));
          if (idx !== frameIdxRef.current) {
            frameIdxRef.current = idx;
            draw(idx);
          }
        },
      });
    };

    const onResize = () => {
      resize();
      draw(frameIdxRef.current);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach(st => st.trigger === outer && st.kill());
    };
  }, []);

  // ── Hero text entrance + fade out on first scroll ────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.4 })
        .from(".hero-label", { y: 28, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".hero-title-line", { y: 120, opacity: 0, stagger: 0.2, duration: 1.2, ease: "power4.out" }, "-=0.5")
        .from(".hero-subtitle", { y: 28, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" }, "-=0.4")
        .from(".hero-cta-group", { y: 32, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .from(".hero-stats", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }, "-=0.4");

      gsap.to(".scroll-arrow", { y: 10, duration: 1.2, ease: "power1.inOut", repeat: -1, yoyo: true });

      // Fade out hero text over the very first portion of scroll (first 20% / 0.8vh)
      gsap.to(".hero-content-overlay", {
        yPercent: 8, opacity: 0, ease: "none",
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 0.8}`,
          scrub: true,
        },
      });

      // Story chapters timeline — linked to the full 400vh scroll
      // We position elements initially slightly lower with opacity 0
      gsap.set(".story-text", { y: 20, opacity: 0 });

      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // smooth timeline scrubbing
        }
      });

      // Total timeline duration is 1 (representing 100% of the 400vh scroll)

      // Story 1: "Handcrafted Perfection" (Shows up while paneers are mid-air)
      storyTl.to(".story-1", { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.22)
        .to(".story-1", { opacity: 0, y: -20, duration: 0.08, ease: "power2.in" }, 0.38);

      // Story 2: "Symphony of Spices" (Shows as paneer nears the curry)
      storyTl.to(".story-2", { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.48)
        .to(".story-2", { opacity: 0, y: -20, duration: 0.08, ease: "power2.in" }, 0.65);

      // Story 3: "A Feast for the Senses" (Shows exactly during the massive splash)
      storyTl.to(".story-3", { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.72)
        .to(".story-3", { opacity: 0, y: -20, duration: 0.08, ease: "power2.in" }, 0.90);

    }, stickyRef);

    return () => ctx.revert();
  }, []);

  return (
    /**
     * outerRef: 400vh div — provides the scroll distance for the frame animation.
     * stickyRef: 100vh div pinned by GSAP — stays in viewport for all 400vh.
     *
     * NOTE: id="home" stays on the outer so nav anchors work.
     */
    <div ref={outerRef} id="home" style={{ height: "400vh", position: "relative" }}>
      <div
        ref={stickyRef}
        style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}
      >
        {/* Canvas */}
        <canvas ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />

        {/* Radial vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,6,2,0.70) 100%)"
        }} />

        {/* Cinematic top-to-bottom gradient */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10,
          background: "linear-gradient(to bottom, rgba(10,6,2,0.82) 0%, rgba(10,6,2,0.18) 25%, rgba(10,6,2,0.18) 75%, rgba(10,6,2,0.95) 100%)"
        }} />

        {/* Film grain */}
        <div className="grain-overlay" style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }} />

        {/* Bottom bleed */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "10vh",
          pointerEvents: "none", zIndex: 11,
          background: "linear-gradient(to top, rgba(10,6,2,1) 0%, transparent 100%)"
        }} />

        {/* Side ornaments */}
        <div className="hidden lg:flex" style={{ position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)", zIndex: 20, flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 1, height: 80, background: "linear-gradient(to bottom, transparent, rgba(212,168,67,0.5))" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(212,168,67,0.7)" }} />
          <div style={{ width: 1, height: 80, background: "linear-gradient(to bottom, rgba(212,168,67,0.5), transparent)" }} />
        </div>
        <div className="hidden lg:flex" style={{ position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)", zIndex: 20, flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 1, height: 80, background: "linear-gradient(to bottom, transparent, rgba(212,168,67,0.5))" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(212,168,67,0.7)" }} />
          <div style={{ width: 1, height: 80, background: "linear-gradient(to bottom, rgba(212,168,67,0.5), transparent)" }} />
        </div>

        {/* ── Hero content (fades out on scroll start) ─────────────────── */}
        <div className="hero-content-overlay"
          style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", padding: "0 24px", maxWidth: 900, margin: "0 auto" }}>

            {/* Pure-veg badge */}
            <div className="hero-label" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ height: 1, width: 40, background: "rgba(212,168,67,0.6)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 16, height: 16, borderRadius: 2, border: "2px solid #22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
                </div>
                <span style={{ color: "#F0C860", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 500 }}>Pure Veg · Nashik</span>
              </div>
              <div style={{ height: 1, width: 40, background: "rgba(212,168,67,0.6)" }} />
            </div>

            <div style={{ overflow: "hidden", marginBottom: 8 }}>
              <h1 className="hero-title-line" style={{ fontFamily: "'Playfair Display', serif", color: "#F0C860", fontSize: "clamp(3.5rem,10vw,7rem)", fontWeight: 700, lineHeight: 1.1, margin: 0 }}>Jai</h1>
            </div>
            <div style={{ overflow: "hidden", marginBottom: 24 }}>
              <h1 className="hero-title-line" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A843", fontSize: "clamp(3.5rem,10vw,7rem)", fontWeight: 700, lineHeight: 1.1, margin: 0 }}>Jagannath</h1>
            </div>

            <div className="hero-subtitle" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
              <div style={{ height: 1, width: 64, background: "linear-gradient(to right, transparent, rgba(212,168,67,0.6))" }} />
              <span style={{ color: "#F0C860", fontSize: 18 }}>❖</span>
              <span style={{ color: "rgba(240,220,170,0.7)", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase" }}>Authentic Pure Veg Cuisine</span>
              <span style={{ color: "#F0C860", fontSize: 18 }}>❖</span>
              <div style={{ height: 1, width: 64, background: "linear-gradient(to left, transparent, rgba(212,168,67,0.6))" }} />
            </div>

            <p className="hero-subtitle" style={{ color: "rgba(240,220,170,0.60)", fontSize: 17, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>
              Experience the soul of India in every bite — traditional recipes,<br />warm hospitality, and flavors that linger.
            </p>

            <div className="hero-cta-group" style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 56 }}>
              <button onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-gold" style={{ padding: "14px 32px", borderRadius: 9999, fontSize: 13, letterSpacing: "0.05em" }}>
                Explore Menu
              </button>
              <a href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
                target="_blank" rel="noopener noreferrer"
                style={{ padding: "14px 32px", borderRadius: 9999, fontSize: 13, letterSpacing: "0.05em", border: "1px solid rgba(212,168,67,0.4)", color: "#f3c86a", textDecoration: "none", display: "inline-block", textAlign: "center" }}>
                Reserve a Table
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3vw" }}>
              <div className="hero-stats" style={{ textAlign: "center" }}>
                <div className="stars" style={{ display: "flex", gap: 2, justifyContent: "center", marginBottom: 4 }}>
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={13} fill="currentColor" />)}
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#F0C860", fontWeight: 700, fontSize: 17, margin: "0 0 2px" }}>3.9 / 5</p>
                <p style={{ color: "rgba(240,220,170,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Google Rating</p>
              </div>
              <div style={{ width: 1, height: 40, background: "rgba(212,168,67,0.2)" }} />
              <div className="hero-stats" style={{ textAlign: "center" }}>
                <div style={{ color: "#F0C860", display: "flex", justifyContent: "center", marginBottom: 4 }}><MapPin size={14} /></div>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#F0C860", fontWeight: 700, fontSize: 17, margin: "0 0 2px" }}>MG Road</p>
                <p style={{ color: "rgba(240,220,170,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Shalimar, Nashik</p>
              </div>
              <div style={{ width: 1, height: 40, background: "rgba(212,168,67,0.2)" }} />
              <div className="hero-stats" style={{ textAlign: "center" }}>
                <div style={{ color: "#F0C860", display: "flex", justifyContent: "center", marginBottom: 4 }}><Clock size={14} /></div>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#F0C860", fontWeight: 700, fontSize: 17, margin: "0 0 2px" }}>Open</p>
                <p style={{ color: "rgba(240,220,170,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>3 PM – 11 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Story Chapters (Animated via GSAP scrub) ───────────────────── */}
        <div className="story-text story-1" style={{ position: "absolute", bottom: "18%", width: "100%", textAlign: "center", zIndex: 25, pointerEvents: "none" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#F0C860", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, margin: 0, textShadow: "0 4px 16px rgba(0,0,0,0.9)" }}>
            Handcrafted Perfection
          </h2>
          <p style={{ color: "rgba(240,220,170,0.85)", fontSize: "clamp(0.85rem, 2vw, 1.1rem)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "12px", textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
            Fresh Paneer, Made Daily
          </p>
        </div>

        <div className="story-text story-2" style={{ position: "absolute", bottom: "18%", width: "100%", textAlign: "center", zIndex: 25, pointerEvents: "none" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#F0C860", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, margin: 0, textShadow: "0 4px 16px rgba(0,0,0,0.9)" }}>
            A Symphony of Spices
          </h2>
          <p style={{ color: "rgba(240,220,170,0.85)", fontSize: "clamp(0.85rem, 2vw, 1.1rem)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "12px", textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
            Aromatic gravies simmered to perfection
          </p>
        </div>

        <div className="story-text story-3" style={{ position: "absolute", bottom: "18%", width: "100%", textAlign: "center", zIndex: 25, pointerEvents: "none" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#F0C860", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 700, margin: 0, textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}>
            A Feast for the Senses
          </h2>
          <p style={{ color: "rgba(240,220,170,0.9)", fontSize: "clamp(0.85rem, 2vw, 1.1rem)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "12px", textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
            Experience the soul of North Indian cuisine
          </p>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 112, left: "50%", transform: "translateX(-50%)", zIndex: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, pointerEvents: "none" }}>
          <p style={{ color: "rgba(212,168,67,0.5)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", margin: 0 }}>Scroll to watch</p>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map(i => (
              <div key={i} className="animate-pulse"
                style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(212,168,67,0.4)", animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>

        {/* Bouncing chevron */}
        <button className="scroll-arrow"
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 30, color: "rgba(212,168,67,0.6)", background: "none", border: "none", cursor: "pointer", transition: "color 0.3s" }}>
          <ChevronDown size={32} />
        </button>
      </div>
    </div>
  );
}
