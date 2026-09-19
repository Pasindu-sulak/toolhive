const mongoose = require('mongoose');

const pageEventSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['page_view', 'tool_used'], required: true },
    path: { type: String, required: true },
    slug: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.models.PageEvent || mongoose.model('PageEvent', pageEventSchema);
