import {updateGameState} from '../../../lib/reduxActions/actions/game';

import {GAME_STATUSES} from '../../../constants/Game';

const {GAME_IS_ON, GAME_IS_ON_PAUSE, GAME_IS_OVER} = GAME_STATUSES;

export const resumeGame = () => updateGameState({gameStatus: GAME_IS_ON});

export const pauseGame = () => updateGameState({gameStatus: GAME_IS_ON_PAUSE});

export const endGame = () => updateGameState({gameStatus: GAME_IS_OVER});
