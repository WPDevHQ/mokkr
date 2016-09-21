import React from 'react';
import { connect } from 'react-redux';

const PreviewUrl = props => <h1>{props.url}</h1>;

PreviewUrl.propTypes = {
  url: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ url: state.mockup.url });

export default connect(mapStateToProps)(PreviewUrl);
