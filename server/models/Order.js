import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String },
  customSpecs: {
    filament: String,
    glassFinish: String,
    socketFinish: String
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'United States' }
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Credit Card (Simulated)' },
  status: { 
    type: String, 
    enum: ['Processing', 'Handcrafted & Packed', 'Shipped', 'Delivered'],
    default: 'Processing'
  },
  specialInstructions: { type: String }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
