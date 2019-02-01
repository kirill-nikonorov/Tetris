import React from 'react';

import {pure} from 'recompose';

import {Scaller, FigureItemContainer} from './style';
import {Cells} from '../../Cells/Cells';

class FigureItemView extends React.Component {
    render() {
        const {cells, onClick, isAccented} = this.props;

        return (
            <FigureItemContainer onClick={onClick} isAccented={isAccented}>
                <Scaller cells={cells}>
                    <Cells cells={cells} />
                </Scaller>
            </FigureItemContainer>
        );
    }
}

export const FigureItem = pure(FigureItemView);
