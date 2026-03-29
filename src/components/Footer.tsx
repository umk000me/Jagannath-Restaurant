import { MapPin, Phone, Clock, Star } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-amber-500/15 pt-16 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-amber-950">ॐ</span>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-amber-500/70 leading-none font-light">Jai</p>
                <p className="text-xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A843" }}>Jagannath</p>
              </div>
            </div>
            <p className="text-amber-100/50 text-sm leading-relaxed mb-4">
              Authentic Indian cuisine served with tradition, love, and the divine blessings of Lord Jagannath.
            </p>
            <div className="flex items-center gap-1 stars text-sm">
              {[1,2,3,4].map(i => <Star key={i} size={14} fill="currentColor" />)}
              <Star size={14} fill="none" strokeWidth={1.5} />
              <span className="text-amber-100/50 ml-1 text-xs">3.9 (993 reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-300 font-bold mb-5 text-sm tracking-wider uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", id: "#home" },
                { label: "About Us", id: "#about" },
                { label: "Our Menu", id: "#menu" },
                { label: "Today's Specials", id: "#specials" },
                { label: "Reviews", id: "#reviews" },
                { label: "Gallery", id: "#gallery" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-amber-100/50 hover:text-amber-400 text-sm transition-colors underline-gold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-amber-300 font-bold mb-5 text-sm tracking-wider uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Opening Hours
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-200 text-sm font-medium">Mon – Fri</p>
                  <p className="text-amber-100/50 text-xs">3:00 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-200 text-sm font-medium">Sat – Sun</p>
                  <p className="text-amber-100/50 text-xs">12:00 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Open Now</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-amber-300 font-bold mb-5 text-sm tracking-wider uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-amber-100/55 text-sm leading-relaxed">
                  MG Road, Shalimar,<br />Nashik, Maharashtra
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-amber-500 flex-shrink-0" />
                <p className="text-amber-100/55 text-sm">+91 99752 60955</p>
              </div>
              <a
                href="https://wa.me/919975260955?text=Hello%20Jai%20Jagannath%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table.%0A%0ADate%3A%20%0ATime%3A%20%0ATable%20No%3A%20%0AGuests%3A%20"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full py-2.5 rounded-xl text-sm mt-2 inline-block text-center"
              >
                Reserve a Table
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-500/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-amber-100/30 text-xs text-center">
            © {currentYear} Jai Jagannath Restaurant, Nashik. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-amber-500 text-sm">🙏</span>
            <p className="text-amber-100/30 text-xs">
              Made with love & devotion
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.google.com/maps?q=Jagannath+Restaurant+Nashik" target="_blank" rel="noreferrer"
              className="text-amber-100/30 hover:text-amber-400 text-xs transition-colors">Google</a>
            <a href="https://www.justdial.com/Nashik/Jagannath-Restaurant-MG-Road" target="_blank" rel="noreferrer"
              className="text-amber-100/30 hover:text-amber-400 text-xs transition-colors">Justdial</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
