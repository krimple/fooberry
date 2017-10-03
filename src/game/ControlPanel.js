import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ControlPanel.css';

class ControlPanel extends Component {

  render() {
    const moves = this.props.moves.map((move) => {
      return <div>{move}</div>;
    });
    return (
        <div className="controlPanel">
          <h1>Control Panel</h1>
          <hr/>
          <h3>Moves</h3>
          {moves}
        </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    moves: state.moves
  };
}

export default connect(mapStateToProps)(ControlPanel);
