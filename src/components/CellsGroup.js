import React from 'react';
import styled from 'styled-components';

import {CELL_HEIGHT_PX, CELL_WIDTH_PX} from '../constants/Game';

import {pure} from 'recompose';
import Cell from '../components/Cell';

const CellsGroupContainer = styled.div``;

class CellsGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {cells, y = 0, x = 0, shadow = false, name} = this.props;

        //console.log(`${name} рендеред`);

        return (
            <CellsGroupContainer>
                {cells.reduce((cells, row, rowIndex) => {
                    row.forEach((cell, cellIndex) => {
                        if (cell) {
                            const CellY = y + rowIndex;
                            const CellX = x + cellIndex;
                            return cells.push(
                                <Cell
                                    ownerFigureName={cell}
                                    shadow={shadow}
                                    y={CellY * CELL_HEIGHT_PX}
                                    x={CellX * CELL_WIDTH_PX}
                                    key={`Cell: ${CellY}, ${CellX} `}
                                />
                            );
                        }
                    });
                    return cells;
                }, [])}
            </CellsGroupContainer>
        );
    }
}

export default pure(CellsGroup);
