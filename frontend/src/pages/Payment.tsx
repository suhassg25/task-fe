import { useState, useEffect } from "react";
import { useLanguage } from "@/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Payment() {
  const { t } = useLanguage();

  const [amount, setAmount] = useState<number>(0);
  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const bookingId = localStorage.getItem("bookingId");

    async function fetchBooking() {
      const url = "https://task-fe-75yw.onrender.com";
      const url1 = "http://localhost:5000";

      try {
        const resp = await fetch(`${url}/api/booking/${bookingId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (resp.ok) {
          const data = await resp.json();
          setAmount(data.booking.totalAmount);
        } else {
          console.error("Failed to fetch booking details");
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    }

    if (bookingId) {
      fetchBooking();
    }
  }, []);

  /* const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!utr && !screenshot) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);

    const url = "https://task-fe-75yw.onrender.com";
    const url1 = "http://localhost:5000";

    const formData = new FormData();
    formData.append("utr", utr);
    if (screenshot) {
      formData.append("screenshot", screenshot);
    }

    try {
      const resp = await fetch(`${url}/api/payment-proof`, {
        method: "POST",
        body: formData,
      });

      if (resp.ok) {
        alert("Payment proof submitted successfully!");
      } else {
        alert("Failed to submit payment proof.");
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };
*/
  const showErrorBorder = error && !utr && !screenshot;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 font-body"
          >
            <ArrowLeft className="h-4 w-4" /> {t("BacktoHome")}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Make Payment by scanning our QR Code and add UTR details or upload
          screenshot for{" "}
          <span className="font-bold text-primary">₹{amount}</span>
        </h2>

        <form
          // onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-6"
        >
          <img
            src="/qr-code.png"
            alt="QR Code"
            className="mx-auto w-64 h-64 object-contain"
          />

          <Input
            type="text"
            placeholder="Enter UTR Number"
            value={utr}
            onChange={(e) => {
              setUtr(e.target.value);
              setError(false);
            }}
            className={`bg-background ${
              showErrorBorder
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setScreenshot(e.target.files?.[0] || null);
              setError(false);
            }}
            className={`bg-background ${
              showErrorBorder
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />

          {error && (
            <p className="text-red-500 text-sm text-center">
              Please enter UTR number or upload screenshot.
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Payment Proof"}
          </Button>
        </form>
      </div>
    </div>
  );
}