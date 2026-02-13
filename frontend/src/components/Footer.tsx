import { Mountain } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/taskLogo.png"

const Footer = () => {
  return (
    <footer className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="logo" className="h-10 w-10 text-primary rounded-full" />
              <span className="font-display text-xl font-bold text-secondary-foreground">TASK</span>
            </div>
            <p className="text-secondary-foreground/60 font-body max-w-sm">
              Experience the magic of luxury camping. We bring comfort to the wilderness so you can focus on making memories.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-secondary-foreground mb-4">Quick Links</h4>
            <div className="space-y-2 font-body">
              <a href="/#destinations" className="block text-secondary-foreground/60 hover:text-primary transition-colors">Destinations</a>
              <a href="/#about" className="block text-secondary-foreground/60 hover:text-primary transition-colors">About Us</a>
              <Link to="/booking" className="block text-secondary-foreground/60 hover:text-primary transition-colors">Book Now</Link>
              <a href="/#contact" className="block text-secondary-foreground/60 hover:text-primary transition-colors">Contact</a>
            </div>
          </div>

          <div className="hidden">
            <h4 className="font-display text-lg font-semibold text-secondary-foreground mb-4">Destinations</h4>
            <div className="space-y-2 font-body">
              <p className="text-secondary-foreground/60">Manali, HP</p>
              <p className="text-secondary-foreground/60">Spiti Valley, HP</p>
              <p className="text-secondary-foreground/60">Coorg, Karnataka</p>
              <p className="text-secondary-foreground/60">Jaisalmer, Rajasthan</p>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-secondary-foreground/40 font-body text-sm">
            © 2026 WildCamp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
