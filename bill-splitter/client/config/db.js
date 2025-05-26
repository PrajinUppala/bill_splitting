const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://uppalaprajin:1234PPss%40@cluster0.tqa4d64.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
