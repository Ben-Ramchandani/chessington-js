import Piece from './piece';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let moves = []
        for (let i = 0; i < board.board.length; i++) {
            if (i !== this.position.row) {
                moves.push({ row: i, col: this.position.col });
            }
            if (i !== this.position.col) {
                moves.push({ row: this.position.row, col: i });
            }
        }
        return moves
    }
}