import * as actions from './npcActions';
export function moveNPC(npc, coordinates) {
  return {
    type: actions.NPC_MOVE_ACTION,
    payload: {
      npc: npc,
      coordinates: coordinates
    }
  };
}

export function updateStrength(npcKey, strength) {
  return {
    type: actions.UPDATE_NPC_STRENGTH,
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
          type: actions.LOAD_NPCS,
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
    type: actions.KILL_NPC,
    payload: {
      npcKey: npcKey
    }
  };
}
