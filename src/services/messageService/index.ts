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

        socket
            .off(EVENTS.CLIENT.on_message)
            .on(EVENTS.CLIENT.on_message, (params: IServiceMessage) =>
                listener(params)
            );
    }


}
export default new MessageService();
