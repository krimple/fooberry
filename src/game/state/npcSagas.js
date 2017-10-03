import Point from './Point';
import * as actions from './gameStoreActions';
import * as actionCreators from './gameStoreActionCreators';
import * as effects from 'redux-saga/effects';

import CoordinateHelper from '../utils/CoordinateHelper';

export const getPlayerPosition = state => (new Point(state.atoms.player.x, state.atoms.player.y));
export const getThiefPosition = state => (new Point(state.atoms.thief.x, state.atoms.thief.y));

export default function *thiefNPCSaga() {
  while (true) {
    yield effects.take(actions.MOVE_ACTION);
    const xyPosition = yield effects.select(getPlayerPosition);
    const thiefxyPosition = yield effects.select(getThiefPosition);
    const xDelta = CoordinateHelper.calcXDistanceTo(thiefxyPosition, xyPosition);
    const yDelta = CoordinateHelper.calcYDistanceTo(thiefxyPosition, xyPosition);

    const offsetX = xDelta > 0 ? 1 : -1;
    const offsetY = yDelta > 0 ? 1 : -1;
    const newxyPosition = xyPosition.move(thiefxyPosition.x + offsetX, thiefxyPosition.y + offsetY);
    yield effects.put(actionCreators.moveNPCThiefCreator(newxyPosition));


  }
}
