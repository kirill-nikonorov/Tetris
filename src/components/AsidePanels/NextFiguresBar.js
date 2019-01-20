import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {pure} from 'recompose';

import {moveFigure, toggleGameOn, togglePause} from '../../actions/index';
import {FigureBox} from '../index';
import {FIGURES} from '../../constants/Figures';
import {CELL_WIDTH_PX, CELL_HEIGHT_PX, VERTICAL_CELLS_COUNT} from '../../constants/Game';
import {checkIsTurnedOff} from '../../utils/gameStatusOperations';
import {AsideBlock} from '../styles/AsideBlocks';

const maxCellsCountsAmongFigures = FIGURES.reduce(
    (maxCellsCounts, figure) => {
        const {maxHorizontalCellsCount, maxVerticalCellsCount} = maxCellsCounts;
        const horizontalCellsCount = figure.first().size;
        const verticalCellsCount = figure.size;
        if (horizontalCellsCount > maxHorizontalCellsCount)
            maxCellsCounts.maxHorizontalCellsCount = horizontalCellsCount;
        if (verticalCellsCount > maxVerticalCellsCount)
            maxCellsCounts.maxVerticalCellsCount = verticalCellsCount;
        return maxCellsCounts;
    },
    {maxHorizontalCellsCount: 0, maxVerticalCellsCount: 0}
);

const {maxHorizontalCellsCount, maxVerticalCellsCount} = maxCellsCountsAmongFigures;
const scale = 0.7;
const padding = 5;

const figureBoxMargin = 5;
const width = maxHorizontalCellsCount * CELL_WIDTH_PX + padding * 2;
const height = (maxVerticalCellsCount * CELL_HEIGHT_PX + figureBoxMargin * 2) * 3;

const widthAfterScaling = width * scale;
const heightAfterScaling = height * scale;
const left = widthAfterScaling + 5;
const boardHeight = VERTICAL_CELLS_COUNT * CELL_HEIGHT_PX;
const topOfCenteredBar = (boardHeight - heightAfterScaling) / 2;

const style = {
    height: `${height + padding * 2}px`,
    width: `${width}px`,
    top: `${topOfCenteredBar}px`,
    left: `-${left}px`
};

const ScalableAsideBlock = styled(AsideBlock)`
    transform: scale(${({scale}) => scale});
    transform-origin: ${({transformOrigin}) => transformOrigin};
`;

const NextFiguresContainer = styled.div`
    height: ${height}px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

class NextFiguresDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {nextFiguresList, isGameTurnedOff} = this.props;

        if (!nextFiguresList) return '';
        return (
            <ScalableAsideBlock
                isVisible={!isGameTurnedOff}
                style={style}
                scale={scale}
                transformOrigin="left top">
                <NextFiguresContainer>
                    <FigureBox cells={nextFiguresList.get(0)} />
                    <FigureBox cells={nextFiguresList.get(1)} />
                    <FigureBox cells={nextFiguresList.get(2)} />
                </NextFiguresContainer>
            </ScalableAsideBlock>
        );
    }
}

const mapStateToProps = state => {
    const gameStatus = state.get('gameStatus');
    const isGameTurnedOff = checkIsTurnedOff(gameStatus);
    const nextFiguresList = state.getIn(['boardState', 'nextFiguresList']);
    return {nextFiguresList, isGameTurnedOff};
};

export default connect(
    mapStateToProps,
    {moveFigure, toggleGameOn, togglePause}
)(pure(NextFiguresDisplay));
