import React from 'react';
import {pure} from 'recompose';
import {Game, FigureConstructor} from './AppModes';
import {ModeSwitcherContainer, PaintedAntdSwitcher} from './style';

const ModeSwitcher = ({onChange}) => {
    return (
        <ModeSwitcherContainer>
            <div>Figure Contructor</div>
            <PaintedAntdSwitcher onChange={onChange} />
        </ModeSwitcherContainer>
    );
};

class TetrisView extends React.Component {
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

export const Tetris = pure(TetrisView);
