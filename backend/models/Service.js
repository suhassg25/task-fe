import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  images: [String],
  pricePerNight: { type: Number, required: true },
  maxGuestsPerDay: { type: Number, required: true }
});

export default mongoose.model('Service', serviceSchema);
