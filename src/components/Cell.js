import React from 'react';
import styled, {css} from 'styled-components';
import {pure} from 'recompose';
import {CELL_HEIGHT_PX, CELL_WIDTH_PX} from '../constants/Game';


const CellContainer = styled.div`
    position : absolute;
    background-color: #878AAA;
    top: 0px;
    left: 0px;
    width:${CELL_WIDTH_PX}px;
    height: ${CELL_HEIGHT_PX}px;
    border: 1px solid #BDBFD4;
    box-sizing: border-box;
    color: white;
`;

const FigureCellContainer = styled(CellContainer)`
     background-color: #2C316E;
`;

const ShadowCellContainer = styled(FigureCellContainer)`
     opacity: 0.5;
`;


class Cell extends React.Component {
    render() {
        const {marked, x, y, shadow} = this.props;
        const style = {left: x, top: y}

        if (shadow) return <ShadowCellContainer style={style}/>
        if (marked) return <FigureCellContainer style={style}/>
        return <CellContainer style={style}/>
    }
}


export default pure(Cell)


