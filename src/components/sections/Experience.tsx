import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { cn } from "../../lib/utils";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description?: string;
  order?: number;
}

interface ExperienceProps {
  experience: Experience[];
}

export function Experience({ experience }: ExperienceProps) {
  const displayExperience = experience;

  return (
    <section id="experience" className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            WORK <span className="text-primary italic font-serif font-normal">EXPERIENCE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            My professional journey and work history in the Salesforce ecosystem.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {displayExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8",
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background z-10 hidden md:block shadow-lg" />

                <div className="w-full md:w-1/2 p-8 rounded-3xl bg-secondary/10 border border-border hover:border-primary/50 transition-all group">
                  <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-xs mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-2">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground font-bold mb-4">
                    <Briefcase className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
                {/* Empty space for the other side of the timeline */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
