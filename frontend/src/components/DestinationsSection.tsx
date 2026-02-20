import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import destLake from "@/assets/Adv sports.jpeg";
import destMountain from "@/assets/trekking.jpeg";
import destForest from "@/assets/scuba.jpeg";
import destDesert from "@/assets/Env Studies.jpeg";
import cycling from "@/assets/cycling.jpeg";
import cultural from "@/assets/CultaralActivities.jpeg";
import nature from "@/assets/NatureTours.jpeg";
import watersports from "@/assets/waterSports.jpeg";
import cineama from "@/assets/Cinema.jpeg";
import { useLanguage } from "@/LanguageContext";

const destinations = [
  {
    title: "Adventure Sports",
    location: "Tumkur",
    price: "₹4,500",
    rating: 4.9,
    image: destLake,
  },
  {
    title: "Trekking",
    location: "Tumkur",
    price: "₹6,000",
    rating: 4.8,
    image: destMountain,
  },
  {
    title: "Scuba Diving",
    location: "Tumkur",
    price: "₹3,800",
    rating: 4.7,
    image: destForest,
  },
  {
    title: "Environmental Study",
    location: "tumkur",
    price: "₹5,200",
    rating: 4.9,
    image: destDesert,
  },
  {
    title: "Cycling",
    location: "Tumkur",
    price: "₹3,800",
    rating: 4.7,
    image: cycling,
  },
  {
    title: "Cultural Activities",
    location: "Tumkur",
    price: "₹6,000",
    rating: 4.8,
    image: cultural,
  },
  {
    title: "Nature tours",
    location: "Tumkur",
    price: "₹9,000",
    rating: 4.8,
    image: nature,
  },
  {
    title: "Water Sports",
    location: "Tumkur",
    price: "₹1,000",
    rating: 4.8,
    image: watersports,
  },
  {
    title: "Cinema",
    location: "Tumkur",
    price: "₹2,000",
    rating: 4.8,
    image: cineama,
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
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-widest text-sm font-body">
            {t("ourDestinations")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            {t("findEscape")}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-body text-lg">
            {t("handpicked")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="absolute top-3 right-3 bg-secondary/80 backdrop-blur-sm text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {dest.price}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-card-foreground">{dest.title}</h3>
                <div className="flex items-center gap-1 mt-2 text-muted-foreground font-body text-sm">
                  <MapPin className="h-4 w-4" />
                  {dest.location}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warm-gold" fill="currentColor" />
                    <span className="text-sm font-semibold text-card-foreground">{dest.rating}</span>
                  </div>
                  <Link to="/booking" className="text-primary hover:text-olive-light font-semibold text-sm flex items-center gap-1">
                    {t("bookNow")} <ArrowRight className="h-4 w-4" />
                  </Link>
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
