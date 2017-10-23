import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header, Modal} from 'semantic-ui-react';

import * as gameActionCreators from '../../state/reducers/game/gameActionCreators';

class AttackPanel extends Component {
  constructor(props) {
    super(props);
    this.lowerPanel = this.lowerPanel.bind(this);
  }
  render() {
    return (
      <div>
        <Modal open={this.props.attacking}>
          <Modal.Header>Attack the Thief!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>You are attacking the Thief</Header>
              <p>Is it okay to attack?</p>
              <button onClick={this.lowerPanel}>OK</button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }

  lowerPanel() {
    this.props.dispatch(gameActionCreators.endAttackCreator());
  }
}

AttackPanel.propTypes = {
  attacking: PropTypes.bool,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  console.log(`attack state: ${state.game.attacking}`);
  return {
    attacking: state.game.attacking
  };
}

export default connect(mapStateToProps)(AttackPanel);
