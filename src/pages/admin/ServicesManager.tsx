import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { Plus, Edit2, Trash2, Save, X, Code, Database, Cloud, Zap, Cpu, Workflow } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

const iconOptions = [
  { name: "Code", icon: Code },
  { name: "Database", icon: Database },
  { name: "Cloud", icon: Cloud },
  { name: "Zap", icon: Zap },
  { name: "Cpu", icon: Cpu },
  { name: "Workflow", icon: Workflow },
];

export function ServicesManager() {
  const [services, setServices] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setServices(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();

    const channel = supabase
      .channel("services_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "services" },
        () => {
          fetchServices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleEdit = (service: any) => {
    setCurrentService(service);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentService({ title: "", description: "", icon: "Code" });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const { error } = await supabase.from("services").delete().eq("id", id);
        if (error) throw error;
        toast.success("Service deleted!");
      } catch (error) {
        toast.error("Failed to delete service.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentService.id) {
        const { id, ...data } = currentService;
        const { error } = await supabase.from("services").update(data).eq("id", id);
        if (error) throw error;
        toast.success("Service updated!");
      } else {
        const { error } = await supabase.from("services").insert(currentService);
        if (error) throw error;
        toast.success("Service added!");
      }
      setIsEditing(false);
      setCurrentService(null);
    } catch (error) {
      toast.error("Failed to save service.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">SERVICES</h1>
          <p className="text-muted-foreground">Manage the services you offer to clients.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-xl"
        >
          <Plus className="w-5 h-5" /> Add New Service
        </button>
      </div>

      {isEditing ? (
        <div className="p-10 rounded-[3rem] bg-secondary/10 border border-border shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black tracking-tighter">
              {currentService.id ? "EDIT SERVICE" : "NEW SERVICE"}
            </h2>
            <button onClick={() => setIsEditing(false)} className="p-2 rounded-full hover:bg-secondary/20">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Service Title</label>
              <input
                type="text"
                value={currentService.title}
                onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Description</label>
              <textarea
                value={currentService.description}
                onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none h-32 resize-none"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Icon</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {iconOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setCurrentService({ ...currentService, icon: opt.name })}
                      className={cn(
                        "p-6 rounded-2xl border transition-all flex flex-col items-center gap-2",
                        currentService.icon === opt.name 
                          ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105" 
                          : "bg-background border-border hover:bg-secondary/20"
                      )}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{opt.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-xl"
            >
              <Save className="w-6 h-6" /> Save Service
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="p-8 rounded-3xl bg-secondary/10 border border-border space-y-6 shadow-xl relative group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                {iconOptions.find(o => o.name === service.icon)?.icon ? (
                  (() => {
                    const Icon = iconOptions.find(o => o.name === service.icon)!.icon;
                    return <Icon className="w-8 h-8" />;
                  })()
                ) : <Code className="w-8 h-8" />}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3">{service.description}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
