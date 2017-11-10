import * as playerActions from '../reducers/player/playerActions';
import * as toastActionCreators from '../reducers/toast/toastActionCreators';
import * as npcActionCreators from '../reducers/npcs/npcActionCreators';
import {take, put, select} from 'redux-saga/effects';

export function* attackAndDefendSaga() {
  try {
    while (true) {
      yield take(playerActions.FIRE_ACTION);
      const state = yield select();
      const weapon = state.player.weapon;
      const npc = state.npcs.getIn(['npcs', state.game.attackingNpc]);
      const npcName = npc.get('name');

      const isSuccessful = Math.random() > 0.5;
      if (isSuccessful) {
        const damageMultiplier = calculateDamage(weapon);
        const damage = Math.floor(Math.random() * 100 * damageMultiplier);
        const npcHitPoints = npc.getIn(['hitPoints']);
        const newHitPoints = npcHitPoints  - damage;
        console.log('********* ATTACKED NPC HAS ', newHitPoints, 'hit points left');
        if (newHitPoints > 0) {
          yield put(toastActionCreators.sendToastMessage(
            `Attack on ${ npcName } succeeds! ${ npcName } loses ${ damage } points, has ${ newHitPoints } left.`));
          yield put(npcActionCreators.updateStrength(npc, newHitPoints));
        } else {
          yield put(toastActionCreators.sendToastMessage(`${ npcName } is killed...`));
          yield put(npcActionCreators.updateStrength(npc, 0));
        }
      }
      else {
        yield put(toastActionCreators.sendToastMessage(`YOU MISSED the ${ npcName } !!! HAHAH!`));
      }
    }
  } catch (error) {
    console.log(`Saga failed - ${error}`);
  }
}

function calculateDamage(weapon) {
  switch (weapon) {
  case 'mace':
    return 6;
  case 'staff':
    return 1.8;
  case 'bow':
    return 0.5;
  default:
    return 0.1;
  }
}
