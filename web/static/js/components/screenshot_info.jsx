import React from 'react';
import moment from 'moment';
import { fetchScreenshot } from '../actions/screenshot';

const ScreenshotInfo = ({ lastUpdated, url, dispatch }) => {
  const onClick = (e) => {
    e.preventDefault();
    dispatch(fetchScreenshot(url, { force: true }));
  };


  if (lastUpdated) {
    return <p>
      Screenshots taken {moment(lastUpdated).fromNow()}.
      To generate fresh screenshots <a href="#" onClick={onClick}>click here</a>.
      </p>;
  }

  return null;
};

ScreenshotInfo.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  lastUpdated: React.PropTypes.string,
  url: React.PropTypes.string,
};

export default ScreenshotInfo;
