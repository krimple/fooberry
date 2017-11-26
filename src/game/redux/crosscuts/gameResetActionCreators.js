import { beginGame } from '../game/gameReducer';
import * as npcActionCreators from '../npcs/npcReducer';
import * as playerActionCreators from '../player/playerReducer';
import * as gridActionCreators from '../grid/gridReducer';
import * as loggerActionCreators from '../logger/loggerReducer';

export function resetGame() {
  return (dispatch) => {
    dispatch(gridActionCreators.resetGrid());
    dispatch(playerActionCreators.initializePlayer());
    dispatch(npcActionCreators.loadNPCs());
    dispatch(loggerActionCreators.clearLogEntries());
    dispatch(beginGame());
  };
}
