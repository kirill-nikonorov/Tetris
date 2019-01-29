import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/rootReducer';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import {BLANK_FIELD} from '../utils/matrix';
import {fromJS} from 'immutable';
import {GAME_STATUSES} from '../constants/Game';
import {PROTOTYPE_OF_PERSISTING_PART_OF_STORE} from '../constants/StoreStructure';
import {copyImmutableMapAccordingToEtalonObject} from '../utils/preciseMapCopy';

const initialStore = fromJS({
    customFiguresData: {},
    gameState: {
        boardState: {
            field: BLANK_FIELD,
            figureCoordinate: {x: 0, y: 0}
        },
        gameStatus: GAME_STATUSES.GAME_IS_TURNED_OFF,
        gameStatistic: {}
    }
});

const persistenceConfig = {
    key: 'tetris_game',
    merge: (initialState, persistedState) => {
        return initialState.mergeDeep(fromJS(persistedState));
    },
    slicer: paths => state => {
        return copyImmutableMapAccordingToEtalonObject(state, paths);
    },
    serialize: subset => JSON.stringify(subset.toJS()),
    deserialize: serializedData => JSON.parse(serializedData)
};

const enhancer = compose(
    applyMiddleware(thunk),
    persistState(PROTOTYPE_OF_PERSISTING_PART_OF_STORE, persistenceConfig)
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

export {configureStore};
