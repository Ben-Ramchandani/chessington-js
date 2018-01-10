import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import King from './pieces/king';

export default class Board {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
        this.kings = [];
        this.kings.length = 2;
    }

    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    setPiece(square, piece) {
        if (!piece) {
            throw "No piece"
        }
        piece.board = this;
        if (this.board[square.row][square.col] instanceof King) {
            throw Error("Cannot take the king")
        }
        let originalPosition = piece.position;
        if (piece instanceof King) {
            this.kings[piece.player] = piece;
        }
        this.board[square.row][square.col] = piece;
        if (originalPosition) {
            this.board[originalPosition.row][originalPosition.col] = undefined;
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
        return undefined;
    }

    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
            let endgame = this.isEndgame();
            let nameMap = {
                [Player.WHITE]: "White",
                [Player.BLACK]: "Black"
            };
            if (endgame) {
                console.log(endgame);

                console.log(nameMap[this.currentPlayer] + "Loses");
                if (endgame === "CHECKMATE") {
                    alert("Game over, " + nameMap[this.currentPlayer] + " loses.");
                } else {
                    alert("Game over, stalemate.");
                }
                this.currentPlayer = null;
            } else if (this.kings[this.currentPlayer] && this.kings[this.currentPlayer].isInCheck) {
                alert(nameMap[this.currentPlayer] + " is in check.");
            }
        }
    }

    containsSquare(square) {
        return (square.row >= 0 && square.col >= 0 && square.row < this.board.length && square.col < this.board.length)
    }

    hasMoveAvailable() {
        for (let piece of this.getAllPieces()
                .filter((p) => p.player === this.currentPlayer)) {
            if (piece.getAvailableMoves(this)
                .length > 0) {
                return true;
            }
        }
        return false;
    }

    isEndgame() {
        let king = this.kings[this.currentPlayer];
        if (!king) {
            return false; // So that tests without kings work.
        }
        if (!this.hasMoveAvailable()) {
            if (king.isInCheck) {
                return "CHECKMATE";
            } else {
                return "STALEMATE";
            }
        } else {
            return false;
        }
    }
}
