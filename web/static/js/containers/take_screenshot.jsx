import React from 'react';
import { connect } from 'react-redux';
import { setUrl } from '../actions';

const takeScreenshot = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(setUrl(input.value));
          input.value = '';
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">
          Generate
        </button>
      </form>
    </div>
  );
};

takeScreenshot.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

const TakeScreenshot = connect()(takeScreenshot);

export default TakeScreenshot;
