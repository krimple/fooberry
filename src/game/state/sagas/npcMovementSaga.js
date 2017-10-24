import * as playerActions from '../reducers/player/playerActions';
import * as npcActionCreators from '../reducers/npcs/npcActionCreators';
import { take, put, select} from 'redux-saga/effects';
import { delay } from 'redux-saga';

export function* npcMovementSaga() {
  try {
    while (true) {
      yield take(playerActions.MOVE_ACTION);
      const state = yield select();
      const playerLocation = state.player.get('point');
      const playerPoint = {
        x: playerLocation.get('x'),
        y: playerLocation.get('y')
      };
      yield delay(200);
      yield put(npcActionCreators.moveNPC('thief', playerPoint));
    }
  } catch(error) {
    console.log(`Saga failed - ${error}`);
  }
}
