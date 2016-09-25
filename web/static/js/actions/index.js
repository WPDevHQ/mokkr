export const LOADING_CHANGED = 'LOADING_CHANGED';
export const SET_SCREENSHOT = 'SET_SCREENSHOT';
export const SCREENSHOT_ERROR = 'SCREENSHOT_ERROR';
export const SET_URL = 'SET_URL';
export const SOCKET_CONNECTED = 'SOCKET_CONNECTED';
import {Socket} from "phoenix"

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
    let sessionId = getState().mockup.sessionId;
    dispatch(loadingChanged(true));
    dispatch(setUrl(url));
    fetch(`api/screenshot?url=${url}&session=${sessionId}`);
  }
));

export const setSocket = (() => (
  (dispatch, getState) => {
    const ID = () => {
      return '_' + Math.random().toString(36).substr(2, 9);
    };

    const sessionId = ID();

    const socket = new Socket("/socket", {params: { sessionId: sessionId}});
    socket.connect();

    const channel = socket.channel(`screenshots:${window.sessionId}`, {})
    channel.join().receive('ok', () => {
      dispatch({
        type: SOCKET_CONNECTED,
        channel: channel
      });
    });

    channel.on('screenshot:complete', (screenshot) => {
      let attrs = getState().mockup.screenshots[screenshot.name];

      let newScreenshotAttrs = Object.assign({},
          attrs,
          { src: screenshot.src }
      );

      let newScreenshot = {};
      newScreenshot[screenshot.name] = newScreenshotAttrs;

      dispatch({
        type: SET_SCREENSHOT,
        screenshot: newScreenshot,
        isLoading: false,
      });
    });
  }
));
