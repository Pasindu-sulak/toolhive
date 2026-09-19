require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const { connectDB } = require('./db');
const { metaInject } = require('./middleware/metaInject');
const toolsRouter = require('./routes/tools');
const contactRouter = require('./routes/contact');
const eventsRouter = require('./routes/events');
const seoRouter = require('./routes/seo');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || `http://localhost:5173`;

app.use(compression());
app.use(cors({ origin: CLIENT_URL, credentials: false }));
app.use(express.json({ limit: '100kb' }));

// SEO: robots.txt + sitemap.xml
app.use('/', seoRouter);

// API routes
app.use('/api/tools', toolsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/events', eventsRouter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');

// In production, inject per-route meta tags into index.html for crawlers, then serve static assets.
app.use(metaInject);
app.use(express.static(CLIENT_DIST));

// SPA fallback for any remaining GET route (after static + metaInject have had first crack)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  const indexPath = path.join(CLIENT_DIST, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res
        .status(200)
        .type('text/plain')
        .send('Toolhive server is running. Build the client with `npm run build` in /client to serve the site.');
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Toolhive server listening on http://localhost:${PORT}`);
  });
}

start();
