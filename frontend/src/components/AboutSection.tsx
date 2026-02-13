import { motion } from "framer-motion";
import { Shield, Leaf, Heart } from "lucide-react";
import adventureImg from "@/assets/adventure.jpg";

const features = [
  { icon: Shield, title: "Safe & Secure", desc: "24/7 security and safety measures at every location" },
  { icon: Leaf, title: "Eco-Friendly", desc: "Sustainable camping practices that preserve nature" },
  { icon: Heart, title: "Curated Experiences", desc: "Handpicked activities and unique local experiences" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img src={adventureImg} alt="Adventure camping" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold uppercase tracking-widest text-sm font-body">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Creating unforgettable outdoor experiences
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-10">
              We believe camping should be an adventure, not a compromise. Our luxury glamping
              experiences combine the thrill of the outdoors with the comfort you deserve.
            </p>

            <div className="space-y-6">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                    <p className="text-muted-foreground font-body mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
