require('dotenv').config();
const mongoose = require('mongoose');
const Tool = require('../models/Tool');
const tools = require('./tools.json');

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set. Copy server/.env.example to server/.env and set it first.');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB for seeding.');

  for (const tool of tools) {
    await Tool.findOneAndUpdate({ slug: tool.slug }, tool, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });
    console.log(`Upserted: ${tool.slug}`);
  }

  console.log(`Seed complete. ${tools.length} tools upserted.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
