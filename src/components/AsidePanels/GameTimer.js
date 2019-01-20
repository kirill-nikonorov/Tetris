import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {AsideBlock} from '../styles/AsideBlocks';
import {checkIsGameOn, checkIsTurnedOff} from '../../utils/gameStatusOperations';
import {CELL_WIDTH_PX, GAME_TIME, HORIZONTAL_CELLS_COUNT} from '../../constants/Game';
import styled from 'styled-components';
import {endGame} from '../../actions/index';
import {reduceGameTimeOnSec} from '../../actions/gameTime';

const height = 20;
const width = 100;

const boarWidth = HORIZONTAL_CELLS_COUNT * CELL_WIDTH_PX;
const leftOfCenteredBar = (boarWidth - width) / 2;

const style = {
    height: `${height}px`,
    width: `${width}px`,
    bottom: `-${height + 5}px`,
    left: `${leftOfCenteredBar}px`
};

const TimeLine = styled.div`
    height: ${height - 10}px;
    width: 10px;
    background-color: green;
`;

class Timer extends React.Component {
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

    render() {
        const {gameTime, isGameTurnedOff} = this.props;

        return (
            <AsideBlock isVisible={!isGameTurnedOff} style={style}>
                <TimeLine style={{width: `${(gameTime / GAME_TIME) * 100}%`}} />
            </AsideBlock>
        );
    }
}

const mapStateToProps = state => {
    const gameStatus = state.get('gameStatus');
    const isGameTurnedOff = checkIsTurnedOff(gameStatus);
    const isGameOn = checkIsGameOn(gameStatus);
    const gameTime = state.get('gameTime');

    return {gameTime, isGameTurnedOff, isGameOn};
};

export default connect(
    mapStateToProps,
    {endGame, reduceGameTimeOnSec}
)(pure(Timer));
