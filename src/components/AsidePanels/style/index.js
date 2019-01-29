import styled from 'styled-components';
import {
    AsideBlockContainer,
    computePixels,
    findShiftNeededToCenterBlock,
    INTER_ELEMENT_DISTANCE
} from './AsideBlock';
import {BOARD_WIDTH_PX} from '../../../constants/Game';

export const RightAsideBlock = styled(AsideBlockContainer)`
    top: 0;
    right: -${({style: {width = 0}}) => computePixels(width, INTER_ELEMENT_DISTANCE)};
`;

export const BottomAsideBlock = styled(AsideBlockContainer)`
    bottom: -${({style: {height = 0}}) => computePixels(height, INTER_ELEMENT_DISTANCE)};
    left: ${({style: {width = 0}}) => findShiftNeededToCenterBlock(BOARD_WIDTH_PX, width)};
`;
