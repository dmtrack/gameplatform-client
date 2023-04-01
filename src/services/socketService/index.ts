import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import EVENTS from '../../config/events';

class SocketService {
    public socket: Socket | null = null;

    public connect(
        url: string
    ): Promise<Socket<DefaultEventsMap, DefaultEventsMap>> {
        return new Promise((resolve, reject) => {
            this.socket = io(url);
            if (!this.socket) return reject;

            this.socket?.on(EVENTS.CLIENT.connect, () => {
                resolve(this.socket as Socket);
            });
            this.socket.on(EVENTS.CLIENT.connect_error, (err) => {
                console.log('connection error:', err);
            });
        });
    }
}

export default new SocketService();
