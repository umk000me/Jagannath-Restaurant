import { useEffect, useRef, useState, useCallback } from "react";
import { X, RotateCcw } from "lucide-react";

interface NutritionInfo {
  calories: string;
  portionSize: string;
  carbs: string;
  protein: string;
  fat: string;
  sugar?: string;
  dietaryTags: string[];
  allergens?: string[];
  spiceLevel?: string;
}

interface DishInfo {
  name: string;
  price: string;
  image: string;
  sketchfabEmbed?: string;
  tagline: string;
  ingredients: string[];
  cookingMethod: string;
  origin: string;
  servingTemp: string;
  funFact: string;
  color: string;
  glowColor: string;
  nutrition: NutritionInfo;
}

interface Dish3DViewerProps {
  dishName: string | null;
  onClose: () => void;
}

const DISH_DB: Record<string, DishInfo> = {
  "Paneer Butter Masala": {
    name: "Paneer Butter Masala",
    price: "₹150",
    image: "/dish_paneer_butter_masala.png",
    tagline: "India's Beloved Creamy Classic",
    ingredients: ["Fresh Paneer", "Tomatoes", "Butter", "Cream", "Cashews", "Garam Masala", "Fenugreek Leaves", "Ginger-Garlic Paste"],
    cookingMethod: "Slow-simmered tomato-cashew gravy, finished with fresh cream & butter",
    origin: "Punjab, North India",
    servingTemp: "Hot · Serve with Naan or Rice",
    funFact: "Also known as 'Paneer Makhani', this dish is one of the most ordered Indian dishes worldwide!",
    color: "#7A1F1F",
    glowColor: "rgba(122,31,31,0.35)",
    nutrition: {
      calories: "380 kcal",
      portionSize: "1 Bowl (300g)",
      carbs: "18g",
      protein: "14g",
      fat: "28g",
      sugar: "6g",
      dietaryTags: ["100% Pure Veg", "High Protein", "Rich Gravy", "Gluten-Free Gravy"],
      allergens: ["Milk (Dairy)", "Cashew (Tree Nuts)"],
      spiceLevel: "Mild-Medium 🌶️",
    },
  },
  "Dal Makhani": {
    name: "Dal Makhani",
    price: "₹120",
    image: "/dish_dal_makhani.png",
    tagline: "Slow-Cooked Overnight Luxury",
    ingredients: ["Whole Black Urad Dal", "Kidney Beans", "Tomato Purée", "Butter", "Fresh Cream", "Bay Leaves", "Cardamom", "Dried Chillies"],
    cookingMethod: "Simmered on low flame for 8–10 hours, finished with butter & cream",
    origin: "Punjab · Made famous by Moti Mahal, Delhi",
    servingTemp: "Hot · Pairs best with Naan or Roti",
    funFact: "The authentic recipe originated in the 1950s at Moti Mahal restaurant in Delhi.",
    color: "#571414",
    glowColor: "rgba(87,20,20,0.4)",
    nutrition: {
      calories: "310 kcal",
      portionSize: "1 Bowl (280g)",
      carbs: "34g",
      protein: "12g",
      fat: "14g",
      sugar: "4g",
      dietaryTags: ["100% Pure Veg", "High Fiber", "Overnight Dum Cooked", "Gluten-Free Gravy"],
      allergens: ["Milk (Dairy)"],
      spiceLevel: "Mild 🌶️",
    },
  },
  "Veg Biryani": {
    name: "Veg Biryani",
    price: "₹120",
    image: "/dish_veg_biryani.png",
    tagline: "Fragrant Dum-Cooked Royal Rice",
    ingredients: ["Basmati Rice", "Seasonal Vegetables", "Saffron", "Fried Onions", "Whole Spices", "Fresh Mint", "Rose Water", "Ghee"],
    cookingMethod: "Dum cooking — sealed and slow-cooked to trap all aromas inside",
    origin: "Mughal-era India · Hyderabadi influence",
    servingTemp: "Hot · Serve with Raita & Papad",
    funFact: "Biryani derives from the Persian word 'Birian' meaning fried before cooking. Saffron gives it that iconic golden hue!",
    color: "#D99A2B",
    glowColor: "rgba(217,154,43,0.4)",
    nutrition: {
      calories: "290 kcal",
      portionSize: "1 Full Plate (350g)",
      carbs: "52g",
      protein: "7g",
      fat: "6g",
      sugar: "3g",
      dietaryTags: ["100% Pure Veg", "Aromatic Basmati", "Pure Desi Ghee", "Gluten-Free"],
      allergens: ["Dairy (Ghee)"],
      spiceLevel: "Medium 🌶️🌶️",
    },
  },
  "Gulab Jamun": {
    name: "Gulab Jamun",
    price: "₹40",
    image: "/dish_gulab_jamun.png",
    sketchfabEmbed: "https://sketchfab.com/models/9a201133351c4217bb6cf5869fdf7378/embed?autostart=1&autospin=0.5&preload=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0",
    tagline: "Melt-in-Mouth Indian Sweetness",
    ingredients: ["Milk Solids (Khoya)", "All-Purpose Flour", "Rose Water", "Sugar Syrup", "Cardamom", "Saffron", "Pure Desi Ghee"],
    cookingMethod: "Deep-fried till golden brown in pure ghee, soaked in warm rose & cardamom syrup",
    origin: "Persian & Mughal origins · Popular across South Asia",
    servingTemp: "Warm (Best enjoyed warm or with ice cream)",
    funFact: "The name comes from Gulab (rose water) and Jamun (a dark purple berry). They absorb syrup up to twice their size!",
    color: "#D99A2B",
    glowColor: "rgba(217,154,43,0.4)",
    nutrition: {
      calories: "175 kcal",
      portionSize: "2 Pieces (approx 100g)",
      carbs: "28g",
      protein: "3.5g",
      fat: "6g",
      sugar: "18g",
      dietaryTags: ["100% Pure Veg", "Made in Pure Desi Ghee", "Fresh Khoya", "No Preservatives"],
      allergens: ["Milk (Dairy)", "Gluten (Maida)"],
      spiceLevel: "Sweet 🍯",
    },
  },
};

export const DISH_3D_NAMES = Object.keys(DISH_DB);

export default function Dish3DViewer({ dishName, onClose }: Dish3DViewerProps) {
  const dish = dishName ? DISH_DB[dishName] : null;

  const [rotX, setRotX] = useState(-15);
  const [rotY, setRotY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [infoVisible, setInfoVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [autoTabLoop, setAutoTabLoop] = useState(true);
  const [viewMode, setViewMode] = useState<"sketchfab" | "cube">("sketchfab");

  const lastPos = useRef({ x: 0, y: 0 });
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tabs = ["⚡ Nutrition", "Ingredients", "Method", "Origin", "Fun Fact"];

  useEffect(() => {
    if (!dish) return;
    setRotX(-15);
    setRotY(0);
    setAutoRotate(true);
    setInfoVisible(false);
    setActiveTab(0);
    setAutoTabLoop(true);
    setViewMode(dish.sketchfabEmbed ? "sketchfab" : "cube");
    const t = setTimeout(() => setInfoVisible(true), 500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dishName]);

  // ── Auto-rotate 3D cube ──────────────────────
  useEffect(() => {
    if (!autoRotate) {
      if (autoRef.current) clearInterval(autoRef.current);
      return;
    }
    autoRef.current = setInterval(() => setRotY(prev => prev + 0.35), 16);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [autoRotate]);

  // ── Auto-cycle Nutrition & Ingredient Showcase Tabs ──
  useEffect(() => {
    if (!autoTabLoop) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [autoTabLoop, tabs.length]);

  const normalizedY = ((rotY % 360) + 360) % 360;
  const infoSectionIndex = Math.floor(normalizedY / 90) % 4;

  const infoSections = dish ? [
    { label: "🌿 Ingredients" },
    { label: "👨‍🍳 Cooking Method" },
    { label: "📍 Origin" },
    { label: "✨ Fun Fact" },
  ] : [];

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    lastPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    setAutoRotate(false);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setRotY(prev => prev + dx * 0.55);
    setRotX(prev => Math.max(-50, Math.min(50, prev + dy * 0.3)));
  }, [isDragging]);

  const onPointerUp = useCallback(() => setIsDragging(false), []);

  if (!dish) return null;

  return (
    <div className="d3v-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="d3v-modal">
        <button className="d3v-close" onClick={onClose} aria-label="Close viewer"><X size={18} /></button>

        {/* ── LEFT: 3D Scene ── */}
        <div className="d3v-scene-wrapper">
          {dish.sketchfabEmbed && viewMode === "sketchfab" ? (
            <div className="w-full h-full min-h-[320px] md:min-h-[440px] relative flex flex-col items-center justify-center bg-black/90">
              <iframe
                title={`${dish.name} 3D Model`}
                src={dish.sketchfabEmbed}
                className="w-full h-full min-h-[320px] md:min-h-[440px] border-0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking="true"
                execution-while-out-of-viewport="true"
                execution-while-not-rendered="true"
                web-share="true"
                allowFullScreen
              />
              {/* Badge Overlay */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-saffron/40 text-saffron text-xs font-semibold z-10 pointer-events-none flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Interactive 3D Model</span>
              </div>
            </div>
          ) : (
            <>
              <div className="d3v-glow-floor" style={{ background: `radial-gradient(ellipse 70% 28% at 50% 100%, ${dish.glowColor}, transparent 70%)` }} />
              <p className="d3v-drag-hint" style={{ opacity: isDragging ? 0 : 1 }}>↔ Drag to rotate the dish</p>

              <div
                className={"d3v-scene" + (isDragging ? " d3v-grabbing" : "")}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
              >
                <div className="d3v-cube" style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}>
                  {/* FRONT */}
                  <div className="d3v-face d3v-front">
                    <img src={dish.image} alt={dish.name} draggable={false} />
                    <div className="d3v-face-title-bar" style={{ background: `linear-gradient(transparent, ${dish.color}dd)` }}>
                      <span>{dish.name}</span>
                    </div>
                  </div>
                  {/* BACK */}
                  <div className="d3v-face d3v-back">
                    <div className="d3v-face-inner">
                      <span className="d3v-face-icon">✨</span>
                      <h4>Fun Fact</h4>
                      <p>{dish.funFact}</p>
                    </div>
                  </div>
                  {/* LEFT */}
                  <div className="d3v-face d3v-left">
                    <div className="d3v-face-inner">
                      <span className="d3v-face-icon">📍</span>
                      <h4>Origin</h4>
                      <p>{dish.origin}</p>
                      <small>{dish.servingTemp}</small>
                    </div>
                  </div>
                  {/* RIGHT */}
                  <div className="d3v-face d3v-right">
                    <div className="d3v-face-inner">
                      <span className="d3v-face-icon">👨‍🍳</span>
                      <h4>Method</h4>
                      <p>{dish.cookingMethod}</p>
                    </div>
                  </div>
                  {/* TOP */}
                  <div className="d3v-face d3v-top">
                    <div className="d3v-face-inner">
                      <span className="d3v-face-icon">🌿</span>
                      <h4>Key Ingredients</h4>
                      <p>{dish.ingredients.slice(0, 4).join(" · ")}</p>
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="d3v-face d3v-bottom">
                    <div className="d3v-face-inner">
                      <span className="d3v-face-icon">🍽️</span>
                      <p>{dish.servingTemp}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current face label */}
              <div className="d3v-face-label" style={{ color: dish.color }}>
                {infoSections[infoSectionIndex]?.label}
              </div>

              {/* Controls */}
              <div className="d3v-controls">
                <button
                  className={"d3v-ctrl" + (autoRotate ? " d3v-ctrl-active" : "")}
                  style={autoRotate ? { borderColor: dish.color, color: dish.color } : {}}
                  onClick={() => setAutoRotate(v => !v)}
                >
                  <RotateCcw size={12} />
                  {autoRotate ? "Auto" : "Manual"}
                </button>
                <button className="d3v-ctrl" onClick={() => { setRotX(-15); setRotY(0); setAutoRotate(true); }}>
                  Reset
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT: Info Panel ── */}
        <div className={"d3v-info" + (infoVisible ? " d3v-info-visible" : "")}>
          <div className="d3v-info-header">
            <div className="flex items-center gap-2 mb-1">
              <span className="d3v-veg-badge" style={{ borderColor: dish.color, color: dish.color }}>🌿 Pure Veg</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20">
                🔥 {dish.nutrition.calories}
              </span>
            </div>
            <h2 className="d3v-dish-name" style={{ color: dish.color }}>{dish.name}</h2>
            <p className="d3v-tagline">{dish.tagline}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="d3v-price" style={{ background: dish.color }}>From {dish.price}</span>
              <span className="text-xs font-medium text-text-sec">Portion: {dish.nutrition.portionSize}</span>
            </div>
          </div>

          {/* Tab auto-loop progress track */}
          <div className="w-full h-1 bg-border-soft/40 rounded-full overflow-hidden mt-3 mb-3">
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{
                width: `${((activeTab + 1) / tabs.length) * 100}%`,
                background: dish.color,
              }}
            />
          </div>

          {/* Tabs */}
          <div className="d3v-tabs">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={"d3v-tab" + (activeTab === i ? " d3v-tab-active" : "")}
                style={activeTab === i ? { borderColor: dish.color, color: dish.color } : {}}
                onClick={() => {
                  setActiveTab(i);
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab body */}
          <div className="d3v-tab-body">
            {/* NUTRITION & CALORIES TAB */}
            {activeTab === 0 && (
              <div className="space-y-2.5">
                {/* Hero Calories Box */}
                <div className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-500/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-text-sec uppercase tracking-wider font-semibold block">Energy Value</span>
                    <span className="text-xl font-bold font-serif text-maroon">{dish.nutrition.calories}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-text-sec uppercase tracking-wider font-semibold block">Portion Size</span>
                    <span className="text-xs font-semibold text-text-main">{dish.nutrition.portionSize}</span>
                  </div>
                </div>

                {/* Macro Grid */}
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  <div className="p-1.5 rounded bg-cream border border-border-soft">
                    <span className="text-[9px] text-text-sec uppercase block font-medium">Carbs</span>
                    <span className="text-xs font-bold text-text-main">{dish.nutrition.carbs}</span>
                  </div>
                  <div className="p-1.5 rounded bg-cream border border-border-soft">
                    <span className="text-[9px] text-text-sec uppercase block font-medium">Protein</span>
                    <span className="text-xs font-bold text-text-main">{dish.nutrition.protein}</span>
                  </div>
                  <div className="p-1.5 rounded bg-cream border border-border-soft">
                    <span className="text-[9px] text-text-sec uppercase block font-medium">Fat</span>
                    <span className="text-xs font-bold text-text-main">{dish.nutrition.fat}</span>
                  </div>
                  <div className="p-1.5 rounded bg-cream border border-border-soft">
                    <span className="text-[9px] text-text-sec uppercase block font-medium">Sugar</span>
                    <span className="text-xs font-bold text-text-main">{dish.nutrition.sugar || "0g"}</span>
                  </div>
                </div>

                {/* Dietary Tags */}
                <div>
                  <span className="text-[10px] font-semibold text-text-sec uppercase tracking-wider block mb-1">Dietary Highlights</span>
                  <div className="flex flex-wrap gap-1">
                    {dish.nutrition.dietaryTags.map(tag => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-800 border border-green-500/30 font-medium">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Allergens */}
                {dish.nutrition.allergens && dish.nutrition.allergens.length > 0 && (
                  <div className="pt-1.5 border-t border-border-soft/60">
                    <p className="text-[11px] text-text-sec leading-snug">
                      <strong className="text-maroon">⚠️ Allergens:</strong> {dish.nutrition.allergens.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* INGREDIENTS TAB */}
            {activeTab === 1 && (
              <div className="d3v-chips">
                {dish.ingredients.map(ing => (
                  <span key={ing} className="d3v-chip" style={{ borderColor: `${dish.color}55` }}>{ing}</span>
                ))}
              </div>
            )}

            {/* METHOD TAB */}
            {activeTab === 2 && <p className="d3v-body-text">{dish.cookingMethod}</p>}

            {/* ORIGIN TAB */}
            {activeTab === 3 && (
              <div>
                <p className="d3v-body-text">{dish.origin}</p>
                <p className="d3v-body-text d3v-body-muted">🍽️ {dish.servingTemp}</p>
              </div>
            )}

            {/* FUN FACT TAB */}
            {activeTab === 4 && (
              <div className="d3v-funfact-block">
                <span>✨</span>
                <p className="d3v-body-text">{dish.funFact}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

