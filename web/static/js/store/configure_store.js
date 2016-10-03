import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { setSocket } from '../actions';
import rootReducer from '../reducers';

const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

store.dispatch(setSocket());

export default store;
