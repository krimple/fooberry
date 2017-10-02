import React, {Component} from 'react';
import GameBoard from './GameBoard';
import ControlPanel from './ControlPanel';

export default class GamePanel extends Component {
  render() {
    return (
        <div className="container">
          <ControlPanel />
          <GameBoard />
        </div>
    );
  }
}
