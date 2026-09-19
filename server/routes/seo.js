const express = require('express');
const router = express.Router();
const toolService = require('../services/toolService');

function getSiteUrl(req) {
  return (process.env.CLIENT_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
}

router.get('/robots.txt', (req, res) => {
  const siteUrl = getSiteUrl(req);
  res.type('text/plain').send(
    [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${siteUrl}/sitemap.xml`
    ].join('\n')
  );
});

router.get('/sitemap.xml', async (req, res, next) => {
  try {
    const siteUrl = getSiteUrl(req);
    const tools = await toolService.getAllTools();
    const categories = toolService.getCategories();

    const staticPaths = ['/', '/about', '/contact', '/privacy', '/terms'];
    const categoryPaths = categories.map((c) => `/${c.slug}`);
    const toolPaths = tools.map((t) => `/tools/${t.slug}`);

    const urls = [...staticPaths, ...categoryPaths, ...toolPaths];

    const body = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map(
        (path) => `  <url><loc>${siteUrl}${path}</loc></url>`
      ),
      '</urlset>'
    ].join('\n');

    res.type('application/xml').send(body);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
