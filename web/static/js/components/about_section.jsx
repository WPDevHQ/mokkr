import React from 'react';

const AboutSection = () => (
  <section className="l-section-alt">
    <div className="l-content l-content--wide text-content">
      <h2>How it works</h2>
      <ol>
        <li>Simply enter your website URL in the input field and click “Generate”</li>
        <li>Click “Download image” to download a PNG of your mockup</li>
        <li>Use your mockup for absolutely whatever you want!</li>
      </ol>

      <h2>About mockup generator</h2>
      <p>
        Created by <a href="https://twitter.com/juweez">@juweez</a> and <a href="https://twitter.com/wannabefro">@wannabefro</a>, this free online tool is a huge
        time saver for web developers and designers.
      </p>
      <p>
        If you often need to put together screenshots of websites at various
        device breakpoints to showcase your portfolio or show your clients
        visual examples of responsive web design, you’ll know how time
        consuming this is to do manually. This tool is intended to take
        all that effort away for you!
      </p>
    </div>
  </section>
);

export default AboutSection;
