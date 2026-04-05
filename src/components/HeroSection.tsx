import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MapPin, Star, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
 
// Real pure-veg Indian food images from Unsplash
const heroSlides = [
  { url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=1920&q=85&fit=crop", label: "Masala Dosa" },
  { url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=1920&q=85&fit=crop", label: "Paneer Masala" },
  { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=85&fit=crop", label: "Tea or Coffee" },

];

const SLIDE_DURATION = 5000; // ms per slide

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  // Use refs so timer callbacks always have fresh values
  const activeIdxRef = useRef(0);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // ── Text entrance (runs once) ───────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".hero-label",      { y: 24, opacity: 0, duration: 0.9, ease: "power3.out" })
        .from(".hero-title-line", { y: 110, opacity: 0, stagger: 0.18, duration: 1.1, ease: "power4.out" }, "-=0.5")
        .from(".hero-subtitle",   { y: 24, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(".hero-cta-group",  { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .from(".hero-stats",      { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }, "-=0.4");

      gsap.to(".scroll-arrow", { y: 10, duration: 1.2, ease: "power1.inOut", repeat: -1, yoyo: true });

      gsap.to(".hero-content", {
        yPercent: 18, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "80% top", scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // ── Ken-Burns on first image ────────────────────────────────────────────────
  useEffect(() => {
    const img = imgRefs.current[0];
    if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 7, ease: "power1.out" });
  }, []);

  // ── Carousel timer — ref-based, no stale closure ────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      const prev = activeIdxRef.current;
      const next = (prev + 1) % heroSlides.length;

      // GSAP cross-fade between wrapper divs
      const wrappers = heroRef.current?.querySelectorAll(".hero-slide") as NodeListOf<HTMLElement>;
      if (!wrappers || wrappers.length < heroSlides.length) return;

      const prevWrap = wrappers[prev];
      const nextWrap = wrappers[next];
      const nextImg  = imgRefs.current[next];

      // Bring next slide on top, start zoomed-in
      gsap.set(nextWrap, { zIndex: 3, opacity: 0 });
      if (nextImg) gsap.set(nextImg, { scale: 1.12 });

      // Fade in & Ken-Burns for incoming slide
      gsap.to(nextWrap, { opacity: 1, duration: 1.5, ease: "power2.inOut" });
      if (nextImg) gsap.to(nextImg, { scale: 1, duration: 7, ease: "power1.out" });

      // Fade out & drop z-index of outgoing slide
      gsap.to(prevWrap, {
        opacity: 0, duration: 1.5, ease: "power2.inOut",
        onComplete: () => gsap.set(prevWrap, { zIndex: 1 }),
      });
      gsap.set(nextWrap, { zIndex: 2 });

      activeIdxRef.current = next;
      setActiveIdx(next);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  // Manual dot navigation
  const goToSlide = (idx: number) => {
    if (idx === activeIdxRef.current) return;
    const prev = activeIdxRef.current;
    const wrappers = heroRef.current?.querySelectorAll(".hero-slide") as NodeListOf<HTMLElement>;
    if (!wrappers) return;

    const prevWrap = wrappers[prev];
    const nextWrap = wrappers[idx];
    const nextImg  = imgRefs.current[idx];

    gsap.set(nextWrap, { zIndex: 3, opacity: 0 });
    if (nextImg) gsap.set(nextImg, { scale: 1.12 });

    gsap.to(nextWrap, { opacity: 1, duration: 1.2, ease: "power2.inOut" });
    if (nextImg) gsap.to(nextImg, { scale: 1, duration: 7, ease: "power1.out" });

    gsap.to(prevWrap, {
      opacity: 0, duration: 1.2, ease: "power2.inOut",
      onComplete: () => gsap.set(prevWrap, { zIndex: 1 }),
    });
    gsap.set(nextWrap, { zIndex: 2 });

    activeIdxRef.current = idx;
    setActiveIdx(idx);
  };

  return (
    <section ref={heroRef} id="home" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">

      {/* ── Slide layers ────────────────────────────────────────────── */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="hero-slide absolute inset-0 overflow-hidden"
          style={{ zIndex: i === 0 ? 2 : 1, opacity: i === 0 ? 1 : 0 }}
        >
          <img
            ref={(el) => { imgRefs.current[i] = el; }}
            src={slide.url}
            alt={slide.label}
            className="w-full h-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* ── Cinematic overlay ───────────────────────────────────────── */}
      <div className="cinematic-overlay absolute inset-0 z-10 pointer-events-none" />
      <div className="grain-overlay z-10 pointer-events-none" />

      {/* ── Dot indicators ─────────────────────────────────────────── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2.5 items-center">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`rounded-full transition-all duration-500 ${
              i === activeIdx ? "w-8 h-2 bg-amber-400" : "w-2 h-2 bg-amber-400/35 hover:bg-amber-400/60"
            }`}
          />
        ))}
      </div>

      {/* ── Slide label ────────────────────────────────────────────── */}
      <div className="absolute bottom-24 right-8 z-30 hidden md:block text-right">
        <p className="text-amber-400/60 text-xs tracking-widest uppercase">{heroSlides[activeIdx].label}</p>
      </div>

      {/* ── Side ornaments ─────────────────────────────────────────── */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-amber-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
        <div className="w-px h-20 bg-gradient-to-b from-amber-500/50 to-transparent" />
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-amber-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
        <div className="w-px h-20 bg-gradient-to-b from-amber-500/50 to-transparent" />
      </div>

      {/* ── Hero content ───────────────────────────────────────────── */}
      <div className="hero-content relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Pure veg badge */}
        <div className="hero-label inline-flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-amber-500/60" />
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm border-2 border-green-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">Pure Veg · Nashik</span>
          </div>
          <div className="h-px w-10 bg-amber-500/60" />
        </div>

        <div className="overflow-hidden mb-2">
          <h1 className="hero-title-line text-6xl md:text-8xl lg:text-9xl font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#F0C860" }}>
            Jai
          </h1>
        </div>
        <div className="overflow-hidden mb-6">
          <h1 className="hero-title-line text-6xl md:text-8xl lg:text-9xl font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#D4A843" }}>
            Jagannath
          </h1>
        </div>

        <div className="hero-subtitle flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/60" />
          <span className="text-amber-400 text-lg">❖</span>
          <span className="text-amber-100/70 text-sm tracking-[0.2em] uppercase">Authentic Pure Veg Cuisine</span>
          <span className="text-amber-400 text-lg">❖</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/60" />
        </div>

        <p className="hero-subtitle text-amber-100/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Experience the soul of India in every bite — traditional recipes, warm hospitality, and flavors that linger.
        </p>

        <div className="hero-cta-group flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <button onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gold px-8 py-3.5 rounded-full text-sm tracking-wider">
            Explore Menu
          </button>
          <a href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
            target="_blank" rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full text-sm tracking-wider border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 transition-all duration-300 inline-block text-center">
            Reserve a Table
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 md:gap-14">
          <div className="hero-stats text-center">
            <div className="flex items-center gap-1 justify-center stars mb-1">
              {[1,2,3,4].map(i => <Star key={i} size={14} fill="currentColor" />)}
              <Star size={14} fill="currentColor" />
            </div>
            <p className="text-amber-400 font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>3.9 / 5</p>
            <p className="text-amber-100/50 text-xs tracking-wider uppercase">Google Rating</p>
          </div>
          <div className="w-px h-10 bg-amber-500/20" />
          <div className="hero-stats text-center">
            <div className="flex items-center gap-1 justify-center text-amber-400 mb-1">
              <MapPin size={14} />
            </div>
            <p className="text-amber-400 font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>MG Road</p>
            <p className="text-amber-100/50 text-xs tracking-wider uppercase">Shalimar, Nashik</p>
          </div>
          <div className="w-px h-10 bg-amber-500/20" />
          <div className="hero-stats text-center">
            <div className="flex items-center gap-1 justify-center text-amber-400 mb-1">
              <Clock size={14} />
            </div>
            <p className="text-amber-400 font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Open</p>
            <p className="text-amber-100/50 text-xs tracking-wider uppercase">3 PM – 11 PM</p>
          </div>
        </div>
      </div>

      <button onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="scroll-arrow absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-amber-400/60 hover:text-amber-400 transition-colors">
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
