import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import AdSlot from '../components/AdSlot.jsx';
import ToolIcon from '../lib/icons.jsx';
import { getTools, getCategories } from '../lib/api.js';

const FEATURED_SLUGS = ['word-counter', 'json-formatter', 'password-generator', 'qr-code-generator', 'percentage-calculator', 'color-converter'];

export default function Home() {
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getTools(), getCategories()])
      .then(([toolsRes, catRes]) => {
        if (cancelled) return;
        setTools(toolsRes.tools);
        setCategories(catRes.categories);
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.trim().toLowerCase();
    return tools.filter(
      (t) => t.name.toLowerCase().includes(q) || t.shortName.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  }, [query, tools]);

  const featured = tools.filter((t) => FEATURED_SLUGS.includes(t.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Toolhive',
    url: typeof window !== 'undefined' ? window.location.origin : undefined
  };

  return (
    <>
      <Seo
        title="Toolhive — Free Online Tools You Can Use Instantly"
        description="Free, fast, no-signup online tools: word counter, JSON formatter, password generator, QR code generator, calculators, and more."
        path="/"
        jsonLd={jsonLd}
      />

      <section className="container hero">
        <div>
          <div className="hero-eyebrow">13 free browser tools, zero signup</div>
          <h1>A hive of small tools that just work.</h1>
          <p className="hero-sub">
            Word counts, JSON formatting, passwords, QR codes, calculators — pick a tool, use it right in
            your browser, and get back to what you were doing. Nothing you type is ever uploaded.
          </p>
          <form
            className="hero-search"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="tool-search" className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>
              Search tools
            </label>
            <input
              id="tool-search"
              type="text"
              placeholder="Search tools — try “json” or “password”"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" aria-label="Search">Search</button>
          </form>
        </div>
        <div className="hive-art" aria-hidden="true">
          <div className="hex hex-fill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 6h16M4 12h10M4 18h13" /></svg></div>
          <div className="hex"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="5" y="11" width="14" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 018 0v3" /></svg></div>
          <div className="hex"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3.5" y="3.5" width="6" height="6" rx="0.5" /><rect x="14.5" y="3.5" width="6" height="6" rx="0.5" /><rect x="3.5" y="14.5" width="6" height="6" rx="0.5" /></svg></div>
          <div className="hex hex-row-offset"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 19L19 5M7 9a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" /></svg></div>
          <div className="hex hex-fill hex-row-offset"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2" /></svg></div>
        </div>
      </section>

      {error && <div className="container"><div className="error-box">Couldn't load tools: {error}</div></div>}

      <section className="section container">
        <div className="section-head">
          <h2><span className="hex-bullet" aria-hidden="true"></span>Popular right now</h2>
        </div>
        <div className="featured-hex-grid">
          {(featured.length ? featured : tools.slice(0, 6)).map((t) => (
            <Link key={t.slug} to={`/tools/${t.slug}`} className="featured-hex">
              <ToolIcon slug={t.slug} />
              <span>{t.shortName}</span>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot label="Homepage banner" />

      {filtered ? (
        <section className="section container">
          <div className="section-head">
            <h2>Search results</h2>
            <p>{filtered.length} match{filtered.length === 1 ? '' : 'es'}</p>
          </div>
          {filtered.length === 0 ? (
            <p>No tools match “{query}”. Try a different word, or browse by category below.</p>
          ) : (
            <ToolGrid tools={filtered} />
          )}
        </section>
      ) : (
        !loading &&
        categories.map((cat) => {
          const catTools = tools.filter((t) => t.categorySlug === cat.slug);
          if (!catTools.length) return null;
          return (
            <section className="section container" key={cat.slug} id={cat.slug}>
              <div className="section-head">
                <h2><span className="hex-bullet" aria-hidden="true"></span>{cat.name}</h2>
                <Link to={`/${cat.slug}`}>View all {cat.name.toLowerCase()}</Link>
              </div>
              <p style={{ color: 'var(--text-muted)', marginTop: '-0.8rem' }}>{cat.description}</p>
              <ToolGrid tools={catTools} />
            </section>
          );
        })
      )}
    </>
  );
}

function ToolGrid({ tools }) {
  return (
    <div className="tool-grid">
      {tools.map((t) => (
        <Link key={t.slug} to={`/tools/${t.slug}`} className="tool-card">
          <span className="tool-icon"><ToolIcon slug={t.slug} /></span>
          <h3>{t.shortName}</h3>
          <p className="tool-card-desc">{t.intro.slice(0, 78)}{t.intro.length > 78 ? '…' : ''}</p>
          <span className="tool-card-cat">{t.category}</span>
        </Link>
      ))}
    </div>
  );
}
