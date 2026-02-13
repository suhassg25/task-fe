import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImg from "../assets/taskLogo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Luxury glamping in nature" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/60 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 pt-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-1 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
              <Star className="h-4 w-4" fill="currentColor" /> Top Rated Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-secondary-foreground leading-tight mb-6"
          >
            Discover nature's beauty with{" "}
            <span className="text-primary">luxury camping</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-secondary-foreground/70 text-lg md:text-xl mb-8 max-w-lg font-body"
          >
            Escape the ordinary and immerse yourself in breathtaking wilderness with our
            handpicked glamping destinations across the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/booking">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-olive-light font-semibold text-lg px-8 py-6 gap-2">
                Book Your Adventure <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#destinations" className="hidden">
              <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 text-lg px-8 py-6">
                Explore Destinations
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-6 mt-12"
          >
            <div className="flex items-center gap-2 text-secondary-foreground/60">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-body">EXCLUSIVE IN TUMUKUR</span>
            </div>
            <div className="flex items-center gap-2 text-secondary-foreground/60">
              <Star className="h-5 w-5 text-warm-gold" fill="currentColor" />
              <span className="font-body">4.9 Rating</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
