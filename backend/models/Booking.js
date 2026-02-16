import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  guests: { type: Number, required: true },
  checkin: [{ type: Date, required: true }],
  checkout: [{ type: Date, required: true }],
  totalAmount: { type: Number, required: true },
});

export default mongoose.model('Booking', bookingSchema);
