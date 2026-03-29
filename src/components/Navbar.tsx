import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from(".nav-logo", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
    }, navRef);

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="nav-logo flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick("#home")}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/40">
            <span className="text-lg font-bold text-amber-950">ॐ</span>
          </div>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-amber-500/80 leading-none font-light">Jai</p>
            <p className="text-lg font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A843" }}>Jagannath</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="nav-item underline-gold text-sm tracking-wider text-amber-100/80 hover:text-amber-400 transition-colors duration-300 uppercase font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block nav-item">
          <a
            href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-5 py-2 rounded-full text-sm inline-block"
          >
            Reserve Table
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-amber-400 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "rgba(10,6,2,0.97)", borderTop: "1px solid rgba(212,168,67,0.2)" }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-amber-100/80 hover:text-amber-400 transition-colors text-sm tracking-widest uppercase py-1"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-5 py-2 rounded-full text-sm w-full mt-2 inline-block text-center"
          >
            Reserve Table
          </a>
        </div>
      </div>
    </nav>
  );
}
