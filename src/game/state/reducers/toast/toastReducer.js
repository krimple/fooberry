import * as toastActions from './toastActions';

const initialState = {
  pendingToasts: [],
  activeToast: null
};

export default function toastReducer(state = initialState, action) {
  let nextToast, pendingToasts, nextState;
  switch(action.type) {
  case toastActions.SEND_TOAST_MESSAGE:
    nextState = Object.assign(
      {},
      state,
      {
        pendingToasts: [...state.pendingToasts, action.payload.toastMessage ]
      }
    );
    break;
  case toastActions.LOWER_TOAST_MESSAGE:
    if (state.pendingToasts.length > 0) {
      nextToast = state.pendingToasts.slice(0, 1);
    } else {
      nextToast = null;
    }
    pendingToasts = [...state.pendingToasts.slice(1)];
    nextState = Object.assign(
      {},
      state,
      {
        activeToast: nextToast,
        pendingToasts: pendingToasts
      }
    );
    break;
  default:
    nextState = state;
  }

  return nextState;
}
