import {pure} from 'recompose';
import {BigSymbols} from './styles/stringStylers';
import React from 'react';
import {TextCentralizer} from './styles/layoutFormatters';

const GameOverStatistic = props => {
    const {gameRecord = 0, gameScore} = props;
    const difference = gameRecord - gameScore;

    console.group();
    console.log('gameRecord = ', gameRecord);
    console.log('gameScore = ', gameScore);
    console.log('difference = ', difference);
    console.groupEnd();

    return (
        <TextCentralizer>
            <BigSymbols>GameOver</BigSymbols>
            {difference > 0 ? (
                <div>
                    <div>Record : {gameRecord}</div>
                    <div>Your score : {gameScore} </div>
                    <div>Difference : {difference} </div>
                </div>
            ) : (
                <div>
                    <div>It is Record !!!</div>
                    <div>{gameScore} </div>
                </div>
            )}
        </TextCentralizer>
    );
};

export default pure(GameOverStatistic);
