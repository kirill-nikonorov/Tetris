import {updateGameState} from '../../lib/reduxActions/actions/game';
import {BLANK_FIELD} from '../../utils/matrix';
import {GAME_STATUSES, GAME_TIME} from '../../constants/Game';
import {
    createRandomFiguresList,
    getRandomFigure,
    findXCoordinateOfFieldCentredFigure
} from '../../utils/figure';
import { checkIsGameOn, checkIsGameOnPause} from '../../utils/gameStatus';
import {Map} from 'immutable';
import {findTheLowestCompatibleFigureYCoordinate} from '../../utils/field/findTheLowestCompatibleFigureYCoordinate';

const {GAME_IS_ON, GAME_IS_ON_PAUSE, GAME_IS_OVER} = GAME_STATUSES;

const resumeGame = () => updateGameState({gameStatus: GAME_IS_ON});

const pauseGame = () => updateGameState({gameStatus: GAME_IS_ON_PAUSE});

export const toggleGameOn = () => (dispatch, getState) => {
    const gameStatus = getState()
        .get('gameState')
        .get('gameStatus');
    const isGameOnPause = checkIsGameOnPause(gameStatus);

    if (isGameOnPause) dispatch(resumeGame());
    else dispatch(startNewGame());
};

export const togglePause = () => (dispatch, getState) => {
    const gameStatus = getState()
        .get('gameState')
        .get('gameStatus');
    if (checkIsGameOnPause(gameStatus)) dispatch(resumeGame());
    if (checkIsGameOn(gameStatus)) dispatch(pauseGame());
};

export const startNewGame = () => (dispatch, getState) => {
    const customFiguresData = getState().get('customFiguresData');
    const customFigures = customFiguresData.get('customFigures') || Map({});

    const field = BLANK_FIELD;
    const newFigure = getRandomFigure(customFigures);

    const xCoordinate = findXCoordinateOfFieldCentredFigure(newFigure);

    dispatch(
        updateGameState({
            gameStatus: GAME_IS_ON,
            boardState: {
                field,
                currentFigure: newFigure,
                nextFiguresList: createRandomFiguresList(customFigures),
                figureCoordinate: {x: xCoordinate, y: 0},
                shadowY: findTheLowestCompatibleFigureYCoordinate(field, newFigure, xCoordinate)
            },
            gameStatistic: {gameScore: 0},
            gameTime: GAME_TIME
        })
    );
};

export const endGame = () => dispatch => {
    dispatch(updateGameState({gameStatus: GAME_IS_OVER}));
    console.log('ИГРА законченна');
};
