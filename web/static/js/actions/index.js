export const LOADING_CHANGED = 'LOADING_CHANGED';
export const SET_SCREENSHOTS = 'SET_SCREENSHOTS';
export const SCREENSHOT_ERROR = 'SCREENSHOT_ERROR';
export const SET_URL = 'SET_URL';

export const loadingChanged = (isLoading => ({
  type: LOADING_CHANGED,
  isLoading,
}));

export const setScreenshots = ((url, screenshots) => ({
  type: SET_SCREENSHOTS,
  screenshots,
  url,
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
  (dispatch) => {
    dispatch(loadingChanged(true));
    dispatch(setUrl(url));
    return fetch(`api/screenshot?url=${url}`).then(
          response => response.json()
        ).then(
          screenshots => dispatch(setScreenshots(url, screenshots))
        ).then(() => dispatch(loadingChanged(false)));
  }
));
