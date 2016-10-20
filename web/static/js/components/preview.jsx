import React from 'react';
import { connect } from 'react-redux';
import ScreenshotPreview from './screenshot_preview';
import DownloadMockup from './download_mockup';

class preview extends React.Component {
  get downloadable() {
    let { screenshots } = this.props;

    return Object.keys(screenshots).every(s => (
      screenshots[s].src.length !== 0
    ))
  };

  render() {
    let { screenshots, url } = this.props;

    return (
      <section className="l-content u-text-center">
        <div className="m-preview-canvas">
          <svg className="m-scene" width="1135" height="875" viewBox="0 0 1135 875">
            { Object.keys(screenshots).map(s => <ScreenshotPreview key={s} {...screenshots[s]} />) }
          </svg>
        </div>
        <DownloadMockup previewClass="m-scene" url={url} downloadable={this.downloadable} />
      </section>
    );
  }
};

preview.propTypes = {
  screenshots: React.PropTypes.instanceOf(Object),
  url: React.PropTypes.string,
};

const mapStateToProps = state => ({
  screenshots: state.mockup.screenshots,
  url: state.mockup.url,
});

const Preview = connect(mapStateToProps)(preview);

export default Preview;
