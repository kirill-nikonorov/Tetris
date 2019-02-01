import React from 'react';
import {pure} from 'recompose';
import {RightAsideBlock} from './style';

const style = {width: '100px'};

class ColorChangerView extends React.Component {
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

export const ColorChanger = pure(ColorChangerView);
