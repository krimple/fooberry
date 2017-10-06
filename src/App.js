import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createGameStore from './game/state/createReduxStore';

import Game from './game/Game';
const store = createGameStore();

// setInterval(() => {
//   console.log('updating tile', new Date());
//   store.dispatch(actionCreators.changeRandomTile());
// }, 100);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Game />
        </Provider>
    );
  }
}

export default App;
