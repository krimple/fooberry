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

      const npcs = state.npcs.getIn(['npcs']).toArray();
      for (let i = 0; i < npcs.length; i++) {
        yield put(npcActionCreators.moveNPC(npcs[i].get('key'), playerPoint));
      }
    }
  } catch(error) {
    console.log(`Saga failed - ${error}`);
  }
}
