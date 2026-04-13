import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "../supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight, 
  Loader2, 
  Fingerprint, 
  CheckCircle2 
} from "lucide-react";
import { toast } from "sonner";

export function Login() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showChangeCredentials, setShowChangeCredentials] = useState(false);
  const [changeStep, setChangeStep] = useState(1); // 1: New Credentials, 2: Recovery Key
  const [newCredentials, setNewCredentials] = useState({ username: "", password: "" });
  const [recoveryKey, setRecoveryKey] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (session === "true") {
      navigate("/admin");
    }
    
    // Bootstrap default credentials if not exists
    const bootstrap = async () => {
      try {
        const { data: configData, error } = await supabase
          .from("admin_config")
          .select()
          .eq("id", "credentials")
          .maybeSingle();

        if (error) {
          console.error("Bootstrap check error:", error);
          // If table doesn't exist, this will fail. 
          // We can't create the table via JS, but we can inform the user.
          return;
        }

        if (!configData) {
          console.log("No admin config found, bootstrapping...");
          const { error: insertError } = await supabase.from("admin_config").insert({
            id: "credentials",
            username: "abcd",
            password: "1234",
            recovery_key: "MASTER-1234-5678"
          });
          
          if (insertError) {
            console.error("Bootstrap insert error:", insertError);
          } else {
            console.log("Bootstrap successful!");
          }
        }
      } catch (error) {
        console.error("Bootstrap catch error:", error);
      }
    };

    bootstrap();
  }, [navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);
    
    try {
      const { data: configData, error } = await supabase
        .from("admin_config")
        .select()
        .eq("id", "credentials")
        .maybeSingle();

      if (error) {
        console.error("Login config fetch error:", error);
        toast.error("Database error: " + error.message);
        return;
      }

      if (configData) {
        if (configData.username === loginData.username && configData.password === loginData.password) {
          localStorage.setItem("admin_session", "true");
          toast.success("Logged in successfully!");
          const from = (location.state as any)?.from?.pathname || "/admin";
          navigate(from, { replace: true });
        } else {
          toast.error("Invalid username or password.");
        }
      } else {
        toast.error("Admin configuration not found. Please refresh the page to allow the system to initialize default credentials.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to initiate login.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRequestChange = async () => {
    if (!newCredentials.username || !newCredentials.password) {
      toast.error("Please fill in new credentials.");
      return;
    }
    setChangeStep(2);
  };

  const handleVerifyRecoveryKey = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const { data: configData } = await supabase
        .from("admin_config")
        .select()
        .eq("id", "credentials")
        .single();

      if (configData) {
        if (configData.recovery_key === recoveryKey) {
          await supabase
            .from("admin_config")
            .update({
              username: newCredentials.username,
              password: newCredentials.password
            })
            .eq("id", "credentials");
            
          toast.success("Credentials updated successfully! Please login again.");
          setShowChangeCredentials(false);
          setChangeStep(1);
          setNewCredentials({ username: "", password: "" });
          setRecoveryKey("");
        } else {
          toast.error("Invalid Recovery Key. Please check and try again.");
        }
      }
    } catch (error) {
      toast.error("Failed to update credentials.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-10 rounded-[3rem] bg-secondary/10 border border-border space-y-8 shadow-2xl relative z-10"
      >
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6"
          >
            <ShieldCheck className="w-10 h-10" />
          </motion.div>
          <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">Admin Access</h1>
          <p className="text-muted-foreground">
            {showChangeCredentials 
              ? (changeStep === 1 ? "Update your admin credentials." : "Verify using your Master Recovery Key.")
              : "Enter your credentials to continue."
            }
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showChangeCredentials ? (
            <motion.div 
              key="login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      required
                      value={loginData.username}
                      onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all"
                      placeholder="Username"
                    />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="password"
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Login <ArrowRight className="w-5 h-5" /></>}
                </button>
                <div className="text-center">
                  <button 
                    type="button"
                    onClick={() => setShowChangeCredentials(true)}
                    className="text-sm font-bold text-primary hover:underline"
                  >
                    Forgot or Change Credentials?
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="change-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {changeStep === 1 ? (
                <>
                  <div className="space-y-4">
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="text"
                        value={newCredentials.username}
                        onChange={(e) => setNewCredentials({ ...newCredentials, username: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all"
                        placeholder="New Username"
                      />
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="password"
                        value={newCredentials.password}
                        onChange={(e) => setNewCredentials({ ...newCredentials, password: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all"
                        placeholder="New Password"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleRequestChange}
                    className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Next Step <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-center"
                  >
                    <p className="text-sm text-muted-foreground mb-1">Verification Required</p>
                    <p className="text-xs opacity-70">Enter your Master Recovery Key to confirm changes.</p>
                  </motion.div>
                  <div className="relative group">
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="password"
                      value={recoveryKey}
                      onChange={(e) => setRecoveryKey(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all text-center font-mono"
                      placeholder="MASTER-XXXX-XXXX"
                    />
                  </div>
                  <button
                    onClick={handleVerifyRecoveryKey}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Update Credentials <CheckCircle2 className="w-5 h-5" /></>}
                  </button>
                </div>
              )}
              <button 
                onClick={() => {
                  setShowChangeCredentials(false);
                  setChangeStep(1);
                }}
                className="w-full text-sm font-bold text-muted-foreground hover:underline"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center pt-4">
          <Link to="/" className="text-sm font-bold text-primary uppercase tracking-widest hover:underline flex items-center justify-center gap-2">
            Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
