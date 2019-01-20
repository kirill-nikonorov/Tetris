import {updateGameState} from '../lib/reduxActions/actions/game';
import {BLANK_FIELD} from '../utils/matrix';
import {GAME_STATUSES, GAME_TIME} from '../constants/Game';
import {
    findNewFigureAttributes,
    createRandomFiguresList,
    getRandomFigure,
    findTheLowestCompatibleFigureYCoordinate,
    findXCoordinateOfFieldCentredFigure
} from '../utils/figureOperations';
import {checkIsGameOver, checkIsGameOn, checkIsGameOnPause} from '../utils/gameStatusOperations';

const {GAME_IS_ON, GAME_IS_ON_PAUSE, GAME_IS_OVER, GAME_IS_IN_PRESTART_POSITION} = GAME_STATUSES;

export const toggleGameOn = () => (dispatch, getState) => {
    const gameStatus = getState().get('gameStatus');
    const isGameOnPause = checkIsGameOnPause(gameStatus);

    if (isGameOnPause) dispatch(resumeGame());
    else dispatch(startNewGame());
};

export const togglePause = () => (dispatch, getState) => {
    const gameStatus = getState().get('gameStatus');
    if (checkIsGameOnPause(gameStatus)) dispatch(resumeGame());
    if (checkIsGameOn(gameStatus)) dispatch(pauseGame());
};

const resumeGame = () => updateGameState({gameStatus: GAME_IS_ON});

const pauseGame = () => updateGameState({gameStatus: GAME_IS_ON_PAUSE});

export const startNewGame = () => dispatch => {
    const field = BLANK_FIELD;
    const newFigure = getRandomFigure();
    const xCoordinate = findXCoordinateOfFieldCentredFigure(newFigure);

    dispatch(
        updateGameState({
            gameStatus: GAME_IS_IN_PRESTART_POSITION,
            boardState: {
                field,
                currentFigure: newFigure,
                nextFiguresList: createRandomFiguresList(),
                figureCoordinate: {x: xCoordinate, y: 0},
                shadowY: findTheLowestCompatibleFigureYCoordinate(field, newFigure, xCoordinate)
            },
            gameStatistic: {gameScore: 0},
            gameTime: GAME_TIME
        })
    );
    setTimeout(() =>
        dispatch(
            updateGameState({
                gameStatus: GAME_IS_ON
            }),
            1
        )
    );
};

export const endGame = () => dispatch => {
    dispatch(updateGameState({gameStatus: GAME_IS_OVER}));
    console.log('ИГРА законченна');
};
