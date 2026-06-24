import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, SlidersHorizontal, Star, MapPin, Heart, Shield, RefreshCw, Headphones, Home, Hotel, Tent, Users, Wifi } from "lucide-react";
import { STAYS } from "@/data/data";
import bookingsBg from "@assets/zambia_Kuchalo_bookings_1782355516539.png";

const FILTERS = ["All", "Hotels", "Lodges", "Guest Houses", "BnBs", "Camps"];

const AMENITY_ICONS: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  "Pool": Home,
  "Restaurant": Users,
  "AC": RefreshCw,
  "Safari": Tent,
  "Bar": Users,
  "Breakfast": Users,
  "Parking": Home,
  "River View": Home,
};

export default function Bookings() {
  const [activeFilter, setActiveFilter] = useState("All");
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
        style={{ backgroundImage: `url(${bookingsBg})`, backgroundAttachment: "fixed" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(5,10,5,0.84)" }} />

      <div className="relative z-10 pt-24 pb-28 px-4">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h2 className="text-2xl font-bold text-white">Bookings</h2>
          <p className="text-white/60 text-sm mt-1">
            Stay. Relax. Experience <span className="text-green-400">Zambia.</span>
          </p>
        </motion.div>

        {/* Search bar */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-2xl mb-3"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
        >
          <Search className="w-4 h-4 text-white/50 flex-shrink-0" />
          <input
            data-testid="search-bookings"
            type="text"
            placeholder="Where do you want to stay?"
            className="flex-1 bg-transparent text-white/80 text-xs placeholder:text-white/40 outline-none"
          />
          <div className="flex items-center gap-1.5 border-l border-white/20 pl-2">
            <div className="flex flex-col items-center">
              <span className="text-white/40 text-[8px]">Check-in</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-white/60" />
                <span className="text-white/60 text-[9px]">Add date</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 border-l border-white/20 pl-2">
            <div className="flex flex-col items-center">
              <span className="text-white/40 text-[8px]">Check-out</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-white/60" />
                <span className="text-white/60 text-[9px]">Add date</span>
              </div>
            </div>
          </div>
          <button
            data-testid="filter-bookings-icon"
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(26,140,26,0.3)", border: "1px solid rgba(34,197,94,0.3)" }}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-green-400" />
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-5">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              data-testid={`filter-${filter.toLowerCase().replace(" ", "-")}`}
              onClick={() => setActiveFilter(filter)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all"
              style={{
                background: activeFilter === filter ? "rgba(26,140,26,0.9)" : "rgba(255,255,255,0.08)",
                border: activeFilter === filter ? "1px solid rgba(34,197,94,0.5)" : "1px solid rgba(255,255,255,0.12)",
                color: activeFilter === filter ? "white" : "rgba(255,255,255,0.7)",
                backdropFilter: "blur(8px)",
              }}
            >
              {filter === "All" && <Home className="w-3 h-3" />}
              {filter === "Hotels" && <Hotel className="w-3 h-3" />}
              {filter === "Lodges" && <Tent className="w-3 h-3" />}
              {filter === "Guest Houses" && <Home className="w-3 h-3" />}
              {filter === "BnBs" && <Users className="w-3 h-3" />}
              {filter === "Camps" && <Tent className="w-3 h-3" />}
              {filter}
            </button>
          ))}
        </div>

        {/* Top Stays */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-base">Top Stays in Zambia</h3>
            <button className="text-green-400 text-xs">View all →</button>
          </div>

          <div className="flex flex-col gap-3">
            {STAYS.map((stay, i) => (
              <motion.div
                key={stay.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex gap-3 p-3">
                  {/* Image */}
                  <div
                    className="relative flex-shrink-0 rounded-xl overflow-hidden"
                    style={{ width: "90px", height: "80px", background: stay.gradient }}
                  >
                    {stay.featured && (
                      <div
                        className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-semibold flex items-center gap-0.5"
                        style={{ background: "rgba(234,179,8,0.9)", color: "white" }}
                      >
                        <Star className="w-2 h-2 fill-white" />
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-white font-semibold text-sm truncate">{stay.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5 text-white/50 flex-shrink-0" />
                          <p className="text-white/55 text-[10px] truncate">{stay.location}, {stay.province}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-yellow-400 text-[11px] font-semibold">{stay.rating}</span>
                          <span className="text-white/40 text-[10px]">({stay.reviews} reviews)</span>
                        </div>
                      </div>
                      <button
                        data-testid={`save-stay-${stay.id}`}
                        onClick={() => toggleSave(stay.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <Heart
                          className="w-3.5 h-3.5"
                          style={{ color: savedItems.has(stay.id) ? "#ef4444" : "rgba(255,255,255,0.5)", fill: savedItems.has(stay.id) ? "#ef4444" : "none" }}
                        />
                      </button>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {stay.amenities.map((a) => (
                        <span
                          key={a}
                          className="text-[9px] text-white/60 flex items-center gap-0.5 px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price + Book */}
                <div
                  className="flex items-center justify-between px-3 pb-3 pt-0"
                >
                  <div>
                    <span className="text-white/50 text-[9px]">From</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-white font-bold text-base">{stay.currency}{stay.price.toLocaleString()}</span>
                      <span className="text-white/50 text-[9px]">per night</span>
                    </div>
                  </div>
                  <button
                    data-testid={`book-stay-${stay.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: "#1a8c1a", color: "white", border: "1px solid rgba(34,197,94,0.4)" }}
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Best Price Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-4 mb-4 relative overflow-hidden"
          style={{ background: "rgba(26,140,26,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(26,140,26,0.3)" }}
            >
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Best Price Guarantee</p>
              <p className="text-white/60 text-xs mt-0.5">Found a better price elsewhere? We'll match it.</p>
              <button className="text-green-400 text-xs mt-1.5">Learn more →</button>
            </div>
          </div>
        </motion.div>

        {/* Footer trust signals */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Shield, title: "Secure Booking", desc: "Your data is safe with us" },
            { icon: RefreshCw, title: "Flexible Options", desc: "Free cancellation on selected stays" },
            { icon: Headphones, title: "24/7 Support", desc: "We're here to help" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl p-2.5 flex flex-col items-center text-center"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <item.icon className="w-4 h-4 text-white/50 mb-1.5" />
              <p className="text-white/70 text-[9px] font-medium leading-tight">{item.title}</p>
              <p className="text-white/40 text-[8px] mt-0.5 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
