export const drawFigureOnField = (field, figure, x = 0, y = 0) => {
    if (!figure) return field;
    const resultFigure = field.asMutable();
    figure.forEach((figureRow, figureRowIndex) => {
        figureRow.forEach((cell, cellIndex) => {
            if (cell) {
                const resultRow = y + figureRowIndex;
                const resultCell = x + cellIndex;
                resultFigure.setIn([resultRow, resultCell], cell);
            }
        });
    });
    return resultFigure.asImmutable();
};
