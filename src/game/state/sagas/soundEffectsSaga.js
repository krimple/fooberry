import { Howl } from 'howler';
import * as gameActions from '../reducers/game/gameActions';
import {take} from 'redux-saga/effects';

let themeMusic = new Howl({
  src: ['/sfx/gameplay-music.mp3'],
  volume: 0.5,
  loop: true
}); 

let attackMusic = new Howl({
  src: ['/sfx/attack-music.mp3'],
  volume: 0.7,
  loop: true
});

export function* startGameSoundEffectSaga() {
  try {
    while (true) {
      yield take(gameActions.BEGIN_GAME);
      themeMusic.play();

      yield take(gameActions.END_GAME);
      themeMusic.fade(0.5, 0, 1000);

    }
  } catch (e) {
    throw `Error in playAttackSoundSaga = ${e}`;
  }
}

export function* playAndStopAttackMusicSaga() {
  try {
    while(true) {
      yield take(gameActions.BEGIN_ATTACK);
      themeMusic.stop();
      attackMusic.play();

      yield take(gameActions.END_ATTACK);
      attackMusic.stop();
      themeMusic.play();
      themeMusic.fade(0, 0.5, 100);
    }
  } catch (e) {
    throw `Error in playAttackSoundSaga = ${e}`;
  }
}


