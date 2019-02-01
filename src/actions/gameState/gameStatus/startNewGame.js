import {Map} from 'immutable';
import {
    createRandomFiguresList,
    findXCoordinateOfFieldCentredFigure,
    getRandomFigure
} from '../../../utils/figure';
import {GAME_TIME} from '../../../constants/Game';
import {findTheLowestCompatibleFigureYCoordinate} from '../../../utils/field';
import {updateGameState} from '../../../lib/reduxActions/actions/game';
import {BLANK_FIELD} from '../../../utils/matrix';

import {GAME_STATUSES} from '../../../constants/Game';

const {GAME_IS_ON} = GAME_STATUSES;

export const startNewGame = () => (dispatch, getState) => {
    const customFiguresData = getState().get('customFiguresData');
    const customFigures = customFiguresData.get('customFigures') || Map({});

    const field = BLANK_FIELD;
    const currentFigure = getRandomFigure(customFigures);

    const xCoordinate = findXCoordinateOfFieldCentredFigure(currentFigure);

    dispatch(
        updateGameState({
            gameStatus: GAME_IS_ON,
            boardState: {
                field,
                currentFigure,
                nextFiguresList: createRandomFiguresList(customFigures),
                figureCoordinate: {x: xCoordinate, y: 0},
                shadowY: findTheLowestCompatibleFigureYCoordinate(field, currentFigure, xCoordinate)
            },
            gameStatistic: {gameScore: 0},
            gameTime: GAME_TIME
        })
    );
};
