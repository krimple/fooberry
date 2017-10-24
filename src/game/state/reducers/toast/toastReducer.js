import * as toastActions from './toastActions';

const initialState = {
  pendingToasts: [],
  activeToast: null,
  secondsLeft: 0
};

export default function toastReducer(state = initialState, action) {
  let nextState;
  switch(action.type) {
  case toastActions.SEND_TOAST_MESSAGE:
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
  case toastActions.LOWER_TOAST_MESSAGE:
    nextState = Object.assign(
      {},
      state,
      {
        activeToast: null,
        numSeconds: 0
      }
    );
    break;
  case toastActions.TOAST_TIME_TICK:
    if (state.activeToast && state.secondsLeft > 0) {
      nextState = Object.assign({}, state, { secondsLeft: state.secondsLeft - 1});
    }
    break;
  case toastActions.ACTIVATE_NEXT_TOAST:
    if (state.pendingToasts.length > 0) {
      const nextToast = state.pendingToasts.slice(0, 1)[0];
      const restToasts = state.pendingToasts.slice(1);
      const nextToastMessage = nextToast.message;
      const nextToastNumSeconds = nextToast.numSeconds;
      nextState = Object.assign({}, state, {
        activeToast: nextToastMessage,
        secondsLeft: nextToastNumSeconds,
        pendingToasts: restToasts
      });
    }
    break;

  default:
    nextState = state;
  }

  return nextState;
}
