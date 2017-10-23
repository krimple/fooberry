import * as toastActions from './toastActions';

export function sendToastMessageCreator(toastMessage, numSeconds=5) {
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
