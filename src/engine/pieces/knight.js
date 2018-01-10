import Piece from './piece';
import Board from '../board';
import Square from '../square';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMovesNoCheck(board) {
        let moves = []
        for (let i of[-2, -1, 1, 2]) {
            for (let j of[-2, -1, 1, 2]) {
                if ([1, 3].includes(Math.abs(i + j))) {
                    moves.push(Square.at(this.position.row + i, this.position.col + j));
                }
            }
        }
        moves = moves.filter(position => board.containsSquare(position))
        moves = moves.filter(position => !(board.getPiece(position) && board.getPiece(position)
            .player == this.player))
        return moves;
    }
}
