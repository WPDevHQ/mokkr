import { SET_SCREENSHOTS, LOADING_CHANGED } from '../actions';

const initialState = {
  isLoading: false,
  url: '',
  screenshots: [],
};

function mockup(state = initialState, action) {
  switch (action.type) {
    case SET_SCREENSHOTS:
      return Object.assign({},
        state,
        {
          url: action.url,
          screenshots: action.screenshots.map(s => ({ name: s.name, src: s.src })),
        }
      );
    case LOADING_CHANGED:
      return Object.assign({},
          state,
          { isLoading: action.isLoading }
      );
    default:
      return state;
  }
}

export default mockup;
