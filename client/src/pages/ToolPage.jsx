import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import AdSlot from '../components/AdSlot.jsx';
import { getTool, logEvent } from '../lib/api.js';
import { widgetRegistry } from '../tools/index.js';
import NotFound from './NotFound.jsx';

export default function ToolPage() {
  const { slug } = useParams();
  const [tool, setTool] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    getTool(slug)
      .then((res) => {
        if (cancelled) return;
        setTool(res.tool);
        setRelated(res.related || []);
      })
      .catch(() => !cancelled && setNotFound(true))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) return <div className="container" style={{ padding: '4rem 0' }} />;
  if (notFound || !tool) return <NotFound />;

  const Widget = widgetRegistry[tool.widget];

  const jsonLd = {
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
  };

  return (
    <>
      <Seo title={tool.metaTitle} description={tool.metaDescription} path={`/tools/${tool.slug}`} jsonLd={jsonLd} />

      <div className="container tool-page-head">
        <p className="crumbs">
          <Link to="/">Toolhive</Link> / <Link to={`/${tool.categorySlug}`}>{tool.category}</Link> / {tool.shortName}
        </p>
        <h1>{tool.name}</h1>
        <p>{tool.intro}</p>
      </div>

      <div className="container">
        <div className="widget-panel">
          {Widget ? <Widget onUse={() => logEvent('tool_used', `/tools/${tool.slug}`, tool.slug)} /> : <p>Widget coming soon.</p>}
        </div>

        <AdSlot label="Below the tool" />

        <div className="tool-article">
          <div>
            <h2>How to use the {tool.shortName.toLowerCase()}</h2>
            <ol>
              {tool.howTo.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <AdSlot label="In-article" />

            <h2>Frequently asked questions</h2>
            <div>
              {tool.faq.map((f, i) => (
                <div className="faq-item" key={i}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="sidebar">
            <h3>Related tools</h3>
            <div className="related-list">
              {related.map((r) => (
                <Link key={r.slug} to={`/tools/${r.slug}`}>{r.shortName}</Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
