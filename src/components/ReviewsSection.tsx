import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Rahul Sharma",
    avatar: "R",
    rating: 5,
    review: "Best dal makhani I've ever had! The thali is absolutely value for money. Cozy atmosphere and very friendly staff. Will definitely come back!",
    date: "2 weeks ago",
    source: "Google",
  },
  {
    name: "Priya Desai",
    avatar: "P",
    rating: 4,
    review: "Amazing food at very affordable prices. The paneer dishes are outstanding. Service is quick and the place has a warm, homely feeling.",
    date: "1 month ago",
    source: "Google",
  },
  {
    name: "Amit Kulkarni",
    avatar: "A",
    rating: 5,
    review: "Nashik's hidden gem! Authentic Maharashtrian and North Indian food under one roof. Their special thali is a complete meal and very filling.",
    date: "3 weeks ago",
    source: "Google",
  },
  {
    name: "Sneha Patil",
    avatar: "S",
    rating: 4,
    review: "Great place for a quick, tasty, and budget-friendly meal. The gulab jamun is divine! Highly recommend to everyone visiting Nashik.",
    date: "2 months ago",
    source: "Justdial",
  },
  {
    name: "Vikram Joshi",
    avatar: "V",
    rating: 5,
    review: "Visited with family and we all loved it. The chicken biryani was aromatic and perfectly spiced. Staff was very welcoming. MG Road's finest!",
    date: "1 month ago",
    source: "Justdial",
  },
  {
    name: "Meera Nair",
    avatar: "M",
    rating: 4,
    review: "Loved the authentic home-style cooking. Dal tadka tasted exactly like mom's cooking. Prices are very reasonable and portions are generous.",
    date: "3 months ago",
    source: "Google",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={14} fill={star <= rating ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  const total = reviews.length;
  const visible = 3;

  const prev = () => {
    setCurrent((c) => (c - 1 + total) % total);
  };

  const next = () => {
    setCurrent((c) => (c + 1) % total);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reviews-header", {
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".reviews-header", start: "top 85%" },
      });
      gsap.from(".review-card", {
        y: 50, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".review-cards-row", start: "top 80%" },
      });
      gsap.from(".reviews-summary", {
        scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".reviews-summary", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        x: 30, opacity: 0, stagger: 0.1, duration: 0.5, ease: "power3.out",
      });
    }
  }, [current]);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visible; i++) {
      items.push(reviews[(current + i) % total]);
    }
    return items;
  };

  return (
    <section ref={sectionRef} id="reviews" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="reviews-header text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/8">
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">Guest Reviews</span>
            <span className="text-amber-400 text-xs">✦</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A843" }}>
            What Our Guests Say
          </h2>
          <div className="ornament-divider max-w-xs mx-auto my-4">
            <span className="text-amber-500 text-sm">❖</span>
          </div>
        </div>

        
        {/* Summary */}
        <div className="reviews-summary flex flex-col sm:flex-row items-center justify-center gap-10 mb-14 p-8 rounded-2xl border border-amber-500/15 bg-card max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-6xl font-bold gold-text" style={{ fontFamily: "'Playfair Display', serif" }}>3.9</p>
            <div className="flex gap-1 justify-center my-2 stars">
              {[1,2,3,4].map(i => <Star key={i} size={18} fill="currentColor" />)}
              <Star size={18} fill="none" strokeWidth={1.5} />
            </div>
            <p className="text-amber-100/50 text-sm">Based on 993 reviews</p>
          </div>
          <div className="w-px h-16 bg-amber-500/20 hidden sm:block" />
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-amber-400">993+</p>
              <p className="text-amber-100/50 text-xs">Google Reviews</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-400">1139+</p>
              <p className="text-amber-100/50 text-xs">Justdial Reviews</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-400">3.8★</p>
              <p className="text-amber-100/50 text-xs">Justdial Rating</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-400">10+</p>
              <p className="text-amber-100/50 text-xs">Years Serving</p>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div ref={cardsRef} className="review-cards-row grid md:grid-cols-3 gap-6 mb-10">
          {getVisible().map((r, i) => (
            <div key={i} className="review-card menu-card p-6 rounded-2xl border border-amber-500/15 bg-card flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-amber-950 text-sm flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #D4A843, #A07830)" }}>
                  {r.avatar}
                </div>
                <div>
                  <p className="text-amber-200 font-semibold text-sm">{r.name}</p>
                  <p className="text-amber-100/40 text-xs">{r.date} · {r.source}</p>
                </div>
              </div>

              <StarRating rating={r.rating} />

              <p className="text-amber-100/65 text-sm leading-relaxed mt-3 flex-1">
                "{r.review}"
              </p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-amber-500/30 text-amber-400 flex items-center justify-center hover:bg-amber-500/15 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-amber-500" : "w-2 bg-amber-500/30"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-amber-500/30 text-amber-400 flex items-center justify-center hover:bg-amber-500/15 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
