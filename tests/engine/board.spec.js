import 'chai/register-should';
import Board from '../../src/engine/board';
import Pawn from '../../src/engine/pieces/pawn';
import Player from '../../src/engine/player';
import Square from '../../src/engine/square';
import Rook from '../../src/engine/pieces/rook';
import King from '../../src/engine/pieces/king';

describe('Board', () => {
    let board;
    beforeEach(() => { // Common code executed before each test.
        board = new Board();
    });

    describe('pawns', () => {

        it('can be added to the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(0, 0);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.getPiece(square)
                .should.equal(pawn); // Object equality: same object reference
        });

        it('can be found on the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(6, 4);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.findPiece(pawn)
                .should.eql(square); // Object equivalence: different objects, same data
        });

    });

    it('is checkmate', () => {
        const rook1 = new Rook(Player.WHITE);
        const rook2 = new Rook(Player.WHITE);
        const king = new King(Player.BLACK);
        board.setPiece(Square.at(0, 0), rook1);
        board.setPiece(Square.at(1, 0), rook2);
        board.setPiece(Square.at(0, 4), king);
        board.currentPlayer = Player.BLACK;

        board.isCheckmate()
            .should.equal(true);
    });

    it('is not checkmate', () => {
        const rook1 = new Rook(Player.WHITE);
        const rook2 = new Rook(Player.WHITE);
        const king = new King(Player.BLACK);
        board.setPiece(Square.at(2, 0), rook1);
        board.setPiece(Square.at(1, 0), rook2);
        board.setPiece(Square.at(0, 4), king);
        board.currentPlayer = Player.BLACK;

        board.isCheckmate()
            .should.not.equal(true);
    });
    //TODO: check If King can take something it's not checkmate
    it('is stalemate', () => {
        const rook1 = new Rook(Player.WHITE);
        const rook2 = new Rook(Player.WHITE);
        const king = new King(Player.BLACK);
        board.setPiece(Square.at(1, 5), rook1);
        board.setPiece(Square.at(5, 1), rook2);
        board.setPiece(Square.at(0, 0), king);
        board.currentPlayer = Player.BLACK;

        board.isStalemate()
            .should.equal(true);
    });

    it('is not stalemate', () => {
        const rook1 = new Rook(Player.WHITE);
        const rook2 = new Rook(Player.WHITE);
        const king = new King(Player.BLACK);
        board.setPiece(Square.at(2, 0), rook1);
        board.setPiece(Square.at(1, 0), rook2);
        board.setPiece(Square.at(0, 4), king);
        board.currentPlayer = Player.BLACK;

        board.isStalemate()
            .should.not.equal(true);
    });

    it('is not stalemate because it is checkmate', () => {
        const rook1 = new Rook(Player.WHITE);
        const rook2 = new Rook(Player.WHITE);
        const king = new King(Player.BLACK);
        board.setPiece(Square.at(0, 0), rook1);
        board.setPiece(Square.at(1, 0), rook2);
        board.setPiece(Square.at(0, 4), king);
        board.currentPlayer = Player.BLACK;

        board.isStalemate()
            .should.not.equal(true);
    });
});
