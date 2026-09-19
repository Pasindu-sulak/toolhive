import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import AdSlot from '../components/AdSlot.jsx';
import ToolIcon from '../lib/icons.jsx';
import { getTools, getCategories } from '../lib/api.js';
import NotFound from './NotFound.jsx';

export default function Category() {
  const { categorySlug } = useParams();
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([getTools(categorySlug), getCategories()])
      .then(([toolsRes, catRes]) => {
        if (cancelled) return;
        setTools(toolsRes.tools);
        setCategories(catRes.categories);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  if (loading) return <div className="container" style={{ padding: '4rem 0' }} />;

  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return <NotFound />;

  return (
    <>
      <Seo
        title={`${category.name} — Free Online Tools | Toolhive`}
        description={category.description}
        path={`/${category.slug}`}
      />
      <section className="section container" style={{ paddingBottom: '1rem' }}>
        <div className="chip-row">
          {categories.map((c) => (
            <Link key={c.slug} to={`/${c.slug}`} className={`chip ${c.slug === categorySlug ? 'active' : ''}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <h1>{category.name}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{category.description}</p>
      </section>

      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="tool-grid">
          {tools.map((t) => (
            <Link key={t.slug} to={`/tools/${t.slug}`} className="tool-card">
              <span className="tool-icon"><ToolIcon slug={t.slug} /></span>
              <h3>{t.shortName}</h3>
              <p className="tool-card-desc">{t.intro.slice(0, 90)}{t.intro.length > 90 ? '…' : ''}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="container">
        <AdSlot label={`${category.name} listing`} />
      </div>
    </>
  );
}
