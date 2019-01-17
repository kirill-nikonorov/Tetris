import React from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';
import {pure} from 'recompose';
import {toggleGameOn, startNewGame} from '../actions/gameStatus';
import {
    checkIsGameOn,
    checkIsGameOver,
    checkIsTurnedOff
} from '../utils/helpers/gameStatusOperations';
import {Icon} from 'antd';
import {BigWhiteSymbols} from './styles/stringStylers';
import {GameStatistic} from './index';

const MenuContainer = styled.div`
    display: ${({isVisible}) => (isVisible ? 'div' : 'none')}
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1 ;
    background: rgb(47,60,73 , 0.7);
    `;

const MenuContent = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: space-around;
    align-content: center

    flex-wrap: wrap;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`;

const AntIcon = BigWhiteSymbols.withComponent(Icon);

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
                <MenuContent>
                    {isGameOver && <GameStatistic gameRecord={gameRecord} gameScore={gameScore} />}
                    {!isGameTurnedOff && <AntIcon type="redo" onClick={() => startNewGame()} />}
                    {!isGameOver && <AntIcon type="play-circle" onClick={() => toggleGameOn()} />}
                </MenuContent>
            </MenuContainer>
        );
    }
}

const mapStateToProps = state => {
    const gameStatus = state.get('gameStatus');
    const isGameOn = checkIsGameOn(gameStatus);
    const isGameTurnedOff = checkIsTurnedOff(gameStatus);
    const isGameOver = checkIsGameOver(gameStatus);
    const gameStatistic = state.get('gameStatistic');
    const gameRecord = gameStatistic.get('gameRecord');
    const gameScore = gameStatistic.get('gameScore');
    return {isGameOn, gameScore, isGameTurnedOff, isGameOver, gameRecord};
};
export default connect(
    mapStateToProps,
    {toggleGameOn, startNewGame}
)(pure(Menu));
