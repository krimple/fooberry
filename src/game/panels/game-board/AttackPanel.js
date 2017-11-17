import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header, Modal, Button, Segment} from 'semantic-ui-react';

import { attackDefendCreators, playerActionCreators, gameActionCreators } from '../../redux';

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
    this.setState((state, props) => {
      return {
        weapon: event.target.value
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
  npcName: PropTypes.string
};

function mapStateToProps(state) {
  const additionalProps = {};
  if (state.npcs && state.game.meleeInProgress) {
    const npc = state.npcs[state.game.attackingNpc];
    additionalProps.attackingNpc = npc;
    additionalProps.attackingNpcName = npc.name;
    additionalProps.attackingNpcKey = npc.key;
  } else {
    additionalProps.attackingNpc = null;
    additionalProps.attackingNpcName = null;
    additionalProps.attackingNpcKey = null;
  }

  const newProps = {
    ...additionalProps,
    meleeInProgress: state.game.meleeInProgress,
    attackInProgress: state.game.attackInProgress,
    toast: state.toast.activeToast,
    weapons: state.player.weapons,
    weapon: state.player.weapon
  };
  return newProps;
}

export default connect(mapStateToProps)(AttackPanel);

