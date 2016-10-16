import { Socket } from 'phoenix';

export const LOADING_CHANGED = 'LOADING_CHANGED';
export const SET_SCREENSHOT = 'SET_SCREENSHOT';
export const SCREENSHOT_ERROR = 'SCREENSHOT_ERROR';
export const SET_URL = 'SET_URL';
export const SOCKET_CONNECTED = 'SOCKET_CONNECTED';

export const loadingChanged = (isLoading => ({
  type: LOADING_CHANGED,
  isLoading,
}));

export const setScreenshot = (screenshot => ({
  type: SET_SCREENSHOT,
  screenshot,
}));

export const setUrl = (url => ({
  type: SET_URL,
  url,
}));

export const screenshotError = (error => ({
  type: SCREENSHOT_ERROR,
  error,
}));

export const fetchScreenshot = (url => (
  (dispatch, getState) => {
    const sessionId = getState().mockup.sessionId;
    dispatch(setUrl(url));
    dispatch(loadingChanged(true));
    fetch(`api/screenshot?url=${url}&session=${sessionId}`);
  }
));

const finishedLoading = (screenshots => (
  Object.keys(screenshots).every(s => (
    screenshots[s].src.length !== 0
  ))
));

export const setSocket = (() => (
  (dispatch, getState) => {
    const generateId = () => (
      `_${Math.random().toString(36).substr(2, 9)}`
    );

    const sessionId = generateId();

    const socket = new Socket('/socket', { params: { sessionId } });
    socket.connect();

    const channel = socket.channel(`screenshots:${sessionId}`, {});
    channel.join().receive('ok', () => {
      dispatch({
        type: SOCKET_CONNECTED,
        sessionId,
      });
    });

    channel.on('screenshot:complete', (screenshot) => {
      const attrs = getState().mockup.screenshots[screenshot.name];

      const newScreenshotAttrs = Object.assign({},
          attrs,
          { src: screenshot.src }
      );

      const newScreenshot = {
        [screenshot.name]: newScreenshotAttrs,
      };

      dispatch({
        type: SET_SCREENSHOT,
        screenshot: newScreenshot,
      });

      const screenshots = getState().mockup.screenshots;

      if (finishedLoading(screenshots)) {
        dispatch({
          type: LOADING_CHANGED,
          isLoading: false,
        });
      }
    });

    channel.on('screenshot:error', () => {
      dispatch({
        type: SCREENSHOT_ERROR,
        error: 'Sorry something went wrong. Make sure that the URL is correct and try again.',
      });
    });
  }
));
