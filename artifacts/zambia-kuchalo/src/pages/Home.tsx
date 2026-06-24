import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronRight, MapPin, X, Play } from "lucide-react";
import { PROVINCES, type Province, type Place } from "@/data/data";
import homeBg from "@assets/zambia_Kuchalo_home_1782355526805.jpg";

const PROVINCE_ORDER = [
  "lusaka", "muchinga", "copperbelt", "northwestern",
  "eastern", "luapula", "northern", "central", "southern", "western"
];

const orderedProvinces = PROVINCE_ORDER.map(id => PROVINCES.find(p => p.id === id)!);

type ViewMode = "provinces" | "places";

interface GalleryModal {
  place: Place;
  province: Province;
}

/* ── Province Card ── */
function ProvinceCard({
  province, isCenter, onClick,
}: {
  province: Province; isCenter: boolean; onClick: () => void;
}) {
  const w = isCenter ? 116 : 90;
  const h = isCenter ? 188 : 162;
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden"
      style={{
        width: w, height: h,
        boxShadow: isCenter
          ? `0 0 20px ${province.accentColor}80, 0 8px 28px rgba(0,0,0,0.6)`
          : "0 4px 14px rgba(0,0,0,0.4)",
        border: isCenter
          ? `1.5px solid ${province.accentColor}`
          : "1px solid rgba(255,255,255,0.10)",
        transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
        zIndex: isCenter ? 2 : 1,
      }}
    >
      {/* Background image */}
      <img
        src={province.image}
        alt={province.name}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Book Now */}
      <div className="absolute top-2 right-2 z-10">
        <button
          data-testid={`book-now-province-${province.id}`}
          onClick={(e) => e.stopPropagation()}
          className="px-2 py-0.5 text-[9px] font-semibold rounded-full"
          style={{ background: "rgba(26,140,26,0.9)", color: "white", border: "1px solid rgba(34,197,94,0.5)" }}
        >
          Book Now
        </button>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        {isCenter && (
          <div
            className="text-[8px] font-semibold mb-1 px-1.5 py-0.5 rounded-full inline-block"
            style={{ background: province.accentColor, color: "white" }}
          >
            {province.places[0]?.name}
          </div>
        )}
        <p className="text-white font-bold text-[10px] leading-tight">{province.name}</p>
        <p className="text-white/70 text-[8px] mt-0.5">{province.tagline}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-white/55 text-[7px]">Tap to view more</span>
          <ChevronRight className="w-2 h-2 text-white/55" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Place Card ── */
function PlaceCard({
  place, province, isCenter, onClick,
}: {
  place: Place; province: Province; isCenter: boolean; onClick: () => void;
}) {
  const w = isCenter ? 116 : 90;
  const h = isCenter ? 188 : 162;
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden"
      style={{
        width: w, height: h,
        boxShadow: isCenter
          ? `0 0 20px ${province.accentColor}80, 0 8px 28px rgba(0,0,0,0.6)`
          : "0 4px 14px rgba(0,0,0,0.4)",
        border: isCenter
          ? `1.5px solid ${province.accentColor}`
          : "1px solid rgba(255,255,255,0.10)",
        transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
        zIndex: isCenter ? 2 : 1,
      }}
    >
      <img
        src={place.image}
        alt={place.name}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Book Now */}
      <div className="absolute top-2 right-2 z-10">
        <button
          data-testid={`book-now-place-${place.id}`}
          onClick={(e) => e.stopPropagation()}
          className="px-2 py-0.5 text-[9px] font-semibold rounded-full"
          style={{ background: "rgba(26,140,26,0.9)", color: "white", border: "1px solid rgba(34,197,94,0.5)" }}
        >
          Book Now
        </button>
      </div>

      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />

      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-white font-bold text-[10px] leading-tight">{place.name}</p>
        <p className="text-white/70 text-[8px] mt-0.5">{place.tagline}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-white/55 text-[7px]">Tap to view more</span>
          <ChevronRight className="w-2 h-2 text-white/55" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Gallery Modal ── */
function GalleryModalView({
  place, province, onClose,
}: {
  place: Place; province: Province; onClose: () => void;
}) {
  const [activeImg, setActiveImg] = useState(0);
  const images = [
    province.image,
    place.image,
    `${province.image}&sig=1`,
    `${place.image}&sig=2`,
    `${province.image}&sig=3`,
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveImg(p => (p + 1) % images.length), 20000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-[370px] mx-4 rounded-3xl overflow-hidden"
        style={{
          background: "#0a120a",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
          maxHeight: "82vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image */}
        <div className="relative h-64 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImg}
              src={images[activeImg]}
              alt={place.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.65) 100%)" }} />

          {/* Controls */}
          <div className="absolute top-3 left-0 right-0 px-4 flex justify-between items-center">
            <button
              onClick={onClose}
              data-testid="gallery-close"
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <button
              data-testid="gallery-book-now"
              className="px-3 py-1.5 text-xs font-semibold rounded-full"
              style={{ background: "#1a8c1a", color: "white", border: "1px solid rgba(34,197,94,0.5)" }}
            >
              Book Now
            </button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === activeImg ? "16px" : "6px",
                  height: "6px",
                  background: i === activeImg ? "#1a8c1a" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-white font-bold text-lg">{place.name}</h3>
          <div className="flex items-center gap-1 mt-0.5 mb-2">
            <MapPin className="w-3 h-3 text-green-400" />
            <span className="text-white/60 text-xs">{province.name}</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-4">{place.description}</p>

          {/* Video placeholder */}
          <div
            className="rounded-xl p-3 flex items-center gap-3 mb-4"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#1a8c1a" }}>
              <Play className="w-4 h-4 text-white ml-0.5" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Experience Video</p>
              <p className="text-white/50 text-xs">Tap to play — coming soon</p>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className="flex-shrink-0 rounded-lg overflow-hidden"
                style={{
                  width: "54px", height: "38px",
                  border: i === activeImg ? "2px solid #1a8c1a" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Home Page ── */
export default function Home() {
  const [activeProvinceIdx, setActiveProvinceIdx] = useState(8); // Southern Province
  const [viewMode, setViewMode] = useState<ViewMode>("provinces");
  const [activePlaceIdx, setActivePlaceIdx] = useState(0);
  const [gallery, setGallery] = useState<GalleryModal | null>(null);
  const [showingPlacesFor, setShowingPlacesFor] = useState<Province | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeProvince = orderedProvinces[activeProvinceIdx];
  const currentPlaces = showingPlacesFor?.places ?? [];
  const displayName = viewMode === "places" && showingPlacesFor
    ? showingPlacesFor.name
    : activeProvince.name;

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (viewMode === "provinces") {
        setActiveProvinceIdx(p => (p + 1) % orderedProvinces.length);
      } else {
        setActivePlaceIdx(p => (p + 1) % Math.max(currentPlaces.length, 1));
      }
    }, 20000);
  }, [viewMode, currentPlaces.length]);

  useEffect(() => {
    startAutoSlide();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoSlide]);

  const handleProvinceCardClick = (province: Province) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setShowingPlacesFor(province);
      setViewMode("places");
      setActivePlaceIdx(0);
      setTransitioning(false);
    }, 350);
  };

  const handlePlaceCardClick = (place: Place, province: Province) => {
    setGallery({ place, province });
  };

  const handleNavProvinceClick = (province: Province, idx: number) => {
    if (viewMode === "places") {
      setTransitioning(true);
      setTimeout(() => {
        setViewMode("provinces");
        setShowingPlacesFor(null);
        setActiveProvinceIdx(idx);
        setTransitioning(false);
      }, 250);
    } else {
      setActiveProvinceIdx(idx);
    }
  };

  // Swipe handling
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (viewMode === "provinces") {
        setActiveProvinceIdx(p => diff > 0
          ? (p + 1) % orderedProvinces.length
          : (p - 1 + orderedProvinces.length) % orderedProvinces.length);
      } else {
        setActivePlaceIdx(p => diff > 0
          ? (p + 1) % currentPlaces.length
          : (p - 1 + currentPlaces.length) % currentPlaces.length);
      }
    }
  };

  // Exactly 3 cards: left (-1), center (0), right (+1)
  const getThreeCards = () => {
    if (viewMode === "provinces") {
      const n = orderedProvinces.length;
      return [-1, 0, 1].map(offset => ({
        key: `${offset}`,
        province: orderedProvinces[(activeProvinceIdx + offset + n) % n],
        isCenter: offset === 0,
      }));
    } else {
      const n = currentPlaces.length;
      return [-1, 0, 1].map(offset => ({
        key: `${offset}`,
        place: currentPlaces[(activePlaceIdx + offset + n) % n],
        isCenter: offset === 0,
      }));
    }
  };

  const activeIdx = viewMode === "provinces" ? activeProvinceIdx : activePlaceIdx;
  const totalDots = viewMode === "provinces" ? orderedProvinces.length : currentPlaces.length;

  return (
    <div className="flex-1 overflow-hidden relative flex flex-col" style={{ height: "100%" }}>
      {/* Cinematic background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeProvince.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{ backgroundImage: `url(${homeBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
      </AnimatePresence>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(5,15,5,0.72) 38%, rgba(5,15,5,0.93) 100%)" }}
      />

      {/* ── HEADER ── */}
      <div className="relative z-10 pt-10 px-4">
        <div className="flex items-center justify-between">
          <h1
            className="text-[22px] leading-none"
            style={{ fontFamily: "'Dancing Script', cursive", color: "white", fontWeight: 700 }}
          >
            Zambia Kuchalo
          </h1>
          <div className="relative">
            <button
              data-testid="notification-bell"
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <Bell className="w-4 h-4 text-white" />
            </button>
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-green-500 border border-black" />
          </div>
        </div>

        {/* Zambia flag stripes */}
        <div className="flex h-[3px] mt-2 rounded-full overflow-hidden gap-0.5">
          <div className="flex-1 bg-green-600" />
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-orange-400" />
        </div>

        {/* Province / place name — centered, between flag and content */}
        <motion.p
          key={displayName}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center font-semibold text-white/90 tracking-wide mt-2"
          style={{ fontSize: "13px" }}
        >
          {displayName}
        </motion.p>
      </div>

      {/* ── MAIN CONTENT: left nav + carousel ── */}
      <div className="relative z-10 flex flex-1 mt-1 overflow-hidden">

        {/* Left vertical navigation */}
        <div
          className="flex-shrink-0 overflow-y-auto no-scrollbar py-1 pr-1"
          style={{ width: "72px" }}
        >
          <AnimatePresence mode="wait">
            {viewMode === "provinces" ? (
              <motion.div
                key="prov-nav"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-[3px] pl-2"
              >
                {orderedProvinces.map((prov, idx) => {
                  const isActive = idx === activeProvinceIdx;
                  return (
                    <button
                      key={prov.id}
                      data-testid={`nav-province-${prov.id}`}
                      onClick={() => handleNavProvinceClick(prov, idx)}
                      className="flex items-center gap-1 text-left py-[3px] transition-all duration-200"
                    >
                      <MapPin
                        className="w-2 h-2 flex-shrink-0"
                        style={{ color: isActive ? "#22c55e" : "rgba(255,255,255,0.35)" }}
                      />
                      <span
                        className="text-[8px] font-medium leading-tight"
                        style={{ color: isActive ? "#22c55e" : "rgba(255,255,255,0.55)" }}
                      >
                        {prov.shortName}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="place-nav"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-[3px] pl-2"
              >
                <button
                  onClick={() => { setViewMode("provinces"); setShowingPlacesFor(null); }}
                  className="text-[8px] text-white/45 flex items-center gap-0.5 mb-1"
                >
                  ← Back
                </button>
                {currentPlaces.map((place, idx) => {
                  const isActive = idx === activePlaceIdx;
                  return (
                    <button
                      key={place.id}
                      data-testid={`nav-place-${place.id}`}
                      onClick={() => setActivePlaceIdx(idx)}
                      className="flex items-center gap-1 text-left py-[3px] transition-all duration-200"
                    >
                      <MapPin
                        className="w-2 h-2 flex-shrink-0"
                        style={{ color: isActive ? "#22c55e" : "rgba(255,255,255,0.35)" }}
                      />
                      <span
                        className="text-[8px] font-medium leading-tight"
                        style={{ color: isActive ? "#22c55e" : "rgba(255,255,255,0.55)" }}
                      >
                        {place.name}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Carousel (3 cards) */}
        <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              {!transitioning && (
                <motion.div
                  key={`${viewMode}-${activeIdx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                  style={{ gap: "6px" }}
                >
                  {viewMode === "provinces"
                    ? getThreeCards().map((item: any) => (
                        <ProvinceCard
                          key={`prov-${item.province.id}-${item.key}`}
                          province={item.province}
                          isCenter={item.isCenter}
                          onClick={() => handleProvinceCardClick(item.province)}
                        />
                      ))
                    : getThreeCards().map((item: any) =>
                        item.place && showingPlacesFor ? (
                          <PlaceCard
                            key={`place-${item.place.id}-${item.key}`}
                            place={item.place}
                            province={showingPlacesFor}
                            isCenter={item.isCenter}
                            onClick={() => handlePlaceCardClick(item.place, showingPlacesFor!)}
                          />
                        ) : null
                      )
                  }
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {Array.from({ length: totalDots }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIdx ? "14px" : "4px",
                  height: "4px",
                  background: i === activeIdx ? "#22c55e" : "rgba(255,255,255,0.28)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Place thumbnails row (when in places view) */}
      {viewMode === "places" && showingPlacesFor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 px-4 pb-2"
        >
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {currentPlaces.map((place, idx) => (
              <button
                key={place.id}
                onClick={() => setActivePlaceIdx(idx)}
                className="flex-shrink-0 rounded-lg overflow-hidden"
                style={{
                  width: "64px", height: "44px",
                  border: idx === activePlaceIdx ? "2px solid #22c55e" : "1px solid rgba(255,255,255,0.15)",
                  position: "relative",
                }}
              >
                <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0 flex items-end px-1 pb-0.5"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}
                >
                  <span className="text-white text-[6px] font-medium leading-tight line-clamp-1">{place.name}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Gallery Modal */}
      <AnimatePresence>
        {gallery && (
          <GalleryModalView
            place={gallery.place}
            province={gallery.province}
            onClose={() => setGallery(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
