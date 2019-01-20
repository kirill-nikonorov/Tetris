import {HORIZONTAL_CELLS_COUNT, VERTICAL_CELLS_COUNT} from '../constants/Game';

import {fromJS} from 'immutable';

const generateBlankField = (horizontalCellsCount, verticalCellsCount) => {
    const field = new Array(verticalCellsCount)
        .fill([])
        .map(() => new Array(horizontalCellsCount).fill(0));
    return fromJS(field);
};
const generateBackgroundCells = (horizontalCellsCount, verticalCellsCount) => {
    const backgroundEvenPart = [];
    const backgroundOddPart = [];

    for (let rowIndex = 0; rowIndex < verticalCellsCount; rowIndex++) {
        const evenRow = [];
        const oddRow = [];
        for (let cellIndex = 0; cellIndex < horizontalCellsCount; cellIndex++) {
            const isEven = !!((rowIndex + cellIndex) % 2);
            evenRow.push(isEven ? 0 : 1);
            oddRow.push(isEven ? 1 : 0);
        }
        backgroundEvenPart.push(evenRow);
        backgroundOddPart.push(oddRow);
    }

    return [backgroundEvenPart, backgroundOddPart];
};

export const BACKGROUND_FIELD = generateBackgroundCells(
    HORIZONTAL_CELLS_COUNT,
    VERTICAL_CELLS_COUNT
);
export const BLANK_FIELD = generateBlankField(HORIZONTAL_CELLS_COUNT, VERTICAL_CELLS_COUNT);
