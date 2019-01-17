import {fromJS} from 'immutable';
import {BACKGROUND_FIELD} from '../utils/Matrix';

const fillCellsByFigureKey = (matrix, key) => matrix.map(row => row.map(cell => (cell ? key : 0)));

const mapWithReadyMatrixes = cells =>
    cells.map((template, figureKey) => {
        return fillCellsByFigureKey(template.get('matrix'), figureKey);
    });

const mapWithStyles = cells => cells.map(template => template.get('style'));

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
    G: {
        // prettier-ignore
        matrix: [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ],
        style: {
            background: '#3dcc91',
            color: '#0f9960',
            'border-color': '#0a6640'
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

export const FIGURES = mapWithReadyMatrixes(FIGURES_PROTOTYPES);
export const FIGURES_COLORS = mapWithStyles(FIGURES_PROTOTYPES);

const [backgroundEvenPartTemplate, backgroundOddPartTemplate] = BACKGROUND_FIELD;

const BACKGROUND_TEMPLATES = fromJS({
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

export const BACKGROUND = mapWithReadyMatrixes(BACKGROUND_TEMPLATES);
export const BACKGROUND_COLORS = mapWithStyles(BACKGROUND_TEMPLATES);
