import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { cn } from "../../lib/utils";

interface ContactProps {
  profile?: {
    email?: string;
    phone?: string;
    location?: string;
    whatsapp_number?: string;
  };
}

export function Contact({ profile }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const email = profile?.email || "shivajisfdc18@gmail.com";
  const phone = profile?.phone || "9398734214";
  const location = profile?.location || "Hyderabad, India";
  const whatsappNumber = profile?.whatsapp_number || "919398734214";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Shivaji Gedda,\n\nMy name is ${formData.name}.\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
  };

  return (
    <section id="contact" className="py-16 bg-secondary/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            GET IN <span className="text-primary italic font-serif font-normal">TOUCH</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Have a project in mind? Let's work together to create something amazing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Email Me</p>
                  <p className="text-xl font-bold">{email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Call Me</p>
                  <p className="text-xl font-bold">{phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Location</p>
                  <p className="text-xl font-bold">{location}</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-background border border-border shadow-xl">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-primary" />
                Direct WhatsApp
              </h3>
              <p className="text-muted-foreground mb-8">
                The fastest way to get in touch with me is via WhatsApp. Submit the form to start a chat!
              </p>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-600 font-bold">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span>Online & Ready to Chat</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="p-10 rounded-[3rem] bg-background border border-border shadow-2xl space-y-8"
          >
            <div className="space-y-4">
              <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Your Name</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Your Email</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="hello@example.com"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Your Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-4 rounded-2xl bg-secondary/10 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                placeholder="Tell me about your project or just say hi..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
            >
              Send via WhatsApp <Send className="w-6 h-6" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
