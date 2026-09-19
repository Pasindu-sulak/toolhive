const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, maxlength: 320 },
    message: { type: String, required: true, trim: true, maxlength: 5000 }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
