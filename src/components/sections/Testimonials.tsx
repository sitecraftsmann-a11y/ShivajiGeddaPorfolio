import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  feedback: string;
  avatar?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayTestimonials = testimonials;

  useEffect(() => {
    if (displayTestimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const next = () => {
    if (displayTestimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };
  const prev = () => {
    if (displayTestimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  if (displayTestimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-16 bg-secondary/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            CLIENT <span className="text-primary italic font-serif font-normal">FEEDBACK</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            What my clients say about my work and development process.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="p-12 rounded-[3rem] bg-background border border-border shadow-2xl text-center relative"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                <Quote className="w-8 h-8" />
              </div>
              <p className="text-2xl md:text-3xl font-medium italic leading-relaxed mb-10 text-muted-foreground">
                "{displayTestimonials[currentIndex].feedback}"
              </p>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                  <img
                    src={displayTestimonials[currentIndex].avatar || `https://i.pravatar.cc/150?u=${displayTestimonials[currentIndex].client_name}`}
                    alt={displayTestimonials[currentIndex].client_name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-xl font-bold">{displayTestimonials[currentIndex].client_name}</h4>
                <p className="text-sm text-primary font-bold uppercase tracking-widest">{displayTestimonials[currentIndex].client_role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="p-4 rounded-full bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-4 rounded-full bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
