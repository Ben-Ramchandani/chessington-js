import Square from '../square';

export default class Piece {
    constructor(player) {
        this.player = player;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    get position() {
        return this.board.findPiece(this);
    }

    static filterDestination(moves, board) {
        return moves.filter(destination => !(board.getPiece(destination)))
    }

    static availableMovesInDirections(position, directions, board, limit) {
        directions = directions.slice(0)
        let moves = []
        limit = limit || (board.board.length - 1)
        while (directions.length > 0) {
            let currentPosition = position
            const direction = directions[0]
            for (let i = 1; i <= limit; i++) {
                currentPosition = Square.add(currentPosition, direction)
                if (board.getPiece(currentPosition) || !board.containsSquare(currentPosition)) {
                    break
                } else {
                    moves.push(currentPosition)
                }
            }
            directions.shift()
        }
        return moves
    }
}
