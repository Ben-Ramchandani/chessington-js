import 'chai/register-should';
import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';
import assert from "assert";
import Rook from '../../../src/engine/pieces/rook';

describe('King', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.deep.have.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPawn = new Pawn(Player.BLACK)
        board.setPiece(Square.at(0, 0), king);
        board.setPiece(Square.at(0, 1), opposingPawn)

        const moves = king.getAvailableMoves(board);

        const expectedMoves = Square.at(0, 1);

        moves.should.deep.include(expectedMoves);
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPawn = new Pawn(Player.WHITE)
        board.setPiece(Square.at(0, 0), king);
        board.setPiece(Square.at(0, 1), friendlyPawn)

        const moves = king.getAvailableMoves(board);

        const unexpectedMoves = Square.at(0, 1);

        moves.should.not.deep.include(unexpectedMoves);
    });

    it('cannot be taken', () => {
        const king = new King(Player.WHITE);
        const opposingKing = new King(Player.BLACK)
        board.setPiece(Square.at(0, 1), opposingKing)

        assert.throws(() => board.setPiece(Square.at(0, 1), king));
    })

    it('is in check', () => {
        const king = new King(Player.WHITE);
        const opposingRook = new Rook(Player.BLACK)
        board.setPiece(Square.at(0, 1), king)
        board.setPiece(Square.at(0, 5), opposingRook)

        king.isInCheck.should.equal(true)
    })
    it('is not in check', () => {
        const king = new King(Player.WHITE);
        const opposingRook = new Rook(Player.BLACK)
        board.setPiece(Square.at(0, 1), king)
        board.setPiece(Square.at(1, 5), opposingRook)

        king.isInCheck.should.not.equal(true)
    })

    it('can take to evade check', () => {
        const king = new King(Player.WHITE);
        const opposingRook = new Rook(Player.BLACK)
        board.setPiece(Square.at(0, 5), king)
        board.setPiece(Square.at(1, 5), opposingRook)

        let moves = king.getAvailableMoves(board);

        king.isInCheck.should.equal(true);
        moves.should.deep.include(Square.at(1, 5));
    })
});
