const express = require('express');
const router = express.Router();
const { dbIsConnected } = require('../db');
const Contact = require('../models/Contact');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are all required.' });
    }
    if (!EMAIL_RE.test(String(email))) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (String(message).length < 5) {
      return res.status(400).json({ error: 'Message is too short.' });
    }

    if (dbIsConnected()) {
      await Contact.create({
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 320),
        message: String(message).slice(0, 5000)
      });
    } else {
      console.log('[contact] (no DB configured, logging only):', { name, email, message });
    }

    res.status(201).json({ ok: true, message: 'Thanks — your message has been received.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
