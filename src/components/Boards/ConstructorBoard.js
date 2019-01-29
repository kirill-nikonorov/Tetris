import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import Figure from '../Figure/Figure';
import {moveFigure, toggleGameOn, togglePause} from '../../actions/gameState/index';
import {BACKGROUND} from '../../constants/Figures';
import {BoardContainer} from './style';
import {extractFigureDataFromField} from '../../utils/field/extractFigureDataFromField';

class Board extends React.Component {
    render() {
        const {field, cellStyle, onBackGroundClick, onFigureClick} = this.props;

        const [figure, x, y] = extractFigureDataFromField(field);

        return (
            <BoardContainer>
                <Figure cells={BACKGROUND} onClick={onBackGroundClick} />

                {figure && (
                    <Figure
                        cells={figure}
                        customCellStyle={cellStyle}
                        x={x}
                        y={y}
                        onClick={onFigureClick}
                        embracedWithShadow
                    />
                )}
            </BoardContainer>
        );
    }
}

export default connect(
    undefined,
    {moveFigure, toggleGameOn, togglePause}
)(pure(Board));
