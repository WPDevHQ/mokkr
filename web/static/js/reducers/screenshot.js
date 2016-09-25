import { SOCKET_CONNECTED, SET_SCREENSHOT, LOADING_CHANGED, SET_URL } from '../actions';

const initialState = {
  channel: null,
  sessionId: window.sessionId,
  isLoading: false,
  url: null,
  screenshots: [],
};

function mockup(state = initialState, action) {
  switch (action.type) {
    case SET_SCREENSHOT:
      return Object.assign({},
        state,
        {
          isLoading: action.isLoading,
          screenshots: action.screenshot.concat(state.screenshots),
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
          {
            url: action.url,
            screenshots: [],
          }
      );
    case SOCKET_CONNECTED:
      return Object.assign({},
          state,
          { channel: action.channel }
      );
    default:
      return state;
  }
}

export default mockup;
