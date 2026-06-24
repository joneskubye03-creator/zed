import { motion } from "framer-motion";
import { ChevronRight, Camera, User, Briefcase, Bookmark, Heart, Clock, Bell, Globe, Lock, HelpCircle, Info, UserPlus, Settings, BookOpen, LogOut, Edit } from "lucide-react";
import profileBg from "@assets/zambia_Kuchalo_profile_1782355526806.png";

const SETTINGS_ITEMS = [
  { icon: User, label: "Personal Information" },
  { icon: Briefcase, label: "My Bookings" },
  { icon: Bookmark, label: "Saved Destinations" },
  { icon: Heart, label: "Favorites" },
  { icon: Clock, label: "Travel History" },
  { icon: Bell, label: "Notifications" },
  { icon: Globe, label: "Language" },
  { icon: Lock, label: "Security & Privacy" },
  { icon: HelpCircle, label: "Help & Support" },
  { icon: Info, label: "About Zambia Kuchalo" },
];

const ACCOUNT_ITEMS = [
  { icon: UserPlus, label: "Create Contributor Account" },
  { icon: Settings, label: "Become a Contributor" },
  { icon: BookOpen, label: "Contributor Guidelines" },
];

function SettingRow({ icon: Icon, label, danger = false }: { icon: typeof User; label: string; danger?: boolean }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      data-testid={`setting-${label.toLowerCase().replace(/ /g, "-")}`}
      className="w-full flex items-center gap-3 px-4 py-3.5 transition-all"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: danger ? "rgba(239,68,68,0.15)" : "rgba(26,140,26,0.15)" }}
      >
        <Icon className="w-4 h-4" style={{ color: danger ? "#ef4444" : "#4ade80" }} />
      </div>
      <span className="flex-1 text-left text-sm" style={{ color: danger ? "#ef4444" : "rgba(255,255,255,0.85)" }}>
        {label}
      </span>
      <ChevronRight className="w-4 h-4 text-white/30" />
    </motion.button>
  );
}

export default function Profile() {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${profileBg})`, backgroundAttachment: "fixed" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(5,10,5,0.88)" }} />

      <div className="relative z-10 pt-24 pb-28 px-4">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-4 mb-6"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(16px)" }}
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a5a2a 0%, #3a8a4a 100%)", border: "2px solid rgba(34,197,94,0.4)" }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white/60" />
                </div>
              </div>
              <button
                data-testid="change-avatar"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "#1a8c1a", border: "2px solid rgba(5,10,5,0.9)" }}
              >
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="text-white font-bold text-lg leading-tight">John Banda</p>
              <p className="text-white/55 text-sm mt-0.5">john@email.com</p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                data-testid="edit-profile"
                className="flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-xl text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}
              >
                <Edit className="w-3 h-3" />
                Edit Profile
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Settings section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5"
        >
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 px-1">Settings</h3>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
          >
            {SETTINGS_ITEMS.map((item, i) => (
              <SettingRow key={item.label} icon={item.icon} label={item.label} />
            ))}
          </div>
        </motion.div>

        {/* Account section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-5"
        >
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 px-1">Account</h3>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
          >
            {ACCOUNT_ITEMS.map((item) => (
              <SettingRow key={item.label} icon={item.icon} label={item.label} />
            ))}
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-red-400/70 text-xs font-semibold uppercase tracking-widest mb-2 px-1">Danger Zone</h3>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <SettingRow icon={LogOut} label="Logout" danger />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
