import { motion } from "framer-motion";
import { Code, Database, Cloud, Zap, Cpu, Workflow } from "lucide-react";
import { cn } from "../../lib/utils";

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface ServicesProps {
  services: Service[];
}

const iconMap: Record<string, any> = {
  Code,
  Database,
  Cloud,
  Zap,
  Cpu,
  Workflow,
};

export function Services({ services }: ServicesProps) {
  const displayServices = services;

  return (
    <section id="services" className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            SERVICES <span className="text-primary italic font-serif font-normal">OFFERED</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            I offer a wide range of Salesforce development and consulting services to help your business grow and succeed.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            const IconComponent = iconMap[service.icon || "Code"] || Code;
            
            // Mock features based on title for a "filled" look
            const features = service.title.toLowerCase().includes("lwc") 
              ? ["Custom UI Components", "Reactive Properties", "Event Handling", "SLDS Integration"]
              : service.title.toLowerCase().includes("apex")
              ? ["Triggers & Handlers", "Batch & Queueable", "REST/SOAP Callouts", "Unit Testing"]
              : service.title.toLowerCase().includes("integration")
              ? ["Third-party APIs", "Middleware Setup", "Data Mapping", "Error Handling"]
              : service.title.toLowerCase().includes("automation")
              ? ["Complex Flows", "Process Optimization", "Approval Processes", "Email Alerts"]
              : ["Requirement Analysis", "Solution Design", "Best Practices", "Performance Tuning"];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative p-8 rounded-[2.5rem] bg-secondary/5 creative-border group transition-all duration-500 overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                  <IconComponent className="w-32 h-32 rotate-12" />
                </div>

                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:rotate-6 shadow-lg group-hover:shadow-primary/30">
                    <IconComponent className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-xs font-bold text-muted-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {service.title.toLowerCase().includes("lwc") ? (
                        ["HTML", "CSS", "JS", "SLDS"].map(t => <span key={t} className="px-2 py-1 rounded-md bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary">{t}</span>)
                      ) : service.title.toLowerCase().includes("apex") ? (
                        ["SOQL", "SOSL", "DML", "Unit Tests"].map(t => <span key={t} className="px-2 py-1 rounded-md bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary">{t}</span>)
                      ) : (
                        ["Salesforce", "Cloud", "CRM"].map(t => <span key={t} className="px-2 py-1 rounded-md bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary">{t}</span>)
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Service Details</span>
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Zap className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
