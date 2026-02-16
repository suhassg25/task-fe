import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/LanguageContext";

const ContactSection = () => {
  const { t, toggleLang, lang } = useLanguage();
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold uppercase tracking-widest text-sm font-body">
              {t("getInTouch")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              {t("ready")}
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-10">
              {t("questions")}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-body">{t("callUs")}</div>
                  <div className="text-foreground font-semibold">+91 94837 57077</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-body">{t("emailUs")}</div>
                  <div className="text-foreground font-semibold">tasktumakuru@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-body">{t("visitUs")}</div>
                  <div className="text-foreground font-semibold">{t("tumkur")}, {t("Karnataka")}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form className="bg-card rounded-2xl p-8 border border-border space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Your Name" className="bg-background" />
                <Input type="email" placeholder="Email Address" className="bg-background" />
              </div>
              <Input placeholder="Phone Number" className="bg-background" />
              <Textarea placeholder="Tell us about your dream camping trip..." rows={5} className="bg-background" />
              <Button className="w-full bg-primary text-primary-foreground hover:bg-olive-light font-semibold py-6 text-lg">
                {t("sendMsg")}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
