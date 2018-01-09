import Piece from './piece';
import Bishop from './bishop';
import Rook from './rook'

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMovesNoCheck(board) {
        return Piece.availableMovesInDirections(this, Queen.directions)
    }
}

Queen.directions = Bishop.directions.concat(Rook.directions)
