import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found — Toolhive" description="The page you're looking for doesn't exist." path="/404" />
      <div className="container not-found">
        <h1>Page not found</h1>
        <p style={{ color: 'var(--text-muted)', margin: '0 auto 1.5rem' }}>
          That page doesn't exist, or the tool may have moved.
        </p>
        <Link to="/" className="btn btn-primary">Back to Toolhive</Link>
      </div>
    </>
  );
}
