import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createGameStore from './game/state/createGameStore';
import * as actionCreators from './game/state/gameStoreActionCreators';
import GamePanel from './game/GamePanel';

const store = createGameStore();

// setInterval(() => {
//   console.log('updating tile', new Date());
//   store.dispatch(actionCreators.changeRandomTile());
// }, 100);

class App extends Component {
  constructor(props) {
    super(props);
    this.processKeyStroke = this.processKeyStroke.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.processKeyStroke);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.processKeyStroke);
  }

  processKeyStroke(event) {
    let direction;
    switch (event.key) {
      case 'j':
        direction = 'west';
        break;

      case 'k':
        direction = 'north';
        break;

      case 'l':
        direction = 'south';
        break;

      case ';':
        direction = 'east';
        break;
    }
    if (direction) {
      store.dispatch(actionCreators.moveActionCreator(direction));
    }
  }
  
  render() {
    return (
        <Provider store={store}>
          <GamePanel/>
        </Provider>
    );
  }
}

export default App;
