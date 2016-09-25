import React from 'react';
import { connect } from 'react-redux';
import ScreenshotPreview from './screenshot_preview';

const preview = ({ screenshots }) => {
  return (
    <section>
      { Object.keys(screenshots).map(s => <ScreenshotPreview key={s} {...screenshots[s]} />) }
    </section>
  );
};

preview.propTypes = {
  screenshots: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({ screenshots: state.mockup.screenshots });

const Preview = connect(mapStateToProps)(preview);

export default Preview;
