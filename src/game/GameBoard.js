import React, {Component} from 'react';
import { connect } from 'react-redux';
import GameTile from './GameTile';
import styled from 'styled-components';

const Wrapper = styled.section`
  font-size: 1.5em;
  line-height: 1.8em;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(15, 1fr);
  grid-template-columns: repeat(15, 1fr);
`;

class GameBoard extends Component {

  render() {
    if (this.props.grid) {
      let rows = this.props.grid.map((cell) => {
        return <GameTile key={'grid-cell-' + cell.x + ',' + cell.y} tile={cell}/>;
      });

      return (
          <Wrapper>{rows}</Wrapper>
      );
    } else {
      return <p>No data...</p>;
    }
  }

  drawSomething() {}

}

function mapStateToProps(state) {
  return {
    grid: state.grid
  };
}

export default connect(mapStateToProps)(GameBoard);