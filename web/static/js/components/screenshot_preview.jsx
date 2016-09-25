import React from 'react';

const ScreenshotPreview = ({ background, src, top, left }) => {
  let screenshot;

  const containerStyles = {
    position: 'relative',
    left: 0,
    top: 0
  };

  const deviceStyles = {
    position: 'relative',
    left: 0,
    top: 0
  };

  if (src.length != 0) {
    let screenshotStyles = {
      position: 'absolute',
      left: left,
      top: top
    }

    screenshot = <img style={screenshotStyles} role="presentation" src={`data:image/png;base64,${src}`} />;
  };

  return (
  <div style={containerStyles}>
    <img style={deviceStyles} role="presentation" src={background} />
    {screenshot}
  </div>
  )
};

ScreenshotPreview.propTypes = {
  src: React.PropTypes.string.isRequired,
  background: React.PropTypes.string.isRequired,
};


export default ScreenshotPreview;
