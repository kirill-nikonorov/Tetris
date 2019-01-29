import React from 'react';
import {Board, Menu, ScoreTable, GameTimer} from '../index';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {checkIsTurnedOff} from '../../utils/gameStatus';
import FiguresBar from '../AsidePanels/FiguresBar/FiguresBar';
import {List} from 'immutable';
import {AppContainer} from './style';

class Game extends React.Component {
    render() {
        const {nextFiguresList, isGameTurnedOff} = this.props;

        return (
            <AppContainer>
                <Menu />
                <Board />
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

export default connect(mapStateToProps)(pure(Game));
