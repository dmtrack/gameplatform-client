import { IStartGame } from './../../components/tictactoeGame/index';
import { Socket } from 'socket.io-client';
import { IPlayMatrix } from '../../components/tictactoeGame';
import EVENTS from '../../config/events';
import { IServiceMessage } from '../../interfaces/chat.interface';

class MessageService {
    public async joinChat(socket: Socket, room: string, name: string) {
        socket.emit(EVENTS.CLIENT.join_chat, { room, name });
    }

    public async sendMessage(socket: Socket, params: any) {
        socket.emit(EVENTS.CLIENT.message, params);
    }

    public async onMessage(
        socket: Socket,
        listener: (params: IServiceMessage) => void
    ) {
        console.log('hello');

        socket.on(EVENTS.CLIENT.on_message, (params) => listener(params));
    }

    // public async gameWin(socket: Socket, message: string) {
    //     socket.emit(EVENTS.CLIENT.game_win, { message });
    // }

    // public async onGameWin(
    //     socket: Socket,
    //     listener: (message: string) => void
    // ) {
    //     socket.on(EVENTS.CLIENT.on_game_win, ({ message }) =>
    //         listener(message)
    //     );
    // }

    // public async onStartGame(
    //     socket: Socket,
    //     listener: (options: IStartGame) => void
    // ) {
    //     socket.on(EVENTS.CLIENT.start_game, listener);
    // }
    // }
}
export default new MessageService();
