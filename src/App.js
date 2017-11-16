import React, {Component} from 'react';
import createReduxStore from './game/redux/createReduxStore';
import { npcActionCreators } from './game/redux';
import {Provider} from 'react-redux';
import Game from './game/Game';

const store = createReduxStore();

store.dispatch(npcActionCreators.loadNPCs());

// setInterval(() => {
//   console.log('updating tile', new Date());
//   store.dispatch(actionCreators.changeRandomTile());
// }, 100);

class App extends Component {
  render() {
    if (store) {
      return (
        <Provider store={store}>
          <Game/>
        </Provider>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default App;
