import { useState } from 'react';
import styled from 'styled-components';
import { LoginParams } from '../../interfaces/chat.interface';
import Game from '../../scenes/game/Game';

const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Zen Tokyo Zoo', cursive;
    position: relative;
`;

const RowContainer = styled.div`
    width: 100%;
    display: flex;
`;

interface ICellProps {
    borderTop?: boolean;
    borderRight?: boolean;
    borderLeft?: boolean;
    borderBottom?: boolean;
}

const Cell = styled.div<ICellProps>`
    width: 13em;
    height: 9em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    cursor: pointer;
    border-top: ${({ borderTop }) => borderTop && '3px solid #fff'};
    border-left: ${({ borderLeft }) => borderLeft && '3px solid  #fff'};
    border-bottom: ${({ borderBottom }) => borderBottom && '3px solid  #fff'};
    border-right: ${({ borderRight }) => borderRight && '3px solid  #fff'};
    transition: all 270ms ease-in-out;
    &:hover {
        background-color: #8d44ad28;
    }
`;

const PlayStopper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 99;
    cursor: default;
`;

const X = styled.span`
    font-size: 100px;
    color: #fff;
    &::after {
        content: 'X';
    }
`;

const O = styled.span`
    font-size: 100px;
    color: #fff;
    &::after {
        content: 'O';
    }
`;

interface IGameProps {
    username: string;
}

const TicTacToeGame = ({ username }: LoginParams) => {
    const [matrix, setMatrix] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);

    return (
        <>
            <GameContainer>
                {matrix.map((row, rowIdx) => {
                    return (
                        <RowContainer>
                            {row.map((column, columnIdx) => (
                                <Cell
                                    borderRight={columnIdx < 2}
                                    borderLeft={columnIdx > 0}
                                    borderBottom={rowIdx < 2}
                                    borderTop={rowIdx > 0}>
                                    {column && column !== 'null' ? (
                                        column === 'x' ? (
                                            <X />
                                        ) : (
                                            <O />
                                        )
                                    ) : null}
                                </Cell>
                            ))}
                        </RowContainer>
                    );
                })}
            </GameContainer>
            <Game />
        </>
    );
};

export default TicTacToeGame;
