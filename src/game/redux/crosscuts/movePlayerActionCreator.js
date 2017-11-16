import Point from '../../Point';
import { move } from '../player/playerReducer';
import { beginMelee } from '../game/gameReducer';
import { logMovement } from '../logger/loggerReducer';
import { moveNPC } from '../npcs/npcReducer';

export function movePlayer(direction) {
  return (dispatch, getState) => {

    // make our move
    dispatch(move(direction));

    // get data for logging position after move and
    // for checking for collisions
    const state = getState();

    const playerName = state.player.name;
    const newPlayerPosition = state.player.point;
    const npcs = state.npcs;

    // log our move
    dispatch(logMovement(
      `player ${playerName}`, newPlayerPosition.x, newPlayerPosition.y)
    );

    // detect collision with NPC - if so, begin attack
    for (let key in npcs) {
      const npc = npcs[key];
      if (Point.equals(npc.point, newPlayerPosition)) {
        dispatch(beginMelee(key));
        return;
      }
    }

    const movesPending = [];
    // now, calculate the NPC moves, only moving is another is not on the space
    const npcList = Object.keys(npcs).map(key => npcs[key]);
    for (let npc in npcList) {
      const currentNPC = npcList[npc];
      const currentNPCPoint = currentNPC.point;

      const newNPCPoint = Point.moveTracking(
        currentNPCPoint.x,
        currentNPCPoint.y,
        newPlayerPosition.x,
        newPlayerPosition.y
      );

      if (Point.equals(newNPCPoint, newPlayerPosition)) {
        continue;
      }

      /*
      const movingToOtherNPCPoint = !npcList.find( n => {
        return n.key !== currentNPC.key && 
          Point.equals(n.point, newNPCPoint);
      });
      */

      const otherNPCAlreadyRecordedMove = movesPending.find(
        move => Point.equals(move.point, newNPCPoint));

      if (!otherNPCAlreadyRecordedMove) {
        movesPending.push({npc: currentNPC, point: newNPCPoint});
      }
    }

    // now, make moves
    movesPending.forEach(m => {
      dispatch(moveNPC(m.npc.key, m.point));
      dispatch(logMovement(m.npc.name, m.point.x, m.point.y));
    });
  };
}
