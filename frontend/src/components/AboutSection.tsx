import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext";
import person2 from "@/assets/person1.jpg";
import person3 from "@/assets/person2.jpg";
import person1 from "@/assets/person3.jpg";
import person4 from "@/assets/person4.jpg";
import person5 from "@/assets/person5.jpg";

const trustedPeople = [
  {
    name: "Youth Hostels Association of India (YHAI)",
    role: "Associated Partner",
    image: person1,
  },
  {
    name: "Dr. Lekhanaraj",
    role: "President",
    image: person3,
  },
  {
    name: "Radha himantaraju",
    role: "Secretary",
    image: person5,
  },
  {
    name: "Himantaraju G",
    role: "Trusty",
    image: person2,
  },
  {
    name : "Bharathraju S B",
    role : "Trusty",
    image : person4,

  }
];

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">
            {t("whyus")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            {t("trst")}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t("collab")}
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid md:grid-cols-5 gap-10">
          {trustedPeople.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col items-center"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-80 object-contain object-cover text-center"
                style={{height : 280}}
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-foreground">
                  {person.name}
                </h3>
                <p className="text-muted-foreground mt-2">
                  {person.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;