import React from 'react';
import styled from 'styled-components';

import {pure} from 'recompose';
import Game from './AppModes/Game';
import {Switch} from 'antd';
import {gameBackGroundColor, gameFontColor} from './styles/colors';
import FigureConstructor from './AppModes/FigureCreatingMode';

const ModeSwitcherContainer = styled.div`
    color: ${gameFontColor};
    padding: 5px;
`;

const PaintedAntdSwitcher = styled(Switch)`
    background-color: ${gameBackGroundColor} !important;
`;

const ModeSwitcher = ({onChange}) => {
    return (
        <ModeSwitcherContainer>
            <div>Figure Contructor</div>
            <PaintedAntdSwitcher onChange={onChange} />
        </ModeSwitcherContainer>
    );
};

class Tetris extends React.Component {
    state = {showGame: true};

    handleModeChange = checked => {
        this.setState({showGame: !checked});
    };
    render() {
        const {showGame} = this.state;

        return (
            <div>
                <ModeSwitcher onChange={this.handleModeChange} />
                {showGame ? <Game /> : <FigureConstructor />}
            </div>
        );
    }
}

export default pure(Tetris);
