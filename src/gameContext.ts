import React from 'react';

type Game = 'tictactoe' | 'warships' | null;

export interface IGameContextProps {
    isInRoom: boolean;
    setInRoom: (inRoom: boolean) => void;
}

const defaultState: IGameContextProps = {
    isInRoom: false,
    setInRoom: () => {},
};

export default React.createContext(defaultState);
