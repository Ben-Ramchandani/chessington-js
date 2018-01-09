import Piece from './piece';
import Player from '../player';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let directions = []
        let limit = 1;
        if (this.player === Player.WHITE) {
            directions = [{ row: 1, col: 0 }]
            if (this.position.row == 1) {
                limit = 2
            }
        } else { // If black
            directions = [{ row: -1, col: 0 }]
            if (this.position.row == board.board.length - 2) {
                limit = 2
            }
        }
        return Piece.availableMovesInDirections(this.position, directions, board, limit)
    }
}
