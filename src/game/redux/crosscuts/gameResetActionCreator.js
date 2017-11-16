import { beginGame } from '../game/gameReducer';
import * as npcActionCreators from '../npcs/npcReducer';
import * as playerActionCreators from '../player/playerReducer';
import * as gridActionCreators from '../grid/gridReducer';

export function resetGame() {
  return (dispatch) => {
    dispatch(beginGame());
    dispatch(gridActionCreators.resetGrid());
    dispatch(playerActionCreators.initializePlayer());
    dispatch(npcActionCreators.loadNPCs());
  };
}

