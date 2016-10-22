import { Socket } from 'phoenix';
import { fetchScreenshot, screenshotOnComplete, screenshotOnError } from './screenshot';

export const SOCKET_CONNECTED = 'SOCKET_CONNECTED';

export const waitForSocketThenFetch = (url => (
  (dispatch, getState) => {
    const getSessionId = () => {
      if (getState().mockup.sessionId !== null) {
        dispatch(fetchScreenshot(url));
      } else {
        setTimeout(() => {
          getSessionId();
        }, 250);
      }
    };

    getSessionId();
  }
));

export const setSocket = (() => (
  (dispatch) => {
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
      dispatch(screenshotOnComplete(screenshot));
    });

    channel.on('screenshot:error', () => {
      dispatch(screenshotOnError());
    });
  }
));
