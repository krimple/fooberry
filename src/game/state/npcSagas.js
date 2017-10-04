import Point from './Point';
import * as actions from './gameStoreActions';
import * as actionCreators from './gameStoreActionCreators';
import * as effects from 'redux-saga/effects';

export const getPlayerPosition = state => (Point.fromXY(state.getIn(['atoms', 'player', 'x']), state.getIn(['atoms', 'player', 'y'])));
export const getThiefPosition = state => (Point.fromXY(state.getIn(['atoms', 'thief', 'x']), state.getIn(['atoms', 'thief', 'y'])));

export default function *thiefNPCSaga() {
  while (true) {
    yield effects.take(actions.MOVE_ACTION);
    console.log(`NPC Saga woken`);
    const xyPosition = yield effects.select(getPlayerPosition);
    const thiefxyPosition = yield effects.select(getThiefPosition);
    const xOffset = Math.sign(Point.calcXDistanceTo(thiefxyPosition, xyPosition));
    const yOffset = Math.sign(Point.calcYDistanceTo(thiefxyPosition, xyPosition));
    console.log(`current thief position ${JSON.stringify(thiefxyPosition)}`);
    const newxyPosition = thiefxyPosition.moveXY(xOffset, yOffset);
    console.log(`moved thief to ${JSON.stringify(newxyPosition)} based on ${xOffset} ${yOffset}`);
    if (!newxyPosition.isSamePointAs(xyPosition)) {
      console.log(`Moving to ${JSON.stringify(newxyPosition)}`);
      yield effects.put(actionCreators.moveNPCThiefCreator(newxyPosition));
    }
  }
}
