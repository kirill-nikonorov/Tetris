import React from 'react';
import styled from 'styled-components';

import {CELL_HEIGHT_PX, CELL_WIDTH_PX} from '../../constants/Game';

import {pure} from 'recompose';
import {CellsGroup} from '../../components/';

const FigureBoxContainer = styled.div`
    position: relative;
    background: #26323b;
    margin: 5px 0;
`;

class FigureBox extends React.Component {
    constructor(props) {
        super(props);
    }

    findFigureSize = () => {
        const {cells} = this.props;
        const horizontalCellsCount = cells.first().size;
        const verticalCellsCount = cells.size;
        const width = horizontalCellsCount * CELL_WIDTH_PX;
        const height = verticalCellsCount * CELL_HEIGHT_PX;
        return {width: `${width}px`, height: `${height}px`};
    };

    render() {
        const {cells} = this.props;

        const style = this.findFigureSize();

        return (
            <FigureBoxContainer style={style}>
                <CellsGroup cells={cells} />
            </FigureBoxContainer>
        );
    }
}

export default pure(FigureBox);
