import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {saveFigure, deleteCustomFigure} from '../../actions/customFiguresData/index';
import {ConstructorBoard} from '../index';
import {BLANK_FIELD} from '../../utils/matrix';
import {fromJS, Map} from 'immutable';
import ColorChanger from '../AsidePanels/ColorChanger';
import ConstructorMenu from '../AsidePanels/ConstructorMenu';
import FiguresBar from '../AsidePanels/FiguresBar/FiguresBar';
import {extractFigureDataFromField} from '../../utils/field/extractFigureDataFromField';
import {AppContainer} from './style';
import {drawFigureOnField} from '../../utils/field/drawFigureOnField';

const defaultConstructedCellStyle = {
    background: '#d1f26d',
    color: '#9bbf30',
    borderColor: '#728c23',
    boxShadow: 'inset 0 0 1px 2px ',
    border: '1px solid '
};

const createNewDefaultState = () => {
    const newName = Date.now();
    return {
        figureName: `${newName}`,
        field: fromJS(BLANK_FIELD),
        cellStyle: defaultConstructedCellStyle,
        editingMode: false
    };
};

class FigureConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = createNewDefaultState();
    }

    addCellToField = (rowIndex, cellIndex) => {
        const {field, figureName} = this.state;
        if ((rowIndex >= 0) & (cellIndex >= 0) && field.hasIn([rowIndex, cellIndex]))
            this.setState({field: field.setIn([rowIndex, cellIndex], figureName)});
    };

    toggleCellAdding = (rowIndex, cellIndex) => {
        const {field} = this.state;
        const handlingMethod = !!field.getIn([rowIndex, cellIndex])
            ? this.removeCell
            : this.addCellToField;
        handlingMethod(rowIndex, cellIndex);
    };

    removeCell = (rowIndex, cellIndex) => {
        const {field} = this.state;
        this.setState({field: field.setIn([rowIndex, cellIndex], undefined)});
    };

    setUpNewCellStyle = newCellStyle => {
        const {cellStyle} = this.state;
        console.log(newCellStyle);
        this.setState({cellStyle: {...cellStyle, ...newCellStyle}});
    };

    loadFigureForEditing = name => {
        const {customFigures, customStyles, customFiguresCoordinates} = this.props;

        const figure = customFigures.get(name);
        const style = customStyles.get(name);
        const coordinates = customFiguresCoordinates.get(name);

        const x = coordinates.get('x');
        const y = coordinates.get('y');

        this.setState({
            figureName: name,
            field: drawFigureOnField(BLANK_FIELD, figure, x, y),
            cellStyle: style.toObject(),
            editingMode: true
        });
    };

    resetState = () => {
        this.setState(createNewDefaultState());
    };

    saveFigure = () => {
        const {field, cellStyle, figureName} = this.state;
        const isFieldEmpty = !field.some(row => row.some(cell => !!cell));
        if (isFieldEmpty) return;

        const {saveFigure} = this.props;

        const [figure, x, y] = extractFigureDataFromField(field);

        saveFigure({
            figureData: {
                name: figureName,
                figure: figure,
                figureStyle: fromJS(cellStyle),
                fieldCoordinates: fromJS({x, y})
            }
        });
        this.resetState();
    };
    deleteFigure = () => {
        const {deleteCustomFigure} = this.props;
        const {figureName} = this.state;

        deleteCustomFigure(figureName);
        this.resetState();
    };

    render() {
        const {figureName, field, cellStyle, editingMode} = this.state;
        const {customFigures} = this.props;

        return (
            <AppContainer>
                <ConstructorBoard
                    field={field}
                    cellStyle={cellStyle}
                    onBackGroundClick={this.addCellToField}
                    onFigureClick={this.toggleCellAdding}
                />
                <ColorChanger colorStyle={cellStyle} onColorChange={this.setUpNewCellStyle} />
                <FiguresBar
                    figuresCollection={customFigures}
                    isVisible={true}
                    onFigureClick={this.loadFigureForEditing}
                    accentedKey={figureName}
                />
                <ConstructorMenu
                    editingMode={editingMode}
                    onCleanButton={this.resetState}
                    onDeleteButton={this.deleteFigure}
                    onConfirmButton={this.saveFigure}
                />
            </AppContainer>
        );
    }
}

const mapStateToProps = state => {
    const customFiguresData = state.get('customFiguresData');
    const customFigures = customFiguresData.get('customFigures') || Map({});
    const customStyles = customFiguresData.get('figuresStyles') || Map({});
    const customFiguresCoordinates = customFiguresData.get('fieldCoordinates') || Map({});

    return {customFigures, customStyles, customFiguresCoordinates};
};

export default connect(
    mapStateToProps,
    {saveFigure, deleteCustomFigure}
)(pure(FigureConstructor));
