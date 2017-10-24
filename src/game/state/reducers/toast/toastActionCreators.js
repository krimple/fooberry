import * as toastActions from './toastActions';

export function sendToastMessage(toastMessage, numSeconds=2) {
  return {
    type: toastActions.SEND_TOAST_MESSAGE,
    payload: {
      toastMessage: toastMessage,
      numSeconds: numSeconds
    }
  };
}

export function lowerToast() {
  return {
    type: toastActions.LOWER_TOAST_MESSAGE
  };
}

export function timeTick() {
  return {
    type: toastActions.TOAST_TIME_TICK
  };
}

export function nextToast() {
  return {
    type: toastActions.ACTIVATE_NEXT_TOAST
  };
}
