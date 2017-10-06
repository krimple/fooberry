import React, {Component} from 'react';
import styled from 'styled-components';
import { NavLink, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './state/createReduxStore';

import MoveLogPanel from './panels/MoveLogPanel';
import PlayerInfoPanel from './panels/PlayerInfoPanel';
import GamePanel from './panels/game-board/GamePanel';

const Wrapper = styled.section`
  padding-top: 70px;
  padding-left: 100px;
  vertical-align: top;
  float: left;
  padding-right: 50px;
  width: auto;
`;

export default class Game extends Component {
  render() {
    return (
        <Wrapper>
          <h1>Control Panel</h1>
          <hr/>
          <ConnectedRouter history={history}>
            <div className="ControlPanels">
              <NavLink className="link" activeClassName="active" to="/moves">Moves</NavLink> |
              <NavLink className="link" activeClassName="active" to="/playerInfo">Player</NavLink> |
              <NavLink className="link" activeClassName="active" to="/gameBoard">Game Board</NavLink>
              <Route from="/" exact={true} to="/gameBoard"/>
              <Route path="/moves" exact={true} component={MoveLogPanel}/>
              <Route path="/playerInfo" exact={true} component={PlayerInfoPanel}/>
              <Route path="/gameBoard" exact={true} component={GamePanel}/>
            </div>
          </ConnectedRouter>
        </Wrapper>
    );
  }
}

