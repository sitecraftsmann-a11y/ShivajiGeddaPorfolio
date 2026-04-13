import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { cn } from "../../lib/utils";

interface HeroProps {
  profile?: {
    name: string;
    title: string;
    tagline: string;
    profile_image?: string;
  };
}

export function Hero({ profile }: HeroProps) {
  const name = profile?.name || "Shivaji Gedda";
  const title = profile?.title || "Salesforce Developer";
  const tagline = profile?.tagline || "Building scalable and efficient solutions on the Salesforce platform.";
  const profileImage = profile?.profile_image || "https://picsum.photos/seed/salesforce/800/800";

  const overlayImages = [
    "https://picsum.photos/seed/art1/400/400",
    "https://picsum.photos/seed/art2/400/400",
    "https://picsum.photos/seed/art3/400/400",
    "https://picsum.photos/seed/art4/400/400",
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center pt-12 overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 text-primary font-semibold tracking-widest uppercase text-xs"
              >
                <span className="w-8 h-[1px] bg-primary" />
                Available for Freelance
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                {name} <br />
                <span className="text-primary/80 italic font-serif font-normal">Salesforce Specialist</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              <span className="font-semibold text-foreground">{title}</span> — {tagline}
            </p>

            <div className="flex flex-wrap gap-5 pt-4">
              <a
                href="#portfolio"
                className="group px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
              >
                View Projects 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full border border-border hover:bg-secondary/50 transition-all font-semibold active:scale-95"
              >
                Get in Touch
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Resume download will be available soon!");
                }}
                className="px-8 py-4 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all font-semibold active:scale-95 flex items-center gap-2 text-primary"
              >
                Download Resume
                <Download className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Image Collage */}
          <div className="lg:col-span-5 relative h-[600px] w-full max-w-lg mx-auto lg:mx-0 flex items-center justify-center">
            {/* Main Image (Smaller & Centered) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="relative z-30 w-56 h-72 rounded-[2rem] overflow-hidden border-4 border-background shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]"
            >
              <img
                src={profileImage}
                alt={name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </motion.div>

            {/* Creative Overlay Pattern (Staggered & Rotated) */}
            <motion.div
              initial={{ opacity: 0, x: 60, y: -60, rotate: 15 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 12 }}
              transition={{ delay: 0.4, duration: 1.2, ease: "backOut" }}
              className="absolute top-10 right-10 w-36 h-36 rounded-3xl overflow-hidden shadow-xl z-20 border-2 border-background hover:z-40 transition-all duration-500 hover:scale-110 cursor-pointer"
            >
              <img src={overlayImages[0]} alt="Work 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60, y: -40, rotate: -15 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -8 }}
              transition={{ delay: 0.5, duration: 1.2, ease: "backOut" }}
              className="absolute top-20 left-4 w-32 h-32 rounded-3xl overflow-hidden shadow-xl z-10 border-2 border-background hover:z-40 transition-all duration-500 hover:scale-110 cursor-pointer"
            >
              <img src={overlayImages[1]} alt="Work 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40, y: 60, rotate: -10 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -15 }}
              transition={{ delay: 0.6, duration: 1.2, ease: "backOut" }}
              className="absolute bottom-10 left-10 w-40 h-40 rounded-3xl overflow-hidden shadow-xl z-20 border-2 border-background hover:z-40 transition-all duration-500 hover:scale-110 cursor-pointer"
            >
              <img src={overlayImages[2]} alt="Work 3" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, y: 40, rotate: 10 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 5 }}
              transition={{ delay: 0.7, duration: 1.2, ease: "backOut" }}
              className="absolute bottom-20 right-0 w-36 h-36 rounded-3xl overflow-hidden shadow-xl z-10 border-2 border-background hover:z-40 transition-all duration-500 hover:scale-110 cursor-pointer"
            >
              <img src={overlayImages[3]} alt="Work 4" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>

            {/* Abstract Shapes */}
            <div className="absolute -z-10 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.03] animate-pulse" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -z-10 w-full h-full border border-dashed border-primary/20 rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
