import React from 'react';
import Seo from '../components/Seo.jsx';

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy — Toolhive" description="Toolhive privacy policy covering data collection, cookies, and Google AdSense." path="/privacy" />
      <div className="container content-page">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: {new Date().getFullYear()}</p>

        <section>
          <h2>What this site does with your data</h2>
          <p>
            Toolhive's tools (word counter, JSON formatter, password generator, and the rest) run entirely
            in your browser. The text, numbers, or files you enter into a tool are processed on your
            device and are never sent to our servers.
          </p>
        </section>

        <section>
          <h2>Contact form</h2>
          <p>
            If you use the contact form, we store the name, email address, and message you submit so we
            can respond to you. We don't sell this information or use it for advertising.
          </p>
        </section>

        <section>
          <h2>Anonymous usage data</h2>
          <p>
            We may record anonymous, non-identifying events — such as which page or tool was viewed — to
            understand which tools are useful and worth expanding. These events don't include your name,
            email, or the content you type into a tool.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            We use a small number of cookies for basic site functionality, such as remembering that
            you've dismissed the cookie notice. Once advertising is live, Google AdSense and its partners
            may also set cookies to serve and measure ads.
          </p>
        </section>

        <section>
          <h2>Google AdSense</h2>
          <p>
            This site may display ads served by Google AdSense. Google, as a third-party vendor, uses
            cookies to serve ads based on a visitor's prior visits to this and other websites. Google's
            use of advertising cookies enables it and its partners to serve ads based on your visit to
            this site and/or other sites on the internet.
          </p>
          <p>
            You can opt out of personalized advertising by visiting Google's Ads Settings. You can also
            opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">www.aboutads.info</a>.
          </p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time, for example as advertising is enabled on the
            site. Continued use of Toolhive after a change means you accept the updated policy.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Questions about this policy can be sent through our <a href="/contact">contact page</a>.</p>
        </section>
      </div>
    </>
  );
}
