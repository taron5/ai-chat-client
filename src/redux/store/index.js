import createDebounce from 'redux-debounced';
import rootReducer from '../../redux/rootReducer';
import rootSaga from '../../redux/rootSaga';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, createDebounce()];

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(...middleware))
);
const { dispatch } = store;

sagaMiddleware.run(rootSaga);

export { store, dispatch };