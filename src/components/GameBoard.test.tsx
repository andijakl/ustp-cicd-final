import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameBoard } from './GameBoard';
import { createEmptyBoard } from '@/lib/tetris';

describe('GameBoard', () => {
  it('renders canvas element', () => {
    const board = createEmptyBoard();
    const { container } = render(
      <GameBoard board={board} currentPiece={null} gameOver={false} />
    );
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('applies correct canvas dimensions', () => {
    const board = createEmptyBoard();
    const { container } = render(
      <GameBoard board={board} currentPiece={null} gameOver={false} />
    );
    
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    expect(canvas.width).toBe(300); // 10 * 30
    expect(canvas.height).toBe(600); // 20 * 30
  });

  it('renders without crashing when game is over', () => {
    const board = createEmptyBoard();
    const { container } = render(
      <GameBoard board={board} currentPiece={null} gameOver={true} />
    );
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
