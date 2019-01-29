import {HORIZONTAL_CELLS_COUNT, VERTICAL_CELLS_COUNT} from '../constants/Game';

import {fromJS} from 'immutable';

const generateBlankField = (horizontalCellsCount, verticalCellsCount) => {
    const field = new Array(verticalCellsCount)
        .fill([])
        .map(() => new Array(horizontalCellsCount).fill(undefined));
    return fromJS(field);
};

const createRepeatingIterator = values => {
    const maxIndex = values.length - 1;
    let actualReturningItemIndex = 0;

    return () => {
        if (actualReturningItemIndex < maxIndex) {
            return values[actualReturningItemIndex++];
        }
        if (actualReturningItemIndex === maxIndex) {
            actualReturningItemIndex = 0;

            return values[maxIndex];
        }
    };
};

export const generateStripeBackgroundCells = partsNames => {
    const background = [];
    const getNext = createRepeatingIterator(partsNames);

    for (let i = 0; i < VERTICAL_CELLS_COUNT; i++) {
        const backgroundRow = [];
        for (let j = 0; j < HORIZONTAL_CELLS_COUNT; j++) {
            backgroundRow.push(getNext());
        }
        getNext();
        background.push(backgroundRow);
    }
    return background;
};

export const BLANK_FIELD = generateBlankField(HORIZONTAL_CELLS_COUNT, VERTICAL_CELLS_COUNT);
