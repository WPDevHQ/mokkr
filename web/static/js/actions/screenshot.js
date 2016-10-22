export const LOADING_CHANGED = 'LOADING_CHANGED';
export const SET_SCREENSHOT = 'SET_SCREENSHOT';
export const SCREENSHOT_ERROR = 'SCREENSHOT_ERROR';
export const SET_URL = 'SET_URL';

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

const trackEvent = (url => (
  ga('send', 'event', {
    eventCategory: 'Screenshots',
    eventAction: 'capture',
    eventValue: url,
  })
));

export const fetchScreenshot = (url => (
  (dispatch, getState) => {
    trackEvent(url);
    const { sessionId, activeDevices } = getState().mockup;
    dispatch(setUrl(url));
    dispatch(loadingChanged(true));
    fetch(`api/screenshot?url=${url}&session=${sessionId}&devices=${activeDevices}`);
  }
));

export const finishedLoading = ((screenshots, activeDevices) => (
  activeDevices.every(s => (
    screenshots[s].src.length !== 0
  ))
));

export const screenshotOnComplete = (screenshot => (
  (dispatch, getState) => {
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

    const { screenshots, activeDevices } = getState().mockup;

    if (finishedLoading(screenshots, activeDevices)) {
      dispatch({
        type: LOADING_CHANGED,
        isLoading: false,
      });
    }
  }
));

export const screenshotOnError = () => (
  (dispatch) => {
    dispatch({
      type: SCREENSHOT_ERROR,
      error: 'Sorry something went wrong. Make sure that the URL is correct and try again.',
    });
  }
);
