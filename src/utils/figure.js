import {DEFAULT_FIGURES} from '../constants/Figures';
import {CELL_HEIGHT_PX, CELL_WIDTH_PX, HORIZONTAL_MIDDLE_INDEX} from '../constants/Game';
import {Map} from 'immutable';

const getRandomElement = (keys, map) => {
    const randomKey = keys[Math.floor(Math.random() * map.size)];
    return map.get(randomKey);
};

export const getRandomFigure = (customFigures = Map({})) => {
    const allFigures = DEFAULT_FIGURES.merge(customFigures);
    const figureKeys = [...allFigures.keys()];
    return getRandomElement(figureKeys, allFigures);
};

export const createRandomFiguresList = customFigures => {
    const allFigures = DEFAULT_FIGURES.merge(customFigures);
    const figureKeys = [...allFigures.keys()];

    return [
        getRandomElement(figureKeys, allFigures),
        getRandomElement(figureKeys, allFigures),
        getRandomElement(figureKeys, allFigures)
    ];
};

export const findXCoordinateOfFieldCentredFigure = figure => {
    const figureHorizontalMiddleIndex = Math.round((figure.first().size - 1) / 2);
    return HORIZONTAL_MIDDLE_INDEX - figureHorizontalMiddleIndex;
};

export const makeFiguresListStep = (nextFiguresList, allFigures) => {
    const nextFigure = nextFiguresList.first();
    const newNextFiguresList = nextFiguresList.shift(0).push(getRandomFigure(allFigures));
    return [nextFigure, newNextFiguresList];
};

export const generateFigureBoxSize = cells => {
    const horizontalCellsCount = cells.first().size;
    const verticalCellsCount = cells.size;

    return {
        width: horizontalCellsCount * CELL_WIDTH_PX,
        height: verticalCellsCount * CELL_HEIGHT_PX
    };
};
