import { endGame, endAttack, endMelee } from '../game/gameReducer';
import { killNPC, updateNPCStrength } from '../npcs/npcReducer';
import { sendToastMessage } from '../toast/toastReducer';
import {updatePlayerStrength } from '../player/playerReducer';

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
      dispatch(endMelee());
      return;
    }

    // TODO refactor / simplify

    // attack npc
    const npcDamage = attack(playerWeapon);
    const npcHitPointsLeft = targetNPC.hitPoints - npcDamage;

    dispatch(updateNPCStrength(npcKey, npcHitPointsLeft));
    let npcAlive = scoreAttack(dispatch, player, targetNPC, npcHitPointsLeft, npcDamage);
    if (!npcAlive) {
      // end this melee
      dispatch(killNPC(targetNPC.key));
      dispatch(endAttack());
      dispatch(endMelee());

      // TODO maybe rip out and move to an end game saga???
      if (Object.keys(getState().npcs).length === 0) {
        dispatch(sendToastMessage(`${player.name} has killed all monsters. The game is over!!!`));
        dispatch(endGame());
      }

      // no more work (why have the NPC attack when it is dead or the game is over?)
      return;
    }

    const playerDamage = attack(npcWeapon);
    const playerHitPointsLeft = player.hitPoints - playerDamage;
    dispatch(updatePlayerStrength(playerHitPointsLeft));

    let playerAlive = scoreAttack(dispatch, targetNPC, player, playerHitPointsLeft, playerDamage);

    // TODO - also maybe end game is in its own saga once the player dies?
    if (!playerAlive) {
      dispatch(endAttack());
      dispatch(endMelee());
      dispatch(endGame());
    }
  };
}

function scoreAttack(dispatch, attacker, target, hitPointsLeft, damage) {
  const weaponName = attacker.weapons[attacker.weapon].name;
  if (damage === 0) {
    reportAttackMissed(dispatch, attacker.name, weaponName, target.name);
  } else if (hitPointsLeft <= 0) {
    reportKilled(dispatch, target.name, damage, attacker.name, weaponName);
    return false;
  } else if (hitPointsLeft > 0) {
    reportDamage(dispatch, target.name, attacker.name,weaponName, damage, hitPointsLeft);
  }

  // target is alive!
  return true;
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

function reportKilled(dispatch, targetName, damage, attackerName, attackerWeaponName) {
  dispatch(sendToastMessage(`${targetName} attacked for ${damage} points, killed by ${attackerName} with the ${attackerWeaponName}`));
}

function reportAttackMissed(dispatch, attackerName, attackerWeapon, targetName) {
  dispatch(sendToastMessage(`${attackerName} attack with ${attackerWeapon} on ${targetName} misses!`));
}

function reportDamage(dispatch, targetName, attackerName, attackerWeapon, damage, hitPointsLeft) {
  dispatch(sendToastMessage(`${targetName} attack by ${attackerName} with ${attackerWeapon} succeeds. Damage is ${damage}, ${targetName} has ${hitPointsLeft} hit points.`));
}
