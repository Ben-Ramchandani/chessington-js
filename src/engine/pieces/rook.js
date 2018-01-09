import Piece from './piece';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        return Rook.movesForPosition(this.position, board)
    }

    static movesForPosition(position, board) {
        let moves = []
        for (let i = 0; i < board.board.length; i++) {
            if (i !== position.row) {
                moves.push({ row: i, col: position.col });
            }
            if (i !== position.col) {
                moves.push({ row: position.row, col: i });
            }
        }
        return moves
    }
}