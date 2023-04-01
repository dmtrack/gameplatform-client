import React, { useEffect } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    color: #fff;
`;

const URL = process.env.REACT_APP_SOCKET;

function TicTacToe() {
    console.log('123');

    // useEffect(() => {
    //     connect();
    // }, []);
    return <AppContainer>TicTacToe</AppContainer>;
}

export default TicTacToe;
