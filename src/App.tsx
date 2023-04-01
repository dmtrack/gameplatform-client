import React, { useEffect, useState } from 'react';
import './styles/styles.css';
import { Routes, Route, Link } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';
import EnterGame from './scenes/enter/EnterGame';
import Game from './scenes/game/Game';
import GameContext, { IGameContextProps } from './gameContext';
import socketService from './services/socketService';

const port = process.env.REACT_APP_SOCKET;

const App: React.FC = () => {
    const [isInRoom, setInRoom] = useState(false);

    const connectSocket = async () => {
        const socket = await socketService.connect(`${port}`).catch((err) => {
            console.log('Error: ', err);
        });
    };

    useEffect(() => {
        connectSocket();
    }, []);
    const gameContextValue: IGameContextProps = {
        isInRoom,
        setInRoom,
    };

    return (
        <div className='container'>
            <GameContext.Provider value={gameContextValue}>
                <Routes>
                    <Route path='/' element={<EnterGame />} />
                    <Route path='/chat' element={<Game />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </GameContext.Provider>
        </div>
    );
};

export default App;
