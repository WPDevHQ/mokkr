import { SET_SCREENSHOT, LOADING_CHANGED, SET_URL, SCREENSHOT_ERROR, SET_LAST_UPDATED } from '../actions/screenshot';
import { SOCKET_CONNECTED } from '../actions/socket';
import devices from '../devices';

const initialState = {
  sessionId: null,
  isLoading: false,
  lastUpdated: null,
  url: null,
  error: null,
  activeDevices: ['iMac', 'iPad', 'iPhone'],
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
    case SET_LAST_UPDATED:
      return Object.assign({},
        state,
        {
          lastUpdated: action.lastUpdated,
        }
      );
    default:
      return state;
  }
}

export default mockup;
