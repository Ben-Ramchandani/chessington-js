import Piece from './piece';
import Board from '../board';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMovesNoCheck(board) {
        let moves = []
        for (let i of[-2, -1, 1, 2]) {
            for (let j of[-2, -1, 1, 2]) {
                if ([1, 3].includes(Math.abs(i + j))) {
                    moves.push({ row: this.position.row + i, col: this.position.col + j });
                }
            }
        }
        moves = moves.filter(position => board.containsSquare(position))
        moves = moves.filter(position => !(board.getPiece(position) && board.getPiece(position)
            .player == this.player))
        return moves;
    }
}
