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

function ProvinceCard({
  province,
  isCenter,
  onClick,
}: {
  province: Province;
  isCenter: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="relative flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden"
      style={{
        width: isCenter ? "140px" : "110px",
        height: isCenter ? "210px" : "185px",
        background: province.gradient,
        boxShadow: isCenter
          ? `0 0 24px ${province.accentColor}80, 0 8px 32px rgba(0,0,0,0.6)`
          : "0 4px 16px rgba(0,0,0,0.4)",
        border: isCenter
          ? `1.5px solid ${province.accentColor}`
          : "1px solid rgba(255,255,255,0.12)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: isCenter ? 2 : 1,
      }}
    >
      {/* Book Now button */}
      <div className="absolute top-2 right-2 z-10">
        <button
          data-testid={`book-now-province-${province.id}`}
          onClick={(e) => e.stopPropagation()}
          className="px-2 py-0.5 text-[9px] font-semibold rounded-full"
          style={{
            background: "rgba(26,140,26,0.9)",
            color: "white",
            border: "1px solid rgba(34,197,94,0.5)",
          }}
        >
          Book Now
        </button>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        {isCenter && (
          <div
            className="text-[9px] font-semibold mb-1 px-2 py-0.5 rounded-full inline-block"
            style={{ background: province.accentColor, color: "white" }}
          >
            {province.places[0]?.name}
          </div>
        )}
        <p className="text-white font-bold text-[11px] leading-tight">{province.name}</p>
        <p className="text-white/70 text-[9px] mt-0.5">{province.tagline}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-white/60 text-[8px]">Tap to view more</span>
          <ChevronRight className="w-2.5 h-2.5 text-white/60" />
        </div>
      </div>
    </motion.div>
  );
}

function PlaceCard({
  place,
  province,
  isCenter,
  onClick,
}: {
  place: Place;
  province: Province;
  isCenter: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="relative flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden"
      style={{
        width: isCenter ? "140px" : "110px",
        height: isCenter ? "210px" : "185px",
        background: place.gradient,
        boxShadow: isCenter
          ? `0 0 24px ${province.accentColor}80, 0 8px 32px rgba(0,0,0,0.6)`
          : "0 4px 16px rgba(0,0,0,0.4)",
        border: isCenter
          ? `1.5px solid ${province.accentColor}`
          : "1px solid rgba(255,255,255,0.12)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: isCenter ? 2 : 1,
      }}
    >
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

      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white font-bold text-[11px] leading-tight">{place.name}</p>
        <p className="text-white/70 text-[9px] mt-0.5">{place.tagline}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-white/60 text-[8px]">Tap to view more</span>
          <ChevronRight className="w-2.5 h-2.5 text-white/60" />
        </div>
      </div>
    </motion.div>
  );
}

function GalleryModalView({
  place,
  province,
  onClose,
}: {
  place: Place;
  province: Province;
  onClose: () => void;
}) {
  const [activeImg, setActiveImg] = useState(0);
  const placeholderImages = [
    province.gradient,
    place.gradient,
    `linear-gradient(135deg, ${province.accentColor} 0%, #0a1a0a 100%)`,
    `linear-gradient(225deg, ${province.accentColor} 0%, #1a0a2a 100%)`,
    `linear-gradient(45deg, #0a2a1a 0%, ${province.accentColor} 100%)`,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % placeholderImages.length);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-[370px] mx-4 rounded-3xl overflow-hidden"
        style={{
          background: "#0a120a",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
          maxHeight: "80vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image area */}
        <div className="relative h-64 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
              style={{ background: placeholderImages[activeImg] }}
            />
          </AnimatePresence>

          {/* Overlay controls */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />

          {/* Top controls */}
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
            {placeholderImages.map((_, i) => (
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
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-white font-bold text-lg">{place.name}</h3>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-green-400" />
                <span className="text-white/60 text-xs">{province.name}</span>
              </div>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-4">{place.description}</p>

          {/* Video placeholder */}
          <div
            className="rounded-xl p-4 flex items-center gap-3 mb-4"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "#1a8c1a" }}
            >
              <Play className="w-4 h-4 text-white ml-0.5" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Experience Video</p>
              <p className="text-white/50 text-xs">Tap to play — coming soon</p>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {placeholderImages.map((grad, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className="flex-shrink-0 rounded-lg overflow-hidden"
                style={{
                  width: "56px",
                  height: "40px",
                  background: grad,
                  border: i === activeImg ? "2px solid #1a8c1a" : "1px solid rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [activeProvinceIdx, setActiveProvinceIdx] = useState(8); // Southern Province default
  const [viewMode, setViewMode] = useState<ViewMode>("provinces");
  const [activePlaceIdx, setActivePlaceIdx] = useState(0);
  const [gallery, setGallery] = useState<GalleryModal | null>(null);
  const [showingPlacesFor, setShowingPlacesFor] = useState<Province | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeProvince = orderedProvinces[activeProvinceIdx];
  const currentPlaces = showingPlacesFor?.places ?? [];

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (viewMode === "provinces") {
        setActiveProvinceIdx((prev) => (prev + 1) % orderedProvinces.length);
      } else {
        setActivePlaceIdx((prev) => (prev + 1) % currentPlaces.length);
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
    }, 400);
  };

  const handlePlaceCardClick = (place: Place, province: Province) => {
    setGallery({ place, province });
  };

  const handleNavProvinceClick = (province: Province) => {
    const idx = orderedProvinces.findIndex(p => p.id === province.id);
    if (viewMode === "places") {
      setTransitioning(true);
      setTimeout(() => {
        setViewMode("provinces");
        setShowingPlacesFor(null);
        setActiveProvinceIdx(idx);
        setTransitioning(false);
      }, 300);
    } else {
      setActiveProvinceIdx(idx);
    }
  };

  const handleNavPlaceClick = (place: Place) => {
    const idx = currentPlaces.findIndex(p => p.id === place.id);
    setActivePlaceIdx(idx);
  };

  // Swipe handling
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (viewMode === "provinces") {
        setActiveProvinceIdx(prev =>
          diff > 0
            ? (prev + 1) % orderedProvinces.length
            : (prev - 1 + orderedProvinces.length) % orderedProvinces.length
        );
      } else {
        setActivePlaceIdx(prev =>
          diff > 0
            ? (prev + 1) % currentPlaces.length
            : (prev - 1 + currentPlaces.length) % currentPlaces.length
        );
      }
    }
  };

  const getCarouselItems = () => {
    const items = [];
    if (viewMode === "provinces") {
      const totalCount = orderedProvinces.length;
      for (let i = -1; i <= 4; i++) {
        const idx = (activeProvinceIdx + i + totalCount) % totalCount;
        items.push({ idx: i, province: orderedProvinces[idx], isCenter: i === 0 });
      }
    } else {
      const totalCount = currentPlaces.length;
      for (let i = -1; i <= 4; i++) {
        const idx = (activePlaceIdx + i + totalCount) % totalCount;
        items.push({ idx: i, place: currentPlaces[idx], isCenter: i === 0 });
      }
    }
    return items;
  };

  return (
    <div className="flex-1 overflow-hidden relative flex flex-col" style={{ height: "calc(100vh - 0px)" }}>
      {/* Background with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeProvince.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${homeBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
      </AnimatePresence>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(5,15,5,0.75) 40%, rgba(5,15,5,0.92) 100%)" }} />

      {/* Header */}
      <div className="relative z-10 pt-3 px-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl leading-none" style={{ fontFamily: "'Dancing Script', cursive", color: "white", fontWeight: 700 }}>
              Zambia Kuchalo
            </h1>
            <motion.p
              key={activeProvince.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white/90 text-sm font-semibold mt-0.5 tracking-wide"
            >
              {viewMode === "places" && showingPlacesFor ? showingPlacesFor.name : activeProvince.name}
            </motion.p>
          </div>
          <button
            data-testid="notification-bell"
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <Bell className="w-4 h-4 text-white" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-green-500" />
          </button>
        </div>

        {/* Flag stripes */}
        <div className="flex h-0.5 mt-2 rounded-full overflow-hidden gap-0.5">
          <div className="flex-1 bg-green-600" />
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-orange-400" />
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex flex-1 mt-2 overflow-hidden">
        {/* Left navigation */}
        <div className="w-28 flex-shrink-0 px-2 overflow-y-auto no-scrollbar py-1">
          <AnimatePresence mode="wait">
            {viewMode === "provinces" ? (
              <motion.div
                key="province-nav"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5"
              >
                {orderedProvinces.map((prov, idx) => (
                  <button
                    key={prov.id}
                    data-testid={`nav-province-${prov.id}`}
                    onClick={() => handleNavProvinceClick(prov)}
                    className="flex items-center gap-1.5 text-left rounded-lg px-2 py-1.5 transition-all"
                    style={{
                      background: idx === activeProvinceIdx ? "rgba(26,140,26,0.2)" : "transparent",
                      borderLeft: idx === activeProvinceIdx ? "2px solid #22c55e" : "2px solid transparent",
                    }}
                  >
                    <MapPin
                      className="w-2.5 h-2.5 flex-shrink-0"
                      style={{ color: idx === activeProvinceIdx ? "#22c55e" : "rgba(255,255,255,0.4)" }}
                    />
                    <span
                      className="text-[9px] font-medium leading-tight"
                      style={{ color: idx === activeProvinceIdx ? "#22c55e" : "rgba(255,255,255,0.65)" }}
                    >
                      {prov.name}
                    </span>
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="places-nav"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5"
              >
                <button
                  onClick={() => { setViewMode("provinces"); setShowingPlacesFor(null); }}
                  className="text-[9px] text-white/50 flex items-center gap-1 mb-1 px-2"
                >
                  ← Back
                </button>
                <p className="text-[9px] font-bold text-white/40 px-2 mb-1 uppercase tracking-wider">
                  {showingPlacesFor?.shortName}
                </p>
                {currentPlaces.map((place, idx) => (
                  <button
                    key={place.id}
                    data-testid={`nav-place-${place.id}`}
                    onClick={() => handleNavPlaceClick(place)}
                    className="flex items-center gap-1.5 text-left rounded-lg px-2 py-1.5 transition-all"
                    style={{
                      background: idx === activePlaceIdx ? "rgba(26,140,26,0.2)" : "transparent",
                      borderLeft: idx === activePlaceIdx ? "2px solid #22c55e" : "2px solid transparent",
                    }}
                  >
                    <MapPin
                      className="w-2.5 h-2.5 flex-shrink-0"
                      style={{ color: idx === activePlaceIdx ? "#22c55e" : "rgba(255,255,255,0.4)" }}
                    />
                    <span
                      className="text-[9px] font-medium leading-tight"
                      style={{ color: idx === activePlaceIdx ? "#22c55e" : "rgba(255,255,255,0.65)" }}
                    >
                      {place.name}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Carousel area */}
        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          {/* Cards carousel */}
          <div
            ref={carouselRef}
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              {!transitioning && (
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 pl-2"
                  style={{ overflowX: "visible" }}
                >
                  {viewMode === "provinces" ? (
                    getCarouselItems().map((item: any, i) => (
                      <ProvinceCard
                        key={`${item.province.id}-${i}`}
                        province={item.province}
                        isCenter={item.isCenter}
                        onClick={() => handleProvinceCardClick(item.province)}
                      />
                    ))
                  ) : (
                    getCarouselItems().map((item: any, i) => (
                      item.place && showingPlacesFor && (
                        <PlaceCard
                          key={`${item.place.id}-${i}`}
                          place={item.place}
                          province={showingPlacesFor}
                          isCenter={item.isCenter}
                          onClick={() => handlePlaceCardClick(item.place, showingPlacesFor!)}
                        />
                      )
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {(viewMode === "provinces" ? orderedProvinces : currentPlaces).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: i === (viewMode === "provinces" ? activeProvinceIdx : activePlaceIdx) ? "16px" : "5px",
                  height: "5px",
                  background: i === (viewMode === "provinces" ? activeProvinceIdx : activePlaceIdx)
                    ? "#22c55e"
                    : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

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
