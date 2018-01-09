import Piece from './piece';
import Player from '../player';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        if (this.player === Player.WHITE) {
            if (this.position.row == 1) {
                return [{ row: this.position.row + 1, col: this.position.col }, { row: this.position.row + 2, col: this.position.col }];
            } else {
                return [{ row: this.position.row + 1, col: this.position.col }];
            }
        } else {
            if (this.position.row == board.board.length - 2) {
                return [{ row: this.position.row - 1, col: this.position.col }, { row: this.position.row - 2, col: this.position.col }];
            } else {
                return [{ row: this.position.row - 1, col: this.position.col }];
            }
        }

        return new Array(0);
    }
}