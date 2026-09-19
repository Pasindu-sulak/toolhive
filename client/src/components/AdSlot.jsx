import React, { useEffect, useRef } from 'react';

const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID || '';

// Reads the publisher ID from env. With no ID set (local dev / pre-approval),
// this renders a clearly-labeled placeholder box instead of a live ad —
// so the layout and spacing are exactly what production will look like.
export default function AdSlot({ label = 'In-article ad', slotId }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not loaded yet or blocked — fail silently.
    }
  }, []);

  if (!ADSENSE_CLIENT_ID) {
    return (
      <div className="ad-slot" role="complementary" aria-label={label}>
        <span>Ad placeholder — {label}. Set ADSENSE_CLIENT_ID after approval.</span>
      </div>
    );
  }

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: 'block', margin: '2rem 0' }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slotId || ''}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
