import React from 'react';
import {pure} from 'recompose';
import {RightAsideBlock} from './style/index';

const style = {width: '100px'};

class ColorChanger extends React.Component {
    render() {
        const {onColorChange, colorStyle} = this.props;

        const {background, borderColor, color} = colorStyle;

        return (
            <RightAsideBlock style={style} isVisible={true}>
                <div>
                    inner color:
                    <br />
                    <input
                        type="color"
                        value={background}
                        onChange={e => onColorChange({background: e.target.value})}
                    />
                </div>
                <div>
                    middle color:
                    <br />
                    <input
                        type="color"
                        value={color}
                        onChange={e => onColorChange({color: e.target.value})}
                    />
                </div>
                <div>
                    outer color:
                    <br />
                    <input
                        type="color"
                        value={borderColor}
                        onChange={e => onColorChange({borderColor: e.target.value})}
                    />
                </div>
            </RightAsideBlock>
        );
    }
}

export default pure(ColorChanger);
