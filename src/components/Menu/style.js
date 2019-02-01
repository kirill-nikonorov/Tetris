import styled from 'styled-components';

export const BigSymbols = styled.div`
    font-size: 50px;
    color: white;
`;

export const TextCentralizer = styled.div`
    text-align: center;
    width: 100%;
`;

export const MenuContainer = styled.div`
    display: ${({isVisible}) => (isVisible ? 'flex' : 'none')}
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1 ;
    background: rgb(47,60,73 , 0.7);
    align-items: center;
    justify-content: space-around;
    align-content: center
    flex-wrap: wrap;
    color:white;
 `;
