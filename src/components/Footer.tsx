import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Github, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left mb-12">
          <div>
            <Link to="/" className="text-3xl font-black tracking-tighter mb-4 block">
              SHIVAJI<span className="text-primary"> GEDDA</span>
            </Link>
            <p className="text-muted-foreground max-w-xs mx-auto md:mx-0">
              Salesforce Developer building scalable and efficient solutions on the Salesforce platform.
            </p>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="#" className="p-3 rounded-full bg-secondary/10 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 rounded-full bg-secondary/10 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 rounded-full bg-secondary/10 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 rounded-full bg-secondary/10 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg">
              <Github className="w-6 h-6" />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-4">
            <button
              onClick={scrollToTop}
              className="p-4 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-110 transition-transform"
              aria-label="Back to top"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
            <p className="text-sm font-bold text-muted-foreground">BACK TO TOP</p>
          </div>
        </div>

        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} Shivaji Gedda. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
