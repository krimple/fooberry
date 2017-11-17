const LOAD_NPCS = 'fooberry/npcs/LOAD_NPCS';
const NPC_MOVE_ACTION = 'fooberry/npcs/NPC_MOVE_ACTION';
const UPDATE_NPC_STRENGTH = 'fooberry/npcs/UPDATE_NPC_STRENGTH';
const KILL_NPC = 'fooberry/npcs/KILL_NPC';

export default function reducer(state = null, action) {
  switch(action.type) {
  case NPC_MOVE_ACTION:
    return move(state, action);
  case UPDATE_NPC_STRENGTH:
    return updateStrength(state, action);
  case LOAD_NPCS:
    return load(state, action);
  case KILL_NPC:
    return kill(state, action);
  default:
    return state;
  }
}

function load(state, action) {
  return action.payload.data;
}

function move(state, action) {
  const npcKey = action.payload.npc;
  const npcObject = state[npcKey];
  const coordinates = action.payload.coordinates;
  const newState = {
    ...state, [npcKey]: {
      ...npcObject,
      point: {
        x: coordinates.x,
        y: coordinates.y
      }
    }
  };
  return newState;

}

function updateStrength(state, action) {
  const npcKey = action.payload.npcKey;
  const newStrength = action.payload.newStrength;
  return {
    ...state, [npcKey]: {
      ...state[npcKey],
      hitPoints: newStrength
    }
  };
}

function kill(state, action) {
  const npcKey = action.payload.npcKey;
  const newState = { ...state };
  delete newState[npcKey];
  return newState;
}

export function moveNPC(npc, coordinates) {
  return {
    type: NPC_MOVE_ACTION,
    payload: {
      npc: npc,
      coordinates: coordinates
    }
  };
}

export function updateNPCStrength(npcKey, strength) {
  return {
    type: UPDATE_NPC_STRENGTH,
    payload: {
      npcKey: npcKey,
      newStrength: strength
    }
  };
}

export function loadNPCs() {
  return function(dispatch) {
    fetch('/npc-config.json')
      .then((data) => {
        return data.json();
      }).then((data) => {
        dispatch({
          type: LOAD_NPCS,
          payload: {
            data: data
          }
        });
      })
      .catch((e) => { console.log('failed npc load', e); });
  };
}

export function killNPC(npcKey) {
  return {
    type: KILL_NPC,
    payload: {
      npcKey: npcKey
    }
  };
}
