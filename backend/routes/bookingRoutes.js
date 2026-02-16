import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
import nodemailer from 'nodemailer';

const router = express.Router();
/*
// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
*/

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your gmail
    pass: process.env.EMAIL_PASS, // Your app password or gmail password
  }
});

// Get all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get service by ID
router.get('/service/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get disabled dates for service based on maxGuestsPerDay
router.get('/disabled-dates/:serviceId', async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    // Aggregate total guests per date for this service
    const bookings = await Booking.find({ serviceId: service._id, status: 'paid' });

    // Count guests per date
    const guestsPerDate = {};
    bookings.forEach(booking => {
      booking.selectedDates.forEach(date => {
        const d = new Date(date).toISOString().slice(0, 10);
        guestsPerDate[d] = (guestsPerDate[d] || 0) + booking.guestsCount;
      });
    });

    // Collect dates where guests >= maxGuestsPerDay
    const disabledDates = Object.keys(guestsPerDate)
      .filter(date => guestsPerDate[date] >= service.maxGuestsPerDay);

    res.json(disabledDates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  const destinationsValues = {
  "Adventure Sports": 4500,
  "Trekking": 6000,
  "Scuba Diving": 3800,
  "Environmental Study": 5200,
  "Cycling": 3800,
  "Cultural Activities": 6000,
  "Nature tours": 9000,
  "Water Sports": 1000,
  "Cinema": 2000,
};
  try {
    const { name, email, phone, destination, checkin, checkout, guests, noOfDays } = req.body;

    //const service = await Service.findById(serviceId);
    //if (!service) return res.status(404).json({ error: 'Service not found' });
let totalAmount = destinationsValues[destination] * guests * noOfDays;
    // Create Razorpay order
   /* const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };
*/
    //const order = await razorpay.orders.create(options);

    // Create a booking with status pending
    const booking = new Booking({
      //serviceId,
      guests,
      checkin,
      checkout,
      name,
      email,
      phone,
      totalAmount,
    });

    await booking.save();

    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, bookingId: booking._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify payment signature and confirm booking
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    // Verify signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Update booking status
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.status = 'paid';
    booking.paymentId = razorpay_payment_id;
    await booking.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: `Booking Confirmation - ${booking._id}`,
      text: `Hi ${booking.name},

Your booking for service has been confirmed.

Booking ID: ${booking._id}
Service: ${booking.serviceId}
Dates: ${booking.selectedDates.map(d => new Date(d).toLocaleDateString()).join(", ")}
Guests: ${booking.guestsCount}
Total Paid: ₹${booking.totalAmount}

Thank you for booking with us!

Regards,
TASK Booking Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error);
      } else {
        console.log('Confirmation email sent:', info.response);
      }
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin routes
router.get('/admin/bookings', async (req, res) => {
  try {
    const key = req.query.key;
    if (key !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Unauthorized' });

    const bookings = await Booking.find({}).populate('serviceId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/admin/booking/:id', async (req, res) => {
  try {
    const key = req.query.key;
    if (key !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Unauthorized' });

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
