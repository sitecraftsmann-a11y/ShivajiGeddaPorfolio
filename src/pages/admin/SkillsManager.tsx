import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { Plus, Edit2, Trash2, Save, X, Code } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

export function SkillsManager() {
  const [skills, setSkills] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setSkills(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();

    const channel = supabase
      .channel("skills_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "skills" },
        () => {
          fetchSkills();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleEdit = (skill: any) => {
    setCurrentSkill(skill);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentSkill({ name: "", proficiency: 80, category: "Salesforce Platform" });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        const { error } = await supabase.from("skills").delete().eq("id", id);
        if (error) throw error;
        toast.success("Skill deleted!");
      } catch (error) {
        toast.error("Failed to delete skill.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentSkill.id) {
        const { id, ...data } = currentSkill;
        const { error } = await supabase.from("skills").update(data).eq("id", id);
        if (error) throw error;
        toast.success("Skill updated!");
      } else {
        const { error } = await supabase.from("skills").insert(currentSkill);
        if (error) throw error;
        toast.success("Skill added!");
      }
      setIsEditing(false);
      setCurrentSkill(null);
    } catch (error) {
      toast.error("Failed to save skill.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">SKILLS</h1>
          <p className="text-muted-foreground">Manage your technical expertise and proficiency levels.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-xl"
        >
          <Plus className="w-5 h-5" /> Add New Skill
        </button>
      </div>

      {isEditing ? (
        <div className="p-10 rounded-[3rem] bg-secondary/10 border border-border shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black tracking-tighter">
              {currentSkill.id ? "EDIT SKILL" : "NEW SKILL"}
            </h2>
            <button onClick={() => setIsEditing(false)} className="p-2 rounded-full hover:bg-secondary/20">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Skill Name</label>
                <input
                  type="text"
                  value={currentSkill.name}
                  onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                <input
                  type="text"
                  value={currentSkill.category}
                  onChange={(e) => setCurrentSkill({ ...currentSkill, category: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                  placeholder="Salesforce Platform, Integration, etc."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Proficiency ({currentSkill.proficiency}%)</label>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={currentSkill.proficiency}
                onChange={(e) => setCurrentSkill({ ...currentSkill, proficiency: parseInt(e.target.value) })}
                className="w-full h-2 bg-secondary/20 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <button
              type="submit"
              className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-xl"
            >
              <Save className="w-6 h-6" /> Save Skill
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div key={skill.id} className="p-8 rounded-3xl bg-secondary/10 border border-border space-y-6 shadow-xl relative group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Code className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{skill.name}</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-background rounded-full overflow-hidden border border-border">
                    <div className="h-full bg-primary" style={{ width: `${skill.proficiency}%` }} />
                  </div>
                  <span className="text-sm font-bold text-primary">{skill.proficiency}%</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-4 font-bold">{skill.category}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <button
                  onClick={() => handleEdit(skill)}
                  className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
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
