import {FIGURES} from "../../constants/Figures";
import {checkIsWithinBottomBound} from './boundComplianceCheckers'
import {HORIZONTAL_MIDDLE_INDEX} from "../../constants/Game";


export const findTheLowestCompatibleFigureYCoordinate = (field, figure, x, y) => {
    let lowestY = y;
    for (let currentY = lowestY + 1; ; currentY++) {
        const isNextStepCompatibleWithField = checkIsFigureCompatibleWithField(field, figure, x, currentY, (cellX, cellY) => checkIsWithinBottomBound(cellY))

        if (isNextStepCompatibleWithField) {
            lowestY = currentY;
        }
        else {
            break;
        }
    }
    return lowestY;
};

export const getFigure = () => {
    return FIGURES.get("I");
};

export const checkIsFigureCompatibleWithField = (field, figure, x, y, checkIsWithinBound) => {
    return figure.every((row, rowIndex) => {
        return row.every((cell, cellIndex) => {

                if (!cell) return true;
                const yIndex = y + rowIndex;
                const xIndex = x + cellIndex;
                const isCellFree = field.getIn([yIndex, xIndex]) === 0;
                const isWithinBound = checkIsWithinBound ? checkIsWithinBound(xIndex, yIndex) : true;
                return isCellFree && isWithinBound;
            }
        )
    })
};


const findCoordinateOfCentredFigure = (figure) => {
    const figureHorizontalMiddleIndex = Math.floor((figure.get(0).size - 1) / 2);
    return HORIZONTAL_MIDDLE_INDEX - figureHorizontalMiddleIndex
};

export const createNextFigureWithAttributes = (field, addShadow = true) => {
    const newFigure = getFigure();
    const xCoordinate = findCoordinateOfCentredFigure(newFigure);
    return {
        figureCoordinate: {x: xCoordinate, y: 0},
        figure: newFigure,
        shadowY: addShadow ? findTheLowestCompatibleFigureYCoordinate(field, newFigure, xCoordinate, 0) : undefined
    }
};
