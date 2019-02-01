import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {checkIsTurnedOff} from '../../utils/gameStatus';
import {List} from 'immutable';

import {AppContainer} from './style';
import {GameTimer, ScoreTable, FiguresBar} from '../AsidePanels';
import {Menu} from '../Menu';
import {GameBoard} from '../Boards';

class GameView extends React.Component {
    render() {
        const {nextFiguresList, isGameTurnedOff} = this.props;

        return (
            <AppContainer>
                <Menu />
                <GameBoard />
                <FiguresBar isVisible={!isGameTurnedOff} figuresCollection={nextFiguresList} />
                <ScoreTable />
                <GameTimer />
            </AppContainer>
        );
    }
}

const mapStateToProps = state => {
    const nextFiguresList = state.getIn(['gameState', 'boardState', 'nextFiguresList']) || List([]);
    const gameStatus = state.getIn(['gameState', 'gameStatus']);

    const isGameTurnedOff = checkIsTurnedOff(gameStatus);

    return {nextFiguresList, isGameTurnedOff};
};

export const Game = connect(mapStateToProps)(pure(GameView));
