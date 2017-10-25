import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Grid, Segment, Menu, Container, Header } from 'semantic-ui-react';

import * as actionCreators from './state/reducers/player/playerActionCreators';
import * as gameActionCreators from './state/reducers/game/gameActionCreators';
import GameBoard from './panels/game-board/GameBoard';
import PanelContainer from './panels/PanelContainer';

class Game extends Component {

  constructor(props) {
    super(props);
    this.moveEast = this.moveEast.bind(this);
    this.moveWest = this.moveWest.bind(this);
    this.moveNorth = this.moveNorth.bind(this);
    this.moveSouth = this.moveSouth.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  render() {
    let gameRunningSegment = (
      <Segment>
        <h3>Player Controls</h3>
        <Button icon="arrow left" onClick={this.moveWest} />
        <Button icon="arrow up" onClick={this.moveNorth} />
        <Button icon="arrow down" onClick={this.moveSouth} />
        <Button icon="arrow right" onClick={this.moveEast} />
      </Segment>
    );

    let startGameSegment = <Button onClick={ this.startGame }>Start Game</Button>;

    let endGameSegment = <Button onClick={ this.endGame }>End Game</Button>;

    return (
      <div>
        <Menu fixed="top" inverted>
          <Container fluid textAlign='left'>
            <Menu.Item as='a' header>
              <Header inverted={true}>
              Foobery
              </Header>
            </Menu.Item>
          </Container>
        </Menu>
        <Container fluid style={{marginTop: '7em',  maxWidth: '1024px', width: '800px'}}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={7}>
                <Segment textAlign="center" disabled={!this.props.gameRunning}>
                  { gameRunningSegment }
                </Segment>
                <Segment textAlign="center">
                  <h3>Game Control</h3>
                  { this.props.gameRunning ? endGameSegment : startGameSegment }
                </Segment>
                <PanelContainer />
              </Grid.Column>
              <Grid.Column width={9}>
                <GameBoard />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }

  moveNorth() {
    this.props.dispatch(actionCreators.move('north'));
  }

  moveSouth() {
    this.props.dispatch(actionCreators.move('south'));
  }

  moveEast() {
    this.props.dispatch(actionCreators.move('east'));
  }

  moveWest() {
    this.props.dispatch(actionCreators.move('west'));
  }

  startGame() {
    this.props.dispatch(gameActionCreators.beginGame());
  }

  endGame() {
    this.props.dispatch(gameActionCreators.endGame());
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  gameRunning: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    gameRunning: state.game.gameRunning
  };
}
export default connect(mapStateToProps)(Game);
