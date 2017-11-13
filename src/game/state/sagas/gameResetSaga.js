import { take, put } from 'redux-saga/effects';
import * as gameActions from '../reducers/game/gameActions';
import * as npcActionCreators from '../reducers/npcs/npcActionCreators';
import * as playerActionCreators from '../reducers/player/playerActionCreators';
import * as gridActionCreators from '../reducers/grid/gridActionCreators';

export function* gameResetSaga() {
  try {
    while (true) {
      yield take(gameActions.BEGIN_GAME);
      yield put(gridActionCreators.resetGrid());
      yield put(playerActionCreators.initializePlayer());
      yield put(npcActionCreators.loadNPCs());
    }
  } catch (e) {
    console.log(`failure! ${e}`);
    throw e;
  }
}
