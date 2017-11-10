import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class MoveLogPanel extends Component {

  render() {
    // SHOW STUFF HERE
    return (<p>Show a log</p>);
  }

}

MoveLogPanel.propTypes = {
  // game: PropTypes.object,
  moves: PropTypes.array.isRequired
};

