import {HORIZONTAL_CELLS_COUNT, VERTICAL_CELLS_COUNT} from "../constants/Game";
import {fromJS} from 'immutable'

const generateBlankField = (horizontalCellsCount, verticalCellsCount) => {
    const field = new Array(verticalCellsCount).fill([]).map(() => new Array(horizontalCellsCount).fill(0));
    return fromJS(field);
};

export const BLANK_FIELD = generateBlankField(HORIZONTAL_CELLS_COUNT, VERTICAL_CELLS_COUNT)