import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

// Real Unsplash food photography (not AI generated)
const galleryItems = [
  {
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80&fit=crop",
    label: "Indian Thali",
    span: "col-span-1 row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=700&q=80&fit=crop",
    label: "Chole Bhature",
    span: "col-span-1 row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700&q=80&fit=crop",
    label: "Paneer Masala",
    span: "col-span-1 row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?w=900&q=80&fit=crop",
    label: "Dal Makhani",
    span: "col-span-2 row-span-1",
  },
  {
    url: "https://media.istockphoto.com/id/521802535/photo/gulab-jamun-12.webp?a=1&b=1&s=612x612&w=0&k=20&c=Mri9HwChsS3eLZYXOMVHGL49Y3gLNhD-Ez-QIYeEfwQ=",
    label: "Gulab Jamun",
    span: "col-span-1 row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=700&q=80&fit=crop",
    label: "Kadai Paneer",
    span: "col-span-1 row-span-1",
  },
];

// Marquee strip images
const marqueeImages = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=70&fit=crop",
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".gallery-header", {
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".gallery-header", start: "top 85%" },
      });

      // Gallery items staggered from alternating directions
      const items = gsap.utils.toArray<HTMLElement>(".gallery-item");
      items.forEach((el, i) => {
        const fromX = i % 2 === 0 ? -50 : 50;
        gsap.from(el, {
          x: fromX, y: 40, opacity: 0, scale: 0.92, duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });

        // Image parallax inside each card on scroll
        const img = el.querySelector(".gallery-img") as HTMLElement | null;
        if (img) {
          gsap.to(img, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: el, start: "top bottom", end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        // Hover tilt + image zoom
        const overlay = el.querySelector(".gallery-overlay") as HTMLElement | null;
        const label = el.querySelector(".gallery-label") as HTMLElement | null;

        el.addEventListener("mouseenter", () => {
          if (img) gsap.to(img, { scale: 1.1, duration: 0.6, ease: "power2.out" });
          if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.4 });
          if (label) gsap.from(label, { y: 12, opacity: 0, duration: 0.35, ease: "power2.out" });
          gsap.to(el, { y: -5, duration: 0.3, ease: "power2.out" });
        });

        el.addEventListener("mouseleave", () => {
          if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
          if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4 });
          gsap.to(el, { y: 0, duration: 0.4, ease: "power2.out" });
        });
      });

      // Infinite horizontal marquee
      if (marqueeRef.current) {
        const track = marqueeRef.current.querySelector(".marquee-track") as HTMLElement;
        if (track) {
          const trackWidth = track.scrollWidth / 2;
          gsap.to(track, {
            x: -trackWidth,
            duration: 28,
            ease: "none",
            repeat: -1,
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="gallery-header text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/8">
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">Gallery</span>
            <span className="text-amber-400 text-xs">✦</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A843" }}>
            A Visual Feast
          </h2>
          <div className="ornament-divider max-w-xs mx-auto my-4">
            <span className="text-amber-500 text-sm">❖</span>
          </div>
          <p className="text-amber-100/55 max-w-xl mx-auto">
            Every dish tells a story — crafted with tradition, served with love.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`gallery-item relative overflow-hidden rounded-2xl cursor-pointer group ${item.span}`}
            >
              <img
                src={item.url}
                alt={item.label}
                className="gallery-img absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Dark overlay */}
              <div className="gallery-overlay absolute inset-0 opacity-0"
                style={{ background: "linear-gradient(to top, rgba(10,6,2,0.88) 0%, rgba(10,6,2,0.2) 60%, transparent 100%)" }}>
                <div className="gallery-label absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-amber-300 font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{item.label}</p>
                  <p className="text-amber-100/60 text-xs tracking-wider uppercase">Jai Jagannath Restaurant</p>
                </div>
              </div>

              {/* Always-visible subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-amber-500/0 group-hover:border-amber-500/40 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Full-width Marquee Strip */}
      <div ref={marqueeRef} className="mt-16 overflow-hidden select-none">
        <div className="marquee-track flex gap-4" style={{ width: "max-content" }}>
          {/* Double for seamless loop */}
          {[...marqueeImages, ...marqueeImages].map((src, i) => (
            <div key={i} className="flex-shrink-0 w-56 h-36 rounded-xl overflow-hidden relative">
              <img src={src} alt="Indian food" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom label */}
      <p className="text-center text-amber-100/25 text-xs tracking-widest uppercase mt-6">
        ✦ Authentic Indian Cuisine · MG Road, Shalimar, Nashik ✦
      </p>
    </section>
  );
}
