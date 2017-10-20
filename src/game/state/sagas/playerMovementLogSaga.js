import * as playerActions from '../reducers/player/playerActions';
import * as loggerActionCreators from '../reducers/logger/loggerActionCreators';
import { take, put, select} from 'redux-saga/effects';

export function* playerMovementLogSaga() {
  while (true) {
    yield take(playerActions.MOVE_ACTION);
    const state = yield select();
    const playerLocation = state.player.get('point');
    const playerName = state.player.get('name');
    yield put(
      loggerActionCreators.logMovementCreator(
        `player ${playerName}`, playerLocation.get('x'), playerLocation.get('y'))
    );
  }
}
