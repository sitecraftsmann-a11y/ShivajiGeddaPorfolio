import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface AboutProps {
  profile?: {
    bio?: string;
    philosophy?: string;
    experience_summary?: string;
  };
}

export function About({ profile }: AboutProps) {
  const bio = profile?.bio || "I am a dedicated Salesforce Developer with a passion for building robust, scalable solutions that drive business success.";
  const philosophy = profile?.philosophy || "Code is like humor. When you have to explain it, it’s bad. I believe in clean, efficient, and maintainable Salesforce development.";
  const experienceSummary = profile?.experience_summary || "Certified Salesforce professional with expertise in Apex, LWC, and complex integrations.";

  return (
    <section id="about" className="py-16 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
              DEVELOPER <span className="text-primary italic font-serif font-normal">PHILOSOPHY</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed italic border-l-2 border-primary pl-6">
              "{philosophy}"
            </p>
            <div className="space-y-6 mb-10">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {bio}
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                My approach to development is rooted in the belief that every business process can be optimized. I combine deep technical knowledge of the Salesforce platform with a focus on user experience to create solutions that not only work flawlessly but also empower users.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Whether it's a complex integration, a custom Lightning Web Component, or a full-scale CRM implementation, I bring the same level of precision and problem-solving to every project.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-left">
                <p className="text-3xl font-bold text-primary">5+</p>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-[0.2em]">Years Exp.</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-left">
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-[0.2em]">Projects</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-left">
                <p className="text-3xl font-bold text-primary">30+</p>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-[0.2em]">Clients</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 auto-rows-[150px]">
              <div className="row-span-2 rounded-3xl overflow-hidden creative-border">
                <img src="https://picsum.photos/seed/code1/400/400" alt="Code 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="row-span-3 rounded-3xl overflow-hidden creative-border">
                <img src="https://picsum.photos/seed/code2/400/600" alt="Code 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="row-span-3 rounded-3xl overflow-hidden creative-border">
                <img src="https://picsum.photos/seed/code3/400/600" alt="Code 3" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="row-span-2 rounded-3xl overflow-hidden creative-border">
                <img src="https://picsum.photos/seed/code4/400/400" alt="Code 4" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            {/* Floating Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-3xl bg-background/90 backdrop-blur-md border border-border shadow-2xl text-center z-10 w-48 creative-border">
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Expertise</p>
              <p className="text-xs text-muted-foreground">Salesforce & Cloud Architecture</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
