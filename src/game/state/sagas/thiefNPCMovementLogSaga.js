import * as playerActions from '../reducers/player/playerActions';
import * as loggerActionCreators from '../reducers/logger/loggerActionCreators';
import { take, put, select} from 'redux-saga/effects';

export function* thiefNPCMovementLogSaga() {
  try {
    while (true) {
      yield take(playerActions.MOVE_ACTION);
      const state = yield select();
      const playerPoint = state.player.get('point');
      yield put(
        loggerActionCreators.logMovementCreator(
          'thief', playerPoint.get('x'), playerPoint.get('y'))
      );
    }
  } catch (error) {
    console.log(`Saga failed - ${error}`);
  }
}
