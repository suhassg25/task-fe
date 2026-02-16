import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "../LanguageContext";
import { totalmem } from "os";
import { set, setDate } from "date-fns";

const destinations = [
  { value: "Adventure Sports", label: "Adventure Sports — ₹4,500", },
  { value: "Trekking", label: "Trekking — ₹6,000", },
  { value: "Scuba Diving", label: "Scuba Diving — ₹3,800", },
  { value: "Environmental Study", label: "Environmental Study — ₹5,200", },
  { value: "Cycling", label: "Cycling — ₹3,800", },
  { value: "Cultural Activities", label: "Cultural Activities — ₹6,000", },
  { value: "Nature tours", label: "Nature tours — ₹9,000", },
  { value: "Water Sports", label: "Water Sports — ₹1,000", },
  { value: "Cinema", label: "Cinema — ₹2,000", },
];
const Booking = () => {
  const { t, lang, toggleLang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    checkin: "",
    checkout: "",
    guests: "",
    noOfDays: 0,
    amount: 0,
  });
const value =async () => {
      const val = fetch("https://task-fe-75yw.onrender.com/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          totalAmount: formData.noOfDays * parseInt(formData.destination.split("— ₹")[1]) * parseInt(formData.guests),
        }),
      });
      const resp = await val;
      if(resp.ok) {
        toast.success("Booking successful!");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const diff = Math.floor((new Date(formData.checkout).getTime() - new Date(formData.checkin).getTime()) / (1000 * 3600 * 24));
    setFormData({ ...formData, noOfDays: diff});
    value();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 font-body">
            <ArrowLeft className="h-4 w-4" /> {t("BacktoHome")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className={`font-display text-4xl ${lang === "kn" ? "md:text-3xl" : "md:text-5xl"} font-bold text-foreground mb-3`}>
              {t("bookYourAdventure")}
            </h1>
            <p className={`text-muted-foreground font-body ${lang === "kn" ? "text-sm" : "text-lg"} mb-10`}>
              {t("fillindetails")}
            </p>

            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground font-body mb-2 block">{t("FullName")}</label>
                  <Input
                    required
                    placeholder="John Doe"
                    className="bg-background"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground font-body mb-2 block">{t("Email")}</label>
                  <Input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="bg-background"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground font-body mb-2 block">{t("PhoneNumber")}</label>
                <Input
                  required
                  placeholder="+91 98765 43210"
                  className="bg-background"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground font-body mb-2 block flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> {t("Destination")}
                </label>
                <Select onValueChange={(v) => setFormData({ ...formData, destination: v })}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Choose a destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((d) => (
                      <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground font-body mb-2 block flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" /> {t("checkin")}
                  </label>
                  <Input
                    required
                    type="date"
                    className="bg-background"
                    value={formData.checkin}
                    onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground font-body mb-2 block flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" /> {t("checkout")}
                  </label>
                  <Input
                    required
                    type="date"
                    className="bg-background"
                    value={formData.checkout}
                    onChange={(e) => {
                      setFormData({ ...formData, checkout: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground font-body mb-2 block flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> {t("numberofGuests")}
                </label>
                <Select onValueChange={(v) => setFormData({ ...formData, guests: v })}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "Guest" : "Guests"}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-olive-light font-semibold py-6 text-lg gap-2"
              >
                <CreditCard className="h-5 w-5" /> {t("proceedTopayment")}
              </Button>

              <p className="text-center text-muted-foreground text-sm font-body">
                Razorpay payment gateway will be integrated once backend is set up.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
