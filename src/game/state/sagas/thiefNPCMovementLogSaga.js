import * as playerActions from '../reducers/player/playerActions';
import * as loggerActionCreators from '../reducers/logger/loggerActionCreators';
import { take, put, select } from 'redux-saga/effects';

export function* thiefNPCMovementLogSaga() {
  try {
    while (true) {
      yield take(playerActions.MOVE_ACTION);
      const state = yield select();
      const thiefPoint = state.npcs.getIn(['thief', 'point']);
      yield put(
        loggerActionCreators.logMovement(
          'thief', thiefPoint.get('x'), thiefPoint.get('y'))
      );
    }
  } catch (error) {
    console.log(`Saga failed - ${error}`);
  }
}
