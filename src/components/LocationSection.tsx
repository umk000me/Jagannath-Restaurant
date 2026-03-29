import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Clock, Mail, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const hours = [
  { day: "Monday – Friday", time: "3:00 PM – 11:00 PM", open: true },
  { day: "Saturday", time: "12:00 PM – 11:00 PM", open: true },
  { day: "Sunday", time: "12:00 PM – 11:00 PM", open: true },
];

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".location-header", {
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".location-header", start: "top 85%" },
      });
      gsap.from(".location-info-card", {
        x: -60, opacity: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: ".location-grid", start: "top 80%" },
      });
      gsap.from(".location-map", {
        x: 60, opacity: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: ".location-grid", start: "top 80%" },
      });
      gsap.from(".contact-detail", {
        y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".location-grid", start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 overflow-hidden bg-pattern-dots">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="location-header text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/8">
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">Find Us</span>
            <span className="text-amber-400 text-xs">✦</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A843" }}>
            Visit Us in Nashik
          </h2>
          <div className="ornament-divider max-w-xs mx-auto my-4">
            <span className="text-amber-500 text-sm">❖</span>
          </div>
          <p className="text-amber-100/55 max-w-xl mx-auto">
            Located at the heart of MG Road, Shalimar — easy to find, hard to forget.
          </p>
        </div>

        <div className="location-grid grid lg:grid-cols-2 gap-8 items-start">
          {/* Info Card */}
          <div className="location-info-card space-y-6">
            {/* Address */}
            <div className="contact-detail p-6 rounded-2xl border border-amber-500/15 bg-card flex gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.2), rgba(212,168,67,0.05))", border: "1px solid rgba(212,168,67,0.3)" }}>
                <MapPin size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="text-amber-200 font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Address</p>
                <p className="text-amber-100/65 text-sm leading-relaxed">Mahatma Gandhi Road (MG Road)<br />Shalimar, Nashik<br />Maharashtra, India</p>
                <a
                  href="https://maps.google.com/?q=Jagannath+Restaurant+MG+Road+Nashik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 text-xs mt-2 hover:text-amber-300 transition-colors"
                >
                  Open in Maps <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="contact-detail p-6 rounded-2xl border border-amber-500/15 bg-card flex gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.2), rgba(212,168,67,0.05))", border: "1px solid rgba(212,168,67,0.3)" }}>
                <Clock size={20} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-amber-200 font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Opening Hours</p>
                <div className="space-y-2">
                  {hours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-amber-100/60">{h.day}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-amber-300">{h.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="contact-detail p-6 rounded-2xl border border-amber-500/15 bg-card space-y-4">
              <p className="text-amber-200 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Get in Touch</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.25)" }}>
                  <Phone size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-amber-100/50 text-xs">Phone / WhatsApp</p>
                  <p className="text-amber-300 text-sm font-medium">+91 99752 60955</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.25)" }}>
                  <Mail size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-amber-100/50 text-xs">Email</p>
                  <p className="text-amber-300 text-sm font-medium">info@jaijagannath.com</p>
                </div>
              </div>
            </div>

            {/* Reservation CTA */}
            <div className="contact-detail">
              <a
                href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full py-4 rounded-xl text-base tracking-wider inline-block text-center"
              >
                💬 Reserve Table via WhatsApp
              </a>
            </div>
          </div>

          {/* Map Embed */}
          <div className="location-map">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 h-full min-h-[500px]">
              <iframe
                title="Jai Jagannath Restaurant Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.0!2d73.7898!3d19.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb7f5a2a9a1b%3A0x0!2sJagannath+Restaurant%2C+MG+Road%2C+Nashik!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "500px", filter: "invert(90%) hue-rotate(180deg) saturate(0.7)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay with branding */}
              <div className="absolute top-4 left-4 p-3 rounded-xl border border-amber-500/30"
                style={{ background: "rgba(10,6,2,0.9)", backdropFilter: "blur(10px)" }}>
                <p className="text-amber-400 font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Jai Jagannath</p>
                <p className="text-amber-100/60 text-xs">MG Road, Shalimar, Nashik</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
