import React from 'react';
import { connect } from 'react-redux';
import ScreenshotPreview from './screenshot_preview';

const preview = ({ screenshots }) => {
  return (
    <section>
      {screenshots.map(s => <ScreenshotPreview key={s.name} {...s} />) }
    </section>
  );
};

preview.propTypes = {
  screenshots: React.PropTypes.array.isRequired
};

const mapStateToProps = state => ({ screenshots: state.mockup.screenshots });

const Preview = connect(mapStateToProps)(preview);

export default Preview;
