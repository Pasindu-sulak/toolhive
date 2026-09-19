const fs = require('fs');
const path = require('path');
const toolService = require('../services/toolService');

const INDEX_PATH = path.join(__dirname, '..', '..', 'client', 'dist', 'index.html');

let cachedTemplate = null;
function loadTemplate() {
  if (cachedTemplate) return cachedTemplate;
  if (!fs.existsSync(INDEX_PATH)) return null;
  cachedTemplate = fs.readFileSync(INDEX_PATH, 'utf-8');
  return cachedTemplate;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderMeta(html, { title, description, canonical, jsonLd }) {
  let out = html;
  out = out.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = out.replace(
    /<meta name="description" content=".*?"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  out = out.replace(
    /<link rel="canonical" href=".*?"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`
  );
  out = out.replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  out = out.replace(
    /<meta property="og:description" content=".*?"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  out = out.replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${escapeHtml(canonical)}" />`);

  if (jsonLd) {
    out = out.replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head>`
    );
  }
  return out;
}

function getSiteUrl(req) {
  return (process.env.CLIENT_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
}

// Express middleware: for known SEO-relevant paths, serve a customized index.html.
// For anything else (assets, API), calls next() to fall through to normal static/API handling.
async function metaInject(req, res, next) {
  if (req.method !== 'GET') return next();

  const template = loadTemplate();
  if (!template) return next(); // client not built yet (dev mode) — skip

  const siteUrl = getSiteUrl(req);
  const p = req.path;

  try {
    // Tool page
    const toolMatch = p.match(/^\/tools\/([a-z0-9-]+)\/?$/);
    if (toolMatch) {
      const tool = await toolService.getToolBySlug(toolMatch[1]);
      if (tool) {
        const html = renderMeta(template, {
          title: tool.metaTitle,
          description: tool.metaDescription,
          canonical: `${siteUrl}/tools/${tool.slug}`,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: tool.name,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any (Web Browser)',
            description: tool.metaDescription,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: (tool.faq || []).map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a }
              }))
            }
          }
        });
        return res.send(html);
      }
    }

    // Category page
    const catMatch = p.match(/^\/([a-z0-9-]+)\/?$/);
    if (catMatch) {
      const categories = toolService.getCategories();
      const cat = categories.find((c) => c.slug === catMatch[1]);
      if (cat) {
        const html = renderMeta(template, {
          title: `${cat.name} — Free Online Tools | Toolhive`,
          description: cat.description,
          canonical: `${siteUrl}/${cat.slug}`
        });
        return res.send(html);
      }
    }

    // Static well-known pages
    const staticMeta = {
      '/': {
        title: 'Toolhive — Free Online Tools You Can Use Instantly',
        description:
          'Free, fast, no-signup online tools: word counter, JSON formatter, password generator, QR code generator, calculators, and more.'
      },
      '/about': {
        title: 'About Toolhive — Free Online Tools',
        description: 'Learn what Toolhive is, why it exists, and how its free browser-based tools work.'
      },
      '/contact': {
        title: 'Contact Toolhive',
        description: 'Get in touch with the Toolhive team with feedback, tool suggestions, or questions.'
      },
      '/privacy': {
        title: 'Privacy Policy — Toolhive',
        description: 'Toolhive privacy policy covering data collection, cookies, and Google AdSense.'
      },
      '/terms': {
        title: 'Terms of Service — Toolhive',
        description: 'Terms of service for using Toolhive tools and website.'
      }
    };

    if (staticMeta[p]) {
      const meta = staticMeta[p];
      const html = renderMeta(template, {
        title: meta.title,
        description: meta.description,
        canonical: `${siteUrl}${p === '/' ? '' : p}`
      });
      return res.send(html);
    }
  } catch (err) {
    // On any error, fall through to default static handling rather than failing the request.
    return next();
  }

  return next();
}

module.exports = { metaInject, loadTemplate };
