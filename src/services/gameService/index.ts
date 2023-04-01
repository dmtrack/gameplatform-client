import { Socket } from 'socket.io-client';
import { IPlayMatrix } from '../../components/tictactoeGame';
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
    public async updateGame(socket: Socket, gameMatrix: IPlayMatrix) {
        socket.emit(EVENTS.CLIENT.update_game, { matrix: gameMatrix });
    }
    public async onGameUpdate(
        socket: Socket,
        listener: (matrix: IPlayMatrix) => void
    ) {
        socket.on(EVENTS.CLIENT.on_game_update, ({ matrix }) =>
            listener(matrix)
        );
    }
}

export default new GameService();
