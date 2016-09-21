import React from 'react';
import { connect } from 'react-redux';
import PreviewUrl from './preview_url';
import ScreenshotPreview from './screenshot_preview';

const preview = ({ screenshots }) => {
  return (
    <section>
      <PreviewUrl />
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
