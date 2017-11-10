import Point2 from '../Point2';
import * as playerActions from '../reducers/player/playerActions';
import * as gameActionCreators from '../reducers/game/gameActionCreators';
import { take, put, select } from 'redux-saga/effects';

export function* beginAttackSaga() {
  try {
    while (true) {
      yield take(playerActions.MOVE_ACTION);
      const state = yield select();
      debugger;
      const playerLocation = state.player.get('point');
      // const npcLocations = state.npcs.getAll();
      const npcs = state.npcs.getIn(['npcs']);

      npcs.map(function* (npc) {
        const npcLocation = npc.get('point');
        debugger;
        if (Point2.equals(playerLocation, npcLocation)) {
          console.log('**** ATTACK MOUNTED WITH', npc.get('key'));
          yield put(gameActionCreators.beginAttack(npc));
        } else {
          console.log('**** SKIPPING ATTACK FOR ', npc.get('key'));
        }
      });
    }
  } catch(error) {
    console.log(`Saga failed - ${error}`);
  }
}
