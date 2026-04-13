import { motion } from "framer-motion";
import { Award, CheckCircle2, ExternalLink } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  link?: string;
}

const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Salesforce Certified Platform Developer I",
    issuer: "Salesforce",
    date: "2024",
    image: "https://picsum.photos/seed/sf-cert1/400/300",
  },
  {
    id: "cert-2",
    title: "Salesforce Certified Administrator",
    issuer: "Salesforce",
    date: "2023",
    image: "https://picsum.photos/seed/sf-cert2/400/300",
  }
];

export function Certifications() {
  return (
    <section id="certifications" className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            OFFICIAL <span className="text-primary italic font-serif font-normal">CERTIFICATIONS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Validated expertise in the Salesforce ecosystem through industry-standard certifications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-[2.5rem] bg-secondary/5 creative-border overflow-hidden transition-all duration-500"
            >
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg group-hover:border-primary transition-colors">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-primary mb-2">
                    <Award className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">{cert.issuer}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight">{cert.title}</h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Issued {cert.date}</span>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-center md:justify-start gap-4">
                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2 hover:opacity-80 transition-opacity">
                      Verify Credential <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
