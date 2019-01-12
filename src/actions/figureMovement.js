import {updateGameState} from '../lib/reduxActions/actions/game';
import {DIRECTION, HORIZONTAL_CELLS_COUNT} from '../constants/Game';
import {fromJS, List} from "immutable"
import {drawFigureOnField} from "../utils/Field"
import {
    findTheLowestCompatibleFigureYCoordinate,
    checkIsFigureCompatibleWithField,
    createNextFigureWithAttributes
} from '../utils/helpers/index'
import {
    checkIsWithinTopBound,
    checkIsWithinBottomBound,
    checkIsWithinRightBound,
    checkIsWithinLeftBound,
    checkIsWithinAllBounds
} from '../utils/helpers/boundComplianceCheckers'
import {endGame} from './gameStatus'

const cleanFieldFromFilledRows = (field) => {
    let deletedCount = 0;
    const fieldWithoutFilledRows = field.filterNot((row) => {
        if (row.every(cell => cell === 1)) {
            deletedCount++;
            return true;
        } else return false;
    });
    if (deletedCount) {
        let emptyArrays = [];
        for (let i = 0; i < deletedCount; i++) {
            emptyArrays.push(List(new Array(HORIZONTAL_CELLS_COUNT).fill(0)))
        }
        return fieldWithoutFilledRows.unshift(...emptyArrays);
    }

    else return fieldWithoutFilledRows;
};

const rotateFigure = (figure) => {
    const rotateFigure = figure.slice();
    return rotateFigure.withMutations(rotateFigure =>
        figure.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex, arr) => {
                rotateFigure.setIn([cellIndex, arr.size - 1 - rowIndex], cell);
            })
        }))
};

export const moveFigure = (direction) => (dispatch, getState) => {
    const state = getState();
    const isGameAlive = state.get('isGameAlive');

    if (!isGameAlive) return;
    const field = state.get('field');
    const figureCoordinate = state.get('figureCoordinate') || fromJS({});
    const figure = state.get('figure') || fromJS([[]]);
    const y = figureCoordinate.get('y') || 0;
    const x = figureCoordinate.get('x') || 0;
    let newState;


    switch (direction) {
        case (DIRECTION.RIGHT): {

            const newX = x + 1;

            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(field, figure, newX, y, (cellX) => checkIsWithinRightBound(cellX))
            if (!isNextStepCompatibleWithField) return;
            newState = {
                figureCoordinate: {x: newX},
                shadowY: findTheLowestCompatibleFigureYCoordinate(field, figure, newX, y)
            };

            break;
        }

        case (DIRECTION.LEFT): {
            const newX = x - 1;

            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(field, figure, newX, y, (cellX) => checkIsWithinLeftBound(cellX));
            if (!isNextStepCompatibleWithField) return;
            newState = {
                figureCoordinate: {x: newX},
                shadowY: findTheLowestCompatibleFigureYCoordinate(field, figure, newX, y)
            };

            break;
        }

        case (DIRECTION.UP): {

            const newY = y - 1;
            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(field, figure, x, newY, (cellX, cellY) => checkIsWithinTopBound(cellY));
            if (!isNextStepCompatibleWithField) return;
            newState = {
                figureCoordinate: {y: y - 1},
                shadowY: findTheLowestCompatibleFigureYCoordinate(field, figure, x, newY)
            };

            break;
        }
        case (DIRECTION.DOWN): {

            const newY = y + 1;

            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(field, figure, x, newY, (cellX, cellY) => checkIsWithinBottomBound(cellY));
            if (isNextStepCompatibleWithField) {
                newState = {figureCoordinate: {y: newY}}
            }
            else {
                const newField = cleanFieldFromFilledRows(drawFigureOnField(field, figure, y, x));
                const newFigureWithAttributes = createNextFigureWithAttributes(field, false);
                const {
                    figureCoordinate: {x: newFigureX},
                    figure: newFigure
                } = newFigureWithAttributes;

                newState = {
                    figure: newFigure,
                    figureCoordinate: {x: newFigureX, y: 0},
                    shadowY: findTheLowestCompatibleFigureYCoordinate(newField, newFigure, newFigureX, 0),
                    field: newField
                };

                handleInsertingResults(newField, newFigure, newFigureX, dispatch);
            }
            break;
        }
        case (DIRECTION.AROUND_ITS_AXIS): {
            const routedFigure = rotateFigure(figure);

            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(field, routedFigure, x, y, checkIsWithinAllBounds);
            if (!isNextStepCompatibleWithField) return;
            newState = {
                figure: routedFigure,
                shadowY: findTheLowestCompatibleFigureYCoordinate(field, routedFigure, x, y)
            };

            break;
        }
    }

    if (newState) dispatch(updateGameState(newState))
};


const handleInsertingResults = (field, figure, x, dispatch) => {
    const isNewFigureIsCompatibleWithField = checkIsFigureCompatibleWithField(field, figure, x, 0);

    if (isNewFigureIsCompatibleWithField) {
        console.log('Оказалась совместима ');
    }
    else {
        console.log('Оказалась Не совместима ');
        dispatch(endGame())
    }
};

