import { SOCKET_CONNECTED, SET_SCREENSHOT, LOADING_CHANGED, SET_URL, SCREENSHOT_ERROR } from '../actions';

const initialState = {
  sessionId: null,
  isLoading: false,
  url: null,
  error: null,
  screenshots: {
    iMac: {
      background: 'images/imac.png',
      src: '',
      width: '940',
      height: '875',
      top: 0,
      left: 0,
      offsetTop: '34',
      offsetLeft: '39',
      screenshotWidth: '865',
      screenshotHeight: '487',
    },
    iPad: {
      background: 'images/ipad-air.png',
      src: '',
      width: '430',
      height: '508',
      top: '270',
      left: '704',
      offsetTop: '43',
      offsetLeft: '65',
      screenshotWidth: '300',
      screenshotHeight: '400',
    },
    iPhone: {
      background: 'images/iphone6.png',
      src: '',
      width: '155',
      height: '352',
      top: '458',
      left: '622',
      offsetTop: '39',
      offsetLeft: '11',
      screenshotWidth: '135',
      screenshotHeight: '240',
    },
  },
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
