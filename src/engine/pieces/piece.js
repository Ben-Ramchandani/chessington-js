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
}