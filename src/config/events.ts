const EVENTS = {
    CLIENT: {
        connect: 'connect',
        connect_error: 'connect_error',
        join_game: 'join_game',
        room_joined: 'room_joined',
        room_join_error: 'room_join_error',
        update_game: 'update_game',
        on_game_update: 'on_game_update',
        start_game: 'start_game',
        game_win: 'game_win',
        on_game_win: 'on_game_win',
        start_game_first: 'start_game_first',
        start_game_second: 'start_game_second',
        join_chat: 'join_chat',
        chat_joined: 'chat_joined',
        message: 'message',
        on_message: 'on_message',
    },
};

export default EVENTS;
