import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {pure} from 'recompose';
import {checkIsTurnedOff} from '../../utils/gameStatus';
import {RightAsideBlock} from './style';

const Score = styled.div`
    font-size: 25px;
`;

const style = {height: '65px', width: '50px'};

class ScoreTableView extends React.Component {
    render() {
        const {gameScore = 0, isGameTurnedOff} = this.props;

        return (
            <RightAsideBlock style={style} isVisible={!isGameTurnedOff}>
                score :<Score>{gameScore}</Score>
            </RightAsideBlock>
        );
    }
}

const mapStateToProps = state => {
    const gameState = state.get('gameState');

    const gameStatus = gameState.get('gameStatus');
    const isGameTurnedOff = checkIsTurnedOff(gameStatus);

    const gameScore = gameState.getIn(['gameStatistic', 'gameScore']);

    return {gameScore, isGameTurnedOff};
};

export const ScoreTable = connect(mapStateToProps)(pure(ScoreTableView));
