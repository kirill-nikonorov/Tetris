import styled from 'styled-components';
import {Switch} from 'antd';

const gameFontColor = 'white';
const gameBackGroundColor = '#26323b';

export const ModeSwitcherContainer = styled.div`
    color: ${gameFontColor};
    padding: 5px;
`;

export const PaintedAntdSwitcher = styled(Switch)`
    background-color: ${gameBackGroundColor} !important;
`;
