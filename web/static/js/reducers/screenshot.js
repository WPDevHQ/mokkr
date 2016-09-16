import { SET_URL } from '../actions';

const initialState = {
  url: '',
};

function screenshot(state = initialState, action) {
  switch (action.type) {
    case SET_URL:
      return Object.assign({},
          state,
          { url: action.payload }
      );
    default:
      return state;
  }
}

export default screenshot;
