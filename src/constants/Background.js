import {fromJS} from 'immutable';
import {generateStripeBackgroundCells} from '../utils/matrix';

export const BACKGROUND_STYLES = fromJS({
    backgroundEvenPart: {
        background: '#293742',
        boxShadow: 'inset 0 0 1px 2px #293742',
        borderColor: 'black'
    },

    backgroundOddPart: {
        background: '#2f3c49',
        boxShadow: 'inset 0 0 1px 2px #293742',
        borderColor: 'black'
    }
});

const backgroundsPartsNames = [...BACKGROUND_STYLES.keys()];

export const BACKGROUND = fromJS(generateStripeBackgroundCells(backgroundsPartsNames));
