import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Key, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Fingerprint
} from "lucide-react";
import { toast } from "sonner";

export function SettingsManager() {
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [config, setConfig] = useState<any>(null);
  
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [recoveryKey, setRecoveryKey] = useState("");
  const [showRecoveryInput, setShowRecoveryInput] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_config")
        .select()
        .eq("id", "credentials")
        .single();

      if (data) {
        setConfig(data);
        setNewUsername(data.username);
      }
    } catch (error) {
      console.error("Error fetching config:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCredentials = async () => {
    if (!newUsername || !newPassword) {
      toast.error("Please fill in both username and password.");
      return;
    }
    setShowRecoveryInput(true);
  };

  const confirmUpdate = async () => {
    if (!recoveryKey) {
      toast.error("Please enter your Master Recovery Key.");
      return;
    }

    setIsProcessing(true);
    try {
      if (recoveryKey !== config.recovery_key) {
        toast.error("Invalid Recovery Key.");
        setIsProcessing(false);
        return;
      }

      const { error } = await supabase
        .from("admin_config")
        .update({
          username: newUsername,
          password: newPassword
        })
        .eq("id", "credentials");

      if (error) throw error;

      toast.success("Credentials updated successfully!");
      setShowRecoveryInput(false);
      setRecoveryKey("");
      setNewPassword("");
      fetchConfig();
    } catch (error: any) {
      toast.error(error.message || "Failed to update credentials.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-3xl font-black tracking-tighter uppercase mb-2">Admin Settings</h2>
        <p className="text-muted-foreground">Manage your access credentials and security settings.</p>
      </div>

      <div className="grid gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-[2rem] bg-secondary/10 border border-border space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">Login Credentials</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest opacity-70 ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all"
                  placeholder="Admin Username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest opacity-70 ml-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all"
                  placeholder="Leave blank to keep current"
                />
              </div>
            </div>
          </div>

          {!showRecoveryInput ? (
            <button
              onClick={handleUpdateCredentials}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
            >
              Update Credentials
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 p-6 rounded-2xl bg-primary/5 border border-primary/20"
            >
              <div className="flex items-center gap-2 text-primary mb-2">
                <Fingerprint className="w-5 h-5" />
                <span className="font-bold uppercase tracking-widest text-sm">Security Verification</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Enter your Master Recovery Key to confirm these changes.
              </p>
              <input
                type="password"
                value={recoveryKey}
                onChange={(e) => setRecoveryKey(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-background border border-border focus:border-primary outline-none transition-all text-center font-mono"
                placeholder="MASTER-XXXX-XXXX"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRecoveryInput(false)}
                  className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmUpdate}
                  disabled={isProcessing}
                  className="flex-[2] py-3 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Confirm <CheckCircle2 className="w-5 h-5" /></>}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20 flex items-start gap-4"
        >
          <AlertCircle className="w-6 h-6 text-destructive shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-destructive uppercase tracking-tight mb-1">Security Warning</h4>
            <p className="text-sm text-muted-foreground">
              Changing your credentials will require you to log in again on all devices. 
              Make sure you have your Master Recovery Key saved in a safe place.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
