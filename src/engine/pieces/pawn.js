import Piece from './piece';
import Player from '../player';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let moves = []
        if (this.player === Player.WHITE) {
            if (board.getPiece({ row: this.position.row + 1, col: this.position.col })) {
                return []
            }
            if (this.position.row == 1) {
                moves = [{ row: this.position.row + 1, col: this.position.col }, {
                    row: this.position.row + 2,
                    col: this
                        .position.col
                }];
            } else {
                moves = [{ row: this.position.row + 1, col: this.position.col }];
            }
        } else {
            if (board.getPiece({ row: this.position.row - 1, col: this.position.col })) {
                return []
            }
            if (this.position.row == board.board.length - 2) {
                moves = [{ row: this.position.row - 1, col: this.position.col }, {
                    row: this.position.row - 2,
                    col: this
                        .position.col
                }];
            } else {
                moves = [{ row: this.position.row - 1, col: this.position.col }];
            }
        }
        moves = Piece.filterDestination(moves, board)
        return moves
    }
}