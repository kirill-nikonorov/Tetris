import React from 'react';
import styled from 'styled-components';

import {CELL_HEIGHT_PX, CELL_WIDTH_PX} from '../../constants/Game';

import {pure} from 'recompose';
import {Cell} from './Cell';
import {generateFigureBoxSize} from '../../utils/figure';

const CellsContainer = styled.div.attrs({
    style: ({x, y, contour: {height = 0, width = 0} = {}}) => ({
        left: x * CELL_WIDTH_PX,
        top: y * CELL_HEIGHT_PX,
        height,
        width
    })
})`
    position: absolute;
    box-shadow: ${({embracedWithShadow}) => embracedWithShadow && 'inset 0 0 1px 2px #5c7080'};
`;

class CellsView extends React.Component {
    render() {
        const {
            cells,
            x = 0,
            y = 0,
            shadow = false,
            customCellStyle,
            onClick,
            embracedWithShadow = false
        } = this.props;

        return (
            <CellsContainer
                x={x}
                y={y}
                embracedWithShadow={embracedWithShadow}
                contour={embracedWithShadow && generateFigureBoxSize(cells)}>
                {cells.reduce((cells, row, rowIndex) => {
                    row.forEach((cell, cellIndex) => {
                        if (cell || !!onClick) {
                            return cells.push(
                                <Cell
                                    figureName={cell}
                                    shadow={shadow}
                                    x={cellIndex}
                                    y={rowIndex}
                                    customStyle={customCellStyle}
                                    onClick={
                                        onClick && (() => onClick(y + rowIndex, x + cellIndex))
                                    }
                                    key={`Cell: ${rowIndex}, ${cellIndex} `}
                                />
                            );
                        }
                    });
                    return cells;
                }, [])}
            </CellsContainer>
        );
    }
}

export const Cells = pure(CellsView);
