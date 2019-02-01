import {checkIsGameOn, checkIsGameOnPause} from '../../../utils/gameStatus';
import {pauseGame, resumeGame} from './actions';

export const togglePause = () => (dispatch, getState) => {
    const gameStatus = getState().getIn(['gameState', 'gameStatus']);

    if (checkIsGameOnPause(gameStatus)) dispatch(resumeGame());
    if (checkIsGameOn(gameStatus)) dispatch(pauseGame());
};
