import {pure} from 'recompose';
import {BigWhiteSymbols, WhiteString} from './styles/stringStylers';
import React from 'react';
import {Centralizer} from './styles/layoutFormatters';

const GameOverStatistic = props => {
    const {gameRecord, gameScore} = props;
    const difference = gameRecord - gameScore;
    console.group();
    console.log('gameRecord = ', gameRecord);
    console.log('gameScore = ', gameScore);
    console.log('difference = ', difference);
    console.groupEnd();
    return (
        <Centralizer>
            <BigWhiteSymbols>GameOver</BigWhiteSymbols>
            {!!difference ? (
                <div>
                    <WhiteString>Record : {gameRecord}</WhiteString>
                    <WhiteString>Your score : {gameScore} </WhiteString>
                    <WhiteString>Difference : {difference} </WhiteString>
                </div>
            ) : (
                <div>
                    <WhiteString>NewRecord !!!</WhiteString>
                    <WhiteString>{gameScore} </WhiteString>
                </div>
            )}
        </Centralizer>
    );
};

export default pure(GameOverStatistic);
