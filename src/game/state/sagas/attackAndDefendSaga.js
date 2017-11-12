import * as playerActions from '../reducers/player/playerActions';
import * as playerActionCreators from '../reducers/player/playerActionCreators';
import * as toastActionCreators from '../reducers/toast/toastActionCreators';
import * as npcActionCreators from '../reducers/npcs/npcActionCreators';
import {take, put, call, select} from 'redux-saga/effects';

export function* attackAndDefendSaga() {
  try {
    while (true) {
      yield take(playerActions.FIRE_ACTION);
      const state = yield select();
      const player = state.player;
      const attackingNpc = state.npcs.getIn(['npcs', state.game.attackingNpc]);

      yield call(attackAndDefend, player, attackingNpc);

    }
  } catch (error) {
    console.log(`Saga failed - ${error}`);
  }
}

function* attackAndDefend(player, npc) {
  try {
    const playerName = player.get('name');
    const npcName = npc.get('name');
    if (npc.get('hitPoints') < 1) {
      yield put(toastActionCreators.nextToast(`${npcName} is dead, you cannot attack!`));
      return;
    }

    // player attacks!
    const playerWeapon = player.get('weapon');
    const npcHitPoints = npc.get('hitPoints');
    const newHitPoints = yield call(scoreAttack, playerName, playerWeapon, npc);
    if (newHitPoints !== npcHitPoints) {
      yield put(npcActionCreators.updateStrength(npc, newHitPoints));
    }

    // defend against attack if npc still alive
    if (newHitPoints > 0) {
      const playerHitPoints = player.get('hitPoints');
      const npcWeapon = npc.get('weapon');
      const newPlayerHitPoints = yield call(scoreAttack, npcName, npcWeapon, player);
      if (newHitPoints !== playerHitPoints) {
        yield put(playerActionCreators.updatePlayerStrength(npc, newPlayerHitPoints));
      }
    }
  } catch (e) { throw e; }
}

function* scoreAttack(attackerName, weapon, target) {
  try {
    const roll = Math.random() > 0.5;
    const name = target.get('name');
    const currentHitPoints = target.getIn(['hitPoints']);

    if (roll > 0.5) {
      const damage = Math.floor(Math.random() * 100 * calculateDamage(weapon));
      const newHitPoints = currentHitPoints - damage;

      if (newHitPoints > 0) {
        yield put(toastActionCreators.sendToastMessage(
          `Attack on ${name} succeeds! ${name} loses ${damage} points, has ${newHitPoints} left.`));
        return newHitPoints;
      } else {
        yield put(toastActionCreators.sendToastMessage(`${ name } is killed...`));
        return 0;
      }
    } else {
      yield put(toastActionCreators.sendToastMessage(`${attackerName} attacks with ${weapon} and misses...`));
      return currentHitPoints;
    }
  } catch (e) { throw e; }
}

function calculateDamage(weapon) {
  switch (weapon) {
  case 'mace':
    return 6;
  case 'staff':
    return 1.8;
  case 'bow':
    return 0.5;
  case 'claws':
    return 0.3;
  case 'knife':
    return 0.2;
  default:
    return 0.1;
  }
}
