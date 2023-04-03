import React, {
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import gameContext from '../../context/gameContext';
import { IEnterRoom } from '../../interfaces/main.interface';
import gameService from '../../services/gameService';
import socketService from '../../services/socketService';
import main from '../../styles/main.module.css';
import messageService from '../../services/messageService';
import { Link } from 'react-router-dom';

interface ITypeGameProps {
    game: 'tictactoe' | 'seawars';
    setGame: (game: 'tictactoe' | 'seawars') => void;
}

const EnterGame = ({ game = 'tictactoe', setGame }: ITypeGameProps) => {
    const [values, setValues] = useState<IEnterRoom>({
        name: '',
        room: '',
    });
    const port = process.env.REACT_APP_SOCKET;

    const connectSocket = useCallback(async () => {
        await socketService.connect(`${port}`).catch((err) => {
            console.log('Error: ', err);
        });
    }, []);

    useEffect(() => {
        connectSocket();
    }, []);

    const [isJoining, setJoining] = useState(false);
    const { setInRoom } = useContext(gameContext);

    const joinRoom = async (e: React.MouseEvent<HTMLElement>) => {
        const isDisabled = Object.values(values).some(
            (value: string) => !value
        );
        if (isDisabled) e.preventDefault();
        const socket = socketService.socket;

        if (!values.room || values.room.trim() === '' || !socket) return;
        setJoining(true);
        const joined = await gameService
            .joinGameRoom(socket, values.room, values.name)
            .catch((err) => {
                console.log('err');

                alert(err);
            });
        await messageService.joinChat(socket, values.room, values.name);

        if (joined) setInRoom(true);
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleSetGame = (e: React.FormEvent<HTMLElement>) => {
        setGame(game === 'tictactoe' ? 'seawars' : 'tictactoe');
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
                            placeholder='id'
                            type='text'
                            name='room'
                            value={values.room}
                            className={main.input}
                            onChange={handleChange}
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div className={main.radio}>
                        <label htmlFor='tictactoe'>TicTacToe</label>

                        <input
                            type='radio'
                            name='tictactoe'
                            value={game}
                            checked={game === 'tictactoe'}
                            onChange={handleSetGame}
                        />
                        <input
                            type='radio'
                            name='seawars'
                            value={game}
                            checked={game === 'seawars'}
                            onChange={handleSetGame}
                        />
                        <label htmlFor='seawars'>Seawars</label>
                    </div>
                    <div className={main.group}>
                        <Link
                            to={`/chat/?name=${values.name}&room=${values.room}`}
                            className={main.group}
                            onClick={joinRoom}>
                            <button
                                className={main.button}
                                disabled={isJoining}>
                                {isJoining ? 'Joining...' : 'Join'}
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnterGame;
