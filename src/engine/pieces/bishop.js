import Piece from './piece';
import Square from '../square';

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMovesNoCheck(board) {
        return Piece.availableMovesInDirections(this, Bishop.directions)
    }
}

Bishop.directions = [
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: -1 },
    { row: -1, col: 1 }
]
