import React from 'react';
import {pure} from 'recompose';
import styled from 'styled-components';
import {Button} from 'antd';
import {BottomAsideBlock} from './style/index';

const style = {
    height: '50px',
    width: '250px'
};

const ButtonContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
`;

class ConstructorMenu extends React.Component {
    render() {
        const {onConfirmButton, onDeleteButton, onCleanButton, editingMode} = this.props;

        return (
            <BottomAsideBlock isVisible={true} style={style}>
                <ButtonContainer>
                    <Button type="danger" onClick={editingMode ? onDeleteButton : onCleanButton}>
                        {editingMode ? 'Удалить' : 'Сброс'}
                    </Button>
                    <Button onClick={onConfirmButton}>Сохранить</Button>
                </ButtonContainer>
            </BottomAsideBlock>
        );
    }
}

export default pure(ConstructorMenu);
