import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import King from './pieces/king';

export default class Board {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    setPiece(square, piece) {
        if (this.board[square.row][square.col] instanceof King) {
            throw Error("Cannot take the king")
        }
        this.board[square.row][square.col] = piece;
        if (piece) {
            piece.board = this;
        }
    }

    getPiece(square) {
        if (this.containsSquare(square)) {
            return this.board[square.row][square.col];
        }
    }

    getAllPieces() {
        let pieces = []
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col]) {
                    pieces.push(this.board[row][col])
                }
            }
        }
        return pieces
    }

    findPiece(pieceToFind) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }

    containsSquare(square) {
        return (square.row >= 0 && square.col >= 0 && square.row < this.board.length && square.col < this.board.length)
    }
}
