import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Filter, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tools?: string[];
  client?: string;
  main_image: string;
  gallery?: string[];
  order?: number;
}

interface PortfolioProps {
  projects: Project[];
}

const categories = ["all", "LWC", "Apex", "Integrations", "Flows", "Aura"];

export function Portfolio({ projects }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const displayProjects = projects;

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return displayProjects;
    return displayProjects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory, displayProjects]);

  return (
    <section id="portfolio" className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            MY <span className="text-primary italic font-serif font-normal">PORTFOLIO</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A showcase of my technical solutions and Salesforce implementations that I've completed for my clients.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-secondary/10 text-muted-foreground hover:bg-secondary/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                className={cn(
                  "group relative rounded-3xl overflow-hidden cursor-pointer shadow-xl creative-border",
                  index === 0 ? "md:col-span-2 md:row-span-2" : "",
                  index === 3 ? "md:row-span-2" : ""
                )}
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.main_image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{project.category}</p>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 text-white/60 text-xs font-semibold">
                      <ExternalLink className="w-3 h-3" />
                      <span>Explore Case Study</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/90 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-background border border-border rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-96">
                  <img
                    src={selectedProject.main_image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <h3 className="text-4xl font-black tracking-tighter mb-6">{selectedProject.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      {selectedProject.description}
                    </p>
                    {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProject.gallery.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`${selectedProject.title} ${i + 1}`}
                            className="rounded-2xl w-full h-48 object-cover border border-border"
                            referrerPolicy="no-referrer"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Project Info</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest">Client</p>
                          <p className="font-bold">{selectedProject.client || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest">Category</p>
                          <p className="font-bold capitalize">{selectedProject.category}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest">Tools Used</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedProject.tools?.map((tool) => (
                              <span key={tool} className="px-3 py-1 rounded-full bg-secondary/20 text-xs font-bold">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
