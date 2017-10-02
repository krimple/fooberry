import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createGameStore from './game/state/createGameStore';
import * as actionCreators from './game/state/gameStoreActionCreators';
import GamePanel from './game/GamePanel';

import './App.css';

const store = createGameStore();

/*setInterval(() => {
  console.log('updating tile', new Date());
  store.dispatch(actionCreators.changeRandomTile());
}, 100);*/

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
    console.dir(event);
    switch (event.key) {
      case 'j':
        console.log('west');
        store.dispatch(actionCreators.moveActionCreator('west'));
        break;

      case 'k':
        console.log('north');
        store.dispatch(actionCreators.moveActionCreator('north'));
        break;

      case 'l':
        console.log('south');
        store.dispatch(actionCreators.moveActionCreator('south'));
        break;

      case ';':
        console.log('east');
        store.dispatch(actionCreators.moveActionCreator('east'));
        break;
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
