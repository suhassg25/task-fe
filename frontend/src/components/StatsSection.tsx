import { motion } from "framer-motion";
import { Users, MapPin, Star, TreePine } from "lucide-react";

const stats = [
  { icon: Users, value: "0+", label: "Happy Campers" },
  { icon: MapPin, value: "", label: "Destinations" },
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: TreePine, value: "24/7", label: "Nature Access" },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="font-display text-4xl font-bold text-secondary-foreground">{stat.value}</div>
              <div className="text-secondary-foreground/60 font-body mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
