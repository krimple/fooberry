import React, {Component} from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AttackPanel from './AttackPanel';
import GameTile from './GameTile';
import Point2 from '../../state/Point2';

const BoardWrapper = styled.section`
  font-size: 1.5em;
  line-height: 1.8em;
  width: auto;
  display: grid;
  grid-gap: 1px;
  grid-auto-flow: row;
  grid-template-rows: repeat(15, 1fr);
  grid-template-columns: repeat(15, 1fr);
`;

class GameBoard extends Component {

  render() {
    const tiles = [];
    if (Point2.maxX) {
      for (let y = 0; y < Point2.maxY + 1; y++) {
        for (let x = 0; x < Point2.maxX + 1; x++) {
          tiles.push(
            <GameTile key={'grid-cell-' + x + ',' + y} x={x} y={y} />
          );
        }
      }

      return (
        <Container>
          <AttackPanel />
          <Segment><span>{ this.props.toast }</span></Segment>
          <BoardWrapper>{tiles}</BoardWrapper>
        </Container>
      );
    } else {
      return <p>No data...</p>;
    }
  }

  drawSomething() {
  }
}

GameBoard.propTypes = {
  toast: PropTypes.string
};

function mapStateToProps(state) {
  return {
    toast: state.toast.activeToast
  };
}

export default connect(mapStateToProps)(GameBoard);


