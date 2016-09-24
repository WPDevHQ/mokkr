import { SET_SCREENSHOTS, LOADING_CHANGED, SET_URL } from '../actions';

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
    case SET_URL:
      return Object.assign({},
          state,
          { url: action.url }
      );
    default:
      return state;
  }
}

export default mockup;
