import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {checkIsGameOn, checkIsTurnedOff} from '../../utils/gameStatus';
import {GAME_TIME} from '../../constants/Game';
import styled from 'styled-components';
import {endGame} from '../../actions/gameState';
import {reduceGameTimeOnSec} from '../../actions/gameState/gameTime';
import {BottomAsideBlock} from './style';

const height = 20;

const style = {
    height: `${height}px`,
    width: '100px'
};

const TimeLine = styled.div`
    height: ${height - 10}px;
    width: 10px;
    background-color: green;
`;

class GameTimerView extends React.Component {
    constructor(props) {
        super(props);
        const {isGameOn} = props;
        isGameOn && this.setUpStepTimer();
    }

    setUpStepTimer = () => {
        const {reduceGameTimeOnSec} = this.props;
        this.stepTimer = setInterval(() => {
            reduceGameTimeOnSec();
        }, 1000);
    };
    cleanStepTimer = () => {
        const {stepTimer} = this;
        if (stepTimer) clearInterval(stepTimer);
    };

    componentWillReceiveProps({isGameOn: isNewGameOn}) {
        const {isGameOn} = this.props;

        if (!isGameOn && isNewGameOn) this.setUpStepTimer();
        if (isGameOn && !isNewGameOn) this.cleanStepTimer();
    }
    componentWillUnmount() {
        this.cleanStepTimer();
    }

    render() {
        const {gameTime, isGameTurnedOff} = this.props;

        return (
            <BottomAsideBlock isVisible={!isGameTurnedOff} style={style}>
                <TimeLine style={{width: `${(gameTime / GAME_TIME) * 100}%`}} />
            </BottomAsideBlock>
        );
    }
}

const mapStateToProps = state => {
    const gameState = state.get('gameState');

    const gameStatus = gameState.get('gameStatus');
    const isGameTurnedOff = checkIsTurnedOff(gameStatus);
    const isGameOn = checkIsGameOn(gameStatus);
    const gameTime = gameState.get('gameTime');

    return {gameTime, isGameTurnedOff, isGameOn};
};

export const GameTimer = connect(
    mapStateToProps,
    {endGame, reduceGameTimeOnSec}
)(pure(GameTimerView));
