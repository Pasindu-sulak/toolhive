const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('[db] MONGODB_URI not set — running on static JSON tool data only.');
    return false;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    isConnected = true;
    console.log('[db] Connected to MongoDB.');
    return true;
  } catch (err) {
    console.warn('[db] Could not connect to MongoDB, falling back to static JSON data:', err.message);
    return false;
  }
}

function dbIsConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

module.exports = { connectDB, dbIsConnected };
