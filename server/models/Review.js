import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  location: { type: String, default: 'Verified Buyer' },
  verifiedPurchase: { type: Boolean, default: true },
  likes: { type: Number, default: 0 },
  ambianceSetting: { type: String } // e.g. "Dining Room Chandelier", "Cafe Bar", "Reading Nook"
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
