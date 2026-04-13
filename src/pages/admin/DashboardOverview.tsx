import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { 
  FolderKanban, 
  MessageSquare, 
  Briefcase, 
  Code, 
  TrendingUp, 
  Users, 
  ExternalLink 
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function DashboardOverview() {
  const [stats, setStats] = useState({
    projects: 0,
    testimonials: 0,
    services: 0,
    skills: 0,
  });
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: projectsCount },
          { count: testimonialsCount },
          { count: servicesCount },
          { count: skillsCount }
        ] = await Promise.all([
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase.from("testimonials").select("*", { count: "exact", head: true }),
          supabase.from("services").select("*", { count: "exact", head: true }),
          supabase.from("skills").select("*", { count: "exact", head: true }),
        ]);

        setStats({
          projects: projectsCount || 0,
          testimonials: testimonialsCount || 0,
          services: servicesCount || 0,
          skills: skillsCount || 0,
        });

        const { data: recentSnap } = await supabase
          .from("projects")
          .select("*")
          .order("order", { ascending: true })
          .limit(3);
          
        setRecentProjects(recentSnap || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { name: "Projects", value: stats.projects, icon: FolderKanban, color: "bg-blue-500" },
    { name: "Testimonials", value: stats.testimonials, icon: MessageSquare, color: "bg-green-500" },
    { name: "Services", value: stats.services, icon: Briefcase, color: "bg-sky-500" },
    { name: "Skills", value: stats.skills, icon: Code, color: "bg-orange-500" },
  ];

  if (loading) return <div className="animate-pulse space-y-8">...</div>;

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">DASHBOARD</h1>
          <p className="text-muted-foreground">Welcome back, Shivaji Gedda! Here's an overview of your portfolio.</p>
        </div>
        <Link
          to="/"
          className="px-6 py-3 rounded-2xl bg-secondary/10 border border-border flex items-center gap-2 font-bold text-sm hover:bg-secondary/20 transition-all"
        >
          View Live Site <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-secondary/10 border border-border shadow-xl space-y-4"
            >
              <div className={stat.color + " w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.name}</p>
                <p className="text-4xl font-black">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            Recent Projects
          </h2>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/10 border border-border">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={project.main_image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-xs text-muted-foreground capitalize">{project.category}</p>
                </div>
                <Link to="projects" className="p-2 rounded-lg hover:bg-secondary/20 transition-all">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            ))}
            <Link to="projects" className="block text-center py-3 rounded-xl border border-dashed border-border text-sm font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all">
              Manage All Projects
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="projects" className="p-6 rounded-3xl bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all group">
              <FolderKanban className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <p className="font-bold">Add Project</p>
            </Link>
            <Link to="testimonials" className="p-6 rounded-3xl bg-secondary/10 border border-border hover:bg-secondary/20 transition-all group">
              <MessageSquare className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <p className="font-bold">New Feedback</p>
            </Link>
            <Link to="profile" className="p-6 rounded-3xl bg-secondary/10 border border-border hover:bg-secondary/20 transition-all group">
              <Users className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <p className="font-bold">Update Profile</p>
            </Link>
            <Link to="skills" className="p-6 rounded-3xl bg-secondary/10 border border-border hover:bg-secondary/20 transition-all group">
              <Code className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <p className="font-bold">Manage Skills</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
