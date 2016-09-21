import React from 'react';

const ScreenshotPreview = ({ name, src }) => (
  <div>
    <p>{name}</p>
    <img role="presentation" src={`data:image/png;base64,${src}`} />
  </div>
);

ScreenshotPreview.propTypes = {
  name: React.PropTypes.string.isRequired,
  src: React.PropTypes.string.isRequired,
};

export default ScreenshotPreview;
