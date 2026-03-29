import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Real Unsplash food images (not AI generated)
const specials = [
  {
    name: "Dal Makhani",
    description: "Black lentils slow-cooked overnight with butter and cream, a house specialty.",
    price: "₹120",
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?w=600&q=80&fit=crop",
    accent: "#c0392b",
  },
  {
    name: "Paneer Butter Masala",
    description: "Fresh cottage cheese in a rich tomato-butter gravy with aromatic spices.",
    price: "₹150",
    tag: "Chef's Pick",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80&fit=crop",
    accent: "#e67e22",
  },
  {
    name: "Special Thali",
    description: "A complete meal — dal, sabzi, roti, rice, pickle & papad. Pure satisfaction.",
    price: "₹80",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&fit=crop",
    accent: "#d4a843",
  },
  {
    name: "Chole Bhature",
    description: "Spiced chickpea curry served with fluffy deep-fried bread — a North Indian classic.",
    price: "₹100",
    tag: "Favourite",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80&fit=crop",
    accent: "#8e44ad",
  },
];

export default function SpecialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".specials-header", {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".specials-header", start: "top 85%" },
      });

      // Cards stagger with tilt entrance
      gsap.from(".special-card", {
        y: 80, opacity: 0, rotationX: 15, stagger: 0.14, duration: 0.9, ease: "power3.out",
        transformPerspective: 900,
        scrollTrigger: { trigger: ".specials-grid", start: "top 80%" },
      });

      // Image hover zoom on each card
      document.querySelectorAll(".special-card").forEach((card) => {
        const el = card as HTMLElement;
        const img = el.querySelector(".dish-img") as HTMLElement | null;
        const shine = el.querySelector(".card-shine") as HTMLElement | null;

        el.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
          const shineX = ((e.clientX - rect.left) / rect.width) * 100;
          const shineY = ((e.clientY - rect.top) / rect.height) * 100;

          gsap.to(el, {
            rotateX: -y, rotateY: x, duration: 0.4, ease: "power2.out",
            transformPerspective: 900,
          });
          if (img) gsap.to(img, { scale: 1.08, duration: 0.5, ease: "power2.out" });
          if (shine) {
            gsap.to(shine, {
              opacity: 0.15,
              background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.4), transparent 60%)`,
              duration: 0.3,
            });
          }
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.6)", transformPerspective: 900 });
          if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
          if (shine) gsap.to(shine, { opacity: 0, duration: 0.4 });
        });

        // Click ripple
        el.addEventListener("click", () => {
          gsap.fromTo(el,
            { scale: 0.97 },
            { scale: 1, duration: 0.4, ease: "elastic.out(1.2, 0.5)" }
          );
        });
      });

      // Price counter animation
      gsap.from(".price-tag-anim", {
        textContent: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: ".specials-grid", start: "top 75%" },
      });

      // Floating dish image on scroll for each card
      document.querySelectorAll(".dish-float-wrap").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -12 : 8,
          duration: 2 + i * 0.3,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="specials" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4A843, transparent)" }} />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #c0392b, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="specials-header text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/8">
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">Chef's Table</span>
            <span className="text-amber-400 text-xs">✦</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A843" }}>
            Today's Specials
          </h2>
          <div className="ornament-divider max-w-xs mx-auto my-4">
            <span className="text-amber-500 text-sm">❖</span>
          </div>
          <p className="text-amber-100/55 max-w-xl mx-auto text-lg">
            Handpicked favourites that keep our guests coming back for more.
          </p>
        </div>

        {/* Cards */}
        <div className="specials-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map((item, i) => (
            <div
              key={i}
              className="special-card relative rounded-2xl border border-amber-500/15 overflow-hidden bg-card cursor-pointer select-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Shine overlay */}
              <div className="card-shine absolute inset-0 z-30 rounded-2xl opacity-0 pointer-events-none" />

              {/* Image */}
              <div className="dish-float-wrap relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="dish-img w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                {/* Tag badge on image */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase z-10"
                  style={{ background: "rgba(10,6,2,0.75)", color: "#D4A843", border: "1px solid rgba(212,168,67,0.4)", backdropFilter: "blur(8px)" }}>
                  {item.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-amber-200 mb-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.name}
                </h3>
                <p className="text-amber-100/50 text-sm leading-relaxed mb-5">{item.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold price-tag-anim price-tag" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.price}
                  </span>
                  <button className="text-xs px-4 py-2 rounded-full border border-amber-500/30 text-amber-400 hover:bg-amber-500/15 transition-colors">
                    Order Now
                  </button>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
