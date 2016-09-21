export const LOADING_CHANGED = 'LOADING_CHANGED';
export const SET_SCREENSHOTS = 'SET_SCREENSHOTS';
export const SCREENSHOT_ERROR = 'SCREENSHOT_ERROR';

export const loadingChanged = (isLoading => ({
  type: LOADING_CHANGED,
  isLoading,
}));

export const setScreenshots = ((url, screenshots) => ({
  type: SET_SCREENSHOTS,
  screenshots,
  url,
}));

export const screenshotError = (error => ({
  type: SCREENSHOT_ERROR,
  error,
}));

export const fetchScreenshot = (url => (
  (dispatch) => {
    dispatch(loadingChanged(true));
    return fetch(`api/screenshot?url=${url}`).then(
          response => response.json()
        ).then(
          screenshots => dispatch(setScreenshots(url, screenshots))
        ).then(() => dispatch(loadingChanged(false)));
  }
));
