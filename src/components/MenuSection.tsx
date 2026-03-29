import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Starters", "Main Course", "Breads", "Rice & Biryani", "Sweets", "Beverages"];

// Pure vegetarian menu only
const menuItems = [
  // Starters
  { name: "Veg Soup", price: "₹60", category: "Starters", desc: "Fresh seasonal vegetables in a light aromatic broth." },
  { name: "Papad Fry", price: "₹30", category: "Starters", desc: "Crispy lentil wafers with mint chutney." },
  { name: "Aloo Tikki", price: "₹50", category: "Starters", desc: "Pan-fried spiced potato patties with tamarind sauce." },
  { name: "Pakoda Platter", price: "₹80", category: "Starters", desc: "Assorted vegetable fritters with chutneys." },
  { name: "Veg Cutlet", price: "₹60", category: "Starters", desc: "Crispy bread-crumbed mixed vegetable patties." },
  // Main Course
  { name: "Dal Tadka", price: "₹90", category: "Main Course", desc: "Yellow lentils tempered with cumin and garlic." },
  { name: "Dal Makhani", price: "₹120", category: "Main Course", desc: "Creamy black lentils slow-cooked overnight." },
  { name: "Paneer Butter Masala", price: "₹150", category: "Main Course", desc: "Cottage cheese in rich tomato-cream gravy." },
  { name: "Shahi Paneer", price: "₹160", category: "Main Course", desc: "Paneer in royal cashew and cream sauce." },
  { name: "Kadai Paneer", price: "₹160", category: "Main Course", desc: "Paneer with bell peppers in kadai masala." },
  { name: "Palak Paneer", price: "₹150", category: "Main Course", desc: "Fresh spinach purée with paneer cubes." },
  { name: "Aloo Matar", price: "₹90", category: "Main Course", desc: "Potatoes and peas in spiced tomato gravy." },
  { name: "Mix Veg", price: "₹100", category: "Main Course", desc: "Seasonal vegetables in a hearty curry." },
  { name: "Chole Masala", price: "₹100", category: "Main Course", desc: "Chickpeas slow-cooked with aromatic spices." },
  { name: "Rajma Masala", price: "₹100", category: "Main Course", desc: "Red kidney beans in Punjabi-style gravy." },
  { name: "Matar Paneer", price: "₹140", category: "Main Course", desc: "Peas and paneer in a tomato-onion gravy." },
  { name: "Baingan Bharta", price: "₹100", category: "Main Course", desc: "Smoky roasted aubergine mashed with spices." },
  // Breads
  { name: "Roti (2 pcs)", price: "₹20", category: "Breads", desc: "Soft whole wheat flatbreads from the tandoor." },
  { name: "Naan (2 pcs)", price: "₹40", category: "Breads", desc: "Fluffy leavened bread baked in tandoor." },
  { name: "Butter Naan", price: "₹50", category: "Breads", desc: "Naan brushed generously with butter." },
  { name: "Paratha", price: "₹35", category: "Breads", desc: "Flaky whole wheat bread, plain or stuffed." },
  { name: "Puri (4 pcs)", price: "₹30", category: "Breads", desc: "Puffed deep-fried wheat breads." },
  { name: "Aloo Paratha", price: "₹50", category: "Breads", desc: "Whole wheat bread stuffed with spiced potatoes." },
  // Rice & Biryani
  { name: "Steamed Rice", price: "₹50", category: "Rice & Biryani", desc: "Fluffy long-grain basmati rice." },
  { name: "Jeera Rice", price: "₹70", category: "Rice & Biryani", desc: "Basmati rice tempered with cumin." },
  { name: "Veg Biryani", price: "₹120", category: "Rice & Biryani", desc: "Fragrant basmati with vegetables & saffron." },
  { name: "Veg Pulao", price: "₹100", category: "Rice & Biryani", desc: "Lightly spiced vegetable rice pilaf." },
  { name: "Paneer Biryani", price: "₹140", category: "Rice & Biryani", desc: "Aromatic dum biryani with paneer and spices." },
  // Sweets
  { name: "Gulab Jamun", price: "₹40", category: "Sweets", desc: "Soft milk dumplings in rose syrup." },
  { name: "Kheer", price: "₹50", category: "Sweets", desc: "Rice pudding with cardamom and dry fruits." },
  { name: "Halwa", price: "₹40", category: "Sweets", desc: "Semolina or carrot pudding with ghee." },
  { name: "Rasgulla", price: "₹40", category: "Sweets", desc: "Soft spongy chhena balls in sugar syrup." },
  { name: "Shrikhand", price: "₹50", category: "Sweets", desc: "Strained yogurt sweetened with saffron & cardamom." },
  // Beverages
  { name: "Lassi (Sweet)", price: "₹40", category: "Beverages", desc: "Chilled yogurt drink, sweet & refreshing." },
  { name: "Chaas", price: "₹30", category: "Beverages", desc: "Spiced buttermilk, perfect digestive." },
  { name: "Masala Chai", price: "₹20", category: "Beverages", desc: "Ginger & cardamom spiced Indian tea." },
  { name: "Cold Drink", price: "₹30", category: "Beverages", desc: "Assorted chilled soft drinks." },
  { name: "Fresh Lime Soda", price: "₹35", category: "Beverages", desc: "Fresh lime with soda, sweet or salted." },
];

export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? menuItems : menuItems.filter(i => i.category === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-header", {
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".menu-header", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(".menu-item-card",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.035, duration: 0.45, ease: "power3.out" }
    );
  }, [active]);

  return (
    <section ref={sectionRef} id="menu" className="relative py-28 overflow-hidden bg-pattern-dots">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="menu-header text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/8">
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">Our Menu</span>
            <span className="text-amber-400 text-xs">✦</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A843" }}>
            A Feast for the Soul
          </h2>
          <div className="ornament-divider max-w-xs mx-auto my-4">
            <span className="text-amber-500 text-sm">❖</span>
          </div>

          {/* Pure Veg badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/40 bg-green-500/8 mb-4">
            <Leaf size={13} className="text-green-400" />
            <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">100% Pure Vegetarian</span>
          </div>

          <p className="text-amber-100/55 max-w-xl mx-auto block mt-3">
            From humble dal to rich biryanis — a complete pure veg spread at honest prices.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                active === cat
                  ? "btn-gold"
                  : "border border-amber-500/25 text-amber-300/70 hover:border-amber-500/50 hover:text-amber-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <div key={`${item.name}-${i}`} className="menu-item-card menu-card flex items-start gap-4 p-5 rounded-2xl border border-amber-500/12 bg-card">
              {/* Pure veg green dot */}
              <div className="mt-1 flex-shrink-0">
                <div className="w-4 h-4 rounded-sm border-2 border-green-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-amber-200 text-base leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.name}
                  </h4>
                  <span className="price-tag text-base font-bold flex-shrink-0">{item.price}</span>
                </div>
                <p className="text-amber-100/45 text-xs mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-amber-100/35 text-sm mt-8 italic">
          * 100% Pure Vegetarian. All prices inclusive of taxes.
        </p>
      </div>
    </section>
  );
}
