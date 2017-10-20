import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class MoveLogPanel extends Component {

  render() {
    const moves = !this.props.moves ? [] : this.props.moves.slice(0, 8).map((move, idx) => {
      return <div key={'moves-' + idx}>{move}</div>;
    });

    return (
      <div>
        <h3>Moves</h3>
        {moves}
      </div>
    );
  }
}

MoveLogPanel.propTypes = {
  game: PropTypes.object,
  moves: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    moves: state.logger.moves
  };
}

const panel = connect(mapStateToProps)(MoveLogPanel);
export default panel;
