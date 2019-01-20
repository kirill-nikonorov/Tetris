import {fromJS} from 'immutable';
import {BACKGROUND_FIELD} from '../utils/matrix';

const initializeMatrix = (matrix, name) => matrix.map(row => row.map(cell => (cell ? name : 0)));

const getFigures = figuresPrototypes =>
    figuresPrototypes.map((prototype, figureName) => {
        return initializeMatrix(prototype.get('matrix'), figureName);
    });

const getStyles = figuresPrototypes => figuresPrototypes.map(prototype => prototype.get('style'));

const FIGURES_PROTOTYPES = fromJS({
    I: {
        // prettier-ignore
        matrix: [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ],
        style: {
            background: '#ff7373',
            color: '#db3737',
            'border-color': '#a82a2a'
        }
    },
    L: {
        // prettier-ignore
        matrix: [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]
            ],
        style: {
            background: '#3dcc91',
            color: '#0f9960',
            'border-color': '#0a6640'
        }
    },
    J: {
        // prettier-ignore
        matrix: [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
        style: {
            background: '#48aff0',
            color: '#137cbd',
            'border-color': '#1f4b99'
        }
    },
    O: {
        // prettier-ignore
        matrix: [
                [1, 1],
                [1, 1],
            ],
        style: {
            background: '#ffc940',
            color: '#d99e0b',
            'border-color': '#a67908'
        }
    },
    T: {
        // prettier-ignore
        matrix: [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ],
        style: {
            background: '#ad99ff',
            color: '#7157d9',
            'border-color': '#5642a6'
        }
    },
    S: {
        // prettier-ignore
        matrix: [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ],
        style: {
            background: '#c99765',
            color: '#96622d',
            'border-color': '#63411e'
        }
    },
    Z: {
        // prettier-ignore
        matrix: [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ],
        style: {
            background: '#2ee6d6',
            color: '#00b3a4',
            'border-color': '#008075'
        }
    }

    /*   III: {
            // prettier-ignore
            matrix: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            style: {
                background: '#ad99ff',
                color: '#7157d9',
                'border-color': '#5642a6'
            }
        },*/
});
export const FIGURES = getFigures(FIGURES_PROTOTYPES);
export const FIGURES_STYLES = getStyles(FIGURES_PROTOTYPES);

const [backgroundEvenPartTemplate, backgroundOddPartTemplate] = BACKGROUND_FIELD;

const BACKGROUND_PROTOTYPES = fromJS({
    backgroundEvenPart: {
        matrix: backgroundEvenPartTemplate,
        style: {
            background: '#293742',
            'box-shadow': 'inset 0 0 1px 2px #293742'
        }
    },

    backgroundOddPart: {
        matrix: backgroundOddPartTemplate,
        style: {
            background: '#2f3c49',
            'box-shadow': 'inset 0 0 1px 2px #293742'
        }
    }
});

export const BACKGROUND = getFigures(BACKGROUND_PROTOTYPES);
export const BACKGROUND_STYLES = getStyles(BACKGROUND_PROTOTYPES);
