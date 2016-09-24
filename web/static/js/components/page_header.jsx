import React from 'react';
import TakeScreenshot from '../containers/take_screenshot';

const PageHeader = () => (
  <header className="m-page-header u-text-center">
    <div className="l-content l-content--wide">
      <h1 className="m-page-header__title">Create responsive mockups</h1>
      <TakeScreenshot />
    </div>
  </header>
);

export default PageHeader;
