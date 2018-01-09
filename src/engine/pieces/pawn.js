import Piece from './piece';
import Player from '../player';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        if (this.player === Player.WHITE) {
            return [{ row: this.position.row + 1, col: this.position.col }];
        } else {
            return [{ row: this.position.row - 1, col: this.position.col }];
        }

        return new Array(0);
    }
}