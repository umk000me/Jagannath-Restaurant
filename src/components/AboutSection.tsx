import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: "🍛", title: "Traditional Recipes", desc: "Recipes passed down through generations, keeping authentic flavors alive." },
  { icon: "🌿", title: "Fresh Ingredients", desc: "Only the freshest local produce and hand-ground spices used daily." },
  { icon: "❤️", title: "Made with Love", desc: "Every dish crafted with passion and respect for Indian culinary heritage." },
  { icon: "🙏", title: "Divine Blessings", desc: "Named after Lord Jagannath, we offer food as prasad — pure and wholesome." },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-badge", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".about-badge",
          start: "top 85%",
        },
      });

      gsap.from(".about-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
        },
      });

      gsap.from(".about-text", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 85%",
        },
      });

      gsap.from(".about-value-card", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-values-grid",
          start: "top 80%",
        },
      });

      gsap.from(".about-image-wrap", {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-image-wrap",
          start: "top 80%",
        },
      });

      // Floating animation on the badge
      gsap.to(".float-badge", {
        y: -8,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 bg-background bg-pattern-dots overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] -translate-y-1/2 rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #D4A843, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <div className="about-badge inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/8">
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">Our Story</span>
            <span className="text-amber-400 text-xs">✦</span>
          </div>

          <h2 className="about-heading text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A843" }}>
            A Legacy of<br />
            <span style={{ color: "#F5E6C8" }}>Flavours &</span><br />
            Tradition
          </h2>

          <div className="space-y-4">
            <p className="about-text text-amber-100/65 text-lg leading-relaxed">
              Nestled in the heart of Nashik on historic Mahatma Gandhi Road, Jai Jagannath Restaurant has been a beloved destination for families, food lovers, and pilgrims seeking authentic Indian cuisine at honest prices.
            </p>
            <p className="about-text text-amber-100/65 leading-relaxed">
              With over 993 Google reviews and a loyal following, we pride ourselves on serving North Indian and local Maharashtrian delicacies prepared fresh every day, starting at just ₹20.
            </p>
            <p className="about-text text-amber-100/65 leading-relaxed">
              From our signature thalis to freshly made rotis and flavorful curries — every meal here is an experience that nourishes both body and soul.
            </p>
          </div>

          {/* Stats */}
          <div className="about-text flex gap-10 mt-10">
            <div>
              <p className="text-4xl font-bold gold-text" style={{ fontFamily: "'Playfair Display', serif" }}>993+</p>
              <p className="text-amber-100/50 text-sm tracking-wider uppercase mt-1">Happy Reviews</p>
            </div>
            <div className="w-px bg-amber-500/20" />
            <div>
              <p className="text-4xl font-bold gold-text" style={{ fontFamily: "'Playfair Display', serif" }}>₹20</p>
              <p className="text-amber-100/50 text-sm tracking-wider uppercase mt-1">Starting Price</p>
            </div>
            <div className="w-px bg-amber-500/20" />
            <div>
              <p className="text-4xl font-bold gold-text" style={{ fontFamily: "'Playfair Display', serif" }}>3.9★</p>
              <p className="text-amber-100/50 text-sm tracking-wider uppercase mt-1">Google Rating</p>
            </div>
          </div>
        </div>

        {/* Right — Value Cards */}
        <div className="about-image-wrap">
          <div className="about-values-grid grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div key={i} className="about-value-card menu-card p-6 rounded-2xl border border-amber-500/15 bg-card">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h4 className="font-bold text-amber-300 mb-2 text-sm tracking-wide uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {v.title}
                </h4>
                <p className="text-amber-100/50 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Float Badge */}
          <div className="float-badge mt-6 p-4 rounded-2xl border border-amber-500/25 bg-amber-500/8 flex items-center gap-4">
            <div className="text-3xl">🏆</div>
            <div>
              <p className=" text-amber-300 font-semibold text-sm">Justdial Verified</p>
              <p className="text-amber-100/50 text-xs">Rated 3.8 · 1139+ reviews on Justdial</p>
            </div>
            <div className="ml-auto">
              <div className="flex stars">
                {[1,2,3,4].map(i => <span key={i}>★</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
