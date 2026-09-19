const { dbIsConnected } = require('../db');
const Tool = require('../models/Tool');
const staticTools = require('../data/tools.json');
const categories = require('../data/categories.json');

async function getAllTools() {
  if (dbIsConnected()) {
    const docs = await Tool.find({}).lean();
    if (docs && docs.length > 0) return docs;
  }
  return staticTools;
}

async function getToolBySlug(slug) {
  if (dbIsConnected()) {
    const doc = await Tool.findOne({ slug }).lean();
    if (doc) return doc;
  }
  return staticTools.find((t) => t.slug === slug) || null;
}

async function getToolsByCategory(categorySlug) {
  const all = await getAllTools();
  return all.filter((t) => t.categorySlug === categorySlug);
}

function getCategories() {
  return categories;
}

async function getRelatedTools(tool) {
  const all = await getAllTools();
  return all.filter((t) => tool.relatedSlugs.includes(t.slug));
}

module.exports = {
  getAllTools,
  getToolBySlug,
  getToolsByCategory,
  getCategories,
  getRelatedTools
};
