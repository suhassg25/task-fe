import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, IndianRupee, TrendingUp, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
const stats = [
  { icon: Users, label: "Total Bookings", value: "156", change: "+12%" },
  { icon: Calendar, label: "This Month", value: "24", change: "+8%" },
  { icon: IndianRupee, label: "Revenue", value: "₹4.2L", change: "+18%" },
  { icon: TrendingUp, label: "Occupancy", value: "78%", change: "+5%" },
];

const statusColor: Record<string, string> = {
  confirmed: "bg-primary/15 text-primary border-primary/30",
  pending: "bg-warm-gold/15 text-warm-gold border-warm-gold/30",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

const Admin = () => {
  const [mockBookings , setMockBookings] = useState([])
  useEffect(() => {
    async function fetchBookings() {
      const response = await fetch("https://task-fe-75yw.onrender.com/api/admin/bookings?key=suhas_is_admin");
      const data = await response.json();
      setMockBookings(data);
    }
    fetchBookings();
  },[])
  const [search, setSearch] = useState("");
  const filtered = mockBookings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-secondary-foreground/70 hover:text-primary gap-1">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </Link>
            <h1 className="font-display text-2xl font-bold text-secondary-foreground">Admin Dashboard</h1>
          </div>
          <Badge className="bg-primary/15 text-primary border-primary/30">Mock Data</Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <s.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary font-body">{s.change}</span>
              </div>
              <div className="font-display text-2xl font-bold text-card-foreground">{s.value}</div>
              <div className="text-muted-foreground text-sm font-body mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-display text-xl font-semibold text-card-foreground">Recent Bookings</h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                className="pl-9 bg-background"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-body">Name</TableHead>
                  <TableHead className="font-body">Destination</TableHead>
                  <TableHead className="font-body">Check-in</TableHead>
                  <TableHead className="font-body">Check-out</TableHead>
                  <TableHead className="font-body">Guests</TableHead>
                  <TableHead className="font-body">Amount</TableHead>
                  <TableHead className="font-body">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div>
                        <div className="font-semibold text-card-foreground">{b.name}</div>
                        <div className="text-xs text-muted-foreground">{b.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-body">{b.destination}</TableCell>
                    <TableCell className="font-body">{b.checkIn}</TableCell>
                    <TableCell className="font-body">{b.checkOut}</TableCell>
                    <TableCell className="font-body">{b.guests}</TableCell>
                    <TableCell className="font-semibold">{b.amount}</TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColor[b.status]}`}>
                        {b.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground font-body">
              No bookings found matching your search.
            </div>
          )}
        </div>

        <p className="text-center text-muted-foreground text-sm font-body mt-8">
          This is mock data. Enable Lovable Cloud to store real bookings and integrate Razorpay payments.
        </p>
      </div>
    </div>
  );
};

export default Admin;
