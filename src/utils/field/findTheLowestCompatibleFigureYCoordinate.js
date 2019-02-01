import {checkIsFigureCompatibleWithField} from './index';
import {checkIsWithinBottomBound} from '../boundComplianceCheck';

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
