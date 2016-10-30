import React from 'react';
import { connect } from 'react-redux';
import Snap from 'snapsvg';
import TakeScreenshot from '../containers/take_screenshot';
import ScreenshotError from './screenshot_error';
import ScreenshotInfo from './screenshot_info';
import Gear from '../gear';

class pageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gears: [],
    };
  }

  componentDidMount() {
    this.renderHeaderSvg();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading) {
      this.state.gears.forEach(g => g.start());
    } else {
      this.state.gears.forEach(g => g.stop());
    }
  }

  renderHeaderSvg() {
    const svg = Snap('#header-svg');

    Snap.load('/images/gears.svg', (f) => {
      // set up gears
      const gear1 = new Gear(f, 'gear1', 1, 20);
      const gear2 = new Gear(f, 'gear2', -1, 48);
      const gear3 = new Gear(f, 'gear3', 1, 30);

      this.setState({ gears: [gear1, gear2, gear3] });

      // add gears to header svg
      const gearsGroup = svg.g(gear1.element, gear2.element, gear3.element);
      svg.add(gearsGroup);
    });
  }

  render() {
    return (
      <header className="m-page-header u-text-center">
        <svg className="m-page-header__gears" id="header-svg" />
        <div className="l-content">
          <h1 className="m-page-header__title">Create responsive mockups</h1>
          <TakeScreenshot />
          <ScreenshotError error={this.props.error} />
          <ScreenshotInfo lastUpdated={this.props.lastUpdated} url={this.props.url} dispatch={this.props.dispatch} />
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.mockup.isLoading,
  error: state.mockup.error,
  lastUpdated: state.mockup.lastUpdated,
  url: state.mockup.url,
});

pageHeader.propTypes = {
  error: React.PropTypes.string,
  lastUpdated: React.PropTypes.string,
  url: React.PropTypes.string,
};

const PageHeader = connect(mapStateToProps)(pageHeader);

export default PageHeader;
