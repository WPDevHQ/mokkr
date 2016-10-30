import React from 'react';
import moment from 'moment';

const ScreenshotInfo = ({ lastUpdated }) => {
  if (lastUpdated) {
    return <p>
      Screenshots taken {moment(lastUpdated).fromNow()}.
      To generate fresh screenshots <a href="#">click here</a>.
      </p>;
  }

  return null;
};

ScreenshotInfo.propTypes = {
  lastUpdated: React.PropTypes.string,
};

export default ScreenshotInfo;
