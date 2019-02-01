import React from 'react';

import {connect} from 'react-redux';
import {pure} from 'recompose';
import {toggleGameOn, startNewGame} from '../../actions/gameState';
import {checkIsGameOn, checkIsGameOver, checkIsTurnedOff} from '../../utils/gameStatus';
import {Icon} from 'antd';
import {BigSymbols, MenuContainer} from './style';
import {GameOverStatistic} from './GameStatistic';

const AntIcon = BigSymbols.withComponent(Icon);

class MenuView extends React.Component {
    render() {
        const {
            gameRecord,
            gameScore,
            isGameOn,
            toggleGameOn,
            startNewGame,
            isGameTurnedOff,
            isGameOver
        } = this.props;

        return (
            <MenuContainer isVisible={!isGameOn}>
                {isGameOver && <GameOverStatistic gameRecord={gameRecord} gameScore={gameScore} />}
                {!isGameTurnedOff && <AntIcon type="redo" onClick={() => startNewGame()} />}
                {!isGameOver && <AntIcon type="play-circle" onClick={() => toggleGameOn()} />}
            </MenuContainer>
        );
    }
}

const mapStateToProps = state => {
    const gameState = state.get('gameState');
    const gameStatus = gameState.get('gameStatus');
    const isGameOn = checkIsGameOn(gameStatus);
    const isGameTurnedOff = checkIsTurnedOff(gameStatus);
    const isGameOver = checkIsGameOver(gameStatus);
    const gameStatistic = gameState.get('gameStatistic');
    const gameRecord = gameStatistic.get('gameRecord');
    const gameScore = gameStatistic.get('gameScore');
    return {isGameOn, gameScore, isGameTurnedOff, isGameOver, gameRecord};
};
export const Menu = connect(
    mapStateToProps,
    {toggleGameOn, startNewGame}
)(pure(MenuView));
