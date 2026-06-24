import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Home as HomeIcon, Compass, MapPin, Briefcase, User, Bell } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import Destinations from "@/pages/Destinations";
import Bookings from "@/pages/Bookings";
import Profile from "@/pages/Profile";

const queryClient = new QueryClient();

const NAV_ITEMS = [
  { path: "/", icon: HomeIcon, label: "Home" },
  { path: "/explore", icon: Compass, label: "Explore" },
  { path: "/destinations", icon: MapPin, label: "Destinations" },
  { path: "/bookings", icon: Briefcase, label: "Bookings" },
  { path: "/profile", icon: User, label: "Profile" },
];

const PAGE_TITLES: Record<string, string> = {
  "/": "",
  "/explore": "Explore",
  "/destinations": "Destinations",
  "/bookings": "Bookings",
  "/profile": "Profile",
};

function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const isHome = location === "/";

  return (
    <div className="min-h-screen bg-black flex justify-center w-full">
      <div className="w-full max-w-[390px] relative flex flex-col overflow-hidden text-foreground" style={{ height: "100dvh", background: "#050f05" }}>

        {/* Fixed Header — only on non-home pages */}
        {!isHome && (
          <header
            className="absolute top-0 left-0 right-0 z-50 px-4 pt-10 pb-3"
            style={{ background: "linear-gradient(to bottom, rgba(5,15,5,0.95) 0%, rgba(5,15,5,0.8) 80%, transparent 100%)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 style={{ fontFamily: "'Dancing Script', cursive", color: "white", fontWeight: 700, fontSize: "22px", lineHeight: 1 }}>
                  Zambia Kuchalo
                </h1>
                {PAGE_TITLES[location] && (
                  <p className="text-white font-semibold text-base mt-0.5">{PAGE_TITLES[location]}</p>
                )}
              </div>
              <div className="relative">
                <button
                  data-testid="notification-bell-header"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <Bell className="w-4 h-4 text-white" />
                </button>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-black" />
              </div>
            </div>
            {/* Flag stripes */}
            <div className="flex h-0.5 mt-2 rounded-full overflow-hidden gap-0.5">
              <div className="flex-1 bg-green-600" />
              <div className="flex-1 bg-red-600" />
              <div className="flex-1 bg-black" />
              <div className="flex-1 bg-orange-400" />
            </div>
          </header>
        )}

        {/* Page content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex flex-col"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fixed bottom navigation */}
        <nav
          className="absolute bottom-0 left-0 right-0 z-50 px-6 py-3 pb-6 flex justify-between items-center"
          style={{ background: "rgba(5,12,5,0.85)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                data-testid={`nav-${item.label.toLowerCase()}`}
                onClick={() => setLocation(item.path)}
                className="flex flex-col items-center gap-1 transition-all duration-200"
                style={{ color: isActive ? "#22c55e" : "rgba(255,255,255,0.45)" }}
              >
                <Icon
                  className="w-5 h-5 transition-all"
                  style={{ filter: isActive ? "drop-shadow(0 0 6px rgba(34,197,94,0.6))" : "none" }}
                />
                <span
                  className="text-[10px] font-medium"
                  style={{ color: isActive ? "#22c55e" : "rgba(255,255,255,0.45)" }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/explore" component={Explore} />
      <Route path="/destinations" component={Destinations} />
      <Route path="/bookings" component={Bookings} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
