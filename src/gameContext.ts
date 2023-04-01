import React, { SetStateAction } from 'react';

type Game = 'tictactoe' | 'warships' | null;

export interface IGameContextProps {
    isInRoom: boolean;
    setInRoom: (inRoom: boolean) => void;
    playerSymbol: 'x' | 'o';
    setPlayerSymbol: (symbol: 'x' | 'o') => void;
    game: 'tictactoe' | 'seawars';
    setGame: (game: 'tictactoe' | 'seawars') => void;
}

const defaultState: IGameContextProps = {
    isInRoom: false,
    setInRoom: () => {},
    playerSymbol: 'x',
    setPlayerSymbol: () => {},
    game: 'tictactoe',
    setGame: () => {},
};

export default React.createContext(defaultState);
