import React from 'react';
import {connect} from "react-redux";
import styled from 'styled-components';
import camelCase from 'camelcase';
import createRepeat from '@avinlab/repeat';
import {pure} from 'recompose';

import {DIRECTION, STEP_TIME, KEY_REPEAT_TIME} from '../constants/Game'
import {Field} from "../components"
import {moveFigure, pauseGame, resumeGame} from '../actions'

const {DOWN, UP, LEFT, RIGHT, AROUND_ITS_AXIS} = DIRECTION;

const BoardContainer = styled.div`

`;
const generateRepeaterName = (direction) => {
    return camelCase(`${direction}_Movement`);
};

class Board extends React.Component {
    constructor(props) {
        super(props);
        const {isGameAlive} = props;
        isGameAlive && this.setUpStepTimer();
    }

    setUpStepTimer = () => {
        const {moveFigure} = this.props;

        this.stepTimer = setInterval(() => {
            moveFigure(DOWN)
        }, STEP_TIME)
    };
    cleanStepTimer = () => {
        const {stepTimer} = this;
        if (stepTimer) clearInterval(stepTimer);
    };


    handlePressEsc = () => {
        const {isGameAlive, resumeGame, pauseGame} = this.props;
        isGameAlive ? pauseGame() : resumeGame();
    };
    handleDownKeyDown = () => {
        this.cleanStepTimer();
        this.handleKeyLongPressDown(DOWN);
    };
    handleDownKeyUp = () => {
        this.handleKeyLongPressUp(DOWN);
        this.setUpStepTimer()
    };

    handleKeyLongPressDown = (direction) => {
        const repeaterName = generateRepeaterName(direction);
        this[repeaterName] = createRepeat({
            action: () => {
                this.props.moveFigure(direction)
            },
            delay: KEY_REPEAT_TIME,
            firstTimeDelay: KEY_REPEAT_TIME * 2,
        });

        this[repeaterName].start();
    };
    handleKeyLongPressUp = (direction) => {
        const repeaterName = generateRepeaterName(direction);
        let {[repeaterName]: repeater} = this;
        if (repeater) {
            repeater.stop();
            this[repeater] = null;
        }
    };


    componentDidMount() {

        this.keyboardListener = new window.keypress.Listener();

        this.keyboardListener.register_many([
            {
                keys: 'esc',
                is_exclusive: true,
                on_keydown: this.handlePressEsc,
                prevent_repeat: true,
            },
            {
                keys: 'space',
                is_exclusive: true,
                on_keydown: () => this.handleKeyLongPressDown(AROUND_ITS_AXIS),
                on_keyup: () => this.handleKeyLongPressUp(AROUND_ITS_AXIS),
                prevent_repeat: true,
            },
            {
                keys: 'right',
                is_exclusive: true,
                on_keydown: () => this.handleKeyLongPressDown(RIGHT),
                on_keyup: () => this.handleKeyLongPressUp(RIGHT),
                prevent_repeat: true,
            },
            {
                keys: 'left',
                is_exclusive: true,
                on_keydown: () => this.handleKeyLongPressDown(LEFT),
                on_keyup: () => this.handleKeyLongPressUp(LEFT),
                prevent_repeat: true,
            },

            {
                keys: 'down',
                is_exclusive: true,
                on_keydown: () => this.handleDownKeyDown(),
                on_keyup: () => this.handleDownKeyUp(),
                prevent_repeat: true,
            },
            {
                keys: 'up',
                is_exclusive: true,
                on_keydown: () => this.handleKeyLongPressDown(UP),
                on_keyup: () => this.handleKeyLongPressUp(UP),
                prevent_repeat: true,
            },
        ]);
    }

    componentWillUnmount() {
        this.cleanStepTimer();
        this.keyboardListener.reset();
    }

    componentWillReceiveProps({isGameAlive: newGameLivingState}) {
        const {isGameAlive} = this.props;

        if (!isGameAlive && newGameLivingState) this.setUpStepTimer();
        if (isGameAlive && !newGameLivingState) this.cleanStepTimer();
    }

    render() {
        const {} = this.props;


        return (
            <BoardContainer>
                <Field/>
            </BoardContainer>
        );
    }
}

const mapStateToProps = (state) => {
    const isGameAlive = state.get("isGameAlive");
    return {isGameAlive}
};
export default connect(
    mapStateToProps,
    {moveFigure, pauseGame, resumeGame}
)(pure(Board));



