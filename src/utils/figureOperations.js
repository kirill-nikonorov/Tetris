import {FIGURES} from '../constants/Figures';
import {checkIsWithinBottomBound} from './boundComplianceCheckers';
import {HORIZONTAL_MAX_INDEX, HORIZONTAL_MIDDLE_INDEX, VERTICAL_MAX_INDEX} from '../constants/Game';

export const findTheLowestCompatibleFigureYCoordinate = (field, figure, x, y = 0) => {
    let lowestY = y;

    for (let currentY = lowestY + 1; ; currentY++) {
        const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(
            field,
            figure,
            x,
            currentY,
            (cellX, cellY) => checkIsWithinBottomBound(cellY)
        );

        if (isNextStepCompatibleWithField) {
            lowestY = currentY;
        } else {
            break;
        }
    }
    return lowestY;
};

const getRandomElement = (keys, arr) => {
    const randomKey = keys[Math.floor(Math.random() * arr.size)];
    return arr.get(randomKey);
};

export const getRandomFigure = () => {
    const figureKeys = [...FIGURES.keys()];
    return getRandomElement(figureKeys, FIGURES);
};

export const createRandomFiguresList = () => {
    const figureKeys = [...FIGURES.keys()];
    const nextList = [
        getRandomElement(figureKeys, FIGURES),
        getRandomElement(figureKeys, FIGURES),
        getRandomElement(figureKeys, FIGURES)
    ];
    return nextList;
};

export const checkIsFigureCompatibleWithField = (field, figure, x, y = 0, checkIsWithinBound) => {
    return figure.every((row, rowIndex) => {
        return row.every((cell, cellIndex) => {
            if (!cell) return true;
            const fieldXIndex = x + cellIndex;
            const fieldYIndex = y + rowIndex;

            const isFieldCellFree = field.getIn([fieldYIndex, fieldXIndex]) === 0;

            if (checkIsWithinBound) {
                const isWithinBound = checkIsWithinBound(fieldXIndex, fieldYIndex);
                return isFieldCellFree && isWithinBound;
            } else return isFieldCellFree;
        });
    });
};

export const findXCoordinateOfFieldCentredFigure = figure => {
    const figureHorizontalMiddleIndex = Math.round((figure.first().size - 1) / 2);
    return HORIZONTAL_MIDDLE_INDEX - figureHorizontalMiddleIndex;
};

export const makeFiguresListStep = nextFiguresList => {
    const nextFigure = nextFiguresList.first();
    const newNextFiguresList = nextFiguresList.shift(0).push(getRandomFigure());
    return [nextFigure, newNextFiguresList];
};
