import React, { useContext, useEffect, useState } from 'react';
import gameContext from '../../gameContext';
import { IEnterRoom } from '../../interfaces/main.interface';
import gameService from '../../services/gameService';
import socketService from '../../services/socketService';
import main from '../../styles/main.module.css';

const EnterGame = () => {
    const [values, setValues] = useState<IEnterRoom>({
        name: '',
        room: '',
    });
    const [isJoining, setJoining] = useState(false);
    const { setInRoom, isInRoom } = useContext(gameContext);

    const joinRoom = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const socket = socketService.socket;

        if (!values.room || values.room.trim() === '' || !socket) return;
        setJoining(true);
        const joined = await gameService
            .joinGameRoom(socket, values.room, values.name)
            .catch((err) => {
                console.log('err');

                alert(err);
            });
        console.log('join', joined);
        console.log(joined, 'joined');

        if (joined) setInRoom(true);
        setJoining(false);
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const isDisabled = Object.values(values).some(
            (value: string) => !value
        );
        if (isDisabled) e.preventDefault();
    };
    return (
        <div className={main.wrap}>
            <div className={main.container}>
                <h1 className={main.heading}>Let's start</h1>
                <form className={main.form}>
                    {' '}
                    <div className={main.group}>
                        <input
                            placeholder='username'
                            type='text'
                            name='name'
                            value={values.name}
                            className={main.input}
                            autoComplete='off'
                            onChange={handleChange}
                        />
                    </div>
                    <div className={main.group}>
                        <input
                            placeholder='room'
                            type='text'
                            name='room'
                            value={values.room}
                            className={main.input}
                            onChange={handleChange}
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div className={main.group}>
                        <button
                            className={main.button}
                            onClick={joinRoom}
                            disabled={isJoining}>
                            {' '}
                            {isJoining ? 'Joining...' : 'Join'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnterGame;
