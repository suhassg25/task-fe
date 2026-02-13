import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "The lakeside retreat was absolutely magical. Waking up to misty mountains and having a cozy tent — it was the perfect getaway!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    text: "Best camping experience ever. The desert glamping under the stars was surreal. The team arranged everything perfectly.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    location: "Bangalore",
    text: "We took our family to the forest camp and the kids absolutely loved it. Safe, comfortable, and so close to nature!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-widest text-sm font-body">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            What our campers say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-background rounded-2xl p-8 border border-border"
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <p className="text-foreground/80 font-body text-base leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-warm-gold" fill="currentColor" />
                ))}
              </div>
              <div className="font-display font-semibold text-foreground">{t.name}</div>
              <div className="text-muted-foreground text-sm font-body">{t.location}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
