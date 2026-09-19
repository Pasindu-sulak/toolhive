import React from 'react';
import Seo from '../components/Seo.jsx';

export default function About() {
  return (
    <>
      <Seo
        title="About Toolhive — Free Online Tools"
        description="Learn what Toolhive is, why it exists, and how its free browser-based tools work."
        path="/about"
      />
      <div className="container content-page">
        <h1>About Toolhive</h1>
        <section>
          <p>
            Toolhive is a small hive of single-purpose web tools — a word counter, a JSON formatter, a
            password generator, a QR code maker, and a handful of everyday calculators. Each one does one
            job, does it in your browser, and gets out of your way.
          </p>
        </section>

        <section>
          <h2>Why it exists</h2>
          <p>
            Most of the time you don't need an account, a download, or a subscription to count words or
            convert a color code. You need the answer in the next ten seconds. Toolhive is built around
            that idea: open a tool, use it, leave.
          </p>
        </section>

        <section>
          <h2>How the tools work</h2>
          <p>
            Every tool on this site runs entirely client-side in JavaScript. When you type into the word
            counter or generate a password, that happens on your device — nothing is uploaded to a server
            to be processed. The site itself is built with MongoDB, Express, React, and Node.js (the MERN
            stack), which powers the tool catalog, search, and the pages you're reading now.
          </p>
        </section>

        <section>
          <h2>Supporting the site</h2>
          <p>
            Toolhive is free to use and supported by advertising through Google AdSense once the site is
            approved. Ads never cover a tool's controls, and we don't ask you to click them. See the{' '}
            <a href="/privacy">Privacy Policy</a> for details on cookies and advertising.
          </p>
        </section>
      </div>
    </>
  );
}
