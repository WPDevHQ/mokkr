import React from 'react';
import { connect } from 'react-redux';
import ScreenshotPreview from './screenshot_preview';
import DownloadMockup from './download_mockup';

const preview = ({ screenshots }) => {
  return (
    <section className="l-content l-content--wide">
      <div className="m-preview-canvas">
        <svg className="m-scene" width="1135" height="875" viewBox="0 0 1135 875">
          { Object.keys(screenshots).map(s => <ScreenshotPreview key={s} {...screenshots[s]} />) }
        </svg>
      </div>
      <DownloadMockup previewClass="m-scene" />
    </section>
  );
};

preview.propTypes = {
  screenshots: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({ screenshots: state.mockup.screenshots });

const Preview = connect(mapStateToProps)(preview);

export default Preview;
