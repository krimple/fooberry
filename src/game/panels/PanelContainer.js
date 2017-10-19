import React, { Component } from 'react';
import { Tab, Segment } from 'semantic-ui-react';

import PlayerInfoPanel from './PlayerInfoPanel';
import MoveLogPanel from './MoveLogPanel';

const panes = [
  { menuItem: 'Player Info',
    render: function playerInfoTab () {
      return <Tab.Pane>
        <PlayerInfoPanel />
      </Tab.Pane>;
    }
  },
  { menuItem: 'Moves',
    render: function movesTab() {
      return <Tab.Pane>
        <MoveLogPanel />
      </Tab.Pane>;
    }
  }
];

export default class PanelContainer extends Component {

  render() {
    return <Segment textAlign="center">
      <h3>Game Panels</h3>
      <Tab panes={panes} />
    </Segment>;
  }
}

