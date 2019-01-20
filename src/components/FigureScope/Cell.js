import React from 'react';
import styled from 'styled-components';
import {pure} from 'recompose';
import {CELL_HEIGHT_PX, CELL_WIDTH_PX} from '../../constants/Game';
import {BACKGROUND_STYLES, FIGURES_STYLES} from '../../constants/Figures';
import {Map} from 'immutable';

/*

.attrs({
        style: ({figureName}) => {
            switch (figureName) {
                case ("I"):
                    return {
                        background: '#ff7373',
                        color: '#db3737',
                        borderColor: '#a82a2a'
                    };
                case ("L"): {
                    return {
                        background: '#3dcc91',
                        color: '#0f9960',
                        borderColor: '#0a6640'
                    };
                }
                case ("J"): {
                    return {
                        background: '#48aff0',
                        color: '#137cbd',
                        borderColor: '#1f4b99'
                    };
                }
                case ("O"): {
                    return {
                        background: '#ffc940',
                        color: '#d99e0b',
                        borderColor: '#a67908'
                    };
                }
                case ("T"): {
                    return {
                        background: '#ad99ff',
                        color: '#7157d9',
                        borderColor: '#5642a6'
                    };
                }
                case ("T"): {
                    return {
                        background: '#ad99ff',
                        color: '#7157d9',
                        borderColor: '#5642a6'
                    };
                }
            }

        }
    }
)
*/

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

const generateContainer = style => {
    return styled(CellContainer)`
        ${convertMapToCssFormat(style)}
    `;
};

const containers = FIGURES_STYLES.map(generateContainer).merge(
    BACKGROUND_STYLES.map(generateContainer)
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
