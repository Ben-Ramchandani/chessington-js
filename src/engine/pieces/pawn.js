import Piece from './piece';
import Player from '../player';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMovesNoCheck(board) {
        let directions
        let takingDirections
        let limit = 1;
        if (this.player === Player.WHITE) {
            directions = [{ row: 1, col: 0 }]
            takingDirections = [{ row: 1, col: 1 }, { row: 1, col: -1 }]
            if (this.position.row == 1) {
                limit = 2
            }
        } else { // If black
            directions = [{ row: -1, col: 0 }]
            takingDirections = [{ row: -1, col: 1 }, { row: -1, col: -1 }]
            if (this.position.row == board.board.length - 2) {
                limit = 2
            }
        }
        let normalMoves = Piece.availableMovesInDirections(this, directions, limit, false)
        let takingMoves = takingDirections.map((move) => Square.add(this.position, move));
        takingMoves = takingMoves.filter((move) => board.getPiece(move) && board.getPiece(move)
            .player !== this.player);
        return normalMoves.concat(takingMoves);
    }
}
