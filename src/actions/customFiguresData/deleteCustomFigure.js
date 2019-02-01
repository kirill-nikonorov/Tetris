import {setUpCustomFiguresData} from '../../lib/reduxActions/actions/customFigures';
import {findXCoordinateOfFieldCentredFigure, getRandomFigure} from '../../utils/figure';
import {checkIsGameAlive} from '../../utils/gameStatus';
import {findTheLowestCompatibleFigureYCoordinate} from '../../utils/field';
import {updateGameState} from '../../lib/reduxActions/actions/game';

export const deleteCustomFigure = figureName => (dispatch, getState) => {
    const state = getState();

    const cleanedCustomFiguresData = cleanCustomFiguresDataFromDeletingFigure(
        state.get('customFiguresData'),
        figureName
    );

    dispatch(setUpCustomFiguresData({newData: cleanedCustomFiguresData}));

    const gameState = state.get('gameState');
    const gameStatus = gameState.get('gameStatus');
    const isGameAlive = checkIsGameAlive(gameStatus);

    if (!isGameAlive) return;

    const cleanedBoardState = cleanBoardStateFromDeletingFigure(
        gameState.get('boardState'),
        figureName
    );

    dispatch(updateGameState({boardState: cleanedBoardState}));
};

const cleanCustomFiguresDataFromDeletingFigure = (customFiguresData, figureName) => {
    return customFiguresData
        .deleteIn(['customFigures', figureName])
        .deleteIn(['figuresStyles', figureName])
        .deleteIn(['fieldCoordinates', figureName]);
};

const cleanBoardStateFromDeletingFigure = (boardState, deletingFigureName) => {
    const field = boardState.get('field');
    const cleanedField = field.map(row =>
        row.map(cell => (cell === deletingFigureName ? undefined : cell))
    );

    const nextFiguresList = boardState.get('nextFiguresList');

    let newBoardState = {
        field: cleanedField,
        nextFiguresList: filterNextFiguresListFromDeletingFigure(
            nextFiguresList,
            deletingFigureName
        )
    };

    let currentFigure = boardState.get('currentFigure');
    let xCoordinate = boardState.getIn(['figureCoordinate', 'x']);

    if (findFigureName(currentFigure) === deletingFigureName) {
        currentFigure = getRandomFigure();
        xCoordinate = findXCoordinateOfFieldCentredFigure(currentFigure);
        newBoardState = {...newBoardState, currentFigure, figureCoordinate: {x: xCoordinate, y: 0}};
    }

    newBoardState.shadowY = findTheLowestCompatibleFigureYCoordinate(
        cleanedField,
        currentFigure,
        xCoordinate
    );

    return newBoardState;
};

const filterNextFiguresListFromDeletingFigure = (nextFiguresList, deletingFigureName) => {
    let newList = nextFiguresList.filterNot(figure => {
        const figureName = findFigureName(figure);
        return deletingFigureName === figureName;
    });

    for (let i = newList.size; i < 3; i++) {
        newList = newList.push(getRandomFigure());
    }
    return newList;
};

const findFigureName = figure => {
    const rowWithName = figure.find(row => row.some(cell => !!cell));
    return rowWithName.find(cell => !!cell);
};
