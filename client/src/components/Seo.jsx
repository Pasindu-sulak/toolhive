import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description, path = '/', jsonLd }) {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
