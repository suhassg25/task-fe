import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import destLake from "@/assets/dest-lake.jpg";
import destMountain from "@/assets/dest-mountain.jpg";
import destForest from "@/assets/dest-forest.jpg";
import destDesert from "@/assets/dest-desert.jpg";

const destinations = [
  {
    title: "Rooms",
    location: "Tumkur",
    price: "₹4,500",
    rating: 4.9,
    image: destLake,
  },
  {
    title: "Stargazing",
    location: "Tumkur",
    price: "₹6,000",
    rating: 4.8,
    image: destMountain,
  },
  {
    title: "Forest Canopy Camp",
    location: "Tumkur, Karnataka",
    price: "₹3,800",
    rating: 4.7,
    image: destForest,
  },
  {
    title: "Red Tent",
    location: "tumkur",
    price: "₹5,200",
    rating: 4.9,
    image: destDesert,
  },
];

const DestinationsSection = () => {
  return (
    <section id="destinations" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-widest text-sm font-body">
            Our Destinations
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            Find your perfect escape
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-body text-lg">
            Handpicked glamping locations that blend luxury with raw nature
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
                  {dest.price}/night
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
                    Book Now <ArrowRight className="h-4 w-4" />
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
