import React, { useEffect, useState } from 'react';
import './styles/styles.css';
import { Routes, Route } from 'react-router-dom';
import EnterGame from './scenes/enter/EnterGame';
import Game from './scenes/game/Game';
import GameContext, { IGameContextProps } from './context/gameContext';
import socketService from './services/socketService';

const App: React.FC = () => {
    const port = process.env.REACT_APP_SOCKET;

    const [isInRoom, setInRoom] = useState(false);
    const [playerSymbol, setPlayerSymbol] = useState<'x' | 'o'>('o');
    const [game, setGame] = useState<'tictactoe' | 'seawars'>('tictactoe');
    const [isPlayerTurn, setPlayerTurn] = useState(false);
    const [isGameStarted, setGameStarted] = useState(false);
    const [users, setUsers] = useState<string[]>([]);

    const gameContextValue: IGameContextProps = {
        users,
        setUsers,
        isInRoom,
        setInRoom,
        playerSymbol,
        setPlayerSymbol,
        game,
        setGame,
        isPlayerTurn,
        setPlayerTurn,
        isGameStarted,
        setGameStarted,
    };

    return (
        <div className='container'>
            <GameContext.Provider value={gameContextValue}>
                {!isInRoom && <EnterGame game={game} setGame={setGame} />}
                {isInRoom && <Game />}
            </GameContext.Provider>
        </div>
    );
};

export default App;
