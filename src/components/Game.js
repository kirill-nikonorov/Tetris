import React from 'react';
import styled from 'styled-components';
import {Board, Menu, ScoreTable, NextFiguresBar, GameTimer} from '../components';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {
    CELL_HEIGHT_PX,
    CELL_WIDTH_PX,
    HORIZONTAL_CELLS_COUNT,
    VERTICAL_CELLS_COUNT
} from '../constants/Game';
import {checkIsGameOn} from '../utils/helpers/gameStatusOperations';

const AppContainer = styled.div`
    height: ${VERTICAL_CELLS_COUNT * CELL_HEIGHT_PX}px;
    width: ${HORIZONTAL_CELLS_COUNT * CELL_WIDTH_PX}px;
    position: relative;
`;

class Game extends React.Component {
    state = {isMenuVisible: true};

    render() {
        const {startNewGame, isGameIsOn} = this.props;
        const {isMenuVisible} = this.state;

        return (
            <AppContainer>
                <Menu isVisible={isMenuVisible} />
                <Board />
                <NextFiguresBar />
                <ScoreTable />
                <GameTimer />
            </AppContainer>
        );
    }
}

const mapStateToProps = state => {
    const gameStatus = state.get('gameStatus');
    const isGameIsOn = checkIsGameOn(gameStatus);
    return {isGameIsOn};
};

const mapDispatchToProps = dispatch => {};
export default connect(mapStateToProps)(pure(Game));
