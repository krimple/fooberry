import * as actions from './reducers/logger/loggerActions';
import * as gameActionCreators from './reducers/player/playerActionCreators';
import { take, put, select} from 'redux-saga/effects';

export function* thiefNPCMovementLogSaga() {
  while (true) {
    yield take(actions.MOVE_ACTION);
    yield put(gameActionCreators.logPlayerMovement());
  }
}

export function* thiefFollowSaga() {
  while (true) {
    yield take(actions.MOVE_ACTION);
    const state = yield select();
    const playerLocation = state.player.point;
    yield put(gameActionCreators.moveNPCThiefCreator());
  }
}
