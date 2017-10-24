import * as playerActions from '../reducers/player/playerActions';
import * as toastActionCreators from '../reducers/toast/toastActionCreators';
import * as npcActionCreators from '../reducers/npcs/npcActionCreators';
import {take, put, select} from 'redux-saga/effects';

export function* attackSaga() {
  try {
    while (true) {
      yield take(playerActions.FIRE_ACTION);
      const state = yield select();
      const weapon = state.player.weapon;
      const isSuccessful = Math.random() > 0.5;
      if (isSuccessful) {
        const damageMultiplier = calculateDamage(weapon);
        const damage = Math.floor(Math.random() * 100 * damageMultiplier);
        const thiefStrength = state.npcs.getIn(['thief', 'strength']);
        const newStrength = thiefStrength - damage;
        if (newStrength > 0) {
          yield put(toastActionCreators.sendToastMessage(
            `Attack on Thief Succeeds! He loses ${damage} points, has ${newStrength} left.`));
          yield put(npcActionCreators.updateStrength('thief', newStrength));
        } else {
          yield put(toastActionCreators.sendToastMessage('Attack on Thief kills theif! He dies...'));
          yield put(npcActionCreators.updateStrength('thief', 0));
        }
      }
      else {
        yield put(toastActionCreators.sendToastMessage('YOU MISSED!!! HAHAH!'));
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
