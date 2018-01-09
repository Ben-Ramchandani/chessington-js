import Piece from './piece';
import Bishop from './bishop';
import Rook from './rook'

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMovesNoCheck(board) {
        const directions = Rook.directions.concat(Bishop.directions)
        return Piece.availableMovesInDirections(this, directions, 1);
    }

    get isInCheck() {
        const position = this.position;
        const opposingPieces = this.board.getAllPieces()
            .filter(piece => piece.player != this.player)
        for (const piece of opposingPieces) {
            if (piece.getAvailableMovesNoCheck(this.board)
                .find((value) => position.equals(value))) {
                return true
            }
        }
        return false
    }
}
