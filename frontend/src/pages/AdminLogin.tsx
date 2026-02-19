import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/LanguageContext";
import Navbar from "@/components/Navbar";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {t, toggleLang, lang} = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@.com" && password === "Hexa25698") {
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-background">
          <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 font-body">
            <ArrowLeft className="h-4 w-4" /> {t("BacktoHome")}
          </Link>
          </div>
          </div>
          
    <div className="flex md:items-center justify-center">
      <div className="bg-card rounded-xl border border-border p-8 max-w-md w-full">
        <h1 className="font-display text-2xl font-bold text-card-foreground mb-6">Admin Login</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-1">Email</label>
            <Input id="email" type="email" placeholder="admin@example.com" onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-1">Password</label>
            <Input id="password" type="password" placeholder="••••••••" onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          <Button type="submit" className="w-full" onClick={handleSubmit}>Login</Button>
        </form>
      </div>
    </div>
    </div>
  );
}