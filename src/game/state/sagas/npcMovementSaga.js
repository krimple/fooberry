import * as playerActions from '../reducers/player/playerActions';
import * as npcActionCreators from '../reducers/npcs/npcActionCreators';
import Point2 from '../Point2';
import { take, put, select} from 'redux-saga/effects';
import { delay } from 'redux-saga';

export function* npcMovementSaga() {
  // TODO - collision logic not working completely - sometimes npcs merge
  try {
    while (true) {
      yield take(playerActions.MOVE_ACTION);
      const state = yield select();
      const playerLocation = state.player.get('point');
      const playerPoint = {
        x: playerLocation.get('x'),
        y: playerLocation.get('y')
      };

      yield delay(200);

      const npcs = state.npcs.getIn(['npcs']).toArray();

      for (let i = 0; i < npcs.length; i++) {
        const npcPointImmutable = npcs[i].get('point');
        const npcLocation = Point2.toJSPoint(npcPointImmutable);
        const newCoordinates = Point2.moveTracking(
          npcLocation.x, npcLocation.y, playerPoint.x, playerPoint.y);
        if (!Point2.equals(newCoordinates, playerPoint)) {
          if (!checkSamePointAsOtherNPCs(npcs, npcs[i], newCoordinates)) {
            yield put(npcActionCreators.moveNPC(npcs[i].get('key'), newCoordinates));
          }
        }
      }
    }
  } catch (error) {
    console.log(`Saga failed - ${error}`);
  }
}

function checkSamePointAsOtherNPCs(npcs, npc, point) {
  npcs.forEach((item) => {
    if (item.get('key') !== npc) {
      if (Point2.equals(item.getIn(['point']), point)) {
        return true;
      }
    }
  });

  return false;
}
