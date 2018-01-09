import Piece from './piece';
import Square from '../square';
import Board from '../board';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        return Rook.movesForPosition(this.position, board)
    }

    static movesForPosition(position, board) {
        let moves = []
        let directions = [
            { row: 0, col: 1 },
            { row: 1, col: 0 },
            { row: 0, col: -1 },
            { row: -1, col: 0 }
        ]

        return Piece.availableMovesInDirections(position, directions, board)
    }
}