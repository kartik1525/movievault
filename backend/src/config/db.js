const mongoose = require('mongoose');
const dns = require('dns');

// Use Google DNS for reliable SRV record lookups (fixes connectivity on some networks)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/cinevault',
      { family: 4 }
    );
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Connection failed: ${error.message}. Running server in graceful fallback mode.`);
  }
};

module.exports = connectDB;
