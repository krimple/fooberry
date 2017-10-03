import Point from './Point';
import * as actions from './gameStoreActions';
import * as actionCreators from './gameStoreActionCreators';
import * as effects from 'redux-saga/effects';

export const getPlayerPosition = state => (new Point(state.atoms.player.point.get('x'), state.atoms.player.point.get('y')));
export const getThiefPosition = state => (new Point(state.atoms.thief.point.get('x'), state.atoms.thief.get('y')));

export default function *thiefNPCSaga() {
  while (true) {
    yield effects.take(actions.MOVE_ACTION);
    const xyPosition = yield effects.select(getPlayerPosition);
    const thiefxyPosition = yield effects.select(getThiefPosition);
    const xDelta = Point.calcXDistanceTo(thiefxyPosition, xyPosition);
    const yDelta = Point.calcYDistanceTo(thiefxyPosition, xyPosition);

    const offsetX = xDelta > 0 ? 1 : -1;
    const offsetY = yDelta > 0 ? 1 : -1;
    const newxyPosition = xyPosition.move(thiefxyPosition.x + offsetX, thiefxyPosition.y + offsetY);
    if (!newxyPosition.isSamePointAs(xyPosition)) {
      yield effects.put(actionCreators.moveNPCThiefCreator(newxyPosition));
    }
  }
}
