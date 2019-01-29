import styled from 'styled-components';
import {AsideBlockContainer, computePixels, INTER_ELEMENT_DISTANCE} from '../style/AsideBlock';
import {BOARD_HEIGHT_PX} from '../../../constants/Game';
import {generateFigureBoxSize} from '../../../utils/figure';
import {DEFAULT_FIGURES} from '../../../constants/Figures';

const {width: defaultFigureWidth, height: defaultFigureHeight} = generateFigureBoxSize(
    DEFAULT_FIGURES.get('I')
);

const barPadding = 5;
const minItemScale = 0.7;
const itemVerticalMargin = 5;

const itemWidth = Math.ceil(defaultFigureWidth * minItemScale);
const itemHeight = Math.ceil(defaultFigureHeight * minItemScale);

const countOfItemsToAddVerticalScroll =
    Math.floor((BOARD_HEIGHT_PX - barPadding * 2) / (itemHeight + itemVerticalMargin * 2)) + 1;

const SCROLL_BAR_WIDTH = 16;

export const LeftBasedBarBlock = styled(AsideBlockContainer).attrs({
    width: ({countOfItems}) =>
        countOfItems < countOfItemsToAddVerticalScroll
            ? computePixels(itemWidth, barPadding * 2)
            : computePixels(itemWidth, barPadding * 2, SCROLL_BAR_WIDTH)
})`
    top: 0;
    left: -${({width = 0}) => computePixels(width, INTER_ELEMENT_DISTANCE)};
    max-height: ${BOARD_HEIGHT_PX}px;
    overflow-y: auto;
    padding: ${barPadding};
`;

export const FigureItemContainer = styled.div`
    position: relative;
    height: ${itemHeight}px;
    width: ${itemWidth}px;
    margin: ${itemVerticalMargin}px 0;
    box-shadow: ${({isAccented}) => isAccented && '0 0 1px 2px white' };
    cursor: ${({onClick}) => onClick ? 'pointer' : 'default' };
`;

export const Scaller = styled.div.attrs({
    style: ({cells}) => ({transform: findScaleNeededToFitFigureInItem(cells)})
})`
    transform-origin: top left;
`;

const findScaleNeededToFitFigureInItem = cells => {
    const {width: figureWidth, height: figureHeight} = generateFigureBoxSize(cells);

    const verticalNeededScale = itemHeight / figureHeight;
    const horizontalNeededScale = itemWidth / figureWidth;

    const minNeededScale = Math.min(verticalNeededScale, horizontalNeededScale);

    const scaleToFitFigure = minNeededScale < minItemScale ? minNeededScale : minItemScale;

    return `scale(${scaleToFitFigure})`;
};
