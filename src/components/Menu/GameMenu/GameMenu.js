import React from 'react';

import {connect} from 'react-redux';
import {pure} from 'recompose';
import {toggleGameOn, startNewGame} from '../../../actions/gameState/gameStatus';
import {checkIsGameOn, checkIsGameOver, checkIsTurnedOff} from '../../../utils/gameStatus';
import {Icon} from 'antd';
import {GameStatistic} from '../../index';
import {MenuContainer} from './style';
import {BigSymbols} from '../style';

const AntIcon = BigSymbols.withComponent(Icon);

class Menu extends React.Component {
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
                {isGameOver && <GameStatistic gameRecord={gameRecord} gameScore={gameScore} />}
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
export default connect(
    mapStateToProps,
    {toggleGameOn, startNewGame}
)(pure(Menu));
