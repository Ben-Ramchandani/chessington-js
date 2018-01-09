import Piece from './piece';

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        return Bishop.movesForPosition(this.position, board)
    }

    static movesForPosition(position, board) {
        let moves = []
        for (let i = 1; i < board.board.length; i++) {
            moves.push({ row: position.row + i, col: position.col + i }, {
                row: position.row + i,
                col: position.col - i
            }, { row: position.row - i, col: position.col + i }, {
                row: position.row - i,
                col: position.col - i
            })
        }
        moves = moves.filter(item => item.row >= 0 &&
            item.row < board.board.length &&
            item.col >= 0 &&
            item.col < board.board.length
        )
        return moves
    }
}