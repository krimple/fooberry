import Point from './Point';
import * as actions from './gameStoreActions';
import * as actionCreators from './gameActionCreators';
import * as effects from 'redux-saga/effects';

export const getPlayerPosition = state => (Point.fromXY(state.game.getIn(['atoms', 'player', 'x']), state.game.getIn(['atoms', 'player', 'y'])));
export const getThiefPosition = state => (Point.fromXY(state.game.getIn(['atoms', 'thief', 'x']), state.game.getIn(['atoms', 'thief', 'y'])));

export default function* thiefNPCSaga() {
  while (true) {
    yield effects.take(actions.MOVE_ACTION);
    console.log('NPC Saga woken');
    const xyPosition = yield effects.select(getPlayerPosition);
    const thiefxyPosition = yield effects.select(getThiefPosition);
    const xOffset = Math.sign(xyPosition.calcXDistanceTo(thiefxyPosition));
    const yOffset = Math.sign(xyPosition.calcYDistanceTo(thiefxyPosition));
    console.log(`current thief position ${JSON.stringify(thiefxyPosition)}`);
    const newxyPosition = thiefxyPosition.moveXY(xOffset, yOffset);
    if (!newxyPosition.isSamePointAs(xyPosition)) {
      console.log(`Moving to ${JSON.stringify(newxyPosition)}`);
      yield effects.put(actionCreators.moveNPCThiefCreator(newxyPosition));
    }
  }
}
