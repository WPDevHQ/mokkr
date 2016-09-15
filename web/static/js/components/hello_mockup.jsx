import React from 'react';

const HelloMockup = props => <h1>{props.title}</h1>;

HelloMockup.propTypes = {
  title: React.PropTypes.string,
};

export default HelloMockup;
