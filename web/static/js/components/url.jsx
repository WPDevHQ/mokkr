import React from 'react';
import { connect } from 'react-redux';

class url extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.url) {
      const pageUrl = `?url=${nextProps.url}`;
      window.history.pushState('', '', pageUrl);
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({ url: state.mockup.url });

url.propTypes = {
  url: React.PropTypes.string,
};

const Url = connect(mapStateToProps)(url);

export default Url;
