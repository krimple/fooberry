import Point2 from '../Point2';
import * as playerActions from '../reducers/player/playerActions';
import * as npcActions from '../reducers/npcs/npcActions';
import * as gameActionCreators from '../reducers/game/gameActionCreators';
import { take, put, select } from 'redux-saga/effects';

export function* beginAttackSaga() {
  try {
    while (true) {
      yield take([playerActions.MOVE_ACTION, npcActions.NPC_MOVE_ACTION]);
      const state = yield select();
      const playerLocation = Point2.toJSPoint(state.player.get('point'));
      const npcs = state.npcs.getIn(['npcs']);
      const jsnpcs = npcs.toJS();
      for (let key in jsnpcs) {
        const npc = jsnpcs[key];
        const npcPoint = npc.point;
        if (Point2.equals(playerLocation, npcPoint)) {
          yield put(gameActionCreators.beginAttack(key));
        }
      }

      /*
      npcs.map(function* (npc) {
        const npcLocation = Point2.toJSPoint(npc.get('point'));
        console.log(`npc point - ${npcLocation}`);
        if (Point2.equals(playerLocation, npcLocation)) {
          console.log('**** ATTACK MOUNTED WITH', npc.get('key'));
          yield put(gameActionCreators.beginAttack(npc));
        } else {
          console.log('**** SKIPPING ATTACK FOR ', npc.get('key'));
        }
      }); */
    }
  } catch(error) {
    console.log(`Saga failed - ${error}`);
  }
}
