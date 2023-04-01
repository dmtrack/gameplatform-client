import React, { useEffect, useState } from 'react';
import './styles/styles.css';
import { Routes, Route } from 'react-router-dom';
import EnterGame from './scenes/enter/EnterGame';
import Game from './scenes/game/Game';
import GameContext, { IGameContextProps } from './gameContext';
import socketService from './services/socketService';
import NotFoundPage from './components/NotFoundPage';

const port = process.env.REACT_APP_SOCKET;

const App: React.FC = () => {
    const [isInRoom, setInRoom] = useState(false);
    const [playerSymbol, setPlayerSymbol] = useState<'x' | 'o'>('x');
    const [game, setGame] = useState<'tictactoe' | 'seawars'>('tictactoe');

    const connectSocket = async () => {
        const socket = await socketService.connect(`${port}`).catch((err) => {
            console.log('Error: ', err);
        });
    };
    console.log(game);

    useEffect(() => {
        connectSocket();
    }, []);
    const gameContextValue: IGameContextProps = {
        isInRoom,
        setInRoom,
        playerSymbol,
        setPlayerSymbol,
        game,
        setGame,
    };

    return (
        <div className='container'>
            <GameContext.Provider value={gameContextValue}>
                {!isInRoom && <EnterGame game={game} setGame={setGame} />}
                {isInRoom && game === 'tictactoe' ? <Game /> : <NotFoundPage />}
            </GameContext.Provider>
        </div>
    );
};

export default App;
