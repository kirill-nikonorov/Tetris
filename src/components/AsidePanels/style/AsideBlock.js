import styled from 'styled-components';

export const INTER_ELEMENT_DISTANCE = 5;

export const computePixels = (...pixelsDigits) => {
    return `${pixelsDigits.reduce((sum, pixels) => {
        return sum + parseInt(pixels);
    }, 0)}px`;
};
export const findShiftNeededToCenterBlock = (containerData, elemData) =>
    `${(parseInt(containerData) - parseInt(elemData)) / 2}px`;

export const AsideBlockContainer = styled.div.attrs({
    hidden: ({isVisible}) => !isVisible
})`
    position: absolute;
    color: white;
    text-align: center;
    background: #26323b;
    box-shadow: inset 0 0 5px 5px #2f3c49;
    padding: 5px;
`;
