import React from 'react';
import { movePlayerActionCreators } from '../redux';
import { connect } from 'react-redux';
import { Button, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PlayerControlsPanel = (props) => {
  const moveNorth = () => {
    props.dispatch(movePlayerActionCreators.movePlayer('north'));
  };

  const moveSouth = () => {
    props.dispatch(movePlayerActionCreators.movePlayer('south'));
  };

  const moveEast = () => {
    props.dispatch(movePlayerActionCreators.movePlayer('east'));
  };

  const moveWest = () => {
    props.dispatch(movePlayerActionCreators.movePlayer('west'));
  };

  return (<Segment textAlign={'center'}>
    <h3>Player Controls</h3>
    <Button icon="arrow up" disabled={!props.gameRunning} onClick={moveNorth} /><br/>
    <Button icon="arrow left" disabled={!props.gameRunning} onClick={moveWest} />
    <Button icon="arrow right" disabled={!props.gameRunning} onClick={moveEast} /><br/>
    <Button icon="arrow down" disabled={!props.gameRunning} onClick={moveSouth} />
  </Segment>);
};

function mapStateToProps(state) {
  return {
    gameRunning: state.game.gameRunning
  };
}

PlayerControlsPanel.propTypes = {
  dispatch: PropTypes.func,
  gameRunning: PropTypes.bool
};


export default connect(mapStateToProps)(PlayerControlsPanel);
