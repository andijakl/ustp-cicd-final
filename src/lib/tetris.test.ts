import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  getRandomTetromino,
  rotateTetromino,
  checkCollision,
  mergeTetromino,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropSpeed,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINOES,
  type Cell,
  type Tetromino,
} from './tetris';

describe('tetris utility functions', () => {
  describe('createEmptyBoard', () => {
    it('creates a board with correct dimensions', () => {
      const board = createEmptyBoard();
      expect(board).toHaveLength(BOARD_HEIGHT);
      expect(board[0]).toHaveLength(BOARD_WIDTH);
    });

    it('creates a board with all empty cells', () => {
      const board = createEmptyBoard();
      board.forEach(row => {
        row.forEach(cell => {
          expect(cell.filled).toBe(false);
          expect(cell.color).toBe('');
        });
      });
    });
  });

  describe('getRandomTetromino', () => {
    it('returns a valid tetromino', () => {
      const tetromino = getRandomTetromino();
      expect(tetromino).toHaveProperty('type');
      expect(tetromino).toHaveProperty('shape');
      expect(tetromino).toHaveProperty('color');
      expect(tetromino).toHaveProperty('position');
    });

    it('returns a tetromino with valid type', () => {
      const tetromino = getRandomTetromino();
      expect(['I', 'O', 'T', 'S', 'Z', 'J', 'L']).toContain(tetromino.type);
    });

    it('positions tetromino at the top center', () => {
      const tetromino = getRandomTetromino();
      expect(tetromino.position.y).toBe(0);
      expect(tetromino.position.x).toBeGreaterThanOrEqual(0);
      expect(tetromino.position.x).toBeLessThan(BOARD_WIDTH);
    });
  });

  describe('rotateTetromino', () => {
    it('rotates an I piece correctly', () => {
      const iPiece: Tetromino = {
        type: 'I',
        shape: TETROMINOES.I.shape.map(row => [...row]),
        color: TETROMINOES.I.color,
        position: { x: 0, y: 0 },
      };

      const rotated = rotateTetromino(iPiece);
      expect(rotated[0][2]).toBe(1);
      expect(rotated[1][2]).toBe(1);
      expect(rotated[2][2]).toBe(1);
      expect(rotated[3][2]).toBe(1);
    });

    it('rotates a T piece correctly', () => {
      const tPiece: Tetromino = {
        type: 'T',
        shape: TETROMINOES.T.shape.map(row => [...row]),
        color: TETROMINOES.T.color,
        position: { x: 0, y: 0 },
      };

      const rotated = rotateTetromino(tPiece);
      expect(rotated.length).toBe(3);
      expect(rotated[0].length).toBe(3);
    });

    it('returns a square matrix for O piece', () => {
      const oPiece: Tetromino = {
        type: 'O',
        shape: TETROMINOES.O.shape.map(row => [...row]),
        color: TETROMINOES.O.color,
        position: { x: 0, y: 0 },
      };

      const rotated = rotateTetromino(oPiece);
      expect(rotated).toEqual(oPiece.shape);
    });
  });

  describe('checkCollision', () => {
    it('detects collision with left wall', () => {
      const board = createEmptyBoard();
      const tetromino: Tetromino = {
        type: 'I',
        shape: [[1, 1, 1, 1]],
        color: 'red',
        position: { x: 0, y: 0 },
      };

      expect(checkCollision(board, tetromino, -1, 0)).toBe(true);
    });

    it('detects collision with right wall', () => {
      const board = createEmptyBoard();
      const tetromino: Tetromino = {
        type: 'I',
        shape: [[1, 1, 1, 1]],
        color: 'red',
        position: { x: BOARD_WIDTH - 4, y: 0 },
      };

      expect(checkCollision(board, tetromino, 1, 0)).toBe(true);
    });

    it('detects collision with bottom', () => {
      const board = createEmptyBoard();
      const tetromino: Tetromino = {
        type: 'O',
        shape: [[1, 1], [1, 1]],
        color: 'yellow',
        position: { x: 4, y: BOARD_HEIGHT - 2 },
      };

      expect(checkCollision(board, tetromino, 0, 1)).toBe(true);
    });

    it('detects collision with filled cells', () => {
      const board = createEmptyBoard();
      board[10][5] = { filled: true, color: 'red' };

      const tetromino: Tetromino = {
        type: 'O',
        shape: [[1, 1], [1, 1]],
        color: 'yellow',
        position: { x: 4, y: 9 },
      };

      expect(checkCollision(board, tetromino, 0, 0)).toBe(true);
    });

    it('allows valid moves', () => {
      const board = createEmptyBoard();
      const tetromino: Tetromino = {
        type: 'O',
        shape: [[1, 1], [1, 1]],
        color: 'yellow',
        position: { x: 4, y: 5 },
      };

      expect(checkCollision(board, tetromino, 0, 0)).toBe(false);
      expect(checkCollision(board, tetromino, 1, 0)).toBe(false);
      expect(checkCollision(board, tetromino, 0, 1)).toBe(false);
    });
  });

  describe('mergeTetromino', () => {
    it('merges tetromino onto board', () => {
      const board = createEmptyBoard();
      const tetromino: Tetromino = {
        type: 'O',
        shape: [[1, 1], [1, 1]],
        color: 'yellow',
        position: { x: 4, y: 18 },
      };

      const newBoard = mergeTetromino(board, tetromino);
      expect(newBoard[18][4].filled).toBe(true);
      expect(newBoard[18][5].filled).toBe(true);
      expect(newBoard[19][4].filled).toBe(true);
      expect(newBoard[19][5].filled).toBe(true);
      expect(newBoard[18][4].color).toBe('yellow');
    });

    it('does not modify original board', () => {
      const board = createEmptyBoard();
      const tetromino: Tetromino = {
        type: 'O',
        shape: [[1, 1], [1, 1]],
        color: 'yellow',
        position: { x: 4, y: 18 },
      };

      mergeTetromino(board, tetromino);
      expect(board[18][4].filled).toBe(false);
    });
  });

  describe('clearLines', () => {
    it('clears a single full line', () => {
      const board = createEmptyBoard();
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[BOARD_HEIGHT - 1][x] = { filled: true, color: 'red' };
      }

      const { newBoard, linesCleared } = clearLines(board);
      expect(linesCleared).toBe(1);
      expect(newBoard[BOARD_HEIGHT - 1].every(cell => !cell.filled)).toBe(true);
    });

    it('clears multiple full lines', () => {
      const board = createEmptyBoard();
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[BOARD_HEIGHT - 1][x] = { filled: true, color: 'red' };
        board[BOARD_HEIGHT - 2][x] = { filled: true, color: 'blue' };
      }

      const { newBoard, linesCleared } = clearLines(board);
      expect(linesCleared).toBe(2);
      expect(newBoard[BOARD_HEIGHT - 1].every(cell => !cell.filled)).toBe(true);
      expect(newBoard[BOARD_HEIGHT - 2].every(cell => !cell.filled)).toBe(true);
    });

    it('does not clear partial lines', () => {
      const board = createEmptyBoard();
      for (let x = 0; x < BOARD_WIDTH - 1; x++) {
        board[BOARD_HEIGHT - 1][x] = { filled: true, color: 'red' };
      }

      const { newBoard, linesCleared } = clearLines(board);
      expect(linesCleared).toBe(0);
    });

    it('maintains board height after clearing', () => {
      const board = createEmptyBoard();
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[BOARD_HEIGHT - 1][x] = { filled: true, color: 'red' };
      }

      const { newBoard } = clearLines(board);
      expect(newBoard).toHaveLength(BOARD_HEIGHT);
    });
  });

  describe('calculateScore', () => {
    it('calculates score for 1 line', () => {
      expect(calculateScore(1, 1)).toBe(100);
      expect(calculateScore(1, 2)).toBe(200);
    });

    it('calculates score for 2 lines', () => {
      expect(calculateScore(2, 1)).toBe(300);
      expect(calculateScore(2, 2)).toBe(600);
    });

    it('calculates score for 3 lines', () => {
      expect(calculateScore(3, 1)).toBe(500);
    });

    it('calculates score for 4 lines (Tetris)', () => {
      expect(calculateScore(4, 1)).toBe(800);
      expect(calculateScore(4, 3)).toBe(2400);
    });

    it('returns 0 for no lines', () => {
      expect(calculateScore(0, 1)).toBe(0);
    });
  });

  describe('calculateLevel', () => {
    it('starts at level 1', () => {
      expect(calculateLevel(0)).toBe(1);
      expect(calculateLevel(5)).toBe(1);
      expect(calculateLevel(9)).toBe(1);
    });

    it('increases level every 10 lines', () => {
      expect(calculateLevel(10)).toBe(2);
      expect(calculateLevel(15)).toBe(2);
      expect(calculateLevel(20)).toBe(3);
      expect(calculateLevel(99)).toBe(10);
    });
  });

  describe('getDropSpeed', () => {
    it('returns correct speed for level 1', () => {
      expect(getDropSpeed(1)).toBe(1000);
    });

    it('decreases speed as level increases', () => {
      expect(getDropSpeed(2)).toBe(900);
      expect(getDropSpeed(5)).toBe(600);
    });

    it('has minimum speed of 100ms', () => {
      expect(getDropSpeed(10)).toBe(100);
      expect(getDropSpeed(20)).toBe(100);
    });
  });
});
