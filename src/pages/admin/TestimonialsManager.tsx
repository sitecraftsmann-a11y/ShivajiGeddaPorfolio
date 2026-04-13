import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { Plus, Edit2, Trash2, Save, X, MessageSquare, User } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { ImageUpload } from "../../components/admin/ImageUpload";

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setTestimonials(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();

    const channel = supabase
      .channel("testimonials_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "testimonials" },
        () => {
          fetchTestimonials();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleEdit = (testimonial: any) => {
    setCurrentTestimonial(testimonial);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentTestimonial({ client_name: "", client_role: "", feedback: "", avatar: "" });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const { error } = await supabase.from("testimonials").delete().eq("id", id);
        if (error) throw error;
        toast.success("Testimonial deleted!");
      } catch (error) {
        toast.error("Failed to delete testimonial.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentTestimonial.id) {
        const { id, ...data } = currentTestimonial;
        const { error } = await supabase.from("testimonials").update(data).eq("id", id);
        if (error) throw error;
        toast.success("Testimonial updated!");
      } else {
        const { error } = await supabase.from("testimonials").insert(currentTestimonial);
        if (error) throw error;
        toast.success("Testimonial added!");
      }
      setIsEditing(false);
      setCurrentTestimonial(null);
    } catch (error) {
      toast.error("Failed to save testimonial.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">TESTIMONIALS</h1>
          <p className="text-muted-foreground">Manage client feedback and reviews.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-xl"
        >
          <Plus className="w-5 h-5" /> Add New Testimonial
        </button>
      </div>

      {isEditing ? (
        <div className="p-10 rounded-[3rem] bg-secondary/10 border border-border shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black tracking-tighter">
              {currentTestimonial.id ? "EDIT TESTIMONIAL" : "NEW TESTIMONIAL"}
            </h2>
            <button onClick={() => setIsEditing(false)} className="p-2 rounded-full hover:bg-secondary/20">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Client Name</label>
                <input
                  type="text"
                  value={currentTestimonial.client_name}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, client_name: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Client Role / Company</label>
                <input
                  type="text"
                  value={currentTestimonial.client_role}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, client_role: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none"
                  placeholder="CEO, TechNova"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Feedback</label>
              <textarea
                value={currentTestimonial.feedback}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, feedback: e.target.value })}
                className="w-full p-4 rounded-2xl bg-background border border-border focus:border-primary outline-none h-32 resize-none"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Client Avatar</label>
              <ImageUpload
                currentUrl={currentTestimonial.avatar}
                onUpload={(url) => setCurrentTestimonial({ ...currentTestimonial, avatar: url })}
                folder="testimonials"
                aspectRatio="square"
                className="max-w-[200px]"
              />
            </div>

            <button
              type="submit"
              className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-xl"
            >
              <Save className="w-6 h-6" /> Save Testimonial
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-8 rounded-3xl bg-secondary/10 border border-border space-y-6 shadow-xl relative group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                  <img src={testimonial.avatar || `https://i.pravatar.cc/150?u=${testimonial.client_name}`} alt={testimonial.client_name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{testimonial.client_name}</h3>
                  <p className="text-xs text-primary font-bold uppercase tracking-widest">{testimonial.client_role}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm italic leading-relaxed">"{testimonial.feedback}"</p>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
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
