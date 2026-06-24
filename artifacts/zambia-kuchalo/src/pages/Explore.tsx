import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Heart, MapPin, Star, Navigation } from "lucide-react";
import { EXPERIENCES, DESTINATIONS } from "@/data/data";
import exploreBg from "@assets/zambia_Kuchalo_explore_1782355526807.png";

const CATEGORIES = [
  { id: "waterfalls", label: "Waterfalls", icon: "💧" },
  { id: "wildlife", label: "Wildlife", icon: "🦁" },
  { id: "adventure", label: "Adventure", icon: "⛰" },
  { id: "culture", label: "Culture", icon: "🎭" },
  { id: "lakes", label: "Lakes & Rivers", icon: "🌊" },
  { id: "history", label: "History", icon: "🏛" },
  { id: "food", label: "Food & Drink", icon: "🍽" },
];

const TRENDING = [
  { id: "vf", name: "Victoria Falls", location: "Livingstone, Southern Province", rating: 4.9, gradient: "linear-gradient(135deg, #0a2a3a 0%, #0a5a5a 100%)" },
  { id: "sl", name: "South Luangwa National Park", location: "Eastern Province", rating: 4.8, gradient: "linear-gradient(135deg, #2a1a00 0%, #6a4a00 100%)" },
  { id: "lt", name: "Lake Tanganyika", location: "Northern Province", rating: 4.7, gradient: "linear-gradient(135deg, #0a1a4a 0%, #0a3a7a 100%)" },
  { id: "lz", name: "Lower Zambezi National Park", location: "Southern Province", rating: 4.6, gradient: "linear-gradient(135deg, #0a2a1a 0%, #0a5a2a 100%)" },
];

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${exploreBg})`, backgroundAttachment: "fixed" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(5,15,5,0.82)" }} />

      <div className="relative z-10 pt-24 pb-24 px-4">
        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <h2 className="text-2xl font-bold text-white">
            Explore <span className="text-green-400">Zambia</span>
          </h2>
          <p className="text-white/60 text-sm mt-1 leading-relaxed">
            Discover places, experiences and hidden gems across the land of natural wonders.
          </p>
        </motion.div>

        {/* Search bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
        >
          <Search className="w-4 h-4 text-white/50 flex-shrink-0" />
          <input
            data-testid="search-explore"
            type="text"
            placeholder="Search destinations, activities..."
            className="flex-1 bg-transparent text-white/80 text-sm placeholder:text-white/40 outline-none"
          />
          <button
            data-testid="filter-explore"
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(26,140,26,0.3)", border: "1px solid rgba(34,197,94,0.3)" }}
          >
            <SlidersHorizontal className="w-4 h-4 text-green-400" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-base">Categories</h3>
            <button className="text-green-400 text-xs">View all →</button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-testid={`category-${cat.id}`}
                onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl transition-all"
                style={{
                  background: activeCategory === cat.id ? "rgba(26,140,26,0.3)" : "rgba(255,255,255,0.07)",
                  border: activeCategory === cat.id ? "1px solid rgba(34,197,94,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-white/80 text-[10px] font-medium whitespace-nowrap">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Trending Now */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-base">Trending Now</h3>
            <button className="text-green-400 text-xs">View all →</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {TRENDING.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex-shrink-0 relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  width: "160px",
                  height: "200px",
                  background: item.gradient,
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-semibold flex items-center gap-1"
                  style={{ background: "rgba(26,140,26,0.85)", color: "white" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                  Trending
                </div>
                <button
                  data-testid={`save-trending-${item.id}`}
                  onClick={() => toggleSave(item.id)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <Heart
                    className="w-3.5 h-3.5"
                    style={{ color: savedItems.has(item.id) ? "#ef4444" : "white", fill: savedItems.has(item.id) ? "#ef4444" : "none" }}
                  />
                </button>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-bold text-xs leading-tight">{item.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-2.5 h-2.5 text-white/60" />
                    <p className="text-white/60 text-[9px]">{item.location}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400 text-[10px] font-medium">{item.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nearby Experiences */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-base">Nearby Experiences</h3>
            <button className="text-green-400 text-xs">View all →</button>
          </div>
          <div className="flex gap-3">
            {/* Map placeholder */}
            <div
              className="flex-1 rounded-2xl p-4 flex flex-col justify-between"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", minHeight: "120px" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-4 h-4 text-white/60" />
                <span className="text-white/70 text-xs font-medium">Experiences near you</span>
              </div>
              <p className="text-white/40 text-[10px] mb-3">See what's around your location</p>
              <button
                data-testid="enable-location"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium self-start"
                style={{ background: "rgba(26,140,26,0.3)", border: "1px solid rgba(34,197,94,0.4)", color: "#4ade80" }}
              >
                <Navigation className="w-3 h-3" />
                Enable Location
              </button>
            </div>
            {/* Top Rated */}
            <div
              className="w-28 rounded-2xl p-3 flex flex-col justify-between"
              style={{ background: "linear-gradient(135deg, #0a2a1a 0%, #1a5a2a 100%)", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-3 h-3 text-green-400" />
                <span className="text-green-400 text-[9px] font-semibold">Top Rated</span>
              </div>
              <p className="text-white/80 text-[9px]">Highest rated experiences</p>
              <button className="text-green-400 text-[9px] mt-2 text-left">See all →</button>
            </div>
          </div>
        </div>

        {/* Featured Experiences */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-base">Featured Experiences</h3>
            <button className="text-green-400 text-xs">View all →</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  height: "120px",
                  background: exp.gradient,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <button
                  data-testid={`save-experience-${exp.id}`}
                  onClick={() => toggleSave(exp.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <Heart
                    className="w-3 h-3"
                    style={{ color: savedItems.has(exp.id) ? "#ef4444" : "white", fill: savedItems.has(exp.id) ? "#ef4444" : "none" }}
                  />
                </button>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <p className="text-white font-semibold text-[10px] leading-tight">{exp.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2 h-2 text-white/60" />
                    <p className="text-white/60 text-[9px]">{exp.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
