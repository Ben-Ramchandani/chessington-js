import Piece from './piece';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let moves = []
        for (let i of[-2, -1, 1, 2]) {
            for (let j of[-2, -1, 1, 2]) {
                if ([1, 3].includes(Math.abs(i + j))) {
                    moves.push({ row: this.position.row + i, col: this.position.col + j });
                }
            }
        }
        return moves;
    }
}