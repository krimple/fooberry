import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header, Modal, Button, Segment} from 'semantic-ui-react';

import { attackDefendCreators, playerActionCreators, gameActionCreators } from '../../redux';

const CharacterIcon = styled.img`
  height: 60px;
  width: 60px;
  background-image: url(${props => props.icon});
`;

class AttackPanel extends Component {

  state = {
    weapon: this.props.weapon
  };

  render = () => {
    if (!this.state || !this.props.weapons) {
      return <p>Loading...</p>;
    }

    const weapons = this.props.weapons;
    const weaponKeys = Object.keys(weapons);
    const weaponOptions = weaponKeys.map((key) => {
      const weapon = weapons[key];
      return <option key={'weapon-' + key }
        value={key}>{key}: D{weapon.damage} A{weapon.accuracy}</option>;
    });

    return (
      <Modal open={this.props.meleeInProgress === true}>
        <Modal.Header>Oh no, a {this.props.attackingNpcName}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>You are attacking the { this.props.attackingNpcName }</Header>
            <Segment align={'center'}>
              <CharacterIcon icon={ this.props.playerIcon } />
              &nbsp;
              <CharacterIcon icon={ this.props.npcIcon } /> 
            </Segment>
            <p>{ this.props.weapon }</p>
            <p>Weapon:  
              <select onChange={this.selectWeapon}
                defaultValue={this.props.weapon}>
                {weaponOptions}
              </select>
            </p>
            <Button disabled={ this.state.attackInProgress } onClick={this.attack (this.props.attackingNpcKey)}>Attack!</Button>
            <Button onClick={this.endAttack} floated='right'>End Attacks!</Button>
          </Modal.Description>
          <h2>Messages...</h2>
          <Segment textAlign='center'>{this.props.toast}</Segment>
        </Modal.Content>
      </Modal>
    );
  };

  attack = (npc) => () => {
    let chosenWeapon = null;
    if (!this.state.weapon) {
      chosenWeapon = this.props.weapons[0];
    } else {
      chosenWeapon = this.state.weapon;
    }
    this.props.dispatch(playerActionCreators.choosePlayerWeapon(chosenWeapon));
    this.props.dispatch(attackDefendCreators.attackDefend(npc));
  };

  selectWeapon = (event) => {
    // Once entering setState the event target is nullified with the event
    // this may be new with 16.x, didn't cause trouble with 15.x
    const weapon = event.target.value;
    this.setState((state, props) => {
      return {
        weapon: weapon
      };
    });
  };

  endAttack = () => {
    this.props.dispatch(gameActionCreators.endMelee());
  }
}

AttackPanel.propTypes = {
  meleeInProgress: PropTypes.bool,
  attackingNpc: PropTypes.object,
  attackingNpcName: PropTypes.string,
  attackingNpcKey: PropTypes.string,
  duelInProgress: PropTypes.bool,
  weapons: PropTypes.any,
  weapon: PropTypes.string,
  dispatch: PropTypes.func,
  toast: PropTypes.string,
  npcName: PropTypes.string,
  playerIcon: PropTypes.string,
  npcIcon: PropTypes.string
};

function mapStateToProps(state) {
  const additionalProps = {};
  if (state.npcs && state.game.meleeInProgress) {
    const npc = state.npcs[state.game.attackingNpc];
    additionalProps.attackingNpc = npc;
    additionalProps.attackingNpcName = npc.name;
    additionalProps.attackingNpcKey = npc.key;
    additionalProps.npcIcon = npc.icon;
  } else {
    additionalProps.attackingNpc = null;
    additionalProps.attackingNpcName = null;
    additionalProps.attackingNpcKey = null;
    additionalProps.npcIcon = null;
  }

  const newProps = {
    ...additionalProps,
    meleeInProgress: state.game.meleeInProgress,
    attackInProgress: state.game.attackInProgress,
    toast: state.toast.activeToast,
    weapons: state.player.weapons,
    weapon: state.player.weapon,
    playerIcon: state.player.icon
  };
  return newProps;
}

export default connect(mapStateToProps)(AttackPanel);

