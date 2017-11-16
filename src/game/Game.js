import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PlayerControlsPanel from './panels/PlayerControlsPanel';
import MessagePanel from './panels/MessagePanel';

import { Sidebar, Button, Grid, Segment, Menu, Container, Header } from 'semantic-ui-react';

import {  playerActionCreators, gameActionCreators, gameResetActionCreator } from './redux';

import GameBoard from './panels/game-board/GameBoard';
import PanelContainer from './panels/PanelContainer';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleVisibility = () => { 
      this.setState({ visible: !this.state.visible });
    };

    this.moveNorth = () => {
      this.props.dispatch(playerActionCreators.move('north'));
    };

    this.moveSouth = () => {
      this.props.dispatch(playerActionCreators.move('south'));
    };

    this.moveEast = () => {
      this.props.dispatch(playerActionCreators.move('east'));
    };

    this.moveWest = () => {
      this.props.dispatch(playerActionCreators.move('west'));
    };

    this.startGame = () => {
      this.props.dispatch(gameResetActionCreator.resetGame());
    };

    this.endGame = () => {
      this.props.dispatch(gameActionCreators.endGame());
    };
  }

  render() {
    let startGameSegment = <Button onClick={ this.startGame }>Start Game</Button>;
    let endGameSegment = <Button onClick={ this.endGame }>End Game</Button>;
 
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container fluid textAlign='left'>
            <Menu.Item as='a' header>
              <Header inverted={true}>Fooberry</Header>
            </Menu.Item>
            <Menu.Item as='a' onClick={this.toggleVisibility}>
              Game Settings
            </Menu.Item>
          </Container>
        </Menu>
        <Sidebar.Pushable as={Segment}>
          <PanelContainer visible={this.state.visible } />
          <Sidebar.Pusher>
            <Container fluid style={{marginTop: '50px',  maxWidth: '1024px', width: '800px'}}>
              Messages: <MessagePanel />
              <PanelContainer />
              <Grid>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <GameBoard />
                  </Grid.Column>
                  <Grid.Column width={5} textAlign='center'>
                    { this.props.gameRunning ? endGameSegment : startGameSegment }
                    <PlayerControlsPanel disabled={!this.props.gameRunning}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
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
