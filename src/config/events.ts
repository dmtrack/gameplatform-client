const EVENTS = {
    CLIENT: {
        connect: 'connect',
        connect_error: 'connect_error',
        join_game: 'join_game',
        room_joined: 'room_joined',
        room_join_error: 'room_join_error',
        update_game: 'update_game',
        on_game_update: 'on_game_update',
    },
    SERVER: {
        connect: 'connect',
        connect_error: 'connect_error',
        join_game: 'join_game',
        room_joined: 'room_joined',
        room_join_error: 'room_join_error',
    },
};

export default EVENTS;
