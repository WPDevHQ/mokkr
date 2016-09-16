import React from 'react';
import HelloMockup from './hello_mockup';
import TakeScreenshot from '../containers/take_screenshot';

const PageHeader = () => (
  <section>
    <TakeScreenshot />
    <HelloMockup />
  </section>
);

export default PageHeader;
