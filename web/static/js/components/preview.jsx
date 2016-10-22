import React from 'react';
import { connect } from 'react-redux';
import ScreenshotPreview from './screenshot_preview';
import DownloadMockup from './download_mockup';

class preview extends React.Component {
  get downloadable() {
    const { activeDevices, screenshots } = this.props;

    return activeDevices.every(s => (
      screenshots[s].src.length !== 0
    ));
  }

  render() {
    const { activeDevices, screenshots, url } = this.props;

    return (
      <section className="l-content u-text-center">
        <div className="m-preview-canvas">
          <svg className="m-scene" width="1135" height="875" viewBox="0 0 1135 875">
            { activeDevices.map(s => <ScreenshotPreview key={s} {...screenshots[s]} />) }
          </svg>
        </div>
        <DownloadMockup previewClass="m-scene" url={url} downloadable={this.downloadable} />
      </section>
    );
  }
}

preview.propTypes = {
  screenshots: React.PropTypes.instanceOf(Object),
  activeDevices: React.PropTypes.arrayOf(
    React.PropTypes.string
  ),
  url: React.PropTypes.string,
};

const mapStateToProps = state => ({
  screenshots: state.mockup.screenshots,
  url: state.mockup.url,
  activeDevices: state.mockup.activeDevices,
});

const Preview = connect(mapStateToProps)(preview);

export default Preview;
