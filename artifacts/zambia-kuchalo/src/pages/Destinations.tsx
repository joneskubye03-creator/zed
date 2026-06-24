import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Heart, MapPin, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { DESTINATIONS } from "@/data/data";
import destBg from "@assets/zambia_Kuchalo_destinations_1782355516554.png";

const featured = DESTINATIONS.filter(d => d.featured);
const grid = DESTINATIONS.filter(d => !d.featured);

export default function Destinations() {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeFeatured = featured[featuredIdx];

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${destBg})`, backgroundAttachment: "fixed" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(5,15,5,0.80)" }} />

      <div className="relative z-10 pt-24 pb-24 px-4">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h2 className="text-2xl font-bold text-white">
            Discover <span className="text-green-400">Zambia</span>
          </h2>
          <p className="text-white/60 text-sm mt-1">Explore. Experience. Remember.</p>
        </motion.div>

        {/* Search */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
        >
          <Search className="w-4 h-4 text-white/50 flex-shrink-0" />
          <input
            data-testid="search-destinations"
            type="text"
            placeholder="Search destinations..."
            className="flex-1 bg-transparent text-white/80 text-sm placeholder:text-white/40 outline-none"
          />
          <button
            data-testid="filter-destinations"
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium"
            style={{ background: "rgba(26,140,26,0.3)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}
          >
            <SlidersHorizontal className="w-3 h-3" />
            Filter
          </button>
        </div>

        {/* Featured Destinations */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-base">Featured Destinations</h3>
            <button className="text-green-400 text-xs">View all →</button>
          </div>

          {/* Hero card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ height: "220px", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeatured.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
                style={{ background: activeFeatured.gradient }}
              />
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />

            {/* Most popular badge */}
            <div className="absolute top-3 left-3">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{ background: "rgba(26,140,26,0.85)", color: "white" }}
              >
                Most Popular
              </span>
            </div>

            <button
              data-testid={`save-featured-${activeFeatured.id}`}
              onClick={() => toggleSave(activeFeatured.id)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <Heart
                className="w-4 h-4"
                style={{ color: savedItems.has(activeFeatured.id) ? "#ef4444" : "white", fill: savedItems.has(activeFeatured.id) ? "#ef4444" : "none" }}
              />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={() => setFeaturedIdx(prev => (prev - 1 + featured.length) % featured.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.4)" }}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setFeaturedIdx(prev => (prev + 1) % featured.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.4)" }}
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeatured.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <h4 className="text-white font-bold text-xl">{activeFeatured.name}</h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-white/60" />
                    <span className="text-white/60 text-xs">{activeFeatured.location}, {activeFeatured.province}</span>
                  </div>
                  <p className="text-white/70 text-xs mt-1.5 leading-relaxed">{activeFeatured.description}</p>
                  <div className="flex items-center justify-between mt-2.5">
                    <button
                      data-testid="explore-now"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
                      style={{ background: "rgba(26,140,26,0.9)", border: "1px solid rgba(34,197,94,0.5)", color: "white" }}
                    >
                      Explore Now →
                    </button>
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-1.5">
                        {[1, 2, 3].map(n => (
                          <div
                            key={n}
                            className="w-6 h-6 rounded-full border-2 border-black/50"
                            style={{ background: `hsl(${n * 60 + 120} 50% 40%)` }}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-white/60" />
                        <span className="text-white/70 text-[10px]">{activeFeatured.visitors} visitors</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5" style={{ bottom: "auto", top: "auto", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            </div>
          </div>

          {/* Dots below card */}
          <div className="flex justify-center gap-1.5 mt-2">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setFeaturedIdx(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === featuredIdx ? "16px" : "6px",
                  height: "6px",
                  background: i === featuredIdx ? "#22c55e" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Grid destinations */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-2">
            {[...featured.slice(1), ...grid].map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ height: "110px", background: dest.gradient, border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <button
                  data-testid={`save-dest-${dest.id}`}
                  onClick={() => toggleSave(dest.id)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <Heart
                    className="w-3 h-3"
                    style={{ color: savedItems.has(dest.id) ? "#ef4444" : "white", fill: savedItems.has(dest.id) ? "#ef4444" : "none" }}
                  />
                </button>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-white font-semibold text-[10px] leading-tight">{dest.name}</p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <MapPin className="w-2 h-2 text-white/60" />
                    <p className="text-white/60 text-[8px]">{dest.province}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Find stays banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}
        >
          <div>
            <p className="text-white font-semibold text-sm">Find the perfect stay</p>
            <p className="text-white/50 text-xs mt-0.5">Hotels, Lodges, Camps & More</p>
          </div>
          <button
            data-testid="view-stays"
            className="px-4 py-2 rounded-xl text-xs font-semibold"
            style={{ background: "rgba(26,140,26,0.9)", color: "white", border: "1px solid rgba(34,197,94,0.4)" }}
          >
            View Stays →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
