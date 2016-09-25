import { SOCKET_CONNECTED, SET_SCREENSHOT, LOADING_CHANGED, SET_URL } from '../actions';

const initialState = {
  channel: null,
  sessionId: window.sessionId,
  isLoading: false,
  url: null,
  screenshots: {
    iMac: {
      background: 'images/imac.png',
      src: '',
      top: '34px',
      left: '39px'
    },
    iPad: {
      background: 'images/ipad-air.png',
      src: '',
      top: '43px',
      left: '65px'
    },
    iPhone: {
      background: 'images/iphone6.png',
      src: '',
      top: '39px',
      left: '11px'
    },
  },
};

function mockup(state = initialState, action) {
  switch (action.type) {
    case SET_SCREENSHOT:
      let originalScreenshots = state.screenshots;

      return Object.assign({},
        state,
        {
          isLoading: action.isLoading,
          screenshots: Object.assign({},
              originalScreenshots,
              action.screenshot
          )
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
            url: action.url
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
