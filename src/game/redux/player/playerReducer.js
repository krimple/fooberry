import Point from '../../Point';

export const MOVE_ACTION = 'fooberry/player/MOVE_ACTION';
const UPDATE_PLAYER_INFO = 'fooberry/player/UPDATE_PLAYER_INFO';
export const FIRE_ACTION = 'fooberry/player/FIRE_ACTION';
const UPDATE_PLAYER_STRENGTH = 'fooberry/player/UPDATE_PLAYER_STRENGTH';
const CHOOSE_WEAPON = 'fooberry/player/CHOOSE_WEAPON';
const INITIALIZE_PLAYER = 'fooberry/player/INITIALIZE_PLAYER';

const playerInitialState = {
  name: 'FooBerry the Wise',
  point: { x: 7, y: 7 },
  hitPoints: 100,
  maxHitPoints: 100,
  // TODO - let this be a setting in the app panel
  icon: './icons/delapouite/originals/svg/walking-scout.svg',
  weapon: 'mace',
  weapons: {
    'mace': { name: 'Mace', damage: 8, accuracy: .5 },
    'sword': { name: 'Vorpal Sword', damage: 12, accuracy: .6 },
    'bow': { name: 'Long Bow', damage: 4, accuracy: .9 },
    'axe': { name: 'Axe of Hacking', damage: 6, accuracy: .7 }
  }
};

export default function reducer(state = playerInitialState, action) {
  switch (action.type) {
  case INITIALIZE_PLAYER:
    return { ...playerInitialState };
  case MOVE_ACTION:
    return moveTo(state, action.payload.direction);
  case UPDATE_PLAYER_INFO:
    return updateInfo(state, action);
  case UPDATE_PLAYER_STRENGTH:
    return updateStrength(state, action);
  case CHOOSE_WEAPON:
    return chooseWeapon(state, action);
  case FIRE_ACTION:                        // marker action - saga picks it up
    return state;
  default:
    return state;
  }
}

function moveTo(state, direction) {
  // temporary until we get our heads around the object graph
  const currentPosition = state.point;
  let newPosition;
  switch (direction) {
  case 'north':
    newPosition = Point.move(currentPosition.x, currentPosition.y, 0, -1);
    break;
  case 'south':
    newPosition = Point.move(currentPosition.x, currentPosition.y, 0, 1);
    break;
  case 'west':
    newPosition = Point.move(currentPosition.x, currentPosition.y, -1, 0);
    break;
  case 'east':
    newPosition = Point.move(currentPosition.x, currentPosition.y, 1, 0);
    break;
  default:
    newPosition = currentPosition;
  }

  return {
    ...state,
    point: {
      x: newPosition.x,
      y: newPosition.y
    }
  };
}

function updateInfo(state, action) {
  return {
    ...state,
    name: action.payload.name
  };
}

function updateStrength(state, action) {
  return {
    ...state,
    hitPoints: action.payload.hitPoints
  };
}

function chooseWeapon(state, action) {
  return {
    ...state,
    weapon: action.payload.weapon
  };
}


export function move(direction) {
  return {
    type: MOVE_ACTION,
    payload: {
      direction: direction
    }
  };
}

export function updatePlayerInfo(playerInfo) {
  return {
    type: UPDATE_PLAYER_INFO,
    payload: playerInfo
  };
}

export function firePlayerWeapon() {
  return {
    type: FIRE_ACTION
  };
}

export function choosePlayerWeapon(weapon) {
  return {
    type: CHOOSE_WEAPON,
    payload: {
      weapon: weapon
    }
  };
}

export function updatePlayerStrength(hitPoints) {
  return {
    type: UPDATE_PLAYER_STRENGTH,
    payload: {
      hitPoints: hitPoints
    }
  };
}

export function initializePlayer() {
  return {
    type: INITIALIZE_PLAYER
  };
}
