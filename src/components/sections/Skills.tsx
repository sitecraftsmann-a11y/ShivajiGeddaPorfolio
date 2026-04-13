import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis, Tooltip, Legend } from "recharts";
import { BarChart2, List, ChevronDown, ChevronUp, Award, Zap, Shield, Globe, Database, Cpu, TrendingUp, Star, Target } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category?: string;
}

interface SkillsProps {
  skills: Skill[];
}

const categoryColors: Record<string, string> = {
  Platform: "text-sky-500 bg-sky-500/10 border-sky-500/20",
  Development: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  Frontend: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  Automation: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  Integration: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  Languages: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  Default: "text-primary bg-primary/10 border-primary/20",
};

const categoryIcons: Record<string, any> = {
  Platform: Globe,
  Development: Cpu,
  Frontend: Zap,
  Automation: Shield,
  Integration: Database,
  Languages: Award,
  Default: Zap,
};

export function Skills({ skills }: SkillsProps) {
  const [viewMode, setViewMode] = useState<"list" | "chart">("list");
  const displaySkills = skills;

  const getLevel = (p: number) => {
    if (p >= 90) return "Expert";
    if (p >= 80) return "Advanced";
    if (p >= 70) return "Intermediate";
    return "Beginner";
  };

  const chartData = displaySkills.map(s => ({
    subject: s.name,
    proficiency: s.proficiency,
    fullMark: 100,
  }));

  const avgProficiency = Math.round(displaySkills.reduce((acc, s) => acc + s.proficiency, 0) / displaySkills.length);
  const topSkill = [...displaySkills].sort((a, b) => b.proficiency - a.proficiency)[0];

  return (
    <section id="skills" className="py-16 bg-secondary/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            TECHNICAL <span className="text-primary italic font-serif font-normal">SKILLS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            A deep dive into my technical proficiency and Salesforce expertise across various domains.
          </motion.p>

          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                viewMode === "list" ? "bg-primary text-primary-foreground shadow-lg" : "bg-background border border-border text-muted-foreground"
              )}
            >
              <List className="w-4 h-4" /> List View
            </button>
            <button
              onClick={() => setViewMode("chart")}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                viewMode === "chart" ? "bg-primary text-primary-foreground shadow-lg" : "bg-background border border-border text-muted-foreground"
              )}
            >
              <BarChart2 className="w-4 h-4" /> Chart View
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {displaySkills.map((skill, index) => {
                const colorClass = categoryColors[skill.category || "Default"] || categoryColors.Default;
                const Icon = categoryIcons[skill.category || "Default"] || categoryIcons.Default;
                const level = getLevel(skill.proficiency);

                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-3xl bg-background border border-border shadow-xl hover:border-primary/50 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors", colorClass)}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{skill.name}</h3>
                          <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border", colorClass)}>
                            {skill.category || "General"}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-primary">{skill.proficiency}%</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{level}</p>
                      </div>
                    </div>
                    
                    <div className="h-3 w-full bg-secondary/20 rounded-full overflow-hidden border border-border/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className={cn("h-full rounded-full", colorClass.split(" ")[1].replace("bg-", "bg-").replace("/10", ""))}
                        style={{ backgroundColor: "currentColor" }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="chart"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch transition-all duration-700 min-h-[500px]">
                {/* Stats Sidebar */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-4 space-y-4"
                >
                  <div className="p-6 rounded-[2rem] bg-background border border-border shadow-xl h-full flex flex-col justify-center space-y-8">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> Proficiency Overview
                      </h4>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Star className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">Top Skill</p>
                            <p className="font-bold text-lg">{topSkill?.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary-foreground">
                            <Target className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">Average Level</p>
                            <p className="font-bold text-lg">{avgProficiency}%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-border/50">
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        "Visualizing technical depth across the Salesforce ecosystem. This chart represents my core competencies and areas of specialization."
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Main Chart Area */}
                <div className="lg:col-span-8 bg-background/50 backdrop-blur-xl rounded-[3rem] border border-border p-8 md:p-12 shadow-2xl relative overflow-hidden flex items-center justify-center">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary rounded-full animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-primary rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-primary rounded-full" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                  </div>

                  <div className="h-full w-full min-h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid stroke="rgba(var(--primary-rgb), 0.15)" />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fill: "currentColor", fontSize: 11, fontWeight: 700 }}
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "rgba(var(--background-rgb), 0.9)", 
                            borderRadius: "1rem", 
                            border: "1px solid rgba(var(--primary-rgb), 0.2)",
                            backdropFilter: "blur(10px)",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        />
                        <Radar
                          name="Proficiency"
                          dataKey="proficiency"
                          stroke="var(--primary)"
                          fill="var(--primary)"
                          fillOpacity={0.4}
                          dot={{ r: 5, fill: "var(--primary)", strokeWidth: 2, stroke: "#fff" }}
                          activeDot={{ r: 8, fill: "var(--primary)", stroke: "#fff", strokeWidth: 3 }}
                        />
                        <Legend verticalAlign="bottom" height={36}/>
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
