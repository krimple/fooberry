import {take, put, select} from 'redux-saga/effects';
import { delay } from 'redux-saga';

const SEND_TOAST_MESSAGE = 'fooberry/toast/SEND_TOAST_MESSAGE';
const LOWER_TOAST_MESSAGE = 'fooberry/toast/LOWER_TOAST_MESSAGE';
const TOAST_TIME_TICK = 'fooberry/toast/TOAST_TIME_TICK';
const ACTIVATE_NEXT_TOAST = 'fooberry/toast/ACTIVATE_NEXT_TOAST';

const initialState = {
  pendingToasts: [],
  activeToast: null,
  secondsLeft: 0
};

export default function reducer(state = initialState, action) {
  let nextState;
  switch(action.type) {
  case SEND_TOAST_MESSAGE:
    nextState = Object.assign(
      {},
      state,
      {
        pendingToasts: [
          ...state.pendingToasts,
          {
            message: action.payload.toastMessage,
            numSeconds: action.payload.numSeconds
          }
        ]
      }
    );
    break;
  case LOWER_TOAST_MESSAGE:
    nextState = Object.assign(
      {},
      state,
      {
        activeToast: null,
        numSeconds: 0
      }
    );
    break;
  case TOAST_TIME_TICK:
    if (state.activeToast && state.secondsLeft > 0) {
      nextState = {
        ...state, 
        secondsLeft: state.secondsLeft - 1};
    }
    break;
  case ACTIVATE_NEXT_TOAST:
    if (state.pendingToasts.length > 0) {
      const nextToast = state.pendingToasts.slice(0, 1)[0];
      const restToasts = state.pendingToasts.slice(1);
      const nextToastMessage = nextToast.message;
      const nextToastNumSeconds = nextToast.numSeconds;
      nextState = { ...state, 
        activeToast: nextToastMessage,
        secondsLeft: nextToastNumSeconds,
        pendingToasts: restToasts
      };
    }
    break;

  default:
    nextState = state;
  }

  return nextState;
}

export function sendToastMessage(toastMessage, numSeconds=2) {
  return {
    type: SEND_TOAST_MESSAGE,
    payload: {
      toastMessage: toastMessage,
      numSeconds: numSeconds
    }
  };
}

export function lowerToast() {
  return {
    type: LOWER_TOAST_MESSAGE
  };
}

export function timeTick() {
  return {
    type: TOAST_TIME_TICK
  };
}

export function nextToast() {
  return {
    type: ACTIVATE_NEXT_TOAST
  };
}

export const sagas = [
  function* toastTimeTickSaga() {
    try {
      while(true) {
        yield take(ACTIVATE_NEXT_TOAST);
        const state = yield select();
        let secondsLeft = state.toast.secondsLeft;
        while (secondsLeft > 0) {
          yield put(timeTick());
          yield delay(1000);
          const state = yield select();
          secondsLeft = state.toast.secondsLeft;
        }
        yield put(lowerToast());
      }
    } catch (e) {
      console.log('toast time tick failed. ', e);
    }
  },
  
  function* manageToastsSaga() {
    try {
      while(true) {
        yield take([SEND_TOAST_MESSAGE, LOWER_TOAST_MESSAGE]);
        const state = yield select();
        const { pendingToasts, secondsLeft } = state.toast;
        // Do we have any pending messages, and are we done with our current message?
        if (pendingToasts.length > 0 && secondsLeft === 0) {
          // get the next message
          yield put(nextToast());
        }
      }
    } catch(e) {
      console.log('Activate new toast message failed', e);
    }
  }
];

