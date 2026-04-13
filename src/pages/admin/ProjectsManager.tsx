import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { Plus, Edit2, Trash2, Save, X, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { ImageUpload } from "../../components/admin/ImageUpload";
import { GalleryUpload } from "../../components/admin/GalleryUpload";

export function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order", { ascending: true });
      if (data) setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();

    const channel = supabase
      .channel("projects_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleEdit = (project: any) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentProject({
      title: "",
      description: "",
      category: "LWC",
      tools: [],
      client: "",
      main_image: "",
      gallery: [],
      order: projects.length + 1,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (error) throw error;
        toast.success("Project deleted!");
      } catch (error) {
        toast.error("Failed to delete project.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProject.main_image) {
      toast.error("Please upload a main project image.");
      return;
    }

    try {
      // Clean up tools array: remove empty strings and trim
      const tools = currentProject.tools
        ? currentProject.tools.map((s: string) => s.trim()).filter((s: string) => s !== "")
        : [];
      
      const projectData = { ...currentProject, tools };

      if (currentProject.id) {
        const { id, ...data } = projectData;
        const { error } = await supabase.from("projects").update(data).eq("id", id);
        if (error) throw error;
        toast.success("Project updated!");
      } else {
        const { error } = await supabase.from("projects").insert(projectData);
        if (error) throw error;
        toast.success("Project added!");
      }
      setIsEditing(false);
      setCurrentProject(null);
    } catch (error: any) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to save project.");
    }
  };

  const updateOrder = async (project: any, direction: "up" | "down") => {
    const index = projects.findIndex(p => p.id === project.id);
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === projects.length - 1) return;

    const otherProject = direction === "up" ? projects[index - 1] : projects[index + 1];
    
    try {
      await supabase.from("projects").update({ order: otherProject.order }).eq("id", project.id);
      await supabase.from("projects").update({ order: project.order }).eq("id", otherProject.id);
    } catch (error) {
      toast.error("Failed to update order.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">PROJECTS</h1>
          <p className="text-muted-foreground">Manage your portfolio showcase.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-xl"
        >
          <Plus className="w-5 h-5" /> Add New Project
        </button>
      </div>

      {isEditing ? (
        <div className="p-10 rounded-[3rem] bg-secondary/10 border border-border shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black tracking-tighter">
              {currentProject.id ? "EDIT PROJECT" : "NEW PROJECT"}
            </h2>
            <button onClick={() => setIsEditing(false)} className="p-2 rounded-full hover:bg-secondary/20">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                <input
                  type="text"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                <select
                  value={currentProject.category}
                  onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                >
                  <option value="LWC">LWC</option>
                  <option value="Apex">Apex</option>
                  <option value="Integrations">Integrations</option>
                  <option value="Flows">Flows</option>
                  <option value="Aura">Aura</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Description</label>
              <textarea
                value={currentProject.description}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none h-32 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Main Image</label>
                <ImageUpload
                  currentUrl={currentProject.main_image}
                  onUpload={(url) => setCurrentProject({ ...currentProject, main_image: url })}
                  folder="projects"
                  aspectRatio="video"
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Client Name</label>
                <input
                  type="text"
                  value={currentProject.client}
                  onChange={(e) => setCurrentProject({ ...currentProject, client: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Tools (comma separated)</label>
              <input
                type="text"
                value={currentProject.tools?.join(", ")}
                onChange={(e) => setCurrentProject({ ...currentProject, tools: e.target.value.split(",").map(s => s.trim()) })}
                className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                placeholder="Apex, LWC, Flow, JavaScript"
              />
            </div>

            <GalleryUpload
              images={currentProject.gallery || []}
              onChange={(images) => setCurrentProject({ ...currentProject, gallery: images })}
              folder={`projects/${currentProject.id || 'new'}`}
            />

            <button
              type="submit"
              className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-xl"
            >
              <Save className="w-6 h-6" /> Save Project
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={project.id} className="group relative rounded-3xl bg-secondary/10 border border-border overflow-hidden shadow-xl">
              <div className="aspect-video relative overflow-hidden">
                <img src={project.main_image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => updateOrder(project, "up")} className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => updateOrder(project, "down")} className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">{project.category}</p>
                  <h3 className="text-xl font-bold truncate">{project.title}</h3>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
