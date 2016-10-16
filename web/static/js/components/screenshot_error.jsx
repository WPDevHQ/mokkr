import React from 'react';

const ScreenshotError = ({ error }) => {
  if (error) {
    return <p>{error}</p>;
  }

  return null;
};

ScreenshotError.propTypes = {
  error: React.PropTypes.string,
};

export default ScreenshotError;
