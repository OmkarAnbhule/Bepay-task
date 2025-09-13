const mongoose = require('mongoose');
const { User, Order } = require('./models');

require('dotenv').config({ path: './config.env' });

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Order.deleteMany({});

    // Create users
    const users = await User.insertMany([
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' }
    ]);

    // Create orders
    await Order.insertMany([
      { orderNumber: 'ORD001', userId: users[0]._id, total: 100, status: 'pending' },
      { orderNumber: 'ORD002', userId: users[1]._id, total: 200, status: 'completed' },
      { orderNumber: 'ORD003', userId: users[0]._id, total: 150, status: 'shipped' }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('Test the API: GET http://localhost:3000/api/orders');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
