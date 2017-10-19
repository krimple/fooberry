import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Grid, Segment, Menu, Container, Header } from 'semantic-ui-react';

import * as actionCreators from './state/gameActionCreators';
import GameBoard from './panels/game-board/GameBoard';
import PanelContainer from './panels/PanelContainer';

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
      <div>
        <Menu fixed="top" inverted>
          <Container fluid textAlign='left'>
            <Menu.Item as='a' header>
              <Header inverted="true">
              Foobery
              </Header>
            </Menu.Item>
          </Container>
        </Menu>
        <Container fluid style={{marginTop: '7em',  maxWidth: '1024px', width: '800px'}}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={7}>
                <Segment textAlign="center">
                  <h3>Player Controls</h3>
                  <Button icon="arrow left" onClick={this.moveWest} />
                  <Button icon="arrow up" onClick={this.moveNorth} />
                  <Button icon="arrow down" onClick={this.moveSouth} />
                  <Button icon="arrow right" onClick={this.moveEast} />
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
