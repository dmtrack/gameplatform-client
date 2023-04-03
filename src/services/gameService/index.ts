import { IStartGame } from './../../components/tictactoeGame/index';
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
            socket
                .off(EVENTS.CLIENT.room_joined)
                .on(EVENTS.CLIENT.room_joined, () => {
                    resolve(true);
                });
            socket
                .off(EVENTS.CLIENT.room_join_error)
                .on(EVENTS.CLIENT.room_join_error, ({ error }: any) =>
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
        socket
            .off(EVENTS.CLIENT.on_game_update)
            .on(EVENTS.CLIENT.on_game_update, ({ matrix }: any) =>
                listener(matrix)
            );
    }

    public async gameWin(socket: Socket, message: string) {
        socket.emit(EVENTS.CLIENT.game_win, { message });
    }

    public async onGameWin(
        socket: Socket,
        listener: (message: string) => void
    ) {
        socket.on(EVENTS.CLIENT.on_game_win, ({ message }) =>
            listener(message)
        );
    }

    public async onStartGame(
        socket: Socket,
        listener: (options: IStartGame) => void
    ) {
        socket.on(EVENTS.CLIENT.start_game, listener);
    }

    public async onSecondPlayerJoin(
        socket: Socket,
        listener: (options: IStartGame) => void
    ) {
        socket.on(EVENTS.CLIENT.start_game_second, listener);
    }
}

export default new GameService();
