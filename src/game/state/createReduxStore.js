import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createHashHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import { gameReducer, gameInitialState } from './gameReducer';

import npcSagas from './npcSagas';

console.log(`game reducer is ${gameReducer}, gameInitialState is ${gameInitialState}`);
export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const createReduxStore = () => {
  const store = createStore(
      combineReducers({
        routing: routerReducer,
        game: gameReducer
      }),
      undefined,
      compose(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
            thunkMiddleware,
            logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

  sagaMiddleware.run(npcSagas);
  return store;
};

export default createReduxStore;
