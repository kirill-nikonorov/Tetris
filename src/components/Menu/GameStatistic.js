import {pure} from 'recompose';
import React from 'react';
import {BigSymbols, TextCentralizer} from './style';

const GameOverStatisticView = props => {
    const {gameRecord = 0, gameScore = 0} = props;
    const difference = gameRecord - gameScore;

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

export const GameOverStatistic = pure(GameOverStatisticView);
