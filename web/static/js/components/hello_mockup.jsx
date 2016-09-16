import React from 'react';
import { connect } from 'react-redux';

const HelloMockup = props => <h1>{props.screenshot.url}</h1>;

HelloMockup.propTypes = {
  screenshot: React.PropTypes.shape({
    url: React.PropTypes.string.require,
  }),
};

const mapStateToProps = state => ({ screenshot: state.screenshot });

export default connect(mapStateToProps)(HelloMockup);
