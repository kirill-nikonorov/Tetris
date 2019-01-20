import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {pure} from 'recompose';
import {AsideBlock} from '../styles/AsideBlocks';
import {checkIsTurnedOff} from '../../utils/gameStatusOperations';

const Score = styled.div`
    font-size: 25px;
`;

const style = {height: '65px', width: '50px', top: 0, right: '-55px'};

class ScoreTable extends React.Component {
    render() {
        const {gameScore = 0, isGameTurnedOff} = this.props;

        return (
            <AsideBlock style={style} isVisible={!isGameTurnedOff}>
                score :<Score>{gameScore}</Score>
            </AsideBlock>
        );
    }
}

const mapStateToProps = state => {
    const gameStatus = state.get('gameStatus');
    const isGameTurnedOff = checkIsTurnedOff(gameStatus);

    const gameStatistic = state.get('gameStatistic');
    const gameScore = gameStatistic.get('gameScore');

    return {gameScore, isGameTurnedOff};
};

export default connect(mapStateToProps)(pure(ScoreTable));
