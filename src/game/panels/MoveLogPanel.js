import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Segment, Header, List } from 'semantic-ui-react';

class MoveLogPanel extends Component {

  render() {
    const moves = !this.props.moves ? [] : this.props.moves.slice(0, 8).map((move, idx) => {
      return (
        <List.Item key={'item-' + idx}>
          <List.Icon name="travel" />
          <List.Content>
            {move}
          </List.Content>
        </List.Item>
      );
    });

    return (
      <Segment>
        <Header>Move Log</Header>
        <List>
          {moves}
        </List>
      </Segment>
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
