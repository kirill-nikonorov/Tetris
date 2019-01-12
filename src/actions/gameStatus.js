import {updateGameState} from '../lib/reduxActions/actions/game';
import {BLANK_FIELD} from "../utils/Matrix"
import {findTheLowestCompatibleFigureYCoordinate, getFigure} from '../utils/helpers/index'
import {createNextFigureWithAttributes, findCoordinateForPositingFigureInCenter} from "../utils/helpers";

const showModal = () => {
    console.log("Игра законченна")
};

export const startNewGame = () => (dispatch) => {
    const field = BLANK_FIELD;
    dispatch(updateGameState({
        isGameAlive: true,
        field,
        ...createNextFigureWithAttributes(field),
    }))
};
export const endGame = () => (dispatch) => {
    dispatch(pauseGame());
    showModal()
};

export const pauseGame = () => updateGameState({isGameAlive: false,});

export const resumeGame = () => updateGameState({isGameAlive: true});




