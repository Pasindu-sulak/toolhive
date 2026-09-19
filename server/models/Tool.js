const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    q: { type: String, required: true },
    a: { type: String, required: true }
  },
  { _id: false }
);

const toolSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    category: { type: String, required: true },
    categorySlug: { type: String, required: true, index: true },
    widget: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    intro: { type: String, required: true },
    howTo: { type: [String], default: [] },
    faq: { type: [faqSchema], default: [] },
    relatedSlugs: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Tool || mongoose.model('Tool', toolSchema);
