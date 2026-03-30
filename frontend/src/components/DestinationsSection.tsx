import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import destLake from "@/assets/Adv sports.jpg";
import documentriess from "@/assets/documentriess.jpg";
import publications from "@/assets/publications.jpg";
import { useLanguage } from "@/LanguageContext";

const destinations = [
  {
    title: "Adventure Sports",
    rating: 4.9,
    image: destLake,
  },
  {
    title: "Publications",
    rating: 4.8,
    image: publications,
  },
  {
    title: "Documentries",
    rating: 4.8,
    image: documentriess,
  }, 
];

const DestinationsSection = () => {
  const { t, toggleLang, lang } = useLanguage();
  return (
    <section id="destinations" className="py-6 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-primary font-semibold uppercase tracking-widest text-sm font-body">
            {t("ourDestinations")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-1">
            {t("findEscape")}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-body text-lg">
            {t("handpicked")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-card-foreground">{dest.title}</h3>
                <div className="">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warm-gold" fill="currentColor" />
                    <span className="text-sm font-semibold text-card-foreground">{dest.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
