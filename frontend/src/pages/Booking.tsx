import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const destinations = [
  { value: "lakeside", label: "Rooms — ₹4,500/night" },
  { value: "mountain", label: "Stargazing — ₹6,000/night" },
  { value: "forest", label: "Forest Canopy Camp — ₹3,800/night" },
  { value: "desert", label: "Red Tent — ₹5,200/night" },
];

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would call Razorpay and save to DB
    toast.success("Booking submitted! Razorpay payment integration will be enabled with backend setup.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 font-body">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Book Your Adventure
            </h1>
            <p className="text-muted-foreground font-body text-lg mb-10">
              Fill in the details below and we'll get your glamping experience ready.
            </p>

            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground font-body mb-2 block">Full Name</label>
                  <Input
                    required
                    placeholder="John Doe"
                    className="bg-background"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground font-body mb-2 block">Email</label>
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
                <label className="text-sm font-semibold text-foreground font-body mb-2 block">Phone Number</label>
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
                  <MapPin className="h-4 w-4 text-primary" /> Destination
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
                    <Calendar className="h-4 w-4 text-primary" /> Check-in
                  </label>
                  <Input
                    required
                    type="date"
                    className="bg-background"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground font-body mb-2 block flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" /> Check-out
                  </label>
                  <Input
                    required
                    type="date"
                    className="bg-background"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground font-body mb-2 block flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> Number of Guests
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
                <CreditCard className="h-5 w-5" /> Proceed to Payment (Razorpay)
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
