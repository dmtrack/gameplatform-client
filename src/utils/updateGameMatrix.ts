import { useContext } from 'react';
import { IPlayMatrix } from '../components/tictactoeGame';
import checkGameState from './checkGameState';
import socketService from '../services/socketService';
import gameContext from '../context/gameContext';
import gameService from '../services/gameService';

const UpdateGameMatrix = (
    setPlayerTurn: (turn: boolean) => void,
    playerSymbol: string,
    matrix: IPlayMatrix,
    setMatrix: (matrix: IPlayMatrix) => void,
    column: number,
    row: number,
    symbol: 'x' | 'o'
) => {
    const newMatrix = [...matrix];

    if (newMatrix[row][column] === null || newMatrix[row][column] === 'null') {
        newMatrix[row][column] = symbol;
        setMatrix(newMatrix);
    }

    if (socketService.socket) {
        gameService.updateGame(socketService.socket, newMatrix);
        const [currentPlayerWon, otherPlayerWon] = checkGameState(
            newMatrix,
            playerSymbol
        );
        if (currentPlayerWon && otherPlayerWon) {
            gameService.gameWin(socketService.socket, 'The Game is a TIE!');
            alert('The Game is a TIE!');
        } else if (currentPlayerWon && !otherPlayerWon) {
            gameService.gameWin(socketService.socket, 'You Lost!');
            alert('You Won!');
        }

        setPlayerTurn(false);
    }
};

export default UpdateGameMatrix;
