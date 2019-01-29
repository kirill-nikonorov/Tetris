import {setUpCustomFiguresData} from '../../lib/reduxActions/actions/customFigures';
import {updateGameState} from '../../lib/reduxActions/actions/game';
import {getRandomFigure} from '../../utils/figure';
import {findTheLowestCompatibleFigureYCoordinate} from "../../utils/field/findTheLowestCompatibleFigureYCoordinate";
import {checkIsGameAlive, checkIsGameOn} from "../../utils/gameStatus";

export const saveFigure = ({figureData: {name, fieldCoordinates, figure, figureStyle}}) => (dispatch,
                                                                                            getState) => {
    const customFiguresData = getState().get('customFiguresData');
    const newData = customFiguresData
        .setIn(['customFigures', name], figure)
        .setIn(['figuresStyles', name], figureStyle)
        .setIn(['fieldCoordinates', name], fieldCoordinates);

    dispatch(setUpCustomFiguresData({newData}));
};

export const deleteCustomFigure = figureName => (dispatch, getState) => {
    const state = getState();

    const cleanedCustomFiguresData = cleanCustomFiguresDataFromDeletingFigure(
        state.get('customFiguresData'),
        figureName
    );

    dispatch(setUpCustomFiguresData({newData: cleanedCustomFiguresData}));

    const gameStatus = state.get('gameStatus');
    const isGameAlive = checkIsGameAlive(gameStatus);
    if (!isGameAlive) return;

    const cleanedBoardState = cleanBoardStateFromDeletingFigure(
        state.getIn(['gameState', 'boardState']),
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

const cleanBoardStateFromDeletingFigure = (boardState, figureName) => {
    const field = boardState.get('field');
    const cleanedField = field.map(row =>
        row.map(cell => (cell === figureName ? undefined : cell))
    );

    const currentFigure = boardState.get('currentFigure');
    const xCoordinate = boardState.getIn(['figureCoordinate', 'x']);

    const nextFiguresList = boardState.get('nextFiguresList');

    return {
        field: cleanedField,
        nextFiguresList: filterNextFiguresListFromDeletingFigure(nextFiguresList, figureName),
        shadowY: findTheLowestCompatibleFigureYCoordinate(cleanedField, currentFigure, xCoordinate)
    };
};

const filterNextFiguresListFromDeletingFigure = (nextFiguresList, figureName) => {
    let newList = nextFiguresList.filterNot(figure => {
        const rowWithName = figure.find(row => row.some(cell => !!cell));
        const currentFigureName = rowWithName.find(cell => !!cell);
        return currentFigureName === figureName;
    });

    for (let i = newList.size; i < 3; i++) {
        newList = newList.push(getRandomFigure());
    }
    return newList;
};
