import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/rootReducer';

import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';
import {FIGURES} from "../constants/Figures";
import {BLANK_FIELD} from "../utils/Matrix";
import {fromJS} from "immutable"
import {GAME_STATUS} from '../constants/Game'

const initialStore = fromJS({
        field: BLANK_FIELD,
        figureCoordinate: {x: 0, y: 0},
        gameIsOn: false,
        isGameAlive: false
    })
;

const enhancer = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
);

const configureStore = () => {
    const store = createStore(rootReducer, initialStore, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
            const nextRootReducer = require('../reducers/rootReducer');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
};

export default configureStore;
