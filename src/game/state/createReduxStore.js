import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
//import logger from 'redux-logger';


import thunkMiddleware from 'redux-thunk';

import loggerReducer from './reducers/logger/loggerReducer';
import npcReducer from './reducers/npcs/npcReducer';
//import gridReducer from './reducers/grid/gridReducer';
//import playerReducer from './reducers/player/playerReducer';
import gameReducer from './reducers/game/gameReducer';
import toastReducer from './reducers/toast/toastReducer';

//import createSagaMiddleware from 'redux-saga';
//import * as sagas from './sagas';
//const sagaMiddleware = createSagaMiddleware();

const createReduxStore = () => {
  const store = createStore(
    combineReducers({
//      grid: gridReducer,
//      player: playerReducer,
      logger: loggerReducer,
      npcs: npcReducer,
      game: gameReducer,
      toast: toastReducer
    }),
    undefined,
    compose(
      applyMiddleware(
        //sagaMiddleware,
        thunkMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));



  //sagaMiddleware.run(sagas.beginAttackSaga);
  //sagaMiddleware.run(sagas.attackAndDefendSaga);
  //sagaMiddleware.run(sagas.playerMovementLogSaga);
  //sagaMiddleware.run(sagas.npcMovementSaga);
  //sagaMiddleware.run(sagas.npcMovementLogSaga);
  //sagaMiddleware.run(sagas.manageToastsSaga);
  //sagaMiddleware.run(sagas.toastTimeTickSaga);
  //sagaMiddleware.run(sagas.startGameSoundEffectSaga);
  //sagaMiddleware.run(sagas.playAndStopAttackMusicSaga);
  return store;
};

export default createReduxStore;
