import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import  logo from "../assets/taskLogo.png"

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Destinations", path: "/#destinations" },
  { label: "About", path: "/#about" },
  { label: "Contact", path: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-secondary">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-8 w-8 text-primary" style={{borderRadius : 50,}} />
          <span className="font-display text-2xl font-bold text-secondary-foreground">ADVENTURE SPORTS, TUMAKURU</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              className="text-secondary-foreground/80 hover:text-primary transition-colors font-medium text-sm tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/admin">
            <Button variant="ghost" className="text-secondary-foreground/80 hover:text-primary">
              Admin
            </Button>
          </Link>
          <Link to="/booking">
            <Button className="bg-primary text-primary-foreground hover:bg-olive-light font-semibold px-6">
              Book Now
            </Button>
          </Link>
        </div>

        <button className="md:hidden text-secondary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-secondary border-t border-secondary px-4 pb-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              className="block py-3 text-secondary-foreground/80 hover:text-primary font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link to="/booking" onClick={() => setOpen(false)}>
            <Button className="w-full mt-2 bg-primary text-primary-foreground">Book Now</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
