import React, { Component } from 'react';
import { Menu, Sidebar, Tab } from 'semantic-ui-react';

import PlayerInfoPanel from './PlayerInfoPanel';
import MoveLogPanel from './MoveLogPanel';
import PropTypes from 'prop-types';

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
    return (
      <div>
        <Sidebar as={Menu} visible={this.props.visible}
          size="small" width='wide' animation='overlay' vertical>
          <h3>Game Panels</h3>
          <Tab panes={panes} />
        </Sidebar>
      </div>);
  }
}

PanelContainer.propTypes = {
  visible: PropTypes.bool
};


