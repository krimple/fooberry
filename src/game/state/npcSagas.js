import * as actions from './gameStoreActions';
import * as actionCreators from './gameActionCreators';
import * as effects from 'redux-saga/effects';

export default function* thiefNPCSaga() {
  while (true) {
    yield effects.take(actions.MOVE_ACTION);
    yield effects.put(actionCreators.moveNPCThiefCreator());
  }
}
