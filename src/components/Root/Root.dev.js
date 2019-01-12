import React from 'react';
import {Game} from '../index';
import DevTools from '../../containers/DevTools';
import styled from 'styled-components'

const RootContainer = styled.div`
    min-height: 100vh;
    background-color: #555;
    border: 1px solid #3e9ce8;
    max-width: 1000px;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;
`

class Root extends React.Component {
    render() {
        return (
            <RootContainer>
                <Game/>
                <DevTools/>
            </RootContainer>
        );
    }
}


export default Root;
