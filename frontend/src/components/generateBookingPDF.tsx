import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  altPhone?: string;
  destination: string;
  age: number;
  checkin: string;
  checkout: string;
  guests: number;
  status: string;
  utr?: string;
  totalAmount: number;
  paymentScreenshot: string;
  guestDetails: {
    name: string;
    age: number;
    bloodGroup: string;
    diabetic: boolean;
  }[];
}

export const generateBookingPDF = (booking: Booking) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Booking Details", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Field", "Value"]],
    body: [
      ["Id", booking._id],
      ["Name", booking.name],
      ["Email", booking.email],
      ["Mobile", booking.phone],
      ["Alternate Mobile", booking.altPhone || "-"],
      ["Age", booking.age.toString()],
      ["Destination", booking.destination],
      ["Check-In", booking.checkin[0].split("T")[0]],
      ["Check-Out", booking.checkout[0].split("T")[0]],
      ["Guests", booking.guests.toString()],
      ["Total Amount", booking.totalAmount.toString()],
      ["Status", booking.status],
      ["UTR", booking.utr || "-"],
      ["Payment Screenshot", booking.paymentScreenshot ? `https://task-fe-75yw.onrender.com/uploads/${booking.paymentScreenshot}` : "Not Available"],
      ["Guest Details", booking.guestDetails.map(g => `NAME : ${g.name}, Age: ${g.age}, Blood Group: ${g.bloodGroup}, Diabetic: ${g.diabetic ? "Yes" : "No"}`).join("\n")],
    ],
  });

  doc.save(`booking_${booking.name}.pdf`);
};