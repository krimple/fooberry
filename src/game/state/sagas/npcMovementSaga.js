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

      const movesPending = [];
      for (let i = 0; i < npcs.length; i++) {
        const npcPointImmutable = npcs[i].get('point');
        const npcLocation = Point2.toJSPoint(npcPointImmutable);

        const newCoordinates = Point2.moveTracking(
          npcLocation.x, npcLocation.y, playerPoint.x, playerPoint.y);

        const movingToPlayerPoint = Point2.equals(newCoordinates, playerPoint);
        const movingToOtherNPCPoint = checkSamePointAsOtherNPCs(npcs, npcs[i], newCoordinates);
        const otherNPCAlreadyRecorded = movesPending.find((move) => move.point.x === newCoordinates.x  && move.point.y === newCoordinates.y);

        if (!movingToPlayerPoint && !movingToOtherNPCPoint && !otherNPCAlreadyRecorded) {
          movesPending.push({ npc: npcs[i].get('key'), point: newCoordinates });
        }
      }

      if (movesPending.length > 0) {
        for (let i = 0; i < movesPending.length; i++) {
          yield put(npcActionCreators.moveNPC(movesPending[i].npc, movesPending[i].point));
        }
      }
    }
  } catch (error) {
    console.log(`Saga failed - ${error}`);
    throw error;
  }
}

function checkSamePointAsOtherNPCs(npcs, npc, point) {
  npcs.forEach((item) => {
    if (item.get('key') !== npc.get('key')) {
      if (Point2.equals(item.getIn(['point']), point)) {
        return true;
      }
    }
  });

  return false;
}
