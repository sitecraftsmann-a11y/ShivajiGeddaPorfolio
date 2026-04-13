import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { Save, User, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "../../components/admin/ImageUpload";

export function ProfileEditor() {
  const [profile, setProfile] = useState<any>({
    name: "",
    title: "",
    tagline: "",
    bio: "",
    philosophy: "",
    experience_summary: "",
    profile_image: "",
    whatsapp_number: "",
    email: "",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profile")
          .select()
          .eq("id", "main")
          .single();
          
        if (data) {
          setProfile(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profile")
        .upsert({ id: "main", ...profile });
        
      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse space-y-8">...</div>;

  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h1 className="text-4xl font-black tracking-tighter mb-2">PROFILE EDITOR</h1>
        <p className="text-muted-foreground">Manage your personal information and brand identity.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary outline-none"
              placeholder="Shivaji Gedda"
              required
            />
          </div>
          <div className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <User className="w-4 h-4" /> Professional Title
            </label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary outline-none"
              placeholder="Salesforce Developer"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Tagline</label>
          <input
            type="text"
            value={profile.tagline}
            onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
            className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary outline-none"
            placeholder="Building scalable and efficient solutions..."
            required
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary outline-none h-32 resize-none"
            placeholder="Tell your story..."
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Developer Philosophy</label>
          <textarea
            value={profile.philosophy}
            onChange={(e) => setProfile({ ...profile, philosophy: e.target.value })}
            className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary outline-none h-32 resize-none"
            placeholder="What drives your development decisions?"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              Profile Image
            </label>
            <ImageUpload
              currentUrl={profile.profile_image}
              onUpload={(url) => setProfile({ ...profile, profile_image: url })}
              folder="profile"
              aspectRatio="square"
            />
          </div>
          <div className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Phone className="w-4 h-4" /> WhatsApp Number
            </label>
            <input
              type="text"
              value={profile.whatsapp_number}
              onChange={(e) => setProfile({ ...profile, whatsapp_number: e.target.value })}
              className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary outline-none"
              placeholder="919398734214"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary outline-none"
            />
          </div>
          <div className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary outline-none"
            />
          </div>
          <div className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
