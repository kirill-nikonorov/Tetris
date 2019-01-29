import {combineReducers} from 'redux-immutable';

import {customFiguresData} from './customFiguresData';
import {gameStateReducer} from './gameState';

const rootReducer = combineReducers({
    gameState: gameStateReducer,
    customFiguresData
});

export default rootReducer;
