import React, {Component} from 'react';
import GameBoard from './GameBoard';
import ControlPanel from './ControlPanel';
import './GamePanel.css';

export default class GamePanel extends Component {
  render() {
    return (
        <div>
          <ControlPanel />
          <div className="GamePanel">
            <h3>FOOBERRY</h3>
            <GameBoard />
          </div>
        </div>
    );
  }
}
