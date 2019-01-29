import React from 'react';
import {connect} from 'react-redux';
import camelCase from 'camelcase';
import createRepeat from '@avinlab/repeat';
import {pure} from 'recompose';
import {DIRECTION, STEP_TIME, KEY_REPEAT_TIME} from '../../constants/Game';
import Figure from '../Figure/Figure';
import {moveFigure, toggleGameOn, togglePause} from '../../actions/gameState/index';
import {BACKGROUND} from '../../constants/Figures';
import {checkIsGameOn} from '../../utils/gameStatus';
import {BoardContainer} from './style';

const {DOWN, UP, LEFT, RIGHT, AROUND_ITS_AXIS, TO_BOTTOM} = DIRECTION;

const generateRepeaterName = direction => {
    return camelCase(`${direction}_Movement`);
};

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        const {isGameOn} = props;
        isGameOn && this.setUpStepTimer();
    }

    setUpStepTimer = () => {
        const {moveFigure} = this.props;

        this.stepTimer = setInterval(() => {
            moveFigure(DOWN);
        }, STEP_TIME);
    };
    cleanStepTimer = () => {
        const {stepTimer} = this;
        if (stepTimer) clearInterval(stepTimer);
    };

    handlePressEsc = () => {
        const {togglePause} = this.props;
        togglePause();
    };
    handleDownKeyDown = () => {
        this.cleanStepTimer();
        this.handleKeyLingeringPressDown(DOWN);
    };
    handleDownKeyUp = () => {
        this.handleKeyLingeringPressUp(DOWN);
        this.setUpStepTimer();
    };

    handleSpaceKeyDown = () => {
        const {isGameOn, toggleGameOn} = this.props;
        isGameOn ? this.handleKeyLingeringPressDown(AROUND_ITS_AXIS) : toggleGameOn();
    };

    handleKeyLingeringPressDown = direction => {
        const repeaterName = generateRepeaterName(direction);
        this[repeaterName] = createRepeat({
            action: () => {
                this.props.moveFigure(direction);
            },
            delay: KEY_REPEAT_TIME,
            firstTimeDelay: KEY_REPEAT_TIME * 2
        });

        this[repeaterName].start();
    };
    handleKeyLingeringPressUp = direction => {
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
                keys: 'b',
                is_exclusive: true,
                on_keydown: () => this.props.moveFigure(TO_BOTTOM),
                prevent_repeat: true
            },
            {
                keys: 'esc',
                is_exclusive: true,
                on_keydown: this.handlePressEsc,
                prevent_repeat: true
            },
            {
                keys: 'space',
                is_exclusive: true,
                on_keydown: () => this.handleSpaceKeyDown(),
                on_keyup: () => this.handleKeyLingeringPressUp(AROUND_ITS_AXIS),
                prevent_repeat: true
            },
            {
                keys: 'right',
                is_exclusive: true,
                on_keydown: () => this.handleKeyLingeringPressDown(RIGHT),
                on_keyup: () => this.handleKeyLingeringPressUp(RIGHT),
                prevent_repeat: true
            },
            {
                keys: 'left',
                is_exclusive: true,
                on_keydown: () => this.handleKeyLingeringPressDown(LEFT),
                on_keyup: () => this.handleKeyLingeringPressUp(LEFT),
                prevent_repeat: true
            },

            {
                keys: 'down',
                is_exclusive: true,
                on_keydown: () => this.handleDownKeyDown(),
                on_keyup: () => this.handleDownKeyUp(),
                prevent_repeat: true,
                prevent_default: true
            },
            {
                keys: 'up',
                is_exclusive: true,
                on_keydown: () => this.handleKeyLingeringPressDown(UP),
                on_keyup: () => this.handleKeyLingeringPressUp(UP),
                prevent_repeat: true
            }
        ]);
    }

    componentWillUnmount() {
        this.cleanStepTimer();
        this.keyboardListener.reset();
    }

    componentWillReceiveProps({isGameOn: isNewGameOn}) {
        const {isGameOn} = this.props;

        if (!isGameOn && isNewGameOn) this.setUpStepTimer();
        if (isGameOn && !isNewGameOn) this.cleanStepTimer();
    }

    render() {
        const {field, y, x, currentFigure, shadowY} = this.props;

        return (
            <BoardContainer>
                <Figure cells={BACKGROUND} />

                <Figure cells={field} />

                {currentFigure && (
                    <Figure
                        cells={currentFigure}
                        x={x}
                        y={shadowY}
                        shadow={true}
                    />
                )}

                {currentFigure && (
                    <Figure cells={currentFigure} x={x} y={y}  />
                )}
            </BoardContainer>
        );
    }
}

const mapStateToProps = state => {
    const gameState = state.get('gameState');

    const boardState = gameState.get('boardState');
    const field = boardState.get('field');
    const currentFigure = boardState.get('currentFigure');
    const figureCoordinate = boardState.get('figureCoordinate');
    const y = figureCoordinate.get('y') || 0;
    const x = figureCoordinate.get('x') || 0;
    const shadowY = boardState.get('shadowY');
    const gameStatus = gameState.get('gameStatus');
    const isGameOn = checkIsGameOn(gameStatus);

    return {isGameOn, field, y, x, currentFigure, shadowY};
};

export default connect(
    mapStateToProps,
    {moveFigure, toggleGameOn, togglePause}
)(pure(GameBoard));
