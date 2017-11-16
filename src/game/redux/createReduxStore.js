import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
//import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import loggerReducer from './logger/loggerReducer';
import npcReducer from './npcs/npcReducer';
import gridReducer from './grid/gridReducer';
import playerReducer from './player/playerReducer';
import gameReducer from './game/gameReducer';
import toastReducer from './toast/toastReducer';
import { sagas as toastSagas } from './toast/toastReducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const createReduxStore = () => {
  const store = createStore(
    combineReducers({
      grid: gridReducer,
      player: playerReducer,
      logger: loggerReducer,
      npcs: npcReducer,
      game: gameReducer,
      toast: toastReducer
    }),
    undefined,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        thunkMiddleware))
  );

  // fire up sagas for toast management
  toastSagas.forEach(s => sagaMiddleware.run(s));

  return store;
};

export default createReduxStore;
