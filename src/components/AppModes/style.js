import {
    CELL_HEIGHT_PX,
    CELL_WIDTH_PX,
    HORIZONTAL_CELLS_COUNT,
    VERTICAL_CELLS_COUNT
} from '../../constants/Game';
import styled from 'styled-components';

export const AppContainer = styled.div`
    height: ${VERTICAL_CELLS_COUNT * CELL_HEIGHT_PX}px;
    width: ${HORIZONTAL_CELLS_COUNT * CELL_WIDTH_PX}px;
    position: relative;
`;
