const express = require('express');
const router = express.Router();
const toolService = require('../services/toolService');

// GET /api/tools - list all tools (optionally filter by category)
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const tools = category
      ? await toolService.getToolsByCategory(category)
      : await toolService.getAllTools();
    res.json({ tools });
  } catch (err) {
    next(err);
  }
});

// GET /api/tools/categories - list categories
router.get('/categories', (req, res) => {
  res.json({ categories: toolService.getCategories() });
});

// GET /api/tools/:slug - single tool with related tools
router.get('/:slug', async (req, res, next) => {
  try {
    const tool = await toolService.getToolBySlug(req.params.slug);
    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    const related = await toolService.getRelatedTools(tool);
    res.json({ tool, related });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
