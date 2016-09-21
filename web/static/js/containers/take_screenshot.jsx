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
    input.value = '';
  };

  const setInput = (node) => {
    input = node;
  };

  const loadingElement = (
    <p>Loading</p>
  );

  const screenShotform = (
    <div>
      <form
        onSubmit={onSubmit}
      >
        <input
          ref={setInput}
        />
        <button type="submit">
          Generate
        </button>
      </form>
    </div>
  );

  if (mockup.isLoading) {
    return loadingElement;
  }

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
