import {FIGURES} from '../../constants/Figures';
import {checkIsWithinBottomBound} from './boundComplianceCheckers';
import {HORIZONTAL_MIDDLE_INDEX} from '../../constants/Game';

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
            const yIndex = y + rowIndex;
            const xIndex = x + cellIndex;
            const isCellFree = field.getIn([yIndex, xIndex]) === 0;
            if (checkIsWithinBound) {
                const isWithinBound = checkIsWithinBound(xIndex, yIndex);
                return isCellFree && isWithinBound;
            } else return isCellFree;
        });
    });
};

export const findXCoordinateOfCentredFigure = figure => {
    const figureHorizontalMiddleIndex = Math.round((figure.first().size - 1) / 2);
    return HORIZONTAL_MIDDLE_INDEX - figureHorizontalMiddleIndex;
};

export const makeFiguresListStep = nextFiguresList => {
    const nextFigure = nextFiguresList.first();
    const newNextFiguresList = nextFiguresList.shift(0).push(getRandomFigure());
    return [nextFigure, newNextFiguresList];
};

/*
export const findNewFigureAttributes = (field, figure, addShadow = true) => {
    const xCoordinate = findXCoordinateOfCentredFigure(figure);
    return {
        figureCoordinate: {x: xCoordinate, y: 0},
        shadowY: addShadow
            ? findTheLowestCompatibleFigureYCoordinate(field, figure, xCoordinate)
            : undefined
    };
};
*/
