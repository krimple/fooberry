import { Howl } from 'howler';

const TIME_TICK = 'fooberry/game/TIME_TICK';

export const BEGIN_MELEE = 'fooberry/game/BEGIN_MELEE';
export const END_MELEE = 'fooberry/game/END_MELEE';
export const BEGIN_ATTACK = 'fooberry/game/BEGIN_ATTACK';
export const END_ATTACK = 'fooberry/game/END_ATTACK';
const ATTACK= 'fooberry/game/ATTACK';

const BEGIN_DEFENSE = 'fooberry/game/BEGIN_DEFENSE';
const END_DEFENSE = 'fooberry/game/END_DEFENSE';

export const BEGIN_GAME = 'fooberry/game/BEGIN_GAME';
export const END_GAME = 'fooberry/game/END_GAME';

const initialState = {
  gameRunning: false,
  attacking: false,
  defending: false,
  meleeInProgress: false,
  moves: 0,
  tick: 0
};

export default function reducer(state = initialState, action) {

  switch(action.type) {
  case BEGIN_GAME:
    return { ...initialState, gameRunning: true };
  case BEGIN_MELEE:
    return { ...state, meleeInProgress: true, attackingNpc: action.payload.npc };
  case END_MELEE:
    return { ...state, meleeInProgress: false, attackingNpc: null };
  case BEGIN_ATTACK:
    return { ...state, attacking: true, attackingNpc: action.payload.npc };
  case END_ATTACK:
    return { ...state, attacking: false };
  case BEGIN_DEFENSE:
    break;
  case END_DEFENSE:
    break;
  case TIME_TICK:
    return { ...state,  tick: state.tick + 1 };
  case ATTACK:
    return state;
  case END_GAME:
    return {  ...state, gameRunning: false };

  default:
    return state;
  }
}

// animation music...
let themeMusic = new Howl({
  src: ['./sfx/gameplay-music.mp3'],
  volume: 0.5,
  loop: true
});

let attackMusic = new Howl({
  src: ['./sfx/attack-music.mp3'],
  volume: 0.7,
  loop: true
});

export function beginGame() {
  return (dispatch) => {
    themeMusic.play();
    dispatch({
      type: BEGIN_GAME
    });
  };
}

export function beginMelee(npc) {
  return (dispatch) => {
    themeMusic.stop();
    attackMusic.play();
    dispatch({
      type: BEGIN_MELEE,
      payload: {
        npc: npc
      }
    });
  };
}

export function beginAttack(npc) {
  return {
    type: BEGIN_ATTACK,
    payload: {
      npc: npc
    }
  };
}

export function attack() {
  return {
    type: ATTACK
  };
}

export function endAttack() {
  attackMusic.stop();
  themeMusic.play();
  themeMusic.fade(0, 0.5, 100);
  return (dispatch) => {
    dispatch({
      type: END_ATTACK
    });
  };
}

export function endMelee() {
  attackMusic.stop();
  themeMusic.play();
  themeMusic.fade(0, 0.5, 100);
  return (dispatch) => {
    dispatch({
      type: END_MELEE
    });
  };
}
export function endGame() {
  themeMusic.fade(0.5, 0, 1000);
  return (dispatch) => {
    dispatch({
      type: END_GAME
    });
  };
}

