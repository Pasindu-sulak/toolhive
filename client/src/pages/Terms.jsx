import React from 'react';
import Seo from '../components/Seo.jsx';

export default function Terms() {
  return (
    <>
      <Seo title="Terms of Service — Toolhive" description="Terms of service for using Toolhive tools and website." path="/terms" />
      <div className="container content-page">
        <h1>Terms of Service</h1>
        <p className="updated">Last updated: {new Date().getFullYear()}</p>

        <section>
          <h2>Using Toolhive</h2>
          <p>
            Toolhive provides free, browser-based utility tools "as is," without warranty of any kind. You
            may use the tools for personal or commercial purposes at no cost and without creating an
            account.
          </p>
        </section>

        <section>
          <h2>No guarantees of accuracy</h2>
          <p>
            While we aim for every calculator and converter to be correct, results are provided for
            convenience and general informational purposes only. Don't rely on Toolhive's output for
            medical, legal, financial, or safety-critical decisions without independent verification.
          </p>
        </section>

        <section>
          <h2>Acceptable use</h2>
          <p>
            Don't use Toolhive to generate content for unlawful purposes, to attempt to disrupt or
            overload the site, or to scrape the site at a rate that degrades service for other visitors.
          </p>
        </section>

        <section>
          <h2>Advertising</h2>
          <p>
            Toolhive may display advertising, including through Google AdSense, to support the cost of
            running the site. See our <a href="/privacy">Privacy Policy</a> for details on how advertising
            cookies are used.
          </p>
        </section>

        <section>
          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Toolhive and its operators aren't liable for any
            damages arising from your use of, or inability to use, the site or its tools.
          </p>
        </section>

        <section>
          <h2>Changes to these terms</h2>
          <p>We may update these terms from time to time. Continued use of the site means you accept the current terms.</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Questions about these terms can be sent through our <a href="/contact">contact page</a>.</p>
        </section>
      </div>
    </>
  );
}
