import {fromJS} from 'immutable';

const initializeMatrix = (matrix, name) => matrix.map(row => row.map(cell => (cell ? name : 0)));

const extractCells = figuresPrototypes =>
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
            borderColor: '#a82a2a'
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
            borderColor: '#0a6640'
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
            borderColor: '#1f4b99'
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
            borderColor: '#a67908'
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
            borderColor: '#5642a6'
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
            borderColor: '#63411e'
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
            borderColor: '#008075'
        }
    }
});

export const DEFAULT_FIGURES = extractCells(FIGURES_PROTOTYPES);
export const DEFAULT_FIGURES_STYLES = getStyles(FIGURES_PROTOTYPES);
