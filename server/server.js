import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Review from './models/Review.js';
import Subscriber from './models/Subscriber.js';
import { seedProducts, seedReviews } from './data/seedData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vintage_bulb_db';

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Fallback Data Store (ensures 100% resilience if local MongoDB is offline)
let isMongoConnected = false;
let inMemoryProducts = [...seedProducts.map((p, idx) => ({ ...p, _id: `mem_prod_${idx + 1}` }))];
let inMemoryReviews = [...seedReviews.map((r, idx) => ({ ...r, _id: `mem_rev_${idx + 1}`, createdAt: new Date() }))];
let inMemoryOrders = [];
let inMemorySubscribers = [];

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('⏳ Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 2500
    });
    isMongoConnected = true;
    console.log('✨ MongoDB Connected Successfully!');
    
    // Seed initial products if collection is empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('🌱 Seeding initial vintage bulb catalog into MongoDB...');
      await Product.insertMany(seedProducts);
      console.log('✅ Products seeded successfully!');
    }
  } catch (err) {
    console.warn('⚠️ MongoDB connection not available or timed out.');
    console.warn('💡 Running with In-Memory High-Fidelity Data Store seamlessly!');
    isMongoConnected = false;
  }
};

connectDB();

// Health & System Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'VOLTA & CO. Vintage Bulb REST API',
    database: isMongoConnected ? 'MongoDB Connected' : 'In-Memory Mock Database Active',
    timestamp: new Date()
  });
});

// GET all products with filtering, search, sorting
app.get('/api/products', async (req, res) => {
  try {
    const { category, shape, dimmable, sort, search } = req.query;

    if (isMongoConnected) {
      const filter = {};
      if (category && category !== 'All') filter.category = category;
      if (shape && shape !== 'All') filter.shape = shape;
      if (dimmable === 'true') filter.dimmable = true;
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { subtitle: { $regex: search, $options: 'i' } }
        ];
      }

      let query = Product.find(filter);
      if (sort === 'price-low') query = query.sort({ price: 1 });
      else if (sort === 'price-high') query = query.sort({ price: -1 });
      else if (sort === 'rating') query = query.sort({ rating: -1 });
      else query = query.sort({ isFeatured: -1, createdAt: -1 });

      const products = await query.exec();
      return res.json(products);
    } else {
      // In-memory filtering
      let result = [...inMemoryProducts];
      if (category && category !== 'All') result = result.filter(p => p.category === category);
      if (shape && shape !== 'All') result = result.filter(p => p.shape === shape);
      if (dimmable === 'true') result = result.filter(p => p.dimmable === true);
      if (search) {
        const s = search.toLowerCase();
        result = result.filter(p => 
          p.name.toLowerCase().includes(s) || 
          p.description.toLowerCase().includes(s) || 
          (p.subtitle && p.subtitle.toLowerCase().includes(s))
        );
      }

      if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
      else if (sort === 'price-high') result.sort((a, b) => b.price - a.price);
      else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

      return res.json(result);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch vintage bulbs' });
  }
});

// GET single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: 'Bulb not found' });
      return res.json(product);
    } else {
      const product = inMemoryProducts.find(p => p._id === id || p.id === id);
      if (!product) return res.status(404).json({ error: 'Bulb not found' });
      return res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bulb details' });
  }
});

// POST Create new Custom Bulb or Add Bulb
app.post('/api/products', async (req, res) => {
  try {
    const productData = req.body;
    if (isMongoConnected) {
      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
      return res.status(201).json(savedProduct);
    } else {
      const newProduct = {
        ...productData,
        _id: `mem_prod_${Date.now()}`,
        createdAt: new Date(),
        rating: 5.0,
        reviewsCount: 1
      };
      inMemoryProducts.unshift(newProduct);
      return res.status(201).json(newProduct);
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to create bulb', details: error.message });
  }
});

// POST Checkout Order
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const orderNumber = `VLT-${Math.floor(100000 + Math.random() * 900000)}`;

    if (isMongoConnected) {
      const newOrder = new Order({
        ...orderData,
        orderNumber
      });
      const savedOrder = await newOrder.save();
      return res.status(201).json({ success: true, order: savedOrder });
    } else {
      const newOrder = {
        ...orderData,
        _id: `mem_order_${Date.now()}`,
        orderNumber,
        status: 'Processing',
        createdAt: new Date()
      };
      inMemoryOrders.unshift(newOrder);
      return res.status(201).json({ success: true, order: newOrder });
    }
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(400).json({ error: 'Failed to process order', details: error.message });
  }
});

// GET all orders
app.get('/api/orders', async (req, res) => {
  try {
    if (isMongoConnected) {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json(orders);
    } else {
      return res.json(inMemoryOrders);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET & POST Reviews
app.get('/api/reviews', async (req, res) => {
  try {
    if (isMongoConnected) {
      const reviews = await Review.find().sort({ createdAt: -1 });
      return res.json(reviews);
    } else {
      return res.json(inMemoryReviews);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const reviewData = req.body;
    if (isMongoConnected) {
      const review = new Review(reviewData);
      const saved = await review.save();
      return res.status(201).json(saved);
    } else {
      const review = {
        ...reviewData,
        _id: `mem_rev_${Date.now()}`,
        createdAt: new Date(),
        likes: 0
      };
      inMemoryReviews.unshift(review);
      return res.status(201).json(review);
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to post review' });
  }
});

// POST Newsletter Subscription
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    if (isMongoConnected) {
      const existing = await Subscriber.findOne({ email });
      if (existing) {
        return res.json({ message: 'You are already subscribed to the Edison Gazette!' });
      }
      const subscriber = new Subscriber({ email });
      await subscriber.save();
      return res.status(201).json({ message: 'Thank you for joining our Vintage Gazette!' });
    } else {
      const exists = inMemorySubscribers.find(s => s.email === email);
      if (exists) {
        return res.json({ message: 'You are already subscribed to the Edison Gazette!' });
      }
      inMemorySubscribers.push({ email, subscribedAt: new Date() });
      return res.status(201).json({ message: 'Thank you for joining our Vintage Gazette!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// Seed Endpoint (manual trigger)
app.post('/api/seed', async (req, res) => {
  try {
    if (isMongoConnected) {
      await Product.deleteMany({});
      await Product.insertMany(seedProducts);
      return res.json({ message: 'MongoDB reseeded successfully!' });
    } else {
      inMemoryProducts = [...seedProducts.map((p, idx) => ({ ...p, _id: `mem_prod_${idx + 1}` }))];
      return res.json({ message: 'In-memory database reseeded successfully!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Seed failed' });
  }
});

// Serve static client assets in production / single-service deployment
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Wildcard fallback for React Router / SPA
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.json({
        message: 'VOLTA Vintage Bulb API is running. Frontend static build not found or running separately on development port.',
        api_health: '/api/health'
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 VOLTA Vintage Bulb Server running on http://localhost:${PORT}`);
});
