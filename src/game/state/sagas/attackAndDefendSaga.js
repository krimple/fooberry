import * as playerActions from '../reducers/player/playerActions';
import * as playerActionCreators from '../reducers/player/playerActionCreators';
import * as toastActionCreators from '../reducers/toast/toastActionCreators';
import * as npcActionCreators from '../reducers/npcs/npcActionCreators';
import * as gameActionCreators from '../reducers/game/gameActionCreators';
import {take, put, call, fork, select} from 'redux-saga/effects';

export function* attackAndDefendSaga() {
  try {
    while (true) {
      yield take(playerActions.FIRE_ACTION);
      const state = yield select();
      const player = state.player;
      const attackingNpc = state.npcs.getIn(['npcs', state.game.attackingNpc]);

      yield fork(attackAndDefend, player, attackingNpc);

    }
  } catch (error) {
    console.log(`Saga failed - ${error}`);
  }
}

function* attackAndDefend(player, npc) {
  try {
    const npcKey = npc.get('key');
    const startingAttackerHitPoints = player.get('hitPoints');

    // player attacks!
    const newNPCHitPoints = yield call(scoreAttack, player, npc);
    if (newNPCHitPoints === 0) {
      yield put(npcActionCreators.killNPC(npcKey));
      yield put(gameActionCreators.endAttack());
    } else if(newNPCHitPoints > 0) {
      yield put(npcActionCreators.updateStrength(npcKey, newNPCHitPoints));
    } else {
      // TODO we missed!
      toastActionCreators.sendToastMessage(`${player.get('name')} swung with the ${player.getIn(['weapons', player.get('weapon')])} and missed!`);
    }

    // defend against npc attack if npc and player have hit points left
    if (newNPCHitPoints > 0 && startingAttackerHitPoints > 0) {
      const newPlayerHitPoints = yield call(scoreAttack, npc, player);
      if (newPlayerHitPoints === 0) {
        yield put(gameActionCreators.endGame());
      } else if (newPlayerHitPoints > 0) {
        yield put(playerActionCreators.updatePlayerStrength(npcKey, newPlayerHitPoints));
      } else {
        console.log('npc missed');
      }
    }
  } catch (e) { throw e; }
}

function* scoreAttack(attacker, target) {
  try {
    const attackerName = attacker.get('name');
    const weaponName = attacker.get('weapon');
    const weaponData = attacker.getIn(['weapons', weaponName]);
    const targetName = target.get('name'); 
    const currentTargetHitPoints = target.get('hitPoints');

    const roll = Math.random();

    // lower edge score for more potent weapon, 80% base
    if (roll > 0.8 - weaponData.get('accuracy')) {
      const damage = Math.floor(Math.random() * weaponData.get('damage'));
      const newHitPoints = currentTargetHitPoints - damage;

      if (newHitPoints > 0) {
        yield put(toastActionCreators.sendToastMessage(
          `Attack with ${weaponName} on ${targetName} succeeds! ${targetName} loses ${damage} points, has ${newHitPoints} left.`));
        return newHitPoints;
      } else {
        yield put(toastActionCreators.sendToastMessage(`${attackerName }'s attack with ${weaponName}  on ${ targetName } succeeds and ${ targetName } is killed...`));
        return 0;
      }
    } else {
      yield put(toastActionCreators.sendToastMessage(`${attackerName} attacks with ${weaponName} and misses...`));
      return null;
    }
  } catch (e) { throw e; }
}

