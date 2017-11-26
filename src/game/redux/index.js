import { attackDefend } from './crosscuts/attackDefendActionCreator';
import { beginAttack, endAttack } from './game/gameReducer';
import { resetGame } from './crosscuts/gameResetActionCreators';

import * as movePlayerActionCreators from './crosscuts/movePlayerActionCreator';
import * as playerActionCreators from './player/playerReducer';
import * as gameActionCreators from './game/gameReducer';
import * as npcActionCreators from './npcs/npcReducer';
import * as attackDefendCreators from './crosscuts/attackDefendActionCreator';
import * as gameResetActionCreators from './crosscuts/gameResetActionCreators';

export { gameActionCreators };
export { playerActionCreators };
export { npcActionCreators };
export { movePlayerActionCreators };
export { attackDefendCreators };
export { gameResetActionCreators };

export const crosscutActionCreators = {
  attackDefend, beginAttack, endAttack, resetGame
};
