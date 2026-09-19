const express = require('express');
const router = express.Router();
const { dbIsConnected } = require('../db');
const PageEvent = require('../models/PageEvent');

router.post('/', async (req, res) => {
  // Fire-and-forget: never blocks or errors out the client experience.
  try {
    const { type, path, slug } = req.body || {};
    if (dbIsConnected() && (type === 'page_view' || type === 'tool_used') && path) {
      await PageEvent.create({ type, path: String(path).slice(0, 300), slug: slug ? String(slug).slice(0, 100) : undefined });
    }
  } catch (err) {
    // swallow — analytics must never break the app
  }
  res.status(204).end();
});

module.exports = router;
