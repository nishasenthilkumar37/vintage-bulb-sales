import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtitle: { type: String },
  category: { 
    type: String, 
    required: true,
    enum: ['Edison Classics', 'Oversized Globes', 'Spiral & Smoked', 'Vintage LEDs', 'Steampunk Fixtures', 'Accessories']
  },
  shape: { type: String, required: true }, // ST64, G95, G125, T45, A19, Radio Tube, Diamond, Candle
  filamentType: { type: String, required: true }, // Squirrel Cage, Spiral Helix, Quad Loop, Hairpin, Heart, Starburst
  glassFinish: { type: String, required: true }, // Amber Gold, Smoked Titanium, Crystal Clear, Vintage Rose, Antique Mercury
  base: { type: String, default: 'E26/E27 Standard' }, // E26/E27, E14, E12, B22
  wattage: { type: Number, required: true }, // in Watts
  equivalentWattage: { type: Number }, // incandescent equivalent
  kelvin: { type: Number, required: true }, // e.g., 2000, 2200, 2400, 2700
  lumens: { type: Number, required: true },
  dimmable: { type: Boolean, default: true },
  lifespanHours: { type: Number, default: 25000 },
  cri: { type: Number, default: 95 }, // Color Rendering Index
  voltage: { type: String, default: '110V - 240V Universal' },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 4.9 },
  reviewsCount: { type: Number, default: 42 },
  image: { type: String, required: true },
  secondaryImages: [{ type: String }],
  description: { type: String, required: true },
  features: [{ type: String }],
  stock: { type: Number, default: 35 },
  isFeatured: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  badge: { type: String },
  dimensions: {
    height: { type: String },
    diameter: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
