import React from 'react';

import {pure} from 'recompose';
import Figure from '../../Figure/Figure';
import {Scaller, FigureItemContainer} from './style';

class FigureExposingBox extends React.Component {
    render() {
        const {cells, onClick, isAccented} = this.props;

        return (
            <FigureItemContainer onClick={onClick} isAccented={isAccented}>
                <Scaller cells={cells}>
                    <Figure cells={cells} />
                </Scaller>
            </FigureItemContainer>
        );
    }
}

export default pure(FigureExposingBox);
