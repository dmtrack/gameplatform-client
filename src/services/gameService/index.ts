import { Socket } from 'socket.io-client';
import EVENTS from '../../config/events';

class GameService {
    public async joinGameRoom(
        socket: Socket,
        room: string,
        name: string
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            socket.emit(EVENTS.CLIENT.join_game, { room, name });
            socket.on(EVENTS.CLIENT.room_joined, () => {
                resolve(true);
            });
            socket.on(EVENTS.CLIENT.room_join_error, ({ error }) =>
                reject(error)
            );
        });
    }
}

export default new GameService();
