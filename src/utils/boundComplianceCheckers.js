import {HORIZONTAL_MAX_INDEX, VERTICAL_MAX_INDEX} from '../constants/Game';

export const checkIsWithinBound = (smallIndex, bigIndex) => {
    return smallIndex <= bigIndex;
};
export const checkIsWithinTopBound = index => checkIsWithinBound(0, index);
export const checkIsWithinLeftBound = index => checkIsWithinBound(0, index);
export const checkIsWithinBottomBound = index => checkIsWithinBound(index, VERTICAL_MAX_INDEX);
export const checkIsWithinRightBound = index => checkIsWithinBound(index, HORIZONTAL_MAX_INDEX);

export const checkIsWithinAllBounds = (cellX, cellY) =>
    checkIsWithinTopBound(cellY) &&
    checkIsWithinBottomBound(cellY) &&
    checkIsWithinRightBound(cellX) &&
    checkIsWithinLeftBound(cellX);
