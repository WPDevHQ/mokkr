import { createStore, applyMiddleware, compose } from 'redux';
import { setSocket } from '../actions';
import thunk from 'redux-thunk';
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
