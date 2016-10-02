import React from 'react';
import { connect } from 'react-redux';
import { fetchScreenshot } from '../actions';

const takeScreenshot = ({ dispatch, mockup }) => {
  let input;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    dispatch(fetchScreenshot(input.value));
  };

  const setInput = (node) => {
    input = node;
  };

  const formStyles = {
    display: 'none',
  };

  const screenShotform = (
    <div className="m-postbox">
      <form
        id="screenshot_form"
        style={formStyles}
        onSubmit={onSubmit}
      />
      <fieldset className="m-postbox__fieldset" disabled={mockup.isLoading}>
        <div role="group">
          <input
            className="m-postbox__input"
            placeholder="https://google.com"
            form="screenshot_form"
            ref={setInput}
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

  return screenShotform;
};

takeScreenshot.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  mockup: React.PropTypes.shape({
    isLoading: React.PropTypes.bool.require,
  }),
};

const mapStateToProps = state => ({ mockup: state.mockup });

const TakeScreenshot = connect(mapStateToProps)(takeScreenshot);

export default TakeScreenshot;
