import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from './state/gameActionCreators';
import GameBoard from './panels/game-board/GameBoard';
import PanelContainer from './panels/PanelContainer';

const GameWrapper = styled.section`
  padding-top: 70px;
  padding-left: 100px;
  vertical-align: top;
  width: auto;
  padding-right: 50px;
`;

const ControlPanels = styled.section`
  float: left;
  width: 400px;
`;

class Game extends Component {

  constructor(props) {
    super(props);
    this.moveEast = this.moveEast.bind(this);
    this.moveWest = this.moveWest.bind(this);
    this.moveNorth = this.moveNorth.bind(this);
    this.moveSouth = this.moveSouth.bind(this);
  }

  render() {
    return (
      <GameWrapper>
        <ControlPanels>
          <button onClick={this.moveWest}>W</button>
          <button onClick={this.moveNorth}>N</button>
          <button onClick={this.moveSouth}>S</button>
          <button onClick={this.moveEast}>E</button>
          <PanelContainer />
        </ControlPanels>
        <GameBoard />
      </GameWrapper>
    );
  }

  moveNorth() {
    this.props.dispatch(actionCreators.moveActionCreator('north'));
  }

  moveSouth() {
    this.props.dispatch(actionCreators.moveActionCreator('south'));
  }

  moveEast() {
    this.props.dispatch(actionCreators.moveActionCreator('east'));
  }

  moveWest() {
    this.props.dispatch(actionCreators.moveActionCreator('west'));
  }
}

Game.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Game);
