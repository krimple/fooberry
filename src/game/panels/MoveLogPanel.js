import React, {Component} from 'react';
import {connect} from 'react-redux';
import PanelContainer from './PanelContainer';

class MoveLogPanel extends Component {

  render() {
    const moves = !this.props.moves ? [] : this.props.moves.slice(0, 8).map((move, idx) => {
      return <div key={'moves-' + idx}>{move}</div>;
    });

    return (
        <PanelContainer>
          <h3>Moves</h3>
          {moves}
        </PanelContainer>
    );
  }
}

function mapStateToProps(state) {
    return {
      moves: state.game.get('moves')
    };
}
const panel = connect(mapStateToProps)(MoveLogPanel);
export default panel;
