import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
import nodemailer from 'nodemailer';
import multer from "multer";
import path from "path";
import fs from "fs";
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"));
    }
  },
});
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

  try {
    const { name, email, phone, altPhone, destination, checkin, checkout, guests, age, hiText, totalAmount } = req.body;

    //const service = await Service.findById(serviceId);
    //if (!service) return res.status(404).json({ error: 'Service not found' });
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
      destination,
      name,
      age,
      email,
      phone,
      altPhone,
      hiText,
      totalAmount,
    });

    await booking.save();

    res.json({ booking });
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

    const bookings = await Booking.find({}).populate('serviceId')
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
router.patch('/admin/booking/:id', async (req, res) => {
  try {
    const key = req.query.key;
    if (key !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Unauthorized' });

    await Booking.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/booking/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('serviceId');

    res.json({ booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.patch(
  '/booking/:id',
  upload.single("screenshot"), // must match frontend key
  async (req, res) => {
    try {
      const { utr } = req.body;

      const updateData = {};

      if (utr) updateData.utrNumber = utr;

      if (req.file) {
        updateData.paymentScreenshot = req.file.path;
      }

      // Optional: mark as paid only if proof exists
      if (utr || req.file) {
        updateData.status = "paid";
      }

      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
      ).populate("serviceId");

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.json({ success: true, booking });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
