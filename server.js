const express = require('express');
const mongoose = require('mongoose');
const { User, Order } = require('./models');

require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Please start MongoDB or use Docker: docker run -d -p 27017:27017 mongo');
  });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('BePay Backend Task');
});

// Main endpoint with $lookup aggregation
app.get('/api/orders', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        success: false, 
        error: 'MongoDB not connected. Please start MongoDB first.',
      });
    }

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $project: {
          orderNumber: 1,
          total: 1,
          status: 1,
          userName: '$userDetails.name',
          userEmail: '$userDetails.email'
        }
      }
    ]);

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
