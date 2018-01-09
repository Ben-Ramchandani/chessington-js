import Piece from './piece';
import Bishop from './bishop';
import Rook from './rook'

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        return Bishop.movesForPosition(this.position, board)
            .concat(Rook.movesForPosition(this.position, board))

    }
}