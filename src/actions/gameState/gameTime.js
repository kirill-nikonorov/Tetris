import {updateGameState} from '../../lib/reduxActions/actions/game';
import {GAME_STATUSES} from '../../constants/Game';

export const reduceGameTimeOnSec = () => (dispatch, getState) => {
    const gameTime = getState()
        .get('gameState')
        .get('gameTime');

    const newState = {gameTime: gameTime - 1};

    if (gameTime - 1 === 0) {
        newState.gameStatus = GAME_STATUSES.GAME_IS_OVER;
    }

    dispatch(updateGameState(newState));
};
