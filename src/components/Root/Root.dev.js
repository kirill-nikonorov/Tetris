import React from 'react';
import DevTools from '../devTools/DevTools';
import styled from 'styled-components';
import {Tetris} from '../index';

const RootContainer = styled.div`
    min-height: 100vh;
    background-color: #171734;
    width: 100%;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;
`;

class Root extends React.Component {
    render() {
        return (
            <RootContainer>
                <Tetris />
                <DevTools />
            </RootContainer>
        );
    }
}

export default Root;
