import {Map} from 'immutable';
import {setUpCustomFiguresData} from '../lib/reduxActions/actions';
import {handleActions} from 'redux-actions';

export const customFiguresData = handleActions(
    {
        [setUpCustomFiguresData]: (state, {payload: {newData}}) => {
            return newData;
        }
    },
    Map({})
);
