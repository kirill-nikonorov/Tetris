import React from 'react';
import styled from 'styled-components';
import {pure} from 'recompose';
import {CELL_HEIGHT_PX, CELL_WIDTH_PX} from '../../constants/Game';
import {BACKGROUND_STYLES, DEFAULT_FIGURES_STYLES} from '../../constants/Figures';
import {connect} from 'react-redux';
import {Map} from 'immutable';

const CellContainer = styled.div.attrs({
    style: ({x, y, onClick}) => ({
        left: x * CELL_WIDTH_PX,
        top: y * CELL_HEIGHT_PX,
        cursor: onClick ? 'pointer' : 'default'
    })
})`
    position: absolute;
    width: ${CELL_WIDTH_PX}px;
    height: ${CELL_HEIGHT_PX}px;
    box-sizing: border-box;
    border-radius: 5px;
`;

const shadowColorStyle = {
    background: '#30404d',
    border: '#202b33',
    boxShadow: 'inset 0 0 1px 2px #5c7080'
};

const defaultFigureStyle = {
    border: '1px solid ',
    boxShadow: 'inset 0 0 1px 2px '
};

const completeStyle = colorStyle => {
    let style = {...colorStyle};
    if (!style.border) style.border = defaultFigureStyle.border;
    if (!style.boxShadow) style.boxShadow = defaultFigureStyle.boxShadow;

    return style;
};

class Cell extends React.Component {
    getAppropriateColorStyle() {
        const {customStyle, shadow, customFiguresStyles, figureName} = this.props;

        if (!figureName) return;

        if (shadow) return shadowColorStyle;

        if (customStyle) return customStyle;

        const defaultFiguresStyle = DEFAULT_FIGURES_STYLES.get(figureName);
        if (defaultFiguresStyle) return defaultFiguresStyle.toObject();

        const customFigureStyle = customFiguresStyles.get(figureName);
        if (customFigureStyle) return customFigureStyle.toObject();

        const backgroundStyle = BACKGROUND_STYLES.get(figureName);
        if (backgroundStyle) return backgroundStyle.toObject();
    }

    render() {
        const {x, y, onClick} = this.props;

        let finalStyle = {};

        const colorStyle = this.getAppropriateColorStyle();

        if (colorStyle) {
            finalStyle = completeStyle(colorStyle);
        }

        return <CellContainer x={x} y={y} onClick={onClick} style={finalStyle}/>;
    }
}

const mapStateToProps = state => {
    const customFiguresStyles = state.get('customFiguresData').get('figuresStyles') || Map({});
    return {customFiguresStyles};
};

export default connect(mapStateToProps)(pure(Cell));
