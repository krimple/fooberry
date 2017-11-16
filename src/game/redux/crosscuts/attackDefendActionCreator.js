import { endGame, endAttack } from '../game/gameReducer';
import { killNPC, updateNPCStrength } from '../npcs/npcReducer';
import { sendToastMessage } from '../toast/toastReducer';

export function attackDefend(npcKey) {
  return (dispatch, getState) => {
    const state = getState();
    const player = state.player;
    const targetNPC = state.npcs[npcKey];
    const playerWeapon = state.player.weapons[state.player.weapon];
    const npcWeapon = state.npcs[npcKey].weapons[state.npcs[npcKey].weapon];

    if (player.hitPoints === 0 || targetNPC.hitPoints === 0) {
      // odd situation. Lower panel...
      dispatch.sendToastMessage('Well, that is odd. One of you are already dead!');
      dispatch(endAttack());
      return;
    }

    // TODO refactor / simplify

    // attack npc
    const npcDamage = attack(playerWeapon);

    const npcHitPointsLeft = targetNPC.hitPoints - npcDamage;
    let continueMelee = scorePlayerAttack(dispatch, getState, npcHitPointsLeft, targetNPC, npcDamage, player);
    if (!continueMelee) {
      return;
    }

    const playerDamage = attack(npcWeapon);
    const playerHitPointsLeft = player.hitPoints - playerDamage;

    continueMelee = scoreNpcAttack(dispatch, targetNPC, npcWeapon, player, playerDamage, playerHitPointsLeft);
    if (!continueMelee) {
      return false;
    }
  };
}

function scorePlayerAttack(dispatch, getState, npcHitPointsLeft, targetNPC, npcDamage, player) {
  // score damage / report updates
  if (npcDamage === 0) {

    sendToastMessage(`${player.name} attack on ${targetNPC.name} misses!`);
  } else if (npcHitPointsLeft <= 0) {     // npc is dead!
    dispatch(sendToastMessage(`${targetNPC.name} attacked for ${npcDamage} points, killed by ${player.name} with ${player.weapon}`));
    // wipe out NPC from collection
    dispatch(killNPC(targetNPC.key));

    // lower attack panel
    dispatch(endAttack());

    if (Object.keys(getState().npcs).length === 0) {
      dispatch(sendToastMessage(`${player.name} has killed all monsters. The game is over!!!`));
      dispatch(endGame());
    }
    return false;
  } else if (npcHitPointsLeft > 0) {
    dispatch(sendToastMessage(`${targetNPC.name} attack by ${player.name} with ${player.weapon} succeeds. Damage is ${npcDamage}, ${targetNPC.name} has ${npcHitPointsLeft} hit points.`));
    dispatch(updateNPCStrength(targetNPC.key, npcHitPointsLeft));
  } else {
    dispatch(sendToastMessage(`${player.name} attack on ${targetNPC.name} misses!`));
  }
}

function scoreNpcAttack(dispatch, targetNPC, npcWeapon, player, playerDamage, playerHitPointsLeft) {
  // attack player
  if (playerDamage === 0) {
    dispatch(sendToastMessage(`${targetNPC.name} attack on ${player.name} misses!`));
    return true;
  }

  if (playerHitPointsLeft <= 0) {
    dispatch(sendToastMessage(`${player.name} is dead. Long live ${player.name}`));
    dispatch(endGame());
  } else if (playerHitPointsLeft > 0) {
    dispatch(sendToastMessage(`${targetNPC.name} attacks ${player.name} ` +
                     `with ${npcWeapon.name} for ${playerDamage}. ` +
                     `${player.name} has ${playerHitPointsLeft} hit points left.`));
  }
}

function attack(weaponData) {
  // assumes both player and NPC have similar shaped data properties
  const roll = Math.random();
  if (roll > 0.8 - weaponData.accuracy) {
    return Math.ceil(Math.random() * weaponData.damage);
  } else {
    return 0;
  }
}

