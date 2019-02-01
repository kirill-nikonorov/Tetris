import {updateGameState} from '../../lib/reduxActions/actions/game';
import {DIRECTION, GAME_STATUSES, HORIZONTAL_CELLS_COUNT} from '../../constants/Game';
import {fromJS, List} from 'immutable';
import {drawFigureOnField} from '../../utils/field/drawFigureOnField';
import {makeFiguresListStep, findXCoordinateOfFieldCentredFigure} from '../../utils/figure';
import {
    checkIsWithinTopBound,
    checkIsWithinBottomBound,
    checkIsWithinRightBound,
    checkIsWithinLeftBound,
    checkIsWithinAllBounds
} from '../../utils/boundComplianceCheck';
import {checkIsGameOn} from '../../utils/gameStatus';
import {checkIsFigureCompatibleWithField} from '../../utils/field';
import {findTheLowestCompatibleFigureYCoordinate} from '../../utils/field/findTheLowestCompatibleFigureYCoordinate';

export const moveFigure = direction => (dispatch, getState) => {
    const state = getState();

    const gameState = state.get('gameState');
    const boardState = gameState.get('boardState');
    const gameStatus = gameState.get('gameStatus');
    const isGameIsOn = checkIsGameOn(gameStatus);

    if (!isGameIsOn) return;
    const customFigures = state.get('customFiguresData').get('customFigures');

    const field = boardState.get('field');
    const currentFigure = boardState.get('currentFigure') || fromJS([[]]);
    const figureCoordinate = boardState.get('figureCoordinate') || fromJS({});
    const y = figureCoordinate.get('y') || 0;
    const x = figureCoordinate.get('x') || 0;
    const nextFiguresList = boardState.get('nextFiguresList');

    let newState;

    const gameStatistic = gameState.get('gameStatistic') || {};

    switch (direction) {
        case DIRECTION.RIGHT: {
            const newX = x + 1;

            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(
                field,
                currentFigure,
                newX,
                y,
                cellX => checkIsWithinRightBound(cellX)
            );
            if (!isNextStepCompatibleWithField) return;
            newState = {
                boardState: {
                    figureCoordinate: {x: newX},
                    shadowY: findTheLowestCompatibleFigureYCoordinate(field, currentFigure, newX, y)
                }
            };

            break;
        }
        case DIRECTION.LEFT: {
            const newX = x - 1;

            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(
                field,
                currentFigure,
                newX,
                y,
                cellX => checkIsWithinLeftBound(cellX)
            );
            if (!isNextStepCompatibleWithField) return;
            newState = {
                boardState: {
                    figureCoordinate: {x: newX},
                    shadowY: findTheLowestCompatibleFigureYCoordinate(field, currentFigure, newX, y)
                }
            };

            break;
        }
        case DIRECTION.UP: {
            const newY = y - 1;
            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(
                field,
                currentFigure,
                x,
                newY,
                (cellX, cellY) => checkIsWithinTopBound(cellY)
            );
            if (!isNextStepCompatibleWithField) return;
            newState = {
                boardState: {
                    figureCoordinate: {y: y - 1}
                }
            };
            break;
        }
        case DIRECTION.DOWN: {
            const newY = y + 1;

            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(
                field,
                currentFigure,
                x,
                newY,
                (cellX, cellY) => checkIsWithinBottomBound(cellY)
            );
            if (isNextStepCompatibleWithField) {
                newState = {
                    boardState: {figureCoordinate: {y: newY}}
                };
            } else {
                newState = createNextFigurePeriodState(
                    nextFiguresList,
                    field,
                    currentFigure,
                    x,
                    y,
                    gameStatistic,
                    customFigures
                );
            }
            break;
        }
        case DIRECTION.TO_BOTTOM: {
            const shadowY = boardState.get('shadowY');

            newState = createNextFigurePeriodState(
                nextFiguresList,
                field,
                currentFigure,
                x,
                shadowY,
                gameStatistic,
                customFigures
            );
            break;
        }
        case DIRECTION.AROUND_ITS_AXIS: {
            const routedFigure = rotateFigure(currentFigure);

            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(
                field,
                routedFigure,
                x,
                y,
                checkIsWithinAllBounds
            );
            if (!isNextStepCompatibleWithField) return;
            newState = {
                boardState: {
                    currentFigure: routedFigure,
                    shadowY: findTheLowestCompatibleFigureYCoordinate(field, routedFigure, x, y)
                }
            };
            break;
        }
    }

    if (newState) dispatch(updateGameState(newState));
};

const createNextFigurePeriodState = (
    nextFiguresList,
    field,
    figure,
    x,
    y,
    gameStatistic,
    customFigures
) => {
    const [newField, cleanedRowsCount] = cleanFieldFromFilledRows(
        drawFigureOnField(field, figure, x, y)
    );

    const [nextFigure, newNextFiguresList] = makeFiguresListStep(nextFiguresList, customFigures);

    const newFigureX = findXCoordinateOfFieldCentredFigure(nextFigure);
    const gameScore = gameStatistic.get('gameScore') || 0;
    const newGameScore = gameScore + cleanedRowsCount;

    const newState = {
        boardState: {
            currentFigure: nextFigure,
            figureCoordinate: {x: newFigureX, y: 0},
            field: newField,
            shadowY: findTheLowestCompatibleFigureYCoordinate(newField, nextFigure, newFigureX),
            nextFiguresList: newNextFiguresList
        },
        gameStatistic: {gameScore: newGameScore}
    };

    const isGameOver = !checkIsFigureCompatibleWithField(newField, nextFigure, newFigureX);
    if (isGameOver) {
        newState.gameStatus = GAME_STATUSES.GAME_IS_OVER;

        const gameRecord = gameStatistic.get('gameRecord') || 0;

        if (newGameScore > gameRecord) newState.gameStatistic.gameRecord = newGameScore;
    }

    return newState;
};

const cleanFieldFromFilledRows = field => {
    let deletedCount = 0;
    const fieldWithoutFilledRows = field.filterNot(row => {
        if (row.every(cell => !!cell)) {
            deletedCount++;
            return true;
        } else return false;
    });
    if (deletedCount) {
        let emptyArrays = [];
        for (let i = 0; i < deletedCount; i++) {
            emptyArrays.push(List(new Array(HORIZONTAL_CELLS_COUNT).fill(undefined)));
        }
        return [fieldWithoutFilledRows.unshift(...emptyArrays), deletedCount];
    } else return [fieldWithoutFilledRows, deletedCount];
};

const rotateFigure = figure => {
    return figure.slice().withMutations(rotatedFigure =>
        figure.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex, arr) => {
                rotatedFigure.setIn([cellIndex, arr.size - 1 - rowIndex], cell);
            });
        })
    );
};
