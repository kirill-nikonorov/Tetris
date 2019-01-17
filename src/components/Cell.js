import React from 'react';
import styled, {css} from 'styled-components';
import {pure} from 'recompose';
import {CELL_HEIGHT_PX, CELL_WIDTH_PX} from '../constants/Game';
import {BACKGROUND_COLORS, FIGURES_COLORS} from '../constants/Figures';
import {Map} from 'immutable';

const CellContainer = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: ${CELL_WIDTH_PX}px;
    height: ${CELL_HEIGHT_PX}px;
    border: 1px solid;
    box-sizing: border-box;
    box-shadow: inset 0 0 0 3px;
    color: rgba(#182026, 0.2);
    transition: top 5000ms linear;
    border-radius: 5px;
`;

const ShadowContainer = styled(CellContainer)`
    background: #30404d;
    box-shadow: inset 0 0 1px 2px #5c7080;
    border: 1px solid #202b33;
    border-radius: 2px;
`;

const convertMapToCssFormat = map => [...map.entries()].map(entry => entry.join(' : ')).join(' ; ');
const updateContainer = style => {
    return styled(CellContainer)`
        ${convertMapToCssFormat(style)}
    `;
};

const containers = FIGURES_COLORS.map(updateContainer).merge(
    BACKGROUND_COLORS.map(updateContainer)
);

//console.log(containers);

class Cell extends React.Component {
    render() {
        const {ownerFigureName, x, y, shadow} = this.props;
        const style = {left: x, top: y};

        if (shadow) return <ShadowContainer style={style} />;

        const Container = containers.get(ownerFigureName);

        if (!Container) return <CellContainer style={style}>{ownerFigureName}</CellContainer>;

        return <Container style={style} />;
    }
}

export default pure(Cell);
