import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import GameTile from './GameTile';
import Point from '../../state/Point';
import styled from 'styled-components';

const Wrapper = styled.section`
  font-size: 1.5em;
  line-height: 1.8em;
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: repeat(15, 1fr);
  grid-template-columns: repeat(15, 1fr);
`;

class GameBoard extends Component {

  render() {
    const tiles = [];
    if (this.props.grid) {
      for (let y = 0; y < Point.maxY; y++) {
        for (let x = 0; x < Point.maxY; x++) {
          tiles.push(<GameTile key={'grid-cell-' + x + ',' + y} tile={this.props.grid.getIn([y, x])}/>);
        }
      }

      return (
        <Wrapper>{tiles}</Wrapper>
      );
    } else {
      return <p>No data...</p>;
    }
  }

  drawSomething() {
  }

}

function mapStateToProps(state) {
  return {
    grid: state.game.get('grid')
  };
}

GameBoard.propTypes = {
  grid: PropTypes.object
};

export default connect(mapStateToProps)(GameBoard);
