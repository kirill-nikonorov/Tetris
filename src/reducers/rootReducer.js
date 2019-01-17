import {updateGameState} from '../lib/reduxActions/actions';
import _ from 'lodash';
import {Map, fromJS} from 'immutable';

import {handleActions} from 'redux-actions';

const PATHS_TO_REPLACE = [
    ['boardState', 'currentFigure'],
    ['boardState', 'field'],
    ['boardState', 'nextFiguresList']
];

const replaceKeys = (state, paths, source) => {
    return state.withMutations(state => {
        paths.forEach(path => {
            if (source.hasIn(path)) state.setIn(path, source.getIn(path));
        });
    });
};

const rootReducer = handleActions(
    {
        [updateGameState]: (state, {payload}) => {
            const immutablePayload = fromJS(payload);

            const newState = state.mergeDeep(immutablePayload);

            if (PATHS_TO_REPLACE.some(path => immutablePayload.hasIn(path)))
                return replaceKeys(newState, PATHS_TO_REPLACE, immutablePayload);
            else return newState;
        }
    },
    Map({})
);

export default rootReducer;
