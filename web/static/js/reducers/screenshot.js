import { SOCKET_CONNECTED, SET_SCREENSHOT, LOADING_CHANGED, SET_URL, SCREENSHOT_ERROR } from '../actions';
import devices from '../devices';

const initialState = {
  sessionId: null,
  isLoading: false,
  url: null,
  error: null,
  screenshots: devices,
};

function mockup(state = initialState, action) {
  switch (action.type) {
    case SET_SCREENSHOT:
      return Object.assign({},
        state,
        {
          screenshots: Object.assign({},
              state.screenshots,
              action.screenshot
          ),
        }
      );
    case LOADING_CHANGED:
      return Object.assign({},
          state,
          { isLoading: action.isLoading }
      );
    case SET_URL:
      return Object.assign({},
        initialState,
        {
          url: action.url,
          sessionId: state.sessionId,
        }
      );
    case SOCKET_CONNECTED:
      return Object.assign({},
        state,
        {
          sessionId: action.sessionId,
        }
      );
    case SCREENSHOT_ERROR:
      return Object.assign({},
        initialState,
        {
          error: action.error,
          sessionId: state.sessionId,
        }
      );
    default:
      return state;
  }
}

export default mockup;
