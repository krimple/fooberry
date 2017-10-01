import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createGameStore from './game/state/createGameStore';
import * as actionCreators from './game/state/gameStoreActionCreators';
import GamePanel from './game/GamePanel';

import './App.css';

const store = createGameStore();

setInterval(() => {
  console.log('updating tile', new Date());
  store.dispatch(actionCreators.changeRandomTile());
}, 100);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <GamePanel width={800} height={600}></GamePanel>
        </Provider>
    );
  }
}

export default App;
