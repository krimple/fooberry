import React, {Component} from 'react';
import {connect} from 'react-redux';
import GameTile from './GameTile';
import CoordinateHelper from './utils/CoordinateHelper';

class GamePanel extends Component {

  constructor(props) {
    super(props);
    this.drawSomething = this.drawSomething.bind(this);
  }

  render() {
    if (!this.props.grid) {
      return <p>Not rendered</p>;
    }

    const tiles = this.props.grid.map((tile, idx) => {
      return <GameTile tile={tile} key={'tile-'+idx} />
    });

    return (
        <div className="gameBoard">
          {tiles}
        </div>
    );
  }

  drawSomething() {
  }
}

function mapStateToProps(state) {
  return {
    grid: state.grid,
    numRows: state.numRows,
    numCols: state.numCols
  };
}

export default connect(mapStateToProps)(GamePanel);
