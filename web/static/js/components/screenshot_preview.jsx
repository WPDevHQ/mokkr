import React from 'react';

const ScreenshotPreview = ({ background, src, width, height, top, left, offsetTop, offsetLeft, screenshotWidth, screenshotHeight }) => {
  let screenshot;

  const containerStyles = {
    width: width,
    height: height,
    left: left,
    top: top
  };

  if (src.length != 0) {
    let screenshotStyles = {
      left: offsetLeft,
      top: offsetTop,
      width: screenshotWidth,
      height: screenshotHeight
    }

    screenshot = <image width={screenshotStyles.width} height={screenshotStyles.height} x={screenshotStyles.left} y={screenshotStyles.top} xlinkHref={`data:image/png;base64,${src}`} />;
  };

  return (
  <svg x={containerStyles.left} y={containerStyles.top}>
    <image width={containerStyles.width} height={containerStyles.height} xlinkHref={background} />
    {screenshot}
  </svg>
  )
};

ScreenshotPreview.propTypes = {
  src: React.PropTypes.string.isRequired,
  background: React.PropTypes.string.isRequired,
};


export default ScreenshotPreview;
