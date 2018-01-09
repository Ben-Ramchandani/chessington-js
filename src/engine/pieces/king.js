import Piece from './piece';
import Bishop from './bishop';
import Rook from './rook'

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const directions = Rook.directions.concat(Bishop.directions)
        return Piece.availableMovesInDirections(this.position, directions, board, 1);
    }
}
