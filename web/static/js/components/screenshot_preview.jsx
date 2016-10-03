import React from 'react';

const ScreenshotPreview = (props) => {
  const {
    background,
    src,
    width,
    height,
    top,
    left,
    offsetTop,
    offsetLeft,
    screenshotWidth,
    screenshotHeight,
  } = props;
  let screenshot;

  const containerStyles = {
    width,
    height,
    left,
    top,
  };

  if (src.length !== 0) {
    const screenshotStyles = {
      left: offsetLeft,
      top: offsetTop,
      width: screenshotWidth,
      height: screenshotHeight,
    };

    screenshot = <image width={screenshotStyles.width} height={screenshotStyles.height} x={screenshotStyles.left} y={screenshotStyles.top} xlinkHref={`data:image/png;base64,${src}`} />;
  }

  return (
    <svg x={containerStyles.left} y={containerStyles.top}>
      <image width={containerStyles.width} height={containerStyles.height} xlinkHref={background} />
      {screenshot}
    </svg>
  );
};

ScreenshotPreview.propTypes = {
  src: React.PropTypes.string.isRequired,
  background: React.PropTypes.string.isRequired,
  width: React.PropTypes.string.isRequired,
  height: React.PropTypes.string.isRequired,
  top: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  left: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  offsetTop: React.PropTypes.string.isRequired,
  offsetLeft: React.PropTypes.string.isRequired,
  screenshotWidth: React.PropTypes.string.isRequired,
  screenshotHeight: React.PropTypes.string.isRequired,
};


export default ScreenshotPreview;
