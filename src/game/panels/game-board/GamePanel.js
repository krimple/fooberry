import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import * as actionCreators from '../../state/gameActionCreators';

class GamePanel extends Component {

  constructor(props) {
    super(props);
    this.processKeyStroke = this.processKeyStroke.bind(this);
  }

  render() {
    return (
      <div>
        <GameBoard/>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('keydown', this.processKeyStroke);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.processKeyStroke);
  }

  processKeyStroke(event) {
    let direction;
    switch (event.key) {
    case 'j':
      direction = 'west';
      break;

    case 'k':
      direction = 'north';
      break;

    case 'l':
      direction = 'south';
      break;

    case ';':
      direction = 'east';
      break;
    default:
    }
    if (direction) {
      this.props.dispatch(actionCreators.moveActionCreator(direction));
    }
  }
}

GamePanel.propTypes = {
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    playerName: state.game.getIn(['atoms', 'player', 'name'])
  };
}

GamePanel.propTypes = {
  playerName: PropTypes.string
};

export default connect(mapStateToProps)(GamePanel);
