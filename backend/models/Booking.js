import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: BigInt, required: true },
  altPhone: { type: BigInt },
  guests: { type: Number, required: true },
  checkin: [{ type: Date, required: true }],
  checkout: [{ type: Date, required: true }],
  totalAmount: { type: Number, required: true },
  hiText: { type: String, required: true },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
});

export default mongoose.model('Booking', bookingSchema);
