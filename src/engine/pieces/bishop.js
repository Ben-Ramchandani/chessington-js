import Piece from './piece';
import Square from '../square';


export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        return Bishop.movesForPosition(this.position, board)
    }

    static movesForPosition(position, board) {
        let directions = [
            { row: 1, col: 1 },
            { row: 1, col: -1 },
            { row: -1, col: -1 },
            { row: -1, col: 1 }
        ]

        return Piece.availableMovesInDirections(position, directions, board)
    }
}