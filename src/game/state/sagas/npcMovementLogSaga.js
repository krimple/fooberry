import * as npcActions from '../reducers/npcs/npcActions';
import * as loggerActionCreators from '../reducers/logger/loggerActionCreators';
import { put, select, take } from 'redux-saga/effects';

export function* npcMovementLogSaga() {
  try {
    while (true) {
      const action = yield take(npcActions.NPC_MOVE_ACTION);
      const state = yield select();

      const npcKey = action.payload.npc;
      const npcName = state.npcs.getIn(['npcs', npcKey, 'name']);
      const npcPoint = state.npcs.getIn(['npcs', npcKey, 'point']);

      yield put(
        loggerActionCreators.logMovement(
          npcName, npcPoint.get('x'), npcPoint.get('y'))
      );
    }
  } catch (error) {
    console.log(`Saga failed - ${error}`);
  }
}
