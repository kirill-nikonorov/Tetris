import React from 'react';
import styled from 'styled-components';
import {Board} from '../components';
import {connect} from "react-redux";
import {pure} from "recompose";
import {startNewGame, endGame} from "../actions/gameStatus";


const AppContainer = styled.div`
   
`;
const Button = styled.button`
    margin: 10px;
`;

class Game extends React.Component {
    render() {
        const {startNewGame, endGame} = this.props;

        return (
            <AppContainer>
                {startNewGame()}
                <Board/>
                <Button autoFocus onClick={() => {
                    startNewGame();
                }}>Включить
                </Button>
                <Button onClick={() => {
                    endGame();
                }}>Отключить
                </Button>
            </AppContainer>
        );
    }
}

const mapStateToProps = () => {
    return {}
};
export default connect(
    mapStateToProps,
    { startNewGame, endGame}
)(pure(Game));

