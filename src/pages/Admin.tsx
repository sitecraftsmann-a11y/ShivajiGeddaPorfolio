import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Code, 
  FolderKanban, 
  MessageSquare, 
  History, 
  LogOut, 
  ShieldCheck,
  Lock,
  Key,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
  Fingerprint,
  Settings
} from "lucide-react";
import { cn } from "../lib/utils";
import { toast } from "sonner";

// Admin Components
import { DashboardOverview } from "./admin/DashboardOverview";
import { ProfileEditor } from "./admin/ProfileEditor";
import { ServicesManager } from "./admin/ServicesManager";
import { SkillsManager } from "./admin/SkillsManager";
import { ProjectsManager } from "./admin/ProjectsManager";
import { TestimonialsManager } from "./admin/TestimonialsManager";
import { ExperienceManager } from "./admin/ExperienceManager";
import { SettingsManager } from "./admin/SettingsManager";

export function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    localStorage.removeItem("admin_session");
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  const sidebarLinks = [
    { name: "Overview", path: "", icon: LayoutDashboard },
    { name: "Profile", path: "profile", icon: User },
    { name: "Services", path: "services", icon: Briefcase },
    { name: "Skills", path: "skills", icon: Code },
    { name: "Projects", path: "projects", icon: FolderKanban },
    { name: "Testimonials", path: "testimonials", icon: MessageSquare },
    { name: "Experience", path: "experience", icon: History },
    { name: "Settings", path: "settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border hidden lg:block p-6 space-y-8">
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="w-5 h-5" />
          <span className="font-bold text-sm uppercase tracking-widest">Admin Panel</span>
        </div>
        <nav className="space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === `/admin${link.path ? "/" + link.path : ""}`;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "text-muted-foreground hover:bg-secondary/20"
                )}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="pt-8 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="profile" element={<ProfileEditor />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Routes>
      </main>
    </div>
  );
}
