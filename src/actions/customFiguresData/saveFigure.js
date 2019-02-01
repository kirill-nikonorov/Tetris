import {setUpCustomFiguresData} from '../../lib/reduxActions/actions/customFigures';

export const saveFigure = ({figureData: {name, fieldCoordinates, figure, figureStyle}}) => (
    dispatch,
    getState
) => {
    const customFiguresData = getState().get('customFiguresData');
    const newData = customFiguresData
        .setIn(['customFigures', name], figure)
        .setIn(['figuresStyles', name], figureStyle)
        .setIn(['fieldCoordinates', name], fieldCoordinates);

    dispatch(setUpCustomFiguresData({newData}));
};
