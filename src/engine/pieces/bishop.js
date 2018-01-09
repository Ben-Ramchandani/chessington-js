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
        let moves = []
        let directions = [
            { row: 1, col: 1 },
            { row: 1, col: -1 },
            { row: -1, col: -1 },
            { row: -1, col: 1 }
        ]

        while (directions.length > 0) {
            let currentPosition = position
            const direction = directions[0]
            for (let i = 1; i < board.board.length; i++) {
                currentPosition = Square.add(currentPosition, direction)
                if (board.getPiece(currentPosition) || !board.containsSquare(currentPosition)) {
                    directions.shift()
                    break
                } else {
                    moves.push(currentPosition)
                }
            }
        }
        return moves
    }
}