import styled from 'styled-components';

export const AsideBlock = styled.div`
    display: ${({isVisible}) => !isVisible && 'none'};
    position: absolute;
    color: white
    text-align: center;
    background: #26323b;
    box-shadow: inset 0 0 5px 5px  #2f3c49;
    padding:5px;
`;
