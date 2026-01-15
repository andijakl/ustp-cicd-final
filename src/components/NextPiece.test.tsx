import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { NextPiece } from './NextPiece';
import { TETROMINOES } from '@/lib/tetris';

describe('NextPiece', () => {
  it('renders without crashing with null piece', () => {
    const { container } = render(<NextPiece nextPiece={null} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders with a tetromino piece', () => {
    const tetromino = {
      type: 'I' as const,
      shape: TETROMINOES.I.shape,
      color: TETROMINOES.I.color,
      position: { x: 0, y: 0 },
    };

    const { container } = render(<NextPiece nextPiece={tetromino} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('displays NEXT heading', () => {
    const { getByText } = render(<NextPiece nextPiece={null} />);
    expect(getByText('NEXT')).toBeInTheDocument();
  });

  it('applies correct canvas dimensions', () => {
    const { container } = render(<NextPiece nextPiece={null} />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    expect(canvas.width).toBe(120); // 4 * 30
    expect(canvas.height).toBe(120); // 4 * 30
  });
});
