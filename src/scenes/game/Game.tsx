import { useLocation, useNavigate } from 'react-router-dom';
import { IServiceMessage, LoginParams } from '../../interfaces/chat.interface';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import styles from './chat.module.css';
import icon from '../../images/emoji.svg';
import Messages from '../../components/messages/Messages';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { TicTacToe } from '../../components/tictactoeGame';
import socketService from '../../services/socketService';
import gameContext from '../../gameContext';
import messageService from '../../services/messageService';

const Game = () => {
    const { search } = useLocation();
    const [params, setParams] = useState<LoginParams>({ room: '', name: '' });
    const [state, setState] = useState<IServiceMessage[]>([]);
    const [message, setMessage] = useState<string>('');
    const [isOpen, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const searchParams: LoginParams = Object.fromEntries(
            new URLSearchParams(search)
        );
        setParams(searchParams);
    }, []);

    const { setInRoom, setGameStarted } = useContext(gameContext);

    const handleGetMessage = () => {
        if (socketService.socket)
            messageService.onMessage(socketService.socket, (params) => {
                setState((_state) => [..._state, params]);
            });
    };

    useEffect(() => {
        handleGetMessage();
    }, []);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
    };

    const handleLeftRoom = () => {
        const socket = socketService.socket;
        setInRoom(false);
        setGameStarted(false);
        socket?.disconnect();
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!message) return;
        if (socketService.socket) {
            console.log(params);

            messageService.sendMessage(socketService.socket, {
                message,
                name: params.name,
                room: params.room,
            });
            setMessage('');
        }
    };

    const onEmojiClick = (emojiData: string) =>
        setMessage(`${message} ${emojiData}`);

    return (
        <>
            <div className={styles.core}>
                <div className={styles.nav}></div>
                <div className={styles.wrap_game}>
                    <TicTacToe />
                </div>

                <div className={styles.wrap_chat}>
                    <div className={styles.header}>
                        <div className={styles.title}>id:{params?.room}</div>
                        <div className={styles.users}></div>
                        <button
                            className={styles.left}
                            onClick={handleLeftRoom}>
                            Left the room
                        </button>
                    </div>

                    <div className={styles.messages}>
                        <Messages messages={state} username={params.name} />
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.input}>
                            <input
                                placeholder='what do you want to say?'
                                type='text'
                                name='message'
                                value={message}
                                autoComplete='off'
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.emoji}>
                            <img
                                src={icon}
                                alt=''
                                onClick={() => setOpen(!isOpen)}
                            />
                            {isOpen && (
                                <div className={styles.emojies}>
                                    <EmojiPicker
                                        onEmojiClick={(
                                            emojiData: EmojiClickData,
                                            event: MouseEvent
                                        ) => onEmojiClick(emojiData.emoji)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.button}>
                            <input type='submit' value='Send' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Game;
