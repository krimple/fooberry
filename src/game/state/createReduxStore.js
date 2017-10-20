import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
//import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas';
import thunkMiddleware from 'redux-thunk';

import loggerReducer from './reducers/logger/loggerReducer';
import npcReducer from './reducers/npcs/npcReducer';
import gridReducer from './reducers/grid/gridReducer';
import playerReducer from './reducers/player/playerReducer';

const sagaMiddleware = createSagaMiddleware();

const createReduxStore = () => {
  const store = createStore(
    combineReducers({
      grid: gridReducer,
      player: playerReducer,
      logger: loggerReducer,
      npcs: npcReducer
    }),
    undefined,
    compose(
      applyMiddleware(
        sagaMiddleware,
        thunkMiddleware),//, //logger),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


  
  sagaMiddleware.run(sagas.npcMovementSaga);
  sagaMiddleware.run(sagas.thiefNPCMovementLogSaga);
  sagaMiddleware.run(sagas.playerMovementLogSaga);
  return store;
};

export default createReduxStore;
