import { connect } from 'http2';
import React, { SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

type Game = 'tictactoe' | 'warships' | null;

export interface IGameContextProps {
    users: string[];
    setUsers: (users: string[]) => void;
    isInRoom: boolean;
    setInRoom: (inRoom: boolean) => void;
    playerSymbol: 'x' | 'o';
    setPlayerSymbol: (symbol: 'x' | 'o') => void;
    game: 'tictactoe' | 'seawars';
    setGame: (game: 'tictactoe' | 'seawars') => void;
    isPlayerTurn: boolean;
    setPlayerTurn: (turn: boolean) => void;
    isGameStarted: boolean;
    setGameStarted: (started: boolean) => void;
}

const defaultState: IGameContextProps = {
    users: [],
    setUsers: () => {},
    isInRoom: false,
    setInRoom: () => {},
    playerSymbol: 'o',
    setPlayerSymbol: () => {},
    game: 'tictactoe',
    setGame: () => {},
    isPlayerTurn: false,
    setPlayerTurn: () => {},
    isGameStarted: false,
    setGameStarted: () => {},
};

export default React.createContext(defaultState);
