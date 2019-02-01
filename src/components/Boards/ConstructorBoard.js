import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';

import {moveFigure, toggleGameOn, togglePause} from '../../actions/gameState';
import {BACKGROUND} from '../../constants/Background';
import {BoardContainer} from './style';
import {extractFigureDataFromField} from '../../utils/field/extractFigureDataFromField';
import {Cells} from '../Cells/Cells';

class ConstructorBoardView extends React.Component {
    render() {
        const {field, cellStyle, onBackGroundClick, onFigureClick} = this.props;

        const [figure, x, y] = extractFigureDataFromField(field);

        return (
            <BoardContainer>
                <Cells cells={BACKGROUND} onClick={onBackGroundClick} />

                {figure && (
                    <Cells
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

export const ConstructorBoard = connect(
    undefined,
    {moveFigure, toggleGameOn, togglePause}
)(pure(ConstructorBoardView));
