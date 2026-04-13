import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { Plus, Edit2, Trash2, Save, X, History, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

export function ExperienceManager() {
  const [experience, setExperience] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchExperience = async () => {
    try {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("order", { ascending: true });
      if (data) setExperience(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching experience:", error);
    }
  };

  useEffect(() => {
    fetchExperience();

    const channel = supabase
      .channel("experience_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "experience" },
        () => {
          fetchExperience();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleEdit = (exp: any) => {
    setCurrentExp(exp);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentExp({ company: "", role: "", period: "", description: "", order: experience.length + 1 });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this experience entry?")) {
      try {
        const { error } = await supabase.from("experience").delete().eq("id", id);
        if (error) throw error;
        toast.success("Experience deleted!");
      } catch (error) {
        toast.error("Failed to delete experience.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentExp.id) {
        const { id, ...data } = currentExp;
        const { error } = await supabase.from("experience").update(data).eq("id", id);
        if (error) throw error;
        toast.success("Experience updated!");
      } else {
        const { error } = await supabase.from("experience").insert(currentExp);
        if (error) throw error;
        toast.success("Experience added!");
      }
      setIsEditing(false);
      setCurrentExp(null);
    } catch (error) {
      toast.error("Failed to save experience.");
    }
  };

  const updateOrder = async (exp: any, direction: "up" | "down") => {
    const index = experience.findIndex(p => p.id === exp.id);
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === experience.length - 1) return;

    const otherExp = direction === "up" ? experience[index - 1] : experience[index + 1];
    
    try {
      await supabase.from("experience").update({ order: otherExp.order }).eq("id", exp.id);
      await supabase.from("experience").update({ order: exp.order }).eq("id", otherExp.id);
    } catch (error) {
      toast.error("Failed to update order.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">EXPERIENCE</h1>
          <p className="text-muted-foreground">Manage your work history and professional journey in the Salesforce ecosystem.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-xl"
        >
          <Plus className="w-5 h-5" /> Add New Experience
        </button>
      </div>

      {isEditing ? (
        <div className="p-10 rounded-[3rem] bg-secondary/10 border border-border shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black tracking-tighter">
              {currentExp.id ? "EDIT EXPERIENCE" : "NEW EXPERIENCE"}
            </h2>
            <button onClick={() => setIsEditing(false)} className="p-2 rounded-full hover:bg-secondary/20">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Company</label>
                <input
                  type="text"
                  value={currentExp.company}
                  onChange={(e) => setCurrentExp({ ...currentExp, company: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Role</label>
                <input
                  type="text"
                  value={currentExp.role}
                  onChange={(e) => setCurrentExp({ ...currentExp, role: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Period</label>
              <input
                type="text"
                value={currentExp.period}
                onChange={(e) => setCurrentExp({ ...currentExp, period: e.target.value })}
                className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                placeholder="2020 - Present"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Description</label>
              <textarea
                value={currentExp.description}
                onChange={(e) => setCurrentExp({ ...currentExp, description: e.target.value })}
                className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none h-32 resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-xl"
            >
              <Save className="w-6 h-6" /> Save Experience
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <div key={exp.id} className="p-8 rounded-3xl bg-secondary/10 border border-border flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl relative group">
              <div className="flex items-center gap-6 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <History className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <p className="text-primary font-bold uppercase tracking-widest text-sm">{exp.company} — {exp.period}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2">
                  <button onClick={() => updateOrder(exp, "up")} className="p-2 rounded-lg bg-secondary/20 hover:bg-primary hover:text-primary-foreground transition-all">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => updateOrder(exp, "down")} className="p-2 rounded-lg bg-secondary/20 hover:bg-primary hover:text-primary-foreground transition-all">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-4 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Edit2 className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-4 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
