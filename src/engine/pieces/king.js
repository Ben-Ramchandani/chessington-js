import Piece from './piece';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let moves = []
        for (let i of[-1, 0, 1]) {
            for (let j of[-1, 0, 1]) {
                if (i !== 0 || j !== 0) {
                    moves.push({ row: this.position.row + i, col: this.position.col + j });
                }
            }
        }
        return moves;
    }
}