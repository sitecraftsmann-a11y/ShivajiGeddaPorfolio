import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Services } from "../components/sections/Services";
import { Skills } from "../components/sections/Skills";
import { Portfolio } from "../components/sections/Portfolio";
import { Testimonials } from "../components/sections/Testimonials";
import { Experience } from "../components/sections/Experience";
import { Contact } from "../components/sections/Contact";
import { Certifications } from "../components/sections/Certifications";
import { AIChatAssistant } from "../components/AIChatAssistant";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";

export function Home() {
  const [profile, setProfile] = useState<any>({
    name: "Shivaji Gedda",
    bio: "Salesforce Developer building scalable and efficient solutions.",
    email: "shivajisfdc18@gmail.com",
    phone: "9398734214",
    socialLinks: {}
  });
  const [services, setServices] = useState<any[]>([
    { id: "s1", title: "LWC Development", description: "Building modern, responsive user interfaces using Lightning Web Components.", icon: "Code" },
    { id: "s2", title: "Apex Programming", description: "Developing robust server-side logic, triggers, and asynchronous processing.", icon: "Cpu" },
    { id: "s3", title: "Salesforce Integration", description: "Connecting Salesforce with external systems using REST/SOAP APIs.", icon: "Zap" },
    { id: "s4", title: "Flow Automation", description: "Designing complex business processes using Salesforce Flows and Process Builder.", icon: "Workflow" }
  ]);
  const [skills, setSkills] = useState<any[]>([
    { id: "sk1", name: "Salesforce CRM", proficiency: 95, category: "Platform" },
    { id: "sk2", name: "Apex & Triggers", proficiency: 90, category: "Development" },
    { id: "sk3", name: "LWC", proficiency: 85, category: "Frontend" },
    { id: "sk4", name: "Salesforce Flows", proficiency: 90, category: "Automation" },
    { id: "sk5", name: "REST/SOAP APIs", proficiency: 80, category: "Integration" },
    { id: "sk6", name: "JavaScript", proficiency: 85, category: "Languages" }
  ]);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([
    {
      id: "exp-1",
      role: "Freelance Salesforce Developer",
      company: "Self-Employed",
      period: "Oct 2024 - Present",
      description: "Providing specialized Salesforce development, LWC components, and Apex integrations for various clients.",
      order: 1
    },
    {
      id: "exp-2",
      role: "Software Engineer",
      company: "Aspire Systems, Chennai",
      period: "Mar 2024 - Sep 2024",
      description: "Contributed to software development projects, focusing on scalable solutions and efficient code practices.",
      order: 2
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: profileData } = await supabase.from('profile').select().eq('id', 'main').single();
      if (profileData) setProfile(profileData);

      const { data: servicesData } = await supabase.from('services').select();
      if (servicesData) setServices(servicesData || []);

      const { data: skillsData } = await supabase.from('skills').select();
      if (skillsData) setSkills(skillsData || []);

      const { data: projectsData } = await supabase.from('projects').select().order('order', { ascending: true });
      if (projectsData) setProjects(projectsData || []);

      const { data: testimonialsData } = await supabase.from('testimonials').select();
      if (testimonialsData) setTestimonials(testimonialsData || []);

      const { data: experienceData } = await supabase.from('experience').select().order('order', { ascending: true });
      if (experienceData) setExperience(experienceData || []);
    };

    fetchData();

    // Real-time subscriptions
    const channels = [
      'profile', 'services', 'skills', 'projects', 'testimonials', 'experience'
    ].map(table => 
      supabase.channel(`${table}-changes`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, () => fetchData())
        .subscribe()
    );

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Hero profile={profile} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <About profile={profile} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Services services={services} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Skills skills={skills} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Portfolio projects={projects} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Testimonials testimonials={testimonials} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Experience experience={experience} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Certifications />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Contact profile={profile} />
      </motion.div>
      <Footer />
      <AIChatAssistant />
    </div>
  );
}
