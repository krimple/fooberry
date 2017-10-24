import {take, put, select} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../reducers/toast/toastActions';
import * as actionCreators from '../reducers/toast/toastActionCreators';

export function* toastTimeTickSaga() {
  try {
    while(true) {
      yield take(actions.ACTIVATE_NEXT_TOAST);
      const state = yield select();
      let secondsLeft = state.toast.secondsLeft;
      while (secondsLeft > 0) {
        yield put(actionCreators.timeTick());
        yield delay(1000);
        const state = yield select();
        secondsLeft = state.toast.secondsLeft;
      }
      yield put(actionCreators.lowerToast());
    }
  } catch (e) {
    console.log('toast time tick failed. ', e);
  }
}

export function* manageToastsSaga() {
  try {
    while(true) {
      yield take([actions.SEND_TOAST_MESSAGE, actions.LOWER_TOAST_MESSAGE]);
      console.log('got an action');
      const state = yield select();
      const { pendingToasts, secondsLeft } = state.toast;
      // Do we have any pending messages, and are we done with our current message?
      if (pendingToasts.length > 0 && secondsLeft === 0) {
        // get the next message
        console.log('sending next toast');
        yield put(actionCreators.nextToast());
      }
    }
  } catch(e) {
    console.log('Activate new toast message failed', e);
  }
}
