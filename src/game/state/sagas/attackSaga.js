import Point2 from '../Point2';
import * as playerActions from '../reducers/player/playerActions';
import * as gameActionCreators from '../reducers/game/gameActionCreators';
import { take, put, select} from 'redux-saga/effects';

export function* attackSaga() {
  try {
    while (true) {
      yield take(playerActions.MOVE_ACTION);
      const state = yield select();
      const playerLocation = state.player.get('point');
      const thiefLocation = state.npcs.getIn(['thief', 'point']);

      console.log(`Attack saga data:  ${playerLocation} - ${thiefLocation}`);
      if (Point2.equals(playerLocation, thiefLocation)) {
        yield put(gameActionCreators.beginAttackCreator());
      }
    }
  } catch(error) {
    console.log(`Saga failed - ${error}`);
  }
}
