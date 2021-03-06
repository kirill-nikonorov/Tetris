import React from 'react';
import styled from 'styled-components';
import {pure} from 'recompose';
import {LeftBasedBarBlock} from './style';
import {FigureItem} from './FigureItem';

const CentringFlex = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

class FiguresBarView extends React.Component {
    render() {
        const {figuresCollection, isVisible, onFigureClick, accentedKey} = this.props;

        if (figuresCollection.size === 0) return '';

        return (
            <LeftBasedBarBlock isVisible={isVisible} countOfItems={figuresCollection.size}>
                <CentringFlex>
                    {figuresCollection.reduce((arrayWithFigures, figure, identifier) => {
                        arrayWithFigures.push(
                            <FigureItem
                                cells={figure}
                                onClick={onFigureClick && (() => onFigureClick(identifier))}
                                isAccented={accentedKey === identifier}
                                key={identifier}
                            />
                        );
                        return arrayWithFigures;
                    }, [])}
                </CentringFlex>
            </LeftBasedBarBlock>
        );
    }
}

export const FiguresBar = pure(FiguresBarView);
