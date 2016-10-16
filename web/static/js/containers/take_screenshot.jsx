import React from 'react';
import { connect } from 'react-redux';
import { waitForSocketThenFetch } from '../actions';

class takeScreenshot extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.setInput = this.setInput.bind(this);
    this.takeScreenshot = this.takeScreenshot.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('url')) {
      this.input.value = urlParams.get('url');
      this.takeScreenshot(this.input.value);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.takeScreenshot(this.input.value);
  }

  setInput(node) {
    this.input = node;
  }

  getFormStyles() {
    return { display: 'none' };
  }

  takeScreenshot(value) {
    const { dispatch } = this.props;

    if (!value.trim()) {
      return;
    }

    dispatch(waitForSocketThenFetch(value));
  }

  render() {
    return (
      <div className="m-postbox">
        <form
          id="screenshot_form"
          style={this.formStyles}
          onSubmit={this.onSubmit}
        />
        <fieldset className="m-postbox__fieldset" disabled={this.props.isLoading}>
          <div role="group">
            <input
              className="m-postbox__input"
              placeholder="https://google.com"
              form="screenshot_form"
              ref={this.setInput}
            />
            <button
              className="a-button"
              type="submit"
              form="screenshot_form"
            >
              Generate
            </button>
          </div>
        </fieldset>
      </div>
    );
  }
}

takeScreenshot.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ isLoading: state.mockup.isLoading });

const TakeScreenshot = connect(mapStateToProps)(takeScreenshot);

export default TakeScreenshot;
