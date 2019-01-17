import {updateGameState} from '../lib/reduxActions/actions/game';
import {DIRECTION, GAME_STATUSES, HORIZONTAL_CELLS_COUNT} from '../constants/Game';
import {fromJS, List} from 'immutable';
import {drawFigureOnField} from '../utils/Field';
import {
    findTheLowestCompatibleFigureYCoordinate,
    checkIsFigureCompatibleWithField,
    makeFiguresListStep,
    findXCoordinateOfCentredFigure
} from '../utils/helpers/figureOperations';
import {
    checkIsWithinTopBound,
    checkIsWithinBottomBound,
    checkIsWithinRightBound,
    checkIsWithinLeftBound,
    checkIsWithinAllBounds
} from '../utils/helpers/boundComplianceCheckers';
import {checkIsGameOn} from '../utils/helpers/gameStatusOperations';

export const moveFigure = direction => (dispatch, getState) => {
    const state = getState();
    const boardState = getState().get('boardState');
    const gameStatus = state.get('gameStatus');
    const isGameIsOn = checkIsGameOn(gameStatus);

    if (!isGameIsOn) return;
    const field = boardState.get('field');
    const figure = boardState.get('currentFigure') || fromJS([[]]);
    const figureCoordinate = boardState.get('figureCoordinate') || fromJS({});
    const y = figureCoordinate.get('y') || 0;
    const x = figureCoordinate.get('x') || 0;
    const nextFiguresList = boardState.get('nextFiguresList');

    let newState;

    const gameStatistic = state.get('gameStatistic') || {};

    switch (direction) {
        case DIRECTION.RIGHT: {
            const newX = x + 1;

            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(
                field,
                figure,
                newX,
                y,
                cellX => checkIsWithinRightBound(cellX)
            );
            if (!isNextStepCompatibleWithField) return;
            newState = {
                boardState: {
                    figureCoordinate: {x: newX},
                    shadowY: findTheLowestCompatibleFigureYCoordinate(field, figure, newX, y)
                }
            };

            break;
        }

        case DIRECTION.LEFT: {
            const newX = x - 1;

            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(
                field,
                figure,
                newX,
                y,
                cellX => checkIsWithinLeftBound(cellX)
            );
            if (!isNextStepCompatibleWithField) return;
            newState = {
                boardState: {
                    figureCoordinate: {x: newX},
                    shadowY: findTheLowestCompatibleFigureYCoordinate(field, figure, newX, y)
                }
            };

            break;
        }

        case DIRECTION.UP: {
            const newY = y - 1;
            const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(
                field,
                figure,
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
                figure,
                x,
                newY,
                (cellX, cellY) => checkIsWithinBottomBound(cellY)
            );
            if (isNextStepCompatibleWithField) {
                newState = {
                    boardState: {figureCoordinate: {y: newY}}
                };
            } else {
                newState = createNextFigureCycleState(
                    nextFiguresList,
                    field,
                    figure,
                    x,
                    y,
                    gameStatistic
                );
            }
            break;
        }
        case DIRECTION.TO_BOTTOM: {
            const shadowY = boardState.get('shadowY');

            newState = createNextFigureCycleState(
                nextFiguresList,
                field,
                figure,
                x,
                shadowY,
                gameStatistic
            );
            break;
        }
        case DIRECTION.AROUND_ITS_AXIS: {
            const routedFigure = rotateFigure(figure);

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

const createNextFigureCycleState = (nextFiguresList, field, figure, x, y, gameStatistic) => {
    const [newField, cleanedRowsCount] = cleanFieldFromFilledRows(
        drawFigureOnField(field, figure, y, x)
    );

    const [nextFigure, newNextFiguresList] = makeFiguresListStep(nextFiguresList);

    const newFigureX = findXCoordinateOfCentredFigure(nextFigure);
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
            emptyArrays.push(List(new Array(HORIZONTAL_CELLS_COUNT).fill(0)));
        }
        return [fieldWithoutFilledRows.unshift(...emptyArrays), deletedCount];
    } else return [fieldWithoutFilledRows, deletedCount];
};

const rotateFigure = figure => {
    const rotateFigure = figure.slice();
    return rotateFigure.withMutations(rotateFigure =>
        figure.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex, arr) => {
                rotateFigure.setIn([cellIndex, arr.size - 1 - rowIndex], cell);
            });
        })
    );
};
