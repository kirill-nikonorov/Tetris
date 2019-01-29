import {List} from 'immutable';

export const extractFigureDataFromField = field => {
    const {topIndex, bottomIndex, rightIndex, leftIndex} = findEdgedFilledCellsIndexes(field);

    if (topIndex < 0) return [undefined];

    const filledCellsArea = extractFilledCellsAreaFromField(
        field,
        topIndex,
        bottomIndex,
        leftIndex,
        rightIndex
    );

    const [widthDeficit, heightDeficit] = findAreaDeficitToBecomeSquare(filledCellsArea);

    const figure = fillAreaWithEmptyCells(filledCellsArea, widthDeficit, heightDeficit);

    const newXCoordinate = leftIndex - Math.floor(widthDeficit / 2);
    const newYCoordinate = topIndex - Math.floor(heightDeficit / 2);

    return [figure, newXCoordinate, newYCoordinate];
};

const isWithinBounds = (min, value, max) => {
    return value >= min && value <= max;
};

const extractFilledCellsAreaFromField = (field, top, bottom, left, right) => {
    const extractedRows = field.filter((row, rowIndex) => isWithinBounds(top, rowIndex, bottom));
    return extractedRows.map(row =>
        row.filter((cell, cellIndex) => isWithinBounds(left, cellIndex, right))
    );
};

const findLeftFilledCellIndex = field => {
    const fieldWidth = field.first().size;
    const leftIndex = field.reduce((leftFilledCellIndex, row) => {
        const columnLeftFilledIndex = row.findIndex(cell => !!cell);
        return columnLeftFilledIndex >= 0
            ? Math.min(columnLeftFilledIndex, leftFilledCellIndex)
            : leftFilledCellIndex;
    }, fieldWidth);
    return leftIndex === fieldWidth ? -1 : leftIndex;
};
const findRightFilledCellIndex = field => {
    return field.reduce((rightFilledCellIndex, row) => {
        const columnRightFilledCellIndex = row.findLastIndex(cell => !!cell);
        return columnRightFilledCellIndex >= 0
            ? Math.max(columnRightFilledCellIndex, rightFilledCellIndex)
            : rightFilledCellIndex;
    }, -1);
};

const findEdgedFilledCellsIndexes = field => ({
    topIndex: field.findIndex(row => row.some(cell => !!cell)),
    bottomIndex: field.findLastIndex(row => row.some(cell => !!cell)),
    rightIndex: findRightFilledCellIndex(field),
    leftIndex: findLeftFilledCellIndex(field)
});

const findAreaDeficitToBecomeSquare = area => {
    const areaWidth = area.first().size;
    const areaHeight = area.size;

    if (areaHeight === areaWidth) return [0, 0];

    const areaMaxSize = Math.max(areaWidth, areaHeight);
    const areaWidthDeficit = areaMaxSize - areaWidth;
    const areaHeightDeficit = areaMaxSize - areaHeight;

    return [areaWidthDeficit, areaHeightDeficit];
};

const fillAreaWithEmptyCells = (area, columnsCount, rowsCount) => {
    let square = area;
    if (columnsCount > 0) square = completeAreaWithEmptyColumns(square, columnsCount);
    if (rowsCount > 0) square = completeAreaWithEmptyRows(square, rowsCount);

    return square;
};

const completeAreaWithEmptyColumns = (area, areaWidthDeficit) => {
    return area.withMutations(area =>
        area.map(row => {
            let newRow = row;
            for (let i = 0; i < areaWidthDeficit; i++) {
                newRow = i % 2 ? newRow.unshift(undefined) : newRow.push(undefined);
            }
            return newRow;
        })
    );
};
const completeAreaWithEmptyRows = (area, areaHeightDeficit) => {
    const columnCount = area.first().size;
    const emptyRow = List(new Array(columnCount).fill(undefined));

    return area.withMutations(area => {
        for (let i = 0; i < areaHeightDeficit; i++) {
            area = i % 2 ? area.unshift(emptyRow) : area.push(emptyRow);
        }
    });
};
