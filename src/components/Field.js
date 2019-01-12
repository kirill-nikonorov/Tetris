import React from 'react';
import styled from 'styled-components';

import {CELL_HEIGHT_PX, CELL_WIDTH_PX, VERTICAL_CELLS_COUNT, HORIZONTAL_CELLS_COUNT} from '../constants/Game';

import {pure} from 'recompose';
import {connect} from 'react-redux';
import Cell from "../components/Cell"
import {drawFigureOnField} from "../utils/Field"
import {BLANK_FIELD} from '../utils/Matrix'


const FieldContainer = styled.div`
    height: ${VERTICAL_CELLS_COUNT * CELL_HEIGHT_PX}px;
    width: ${HORIZONTAL_CELLS_COUNT * CELL_WIDTH_PX}px;
    position: relative;
`;
const Row = styled.div`
`;

const renderField = (field) => field.map((row, rowIndex) => (
        <Row key={rowIndex}>
            {row.map((cell, cellIndex) => {
                return (<Cell marked={cell} y={rowIndex * CELL_HEIGHT_PX} x={cellIndex * CELL_WIDTH_PX}
                              key={cellIndex}/>)
            })}
        </Row>
    )
);

const renderFigure = (figure, x, y, shadow = false) => {
    return figure.reduce((figureFillCells, row, rowIndex) => {

            row.forEach((cell, cellIndex) => {
                if (cell) {
                    const CellY = y + rowIndex;
                    const CellX = x + cellIndex;
                    return figureFillCells.push(
                        <Cell marked={cell}
                              shadow={shadow}
                              y={CellY * CELL_HEIGHT_PX}
                              x={CellX * CELL_WIDTH_PX}
                              key={`Figure: ${CellY}, ${CellX} `}/>)
                }
            });
            return figureFillCells;
        }, []
    )
};

class Field extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {figure, shadowY, field, y, x} = this.props;

           return (
            <FieldContainer>
                {renderField(field)}
                {figure && renderFigure(figure, x, y)}
                {figure && renderFigure(figure, x, shadowY, true)}
            </FieldContainer>
        );
    }
}

const mapStateToProps = (state) => {


    const field = state.get('field');
    const figure = state.get('figure');
    const figureCoordinate = state.get('figureCoordinate');
    const y = figureCoordinate.get('y') || 0;
    const x = figureCoordinate.get('x') || 0;
    const shadowY = state.get("shadowY");
    return {field, y, x, figure, shadowY}

};


export default connect(
    mapStateToProps,
    {}
)(pure(Field));


