import {checkIsGameOnPause} from '../../../utils/gameStatus';
import {resumeGame} from './actions';
import {startNewGame} from './startNewGame';

export const toggleGameOn = () => (dispatch, getState) => {
    const gameStatus = getState().getIn(['gameState', 'gameStatus']);
    const isGameOnPause = checkIsGameOnPause(gameStatus);

    if (isGameOnPause) dispatch(resumeGame());
    else dispatch(startNewGame());
};
